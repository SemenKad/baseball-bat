/* ============================================================
   The Baseball Bat — backend (Express + JSON file store).
   Хранит контент, медиа-назначения, настройки, загрузки и аналитику
   на сервере: статистика собирается со ВСЕХ посетителей, контент из
   админки виден всем. Без внешней БД — данные в server/data/*.json.
   ============================================================ */
import express from "express";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DATA = path.join(__dirname, "data");
const UPLOADS = path.join(DATA, "uploads");
fs.mkdirSync(UPLOADS, { recursive: true });

/* Грузим .env из корня проекта (не коммитится). Node 20.6+/24. */
try { process.loadEnvFile(path.join(ROOT, ".env")); } catch { /* .env нет — берём дефолты ниже */ }

/* Порт API: только API_PORT (в проде задайте его = PORT хостинга).
   process.env.PORT намеренно НЕ используем — в dev харнесс ставит его = веб-порту Vite. */
const PORT = Number(process.env.API_PORT) || 8787;

/* Креды админки — строго из окружения (.env локально, env-vars на хостинге).
   Дефолтов НЕТ: если не заданы — вход в админку отключён (никакого бэкдора). */
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const ADMIN_PASS = process.env.ADMIN_PASS || "";
const ADMIN_ENABLED = Boolean(ADMIN_EMAIL && ADMIN_PASS);
if (!ADMIN_ENABLED) console.warn("[baseball-bat] ВНИМАНИЕ: ADMIN_EMAIL/ADMIN_PASS не заданы — вход в админку отключён. Задайте их в .env или env-vars хостинга.");

const F = {
  content: path.join(DATA, "content.json"),
  media: path.join(DATA, "media.json"),
  settings: path.join(DATA, "settings.json"),
  uploads: path.join(DATA, "uploads.json"),
  events: path.join(DATA, "events.json"),
  sessions: path.join(DATA, "sessions.json"),
  meta: path.join(DATA, "meta.json"),
  contacts: path.join(DATA, "contacts.json"),
};

const readJSON = (f, fb) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return fb; } };
const writeJSON = (f, d) => fs.writeFileSync(f, JSON.stringify(d));

/* init files */
for (const [k, f] of Object.entries(F)) {
  if (!fs.existsSync(f)) writeJSON(f, ["uploads", "events", "contacts"].includes(k) ? [] : {});
}

/* события держим в памяти, чтобы не перечитывать файл на каждый визит */
let EVENTS = readJSON(F.events, []);
const persistEvents = () => writeJSON(F.events, EVENTS);
const CAP = 20000;

/* ---------------- демо-сидер аналитики ---------------- */
const LANG_W = [["en", 34], ["ru", 22], ["es", 8], ["pt", 7], ["de", 6], ["tr", 6], ["zh", 5], ["ja", 4], ["ar", 4], ["lv", 4]];
const LINKS = [["watch-fights", 26], ["instagram", 18], ["telegram", 10], ["youtube", 7], ["pricing-video-review", 9], ["pricing-personal", 12], ["pricing-seminar", 5], ["nav-training", 8], ["reel-record", 5]];
const SECTIONS = [["dossier", 78], ["stats", 64], ["proofs", 52], ["path", 47], ["media", 58], ["voices", 38], ["training", 44], ["faq", 27], ["cta", 31]];
const HOUR_W = [1, 1, 1, 1, 1, 2, 3, 5, 7, 8, 8, 9, 10, 10, 9, 9, 10, 12, 14, 15, 14, 11, 7, 3];

function pick(weighted) {
  const total = weighted.reduce((a, [, w]) => a + w, 0);
  let r = Math.random() * total;
  for (const [v, w] of weighted) { r -= w; if (r <= 0) return v; }
  return weighted[0][0];
}

function seedDemo() {
  const out = [];
  const now = new Date();
  const DAYS = 30;
  for (let d = DAYS; d >= 1; d--) {
    const day = new Date(now);
    day.setDate(now.getDate() - d);
    const wd = day.getDay();
    const weekend = wd === 0 || wd === 6 ? 1.35 : 1;
    const grow = 1 + (DAYS - d) / DAYS;
    const visits = Math.round((34 + Math.random() * 26) * weekend * grow);
    for (let i = 0; i < visits; i++) {
      const hour = pick(HOUR_W.map((w, h) => [h, w]));
      const ts = new Date(day);
      ts.setHours(hour, Math.floor(Math.random() * 60), Math.floor(Math.random() * 60), 0);
      const t = ts.getTime();
      const lang = pick(LANG_W);
      const dev = Math.random() < 0.63 ? "mobile" : "desktop";
      const sid = crypto.randomUUID().slice(0, 8);
      const base = { sid, lang, dev, demo: true };
      out.push({ t, type: "visit", ...base });
      for (const [sec, p] of SECTIONS) if (Math.random() * 100 < p * 0.55) out.push({ t: t + 30000, type: "section", id: sec, ...base });
      if (Math.random() < 0.42) {
        out.push({ t: t + 60000, type: "click", id: pick(LINKS), ...base });
        if (Math.random() < 0.3) out.push({ t: t + 90000, type: "click", id: pick(LINKS), ...base });
      }
      if (Math.random() < 0.17) out.push({ t: t + 75000, type: "video", id: "fight-main", ...base });
      if (Math.random() < 0.08) out.push({ t: t + 12000, type: "lang", id: pick(LANG_W), ...base });
      if (Math.random() < 0.035) out.push({ t: t + 140000, type: "submit", id: "newsletter", ...base });
    }
  }
  out.sort((a, b) => a.t - b.t);
  return out;
}

const meta = readJSON(F.meta, {});
if (!meta.seeded && EVENTS.length === 0) {
  EVENTS = seedDemo();
  persistEvents();
  meta.seeded = true;
  writeJSON(F.meta, meta);
}

/* ---------------- сессии / авторизация ---------------- */
const getSessions = () => readJSON(F.sessions, {});
const saveSessions = (s) => writeJSON(F.sessions, s);
const WEEK = 7 * 24 * 60 * 60 * 1000;

function auth(req, res, next) {
  const token = (req.headers.authorization || "").replace("Bearer ", "").trim();
  const s = getSessions();
  if (token && s[token] && Date.now() - s[token] < WEEK) return next();
  res.status(401).json({ error: "unauthorized" });
}

/* ---------------- app ---------------- */
const app = express();
app.use(express.json({ limit: "52mb" }));
app.use("/uploads", express.static(UPLOADS, { maxAge: "7d" }));

app.get("/api/health", (_req, res) => res.json({ ok: true, events: EVENTS.length }));

/* auth */
app.post("/api/auth/login", (req, res) => {
  if (!ADMIN_ENABLED) return res.status(503).json({ error: "admin_not_configured" });
  const { email = "", password = "" } = req.body || {};
  if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASS) {
    const token = crypto.randomUUID() + crypto.randomUUID();
    const s = getSessions();
    s[token] = Date.now();
    saveSessions(s);
    return res.json({ token });
  }
  res.status(401).json({ error: "invalid_credentials" });
});
app.get("/api/auth/me", auth, (_req, res) => res.json({ ok: true }));
app.post("/api/auth/logout", (req, res) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "").trim();
  const s = getSessions();
  delete s[token];
  saveSessions(s);
  res.json({ ok: true });
});

/* content / media / settings */
app.get("/api/content", (_req, res) => res.json(readJSON(F.content, {})));
app.put("/api/content", auth, (req, res) => { writeJSON(F.content, req.body || {}); res.json({ ok: true }); });

app.get("/api/media", (_req, res) => res.json(readJSON(F.media, {})));
app.put("/api/media", auth, (req, res) => { writeJSON(F.media, req.body || {}); res.json({ ok: true }); });

app.get("/api/settings", (_req, res) => res.json(readJSON(F.settings, {})));
app.put("/api/settings", auth, (req, res) => { writeJSON(F.settings, req.body || {}); res.json({ ok: true }); });

/* uploads */
app.get("/api/uploads", (_req, res) => res.json(readJSON(F.uploads, [])));
app.post("/api/uploads", auth, (req, res) => {
  const { name, dataUrl, type } = req.body || {};
  const m = /^data:((image|video)\/[a-zA-Z0-9.+-]+);base64,(.+)$/.exec(dataUrl || "");
  if (!m) return res.status(400).json({ error: "bad_file" });
  const mime = m[1];
  const ext = mime.split("/")[1].replace("jpeg", "jpg").replace("svg+xml", "svg").replace("quicktime", "mov");
  const id = "up_" + crypto.randomUUID().slice(0, 8);
  const file = `${id}.${ext}`;
  fs.writeFileSync(path.join(UPLOADS, file), Buffer.from(m[3], "base64"));
  const recType = mime.startsWith("video/") ? "video" : (type || "photo");
  const rec = { id, name: name || id, src: "/uploads/" + file, file, type: recType };
  const list = readJSON(F.uploads, []);
  list.push(rec);
  writeJSON(F.uploads, list);
  res.json(rec);
});
app.delete("/api/uploads/:id", auth, (req, res) => {
  let list = readJSON(F.uploads, []);
  const rec = list.find((u) => u.id === req.params.id);
  if (rec) {
    try { fs.unlinkSync(path.join(UPLOADS, rec.file)); } catch { /* файла нет — ок */ }
    list = list.filter((u) => u.id !== req.params.id);
    writeJSON(F.uploads, list);
  }
  res.json({ ok: true });
});

/* analytics */
app.post("/api/track", (req, res) => {
  const e = req.body || {};
  if (!e.type) return res.status(400).json({ error: "no_type" });
  EVENTS.push({
    t: Date.now(),
    type: String(e.type).slice(0, 24),
    sid: String(e.sid || "").slice(0, 16),
    lang: String(e.lang || "en").slice(0, 5),
    dev: e.dev === "mobile" ? "mobile" : "desktop",
    id: e.id ? String(e.id).slice(0, 64) : undefined,
    ref: e.ref ? String(e.ref).slice(0, 160) : undefined,
    demo: false,
  });
  if (EVENTS.length > CAP) EVENTS.splice(0, EVENTS.length - CAP);
  persistEvents();
  res.json({ ok: true });
});
app.get("/api/analytics", auth, (_req, res) => res.json(EVENTS));
app.post("/api/analytics/clear-demo", auth, (_req, res) => { EVENTS = EVENTS.filter((e) => !e.demo); persistEvents(); res.json({ ok: true, events: EVENTS.length }); });
app.post("/api/analytics/clear-all", auth, (_req, res) => {
  EVENTS = [];
  persistEvents();
  const m = readJSON(F.meta, {});
  m.seeded = true;
  writeJSON(F.meta, m);
  res.json({ ok: true });
});

/* contact — заявки с формы связи (публичный POST, чтение под auth) */
app.post("/api/contact", (req, res) => {
  const b = req.body || {};
  const name = String(b.name || "").trim().slice(0, 120);
  const email = String(b.email || "").trim().slice(0, 160);
  const message = String(b.message || "").trim().slice(0, 4000);
  if (!name || !email || !message) return res.status(400).json({ error: "missing_fields" });
  const list = readJSON(F.contacts, []);
  list.push({ id: "c_" + crypto.randomUUID().slice(0, 8), t: Date.now(), name, email, message, lang: String(b.lang || "en").slice(0, 5), read: false });
  if (list.length > 2000) list.splice(0, list.length - 2000);
  writeJSON(F.contacts, list);
  res.json({ ok: true });
});
app.get("/api/contacts", auth, (_req, res) => res.json(readJSON(F.contacts, [])));
app.post("/api/contacts/clear", auth, (_req, res) => { writeJSON(F.contacts, []); res.json({ ok: true }); });

/* full reset (контент/медиа/настройки/загрузки) */
app.post("/api/reset", auth, (_req, res) => {
  writeJSON(F.content, {});
  writeJSON(F.media, {});
  writeJSON(F.settings, {});
  for (const u of readJSON(F.uploads, [])) { try { fs.unlinkSync(path.join(UPLOADS, u.file)); } catch { /* skip */ } }
  writeJSON(F.uploads, []);
  res.json({ ok: true });
});

/* prod: отдаём собранный фронт */
const DIST = path.join(ROOT, "dist");
if (fs.existsSync(DIST)) {
  app.use(express.static(DIST));
  app.get(/^(?!\/(api|uploads)).*/, (_req, res) => res.sendFile(path.join(DIST, "index.html")));
}

app.listen(PORT, () => console.log(`[baseball-bat] API on http://localhost:${PORT}  ·  events: ${EVENTS.length}`));
