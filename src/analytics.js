/* ============================================================
   analytics.js — события шлются на сервер (см. api.js), статистика
   копится со всех посетителей. track() — «тихий» fire-and-forget.
   Агрегация считается на клиенте по данным с сервера.
   ============================================================ */
import { safe, req } from "./api";

function sid() {
  let s = sessionStorage.getItem("bb_sid");
  if (!s) {
    s = Math.random().toString(36).slice(2, 10);
    sessionStorage.setItem("bb_sid", s);
  }
  return s;
}

export function track(type, meta = {}) {
  safe("/track", {
    method: "POST",
    body: {
      type,
      sid: sid(),
      lang: localStorage.getItem("bb_lang") || "en",
      dev: window.innerWidth < 768 ? "mobile" : "desktop",
      ...meta,
    },
  });
}

export const getEvents = () => safe("/analytics", { auth: true }).then((e) => e || []);
export const clearDemo = () => req("/analytics/clear-demo", { method: "POST", auth: true });
export const clearAll = () => req("/analytics/clear-all", { method: "POST", auth: true });
export const hasDemo = (events) => events.some((e) => e.demo);

/* ---------------- Агрегации для графиков ---------------- */
export const dayKey = (t) => {
  const d = new Date(t);
  return `${d.getMonth() + 1}/${d.getDate()}`;
};

export function aggregate(events) {
  const visits = events.filter((e) => e.type === "visit");
  const clicks = events.filter((e) => e.type === "click");
  const submits = events.filter((e) => e.type === "submit");
  const sections = events.filter((e) => e.type === "section");
  const videos = events.filter((e) => e.type === "video");

  const days = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    d.setHours(0, 0, 0, 0);
    days.push({ key: dayKey(d.getTime()), t0: d.getTime(), t1: d.getTime() + 86400000, visits: 0, clicks: 0 });
  }
  for (const v of visits) {
    const slot = days.find((d) => v.t >= d.t0 && v.t < d.t1);
    if (slot) slot.visits++;
  }
  for (const c of clicks) {
    const slot = days.find((d) => c.t >= d.t0 && c.t < d.t1);
    if (slot) slot.clicks++;
  }

  const count = (arr, key = "id") => {
    const m = {};
    for (const e of arr) m[e[key]] = (m[e[key]] || 0) + 1;
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  };

  const hours = Array.from({ length: 24 }, () => 0);
  for (const v of visits) hours[new Date(v.t).getHours()]++;

  const heat = Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => 0));
  for (const v of visits) {
    const d = new Date(v.t);
    heat[(d.getDay() + 6) % 7][d.getHours()]++;
  }

  const weekdays = Array.from({ length: 7 }, () => 0);
  for (const v of visits) weekdays[(new Date(v.t).getDay() + 6) % 7]++;

  const uniqSessions = new Set(visits.map((v) => v.sid)).size;
  const today0 = new Date();
  today0.setHours(0, 0, 0, 0);
  const todayVisits = visits.filter((v) => v.t >= today0.getTime()).length;

  return {
    totals: {
      visits: visits.length,
      uniq: uniqSessions,
      today: todayVisits,
      clicks: clicks.length,
      submits: submits.length,
      videoPlays: videos.length,
      ctr: visits.length ? Math.round((clicks.length / visits.length) * 100) : 0,
      conv: visits.length ? ((submits.length / visits.length) * 100).toFixed(1) : "0.0",
    },
    days,
    hours,
    heat,
    weekdays,
    byLink: count(clicks),
    bySection: count(sections),
    byLang: count(visits, "lang"),
    byDev: count(visits, "dev"),
    recent: [...events].sort((a, b) => b.t - a.t).slice(0, 40),
  };
}
