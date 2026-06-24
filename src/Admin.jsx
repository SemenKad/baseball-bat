import { useState, useEffect, useMemo, useCallback } from "react";
import {
  LayoutDashboard, Type, Image as ImageIcon, Settings as SettingsIcon, LogOut, ExternalLink,
  Eye, MousePointerClick, Mail, Users as UsersIcon, TrendingUp, Play, Globe, Smartphone,
  Trash2, Upload, Check, X, AlertTriangle, RefreshCw, Lock, ChevronDown, Film,
  ArrowUp, ArrowDown, Plus, Inbox,
} from "lucide-react";
import { LANGS, STRINGS, deepMerge } from "./i18n";
import {
  login, hasToken, verifyAuth, logout,
  fetchContent, saveContent,
  fetchMedia, saveMedia, DEFAULT_MEDIA,
  fetchSettings, saveSettings,
  buildLibrary, uploadMedia, deleteUpload, fetchUploads,
  fetchContacts, clearContacts,
  resetAllContent,
} from "./store";
import { getEvents, aggregate, clearDemo, clearAll, hasDemo, track } from "./analytics";

/* ============================================================
   ЛОГИН — /admin/login
   ============================================================ */
export function AdminLogin({ navigate }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (hasToken()) verifyAuth().then((ok) => ok && navigate("/admin"));
  }, [navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const ok = await login(email, pass);
    track("admin_login", { id: ok ? "success" : "fail" });
    if (ok) {
      navigate("/admin");
    } else {
      setErr(true);
      setBusy(false);
      setTimeout(() => setErr(false), 600);
    }
  };

  return (
    <div className="adm-login-wrap">
      <div className="blob blob-a" aria-hidden="true" />
      <form className={`adm-login ${err ? "adm-shake" : ""}`} onSubmit={submit}>
        <span className="logo-box font-display !w-[52px] !h-[52px] !text-[20px] mx-auto">VN</span>
        <h1 className="font-display uppercase font-bold text-[26px] text-center mt-5 mb-1">Admin panel</h1>
        <p className="text-[var(--text-secondary)] text-[13px] text-center m-0 mb-7">The Baseball Bat · управление сайтом</p>

        <label className="adm-label">Email</label>
        <input className="adm-input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vladimir.n@thebaseballbat.com" autoComplete="username" />
        <label className="adm-label mt-4">Пароль</label>
        <input className="adm-input" type="password" required value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••••••" autoComplete="current-password" />

        {err && (
          <div className="adm-err">
            <AlertTriangle size={14} aria-hidden="true" /> Неверный email или пароль
          </div>
        )}

        <button className="btn btn-primary w-full justify-center mt-6" disabled={busy} type="submit">
          {busy ? <RefreshCw size={16} className="spin" aria-hidden="true" /> : <Lock size={16} aria-hidden="true" />} Войти
        </button>
        <button type="button" className="f-link text-[12px] mt-5 mx-auto block bg-transparent border-0 cursor-pointer" onClick={() => navigate("/")}>
          ← Вернуться на сайт
        </button>
      </form>
    </div>
  );
}

/* ============================================================
   SVG-ГРАФИКИ
   ============================================================ */
const AC = "#FFCF03", AC2 = "#FF8A00", DIM = "rgba(244,241,230,.35)";

function AreaChart({ days }) {
  const W = 720, H = 200, P = 28;
  const max = Math.max(5, ...days.map((d) => d.visits));
  const x = (i) => P + (i * (W - P * 2)) / (days.length - 1);
  const y = (v) => H - P - (v / max) * (H - P * 2);
  const line = days.map((d, i) => `${i ? "L" : "M"} ${x(i).toFixed(1)} ${y(d.visits).toFixed(1)}`).join(" ");
  const area = `${line} L ${x(days.length - 1)} ${H - P} L ${x(0)} ${H - P} Z`;
  const clicksLine = days.map((d, i) => `${i ? "L" : "M"} ${x(i).toFixed(1)} ${y(d.clicks).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Visits per day">
      <defs>
        <linearGradient id="areagrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={AC} stopOpacity=".34" />
          <stop offset="1" stopColor={AC} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line key={f} x1={P} x2={W - P} y1={y(max * f)} y2={y(max * f)} stroke="rgba(244,241,230,.07)" strokeDasharray="4 6" />
      ))}
      <path d={area} fill="url(#areagrad)" />
      <path d={line} fill="none" stroke={AC} strokeWidth="2.5" strokeLinejoin="round" />
      <path d={clicksLine} fill="none" stroke={AC2} strokeWidth="1.5" strokeDasharray="5 5" opacity=".8" />
      {days.map((d, i) =>
        i % 5 === 0 || i === days.length - 1 ? (
          <text key={i} x={x(i)} y={H - 8} fontSize="9.5" fill={DIM} textAnchor="middle" fontFamily="JetBrains Mono">{d.key}</text>
        ) : null
      )}
      <text x={P} y={y(max) - 8} fontSize="10" fill={DIM} fontFamily="JetBrains Mono">max {max}</text>
      {days.map((d, i) => (
        <circle key={"c" + i} cx={x(i)} cy={y(d.visits)} r="7" fill="transparent">
          <title>{`${d.key}: ${d.visits} визитов, ${d.clicks} кликов`}</title>
        </circle>
      ))}
    </svg>
  );
}

function BarsV({ data, labels, height = 150 }) {
  const max = Math.max(1, ...data);
  return (
    <div className="flex items-end gap-[3px] w-full" style={{ height }}>
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 group" title={`${labels?.[i] ?? i}: ${v}`}>
          <div
            className="w-full rounded-t-[3px] transition-all duration-300 group-hover:opacity-100"
            style={{ height: `${Math.max(2, (v / max) * (height - 26))}px`, background: `linear-gradient(180deg, ${AC}, ${AC2})`, opacity: 0.55 + (v / max) * 0.45 }}
          />
          {labels && (i % 3 === 0 || data.length <= 8) && <span className="font-mono text-[8.5px] text-[var(--text-secondary)]">{labels[i]}</span>}
        </div>
      ))}
    </div>
  );
}

function HBars({ data, total }) {
  const max = Math.max(1, ...data.map(([, v]) => v));
  return (
    <div className="flex flex-col gap-2.5">
      {data.map(([label, v]) => (
        <div key={label} className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-[var(--text-secondary)] w-[150px] truncate shrink-0" title={label}>{label}</span>
          <div className="flex-1 h-[18px] bg-[rgba(244,241,230,.05)] rounded-[5px] overflow-hidden">
            <div className="h-full rounded-[5px]" style={{ width: `${(v / max) * 100}%`, background: `linear-gradient(90deg, ${AC}, ${AC2})`, transition: "width .6s cubic-bezier(.16,1,.3,1)" }} />
          </div>
          <span className="font-mono text-[11.5px] w-[70px] text-right shrink-0">
            {v} <span className="text-[var(--text-secondary)] text-[9.5px]">{total ? `${Math.round((v / total) * 100)}%` : ""}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

const DONUT_COLORS = ["#FFCF03", "#FF8A00", "#F4F1E6", "#9a8f5f", "#6b6452", "#d4a900", "#b87333", "#8d8472", "#5c5648", "#3f3b31"];

function Donut({ data, size = 150 }) {
  const total = data.reduce((a, [, v]) => a + v, 0) || 1;
  const R = 42, C = 2 * Math.PI * R;
  let off = 0;
  return (
    <div className="flex items-center gap-5 flex-wrap">
      <svg viewBox="0 0 110 110" width={size} height={size} role="img" aria-label="Distribution">
        <circle cx="55" cy="55" r={R} fill="none" stroke="rgba(244,241,230,.06)" strokeWidth="14" />
        {data.map(([label, v], i) => {
          const frac = v / total;
          const el = (
            <circle
              key={label}
              cx="55" cy="55" r={R} fill="none"
              stroke={DONUT_COLORS[i % DONUT_COLORS.length]}
              strokeWidth="14"
              strokeDasharray={`${frac * C} ${C}`}
              strokeDashoffset={-off * C}
              transform="rotate(-90 55 55)"
            >
              <title>{`${label}: ${v} (${Math.round(frac * 100)}%)`}</title>
            </circle>
          );
          off += frac;
          return el;
        })}
        <text x="55" y="52" textAnchor="middle" fontSize="15" fontWeight="700" fill="#F4F1E6" fontFamily="Oswald">{total}</text>
        <text x="55" y="66" textAnchor="middle" fontSize="7.5" fill={DIM} fontFamily="JetBrains Mono">TOTAL</text>
      </svg>
      <div className="flex flex-col gap-1.5">
        {data.slice(0, 6).map(([label, v], i) => (
          <div key={label} className="flex items-center gap-2 font-mono text-[11px]">
            <span className="w-[9px] h-[9px] rounded-[3px] shrink-0" style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }} />
            <span className="text-[var(--text-secondary)] uppercase">{label}</span>
            <b>{v}</b>
            <span className="text-[var(--text-secondary)]">{Math.round((v / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const WD = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function Heatmap({ heat }) {
  const max = Math.max(1, ...heat.flat());
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[560px]">
        {heat.map((row, d) => (
          <div key={d} className="flex items-center gap-[3px] mb-[3px]">
            <span className="font-mono text-[9.5px] text-[var(--text-secondary)] w-[24px] shrink-0">{WD[d]}</span>
            {row.map((v, h) => (
              <div
                key={h}
                className="flex-1 h-[16px] rounded-[3px]"
                title={`${WD[d]} ${h}:00 — ${v}`}
                style={{ background: v === 0 ? "rgba(244,241,230,.04)" : `rgba(255,207,3,${0.12 + (v / max) * 0.88})` }}
              />
            ))}
          </div>
        ))}
        <div className="flex items-center gap-[3px] mt-1">
          <span className="w-[24px] shrink-0" />
          {Array.from({ length: 24 }, (_, h) => (
            <span key={h} className="flex-1 font-mono text-[8px] text-[var(--text-secondary)] text-center">{h % 4 === 0 ? h : ""}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Funnel({ totals }) {
  const rows = [
    ["Визиты", totals.visits, AC],
    ["Клики по ссылкам", totals.clicks, AC2],
    ["Подписки", totals.submits, "#F4F1E6"],
  ];
  const max = Math.max(1, totals.visits);
  return (
    <div className="flex flex-col gap-3">
      {rows.map(([label, v, color]) => (
        <div key={label}>
          <div className="flex justify-between font-mono text-[11px] mb-1">
            <span className="text-[var(--text-secondary)] uppercase">{label}</span>
            <b>{v}</b>
          </div>
          <div className="h-[26px] bg-[rgba(244,241,230,.05)] rounded-[7px] overflow-hidden">
            <div className="h-full rounded-[7px] flex items-center justify-end pr-2 font-mono text-[10px] text-[#1C1C1C] font-bold" style={{ width: `${Math.max(3, (v / max) * 100)}%`, background: color }}>
              {Math.round((v / max) * 100)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   ОБЗОР / АНАЛИТИКА
   ============================================================ */
const EV_LABELS = { visit: "визит", click: "клик", section: "секция", lang: "язык", submit: "подписка", video: "видео", admin_login: "вход в админку" };

function Overview() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const reload = useCallback(() => {
    setLoading(true);
    getEvents().then((e) => { setEvents(e); setLoading(false); });
  }, []);
  useEffect(() => { reload(); }, [reload]);
  const agg = useMemo(() => aggregate(events), [events]);
  const demo = hasDemo(events);

  const kpis = [
    { icon: Eye, label: "Визиты (всего)", value: agg.totals.visits, sub: `сегодня: ${agg.totals.today}` },
    { icon: UsersIcon, label: "Уникальные сессии", value: agg.totals.uniq, sub: "по session id" },
    { icon: MousePointerClick, label: "Клики по ссылкам", value: agg.totals.clicks, sub: `CTR ${agg.totals.ctr}%` },
    { icon: Mail, label: "Подписки", value: agg.totals.submits, sub: `конверсия ${agg.totals.conv}%` },
    { icon: Play, label: "Просмотры видео", value: agg.totals.videoPlays, sub: "плеер на сайте" },
    { icon: Globe, label: "Языков в трафике", value: agg.byLang.length, sub: agg.byLang[0] ? `топ: ${agg.byLang[0][0].toUpperCase()}` : "—" },
  ];

  return (
    <div>
      <div className="flex justify-end mb-3">
        <button className="adm-btn-sm" onClick={reload}>
          <RefreshCw size={13} className={loading ? "spin" : ""} aria-hidden="true" /> {loading ? "Обновление…" : "Обновить данные"}
        </button>
      </div>
      {demo && (
        <div className="adm-banner">
          <AlertTriangle size={15} aria-hidden="true" />
          <span>Показаны <b>демо-данные</b> (для предпросмотра графиков) + реальные события. Реальная статистика копится на сервере со всех посетителей.</span>
          <button className="adm-btn-sm" onClick={() => clearDemo().then(reload)}>
            <Trash2 size={13} aria-hidden="true" /> Удалить демо
          </button>
        </div>
      )}

      <div className="adm-kpis">
        {kpis.map((k) => (
          <div key={k.label} className="adm-kpi">
            <div className="adm-kpi-icon"><k.icon size={17} aria-hidden="true" /></div>
            <div className="font-display font-bold text-[30px] leading-none grad-text">{k.value}</div>
            <div className="font-mono text-[10px] uppercase tracking-[.14em] text-[var(--text-secondary)] mt-2">{k.label}</div>
            <div className="text-[11px] text-[var(--accent)] mt-1 flex items-center gap-1"><TrendingUp size={11} aria-hidden="true" />{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="adm-grid">
        <div className="adm-card adm-span2">
          <h3 className="adm-card-t">Визиты и клики · 30 дней <span className="adm-legend"><i style={{ background: AC }} /> визиты <i style={{ background: AC2 }} /> клики</span></h3>
          <AreaChart days={agg.days} />
        </div>

        <div className="adm-card">
          <h3 className="adm-card-t">Переходы по ссылкам</h3>
          <HBars data={agg.byLink.slice(0, 9)} total={agg.totals.clicks} />
        </div>
        <div className="adm-card">
          <h3 className="adm-card-t">Дочитываемость секций</h3>
          <HBars data={agg.bySection} total={agg.totals.visits} />
        </div>

        <div className="adm-card">
          <h3 className="adm-card-t">Языки посетителей</h3>
          <Donut data={agg.byLang} />
        </div>
        <div className="adm-card">
          <h3 className="adm-card-t">Устройства</h3>
          <Donut data={agg.byDev} />
        </div>

        <div className="adm-card">
          <h3 className="adm-card-t">Трафик по часам</h3>
          <BarsV data={agg.hours} labels={Array.from({ length: 24 }, (_, i) => i)} />
        </div>
        <div className="adm-card">
          <h3 className="adm-card-t">Дни недели</h3>
          <BarsV data={agg.weekdays} labels={WD} />
        </div>

        <div className="adm-card adm-span2">
          <h3 className="adm-card-t">Тепловая карта: день недели × час</h3>
          <Heatmap heat={agg.heat} />
        </div>

        <div className="adm-card">
          <h3 className="adm-card-t">Воронка</h3>
          <Funnel totals={agg.totals} />
        </div>

        <div className="adm-card">
          <h3 className="adm-card-t">Последние события</h3>
          <div className="adm-events">
            {agg.recent.slice(0, 14).map((e, i) => (
              <div key={i} className="adm-event">
                <span className="font-mono text-[10px] text-[var(--text-secondary)] shrink-0">
                  {new Date(e.t).toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                </span>
                <span className={`adm-tag adm-tag-${e.type}`}>{EV_LABELS[e.type] || e.type}</span>
                <span className="text-[12px] truncate">{e.id || e.ref || "—"}</span>
                <span className="font-mono text-[9.5px] text-[var(--text-secondary)] ml-auto shrink-0">{(e.lang || "—").toUpperCase()} · {e.dev === "mobile" ? "моб" : "комп"}{e.demo ? " · демо" : ""}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   КОНТЕНТ — редактор текстов всех языков
   ============================================================ */
const SECTION_LABELS = {
  nav: "Навигация", hero: "Главный экран", countdown: "Каунтдаун", marquee: "Бегущая строка",
  dossier: "Досье", stats: "Статистика", proofs: "Пруфы", path: "Путь",
  media: "Медиа", voices: "Отзывы", contact: "Форма связи", faq: "FAQ", cta: "CTA-баннер", footer: "Футер",
};

function setIn(obj, path, val) {
  if (path.length === 0) return val;
  const [k, ...rest] = path;
  const clone = Array.isArray(obj) ? [...obj] : { ...obj };
  clone[k] = setIn(clone[k], rest, val);
  return clone;
}

function Field({ label, value, onChange }) {
  const long = String(value).length > 70;
  return (
    <div className="adm-field">
      <label className="adm-label">{label}</label>
      {long ? (
        <textarea className="adm-input adm-area" value={value} onChange={(e) => onChange(e.target.value)} rows={Math.min(6, Math.ceil(String(value).length / 70))} />
      ) : (
        <input className="adm-input" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function Node({ obj, path, update, depth = 0 }) {
  if (typeof obj === "string" || typeof obj === "number") {
    return <Field label={String(path[path.length - 1])} value={obj} onChange={(v) => update(path, v)} />;
  }
  if (Array.isArray(obj)) {
    return obj.map((item, i) => (
      <div key={i} className={typeof item === "object" ? "adm-subcard" : ""}>
        {typeof item === "object" && <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] mb-2">#{i + 1}</div>}
        <Node obj={item} path={[...path, i]} update={update} depth={depth + 1} />
      </div>
    ));
  }
  return Object.keys(obj).map((k) => {
    if (k === "excluded") return null; // служебное число
    return <Node key={k} obj={obj[k]} path={[...path, k]} update={update} depth={depth + 1} />;
  });
}

function ContentTab() {
  const [lang, setLang] = useState("en");
  const [overrides, setOverrides] = useState(null);
  const [data, setData] = useState(null);
  const [openSec, setOpenSec] = useState("hero");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchContent().then((o) => setOverrides(o || {}));
  }, []);

  useEffect(() => {
    if (overrides) setData(deepMerge(STRINGS.en, STRINGS[lang] || {}, overrides[lang] || {}));
  }, [lang, overrides]);

  const update = useCallback((path, val) => {
    setData((prev) => setIn(prev, path, val));
    setSaved(false);
  }, []);

  const save = async () => {
    const o = { ...overrides, [lang]: data };
    await saveContent(o);
    setOverrides(o);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const reset = async () => {
    if (!confirm(`Сбросить все правки для языка ${lang.toUpperCase()}?`)) return;
    const o = { ...overrides };
    delete o[lang];
    await saveContent(o);
    setOverrides(o);
    setData(deepMerge(STRINGS.en, STRINGS[lang] || {}));
  };

  if (!data) return null;

  return (
    <div>
      <div className="flex items-center gap-2 flex-wrap mb-6">
        {LANGS.map((l) => (
          <button key={l.code} className={`adm-pill ${l.code === lang ? "adm-pill-on" : ""}`} onClick={() => setLang(l.code)}>
            {l.flag} {l.code.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="adm-banner !mb-5">
        <Type size={15} aria-hidden="true" />
        <span>Правки сохраняются поверх встроенных переводов и сразу применяются на сайте. Язык: <b>{LANGS.find((l) => l.code === lang)?.name}</b></span>
        <div className="flex gap-2 ml-auto shrink-0">
          <button className="adm-btn-sm" onClick={reset}><RefreshCw size={13} aria-hidden="true" /> Сбросить язык</button>
          <button className="adm-btn-sm adm-btn-acc" onClick={save}>{saved ? <Check size={13} aria-hidden="true" /> : null} {saved ? "Сохранено" : "Сохранить"}</button>
        </div>
      </div>

      {Object.keys(SECTION_LABELS).map((sec) => (
        <div key={sec} className={`adm-acc ${openSec === sec ? "adm-acc-open" : ""}`}>
          <button className="adm-acc-head" onClick={() => setOpenSec(openSec === sec ? "" : sec)}>
            <span className="font-display uppercase tracking-wide">{SECTION_LABELS[sec]}</span>
            <span className="font-mono text-[10px] text-[var(--text-secondary)]">{sec}</span>
            <ChevronDown size={16} className="adm-acc-chev" aria-hidden="true" />
          </button>
          {openSec === sec && (
            <div className="adm-acc-body">
              <Node obj={data[sec]} path={[sec]} update={update} />
            </div>
          )}
        </div>
      ))}

      <div className="sticky bottom-4 flex justify-end mt-6">
        <button className="btn btn-primary !py-3 !px-7" onClick={save}>
          {saved ? <Check size={16} aria-hidden="true" /> : null} {saved ? "Сохранено" : "Сохранить изменения"}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   МЕДИА — слоты, галерея, пруфы, видео, загрузка
   ============================================================ */
const SLOTS = [
  { key: "heroVideo", label: "Фоновое видео в хиро", type: "video" },
  { key: "heroPoster", label: "Постер видео (фолбэк)", type: "photo" },
  { key: "heroCard", label: "Портрет в хиро", type: "photo" },
  { key: "dossierBig1", label: "Фото — карточка «Baseball choke»", type: "photo" },
  { key: "dossierBig2", label: "Фото — карточка «Психология»", type: "photo" },
  { key: "ctaBg", label: "Фон CTA-баннера", type: "photo" },
];

function Thumb({ src, type }) {
  return type === "video" ? (
    <video src={src + "#t=0.5"} muted preload="metadata" playsInline className="adm-thumb" />
  ) : (
    <img src={src} alt="" loading="lazy" decoding="async" className="adm-thumb" />
  );
}

function Picker({ type, current, library, onPick, onClose }) {
  const lib = library.filter((m) => (type === "any" ? true : m.type === type || (type === "photo" && m.type === "proof")));
  return (
    <div className="lightbox !cursor-default" onClick={onClose}>
      <div className="adm-picker" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display uppercase text-[18px] m-0">Выбор медиа</h3>
          <button className="burger" onClick={onClose} aria-label="Закрыть"><X size={18} /></button>
        </div>
        <div className="adm-picker-grid">
          {lib.map((m) => (
            <button key={m.id} className={`adm-pick ${m.src === current ? "adm-pick-on" : ""}`} onClick={() => onPick(m.src)} title={m.label}>
              <Thumb src={m.src} type={m.type === "video" ? "video" : "photo"} />
              <span className="adm-pick-label">{m.label}</span>
              {m.src === current && <span className="adm-pick-check"><Check size={13} /></span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function OrderedListEditor({ title, type, list, library, onChange }) {
  const move = (idx, dir) => {
    const next = [...list];
    const to = idx + dir;
    if (to < 0 || to >= next.length) return;
    [next[idx], next[to]] = [next[to], next[idx]];
    onChange(next);
  };

  const remove = (idx) => {
    const next = list.filter((_, i) => i !== idx);
    if (next.length === 0) return;
    onChange(next);
  };

  const add = (src) => {
    if (!list.includes(src)) onChange([...list, src]);
  };

  const inList = new Set(list);
  const available = library.filter((m) => {
    const typeMatch =
      type === "proof" ? (m.type === "proof" || m.type === "photo") :
      m.type === type;
    return typeMatch && !inList.has(m.src);
  });

  return (
    <div className="adm-card adm-span2">
      <h3 className="adm-card-t">
        {title}
        <span className="font-mono text-[10px] text-[var(--text-secondary)]"> выбрано: {list.length}</span>
      </h3>

      <div className="flex flex-col gap-2 mb-5">
        {list.map((src, idx) => {
          const item = library.find((m) => m.src === src);
          const isVideo = /\.(mp4|webm|mov)$/i.test(src);
          return (
            <div key={src + idx} className="flex items-center gap-3 bg-[rgba(255,207,3,.05)] border border-[rgba(255,207,3,.12)] rounded-[10px] p-2 pr-3">
              <div className="shrink-0"><Thumb src={src} type={isVideo ? "video" : "photo"} /></div>
              <span className="text-[12px] flex-1 truncate min-w-0 text-[var(--text-secondary)]">
                {item?.label || src.split("/").pop()}
              </span>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  className="adm-btn-sm !py-1 !px-1.5 disabled:opacity-25"
                  disabled={idx === 0}
                  onClick={() => move(idx, -1)}
                  title="Вверх"
                ><ArrowUp size={12} /></button>
                <button
                  className="adm-btn-sm !py-1 !px-1.5 disabled:opacity-25"
                  disabled={idx === list.length - 1}
                  onClick={() => move(idx, 1)}
                  title="Вниз"
                ><ArrowDown size={12} /></button>
                <button
                  className="adm-btn-sm !py-1 !px-1.5 !text-[#ff6b6b] disabled:opacity-25"
                  disabled={list.length === 1}
                  onClick={() => remove(idx)}
                  title="Удалить"
                ><X size={12} /></button>
              </div>
            </div>
          );
        })}
      </div>

      {available.length > 0 && (
        <>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)] mb-2">
            Добавить из медиатеки
          </p>
          <div className="adm-picker-grid">
            {available.map((m) => (
              <button key={m.id} className="adm-pick" onClick={() => add(m.src)} title={m.label}>
                <Thumb src={m.src} type={m.type === "video" ? "video" : "photo"} />
                <span className="adm-pick-label">{m.label}</span>
                <span className="adm-pick-check"><Plus size={13} /></span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function MediaTab() {
  const [media, setMediaState] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [picker, setPicker] = useState(null); // {key, type}

  useEffect(() => {
    fetchMedia().then(setMediaState);
    fetchUploads().then(setUploads);
  }, []);

  const library = useMemo(() => buildLibrary(uploads), [uploads]);

  const commit = (next) => {
    setMediaState(next);
    saveMedia(next);
  };

  const setList = (listKey) => (next) => {
    commit({ ...media, [listKey]: next });
  };

  const onUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isVideo = file.type.startsWith("video/");
    const maxMB = isVideo ? 35 : 8;
    if (file.size > maxMB * 1024 * 1024) {
      alert(`Файл больше ${maxMB} МБ — выберите файл поменьше.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      await uploadMedia(file.name, reader.result, isVideo ? "video" : "photo");
      setUploads(await fetchUploads());
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  if (!media) return <div className="adm-banner"><RefreshCw size={15} className="spin" aria-hidden="true" /> Загрузка медиатеки…</div>;

  return (
    <div>
      <div className="adm-banner !mb-6">
        <ImageIcon size={15} aria-hidden="true" />
        <span>Все фото и видео — из папки <b>images</b> проекта, хранятся на сервере. Назначайте их на слоты сайта, управляйте галереей и пруфами, загружайте новые изображения.</span>
        <button className="adm-btn-sm" onClick={() => { commit(DEFAULT_MEDIA); }}><RefreshCw size={13} aria-hidden="true" /> Сбросить медиа</button>
      </div>

      <div className="adm-grid">
        {SLOTS.map((s) => (
          <div key={s.key} className="adm-card">
            <h3 className="adm-card-t">{s.label}</h3>
            <div className="flex items-center gap-4">
              <Thumb src={media[s.key]} type={s.type} />
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] text-[var(--text-secondary)] break-all">{String(media[s.key]).slice(0, 48)}</span>
                <button className="adm-btn-sm adm-btn-acc w-fit" onClick={() => setPicker(s)}>Изменить</button>
              </div>
            </div>
          </div>
        ))}

        <OrderedListEditor title="Галерея «Фото»" type="photo" list={media.gallery} library={library} onChange={setList("gallery")} />
        <OrderedListEditor title="Секция «Пруфы» (протоколы и рейтинги)" type="proof" list={media.proofs} library={library} onChange={setList("proofs")} />
        <OrderedListEditor title="Видео в секции «Бои»" type="video" list={media.videos} library={library} onChange={setList("videos")} />

        <div className="adm-card adm-span2">
          <h3 className="adm-card-t">Загрузка фото и видео</h3>
          <label className="adm-drop">
            <Upload size={20} aria-hidden="true" />
            <span>Нажмите, чтобы выбрать фото (до 8 МБ) или видео (до 35 МБ) — файл сохранится на сервере и появится в медиатеке</span>
            <input type="file" accept="image/*,video/*" className="hidden" onChange={onUpload} />
          </label>
          {uploads.length > 0 && (
            <div className="adm-picker-grid mt-4">
              {uploads.map((u) => (
                <div key={u.id} className="adm-pick">
                  <Thumb src={u.src} type={u.type === "video" ? "video" : "photo"} />
                  <span className="adm-pick-label">{u.name}</span>
                  <button className="adm-pick-check !bg-[#b91c1c]" onClick={async () => { await deleteUpload(u.id); setUploads(await fetchUploads()); }} aria-label="Удалить">
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {picker && (
        <Picker
          type={picker.type}
          current={media[picker.key]}
          library={library}
          onClose={() => setPicker(null)}
          onPick={(src) => {
            commit({ ...media, [picker.key]: src });
            setPicker(null);
          }}
        />
      )}
    </div>
  );
}

/* ============================================================
   НАСТРОЙКИ
   ============================================================ */
function SettingsTab() {
  const [s, setS] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetchSettings().then(setS); }, []);

  const save = async () => {
    await saveSettings(s);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const upd = (path, val) => {
    setS((prev) => setIn(prev, path, val));
    setSaved(false);
  };

  if (!s) return <div className="adm-banner"><RefreshCw size={15} className="spin" aria-hidden="true" /> Загрузка настроек…</div>;

  return (
    <div className="adm-grid">
      <div className="adm-card">
        <h3 className="adm-card-t">Ссылки на соцсети</h3>
        {["instagram", "youtube", "telegram", "reel"].map((k) => (
          <Field key={k} label={k} value={s.links[k]} onChange={(v) => upd(["links", k], v)} />
        ))}
      </div>

      <div className="adm-card">
        <h3 className="adm-card-t">Каунтдаун до чемпионата</h3>
        <div className="adm-field">
          <label className="adm-label">Дата и время</label>
          <input type="datetime-local" className="adm-input" value={s.countdownTarget} onChange={(e) => upd(["countdownTarget"], e.target.value)} />
        </div>
        <label className="flex items-center gap-2 text-[13px] mt-3 cursor-pointer">
          <input type="checkbox" checked={s.countdownEnabled} onChange={(e) => upd(["countdownEnabled"], e.target.checked)} />
          Показывать каунтдаун на сайте
        </label>
        <button className="btn btn-primary !py-2.5 !px-6 !text-[13.5px] mt-5" onClick={save}>
          {saved ? <Check size={15} aria-hidden="true" /> : null} {saved ? "Сохранено" : "Сохранить настройки"}
        </button>
      </div>

      <div className="adm-card adm-span2">
        <h3 className="adm-card-t !text-[#ff6b6b]">Опасная зона</h3>
        <div className="flex gap-3 flex-wrap">
          <button className="adm-btn-sm" onClick={async () => { await clearDemo(); alert("Демо-данные аналитики удалены."); }}>
            <Trash2 size={13} aria-hidden="true" /> Удалить демо-аналитику
          </button>
          <button className="adm-btn-sm" onClick={async () => { if (confirm("Удалить ВСЮ аналитику безвозвратно?")) { await clearAll(); alert("Аналитика очищена."); } }}>
            <Trash2 size={13} aria-hidden="true" /> Очистить всю аналитику
          </button>
          <button className="adm-btn-sm" onClick={async () => { if (confirm("Сбросить все правки контента, медиа и настроек к заводским?")) { await resetAllContent(); location.reload(); } }}>
            <RefreshCw size={13} aria-hidden="true" /> Полный сброс контента
          </button>
        </div>
        <p className="text-[12px] text-[var(--text-secondary)] mt-4 m-0">
          Все данные хранятся на сервере (server/data): контент, медиа-назначения и аналитика — общие для всех посетителей. Сессия администратора — по токену в этом браузере.
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   ЗАЯВКИ — сообщения с формы связи
   ============================================================ */
const LANG_FLAG = Object.fromEntries(LANGS.map((l) => [l.code, l.flag]));

function ContactsTab() {
  const [items, setItems] = useState(null);
  const reload = useCallback(() => { fetchContacts().then((c) => setItems(c.slice().reverse())); }, []);
  useEffect(() => { reload(); }, [reload]);

  if (!items) return <div className="adm-banner"><RefreshCw size={15} className="spin" aria-hidden="true" /> Загрузка заявок…</div>;

  return (
    <div>
      <div className="adm-banner !mb-6">
        <Inbox size={15} aria-hidden="true" />
        <span>Сообщения с формы связи на сайте. Всего: <b>{items.length}</b>. Копятся на сервере со всех посетителей.</span>
        <div className="flex gap-2 ml-auto shrink-0">
          <button className="adm-btn-sm" onClick={reload}><RefreshCw size={13} aria-hidden="true" /> Обновить</button>
          {items.length > 0 && (
            <button className="adm-btn-sm" onClick={async () => { if (confirm("Удалить все заявки?")) { await clearContacts(); reload(); } }}>
              <Trash2 size={13} aria-hidden="true" /> Очистить
            </button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="adm-card text-center text-[var(--text-secondary)] py-12">
          <Inbox size={30} className="mx-auto mb-3 opacity-50" aria-hidden="true" />
          Заявок пока нет. Сообщения с формы «{`Связь`}» на сайте появятся здесь.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((c) => (
            <div key={c.id} className="adm-card !p-0 overflow-hidden">
              <div className="flex items-center gap-3 flex-wrap px-5 py-3 border-b border-[var(--border)] bg-[rgba(244,241,230,.03)]">
                <span className="font-display uppercase font-semibold text-[15px]">{c.name}</span>
                <a href={`mailto:${c.email}`} className="f-link font-mono text-[12px] !text-[var(--accent)]">{c.email}</a>
                <span className="font-mono text-[10px] text-[var(--text-secondary)] ml-auto">
                  {LANG_FLAG[c.lang] || ""} {new Date(c.t).toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <p className="px-5 py-4 m-0 text-[14px] leading-relaxed whitespace-pre-wrap">{c.message}</p>
              <div className="px-5 pb-4">
                <a href={`mailto:${c.email}?subject=${encodeURIComponent("Re: The Baseball Bat")}`} className="adm-btn-sm adm-btn-acc w-fit">
                  <Mail size={13} aria-hidden="true" /> Ответить
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   ОБОЛОЧКА АДМИНКИ — /admin
   ============================================================ */
const TABS = [
  { id: "overview", label: "Обзор", icon: LayoutDashboard },
  { id: "contacts", label: "Заявки", icon: Inbox },
  { id: "content", label: "Контент", icon: Type },
  { id: "media", label: "Медиа", icon: ImageIcon },
  { id: "settings", label: "Настройки", icon: SettingsIcon },
];

export default function Admin({ navigate }) {
  const [tab, setTab] = useState("overview");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hasToken()) {
      navigate("/admin/login");
      return;
    }
    verifyAuth().then((ok) => (ok ? setReady(true) : navigate("/admin/login")));
  }, [navigate]);

  useEffect(() => {
    document.documentElement.dir = "ltr";
    document.documentElement.lang = "ru";
  }, []);

  if (!ready) {
    return (
      <div className="adm-login-wrap">
        <div className="adm-banner"><RefreshCw size={15} className="spin" aria-hidden="true" /> Проверка доступа…</div>
      </div>
    );
  }

  return (
    <div className="adm">
      <aside className="adm-side">
        <div className="flex items-center gap-3 mb-9">
          <span className="logo-box font-display">VN</span>
          <div className="leading-none">
            <div className="font-display uppercase tracking-[.12em] text-[13.5px] font-semibold">Admin</div>
            <div className="font-mono text-[9px] tracking-[.25em] text-[var(--accent)] uppercase mt-1">baseball bat</div>
          </div>
        </div>
        <nav className="flex flex-col gap-1.5" aria-label="Admin navigation">
          {TABS.map((t) => (
            <button key={t.id} className={`adm-nav ${tab === t.id ? "adm-nav-on" : ""}`} onClick={() => setTab(t.id)}>
              <t.icon size={16} aria-hidden="true" /> {t.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-1.5">
          <button className="adm-nav" onClick={() => navigate("/")}>
            <ExternalLink size={16} aria-hidden="true" /> Открыть сайт
          </button>
          <button className="adm-nav !text-[#ff6b6b]" onClick={async () => { await logout(); navigate("/admin/login"); }}>
            <LogOut size={16} aria-hidden="true" /> Выйти
          </button>
        </div>
      </aside>

      <main className="adm-main">
        <header className="adm-head">
          <h1 className="font-display uppercase font-bold text-[clamp(20px,3vw,28px)] m-0">
            {TABS.find((t) => t.id === tab)?.label}
          </h1>
          <span className="font-mono text-[11px] text-[var(--text-secondary)]">vladimir.n@thebaseballbat.com</span>
        </header>
        {tab === "overview" && <Overview />}
        {tab === "contacts" && <ContactsTab />}
        {tab === "content" && <ContentTab />}
        {tab === "media" && <MediaTab />}
        {tab === "settings" && <SettingsTab />}
      </main>
    </div>
  );
}
