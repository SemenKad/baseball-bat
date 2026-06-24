import { useState, useEffect, useCallback } from "react";
import Landing from "./Landing";
import Admin, { AdminLogin } from "./Admin";

/* ============================================================
   Роутер: /  ·  /admin/login  ·  /admin
   ============================================================ */
export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((p) => {
    window.history.pushState({}, "", p);
    setPath(p);
    window.scrollTo(0, 0);
  }, []);

  let page;
  if (path === "/admin/login") page = <AdminLogin navigate={navigate} />;
  else if (path === "/admin" || path.startsWith("/admin/")) page = <Admin navigate={navigate} />;
  else page = <Landing key={path} navigate={navigate} />;

  return (
    <>
      <GlobalStyles />
      {page}
    </>
  );
}

/* ============================================================
   Глобальные стили: лендинг + админка
   ============================================================ */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Oswald:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

      :root{
        --bg-base:#191917;
        --bg-surface:#222220;
        --bg-muted:#2A2A27;
        --bg-deep:#111110;
        --text-primary:#F0EDE3;
        --text-secondary:rgba(240,237,227,.58);
        --border:rgba(240,237,227,.1);
        --accent:#FFCF03;
        --accent-from:#FFCF03;
        --accent-to:#FF8A00;
        --shadow-lg:0 22px 64px rgba(0,0,0,.58);
        --ease:cubic-bezier(.16,1,.3,1);
        --spring:cubic-bezier(.34,1.56,.64,1);
      }
      *{box-sizing:border-box}
      html{scroll-behavior:smooth}
      body{margin:0;background:var(--bg-base);color:var(--text-primary);font-family:'Manrope',system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
      body::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:.028;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")}
      ::selection{background:var(--accent);color:#161616}
      ::-webkit-scrollbar{width:9px;height:9px}
      ::-webkit-scrollbar-track{background:#141413}
      ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,var(--accent-from),var(--accent-to));border-radius:99px;border:2px solid #141413}

      .font-display{font-family:'Oswald','Noto Sans JP','Noto Sans SC',sans-serif}
      .font-mono{font-family:'JetBrains Mono',monospace}
      .font-barlow{font-family:'Barlow Condensed',sans-serif;letter-spacing:-.02em}
      .wrap{max-width:1200px;margin:0 auto;padding:0 clamp(16px,4vw,80px)}
      .sec{padding:clamp(60px,10vw,140px) 0}

      /* ---------- keyframes ---------- */
      @keyframes fadeInUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeInRight{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
      @keyframes float{0%{transform:translateY(0) rotate(0deg)}35%{transform:translateY(-16px) rotate(1.4deg)}70%{transform:translateY(-8px) rotate(-1deg)}100%{transform:translateY(0) rotate(0deg)}}
      @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
      @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      @keyframes blobMorph{0%,100%{border-radius:42% 58% 60% 40%/50% 45% 55% 50%}33%{border-radius:58% 42% 45% 55%/42% 60% 40% 58%}66%{border-radius:45% 55% 52% 48%/58% 42% 58% 42%}}
      @keyframes badgePulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
      @keyframes dotPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,207,3,.55)}50%{box-shadow:0 0 0 7px rgba(255,207,3,0)}}
      @keyframes spinKf{to{transform:rotate(360deg)}}
      @keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
      @keyframes flipIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      @keyframes shakeKf{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-9px)}40%,80%{transform:translateX(9px)}}

      .h-anim{opacity:0;animation:fadeInUp var(--dur,.6s) var(--ease) var(--del,0s) forwards}
      .h-anim-right{opacity:0;animation:fadeInRight 1s var(--ease) .2s forwards}
      .spin{animation:spinKf 1s linear infinite}
      .price-flip{animation:flipIn .35s var(--ease)}

      /* ---------- текст ---------- */
      .grad-text{background:linear-gradient(115deg,var(--accent-from) 25%,var(--accent-to));-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 22px rgba(255,207,3,.22))}
      .stroke-text{color:transparent;-webkit-text-stroke:1.5px rgba(240,237,227,.85)}
      .kicker{display:inline-flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.28em;color:var(--accent)}
      .kicker::before{content:"//";font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:0;line-height:1;opacity:.9}

      /* ---------- кнопки ---------- */
      .btn{display:inline-flex;align-items:center;gap:9px;font-weight:700;font-size:15px;border-radius:6px;padding:15px 28px;cursor:pointer;text-decoration:none;transition:all .4s var(--ease);font-family:'Manrope',sans-serif;border:none;letter-spacing:.01em}
      .btn-primary{position:relative;overflow:hidden;color:#1C1C1C;background:linear-gradient(120deg,var(--accent-from),var(--accent-to));box-shadow:0 10px 34px rgba(255,176,3,.28)}
      .btn-primary:hover{transform:translateY(-2px);box-shadow:0 16px 46px rgba(255,176,3,.45)}
      .btn-primary::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.5) 25%,transparent 50%);background-size:200% 100%;animation:shimmer 2.5s infinite;pointer-events:none}
      .btn-ghost{border:1px solid rgba(244,241,230,.28);color:var(--text-primary);background:transparent}
      .btn-ghost:hover{background:var(--text-primary);color:#1C1C1C;border-color:var(--text-primary)}

      /* ---------- navbar ---------- */
      .nav{position:fixed;top:0;left:0;right:0;z-index:50;border-bottom:1px solid transparent;transition:all .4s var(--ease)}
      .nav-scrolled{background:rgba(28,28,28,.85);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--border);box-shadow:0 12px 40px rgba(0,0,0,.4)}
      .logo-box{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:5px;background:linear-gradient(135deg,var(--accent-from),var(--accent-to));color:#1C1C1C;font-weight:700;font-size:16px;letter-spacing:.04em;flex-shrink:0;transform:skewX(-6deg)}
      .nav-link{position:relative;color:var(--text-secondary);text-decoration:none;font-size:13.5px;font-weight:600;transition:color .3s;white-space:nowrap}
      .nav-link::after{content:"";position:absolute;left:0;bottom:-7px;height:2px;width:0;background:var(--accent);transition:width .35s var(--ease)}
      .nav-link:hover{color:var(--text-primary)}
      .nav-link:hover::after{width:100%}
      .burger{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:5px;border:1px solid var(--border);background:rgba(240,237,227,.04);color:var(--text-primary);cursor:pointer;transition:all .3s}
      .burger:hover{border-color:rgba(255,207,3,.5);color:var(--accent)}
      @media(min-width:1024px){.nav-burger{display:none}}
      @media(max-width:767px){.nav-cta{display:none}}

      .overlay{position:fixed;inset:0;background:rgba(0,0,0,.62);backdrop-filter:blur(4px);opacity:0;pointer-events:none;transition:opacity .35s ease;z-index:60}
      .overlay.show{opacity:1;pointer-events:auto}
      .drawer{position:fixed;top:0;right:0;bottom:0;width:min(340px,84vw);background:#1F1F1D;border-left:1px solid var(--border);z-index:70;padding:24px 26px 40px;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .35s var(--ease);overflow-y:auto}
      .drawer.open{transform:translateX(0)}
      [dir="rtl"] .drawer{right:auto;left:0;border-left:none;border-right:1px solid var(--border);transform:translateX(-100%)}
      [dir="rtl"] .drawer.open{transform:translateX(0)}
      .drawer-link{color:var(--text-primary);text-decoration:none;text-transform:uppercase;font-size:23px;font-weight:600;letter-spacing:.06em;padding:10px 0;border-bottom:1px solid var(--border);opacity:0;transform:translateX(24px);transition:opacity .4s var(--ease),transform .4s var(--ease),color .25s}
      .drawer.open .drawer-link{opacity:1;transform:translateX(0)}
      .drawer-link:hover{color:var(--accent)}

      /* ---------- язык ---------- */
      .lang-btn{display:inline-flex;align-items:center;gap:7px;padding:9px 13px;border-radius:5px;border:1px solid var(--border);background:rgba(240,237,227,.04);color:var(--text-primary);cursor:pointer;transition:all .3s;font-family:'Manrope',sans-serif;font-size:13px}
      .lang-btn:hover{border-color:rgba(255,207,3,.5)}
      .lang-menu{position:absolute;top:calc(100% + 10px);right:0;min-width:185px;background:#1e1e1c;border:1px solid var(--border);border-radius:8px;padding:6px;box-shadow:var(--shadow-lg);opacity:0;transform:translateY(-8px);pointer-events:none;transition:all .3s var(--ease);z-index:55;max-height:70vh;overflow-y:auto}
      [dir="rtl"] .lang-menu{right:auto;left:0}
      .lang-menu-open{opacity:1;transform:translateY(0);pointer-events:auto}
      .lang-item{display:flex;align-items:center;gap:10px;width:100%;padding:9px 12px;border:none;background:none;color:var(--text-primary);font-family:'Manrope',sans-serif;font-size:13.5px;border-radius:4px;cursor:pointer;transition:background .2s;text-align:start}
      .lang-item:hover{background:rgba(240,237,227,.06)}
      .lang-item.lang-on{color:var(--accent)}
      .lang-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:7px}
      .lang-cell{display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:5px;border:1px solid var(--border);background:rgba(240,237,227,.03);color:var(--text-primary);font-family:'JetBrains Mono',monospace;font-size:11.5px;cursor:pointer;transition:all .25s}
      .lang-cell.lang-on{border-color:var(--accent);color:var(--accent);background:rgba(255,207,3,.08)}

      /* ---------- hero ---------- */
      .badge{display:inline-flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.16em;color:var(--accent);background:rgba(255,207,3,.07);border:1px solid rgba(255,207,3,.28);border-radius:5px;padding:9px 18px}
      .badge.h-anim{animation:fadeInUp var(--dur,.6s) var(--ease) var(--del,0s) forwards,badgePulse 2s ease-in-out 1.2s infinite}
      .pulse-dot{width:7px;height:7px;border-radius:50%;background:var(--accent);animation:dotPulse 2s infinite;flex-shrink:0}
      .type-cursor{display:inline-block;width:3px;height:.85em;background:var(--accent);margin-left:7px;vertical-align:-.08em;animation:blink 1s steps(1) infinite}
      [dir="rtl"] .type-cursor{margin-left:0;margin-right:7px}
      .avatar{width:42px;height:42px;border-radius:50%;object-fit:cover;border:2px solid var(--bg-base)}
      .avatar:not(:first-child){margin-left:-8px}
      [dir="rtl"] .avatar:not(:first-child){margin-left:0;margin-right:-8px}
      .avatar-more{display:inline-flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--accent-from),var(--accent-to));color:#1C1C1C;font-size:11px;font-weight:700;cursor:pointer;border:2px solid var(--bg-base)}
      .hero-frame{border-radius:10px;overflow:hidden;border:1px solid rgba(240,237,227,.12);box-shadow:var(--shadow-lg);transform:rotate(2deg);position:relative}
      .hero-frame::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(25,25,23,.6));pointer-events:none}
      .float-card{position:absolute;display:flex;align-items:center;gap:13px;background:rgba(20,20,19,.88);backdrop-filter:blur(14px);border:1px solid rgba(255,207,3,.32);border-radius:8px;padding:14px 19px;box-shadow:var(--shadow-lg);animation:float 7s ease-in-out infinite;z-index:2}
      .blob{position:absolute;pointer-events:none;filter:blur(60px);opacity:.5;animation:blobMorph 8s ease-in-out infinite}
      .blob-a{width:420px;height:420px;background:radial-gradient(circle,rgba(255,207,3,.16),transparent 65%);top:-120px;right:8%}
      .blob-b{width:340px;height:340px;background:radial-gradient(circle,rgba(255,138,0,.12),transparent 65%);bottom:-90px;left:-60px;animation-delay:-4s}
      .blob-img{inset:-30px;background:linear-gradient(135deg,rgba(255,207,3,.28),rgba(255,138,0,.12));filter:blur(46px);opacity:.6}

      /* ---------- countdown ---------- */
      .count-sec{background:linear-gradient(120deg,var(--accent-from),var(--accent-to));color:#1C1C1C;padding:clamp(22px,3.4vw,34px) 0;position:relative;overflow:hidden}
      .count-sec::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.06;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")}
      .count-cell{background:rgba(20,20,19,.92);color:var(--accent);border-radius:6px;padding:12px 14px;min-width:74px;text-align:center;box-shadow:0 10px 26px rgba(0,0,0,.3)}

      /* ---------- marquee ---------- */
      .marquee{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
      .marquee-track{display:flex;align-items:center;gap:clamp(44px,6vw,90px);width:max-content;animation:marquee 32s linear infinite;padding-right:clamp(44px,6vw,90px)}
      .marquee:hover .marquee-track{animation-play-state:paused}
      .marquee-item{display:flex;align-items:center;gap:13px;font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.12em;font-size:clamp(17px,2.2vw,24px);white-space:nowrap;opacity:.4;transition:all .3s ease;cursor:default}
      .marquee-item:hover{opacity:1;transform:scale(1.05);color:var(--accent)}

      /* ---------- cards ---------- */
      .card{background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:clamp(24px,2.8vw,38px);height:100%;display:flex;flex-direction:column;gap:20px;position:relative;overflow:hidden;transition:transform .45s var(--ease),box-shadow .45s var(--ease),border-color .35s ease}
      .card:hover{transform:translateY(-4px);border-color:rgba(255,207,3,.5);box-shadow:0 20px 56px rgba(0,0,0,.55),0 0 36px rgba(255,207,3,.1)}
      .card-img{border-radius:8px;overflow:hidden;height:250px;cursor:zoom-in;flex-shrink:0}
      .card-img img{width:100%;height:100%;object-fit:cover;object-position:center 25%;transition:transform .6s var(--ease)}
      .card:hover .card-img img{transform:scale(1.04)}
      .icon-box{width:50px;height:50px;border-radius:10px;display:inline-flex;align-items:center;justify-content:center;background:rgba(255,207,3,.08);border:1.5px solid rgba(255,207,3,.28);color:var(--accent);flex-shrink:0}
      .more-link{display:inline-flex;align-items:center;gap:8px;color:var(--accent);font-weight:700;font-size:13.5px;text-decoration:none;text-transform:uppercase;letter-spacing:.08em;margin-top:auto}
      .more-link span{position:relative}
      .more-link span::after{content:"";position:absolute;left:0;bottom:-4px;width:0;height:1.5px;background:var(--accent);transition:width .35s var(--ease)}
      .card:hover .more-link span::after{width:100%}
      .more-link svg{transition:transform .35s var(--spring)}
      .card:hover .more-link svg{transform:translateX(5px)}

      /* ---------- dossier bento ---------- */
      .d-hero{display:flex;flex-direction:column;background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;overflow:hidden;transition:box-shadow .45s var(--ease),border-color .35s}
      .d-hero:hover{border-color:rgba(255,207,3,.55);box-shadow:0 24px 60px rgba(0,0,0,.5),0 0 44px rgba(255,207,3,.13)}
      @media(min-width:1024px){.d-hero{flex-direction:row}}
      .d-hero-body{flex:1;padding:clamp(28px,3.2vw,52px);display:flex;flex-direction:column;gap:22px}
      .d-hero-img{overflow:hidden;cursor:zoom-in;height:260px;flex-shrink:0}
      @media(min-width:1024px){.d-hero-img{width:40%;height:auto}}
      .d-hero-img img{width:100%;height:100%;object-fit:cover;object-position:center 20%;transition:transform .7s var(--ease)}
      .d-hero:hover .d-hero-img img{transform:scale(1.06)}
      .d-bg-card{position:relative;border-radius:10px;overflow:hidden;border:1px solid rgba(255,207,3,.14);height:100%;min-height:290px;cursor:pointer;transition:border-color .35s,box-shadow .45s var(--ease)}
      .d-bg-card:hover{border-color:rgba(255,207,3,.55);box-shadow:0 24px 60px rgba(0,0,0,.6),0 0 44px rgba(255,207,3,.13)}
      .d-bg-card>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 15%;transition:transform .7s var(--ease)}
      .d-bg-card:hover>img{transform:scale(1.06)}
      .d-bg-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,10,10,.25) 0%,rgba(10,10,10,.96) 58%)}
      @media(min-width:1024px){.d-bg-overlay{background:linear-gradient(90deg,rgba(10,10,10,.97) 44%,rgba(10,10,10,.2))}}
      .d-bg-body{position:relative;z-index:2;padding:clamp(26px,3vw,42px);display:flex;flex-direction:column;gap:20px;height:100%}
      @media(min-width:1024px){.d-bg-body{max-width:60%}}
      .d-bg-card .more-link{color:var(--accent)}
      .d-bg-card:hover .more-link span::after{width:100%}
      .d-bg-card:hover .more-link svg{transform:translateX(5px)}

      /* ---------- path ---------- */
      .path-steps{display:flex;flex-direction:column}
      .path-row{display:flex;gap:clamp(16px,3.5vw,40px)}
      .path-ncol{display:flex;flex-direction:column;align-items:center;flex-shrink:0;width:clamp(50px,6.5vw,72px)}
      .path-n{font-family:'Oswald',sans-serif;font-size:clamp(48px,7.5vw,82px);font-weight:700;line-height:.9;background:linear-gradient(135deg,var(--accent-from),var(--accent-to));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
      .path-wire{width:2px;flex:1;min-height:24px;margin-top:10px;background:linear-gradient(180deg,rgba(255,207,3,.5),rgba(255,138,0,.07));border-radius:2px}
      .path-rbody{flex:1;padding-bottom:clamp(30px,4.5vw,52px)}
      .path-row:last-child .path-rbody{padding-bottom:0}
      .path-irow{display:flex;align-items:center;gap:13px;margin-bottom:clamp(10px,1.4vw,15px)}
      .path-ico{width:46px;height:46px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:rgba(255,207,3,.07);border:1.5px solid rgba(255,207,3,.24);color:var(--accent);flex-shrink:0}
      .path-rbody h3{font-family:'Oswald',sans-serif;text-transform:uppercase;font-size:clamp(20px,2.7vw,33px);font-weight:600;letter-spacing:.03em;line-height:1.1;flex:1;margin:0}
      .path-rbody p{color:var(--text-secondary);font-size:14.5px;line-height:1.75;max-width:640px;margin:0}

      /* ---------- stats ---------- */
      .stats-sec{position:relative;background:linear-gradient(135deg,#232321 0%,#191918 60%,#1d1a12 100%);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:clamp(56px,7vw,90px) 0;overflow:hidden}
      .stats-sec::before{content:"";position:absolute;inset:0;background:radial-gradient(600px 300px at 15% 0%,rgba(255,207,3,.09),transparent),radial-gradient(500px 280px at 90% 100%,rgba(255,138,0,.08),transparent)}
      .noise::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.05;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")}
      .stat-cell{text-align:center;padding:26px 18px;position:relative}
      @media(min-width:1024px){.stat-cell+.stat-cell::before{content:"";position:absolute;left:0;top:18%;bottom:18%;width:1px;background:linear-gradient(180deg,transparent,rgba(244,241,230,.16),transparent)}}
      .stat-num{font-size:clamp(56px,7vw,82px);font-weight:700;line-height:1;font-family:'Barlow Condensed',sans-serif;letter-spacing:-.03em}

      /* ---------- proofs ---------- */
      .proof-row{display:flex;gap:16px;overflow-x:auto;padding:6px clamp(16px,4vw,80px) 14px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch}
      .proof-item{flex:0 0 auto;width:min(250px,62vw);border-radius:8px;overflow:hidden;border:1px solid var(--border);background:var(--bg-surface);padding:0;cursor:zoom-in;scroll-snap-align:start;transition:transform .4s var(--ease),border-color .3s}
      .proof-item:hover{transform:translateY(-4px);border-color:rgba(255,207,3,.5)}
      .proof-item img{width:100%;display:block;aspect-ratio:3/4;object-fit:cover;object-position:top}

      /* ---------- media ---------- */
      .media-tabs{display:inline-flex;gap:6px;background:var(--bg-surface);border:1px solid var(--border);border-radius:999px;padding:5px;margin-bottom:28px}
      .media-tab{display:inline-flex;align-items:center;gap:8px;padding:10px 22px;border-radius:999px;border:none;background:none;color:var(--text-secondary);font-family:'Manrope',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:all .3s}
      .media-tab-on{background:linear-gradient(120deg,var(--accent-from),var(--accent-to));color:#1C1C1C}
      .photo-row{display:flex;gap:16px;overflow-x:auto;padding:6px 2px 14px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch}
      .photo-item{flex:0 0 auto;width:min(280px,70vw);aspect-ratio:3/4;border-radius:8px;overflow:hidden;border:1px solid var(--border);padding:0;cursor:zoom-in;scroll-snap-align:start;background:var(--bg-surface);transition:transform .4s var(--ease),border-color .3s;position:relative}
      .photo-item:hover{transform:translateY(-4px);border-color:rgba(255,207,3,.5)}
      .photo-item img{width:100%;height:100%;object-fit:cover;transition:transform .6s var(--ease)}
      .photo-item:hover img{transform:scale(1.05)}
      .video-main{border-radius:8px;overflow:hidden;border:1px solid var(--border);background:#000;box-shadow:var(--shadow-lg)}
      .video-main video{width:100%;display:block;max-height:620px;background:#000}
      .video-thumbs{display:flex;gap:12px;margin-top:14px;overflow-x:auto;padding-bottom:8px}
      .video-thumb{position:relative;flex:0 0 auto;width:150px;aspect-ratio:16/10;border-radius:6px;overflow:hidden;border:2px solid var(--border);padding:0;cursor:pointer;background:#000;transition:border-color .3s,transform .3s}
      .video-thumb:hover{transform:translateY(-3px)}
      .video-thumb-on{border-color:var(--accent)}
      .video-thumb video{width:100%;height:100%;object-fit:cover;opacity:.75}
      .video-thumb-play{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;background:rgba(0,0,0,.25)}
      .video-thumb-label{position:absolute;bottom:5px;left:50%;transform:translateX(-50%);font-size:8px;text-transform:uppercase;letter-spacing:.12em;background:var(--accent);color:#1C1C1C;border-radius:99px;padding:2px 8px;white-space:nowrap}

      /* ---------- voices ---------- */
      .voice-featured{position:relative;margin:0;background:linear-gradient(120deg,var(--accent-from),var(--accent-to));color:#1C1C1C;border-radius:10px;padding:clamp(28px,4vw,56px);overflow:hidden;box-shadow:0 24px 70px rgba(255,176,3,.15)}
      .voice-quote{position:absolute;top:18px;right:26px;color:rgba(28,28,28,.14)}
      [dir="rtl"] .voice-quote{right:auto;left:26px}
      .voice-card{position:relative;margin:0;height:100%;background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:clamp(24px,2.6vw,36px);overflow:hidden;transition:transform .4s var(--ease),border-color .35s,box-shadow .4s var(--ease)}
      .voice-card:hover{transform:translateY(-4px);border-color:rgba(255,207,3,.45);box-shadow:0 20px 52px rgba(0,0,0,.5)}
      .voice-quote-sm{position:absolute;top:14px;right:18px;color:rgba(255,207,3,.13)}
      [dir="rtl"] .voice-quote-sm{right:auto;left:18px}
      .t-row{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:8px;-webkit-overflow-scrolling:touch}
      .t-row>*{min-width:min(420px,86vw);scroll-snap-align:start;flex:1}
      @media(min-width:768px){.t-row{display:grid;grid-template-columns:1fr 1fr;overflow:visible;padding-bottom:0}.t-row>*{min-width:0}}
      .init-avatar{display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#2e2d28,#1f1f1d);border:3px solid var(--accent);color:var(--accent);font-size:19px;font-weight:600;letter-spacing:.04em;flex-shrink:0}
      .init-dark{background:rgba(28,28,28,.92);border-color:#1C1C1C;color:var(--accent)}

      /* ---------- pricing ---------- */
      .toggle{position:relative;display:inline-flex;background:var(--bg-surface);border:1px solid var(--border);border-radius:999px;padding:5px}
      .toggle-pill{position:absolute;top:5px;bottom:5px;left:5px;width:calc(50% - 5px);border-radius:999px;background:linear-gradient(120deg,var(--accent-from),var(--accent-to));transition:transform .4s var(--ease)}
      .toggle-btn{position:relative;z-index:1;display:inline-flex;align-items:center;gap:8px;width:130px;justify-content:center;padding:11px 0;border:none;background:none;border-radius:999px;font-family:'Manrope',sans-serif;font-weight:700;font-size:14px;color:var(--text-secondary);cursor:pointer;transition:color .3s}
      .toggle-on{color:#1C1C1C}
      .toggle-badge{font-size:10px;background:#1C1C1C;color:var(--accent);border-radius:99px;padding:3px 7px;letter-spacing:.05em}
      .toggle-btn:not(.toggle-on) .toggle-badge{background:rgba(255,207,3,.14);color:var(--accent)}
      .price-card{background:var(--bg-surface);border:1px solid var(--border);border-radius:20px;padding:clamp(26px,2.8vw,38px);height:100%;display:flex;flex-direction:column;position:relative;transition:transform .5s var(--spring),box-shadow .5s var(--spring),border-color .4s}
      .price-card:hover{transform:translateY(-6px);border-color:rgba(255,207,3,.4);box-shadow:0 22px 56px rgba(0,0,0,.45)}
      .price-dark{background:#121211;border-color:rgba(255,207,3,.18)}
      .pop-wrap{position:relative;height:100%}
      @media(min-width:1024px){.pop-wrap{transform:scale(1.05) translateY(-12px)}}
      .pop-border{background:linear-gradient(135deg,var(--accent-from),var(--accent-to));padding:1.5px;border-radius:22px;box-shadow:0 26px 70px rgba(255,176,3,.22);height:100%}
      .pop-border .price-card{border:none;border-radius:20.5px;background:#21211F}
      .pop-badge{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(120deg,var(--accent-from),var(--accent-to));color:#1C1C1C;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.16em;border-radius:99px;padding:6px 16px;white-space:nowrap;z-index:3}

      /* ---------- faq ---------- */
      .faq{border:1px solid var(--border);border-radius:12px;background:var(--bg-surface);overflow:hidden;transition:background .3s,border-color .3s}
      .faq-open{background:var(--bg-muted);border-color:rgba(255,207,3,.32)}
      .faq-q{width:100%;display:flex;justify-content:space-between;align-items:center;gap:16px;background:none;border:none;color:var(--text-primary);font-family:'Manrope',sans-serif;font-weight:700;font-size:15.5px;padding:20px 22px;text-align:start;cursor:pointer}
      .faq-chev{flex-shrink:0;color:var(--accent);transition:transform .4s ease}
      .faq-open .faq-chev{transform:rotate(180deg)}
      .faq-a{max-height:0;overflow:hidden;transition:max-height .4s ease}
      .faq-a p{margin:0;padding:0 22px 21px;color:var(--text-secondary);font-size:14.5px;line-height:1.7}

      /* ---------- cta ---------- */
      .cta-mesh{background:radial-gradient(560px 360px at 12% 18%,rgba(255,207,3,.16),transparent 70%),radial-gradient(480px 320px at 88% 14%,rgba(255,138,0,.13),transparent 70%),radial-gradient(520px 360px at 24% 92%,rgba(255,176,3,.1),transparent 70%),radial-gradient(620px 420px at 78% 86%,rgba(255,207,3,.08),transparent 70%),linear-gradient(180deg,rgba(28,28,28,.9),rgba(28,28,28,.94))}
      .cta-form{display:flex;gap:8px;max-width:520px;margin:36px auto 0;background:rgba(244,241,230,.06);border:1px solid rgba(244,241,230,.18);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-radius:999px;padding:7px;transition:border-color .3s}
      .cta-form:focus-within{border-color:rgba(255,207,3,.55)}
      .cta-input{flex:1;min-width:0;background:transparent;border:none;outline:none;color:var(--text-primary);padding:11px 20px;font-family:'Manrope',sans-serif;font-size:15px}
      .cta-input::placeholder{color:rgba(244,241,230,.4)}
      .cta-btn{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(120deg,var(--accent-from),var(--accent-to));color:#1C1C1C;border:none;border-radius:999px;font-family:'Manrope',sans-serif;font-weight:800;font-size:14.5px;padding:12px 25px;cursor:pointer;transition:all .35s var(--ease);min-width:140px;justify-content:center}
      .cta-btn:hover{transform:translateY(-1px);box-shadow:0 12px 32px rgba(255,176,3,.4)}
      .cta-btn:disabled{opacity:.75;cursor:wait}
      .cta-done{display:inline-flex;align-items:center;gap:11px;margin-top:36px;background:rgba(255,207,3,.1);border:1px solid rgba(255,207,3,.45);color:var(--accent);border-radius:999px;padding:15px 28px;font-weight:700;font-size:15px;animation:flipIn .4s var(--ease)}

      /* ---------- footer ---------- */
      .giant{font-size:clamp(44px,10.5vw,148px);font-weight:700;text-transform:uppercase;line-height:1;letter-spacing:.02em;white-space:nowrap;text-align:center;color:transparent;-webkit-text-stroke:1px rgba(244,241,230,.1);padding:clamp(36px,5vw,70px) 0 clamp(28px,4vw,56px);user-select:none}
      .soc{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:11px;border:1px solid var(--border);color:var(--text-secondary);background:rgba(244,241,230,.03);transition:all .3s var(--ease)}
      .soc:hover{color:#1C1C1C;background:var(--accent);border-color:var(--accent);transform:translateY(-3px)}
      .f-link{color:var(--text-secondary);text-decoration:none;font-size:13.5px;transition:color .25s}
      .f-link:hover{color:var(--accent)}

      /* ---------- lightbox ---------- */
      .lightbox{position:fixed;inset:0;z-index:90;background:rgba(12,12,11,.9);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:24px;cursor:zoom-out;animation:flipIn .25s ease}
      .lightbox img{max-width:min(94vw,1000px);max-height:88vh;border-radius:14px;box-shadow:var(--shadow-lg)}
      .lightbox-close{position:absolute;top:18px;right:18px}

      /* ============================================================
         АДМИНКА
         ============================================================ */
      .adm{display:flex;min-height:100vh;background:var(--bg-base)}
      .adm-side{width:225px;flex-shrink:0;background:var(--bg-deep);border-right:1px solid var(--border);padding:22px 16px;display:flex;flex-direction:column;position:sticky;top:0;height:100vh}
      .adm-main{flex:1;padding:clamp(18px,3vw,36px);min-width:0}
      .adm-head{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:26px;flex-wrap:wrap}
      .adm-nav{display:flex;align-items:center;gap:11px;width:100%;padding:11px 13px;border-radius:11px;border:none;background:none;color:var(--text-secondary);font-family:'Manrope',sans-serif;font-size:13.5px;font-weight:600;cursor:pointer;transition:all .25s;text-align:start}
      .adm-nav:hover{background:rgba(244,241,230,.05);color:var(--text-primary)}
      .adm-nav-on{background:rgba(255,207,3,.1);color:var(--accent)}
      @media(max-width:900px){
        .adm{flex-direction:column}
        .adm-side{width:100%;height:auto;position:static;flex-direction:row;align-items:center;gap:8px;overflow-x:auto;padding:12px 14px}
        .adm-side>div:first-child{margin-bottom:0!important}
        .adm-side nav{flex-direction:row!important}
        .adm-side .mt-auto{margin-top:0!important;margin-left:auto;flex-direction:row!important}
        .adm-nav{width:auto;white-space:nowrap}
      }
      .adm-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin-bottom:22px}
      .adm-kpi{background:var(--bg-surface);border:1px solid var(--border);border-radius:16px;padding:18px;position:relative;transition:border-color .3s}
      .adm-kpi:hover{border-color:rgba(255,207,3,.35)}
      .adm-kpi-icon{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:10px;background:rgba(255,207,3,.1);color:var(--accent);margin-bottom:12px}
      .adm-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:16px}
      .adm-card{background:var(--bg-surface);border:1px solid var(--border);border-radius:18px;padding:20px}
      .adm-span2{grid-column:1/-1}
      .adm-card-t{font-family:'Oswald',sans-serif;text-transform:uppercase;font-size:14px;letter-spacing:.08em;margin:0 0 16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
      .adm-legend{display:inline-flex;align-items:center;gap:6px;font-family:'JetBrains Mono',monospace;font-size:9.5px;color:var(--text-secondary);text-transform:none;letter-spacing:0}
      .adm-legend i{width:14px;height:3px;border-radius:2px;display:inline-block}
      .adm-banner{display:flex;align-items:center;gap:11px;background:rgba(255,207,3,.07);border:1px solid rgba(255,207,3,.3);border-radius:13px;padding:12px 16px;font-size:13px;margin-bottom:18px;flex-wrap:wrap}
      .adm-banner svg{color:var(--accent);flex-shrink:0}
      .adm-btn-sm{display:inline-flex;align-items:center;gap:7px;padding:8px 14px;border-radius:9px;border:1px solid var(--border);background:rgba(244,241,230,.04);color:var(--text-primary);font-family:'Manrope',sans-serif;font-size:12.5px;font-weight:600;cursor:pointer;transition:all .25s;white-space:nowrap}
      .adm-btn-sm:hover{border-color:rgba(255,207,3,.5)}
      .adm-btn-acc{background:linear-gradient(120deg,var(--accent-from),var(--accent-to));color:#1C1C1C;border:none}
      .adm-events{display:flex;flex-direction:column;gap:7px;max-height:330px;overflow-y:auto}
      .adm-event{display:flex;align-items:center;gap:9px;padding:7px 10px;border-radius:9px;background:rgba(244,241,230,.03)}
      .adm-tag{font-family:'JetBrains Mono',monospace;font-size:9px;text-transform:uppercase;letter-spacing:.08em;padding:3px 8px;border-radius:99px;flex-shrink:0}
      .adm-tag-visit{background:rgba(255,207,3,.15);color:var(--accent)}
      .adm-tag-click{background:rgba(255,138,0,.15);color:#FF8A00}
      .adm-tag-section{background:rgba(244,241,230,.1);color:var(--text-secondary)}
      .adm-tag-lang{background:rgba(100,180,255,.12);color:#7cb8ff}
      .adm-tag-submit{background:rgba(80,220,130,.13);color:#5fdc82}
      .adm-tag-video{background:rgba(220,80,200,.13);color:#e07cd9}
      .adm-tag-admin_login{background:rgba(255,80,80,.13);color:#ff7b7b}

      .adm-login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;position:relative;overflow:hidden}
      .adm-login{width:min(400px,94vw);background:var(--bg-surface);border:1px solid var(--border);border-radius:22px;padding:clamp(26px,4vw,40px);position:relative;z-index:2;box-shadow:var(--shadow-lg)}
      .adm-shake{animation:shakeKf .5s ease}
      .adm-label{display:block;font-family:'JetBrains Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.18em;color:var(--text-secondary);margin-bottom:7px}
      .adm-input{width:100%;background:rgba(244,241,230,.05);border:1px solid var(--border);border-radius:11px;color:var(--text-primary);padding:12px 15px;font-family:'Manrope',sans-serif;font-size:14px;outline:none;transition:border-color .3s}
      .adm-input:focus{border-color:rgba(255,207,3,.55)}
      .adm-area{resize:vertical;min-height:60px;line-height:1.55}
      .adm-err{display:flex;align-items:center;gap:8px;color:#ff7b7b;font-size:12.5px;margin-top:12px}
      .adm-pill{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:999px;border:1px solid var(--border);background:rgba(244,241,230,.03);color:var(--text-primary);font-family:'JetBrains Mono',monospace;font-size:11.5px;cursor:pointer;transition:all .25s}
      .adm-pill-on{border-color:var(--accent);color:var(--accent);background:rgba(255,207,3,.09)}
      .adm-acc{border:1px solid var(--border);border-radius:14px;background:var(--bg-surface);margin-bottom:10px;overflow:hidden}
      .adm-acc-open{border-color:rgba(255,207,3,.3)}
      .adm-acc-head{width:100%;display:flex;align-items:center;gap:12px;padding:15px 18px;background:none;border:none;color:var(--text-primary);font-size:14px;cursor:pointer;text-align:start}
      .adm-acc-head>span:first-child{font-weight:600}
      .adm-acc-chev{margin-left:auto;color:var(--accent);transition:transform .3s}
      .adm-acc-open .adm-acc-chev{transform:rotate(180deg)}
      .adm-acc-body{padding:6px 18px 18px;border-top:1px solid var(--border)}
      .adm-field{margin-top:13px}
      .adm-subcard{border:1px dashed var(--border);border-radius:12px;padding:13px;margin-top:13px}
      .adm-thumb{width:96px;height:66px;object-fit:cover;border-radius:9px;border:1px solid var(--border);background:#000;flex-shrink:0}
      .adm-picker{width:min(860px,94vw);max-height:84vh;overflow-y:auto;background:var(--bg-surface);border:1px solid var(--border);border-radius:20px;padding:22px;cursor:default}
      .adm-picker-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(135px,1fr));gap:11px}
      .adm-pick{position:relative;border:2px solid var(--border);border-radius:12px;overflow:hidden;padding:0;background:var(--bg-deep);cursor:pointer;transition:border-color .25s;text-align:center}
      .adm-pick:hover{border-color:rgba(255,207,3,.45)}
      .adm-pick-on{border-color:var(--accent)}
      .adm-pick .adm-thumb{width:100%;height:92px;border:none;border-radius:0}
      .adm-pick-label{display:block;font-family:'JetBrains Mono',monospace;font-size:8.5px;color:var(--text-secondary);padding:6px 7px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .adm-pick-check{position:absolute;top:7px;right:7px;width:22px;height:22px;border-radius:50%;background:var(--accent);color:#1C1C1C;display:flex;align-items:center;justify-content:center;border:none;cursor:pointer}
      .adm-drop{display:flex;flex-direction:column;align-items:center;gap:10px;border:1.5px dashed rgba(255,207,3,.4);border-radius:14px;padding:28px;color:var(--text-secondary);font-size:13px;cursor:pointer;text-align:center;transition:all .3s}
      .adm-drop:hover{background:rgba(255,207,3,.05)}
      .adm-drop svg{color:var(--accent)}
      .hidden{display:none}
    `}</style>
  );
}
