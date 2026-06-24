/* ============================================================
   store.js — данные сайта через бэкенд (см. api.js).
   Контент/медиа/настройки/загрузки живут на сервере и видны всем.
   Язык интерфейса — персональная настройка, остаётся в localStorage.
   ============================================================ */
import { deepMerge } from "./i18n";
import { req, safe, getToken, setToken } from "./api";

/* ---------------- Встроенная медиатека (файлы из /public/media) ---------------- */
export const MEDIA_LIBRARY = [
  { id: "portrait", src: "/media/portrait.jpeg", type: "photo", label: "Студийный портрет (ч/б)" },
  { id: "wink", src: "/media/wink.jpeg", type: "photo", label: "Подмигивание после боя" },
  { id: "mat", src: "/media/mat.jpeg", type: "photo", label: "На татами, ч/б" },
  { id: "medal", src: "/media/medal.jpeg", type: "photo", label: "Золото и синий пояс" },
  { id: "podium", src: "/media/podium.jpeg", type: "photo", label: "Подиум AJP Qatar" },
  { id: "arena", src: "/media/arena.jpeg", type: "photo", label: "Арена, Турция" },
  { id: "gym", src: "/media/gym.jpeg", type: "photo", label: "Зал, худи AJP" },
  { id: "story-1", src: "/media/story-1.jpeg", type: "photo", label: "Стори 1" },
  { id: "story-2", src: "/media/story-2.jpeg", type: "photo", label: "Стори 2" },
  { id: "story-3", src: "/media/story-3.jpeg", type: "photo", label: "Стори 3" },
  { id: "rank-global", src: "/media/rank-global.jpeg", type: "proof", label: "Рейтинг: мир #2" },
  { id: "rank-na", src: "/media/rank-na.jpeg", type: "proof", label: "Рейтинг: Сев. Америка #1" },
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `proof-${String(i + 1).padStart(2, "0")}`,
    src: `/media/proof-${String(i + 1).padStart(2, "0")}.jpeg`,
    type: "proof",
    label: `Протокол турнира ${i + 1}`,
  })),
  { id: "fight-main", src: "/media/fight-main.mp4", type: "video", label: "Полный бой (главное видео)" },
  { id: "clip-1", src: "/media/clip-1.mp4", type: "video", label: "Клип 1" },
  { id: "clip-2", src: "/media/clip-2.mp4", type: "video", label: "Клип 2" },
  { id: "clip-3", src: "/media/clip-3.mp4", type: "video", label: "Клип 3" },
  { id: "clip-4", src: "/media/clip-4.mp4", type: "video", label: "Клип 4" },
];

export const DEFAULT_MEDIA = {
  heroVideo: "/media/clip-1.mp4",
  heroPoster: "/media/mat.jpeg",
  heroCard: "/media/portrait.jpeg",
  dossierBig1: "/media/podium.jpeg",
  dossierBig2: "/media/wink.jpeg",
  ctaBg: "/media/mat.jpeg",
  gallery: [
    "/media/medal.jpeg", "/media/podium.jpeg", "/media/arena.jpeg", "/media/gym.jpeg",
    "/media/wink.jpeg", "/media/mat.jpeg", "/media/story-1.jpeg", "/media/story-2.jpeg",
    "/media/story-3.jpeg", "/media/portrait.jpeg",
  ],
  videos: ["/media/fight-main.mp4", "/media/clip-1.mp4", "/media/clip-2.mp4", "/media/clip-3.mp4", "/media/clip-4.mp4"],
  proofs: [
    "/media/rank-na.jpeg", "/media/rank-global.jpeg",
    ...Array.from({ length: 15 }, (_, i) => `/media/proof-${String(i + 1).padStart(2, "0")}.jpeg`),
  ],
};

export const DEFAULT_SETTINGS = {
  links: {
    instagram: "https://www.instagram.com/the_baseball_bat_fighter",
    youtube: "https://youtube.com/@the_baseball_bat",
    telegram: "https://t.me/the_baseball_bat",
    reel: "https://www.instagram.com/reel/DSDvlFqjF4e/",
  },
  countdownTarget: "2026-11-20T10:00:00",
  countdownEnabled: true,
};

/* ---------------- Контент (оверрайды переводов по языкам) ---------------- */
export const fetchContent = () => safe("/content").then((o) => o || {});
export const saveContent = (o) => req("/content", { method: "PUT", body: o, auth: true });

/* ---------------- Медиа: сервер хранит назначения, мерджим с дефолтами ---------------- */
export const fetchMediaRaw = () => safe("/media").then((o) => o || {});
export const fetchMedia = () => fetchMediaRaw().then((o) => deepMerge(DEFAULT_MEDIA, o));
export const saveMedia = (m) => req("/media", { method: "PUT", body: m, auth: true });

/* ---------------- Настройки ---------------- */
export const fetchSettings = () => safe("/settings").then((o) => deepMerge(DEFAULT_SETTINGS, o || {}));
export const saveSettings = (s) => req("/settings", { method: "PUT", body: s, auth: true });

/* ---------------- Загрузки ---------------- */
export const fetchUploads = () => safe("/uploads").then((u) => u || []);
export const uploadMedia = (name, dataUrl, type = "photo") => req("/uploads", { method: "POST", body: { name, dataUrl, type }, auth: true });
export const deleteUpload = (id) => req("/uploads/" + id, { method: "DELETE", auth: true });

/* Полная медиатека: встроенные файлы + загруженные через админку */
export const buildLibrary = (uploads = []) => [
  ...MEDIA_LIBRARY,
  ...uploads.map((u) => ({ id: u.id, src: u.src, type: u.type || "photo", label: u.name + " (загружено)" })),
];

/* ---------------- Заявки с формы связи ---------------- */
export const sendContact = (data) => req("/contact", { method: "POST", body: data });
export const fetchContacts = () => safe("/contacts", { auth: true }).then((c) => c || []);
export const clearContacts = () => req("/contacts/clear", { method: "POST", auth: true });

/* ---------------- Сброс контента ---------------- */
export const resetAllContent = () => req("/reset", { method: "POST", auth: true });

/* ---------------- Язык (персонально, в браузере) ---------------- */
export const getLang = () => localStorage.getItem("bb_lang") || "en";
export const setLang = (l) => localStorage.setItem("bb_lang", l);

/* ---------------- Авторизация ---------------- */
export async function login(email, pass) {
  try {
    const { token } = await req("/auth/login", { method: "POST", body: { email, password: pass } });
    setToken(token);
    return true;
  } catch {
    return false;
  }
}
export const hasToken = () => !!getToken();
export const verifyAuth = () => safe("/auth/me", { auth: true }).then((r) => !!r?.ok);
export async function logout() {
  await safe("/auth/logout", { method: "POST", auth: true });
  setToken(null);
}
