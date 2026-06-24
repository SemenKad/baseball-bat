import { useState, useEffect, useRef, useCallback, createContext, useContext, useMemo } from "react";
import {
  Menu, X, ChevronDown, ArrowRight, Play, Star, Check,
  Send, Trophy, Zap, Shield, MapPin, Flame, Crown, Globe,
  Quote, Loader2, Users, Video, Target, TrendingUp, Dumbbell, Plane, Mountain,
} from "lucide-react";
import { LANGS, getStrings, deepMerge } from "./i18n";
import { fetchMedia, fetchSettings, getLang, setLang as persistLang, fetchContent, DEFAULT_MEDIA, DEFAULT_SETTINGS } from "./store";
import { track } from "./analytics";

/* Брендовые иконки убраны из lucide-react — рисуем их в том же штриховом стиле */
function Instagram({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function Youtube({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const EASE = "cubic-bezier(.16,1,.3,1)";
const Ctx = createContext(null);
const useSite = () => useContext(Ctx);

/* ---------- IntersectionObserver reveal ---------- */
function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, vis];
}

function Reveal({ children, delay = 0, className = "", y = 40 }) {
  const [ref, vis] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : `translateY(${y}px)`,
        transition: `opacity .7s ${EASE} ${delay}ms, transform .7s ${EASE} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* счётчик секций для аналитики: одно событие на секцию за загрузку */
function useSectionTracking() {
  useEffect(() => {
    const seen = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !seen.has(e.target.id)) {
            seen.add(e.target.id);
            track("section", { id: e.target.id });
          }
        }
      },
      { threshold: 0.25 }
    );
    document.querySelectorAll("section[id]").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
}

/* ---------- Счётчик: rAF + easeOutExpo ---------- */
function CounterNum({ to, suffix = "", duration = 2200 }) {
  const [ref, vis] = useReveal();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!vis) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const e = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setVal(Math.round(to * e));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [vis, to, duration]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ---------- Заголовок секции ---------- */
function SecHead({ kicker, t1, t2, sub, center = false }) {
  return (
    <div className={`mb-[clamp(36px,5vw,64px)] ${center ? "text-center" : ""}`}>
      <Reveal>
        <span className="kicker">{kicker}</span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="font-display uppercase font-bold leading-[1.05] mt-4" style={{ fontSize: "clamp(28px,5vw,56px)" }}>
          <span style={{ opacity: .72 }}>{t1}</span> <span className="grad-text">{t2}</span>
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={160}>
          <p
            className={`mt-5 max-w-[640px] text-[var(--text-secondary)] leading-relaxed ${center ? "mx-auto" : ""}`}
            style={{ fontSize: "clamp(15px,1.6vw,17px)" }}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- Переключатель языка ---------- */
function LangSwitcher({ compact = false }) {
  const { lang, changeLang } = useSite();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);
  const current = LANGS.find((l) => l.code === lang) || LANGS[0];

  if (compact) {
    return (
      <div className="lang-grid">
        {LANGS.map((l) => (
          <button
            key={l.code}
            className={`lang-cell ${l.code === lang ? "lang-on" : ""}`}
            onClick={() => changeLang(l.code)}
            aria-label={l.name}
          >
            <span>{l.flag}</span> {l.code.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="relative" ref={ref}>
      <button className="lang-btn" onClick={() => setOpen(!open)} aria-label="Language" aria-expanded={open}>
        <Globe size={15} aria-hidden="true" />
        <span>{current.flag}</span>
        <span className="font-mono text-[11px]">{current.code.toUpperCase()}</span>
        <ChevronDown size={13} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .3s" }} aria-hidden="true" />
      </button>
      <div className={`lang-menu ${open ? "lang-menu-open" : ""}`}>
        {LANGS.map((l) => (
          <button
            key={l.code}
            className={`lang-item ${l.code === lang ? "lang-on" : ""}`}
            onClick={() => {
              changeLang(l.code);
              setOpen(false);
            }}
          >
            <span>{l.flag}</span> {l.name}
            {l.code === lang && <Check size={14} className="ml-auto text-[var(--accent)]" aria-hidden="true" />}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================ NAVBAR ============================ */
function Navbar() {
  const { L } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const NAV_LINKS = [
    [L.nav.dossier, "#dossier"], [L.nav.stats, "#stats"], [L.nav.path, "#path"],
    [L.nav.media, "#media"], [L.nav.voices, "#voices"], [L.nav.training, "#training"], [L.nav.faq, "#faq"],
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="wrap flex items-center justify-between h-[72px] gap-4">
          <a href="#home" className="flex items-center gap-3 no-underline shrink-0" onClick={close}>
            <span className="logo-box font-display">VN</span>
            <span className="leading-none hidden sm:block">
              <span className="block font-display font-semibold uppercase tracking-[.14em] text-[15px] text-[var(--text-primary)]">
                Nagoryansky
              </span>
              <span className="block font-mono text-[9.5px] tracking-[.3em] text-[var(--accent)] mt-1 uppercase">
                the baseball bat
              </span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {NAV_LINKS.map(([label, href]) => (
              <a key={href} href={href} className="nav-link" onClick={() => track("click", { id: "nav-" + href.slice(1) })}>
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LangSwitcher />
            <a href="#cta" className="btn btn-primary nav-cta !py-[10px] !px-5 !text-[13.5px]" onClick={() => track("click", { id: "nav-join" })}>
              {L.nav.join}
            </a>
            <button className="burger nav-burger" aria-label="Menu" onClick={() => setOpen(true)}>
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <div className={`overlay ${open ? "show" : ""}`} onClick={close} aria-hidden="true" />
      <aside className={`drawer ${open ? "open" : ""}`} aria-label="Mobile menu">
        <div className="flex items-center justify-between mb-8">
          <span className="logo-box font-display">VN</span>
          <button className="burger" aria-label="Close menu" onClick={close}>
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
          {NAV_LINKS.map(([label, href], i) => (
            <a key={href} href={href} onClick={close} className="drawer-link font-display" style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}>
              {label}
            </a>
          ))}
        </nav>
        <div className="mt-6">
          <LangSwitcher compact />
        </div>
        <a href="#cta" onClick={close} className="btn btn-primary mt-8 justify-center">
          {L.nav.join} <ArrowRight size={17} />
        </a>
      </aside>
    </>
  );
}

/* ============================ HERO ============================ */
function Hero() {
  const { L, media, settings, openLightbox } = useSite();
  const bgRef = useRef(null);
  const [typed, setTyped] = useState("");
  const words = L.hero.typed;

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) bgRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.3}px, 0) scale(1.12)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let w = 0, c = 0, dir = 1, hold = 0;
    const id = setInterval(() => {
      if (hold > 0) { hold--; return; }
      const word = words[w];
      c += dir;
      setTyped(word.slice(0, c));
      if (dir === 1 && c === word.length) { dir = -1; hold = 24; }
      else if (dir === -1 && c === 0) { dir = 1; w = (w + 1) % words.length; hold = 5; }
    }, 65);
    return () => clearInterval(id);
  }, [words]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-[110px] pb-[70px]">
      {/* фон: видео + параллакс */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform" style={{ transform: "scale(1.12)" }}>
        <video
          className="w-full h-full object-cover opacity-50"
          src={media.heroVideo}
          poster={media.heroPoster}
          autoPlay
          muted
          loop
          playsInline
          aria-label="Background fight footage"
        />
      </div>
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(100deg, rgba(28,28,28,.97) 0%, rgba(28,28,28,.88) 48%, rgba(28,28,28,.6) 100%)" }}
      />
      <div className="blob blob-a" aria-hidden="true" />
      <div className="blob blob-b" aria-hidden="true" />

      <div className="wrap relative z-10 grid lg:grid-cols-[1.05fr_.95fr] gap-16 items-center w-full">
        <div>
          <div className="h-anim badge" style={{ "--del": "0ms", "--dur": "600ms" }}>
            <span className="pulse-dot" aria-hidden="true" />
            {L.hero.badge}
          </div>

          <h1 className="font-display uppercase font-bold leading-[.95] mt-7" style={{ fontSize: "clamp(36px,8vw,96px)" }}>
            <span className="block stroke-text h-anim" style={{ "--del": "100ms", "--dur": "800ms" }}>{L.hero.name1}</span>
            <span className="block grad-text h-anim" style={{ "--del": "200ms", "--dur": "800ms" }}>{L.hero.name2}</span>
          </h1>

          <div
            className="h-anim mt-5 font-display uppercase tracking-[.1em] text-[var(--accent)] font-medium"
            style={{ "--del": "300ms", "--dur": "700ms", fontSize: "clamp(17px,2.6vw,28px)" }}
          >
            <span>{typed}</span>
            <span className="type-cursor" aria-hidden="true" />
          </div>

          <p
            className="h-anim mt-6 max-w-[560px] text-[var(--text-secondary)] leading-relaxed"
            style={{ "--del": "350ms", "--dur": "700ms", fontSize: "clamp(15px,1.8vw,17.5px)" }}
          >
            {L.hero.sub}
          </p>

          <div className="h-anim mt-9 flex flex-wrap gap-4" style={{ "--del": "500ms", "--dur": "600ms" }}>
            <a href="#media" className="btn btn-primary" onClick={() => track("click", { id: "watch-fights" })}>
              <Play size={17} aria-hidden="true" /> {L.hero.btnFights}
            </a>
            <a href="#path" className="btn btn-ghost" onClick={() => track("click", { id: "my-story" })}>
              {L.hero.btnStory} <ChevronDown size={17} aria-hidden="true" />
            </a>
          </div>

          <div className="h-anim mt-10 flex items-center gap-4 flex-wrap" style={{ "--del": "650ms", "--dur": "600ms" }}>
            <div className="flex">
              {[media.gallery[0], media.gallery[1], media.gallery[2]].map((src, i) => (
                <img key={i} src={src} alt={`Tournament photo ${i + 1}`} loading="lazy" decoding="async" className="avatar cursor-pointer" onClick={() => openLightbox(src)} />
              ))}
              <button
                className="avatar avatar-more font-mono"
                onClick={() => track("click", { id: "rank-proof" }) || openLightbox(media.proofs[0])}
                aria-label={L.hero.rankChip}
              >
                #1
              </button>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="text-[var(--accent)]" fill="currentColor" aria-hidden="true" />
                ))}
                <span className="font-mono text-[11px] text-[var(--text-secondary)] ml-1">5.0</span>
              </div>
              <p className="text-[13.5px] text-[var(--text-secondary)] mt-1 m-0">
                <b className="text-[var(--text-primary)]">{L.hero.views}</b>
                <span className="block font-mono text-[10.5px] uppercase tracking-wider mt-0.5">{L.hero.record}</span>
              </p>
            </div>
          </div>
        </div>

        {/* портрет справа */}
        <div className="relative hidden lg:block h-anim-right">
          <div className="blob blob-img" aria-hidden="true" />
          <div className="hero-frame">
            <img
              src={media.heroCard}
              alt="Vladimir Nagoryansky — studio portrait in gi"
              loading="lazy"
              decoding="async"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div className="float-card" style={{ top: "8%", left: "-9%" }}>
            <Trophy size={20} className="text-[var(--accent)]" aria-hidden="true" />
            <div>
              <div className="font-mono text-[10px] tracking-[.18em] uppercase text-[var(--text-secondary)]">{L.hero.rankChip}</div>
              <div className="font-display font-bold text-[21px] leading-none mt-1">#1 NA · #2 W</div>
            </div>
          </div>
          <div className="float-card" style={{ bottom: "7%", right: "-7%", animationDelay: "-3.2s" }}>
            <Zap size={20} className="text-[var(--accent)]" aria-hidden="true" />
            <div>
              <div className="font-mono text-[10px] tracking-[.18em] uppercase text-[var(--text-secondary)]">baseball choke</div>
              <div className="font-display font-bold text-[21px] leading-none mt-1">50+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ COUNTDOWN ============================ */
const DATE_LOCALES = { en: "en-US", ru: "ru-RU", es: "es-ES", zh: "zh-CN", tr: "tr-TR", lv: "lv-LV", pt: "pt-PT", ar: "ar-AE", ja: "ja-JP", de: "de-DE" };

function Countdown() {
  const { L, lang, settings } = useSite();
  const target = new Date(settings.countdownTarget).getTime();
  const dateLabel = new Date(settings.countdownTarget).toLocaleDateString(DATE_LOCALES[lang] || "en-US", {
    day: "numeric", month: "long", year: "numeric",
  });
  const calc = () => Math.max(0, target - Date.now());
  const [left, setLeft] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setLeft(calc()), 1000);
    return () => clearInterval(id);
  }, [target]);
  if (!settings.countdownEnabled) return null;

  const d = Math.floor(left / 86400000);
  const h = Math.floor(left / 3600000) % 24;
  const m = Math.floor(left / 60000) % 60;
  const s = Math.floor(left / 1000) % 60;
  const cells = [[d, L.countdown.days], [h, L.countdown.hours], [m, L.countdown.mins], [s, L.countdown.secs]];

  return (
    <section className="count-sec" aria-label="Championship countdown">
      <div className="wrap flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-start">
          <div className="font-mono text-[11px] uppercase tracking-[.25em] text-[#1C1C1C]/70 font-bold">{L.countdown.label}</div>
          <div className="font-display uppercase font-bold text-[clamp(20px,2.6vw,30px)] text-[#1C1C1C] mt-1">{dateLabel}</div>
        </div>
        <div className="flex gap-3 sm:gap-5">
          {cells.map(([v, label]) => (
            <div key={label} className="count-cell">
              <div className="font-display font-bold leading-none" style={{ fontSize: "clamp(28px,4vw,46px)" }}>
                {String(v).padStart(2, "0")}
              </div>
              <div className="font-mono text-[9.5px] uppercase tracking-[.2em] mt-1 opacity-70">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ LOGOS / MARQUEE ============================ */
const LEAGUES = [
  "AJP Grand Slam Moscow", "AJP Qatar National", "AJP Switzerland National", "AJP Valencia International",
  "AJP Frankfurt International", "AJP Latvia National", "AJP Russia National", "ACBJJ Russia",
];

function LogosBar() {
  const { L } = useSite();
  return (
    <section className="py-[clamp(40px,6vw,70px)] border-y border-[var(--border)] bg-[var(--bg-deep)]">
      <div className="wrap">
        <p className="text-center font-mono text-[11px] uppercase tracking-[.3em] text-[var(--text-secondary)] mb-8">{L.marquee}</p>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...LEAGUES, ...LEAGUES].map((name, i) => (
            <span key={i} className="marquee-item">
              <Trophy size={17} aria-hidden="true" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ DOSSIER ============================ */
const CARD_ICONS = [Zap, Trophy, Shield, MapPin, Flame, Crown];

function FeatureCard({ icon: Icon, title, text, more, img, big = false, delay = 0, onImgClick }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className={`card ${big ? "justify-between" : ""}`}>
        {img && (
          <div className="card-img" onClick={onImgClick} role="button" aria-label={title}>
            <img src={img} alt={title} loading="lazy" decoding="async" />
          </div>
        )}
        <div className="flex flex-col gap-5 relative z-10">
          <div className="icon-box">
            <Icon size={22} aria-hidden="true" />
          </div>
          <h3 className="font-display uppercase font-semibold leading-tight" style={{ fontSize: big ? "clamp(24px,2.6vw,32px)" : "clamp(18px,1.8vw,21px)" }}>
            {title}
          </h3>
          <p className="text-[var(--text-secondary)] leading-relaxed text-[14.5px] m-0">{text}</p>
        </div>
        <a href="#path" className="more-link relative z-10">
          <span>{more}</span> <ArrowRight size={15} aria-hidden="true" />
        </a>
      </article>
    </Reveal>
  );
}

function Dossier() {
  const { L, media, openLightbox } = useSite();
  const c = L.dossier.cards;
  return (
    <section id="dossier" className="sec">
      <div className="wrap flex flex-col gap-5">
        <SecHead kicker={L.dossier.kicker} t1={L.dossier.t1} t2={L.dossier.t2} sub={L.dossier.sub} />

        {/* Hero: Baseball choke — горизонтальная карточка с фото */}
        <Reveal delay={0}>
          <div className="d-hero">
            <div className="d-hero-body">
              <div className="icon-box"><Zap size={22} aria-hidden="true" /></div>
              <h3 className="font-display uppercase font-semibold leading-tight" style={{ fontSize: "clamp(22px,2.4vw,30px)" }}>
                {c[0].title}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-[14.5px] m-0">{c[0].text}</p>
              <a href="#path" className="more-link w-fit">
                <span>{L.dossier.more}</span><ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="d-hero-img" onClick={() => openLightbox(media.dossierBig1)} role="button" aria-label={c[0].title}>
              <img src={media.dossierBig1} alt={c[0].title} loading="lazy" decoding="async" />
            </div>
          </div>
        </Reveal>

        {/* 3 равных карточки */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <FeatureCard icon={CARD_ICONS[1]} {...c[1]} more={L.dossier.more} delay={0} />
          <FeatureCard icon={CARD_ICONS[2]} {...c[2]} more={L.dossier.more} delay={80} />
          <FeatureCard icon={CARD_ICONS[3]} {...c[3]} more={L.dossier.more} delay={160} />
        </div>

        {/* Media + Psychology of ruthlessness */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-2 h-full">
            <FeatureCard icon={CARD_ICONS[4]} {...c[4]} more={L.dossier.more} delay={0} />
          </div>
          <Reveal delay={80} className="lg:col-span-3 h-full">
            <div
              className="d-bg-card"
              onClick={() => openLightbox(media.dossierBig2)}
              role="button"
              aria-label={c[5].title}
            >
              <img src={media.dossierBig2} alt={c[5].title} loading="lazy" decoding="async" />
              <div className="d-bg-overlay" />
              <div className="d-bg-body">
                <div className="icon-box"><Crown size={22} aria-hidden="true" /></div>
                <h3 className="font-display uppercase font-semibold leading-tight" style={{ fontSize: "clamp(19px,2vw,24px)" }}>
                  {c[5].title}
                </h3>
                <p className="text-[rgba(244,241,230,.75)] leading-relaxed text-[14.5px] m-0">{c[5].text}</p>
                <a href="#path" className="more-link mt-auto w-fit">
                  <span>{L.dossier.more}</span><ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================ STATS ============================ */
const STAT_VALUES = [
  { to: 17, suffix: "" },
  { to: 50, suffix: "+" },
  { to: 6, suffix: "" },
  { to: 983, suffix: "K" },
];

function Stats() {
  const { L } = useSite();
  return (
    <section id="stats" className="stats-sec noise">
      <div className="wrap relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {L.stats.map((s, i) => (
            <Reveal key={i} delay={i * 100} className="stat-cell">
              <div className="stat-num grad-text font-barlow">
                <CounterNum to={STAT_VALUES[i].to} suffix={STAT_VALUES[i].suffix} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[.2em] text-[var(--text-secondary)] mt-3">{s.label}</div>
              <div className="flex items-center justify-center gap-1.5 mt-3 text-[12px] text-[var(--accent)]">
                <TrendingUp size={13} aria-hidden="true" />
                {s.trend}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ PROOFS ============================ */
function Proofs() {
  const { L, media, openLightbox } = useSite();
  return (
    <section id="proofs" className="sec !pb-[clamp(40px,6vw,80px)]">
      <div className="wrap">
        <SecHead kicker={L.proofs.kicker} t1={L.proofs.t1} t2={L.proofs.t2} sub={L.proofs.sub} />
      </div>
      <Reveal>
        <div className="proof-row" role="list">
          {media.proofs.map((src, i) => (
            <button key={src} className="proof-item" onClick={() => { openLightbox(src); track("click", { id: "proof-" + (i + 1) }); }} aria-label={`Tournament protocol ${i + 1}`}>
              <img src={src} alt={`AJP result sheet ${i + 1}`} loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ============================ PATH ============================ */
const STEP_ICONS = [Dumbbell, Plane, Mountain];

function PathLine() {
  const [ref, vis] = useReveal();
  return (
    <svg ref={ref} className="absolute hidden lg:block left-0 top-[26px] w-full h-[60px] pointer-events-none" viewBox="0 0 1000 60" fill="none" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="pathgrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFCF03" />
          <stop offset="1" stopColor="#FF8A00" />
        </linearGradient>
      </defs>
      <path d="M 60 30 C 250 -8, 380 66, 500 30 C 620 -6, 760 64, 940 30" stroke="rgba(244,241,230,.14)" strokeWidth="1.5" strokeDasharray="5 9" />
      <path d="M 60 30 C 250 -8, 380 66, 500 30 C 620 -6, 760 64, 940 30" stroke="url(#pathgrad)" strokeWidth="2" pathLength="1" strokeDasharray="1" strokeDashoffset={vis ? 0 : 1} style={{ transition: `stroke-dashoffset 1.8s ${EASE} .25s` }} />
    </svg>
  );
}

function Path() {
  const { L } = useSite();
  return (
    <section id="path" className="sec bg-[var(--bg-deep)] border-y border-[var(--border)]">
      <div className="wrap">
        <SecHead kicker={L.path.kicker} t1={L.path.t1} t2={L.path.t2} sub={L.path.sub} center />
        <div className="path-steps">
          {L.path.steps.map((s, i) => {
            const Icon = STEP_ICONS[i];
            const isLast = i === L.path.steps.length - 1;
            return (
              <Reveal key={i} delay={i * 130} className="path-row">
                <div className="path-ncol">
                  <span className="path-n">{String(i + 1).padStart(2, "0")}</span>
                  {!isLast && <div className="path-wire" aria-hidden="true" />}
                </div>
                <div className="path-rbody">
                  <div className="path-irow">
                    <div className="path-ico"><Icon size={20} aria-hidden="true" /></div>
                    <h3>{s.title}</h3>
                  </div>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================ MEDIA ============================ */
function MediaSection() {
  const { L, media, openLightbox } = useSite();
  const [tab, setTab] = useState("photos");
  const [active, setActive] = useState(media.videos[0]);

  return (
    <section id="media" className="sec">
      <div className="wrap">
        <SecHead kicker={L.media.kicker} t1={L.media.t1} t2={L.media.t2} sub={L.media.sub} />
        <Reveal>
          <div className="media-tabs" role="tablist">
            <button role="tab" aria-selected={tab === "photos"} className={`media-tab ${tab === "photos" ? "media-tab-on" : ""}`} onClick={() => setTab("photos")}>
              {L.media.photos}
            </button>
            <button role="tab" aria-selected={tab === "videos"} className={`media-tab ${tab === "videos" ? "media-tab-on" : ""}`} onClick={() => { setTab("videos"); track("click", { id: "media-videos-tab" }); }}>
              <Play size={14} aria-hidden="true" /> {L.media.videos}
            </button>
          </div>
        </Reveal>

        {tab === "photos" ? (
          <Reveal>
            <div className="photo-row">
              {media.gallery.map((src, i) => (
                <button key={src + i} className="photo-item" onClick={() => openLightbox(src)} aria-label={`Photo ${i + 1}`}>
                  <img src={src} alt={`Vladimir Nagoryansky — tournament photo ${i + 1}`} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <div className="video-main">
              <video key={active} src={active} controls playsInline preload="metadata" onPlay={() => track("video", { id: active.split("/").pop() })} />
            </div>
            <div className="video-thumbs">
              {media.videos.map((src, i) => (
                <button key={src} className={`video-thumb ${src === active ? "video-thumb-on" : ""}`} onClick={() => setActive(src)} aria-label={`Video ${i + 1}`}>
                  <video src={src + "#t=0.5"} muted preload="metadata" playsInline />
                  <span className="video-thumb-play"><Play size={16} aria-hidden="true" /></span>
                  {src === active && <span className="video-thumb-label font-mono">{L.media.playing}</span>}
                </button>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ============================ VOICES ============================ */
function Initials({ name, dark = false }) {
  const init = name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("");
  return <span className={`init-avatar font-display ${dark ? "init-dark" : ""}`}>{init}</span>;
}

function Stars({ dark = false }) {
  return (
    <div className="flex gap-1" aria-label="Rating: 5 of 5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={15} fill="currentColor" className={dark ? "text-[#1C1C1C]" : "text-[var(--accent)]"} aria-hidden="true" />
      ))}
    </div>
  );
}

function Voices() {
  const { L } = useSite();
  const [featured, ...rest] = L.voices.items;
  return (
    <section id="voices" className="sec bg-[var(--bg-deep)] border-y border-[var(--border)]">
      <div className="wrap">
        <SecHead kicker={L.voices.kicker} t1={L.voices.t1} t2={L.voices.t2} sub={L.voices.sub} />
        <Reveal>
          <figure className="voice-featured">
            <Quote size={120} className="voice-quote" aria-hidden="true" />
            <div className="relative z-10 max-w-[760px]">
              <Stars dark />
              <blockquote className="font-display font-medium leading-snug mt-5 m-0" style={{ fontSize: "clamp(20px,2.8vw,30px)" }}>
                «{featured.text}»
              </blockquote>
              <figcaption className="flex items-center gap-4 mt-8">
                <Initials name={featured.name} dark />
                <div>
                  <div className="font-bold text-[16px]">{featured.name}</div>
                  <div className="text-[13px] opacity-75">
                    {featured.role} · {featured.org} · {featured.date}
                  </div>
                </div>
              </figcaption>
            </div>
          </figure>
        </Reveal>
        <div className="t-row mt-5">
          {rest.map((v, i) => (
            <Reveal key={v.name} delay={120 + i * 120} className="h-full">
              <figure className="voice-card">
                <Quote size={72} className="voice-quote-sm" aria-hidden="true" />
                <div className="relative z-10">
                  <Stars />
                  <blockquote className="mt-4 m-0 text-[15.5px] leading-relaxed text-[var(--text-primary)]">«{v.text}»</blockquote>
                  <figcaption className="flex items-center gap-4 mt-6">
                    <Initials name={v.name} />
                    <div>
                      <div className="font-bold text-[15px]">{v.name}</div>
                      <div className="text-[12.5px] text-[var(--text-secondary)]">{v.role} · {v.org}</div>
                      <div className="font-mono text-[10.5px] text-[var(--text-secondary)] mt-0.5 uppercase tracking-wider">{v.date}</div>
                    </div>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ PRICING ============================ */
const TIER_ICONS = [Video, Target, Users];
const TIER_IDS = ["pricing-video-review", "pricing-personal", "pricing-seminar"];

function PriceCard({ tier, icon: Icon, yearly, delay, popLabel, perMonth, monthNote, yearNote, trackId }) {
  const isPop = !!tier.popular;
  const isDark = !!tier.dark;
  const price = tier.custom ? null : yearly ? tier.priceY : tier.priceM;

  const inner = (
    <div className={`price-card ${isDark ? "price-dark" : ""}`}>
      {isPop && <div className="pop-badge font-mono">{popLabel}</div>}
      <div className="icon-box"><Icon size={22} aria-hidden="true" /></div>
      <h3 className="font-display uppercase font-semibold text-[22px] mt-5">{tier.name}</h3>
      <p className="text-[var(--text-secondary)] text-[13.5px] mt-1 m-0">{tier.desc}</p>

      <div className="mt-6 min-h-[92px]">
        {price !== null ? (
          <div key={yearly ? "y" : "m"} className="price-flip">
            <span className="font-display font-bold leading-none" style={{ fontSize: "clamp(42px,3.6vw,56px)" }}>{price}</span>
            <span className="text-[var(--text-secondary)] text-[14px] ml-2">{perMonth}</span>
            <div className="font-mono text-[11px] mt-2 uppercase tracking-wider" style={{ color: yearly ? "var(--accent)" : "var(--text-secondary)" }}>
              {yearly ? yearNote : monthNote}
            </div>
          </div>
        ) : (
          <div>
            <span className="font-display font-bold leading-none" style={{ fontSize: "clamp(34px,2.8vw,42px)" }}>{tier.custom}</span>
            <div className="font-mono text-[11px] text-[var(--text-secondary)] mt-2 uppercase tracking-wider">{tier.note}</div>
          </div>
        )}
      </div>

      <ul className="list-none p-0 m-0 mt-6 flex flex-col gap-3 flex-1">
        {tier.feats.map((label, i) => {
          const ok = i < tier.feats.length - (tier.excluded || 0);
          return (
            <li key={label} className="flex items-start gap-3 text-[14px]">
              {ok ? (
                <Check size={16} className="text-[var(--accent)] mt-0.5 shrink-0" aria-hidden="true" />
              ) : (
                <X size={16} className="text-[var(--text-secondary)] opacity-50 mt-0.5 shrink-0" aria-hidden="true" />
              )}
              <span className={ok ? "" : "line-through text-[var(--text-secondary)] opacity-60"}>{label}</span>
            </li>
          );
        })}
      </ul>

      <a href="#cta" className={`btn mt-8 justify-center ${isPop ? "btn-primary" : "btn-ghost"}`} onClick={() => track("click", { id: trackId })}>
        {tier.cta} <ArrowRight size={16} aria-hidden="true" />
      </a>
    </div>
  );

  return (
    <Reveal delay={delay} className="h-full">
      {isPop ? (
        <div className="pop-wrap h-full"><div className="pop-border h-full">{inner}</div></div>
      ) : (
        inner
      )}
    </Reveal>
  );
}

function Pricing() {
  const { L } = useSite();
  const [yearly, setYearly] = useState(false);
  const tiers = L.pricing.tiers.map((t, i) => ({ ...t, popular: i === 1, dark: i === 2 }));

  return (
    <section id="training" className="sec">
      <div className="wrap">
        <SecHead kicker={L.pricing.kicker} t1={L.pricing.t1} t2={L.pricing.t2} sub={L.pricing.sub} center />
        <Reveal className="flex items-center justify-center mb-12">
          <div className="toggle" role="tablist" aria-label="Billing period">
            <span className="toggle-pill" style={{ transform: yearly ? "translateX(100%)" : "translateX(0)" }} aria-hidden="true" />
            <button role="tab" aria-selected={!yearly} className={`toggle-btn ${!yearly ? "toggle-on" : ""}`} onClick={() => setYearly(false)}>
              {L.pricing.month}
            </button>
            <button role="tab" aria-selected={yearly} className={`toggle-btn ${yearly ? "toggle-on" : ""}`} onClick={() => { setYearly(true); track("click", { id: "pricing-yearly" }); }}>
              {L.pricing.year}
              <span className="toggle-badge font-mono">{L.pricing.save}</span>
            </button>
          </div>
        </Reveal>
        <div className="grid lg:grid-cols-3 gap-6 items-stretch lg:px-2">
          {tiers.map((t, i) => (
            <PriceCard
              key={i}
              tier={t}
              icon={TIER_ICONS[i]}
              yearly={yearly}
              delay={i * 120}
              popLabel={L.pricing.popular}
              perMonth={L.pricing.perMonth}
              monthNote={L.pricing.monthNote}
              yearNote={L.pricing.yearNote}
              trackId={TIER_IDS[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ FAQ ============================ */
function Faq() {
  const { L } = useSite();
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="sec bg-[var(--bg-deep)] border-y border-[var(--border)]">
      <div className="wrap">
        <SecHead kicker={L.faq.kicker} t1={L.faq.t1} t2={L.faq.t2} />
        <div className="grid md:grid-cols-2 gap-4 items-start">
          {L.faq.items.map((f, i) => (
            <Reveal key={i} delay={(i % 2) * 80}>
              <div className={`faq ${open === i ? "faq-open" : ""}`}>
                <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  {f.q}
                  <ChevronDown size={19} className="faq-chev" aria-hidden="true" />
                </button>
                <div className="faq-a" style={{ maxHeight: open === i ? "300px" : "0px" }}>
                  <p>{f.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ CTA ============================ */
function CtaBanner() {
  const { L, media } = useSite();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const submit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email.trim() || sending) return;
      setSending(true);
      track("submit", { id: "newsletter" });
      setTimeout(() => {
        setSending(false);
        setDone(true);
      }, 1400);
    },
    [email, sending]
  );

  return (
    <section id="cta" className="relative overflow-hidden sec">
      <img src={media.ctaBg} alt="Vladimir Nagoryansky on the mats" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-25" />
      <div className="absolute inset-0 cta-mesh" aria-hidden="true" />
      <div className="wrap relative z-10 text-center">
        <Reveal>
          <span className="kicker">{L.cta.kicker}</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display uppercase font-bold leading-[1.02] mt-4" style={{ fontSize: "clamp(32px,5.5vw,56px)" }}>
            {L.cta.t1} <span className="grad-text">{L.cta.t2}</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-[var(--text-secondary)] max-w-[520px] mx-auto mt-5 leading-relaxed text-[16px]">{L.cta.sub}</p>
        </Reveal>
        <Reveal delay={260}>
          {done ? (
            <div className="cta-done">
              <Check size={19} aria-hidden="true" /> {L.cta.done}
            </div>
          ) : (
            <form className="cta-form" onSubmit={submit}>
              <input type="email" required className="cta-input" placeholder={L.cta.ph} aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type="submit" className="cta-btn" disabled={sending} aria-label={L.cta.btn}>
                {sending ? <Loader2 size={17} className="spin" aria-hidden="true" /> : (<>{L.cta.btn} <ArrowRight size={16} aria-hidden="true" /></>)}
              </button>
            </form>
          )}
          <p className="font-mono text-[11px] uppercase tracking-[.2em] text-[var(--text-secondary)] mt-5">{L.cta.disc}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ FOOTER ============================ */
function Footer({ navigate }) {
  const { L, settings } = useSite();
  const social = [
    { id: "instagram", icon: Instagram, href: settings.links.instagram, label: "Instagram" },
    { id: "youtube", icon: Youtube, href: settings.links.youtube, label: "YouTube" },
    { id: "telegram", icon: Send, href: settings.links.telegram, label: "Telegram" },
  ];
  const cols = [
    {
      title: L.footer.sections,
      links: [
        [L.nav.dossier, "#dossier"], [L.nav.stats, "#stats"], [L.nav.path, "#path"], [L.nav.media, "#media"], [L.nav.faq, "#faq"],
      ],
    },
    {
      title: L.footer.training,
      links: [
        [L.pricing.tiers[0].name, "#training"], [L.pricing.tiers[1].name, "#training"], [L.pricing.tiers[2].name, "#training"], [L.footer.subscribe, "#cta"],
      ],
    },
    {
      title: L.footer.contact,
      links: [
        ["Telegram · @the_baseball_bat", settings.links.telegram],
        ["Instagram · the_baseball_bat_fighter", settings.links.instagram],
        ["YouTube · @the_baseball_bat", settings.links.youtube],
        [L.footer.collab, settings.links.instagram],
      ],
    },
  ];

  return (
    <footer className="bg-[var(--bg-deep)] border-t border-[var(--border)] overflow-hidden">
      <div className="giant font-display" aria-hidden="true">The Baseball Bat</div>
      <div className="wrap pb-12">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1.4fr] gap-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="logo-box font-display">VN</span>
              <span className="font-display font-semibold uppercase tracking-[.14em] text-[15px]">Nagoryansky</span>
            </div>
            <p className="text-[var(--text-secondary)] text-[13.5px] leading-relaxed mt-4 max-w-[280px]">{L.footer.about}</p>
            <div className="flex gap-3 mt-5">
              {social.map((s) => (
                <a key={s.id} className="soc" href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} onClick={() => track("click", { id: s.id })}>
                  <s.icon size={17} />
                </a>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[11px] uppercase tracking-[.25em] text-[var(--accent)] mb-5">{col.title}</h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="f-link"
                      {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                      onClick={() => href.startsWith("http") && track("click", { id: "footer-" + label.split(" ")[0].toLowerCase() })}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[var(--border)] mt-12 pt-7">
          <p className="text-[12.5px] text-[var(--text-secondary)] m-0">{L.footer.copyright}</p>
          <div className="flex items-center gap-5">
            <a href="#home" className="f-link text-[12.5px]">{L.footer.policy}</a>
            <button className="f-link text-[11px] opacity-40 hover:opacity-100 bg-transparent border-0 cursor-pointer p-0" onClick={() => navigate("/admin")} aria-label="Admin">
              •
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================ LIGHTBOX ============================ */
function Lightbox({ src, onClose }) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);
  if (!src) return null;
  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-label="Image viewer">
      <button className="lightbox-close burger" aria-label="Close" onClick={onClose}>
        <X size={22} />
      </button>
      <img src={src} alt="Full size" />
    </div>
  );
}

/* ============================ LANDING ============================ */
export default function Landing({ navigate }) {
  const [lang, setLangState] = useState(getLang());
  const [lightbox, setLightbox] = useState(null);
  const [media, setMediaState] = useState(() => deepMerge(DEFAULT_MEDIA, {}));
  const [settings, setSettingsState] = useState(DEFAULT_SETTINGS);
  const [overrides, setOverrides] = useState({});
  const L = useMemo(() => getStrings(lang, overrides[lang]), [lang, overrides]);

  /* грузим контент/медиа/настройки с сервера; до ответа — дефолты */
  useEffect(() => {
    let alive = true;
    Promise.all([fetchContent(), fetchMedia(), fetchSettings()]).then(([c, m, s]) => {
      if (!alive) return;
      setOverrides(c || {});
      setMediaState(m);
      setSettingsState(s);
    });
    track("visit", { ref: document.referrer || "direct" });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const meta = LANGS.find((l) => l.code === lang) || LANGS[0];
    document.documentElement.lang = lang;
    document.documentElement.dir = meta.dir;
  }, [lang]);

  const changeLang = useCallback((code) => {
    setLangState(code);
    persistLang(code);
    track("lang", { id: code });
  }, []);

  useSectionTracking();

  const ctx = { L, lang, changeLang, media, settings, openLightbox: setLightbox };

  return (
    <Ctx.Provider value={ctx}>
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <LogosBar />
        <Dossier />
        <Stats />
        <Proofs />
        <Path />
        <MediaSection />
        <Voices />
        <Pricing />
        <Faq />
        <CtaBanner />
      </main>
      <Footer navigate={navigate} />
      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </Ctx.Provider>
  );
}
