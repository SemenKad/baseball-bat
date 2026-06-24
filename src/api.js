/* ============================================================
   api.js — тонкий клиент к бэкенду. Один origin: /api/*
   (в dev проксируется Vite на localhost:8787, в prod — тот же сервер).
   ============================================================ */
const TOKEN_KEY = "bb_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => (t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY));

export async function req(path, { method = "GET", body, auth = false } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) headers.Authorization = "Bearer " + (getToken() || "");
  const res = await fetch("/api" + path, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) {
    if (auth) setToken(null);
    throw new Error("unauthorized");
  }
  if (!res.ok) {
    const msg = await res.json().catch(() => ({}));
    throw new Error(msg.error || res.statusText);
  }
  return res.status === 204 ? null : res.json();
}

/* «тихий» вызов — для аналитики и не-критичных запросов */
export async function safe(path, opts) {
  try {
    return await req(path, opts);
  } catch {
    return null;
  }
}
