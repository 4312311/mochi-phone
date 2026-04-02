export const RP_PHONE_CSS = `
#rp-wrapper { position:fixed; right:20px; bottom:20px; z-index:9998; }

/* ── FAB ── */
#rp-fab {
  position:fixed; right:20px; bottom:20px; z-index:2147483647;
  width:52px; height:52px; border-radius:50%;
  background:rgba(255,255,255,.95); backdrop-filter:blur(12px);
  border:1px solid rgba(0,0,0,.1);
  display:flex; align-items:center; justify-content:center;
  padding:6px; overflow:hidden; cursor:grab;
  box-shadow:0 4px 24px rgba(0,0,0,.18);
  transition:box-shadow .15s;
  user-select:none; touch-action:none;
}
#rp-fab:hover { transform:scale(1.1); }

/* ── phone container ── */
#rp-phone {
  position:fixed; right:84px; bottom:20px; z-index:10000;
  cursor:default;
}


/* ══════════════════════════════════════
   📱 MOBILE RESPONSIVE ADAPTATION
   ══════════════════════════════════════ */
@media (max-width: 768px) {
  #rp-fab {
    width: 32px !important;
    height: 32px !important;
    /* font-size removed: using image icon */
    /* ST 给 html 加 transform 导致 bottom: 失效,必须用 top: calc(100vh) 绕过 */
    top: calc(100vh - 142px) !important;
    bottom: auto !important;
    right: 14px !important;
    left: auto !important;
    transform: none !important;
    background: rgba(255,255,255,.95) !important;
    border: 1px solid rgba(0,0,0,.1) !important;
    box-shadow: 0 4px 24px rgba(0,0,0,.18) !important;
    backdrop-filter: blur(12px) !important;
    z-index: 2147483647 !important;
  }
  /* PC mode: phone stays at fixed right:84px - centering via JS class only */
  #rp-phone.rp-mobile-pos {
    left: calc(50vw - 150px) !important;
    top: calc(50vh - 280px) !important;
    right: auto !important;
    bottom: auto !important;
    transform: none !important;
    z-index: 2147483645 !important;
  }
  #rp-frame {
    width: 300px !important;
    height: 560px !important;
    border-radius: 38px !important;
  }
  #rp-screen {
    border-radius: min(40px, 6vw) !important;
  }
}
@media (max-width: 360px) {
  #rp-frame {
    width: calc(100vw - 16px) !important;
    height: calc(100dvh - 60px) !important;
  }
}
/* ── CSS THEME TOKENS ── */
#rp-phone {
  /* Frame */
  --rp-frame-bg:linear-gradient(160deg,#e8e8e8,#d0d0d0);
  --rp-frame-sh:0 0 0 1.5px rgba(0,0,0,.12),0 0 0 1.5px rgba(0,0,0,.08),0 36px 80px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.5);
  --rp-btn-bg:#c0c0c0;
  --rp-island-bg:#000;
  --rp-island-ring:#f5f5f5;
  --rp-screen-bg:#fff;
  /* Status bar */
  --rp-sbar-color:#e06080;
  --rp-bat-border:rgba(0,0,0,.4);
  --rp-bat-nub:rgba(0,0,0,.3);
  /* Lock screen */
  --rp-lock-wall:linear-gradient(rgba(255,230,240,.10),rgba(255,210,225,.12)),url('https://i.postimg.cc/Hx8NSZL6/shou-ji-bi-zhi-fen-xiang-fen-se-da-hai-wen-rou-bao-ji-1-chao-ji-kun-dan-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat;
  --rp-lock-color:#4a1030;
  --rp-lock-time:#e06080;
  --rp-swipe-color:rgba(120,40,70,.4);
  --rp-ln-bg:rgba(255,255,255,.85);
  --rp-ln-bd:rgba(0,0,0,.06);
  --rp-ln-text:rgba(0,0,0,.85);
  /* Home screen */
  --rp-home-wall:linear-gradient(rgba(255,230,240,.08),rgba(255,215,228,.10)),url('https://i.postimg.cc/Hx8NSZL6/shou-ji-bi-zhi-fen-xiang-fen-se-da-hai-wen-rou-bao-ji-1-chao-ji-kun-dan-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat;
  --rp-clock-color:#e06080;
  --rp-app-lbl:#c04870;
  --rp-app-lbl-sh:0 1px 6px rgba(255,255,255,.8);
  --rp-indicator:rgba(0,0,0,.25);
  /* Widget */
  --rp-widget-bg:rgba(255,255,255,.6);
  --rp-widget-bd:rgba(0,0,0,.08);
  --rp-widget-color:#000;
  --rp-wd-fill:linear-gradient(90deg,#2563eb,#60a5fa);
  /* Nav bar */
  --rp-nav-bg:rgba(255,255,255,.72);
  --rp-nav-bd:rgba(255,180,200,.2);
  --rp-nav-title:#4a1030;
  --rp-nav-btn:#c0306a;
  /* Messages / thread */
  --rp-msg-bg:transparent;
  --rp-bubbles-bg:transparent;
  --rp-sent-bg:#2563eb;
  --rp-recv-bg:#e9ecef;
  --rp-recv-color:#000;
  /* Composer */
  --rp-composer-bg:rgba(255,255,255,.75);
  --rp-composer-bd:rgba(255,180,200,.2);
  --rp-input-bg:rgba(0,0,0,.04);
  --rp-input-bd:rgba(0,0,0,.12);
  --rp-input-color:#000;
  --rp-send-bg:linear-gradient(135deg,#e0567a,#f472b6);
  /* Themes view */
  /* Shape & Animation tokens */
  --rp-ico-radius:13px;
  --rp-ico-sh:0 2px 10px rgba(0,0,0,.15);
  --rp-ico-hover-sh:0 6px 20px rgba(0,0,0,.18);
  --rp-ico-hover-lift:translateY(-2px) scale(1.06);
  --rp-ico-active:scale(.84);
  --rp-send-size:34px;
  --rp-send-radius:17px;
  --rp-send-sh:0 2px 8px rgba(37,99,235,.35);
  --rp-send-hover-sh:0 4px 14px rgba(37,99,235,.5);
  --rp-input-radius:22px;
  --rp-input-sh:none;
  --rp-input-focus-sh:0 0 0 3px rgba(37,99,235,.15);
  --rp-bubble-radius:19px;
  --rp-bubble-radius-out:19px 19px 5px 19px;
  --rp-bubble-radius-in:19px 19px 19px 5px;
  --rp-nav-btn-radius:0px;
  --rp-nav-sh:none;
  --rp-thread-radius:0px;
  --rp-thread-mx:0px;
  --rp-thread-sh:none;
  --rp-moment-radius:0px;
  --rp-widget-radius:18px;
  --rp-widget-sh:0 2px 12px rgba(0,0,0,.08);
  --rp-transition:transform .12s ease, box-shadow .12s ease;
  --rp-themes-bg:transparent;
  --rp-themes-label:#7c3aed;
  --rp-tc-bg:#fff;
  /* Thread list */
  --rp-threads-bg:transparent;
  --rp-thread-bd:rgba(0,0,0,.08);
  --rp-thread-hover:rgba(0,0,0,.03);
  --rp-tn-color:#000;
  --rp-tp-color:rgba(0,0,0,.5);
  --rp-tt-color:rgba(0,0,0,.4);
  --rp-hd-name:rgba(0,0,0,.6);
  --rp-bts-color:rgba(0,0,0,.4);
  /* Moments */
  --rp-moments-bg:transparent;
  --rp-moment-card:#fff;
  --rp-moment-name:#2563eb;
  --rp-moment-text:#1a1a1a;
  --rp-moment-bd:rgba(0,0,0,.06);
}

/* ── Star Night Theme ── */
#rp-phone.rp-theme-star {
  --rp-frame-bg:linear-gradient(160deg,#2c1070,#1a0850);
  --rp-frame-sh:0 0 0 1.5px rgba(100,60,200,.3),0 0 0 1.5px rgba(100,60,200,.15),0 36px 80px rgba(0,0,0,.7),inset 0 1px 0 rgba(120,80,255,.2);
  --rp-btn-bg:#3a1a80;
  --rp-island-bg:#0a0620;
  --rp-island-ring:#0e0a30;
  --rp-screen-bg:transparent;
  --rp-sbar-color:#c8c0f5;
  --rp-bat-border:rgba(180,160,255,.4);
  --rp-bat-nub:rgba(180,160,255,.3);
  --rp-lock-wall:linear-gradient(rgba(8,4,20,.35),rgba(12,6,30,.4)),url('https://i.postimg.cc/DfjgWdyn/wan-an-bi-zhi-an-se-xi-hua-hua-bi-zhi-1-bai-le-you-de-bai-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat;
  --rp-lock-color:#e8e0ff;
  --rp-lock-time:#f2eeff;
  --rp-swipe-color:rgba(180,160,255,.3);
  --rp-ln-bg:rgba(15,10,42,.88);
  --rp-ln-bd:rgba(150,120,255,.12);
  --rp-ln-text:rgba(220,210,255,.85);
  --rp-home-wall:linear-gradient(rgba(8,4,20,.32),rgba(12,6,30,.38)),url('https://i.postimg.cc/DfjgWdyn/wan-an-bi-zhi-an-se-xi-hua-hua-bi-zhi-1-bai-le-you-de-bai-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat;
  --rp-clock-color:#f2eeff;
  --rp-app-lbl:rgba(225,215,255,.95);
  --rp-app-lbl-sh:0 1px 4px rgba(0,0,0,.85);
  --rp-indicator:rgba(255,255,255,.22);
  --rp-widget-bg:rgba(14,10,45,.82);
  --rp-widget-bd:rgba(140,110,255,.18);
  --rp-widget-color:#e8e0ff;
  --rp-wd-fill:linear-gradient(90deg,#7c3aed,#a855f7);
  --rp-nav-bg:rgba(12,6,30,.78);
  --rp-nav-bd:rgba(168,85,247,.2);
  --rp-nav-title:#e8e0ff;
  --rp-nav-btn:#a78bfa;
  --rp-msg-bg:transparent;
  --rp-bubbles-bg:transparent;
  --rp-sent-bg:linear-gradient(135deg,#5b21b6,#7c3aed);
  --rp-recv-bg:rgba(40,28,90,.9);
  --rp-recv-color:#ddd4ff;
  --rp-composer-bg:rgba(10,8,30,.97);
  --rp-composer-bd:rgba(140,110,255,.12);
  --rp-input-bg:rgba(255,255,255,.06);
  --rp-input-bd:rgba(140,110,255,.2);
  --rp-input-color:#e0d8ff;
  --rp-send-bg:linear-gradient(135deg,#6d28d9,#a855f7);
  /* Shape & Animation */
  --rp-ico-radius:8px;
  --rp-ico-sh:0 2px 12px rgba(0,0,0,.6),0 0 0 1px rgba(140,110,255,.15);
  --rp-ico-hover-sh:0 0 16px rgba(168,85,247,.7),0 0 0 1px rgba(168,85,247,.5);
  --rp-ico-hover-lift:translateY(-1px) scale(1.04);
  --rp-ico-active:scale(.88);
  --rp-send-size:34px;
  --rp-send-radius:8px;
  --rp-send-sh:0 0 12px rgba(109,40,217,.6);
  --rp-send-hover-sh:0 0 20px rgba(168,85,247,.85);
  --rp-input-radius:8px;
  --rp-input-sh:inset 0 0 0 1px rgba(140,110,255,.2);
  --rp-input-focus-sh:0 0 0 2px rgba(168,85,247,.5),inset 0 0 8px rgba(140,110,255,.1);
  --rp-bubble-radius:8px;
  --rp-bubble-radius-out:8px 8px 2px 8px;
  --rp-bubble-radius-in:8px 8px 8px 2px;
  --rp-nav-btn-radius:6px;
  --rp-nav-sh:0 1px 0 rgba(140,110,255,.15);
  --rp-thread-radius:0px;
  --rp-thread-mx:0px;
  --rp-thread-sh:none;
  --rp-moment-radius:0px;
  --rp-widget-radius:10px;
  --rp-widget-sh:0 0 20px rgba(109,40,217,.3),0 0 0 1px rgba(140,110,255,.2);
  --rp-transition:transform .08s ease, box-shadow .08s ease;
  --rp-themes-bg:transparent;
  --rp-themes-label:#c8b4ff;
  --rp-tc-bg:rgba(20,14,55,.9);
  --rp-threads-bg:transparent;
  --rp-thread-bd:rgba(140,110,255,.1);
  --rp-thread-hover:rgba(255,255,255,.03);
  --rp-tn-color:#e0d8ff;
  --rp-tp-color:rgba(180,165,255,.5);
  --rp-tt-color:rgba(180,165,255,.4);
  --rp-hd-name:rgba(180,165,255,.7);
  --rp-bts-color:rgba(180,165,255,.35);
  --rp-moments-bg:transparent;
  --rp-moment-card:rgba(20,14,55,.9);
  --rp-moment-name:#a78bfa;
  --rp-moment-text:#d5ccff;
  --rp-moment-bd:rgba(140,110,255,.1);
}

/* ── frame (iPhone 15 Pro) ── */
#rp-frame {
  position:relative; width:286px; height:580px;
  background:var(--rp-frame-bg);
  border-radius:50px;
  box-shadow:var(--rp-frame-sh);
  padding:11px;
}

/* side buttons */
.rp-btn { position:absolute; border-radius:2px; background:var(--rp-btn-bg); }
.rp-vol-up  { left:-3px; top:88px;  width:3px; height:34px; }
.rp-vol-dn  { left:-3px; top:130px; width:3px; height:34px; }
.rp-power   { right:-3px; top:106px; width:3px; height:46px; }

/* ── screen ── */
#rp-screen {
  width:100%; height:100%;
  background:var(--rp-home-wall), var(--rp-screen-bg);
  background-size:cover;
  background-position:center;
  border-radius:40px; overflow:hidden;
  position:relative;
  font-family:-apple-system,'SF Pro Display','Helvetica Neue',sans-serif;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

/* Dynamic Island */
#rp-island {
  position:absolute; top:11px; left:50%; transform:translateX(-50%);
  width:86px; height:28px; background:var(--rp-island-bg); border-radius:20px; z-index:200;
  box-shadow:0 0 0 2px var(--rp-island-ring);
}

/* ── status bar ── */
#rp-sbar {
  position:absolute; top:0; left:0; right:0; height:48px;
  display:flex; align-items:flex-end; justify-content:space-between;
  padding:0 20px 7px; z-index:199; color:var(--rp-sbar-color);
  font-size:12px; font-weight:600; letter-spacing:-.2px;
}
.rp-sbar-r { display:flex; align-items:center; gap:6px; }
#rp-bat { width:22px; height:11px; border:1.5px solid var(--rp-bat-border); border-radius:3px; padding:1.5px; position:relative; }
#rp-bat::after { content:''; position:absolute; right:-4px; top:50%; transform:translateY(-50%); width:2px; height:5px; background:var(--rp-bat-nub); border-radius:0 1px 1px 0; }
#rp-bat-fill { height:100%; width:85%; background:#34c759; border-radius:1.5px; }

/* ── views ── */
.rp-view { position:absolute; inset:0; overflow:hidden; }

/* ── LOCK SCREEN ── */
.rp-lock-bg {
  position:absolute; inset:0;
  background:var(--rp-lock-wall);
}
.rp-lock-body {
  position:absolute; inset:0;
  display:flex; flex-direction:column; align-items:center; padding-top:64px;
  cursor:pointer; color:var(--rp-lock-color);
}
#rp-lock-time {
  font-size:70px; font-weight:100; letter-spacing:-4px; line-height:1;
  color:var(--rp-lock-time); text-shadow:0 2px 8px rgba(0,0,0,.08);
}
#rp-lock-date { display:none !important; }
#rp-lock-notifs { width:100%; padding:14px 16px; display:flex; flex-direction:column; gap:8px; margin-top:10px; }

/* ── 滑动删除外层容器 ── */
.rp-ln-wrap {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  flex-shrink: 0;
}
/* 红色删除按钮层（藏在右侧，初始宽度0隐藏，避免透出） */
.rp-ln-del-btn {
  position: absolute;
  right: 0; top: 0; bottom: 0;
  width: 72px;
  background: #ff3b30;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 12px; font-weight: 700;
  cursor: pointer;
  border-radius: 0 14px 14px 0;
  user-select: none;
  z-index: 1;
  /* 初始完全隐藏，仅在父容器有 rp-ln-wrap-active 时显示 */
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease;
}
.rp-ln-wrap.rp-ln-wrap-active .rp-ln-del-btn {
  opacity: 1;
  pointer-events: auto;
}
/* 通知内容卡片（可左滑） */
.rp-ln {
  position: relative;
  z-index: 2;
  background:var(--rp-ln-bg); backdrop-filter:blur(24px);
  border:1px solid var(--rp-ln-bd); border-radius:14px;
  padding:10px 14px; display:flex; flex-direction:column; gap:4px;
  box-shadow:0 2px 8px rgba(0,0,0,.08);
  /* 使用 GPU 加速动画，提升 PC 端流畅度 */
  transition: transform 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  transform: translateZ(0);
  cursor: pointer;
}
.rp-ln.rp-ln-swiped {
  transform: translateX(-72px) translateZ(0);
  border-radius: 14px 0 0 14px;
}
.rp-ln-type { font-size:10px; font-weight:700; color:rgba(0,0,0,.4); text-transform:uppercase; letter-spacing:.6px; }
.rp-ln-text { font-size:12px; color:var(--rp-ln-text); line-height:1.4; }

#rp-swipe-hint {
  position:absolute; bottom:30px; left:0; right:0; text-align:center;
  font-size:12px; color:var(--rp-swipe-color);
  animation:rp-breathe 2.2s ease-in-out infinite;
}
@keyframes rp-breathe { 0%,100%{opacity:.2} 50%{opacity:.5} }
#rp-swipe-zone { position:absolute; inset:0; cursor:pointer; }

/* ── HOME SCREEN ── */
.rp-home-bg {
  position:absolute; inset:0;
  background:transparent;
}
.rp-home-body { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; padding-top:54px; }
#rp-home-clock { font-size:52px; font-weight:100; color:var(--rp-clock-color); letter-spacing:-3px; margin-bottom:22px; }

/* app grid */
#rp-app-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; padding:0 18px; width:100%; }
.rp-app { display:flex; flex-direction:column; align-items:center; gap:5px; cursor:pointer; transition:transform .12s; }
.rp-app:active .rp-app-ico { transform:var(--rp-ico-active); }
.rp-app:not(:active):hover .rp-app-ico { transform:var(--rp-ico-hover-lift); box-shadow:var(--rp-ico-hover-sh); }
.rp-app-off { opacity:.35; pointer-events:none; }
.rp-app-ico {
  width:52px; height:52px; border-radius:var(--rp-ico-radius);
  display:flex; align-items:center; justify-content:center; font-size:26px;
  position:relative; box-shadow:var(--rp-ico-sh);
  transition:var(--rp-transition);
}
.rp-app-ico svg { width:100%; height:100%; }
.rp-app-lbl { font-size:10px; color:var(--rp-app-lbl); text-shadow:var(--rp-app-lbl-sh); }
.rp-badge {
  position:absolute; top:-5px; right:-5px;
  background:#ff3b30; color:#fff; font-size:10px; font-weight:700;
  min-width:17px; height:17px; border-radius:9px; padding:0 4px;
  display:flex; align-items:center; justify-content:center;
  border:1.5px solid #fff;
}

/* widget */
#rp-widget {
  background:var(--rp-widget-bg);
  border:1px solid var(--rp-widget-bd); border-radius:var(--rp-widget-radius);
  margin:18px 16px 0; padding:13px 16px; width:calc(100% - 32px); color:var(--rp-widget-color);
  box-shadow:var(--rp-widget-sh);
}
.rp-wd-label { font-size:10px; text-transform:uppercase; letter-spacing:.8px; opacity:.45; font-weight:600; }
.rp-wd-stage { font-size:14px; font-weight:600; margin:5px 0 7px; }
.rp-wd-track { height:3px; background:rgba(0,0,0,.08); border-radius:2px; overflow:hidden; }
.rp-wd-fill  { height:100%; width:0%; background:var(--rp-wd-fill); border-radius:2px; transition:width .9s ease; }
.rp-wd-status { font-size:11px; opacity:.55; margin-top:7px; }

.rp-home-indicator { position:absolute; bottom:8px; left:50%; transform:translateX(-50%); width:90px; height:4px; background:var(--rp-indicator); border-radius:2px; }

/* ── HOME PAGES (双屏横滑) ── */
#rp-home-pages {
  position:absolute; inset:0;
  display:flex; flex-direction:row;
  width:200%; overflow:hidden;
  transition:transform .32s cubic-bezier(.4,0,.2,1);
  will-change:transform;
}
.rp-home-page {
  width:50%; flex-shrink:0;
  position:relative; height:100%;
  overflow:hidden;
}
/* 页面指示点 */
#rp-home-dots {
  position:absolute; bottom:22px; left:50%; transform:translateX(-50%);
  display:flex; gap:6px; z-index:10;
}
.rp-home-dot {
  width:6px; height:6px; border-radius:50%;
  background:var(--rp-indicator,rgba(0,0,0,.25));
  transition:background .25s, transform .25s;
}
.rp-home-dot-active {
  background:var(--rp-clock-color,#e06080);
  transform:scale(1.25);
}
/* ── 关于页 ── */
#rp-about-page {
  position:absolute; inset:0;
  display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  padding:20px 24px 36px;
  /* 默认主题(Candy) token */
  --rp-about-card-bg: rgba(255,240,245,.72);
  --rp-about-card-bd: rgba(224,96,128,.18);
  --rp-about-text: #7a2040;
  --rp-about-hl-color: #a01838;
  --rp-about-bg:var(--rp-screen-bg,#fff);
}
/* Star(深色)主题 */
#rp-phone.rp-theme-star #rp-about-page {
  --rp-about-card-bg: rgba(14,10,45,.78);
  --rp-about-card-bd: rgba(168,85,247,.22);
  --rp-about-text: #e0d8ff;
  --rp-about-hl-color: #c8b4ff;
}
/* Misty主题 */
#rp-phone.rp-theme-misty #rp-about-page {
  --rp-about-card-bg: rgba(235,248,255,.72);
  --rp-about-card-bd: rgba(140,175,210,.28);
  --rp-about-text: #1a2e44;
  --rp-about-hl-color: #1a4a7a;
}
#rp-about-deco {
  width:160px; height:130px;
  color:var(--rp-about-hl-color,#e06080);
  flex-shrink:0;
}
/* 内容卡片：只包文字，壁纸完整透出 */
.rp-about-card {
  display:flex; flex-direction:column; align-items:center;
  padding:18px 28px 20px;
  border-radius:22px;
  background:var(--rp-about-card-bg);
  border:1px solid var(--rp-about-card-bd);
  box-shadow:0 4px 20px rgba(0,0,0,.08);
  backdrop-filter:blur(16px) saturate(1.3);
  -webkit-backdrop-filter:blur(16px) saturate(1.3);
  width:100%;
}
#rp-about-title {
  font-size:18px; font-weight:700;
  color:var(--rp-about-hl-color,#a01838);
  text-shadow:none;
  margin-top:0; letter-spacing:.5px;
}
#rp-about-author {
  font-size:12px; font-weight:600;
  color:var(--rp-about-text,#7a2040);
  opacity:.75; margin-top:4px;
  letter-spacing:.3px;
}
#rp-about-divider {
  width:48px; height:1px;
  background:var(--rp-about-text,#7a2040);
  opacity:.2; margin:12px 0;
}
#rp-about-notice {
  font-size:11.5px; line-height:1.8;
  color:var(--rp-about-text,#7a2040);
  text-align:center; opacity:.9;
  text-shadow:none;
}
.rp-about-hl {
  font-weight:700;
  color:var(--rp-about-hl-color,#a01838);
  opacity:1;
}

/* ── MESSAGES VIEW ── */
#rp-view-messages { background:transparent !important; display:flex; flex-direction:column; }
#rp-thread-list { flex:1; overflow-y:auto; scrollbar-width:none; }
#rp-thread-list::-webkit-scrollbar { display:none; }

.rp-thread {
  display:flex; align-items:center; gap:12px;
  padding:11px 16px; border-bottom:1px solid var(--rp-thread-bd);
  cursor:pointer; transition:background .12s;
}
.rp-thread:hover { background:var(--rp-thread-hover); }

.rp-av { width:46px; height:46px; border-radius:23px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; color:#fff; }
.rp-ti { flex:1; min-width:0; }
.rp-tn { font-size:14px; font-weight:600; color:var(--rp-tn-color); }
.rp-tp { font-size:12px; color:var(--rp-tp-color); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; margin-top:2px; }
.rp-tm { display:flex; flex-direction:column; align-items:flex-end; gap:5px; }
.rp-tt { font-size:11px; color:var(--rp-tt-color); }
.rp-tbadge { background:#2563eb; color:#fff; font-size:10px; font-weight:700; min-width:19px; height:19px; border-radius:10px; padding:0 5px; display:flex; align-items:center; justify-content:center; }

/* ── THREAD VIEW ── */
#rp-view-thread { background:transparent !important; display:flex; flex-direction:column; }

/* bubbles */
#rp-bubbles { flex:1; overflow-y:auto; padding:10px; display:flex; flex-direction:column; gap:3px; scrollbar-width:none; }
#rp-bubbles::-webkit-scrollbar { display:none; }

/* FIX3: 待发消息队列预览 */
#rp-pending-queue {
  padding:6px 12px 4px;
  display:flex; flex-direction:column; gap:3px;
  flex-shrink:0;
  max-height:76px; overflow-y:auto;
  border-top:1px solid rgba(37,99,235,.15);
  background:rgba(37,99,235,.04);
  scrollbar-width:none;
}
#rp-pending-queue::-webkit-scrollbar { display:none; }
.rp-pending-item {
  font-size:11px; color:#1d4ed8;
  background:rgba(37,99,235,.1);
  border-radius:8px; padding:3px 10px;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.rp-pending-hint {
  font-size:10px; color:rgba(0,0,0,.35);
  text-align:center; padding:1px 0 2px;
}

.rp-bwrap { display:flex; flex-direction:column; gap:2px; }
.rp-out { align-items:flex-end; }
.rp-in  { align-items:flex-start; }
/* 编辑/删除按钮横排容器 */
.rp-btn-row { display:flex; flex-direction:row; align-items:center; gap:2px; }
.rp-bubble { max-width:72%; padding:9px 13px; border-radius:19px; font-size:13px; line-height:1.45; word-break:break-word; }
.rp-sent { background:var(--rp-sent-bg); color:#fff; border-radius:var(--rp-bubble-radius-out); }
.rp-recv { background:var(--rp-recv-bg); color:var(--rp-recv-color); border-radius:var(--rp-bubble-radius-in); }
.rp-bts  { font-size:10px; color:var(--rp-bts-color); padding:0 4px; }

/* composer */
#rp-composer {
  display:flex !important;
  align-items:center !important;
  gap:8px !important;
  padding:8px 12px 22px !important;
  border-top:1px solid var(--rp-composer-bd) !important;
  flex-shrink:0 !important;
  background:var(--rp-composer-bg) !important;
}
#rp-input {
  flex:1 !important;
  background:var(--rp-input-bg) !important;
  border:1px solid var(--rp-input-bd) !important;
  border-radius:var(--rp-input-radius) !important;
  padding:9px 16px !important;
  color:var(--rp-input-color) !important;
  box-shadow:var(--rp-input-sh) !important;
  transition:box-shadow .18s ease, border-color .18s ease !important;
  font-size:13px !important;
  outline:none !important;
  font-family:inherit !important;
  min-width:0 !important;
  box-sizing:border-box !important;
}
#rp-input::placeholder { color:rgba(0,0,0,.4); }
#rp-input:focus { box-shadow:var(--rp-input-focus-sh) !important; border-color:rgba(0,0,0,.3) !important; }

/* ✅ FIX2: 强制显示发送按钮,防止 SillyTavern 全局 CSS 覆盖 */
#rp-send {
  width:var(--rp-send-size) !important;
  height:var(--rp-send-size) !important;
  min-width:var(--rp-send-size) !important;
  border-radius:var(--rp-send-radius) !important;
  background:var(--rp-send-bg) !important;
  border:none !important;
  color:#fff !important;
  font-size:16px !important;
  font-weight:700 !important;
  cursor:pointer !important;
  display:flex !important;
  align-items:center !important;
  justify-content:center !important;
  flex-shrink:0 !important;
  box-shadow:var(--rp-send-sh) !important;
  transition:var(--rp-transition), opacity .15s !important;
  visibility:visible !important;
  opacity:1 !important;
  pointer-events:auto !important;
  padding:0 !important;
  margin:0 !important;
  line-height:1 !important;
  box-shadow:none !important;
  outline:none !important;
}
#rp-send:hover { opacity:.92 !important; box-shadow:var(--rp-send-hover-sh) !important; transform:scale(1.06) !important; }

/* ── NAV BAR (共用) ── */
.rp-nav-bar {
  height:92px; padding-top:46px; flex-shrink:0;
  display:flex; align-items:center; justify-content:space-between;
  padding-left:6px; padding-right:16px;
  position:relative;
  background:transparent;
  border-bottom:1px solid transparent;
}

.rp-nav-title {position:absolute;left:0;right:0;text-align:center;pointer-events:none;font-size:16px;font-weight:600;color:var(--rp-nav-title);}
.rp-back {
  background:none !important; border:none !important;
  color:var(--rp-nav-btn) !important; font-size:30px !important;
  line-height:1 !important; cursor:pointer !important;
  padding:0 6px !important; font-family:inherit !important;
  display:inline-flex !important; visibility:visible !important;
  opacity:1 !important; pointer-events:auto !important;
}
.rp-nav-add {
  background:none !important; border:none !important;
  color:var(--rp-nav-btn) !important; font-size:28px !important;
  line-height:1 !important; cursor:pointer !important;
  padding:0 6px !important; font-family:inherit !important;
  font-weight:300 !important; display:inline-flex !important;
  visibility:visible !important; opacity:1 !important;
  pointer-events:auto !important;
}
.rp-thread-hd { display:flex; flex-direction:column; align-items:center; gap:4px; }
.rp-hd-av { width:32px; height:32px; border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#fff; }
.rp-hd-name { font-size:11px; color:var(--rp-hd-name); }

/* ── ADD CONTACT MODAL ── */
/* ✅ FIX3: modal 已移至 #rp-screen 内部,position:absolute; inset:0 现在正确覆盖手机屏幕 */
#rp-add-modal {
  position:absolute; inset:0; z-index:600;
  background:rgba(0,0,0,.4); backdrop-filter:blur(8px);
  display:flex; align-items:center; justify-content:center;
  padding:20px;
}
#rp-add-form {
  background:#fff; border-radius:18px;
  padding:20px; width:100%; max-width:240px;
  box-shadow:0 12px 40px rgba(0,0,0,.3);
}
#rp-add-form h3 {
  margin:0 0 16px; font-size:18px; font-weight:600; color:#000; text-align:center;
}
#rp-add-form input {
  width:100%; padding:10px 12px; margin-bottom:12px;
  border:1px solid rgba(0,0,0,.15); border-radius:10px;
  font-size:14px; font-family:inherit; color:#000;
  background:rgba(0,0,0,.02); outline:none; box-sizing:border-box;
}
#rp-add-form input::placeholder { color:rgba(0,0,0,.4); }
#rp-add-btns {
  display:flex; gap:10px; margin-top:16px;
}
#rp-add-btns button {
  flex:1 !important; padding:10px !important; border:none !important; border-radius:10px !important;
  font-size:14px !important; font-weight:600 !important; cursor:pointer !important;
  font-family:inherit !important; transition:opacity .15s;
  display:flex !important; align-items:center !important; justify-content:center !important;
  visibility:visible !important; opacity:1 !important; pointer-events:auto !important;
}
#rp-add-btns button:hover { opacity:.8 !important; }
#rp-add-cancel { background:#e9ecef !important; color:#000 !important; }
#rp-add-confirm { background:#2563eb !important; color:#fff !important; }

/* ── NOTIFICATION BANNER ── */
#rp-notif-banner {
  position:absolute; top:52px; left:10px; right:10px;
  background:rgba(255,255,255,.95); backdrop-filter:blur(24px);
  border:1px solid rgba(0,0,0,.08); border-radius:15px;
  padding:11px 13px; display:flex; align-items:center; gap:10px;
  z-index:500; box-shadow:0 6px 24px rgba(0,0,0,.2);
  transform:translateY(-130%); transition:transform .38s cubic-bezier(.34,1.56,.64,1);
}
#rp-notif-banner.rp-nb-in { transform:translateY(0); }
.rp-nb-ico { font-size:22px; flex-shrink:0; }
.rp-nb-body { flex:1; min-width:0; }
.rp-nb-from { font-size:11px; font-weight:600; color:rgba(0,0,0,.5); }
.rp-nb-text { font-size:13px; color:#000; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.rp-nb-time { font-size:11px; color:rgba(0,0,0,.4); align-self:flex-start; flex-shrink:0; }

/* ── home indicator ── */
#rp-home-ind { position:absolute; bottom:7px; left:50%; transform:translateX(-50%); width:90px; height:4px; background:rgba(0,0,0,.25); border-radius:2px; z-index:300; }
/* dark mode toggle is now an app icon on home screen */
/* ── DARK FRAME ── */
.rp-dark #rp-frame{background:linear-gradient(160deg,#1e1e1e,#101010);box-shadow:0 0 0 1.5px rgba(255,255,255,.06),0 0 0 9px #0c0c0c,0 0 0 10px rgba(255,255,255,.04),0 36px 80px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.06)}
.rp-dark .rp-btn{background:#2c2c2c}
.rp-dark #rp-screen{background:var(--rp-home-wall);background-size:cover;background-position:center}
.rp-dark #rp-island{background:#0a0a0a}
/* ── DARK LOCK ── */
.rp-dark .rp-lock-bg{background:radial-gradient(ellipse 120% 80% at 30% 15%,rgba(80,60,200,.35),transparent 55%),radial-gradient(ellipse 100% 80% at 80% 85%,rgba(40,60,200,.25),transparent 55%),linear-gradient(180deg,#0c0c1a,#08080f,#0c0c1a)}
.rp-dark .rp-lock-body{color:#e0e2f0}
.rp-dark #rp-lock-time{color:#eef0ff}
.rp-dark #rp-lock-date{display:none!important}
.rp-dark .rp-ln{background:rgba(12,12,24,.88);border-color:rgba(255,255,255,.07)}
.rp-dark .rp-ln-type{color:rgba(160,175,255,.45)}
.rp-dark .rp-ln-text{color:rgba(210,218,255,.85)}
.rp-dark #rp-swipe-hint{color:rgba(180,195,255,.3)}
.rp-dark #rp-sbar{color:#dde0f2}
/* ── DARK HOME ── */
.rp-dark .rp-home-bg{background:radial-gradient(ellipse 100% 70% at 20% 10%,rgba(50,60,140,.38),transparent 50%),radial-gradient(ellipse 100% 70% at 80% 90%,rgba(30,50,130,.28),transparent 50%),linear-gradient(170deg,#0c0c1a,#090912,#0c0c1a)}
.rp-dark #rp-home-clock{color:#eef0ff}
.rp-dark .rp-app-lbl{color:rgba(210,218,255,.88);text-shadow:0 1px 3px rgba(0,0,0,.7)}
.rp-dark .rp-app-ico{box-shadow:0 2px 10px rgba(0,0,0,.5)}
.rp-dark .rp-app-off{opacity:.2}
.rp-dark #rp-widget{background:rgba(12,12,24,.78);border-color:rgba(255,255,255,.07);box-shadow:0 2px 12px rgba(0,0,0,.4)}


/* ══════════════════════════════════════════════════════
   THEME ICON SYSTEM - each theme gets its own visual language
   ══════════════════════════════════════════════════════ */

/* ── Base: remove all hardcoded inline bg on icons ── */
#rp-phone .rp-app-ico {
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
  font-size: 28px !important;
  transition: transform .14s ease, filter .14s ease !important;
  filter: drop-shadow(0 1px 4px rgba(0,0,0,.35)) !important;
  /* SVG 线条颜色始终跟随时钟颜色，通过 currentColor 继承，无需 JS 读取时机 */
  color: var(--rp-clock-color) !important;
}
#rp-phone .rp-app-ico:active { transform: scale(.88) !important; }

/* ══ 🌸 CANDY: PINK BUBBLES - perfect circles, pearl glass ══ */
#rp-phone.rp-theme-candy .rp-app-ico {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  font-size: 26px !important;
  filter: drop-shadow(0 1px 4px rgba(200,60,90,.55)) drop-shadow(0 0 6px rgba(255,255,255,.6)) !important;
}
#rp-phone.rp-theme-candy .rp-app-ico:active {
  transform: scale(.88) !important;
  box-shadow: 0 3px 10px rgba(200,100,140,.3), inset 0 1px 0 rgba(255,255,255,.6) !important;
}
#rp-phone.rp-theme-candy .rp-app-lbl {
  color: #7a1038 !important;
  font-size: 10px !important;
  font-weight: 600 !important;
  text-shadow: 0 1px 4px rgba(255,255,255,.7);
}
/* Candy widget: pearl pink glass */
#rp-phone.rp-theme-candy #rp-widget {
  background: rgba(255,228,238,.62) !important;
  border: 1.5px solid rgba(220,130,165,.28) !important;
  box-shadow: 0 8px 28px rgba(200,100,140,.18), inset 0 1px 0 rgba(255,255,255,.7) !important;
  border-radius: 22px !important;
}
#rp-phone.rp-theme-candy #rp-home-clock {
  color: #c03060 !important;
  font-weight: 200 !important;
  font-size: 58px !important;
  letter-spacing: -3px !important;
  text-shadow:
    0 0 28px rgba(255,255,255,.92),
    0 0 10px rgba(255,255,255,.7),
    0 2px 6px rgba(255,255,255,.4) !important;
}
/* Candy nav bars: transparent */
#rp-phone.rp-theme-candy .rp-nav-bar {
  background: transparent !important;
  border-bottom: 1px solid rgba(220,130,165,.15) !important;
}
/* Candy send button: rose circle */
#rp-phone.rp-theme-candy #rp-send {
  background: linear-gradient(135deg, #e8648a, #f472b6) !important;
  border-radius: 50% !important;
  box-shadow: 0 4px 16px rgba(220,80,130,.35) !important;
}
#rp-phone.rp-theme-candy #rp-input {
  border-color: rgba(220,130,165,.35) !important;
  border-radius: 20px !important;
}
/* Candy thread list items */
#rp-phone.rp-theme-candy .rp-av {
  border-radius: 50% !important;
  box-shadow: 0 3px 12px rgba(200,100,140,.2) !important;
}

/* Candy outgoing bubble polish (only candy/default) */
#rp-phone:not(.rp-theme-star):not(.rp-theme-misty) .rp-sent,
#rp-phone.rp-theme-candy .rp-sent {
  background: linear-gradient(135deg,#ff7fb1 0%, #f06292 48%, #e34a86 100%) !important;
  border: 1px solid rgba(255,255,255,.42) !important;
  box-shadow: 0 4px 12px rgba(198,64,116,.34), inset 0 1px 0 rgba(255,255,255,.36) !important;
  color:#fff !important;
}
#rp-phone:not(.rp-theme-star):not(.rp-theme-misty) .rp-out .rp-bts,
#rp-phone.rp-theme-candy .rp-out .rp-bts {
  color: rgba(126, 34, 78, .58) !important;
}

/* ══ ✨ STAR: DARK TECH CHIPS - sharp rectangles, neon glow ══ */
#rp-phone.rp-theme-star .rp-app-ico {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  font-size: 24px !important;
  filter: drop-shadow(0 0 6px rgba(160,130,255,.7)) drop-shadow(0 1px 3px rgba(0,0,0,.5)) !important;
}
#rp-phone.rp-theme-star .rp-app-ico:active {
  transform: scale(.9) !important;
  box-shadow: 0 0 20px rgba(140,80,255,.5), 0 2px 8px rgba(0,0,0,.7) !important;
}
#rp-phone.rp-theme-star .rp-app-lbl {
  color: rgba(210,195,255,.9) !important;
  font-size: 10px !important;
  font-weight: 500 !important;
  text-shadow: 0 0 8px rgba(140,80,255,.6);
}
/* Star widget: deep space glass */
#rp-phone.rp-theme-star #rp-widget {
  background: rgba(14,8,40,.88) !important;
  border: 1px solid rgba(150,100,255,.35) !important;
  box-shadow: 0 0 20px rgba(100,50,220,.25), 0 8px 32px rgba(0,0,0,.7) !important;
  border-radius: 14px !important;
}
#rp-phone.rp-theme-star #rp-home-clock {
  color: #d4ccff !important;
  font-weight: 100 !important;
  text-shadow: 0 0 30px rgba(140,100,255,.4) !important;
}
/* Star nav bars: transparent */
#rp-phone.rp-theme-star .rp-nav-bar {
  background: transparent !important;
  border-bottom: 1px solid rgba(150,100,255,.15) !important;
}
/* Star send button: purple neon */
#rp-phone.rp-theme-star #rp-send {
  background: linear-gradient(135deg, #6d28d9, #8b5cf6) !important;
  border-radius: 10px !important;
  box-shadow: 0 0 14px rgba(120,60,255,.5) !important;
}
#rp-phone.rp-theme-star #rp-input {
  border-color: rgba(150,100,255,.4) !important;
  border-radius: 8px !important;
  background: rgba(20,12,50,.6) !important;
  color: #e0d4ff !important;
}
/* Star thread items: purple chip hover */
#rp-phone.rp-theme-star .rp-av {
  border-radius: 10px !important;
  box-shadow: 0 0 8px rgba(120,60,255,.25) !important;
}

/* ══ 🌿 MISTY: WATERCOLOR OVALS - soft rounded, pearl white ══ */
#rp-phone.rp-theme-misty .rp-app-ico {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  filter: drop-shadow(0 1px 3px rgba(0,20,60,.45)) drop-shadow(0 0 5px rgba(0,10,40,.25)) !important;
}
#rp-phone.rp-theme-misty .rp-app-ico:active {
  transform: scale(.9) !important;
  box-shadow: 0 3px 12px rgba(100,145,195,.25), inset 0 1px 0 rgba(255,255,255,.5) !important;
}
#rp-phone.rp-theme-misty .rp-app-lbl {
  color: rgba(218,238,253,.91) !important;
  font-size: 10px !important;
  font-weight: 500 !important;
  text-shadow: 0 1px 3px rgba(0,20,60,.58), 0 0 6px rgba(0,10,40,.38) !important;
}
/* Misty widget: white-blue glass */
#rp-phone.rp-theme-misty #rp-widget {
  background: rgba(240,248,255,.62) !important;
  border: 1.5px solid rgba(130,175,215,.3) !important;
  box-shadow: 0 8px 28px rgba(100,145,195,.15), inset 0 1px 0 rgba(255,255,255,.7) !important;
  border-radius: 22px !important;
}
#rp-phone.rp-theme-misty #rp-home-clock {
  color: rgba(220,238,252,.92) !important;
  font-weight: 100 !important;
  letter-spacing: -2px !important;
  text-shadow: 0 1px 6px rgba(0,20,60,.45), 0 2px 16px rgba(0,10,40,.25) !important;
}
/* Misty nav bars: transparent */
#rp-phone.rp-theme-misty .rp-nav-bar {
  background: transparent !important;
  border-bottom: 1px solid rgba(130,175,215,.2) !important;
}
/* Misty send button: steel-blue oval */
#rp-phone.rp-theme-misty #rp-send {
  background: linear-gradient(135deg, #4d8fbf, #2d6d9a) !important;
  border-radius: 20px 14px 14px 20px !important;
  box-shadow: 0 4px 14px rgba(70,120,180,.3) !important;
}
#rp-phone.rp-theme-misty #rp-input {
  border-color: rgba(130,175,215,.35) !important;
  border-radius: 16px !important;
}
#rp-phone.rp-theme-misty .rp-av {
  border-radius: 20px !important;
  box-shadow: 0 3px 12px rgba(100,145,195,.2) !important;
}

/* Pending queue readability (all themes) */
#rp-phone.rp-theme-candy #rp-pending-queue {
  background: rgba(255, 234, 244, .82) !important;
  border-top-color: rgba(188, 68, 118, .42) !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
#rp-phone.rp-theme-candy .rp-pending-item {
  color: #7a163f !important;
  background: rgba(255, 255, 255, .74) !important;
  font-weight: 600 !important;
}
#rp-phone.rp-theme-candy .rp-pending-hint {
  color: rgba(108, 18, 56, .92) !important;
  font-weight: 600 !important;
}

#rp-phone.rp-theme-star #rp-pending-queue {
  background: rgba(18, 10, 48, .72) !important;
  border-top-color: rgba(148, 110, 255, .35) !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
#rp-phone.rp-theme-star .rp-pending-item {
  color: #e4d8ff !important;
  background: rgba(126, 84, 255, .28) !important;
}
#rp-phone.rp-theme-star .rp-pending-hint {
  color: rgba(224, 208, 255, .72) !important;
}

#rp-phone.rp-theme-misty #rp-pending-queue {
  background: rgba(228, 241, 252, .72) !important;
  border-top-color: rgba(96, 146, 186, .32) !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
#rp-phone.rp-theme-misty .rp-pending-item {
  color: #1f4a6a !important;
  background: rgba(255, 255, 255, .58) !important;
}
#rp-phone.rp-theme-misty .rp-pending-hint {
  color: rgba(35, 77, 110, .78) !important;
}

/* ── SHARED: icon grid spacing & app grid for icon-only style ── */
#rp-phone #rp-app-grid { gap: 16px !important; }
/* ══════════════════════════════════════════════════════ */

/* ── LOCK SCREEN WIDGET ── */
#rp-lock-widget {
  position:absolute; bottom:72px; left:50%; transform:translateX(-50%);
  width:calc(100% - 40px); max-width:220px;
  background:rgba(255,255,255,.18);
  border:1px solid rgba(255,255,255,.28);
  border-radius:18px; padding:12px 16px;
  color:#fff; text-align:left;
  display:none;
}
#rp-lock-widget .rp-lw-label {
  font-size:10px; font-weight:700; letter-spacing:.8px;
  text-transform:uppercase; opacity:.55; margin-bottom:5px;
}
#rp-lock-widget .rp-lw-stage {
  font-size:16px; font-weight:600; margin-bottom:4px; letter-spacing:-.3px;
}
#rp-lock-widget .rp-lw-status {
  font-size:11px; opacity:.7;
}
/* Star theme lock widget */
#rp-phone.rp-theme-star #rp-lock-widget {
  background:rgba(60,30,120,.35);
  border-color:rgba(160,120,255,.35);
  color:#e8e0ff;
  box-shadow:0 4px 20px rgba(80,40,180,.3);
}
/* Misty theme lock widget */
#rp-phone.rp-theme-misty #rp-lock-widget {
  background:rgba(255,255,255,.3);
  border-color:rgba(140,180,220,.4);
  color:#0a2040;
}
/* Candy theme lock widget */
#rp-phone.rp-theme-candy #rp-lock-widget {
  background:rgba(255,220,235,.35);
  border-color:rgba(220,130,165,.35);
  color:#5a1028;
}

/* ══ STAR THEME: Settings & API dark styling ══ */
#rp-phone.rp-theme-star #rp-view-settings { background: transparent !important; }
#rp-phone.rp-theme-star #rp-view-api-settings { background: transparent !important; }
/* Section title labels */
#rp-phone.rp-theme-star .rp-grp-pick-item{border-bottom-color:rgba(130,90,255,.12)!important}#rp-phone.rp-theme-star .rp-grp-pick-item.selected{background:rgba(130,90,255,.12)!important}#rp-phone.rp-theme-star .rp-grp-pick-name{color:#d4c8ff!important}#rp-phone.rp-theme-star .rp-grp-pick-chk{border-color:rgba(160,120,255,.4)!important}#rp-phone.rp-theme-star .rp-grp-modal{background:rgba(16,8,42,.95)!important;border:1px solid rgba(130,90,255,.2)!important}#rp-phone.rp-theme-star .rp-grp-modal-hd{color:#d4c8ff!important;border-bottom-color:rgba(130,90,255,.15)!important}#rp-phone.rp-theme-star .rp-grp-name-inp{background:rgba(30,16,70,.8)!important;border-color:rgba(130,90,255,.35)!important;color:#d4c8ff!important}#rp-phone.rp-theme-star .rp-grp-name-inp::placeholder{color:rgba(180,165,255,.4)!important}#rp-phone.rp-theme-star .rp-grp-modal-ft{border-top-color:rgba(130,90,255,.15)!important}#rp-phone.rp-theme-star .rp-grp-ft-cancel{color:rgba(180,165,255,.45)!important;border-right-color:rgba(130,90,255,.15)!important}#rp-phone.rp-theme-star .rp-grp-ft-ok{color:#a78bfa!important}
#rp-phone.rp-theme-star .rp-set-section-title {
  color: rgba(180,160,255,.7) !important;
  font-weight: 600 !important;
}
/* Section white box → dark glass */
#rp-phone.rp-theme-star .rp-set-section {
  background: rgba(20,12,50,.82) !important;
  border-radius: 16px !important;
  border: 1px solid rgba(130,90,255,.2) !important;
  overflow: hidden !important;
}
/* Each row inside section */
#rp-phone.rp-theme-star .rp-set-row {
  background: transparent !important;
  border-bottom-color: rgba(130,90,255,.12) !important;
}
/* Row label text */
#rp-phone.rp-theme-star .rp-set-key {
  color: #d4c8ff !important;
}
#rp-phone.rp-theme-star .rp-set-hint { color: rgba(180,165,255,.55) !important; }
/* Dropdown select */
#rp-phone.rp-theme-star .rp-set-select {
  background: rgba(35,20,70,.8) !important;
  border: 1px solid rgba(130,90,255,.4) !important;
  color: #d4c8ff !important;
  border-radius: 10px !important;
}
/* Upload / action buttons */
#rp-phone.rp-theme-star .rp-avatar-upload-btn,
#rp-phone.rp-theme-star .rp-set-upload-btn {
  background: rgba(60,30,120,.65) !important;
  border: 1px solid rgba(130,90,255,.45) !important;
  color: #d4c8ff !important;
  border-radius: 12px !important;
  font-size: 13.5px !important;
}
#rp-phone.rp-theme-misty .rp-avatar-upload-btn,
#rp-phone.rp-theme-misty #rp-wall-upload,
#rp-phone.rp-theme-misty #rp-wall-reset {
  background: rgba(210,228,245,.38) !important;
  border: 1px solid rgba(130,175,215,.28) !important;
  color: #1a3050 !important;
  border-radius: 12px !important;
}
/* "恢复默认" button override */
#rp-phone.rp-theme-star #rp-wall-reset {
  background: rgba(30,18,60,.5) !important;
  color: rgba(180,165,255,.7) !important;
}
/* Inline style overrides */
#rp-phone.rp-theme-star #rp-view-settings [style*="color:#8a8a9a"] {
  color: rgba(160,145,255,.55) !important;
}
#rp-phone.rp-theme-star #rp-view-settings input,
#rp-phone.rp-theme-star #rp-view-api-settings input[type="text"],
#rp-phone.rp-theme-star #rp-view-api-settings input[type="url"],
#rp-phone.rp-theme-star #rp-view-api-settings input[type="password"] {
  background: rgba(20,12,50,.8) !important;
  border: 1px solid rgba(130,90,255,.4) !important;
  color: #e0d4ff !important;
  border-radius: 10px !important;
}
#rp-phone.rp-theme-star #rp-view-settings input::placeholder,
#rp-phone.rp-theme-star #rp-view-api-settings input::placeholder {
  color: rgba(160,140,220,.5) !important;
}
/* Star: API section card */
#rp-phone.rp-theme-star #rp-view-api-settings [style*="background:rgba(168,85,247,.06)"] {
  background: rgba(80,40,160,.25) !important;
  border: 1px solid rgba(140,90,255,.2) !important;
  color: rgba(200,180,255,.85) !important;
  border-radius: 14px !important;
}
/* Star: API preset buttons */
#rp-phone.rp-theme-star .rp-api-preset-btn {
  background: rgba(80,40,160,.4) !important;
  border: 1px solid rgba(140,90,255,.4) !important;
  color: #c4b0ff !important;
  border-radius: 10px !important;
}
#rp-phone.rp-theme-star .rp-api-preset-btn:hover {
  background: rgba(100,50,200,.5) !important;
}
/* Star: save button */
#rp-phone.rp-theme-star #rp-api-save-v {
  background: linear-gradient(135deg, #6d28d9, #8b5cf6) !important;
  border: none !important;
  color: #fff !important;
  box-shadow: 0 4px 16px rgba(100,50,220,.4) !important;
}
/* Star: radio labels */
#rp-phone.rp-theme-star .rp-api-opt {
  color: #d4c8ff !important;
}
/* Star: API title */
#rp-phone.rp-theme-star [style*="color:#2d1060"] {
  color: #b09ef0 !important;
}
#rp-phone.rp-theme-star [style*="color:#9070b0"] {
  color: rgba(180,160,255,.75) !important;
}
/* Star: settings upload buttons */
#rp-phone.rp-theme-star .rp-btn-outline {
  background: rgba(60,30,120,.4) !important;
  border: 1px solid rgba(140,90,255,.4) !important;
  color: #c4b0ff !important;
}
/* Misty: settings/api theming */
#rp-phone.rp-theme-misty .rp-grp-pick-item{border-bottom-color:rgba(80,150,200,.1)!important}#rp-phone.rp-theme-misty .rp-grp-pick-item.selected{background:rgba(14,165,233,.08)!important}#rp-phone.rp-theme-misty .rp-grp-pick-name{color:#1a3050!important}#rp-phone.rp-theme-misty .rp-grp-pick-chk{border-color:rgba(80,150,210,.4)!important}#rp-phone.rp-theme-misty .rp-grp-modal{background:#f0f8ff!important;border:1px solid rgba(80,150,210,.15)!important}#rp-phone.rp-theme-misty .rp-grp-modal-hd{color:#1a3050!important;border-bottom-color:rgba(80,150,210,.12)!important}#rp-phone.rp-theme-misty .rp-grp-name-inp{background:#e8f4fb!important;border-color:rgba(80,150,210,.25)!important;color:#1a3050!important}#rp-phone.rp-theme-misty .rp-grp-ft-ok{color:#0ea5e9!important}
#rp-phone.rp-theme-misty #rp-view-settings { background: transparent !important; }
#rp-phone.rp-theme-misty #rp-view-api-settings { background: transparent !important; }
#rp-phone.rp-theme-misty #rp-view-settings > div,
#rp-phone.rp-theme-misty #rp-view-api-settings > div {
  background: rgba(220,238,255,.18) !important;
  border-radius: 16px !important;
}

/* ══ CANDY HOME: Full Beauty Pass ══ */
/* Status bar: rose pink */
#rp-phone.rp-theme-candy #rp-sbar {
  color: #b02850 !important;
  text-shadow: 0 0 10px rgba(255,255,255,.85) !important;
}
/* Home date line */
#rp-home-date { display:none; }
#rp-phone.rp-theme-candy #rp-home-date {
  color: #b02850 !important;
  opacity: 1 !important;
  font-size: 12.5px !important;
  font-weight: 500 !important;
  background: rgba(255,255,255,.20) !important;
  border-radius: 20px !important;
  padding: 3px 14px !important;
  text-shadow: none !important;
}
#rp-phone.rp-theme-star #rp-home-date {
  color: #b09ef0 !important; opacity: .6 !important;
}
#rp-phone.rp-theme-misty #rp-home-date {
  color: rgba(220,240,255,.85) !important; opacity: 1 !important; text-shadow: 0 1px 4px rgba(0,20,70,.5) !important;
}
/* Candy home indicator: rose */
#rp-phone.rp-theme-candy .rp-home-indicator {
  background: rgba(212,96,122,.45) !important;
  width: 100px !important;
}
/* Candy app grid: more generous spacing */
#rp-phone.rp-theme-candy #rp-app-grid {
  gap: 20px !important;
  padding: 0 22px !important;
}
/* Candy app label: refined typography */
#rp-phone.rp-theme-candy .rp-app-lbl {
  color: #c04870 !important;
  font-size: 10.5px !important;
  font-weight: 600 !important;
  letter-spacing: .2px !important;
  text-shadow: 0 1px 5px rgba(255,255,255,.85) !important;
}
/* Candy status bar battery color */
#rp-phone.rp-theme-candy .rp-bat-body,
#rp-phone.rp-theme-candy .rp-bat-fill { border-color: #d4607a !important; }
#rp-phone.rp-theme-candy .rp-bat-fill { background: #d4607a !important; }
/* Candy lock screen: rose clock/date */
#rp-phone.rp-theme-candy #rp-lock-time {
  color: #c03060 !important;
  text-shadow:
    0 0 28px rgba(255,255,255,.9),
    0 0 10px rgba(255,255,255,.6) !important;
}
#rp-phone.rp-theme-candy #rp-lock-date { display:none !important; }
#rp-phone.rp-theme-candy #rp-swipe-hint {
  color: rgba(212,96,122,.55) !important;
}
/* Candy: home bottom vignette for depth */
#rp-phone.rp-theme-candy .rp-home-bg::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 90px;
  background: linear-gradient(transparent, rgba(255,230,238,.22));
  pointer-events: none;
  border-radius: 0 0 38px 38px;
}
/* Candy icon: gentle float animation on first load */
@keyframes rp-candy-ico-in {
  from { opacity:0; transform:translateY(8px) scale(.92); }
  to   { opacity:1; transform:translateY(0) scale(1); }
}
#rp-phone.rp-theme-candy #rp-app-grid .rp-app {
  animation: rp-candy-ico-in .4s ease both;
}
#rp-phone.rp-theme-candy #rp-app-grid .rp-app:nth-child(1){animation-delay:.05s}
#rp-phone.rp-theme-candy #rp-app-grid .rp-app:nth-child(2){animation-delay:.10s}
#rp-phone.rp-theme-candy #rp-app-grid .rp-app:nth-child(3){animation-delay:.15s}
#rp-phone.rp-theme-candy #rp-app-grid .rp-app:nth-child(4){animation-delay:.20s}
#rp-phone.rp-theme-candy #rp-app-grid .rp-app:nth-child(5){animation-delay:.25s}
#rp-phone.rp-theme-candy #rp-app-grid .rp-app:nth-child(6){animation-delay:.30s}

/* ══ WALLPAPER BLEED-THROUGH: Inner content glass cards ══ */

/* Thread rows */
.rp-thread {
  background: rgba(255,255,255,.28) !important;
  border-bottom-color: rgba(0,0,0,.07) !important;
}
.rp-thread:hover { background: rgba(255,255,255,.42) !important; }

/* Star theme threads */
#rp-phone.rp-theme-star .rp-thread { background: rgba(14,8,38,.40) !important; border-bottom-color: rgba(130,90,255,.15) !important; }
#rp-phone.rp-theme-star .rp-thread:hover { background: rgba(14,8,38,.58) !important; }
/* Misty theme threads */
#rp-phone.rp-theme-misty .rp-thread { background: rgba(240,248,255,.38) !important; border-bottom-color: rgba(130,175,215,.18) !important; }

/* Moments posts */
.rp-moment {
  background: transparent !important;
  border-bottom: 1px solid rgba(0,0,0,.07) !important;
  border-radius: 0 !important;
  margin: 0 !important;
  border-left: none !important; border-right: none !important; border-top: none !important;
}
#rp-phone.rp-theme-star .rp-moment { background: transparent !important; border-bottom-color: rgba(130,90,255,.1) !important; }
#rp-phone.rp-theme-misty .rp-moment { background: transparent !important; border-bottom-color: rgba(130,175,215,.12) !important; }

/* Chat bubbles area stays transparent; sent/recv bubbles keep their own bg */
#rp-bubbles { background: transparent !important; }

/* Settings sections: transparent */
#rp-view-settings > div,
#rp-view-settings > section {
  background: transparent !important;
  border-radius: 0 !important;
  margin: 0 !important;
  border: none !important;
}

/* API settings content area */
#rp-view-api-settings > div:not(.rp-nav-bar) {
  background: rgba(255,255,255,.0) !important;
}
/* API inner info card */
#rp-view-api-settings [style*="background:rgba(168,85,247,.06)"],
#rp-phone.rp-theme-candy #rp-view-api-settings [style*="background:rgba"] {
  background: rgba(255,255,255,.45) !important;
  border: 1px solid rgba(200,150,220,.25) !important;
  border-radius: 14px !important;
}
/* API preset buttons: glass */
.rp-api-preset-btn {
  background: rgba(255,255,255,.5) !important;
  border: 1.5px solid rgba(180,130,220,.3) !important;
  color: #6a2090 !important;
  border-radius: 12px !important;
}
#rp-phone.rp-theme-star .rp-api-preset-btn { background: rgba(40,20,90,.5) !important; border-color: rgba(130,90,255,.4) !important; color: #c4b0ff !important; }

/* Game canvas glass */
#rp-ludo-canvas { background: rgba(255,255,255,.45) !important; }
#rp-phone.rp-theme-star #rp-ludo-canvas { background: rgba(14,8,38,.55) !important; }
#rp-phone.rp-theme-star #rp-game-controls { background: rgba(14,8,38,.65) !important; border-top-color: rgba(130,90,255,.2) !important; }

/* Theme picker cards */
/* theme card uses --rp-tc-bg per theme */
.rp-theme-card { background: var(--rp-tc-bg) !important; }
#rp-phone.rp-theme-candy .rp-theme-card { background: rgba(255,255,255,.72) !important; }
#rp-phone.rp-theme-star .rp-theme-card { background: rgba(20,14,55,.88) !important; border: 1px solid rgba(130,90,255,.3) !important; }
#rp-phone.rp-theme-misty .rp-theme-card { background: rgba(240,248,255,.75) !important; border: 1px solid rgba(130,175,215,.25) !important; }

/* Nav bars: transparent to show wallpaper */
.rp-nav-bar { background: transparent !important; border-bottom-color: rgba(255,255,255,.15) !important; }
#rp-phone.rp-theme-star .rp-nav-bar { border-bottom-color: rgba(130,90,255,.15) !important; }
#rp-phone.rp-theme-misty .rp-nav-bar { border-bottom-color: rgba(130,175,215,.2) !important; }

/* ══ API 设置页可读性修复 ══ */
/* 说明卡片: 更不透明的白底 + 深色文字 */
#rp-view-api-settings [style*="background:rgba(168,85,247"] {
  background: rgba(255,255,255,.80) !important;
  border: 1px solid rgba(200,150,220,.3) !important;
  color: #3a1060 !important;
  border-radius: 14px !important;
}
/* DeepSeek 建议行 */
#rp-api-blink { color: #9b30d0 !important; }
/* 标题 ⚡ 自定义API设置 */
#rp-view-api-settings [style*="color:#2d1060"],
#rp-phone.rp-theme-candy #rp-view-api-settings [style*="color:#2d1060"] {
  color: #5a1090 !important;
  text-shadow: 0 0 12px rgba(255,255,255,.8);
}
/* 说明文字颜色 */
#rp-view-api-settings [style*="color:#9070b0"] {
  color: #5a3080 !important;
}
/* Radio labels */
#rp-view-api-settings .rp-api-opt {
  color: #3a1060 !important;
  font-weight: 500 !important;
  text-shadow: 0 0 8px rgba(255,255,255,.7);
}
/* 预设按钮 */
#rp-phone.rp-theme-candy .rp-api-preset-btn {
  background: rgba(255,255,255,.82) !important;
  border: 1.5px solid rgba(180,120,220,.4) !important;
  color: #5a1090 !important;
  font-weight: 600 !important;
  border-radius: 12px !important;
}
/* 输入框 */
#rp-phone.rp-theme-candy #rp-view-api-settings input[type="text"],
#rp-phone.rp-theme-candy #rp-view-api-settings input[type="url"],
#rp-phone.rp-theme-candy #rp-view-api-settings input[type="password"],
#rp-phone.rp-theme-candy #rp-view-api-settings input {
  background: rgba(255,255,255,.85) !important;
  border: 1.5px solid rgba(180,120,220,.4) !important;
  color: #3a1060 !important;
  border-radius: 12px !important;
}
/* 模型列表下拉 */
#rp-model-list {
  background: rgba(255,255,255,.88) !important;
  border: 1.5px solid rgba(180,120,220,.35) !important;
  color: #3a1060 !important;
  border-radius: 12px !important;
}
/* 保存按钮 */
#rp-phone.rp-theme-candy #rp-api-save-v {
  background: linear-gradient(135deg, #c03060, #e06080) !important;
  color: #fff !important;
  font-weight: 700 !important;
  border: none !important;
  box-shadow: 0 4px 16px rgba(192,48,96,.35) !important;
  border-radius: 14px !important;
}
/* 获取模型按钮 */
#rp-phone.rp-theme-candy #rp-fetch-models-btn {
  background: rgba(255,255,255,.75) !important;
  border: 1.5px solid rgba(180,120,220,.4) !important;
  color: #5a1090 !important;
  border-radius: 10px !important;
}

/* ════════════════════════════════════════════════════
   ✨ STAR THEME - Complete inner-page polish
   ════════════════════════════════════════════════════ */

/* Clock: lavender glow on dark wallpaper */
#rp-phone.rp-theme-star #rp-home-clock {
  color: #d4ccff !important;
  font-weight: 100 !important;
  font-size: 58px !important;
  letter-spacing: -3px !important;
  text-shadow:
    0 0 30px rgba(160,130,255,.5),
    0 0 10px rgba(200,180,255,.3) !important;
}
/* Status bar */
#rp-phone.rp-theme-star #rp-sbar {
  color: #c8c0f5 !important;
}
/* Lock screen time */
#rp-phone.rp-theme-star #rp-lock-time {
  color: #e8e0ff !important;
  text-shadow: 0 2px 20px rgba(140,100,255,.35) !important;
}
/* Home indicator */
#rp-phone.rp-theme-star .rp-home-indicator {
  background: rgba(160,130,255,.4) !important;
}
/* Thread name/preview text already via CSS vars */
/* Moment text */
#rp-phone.rp-theme-star .rp-moment-name { color: #b09ef0 !important; }
#rp-phone.rp-theme-star .rp-moment-time { color: rgba(180,165,255,.55) !important; }
#rp-phone.rp-theme-star .rp-moment-body { color: #d4ccff !important; }
#rp-phone.rp-theme-star .rp-moment-actions span { color: rgba(160,140,255,.6) !important; }
/* Thread list: name / time */
#rp-phone.rp-theme-star .rp-tn { color: #e0d8ff !important; }
#rp-phone.rp-theme-star .rp-tp { color: rgba(180,165,255,.55) !important; }
#rp-phone.rp-theme-star .rp-tt { color: rgba(180,165,255,.45) !important; }
/* Settings rows text */
#rp-phone.rp-theme-star #rp-view-settings * { color: #d8d0ff !important; }
/* Avatar border */
#rp-phone.rp-theme-star .rp-av {
  border-radius: 10px !important;
  box-shadow: 0 0 8px rgba(120,80,255,.3) !important;
}
/* Game nav & controls */
#rp-phone.rp-theme-star #rp-view-game .rp-nav-bar {
  background: transparent !important;
  border-bottom: 1px solid rgba(130,90,255,.15) !important;
}
#rp-phone.rp-theme-star #rp-game-controls {
  background: rgba(14,8,38,.72) !important;
  border-top-color: rgba(130,90,255,.2) !important;
}
/* Nav back/title for star */
#rp-phone.rp-theme-star .rp-nav-title {
  color: #e0d8ff !important;
  text-shadow: 0 0 12px rgba(160,130,255,.4) !important;
}
#rp-phone.rp-theme-star .rp-back,
#rp-phone.rp-theme-star .rp-nav-add { color: #a78bfa !important; }

/* ════════════════════════════════════════════════════
   🌿 MISTY THEME - Complete inner-page polish
   ════════════════════════════════════════════════════ */

/* Clock: white for contrast on blue wallpaper */
#rp-phone.rp-theme-misty #rp-home-clock {
  color: rgba(220,238,252,.92) !important;
  font-weight: 100 !important;
  font-size: 58px !important;
  letter-spacing: -3px !important;
  text-shadow: 0 1px 6px rgba(0,20,60,.45), 0 2px 16px rgba(0,10,40,.25) !important;
}
/* Status bar */
#rp-phone.rp-theme-misty #rp-sbar {
  color: #1a3050 !important;
  text-shadow: 0 0 8px rgba(255,255,255,.75) !important;
}
/* Lock screen time */
#rp-phone.rp-theme-misty #rp-lock-time {
  color: #1a2e44 !important;
  text-shadow:
    0 0 20px rgba(255,255,255,.9),
    0 0 6px rgba(255,255,255,.6) !important;
}
/* Home indicator */
#rp-phone.rp-theme-misty .rp-home-indicator {
  background: rgba(61,110,154,.4) !important;
}
/* Moments text */
#rp-phone.rp-theme-misty .rp-moment-name { color: #2d6d9a !important; }
#rp-phone.rp-theme-misty .rp-moment-time { color: rgba(44,74,106,.55) !important; }
#rp-phone.rp-theme-misty .rp-moment-body { color: #1a3050 !important; }
#rp-phone.rp-theme-misty .rp-moment-actions span { color: rgba(61,110,154,.7) !important; }
/* Thread text */
#rp-phone.rp-theme-misty .rp-tn { color: #1a2e44 !important; }
#rp-phone.rp-theme-misty .rp-tp { color: rgba(44,74,106,.6) !important; }
#rp-phone.rp-theme-misty .rp-tt { color: rgba(61,110,154,.5) !important; }
/* Settings text */
#rp-phone.rp-theme-misty #rp-view-settings * { color: #1a3050 !important; }
/* Avatar */
#rp-phone.rp-theme-misty .rp-av {
  border-radius: 20px !important;
  box-shadow: 0 3px 12px rgba(100,145,195,.2) !important;
}
/* Nav title */
#rp-phone.rp-theme-misty .rp-nav-title {
  color: rgba(220,238,252,.92) !important;
  text-shadow: 0 1px 3px rgba(0,20,60,.5), 0 0 8px rgba(0,10,40,.3) !important;
}
#rp-phone.rp-theme-misty .rp-back,
#rp-phone.rp-theme-misty .rp-nav-add { color: rgba(220,238,252,.90) !important; text-shadow: 0 1px 3px rgba(0,20,60,.45) !important; }
/* Game controls */
#rp-phone.rp-theme-misty #rp-view-game .rp-nav-bar {
  background: transparent !important;
  border-bottom: 1px solid rgba(130,175,215,.2) !important;
}
#rp-phone.rp-theme-misty #rp-game-controls {
  background: rgba(240,248,255,.68) !important;
  border-top-color: rgba(130,175,215,.25) !important;
}
#rp-phone.rp-theme-misty #rp-ludo-canvas { background: rgba(240,248,255,.65) !important; }

/* ── MISTY API settings legibility ── */
/* Broad wildcard: override all inline colors in API settings view */
#rp-phone.rp-theme-misty #rp-view-api-settings * { color: #1a3050 !important; }
#rp-phone.rp-theme-misty #rp-api-blink { color: #0e5a8a !important; font-weight: 800 !important; }
#rp-phone.rp-theme-misty .rp-api-opt { color: #1a3050 !important; font-weight: 500 !important; text-shadow: 0 0 8px rgba(255,255,255,.7) !important; }
#rp-phone.rp-theme-misty .rp-api-preset-btn {
  background: rgba(240,248,255,.38) !important;
  border: 1.5px solid rgba(130,175,215,.35) !important;
  color: #1a3050 !important; font-weight: 700 !important;
  border-radius: 12px !important;
}
#rp-phone.rp-theme-misty #rp-view-api-settings input {
  background: rgba(240,248,255,.40) !important;
  border: 1px solid rgba(130,175,215,.3) !important;
  color: #1a3050 !important; border-radius: 12px !important;
}
#rp-phone.rp-theme-misty #rp-api-save-v {
  background: linear-gradient(135deg, #2d6d9a, #4a8fbf) !important;
  color: #fff !important; font-weight: 700 !important;
  border: none !important; border-radius: 14px !important;
  box-shadow: 0 4px 16px rgba(45,109,154,.3) !important;
}
/* API connectivity test button */
#rp-api-test-v{transition:all .25s}
#rp-api-test-v.testing{opacity:.65;pointer-events:none}
#rp-api-test-v.ok{background:rgba(34,197,94,.15)!important;border-color:rgba(34,197,94,.5)!important;color:#166534!important}
#rp-api-test-v.fail{background:rgba(239,68,68,.12)!important;border-color:rgba(239,68,68,.45)!important;color:#991b1b!important}
#rp-phone.rp-theme-star #rp-api-test-v{background:rgba(60,20,120,.3)!important;border-color:rgba(150,100,255,.5)!important;color:#c8b0ff!important}
#rp-phone.rp-theme-star #rp-api-test-v.ok{background:rgba(22,101,52,.3)!important;color:#86efac!important}
#rp-phone.rp-theme-star #rp-api-test-v.fail{background:rgba(127,29,29,.3)!important;color:#fca5a5!important}
#rp-phone.rp-theme-misty #rp-api-test-v{background:rgba(220,240,255,.22)!important;border-color:rgba(80,160,220,.45)!important;color:#0a4a7a!important}
#rp-phone.rp-theme-misty #rp-api-test-v.ok{background:rgba(220,252,231,.5)!important;color:#065f46!important}
#rp-phone.rp-theme-misty #rp-api-test-v.fail{background:rgba(254,226,226,.4)!important;color:#7f1d1d!important}

#rp-phone.rp-theme-misty #rp-fetch-models-btn {
  background: rgba(240,248,255,.38) !important;
  border: 1px solid rgba(130,175,215,.3) !important;
  color: #2d6d9a !important; border-radius: 10px !important;
}
#rp-phone.rp-theme-misty #rp-model-list {
  background: rgba(240,248,255,.45) !important;
  border: 1px solid rgba(130,175,215,.28) !important;
  color: #1a3050 !important; border-radius: 12px !important;
}

/* ════ ✨ STAR: Settings white boxes → dark glass ════ */
/* All inputs in settings */
#rp-phone.rp-theme-star #rp-view-settings input,
#rp-phone.rp-theme-star #rp-view-settings textarea,
#rp-phone.rp-theme-star #rp-view-settings select {
  background: rgba(30,18,60,.75) !important;
  border: 1px solid rgba(130,90,255,.35) !important;
  color: #e0d8ff !important;
  border-radius: 10px !important;
}
#rp-phone.rp-theme-star #rp-view-settings input::placeholder { color: rgba(180,165,255,.4) !important; }
/* All buttons in settings */
#rp-phone.rp-theme-star #rp-view-settings button,
#rp-phone.rp-theme-star #rp-view-settings .rp-btn-outline,
#rp-phone.rp-theme-star #rp-view-settings [class*="btn"] {
  background: rgba(60,30,120,.55) !important;
  border: 1px solid rgba(130,90,255,.45) !important;
  color: #d4c8ff !important;
  border-radius: 12px !important;
  box-shadow: 0 2px 8px rgba(80,40,180,.25) !important;
}
/* Section label headers */
#rp-phone.rp-theme-star #rp-view-settings label,
#rp-phone.rp-theme-star #rp-view-settings span:not(.rp-nav-title),
#rp-phone.rp-theme-star #rp-view-settings p {
  color: #d4c8ff !important;
}
/* Inner white card containers inside sections */
#rp-phone.rp-theme-star #rp-view-settings > div > div,
#rp-phone.rp-theme-star #rp-view-settings > div > table {
  background: rgba(25,14,55,.65) !important;
  border-radius: 10px !important;
  border-color: rgba(130,90,255,.2) !important;
}

/* ════ ✨ STAR: Ludo game full dark treatment ════ */
/* Canvas: purple-dark tint via filter */
#rp-phone.rp-theme-star #rp-ludo-canvas {
  filter: hue-rotate(200deg) saturate(0.85) brightness(0.82) !important;
  border-radius: 14px !important;
  box-shadow: 0 0 24px rgba(100,50,220,.35), 0 4px 20px rgba(0,0,0,.5) !important;
}
/* Game status text (你 vs SillyTavern) */
#rp-phone.rp-theme-star .rp-game-status { color: rgba(200,180,255,.88) !important; }
#rp-phone.rp-theme-star .rp-game-players { color: rgba(200,185,255,.9) !important; }
#rp-phone.rp-theme-star .rp-game-info { color: rgba(200,185,255,.9) !important; }
/* Dice face emoji */
#rp-phone.rp-theme-star #rp-dice-face {
  filter: drop-shadow(0 0 4px rgba(160,130,255,.5));
}
/* Dice button */
#rp-phone.rp-theme-star #rp-dice-btn {
  background: linear-gradient(145deg, #5b21b6, #7c3aed) !important;
  box-shadow: 0 0 16px rgba(120,60,255,.5), 0 4px 12px rgba(0,0,0,.4) !important;
}
/* Game chat area */
#rp-phone.rp-theme-star #rp-game-chat {
  background: rgba(14,8,38,.72) !important;
  border-top-color: rgba(130,90,255,.18) !important;
}
#rp-phone.rp-theme-star #rp-game-chat:hover {
  background: rgba(20,12,50,.85) !important;
}
/* Game chat text */
#rp-phone.rp-theme-star #rp-game-chat * {
  color: rgba(210,195,255,.85) !important;
}
/* Chat hint 点击展开 */
#rp-phone.rp-theme-star #rp-game-chat-hint {
  color: rgba(160,140,255,.5) !important;
}
/* Game composer (输入框底部) */
#rp-phone.rp-theme-star #rp-game-controls .rp-roll-info,
#rp-phone.rp-theme-star #rp-game-controls span,
#rp-phone.rp-theme-star #rp-game-controls div {
  color: rgba(210,195,255,.85) !important;
}
/* Full-screen game chat */
#rp-phone.rp-theme-star #rp-game-chat-fs {
  background: rgba(10,6,28,.96) !important;
}
#rp-phone.rp-theme-star #rp-game-chat-fs-title { color: #d4c8ff !important; }
#rp-phone.rp-theme-star #rp-game-chat-fs #rp-input {
  background: rgba(30,18,60,.8) !important;
  color: #e0d8ff !important;
  border-color: rgba(130,90,255,.4) !important;
}
#rp-phone.rp-theme-star #rp-game-chat-fs #rp-input::placeholder { color: rgba(180,165,255,.4) !important; }

/* ── 🌿 MISTY: Ludo game text legibility ── */
#rp-phone.rp-theme-misty .rp-game-status { color: #1a3050 !important; font-weight: 600 !important; text-shadow: 0 0 8px rgba(255,255,255,.8) !important; }
#rp-phone.rp-theme-misty .rp-game-players { color: #1a2e44 !important; font-weight: 600 !important; text-shadow: 0 0 8px rgba(255,255,255,.8) !important; }
#rp-phone.rp-theme-misty .rp-game-info { color: #1a2e44 !important; }
#rp-phone.rp-theme-misty #rp-game-controls span,
#rp-phone.rp-theme-misty #rp-game-controls div { color: #1a2e44 !important; }
/* Dice button: steel blue */
#rp-phone.rp-theme-misty #rp-dice-btn {
  background: linear-gradient(145deg, #2d6d9a, #4a8fbf) !important;
  box-shadow: 0 4px 16px rgba(45,109,154,.35), 0 1px 3px rgba(0,0,0,.15) !important;
}
/* Game chat area */
#rp-phone.rp-theme-misty #rp-game-chat {
  background: rgba(240,248,255,.55) !important;
  border-top-color: rgba(130,175,215,.2) !important;
}
#rp-phone.rp-theme-misty #rp-game-chat * { color: #1a3050 !important; }
#rp-phone.rp-theme-misty #rp-game-chat-hint { color: rgba(45,109,154,.6) !important; }
/* Nav title in game */
#rp-phone.rp-theme-misty #rp-view-game .rp-nav-title {
  color: #1a2e44 !important;
  text-shadow: 0 0 10px rgba(255,255,255,.75) !important;
}
/* Fullscreen chat */
#rp-phone.rp-theme-misty #rp-game-chat-fs {
  background: rgba(240,248,255,.96) !important;
}
#rp-phone.rp-theme-misty #rp-game-chat-fs-title { color: #1a2e44 !important; }
#rp-phone.rp-theme-misty #rp-game-chat-fs #rp-input {
  background: rgba(255,255,255,.88) !important;
  border-color: rgba(130,175,215,.45) !important;
  color: #1a2e44 !important;
}
/* Roll info / task button */
#rp-phone.rp-theme-misty #rp-task-done-btn {
  background: linear-gradient(135deg, #2d6d9a, #4a8fbf) !important;
  color: #fff !important; border: none !important;
}

/* ══ NUCLEAR: ALL views always transparent ══ */
#rp-view-messages,#rp-view-thread,#rp-bubbles,#rp-view-moments,#rp-view-settings,#rp-view-api-settings,#rp-view-game,#rp-view-themes {
  background: transparent !important;
}

/* ═══════════════════════════════════════════════════════════
   🌸 CANDY: Complete per-page polish (all missing rules)
   ═══════════════════════════════════════════════════════════ */
/* Nav bar title + back */
#rp-phone.rp-theme-candy .rp-nav-title {
  color: #5a1030 !important;
  font-weight: 700 !important;
  text-shadow: 0 0 14px rgba(255,255,255,.9), 0 1px 3px rgba(255,255,255,.7) !important;
}
#rp-phone.rp-theme-candy .rp-back,
#rp-phone.rp-theme-candy .rp-nav-add {
  color: #c03060 !important;
  text-shadow: 0 0 8px rgba(255,255,255,.7) !important;
}
/* Settings sections: light rose glass */
#rp-phone.rp-theme-candy .rp-set-section {
  background: rgba(255,255,255,.28) !important;
  border-radius: 14px !important;
  border: 1px solid rgba(220,130,165,.15) !important;
  overflow: hidden !important;
}
#rp-phone.rp-theme-candy .rp-set-section-title {
  color: #9a2050 !important;
  font-weight: 600 !important;
  text-shadow: 0 0 8px rgba(255,255,255,.7) !important;
}
#rp-phone.rp-theme-candy .rp-set-row {
  background: transparent !important;
  border-bottom-color: rgba(220,130,165,.10) !important;
}
#rp-phone.rp-theme-candy .rp-set-key {
  color: #6a1040 !important;
  text-shadow: 0 0 6px rgba(255,255,255,.6) !important;
}
#rp-phone.rp-theme-candy .rp-set-select {
  background: rgba(255,220,235,.35) !important;
  border: 1px solid rgba(220,130,165,.25) !important;
  color: #5a1030 !important; border-radius: 10px !important;
}
#rp-phone.rp-theme-candy .rp-avatar-upload-btn,
#rp-phone.rp-theme-candy .rp-set-upload-btn {
  background: rgba(255,210,228,.38) !important;
  border: 1px solid rgba(220,130,165,.28) !important;
  color: #7a1038 !important; border-radius: 12px !important;
}
/* Moments: rose glass */
#rp-phone.rp-theme-candy .rp-moment {
  background: rgba(255,255,255,.32) !important;
  border-bottom: 1px solid rgba(220,130,165,.12) !important;
  padding: 10px 14px !important;
}
#rp-phone.rp-theme-candy .rp-moment-name { color: #c03060 !important; font-weight: 600 !important; }
#rp-phone.rp-theme-candy .rp-moment-time { color: rgba(140,60,90,.55) !important; }
#rp-phone.rp-theme-candy .rp-moment-body { color: #4a1028 !important; }
#rp-phone.rp-theme-candy .rp-moment-text { color: #4a1028 !important; }
#rp-phone.rp-theme-candy .rp-moment-comment { color: #5a1530 !important; }
#rp-phone.rp-theme-candy .rp-moment-cname { color: #c03060 !important; }
#rp-phone.rp-theme-candy .rp-moment-reply-btn { color: rgba(180,40,80,.65) !important; }
/* candy is default theme - no rp-theme-candy class ever added; base rule handles it */
#rp-phone.rp-theme-candy .rp-moment-comments-wrap { background: rgba(220,80,120,.06) !important; }
#rp-phone.rp-theme-candy .rp-moment-act { color: rgba(160,50,80,.5) !important; }
#rp-phone.rp-theme-candy .rp-moment-bar { border-top-color: rgba(200,80,120,.15) !important; }
/* Game text */
#rp-phone.rp-theme-candy .rp-game-status {
  color: #8a1840 !important; font-weight: 600 !important;
  text-shadow: 0 0 8px rgba(255,255,255,.7) !important;
}
#rp-phone.rp-theme-candy .rp-game-players {
  color: #6a1030 !important; font-weight: 600 !important;
  text-shadow: 0 0 8px rgba(255,255,255,.7) !important;
}
#rp-phone.rp-theme-candy #rp-game-chat {
  background: rgba(255,240,248,.55) !important;
  border-top-color: rgba(220,130,165,.15) !important;
}
#rp-phone.rp-theme-candy #rp-game-chat * { color: #5a1028 !important; }
#rp-phone.rp-theme-candy #rp-game-chat-hint { color: rgba(180,60,90,.55) !important; }
/* Thread list names */
#rp-phone.rp-theme-candy .rp-tn { color: #3a0a1e !important; font-weight: 600 !important; }
#rp-phone.rp-theme-candy .rp-tp { color: rgba(80,20,40,.6) !important; }
#rp-phone.rp-theme-candy .rp-tt { color: rgba(140,60,90,.5) !important; }

/* ═══════════════════════════════════════════════════════════
   🌿 MISTY: Missing settings sections + nav polish
   ═══════════════════════════════════════════════════════════ */
/* Settings sections: blue-white glass */
#rp-phone.rp-theme-misty .rp-set-section {
  background: rgba(240,248,255,.28) !important;
  border-radius: 14px !important;
  border: 1px solid rgba(130,175,215,.15) !important;
  overflow: hidden !important;
}
#rp-phone.rp-theme-misty .rp-set-section-title {
  color: rgba(44,74,106,.75) !important;
  font-weight: 600 !important;
  text-shadow: 0 0 8px rgba(255,255,255,.8) !important;
}
#rp-phone.rp-theme-misty .rp-set-row {
  background: transparent !important;
  border-bottom-color: rgba(130,175,215,.15) !important;
}
#rp-phone.rp-theme-misty .rp-set-hint { color: rgba(44,90,140,.55) !important; }
#rp-phone.rp-theme-misty .rp-set-key {
  color: #1a3050 !important;
  text-shadow: 0 0 6px rgba(255,255,255,.6) !important;
}
/* Moments: blue-white glass */
#rp-phone.rp-theme-misty .rp-moment {
  background: rgba(240,248,255,.58) !important;
  border-bottom: 1px solid rgba(130,175,215,.18) !important;
  padding: 10px 14px !important;
}
#rp-phone.rp-theme-misty .rp-moment-name { color: #2d6d9a !important; font-weight: 600 !important; }
#rp-phone.rp-theme-misty .rp-moment-time { color: rgba(44,74,106,.5) !important; }
#rp-phone.rp-theme-misty .rp-moment-body { color: #0e1f30 !important; font-weight: 400 !important; }
#rp-phone.rp-theme-misty .rp-moment-text { color: #0e1f30 !important; }
#rp-phone.rp-theme-misty .rp-moment-comment { color: #0f2035 !important; font-weight: 500 !important; }
#rp-phone.rp-theme-misty .rp-moment-cname { color: #2d6d9a !important; }
#rp-phone.rp-theme-misty .rp-moment-reply-btn { color: rgba(40,90,140,.65) !important; }
#rp-phone.rp-theme-misty .rp-moment-likes-row { color: rgba(24,68,112,.95) !important; background: rgba(60,120,180,.09) !important; border-radius: 6px !important; padding: 3px 8px !important; }
#rp-phone.rp-theme-misty .rp-moment-comments-wrap { background: rgba(60,120,180,.12) !important; }
#rp-phone.rp-theme-misty .rp-moment-act { color: rgba(30,75,130,.82) !important; }
#rp-phone.rp-theme-misty .rp-moment-bar { border-top-color: rgba(100,160,210,.18) !important; }
/* Thread list */
#rp-phone.rp-theme-misty .rp-tn { color: #0e1f30 !important; font-weight: 600 !important; }
#rp-phone.rp-theme-misty .rp-tp { color: rgba(30,60,90,.65) !important; }
#rp-phone.rp-theme-misty .rp-tt { color: rgba(44,74,106,.5) !important; }

/* ═══════════════════════════════════════════════════════════
   ✨ STAR: Moments glass (was transparent, needs dark tint)
   ═══════════════════════════════════════════════════════════ */
#rp-phone.rp-theme-star .rp-moment {
  background: rgba(14,8,38,.42) !important;
  border-bottom: 1px solid rgba(130,90,255,.1) !important;
  padding: 10px 14px !important;
}
#rp-phone.rp-theme-star .rp-moment-name { color: #b09ef0 !important; font-weight: 600 !important; }
#rp-phone.rp-theme-star .rp-moment-time { color: rgba(180,165,255,.5) !important; }
#rp-phone.rp-theme-star .rp-moment-body { color: #d4ccff !important; }
#rp-phone.rp-theme-star .rp-moment-text { color: #d4ccff !important; }
#rp-phone.rp-theme-star .rp-moment-comment { color: #c0b8ef !important; }
#rp-phone.rp-theme-star .rp-moment-cname { color: #a98bff !important; }
#rp-phone.rp-theme-star .rp-moment-reply-btn { color: rgba(160,140,255,.7) !important; }
#rp-phone.rp-theme-star .rp-moment-likes-row { color: rgba(200,185,255,.6) !important; }
#rp-phone.rp-theme-star .rp-moment-comments-wrap { background: rgba(80,50,180,.12) !important; }
#rp-phone.rp-theme-star .rp-moment-act { color: rgba(180,165,255,.55) !important; }
#rp-phone.rp-theme-star .rp-moment-bar { border-top-color: rgba(130,90,255,.15) !important; }
#rp-phone.rp-theme-star .rp-moment-cinput { background: rgba(255,255,255,.07) !important; border-color: rgba(130,90,255,.3) !important; color: #e8e0ff !important; }
#rp-phone.rp-theme-star .rp-moment-cinput::placeholder { color: rgba(200,185,255,.4) !important; }
#rp-phone.rp-theme-star .rp-moment-input-row { border-top-color: rgba(130,90,255,.15) !important; }
#rp-phone.rp-theme-star .rp-moment-csend { background: rgba(130,90,255,.25) !important; color: #d4c8ff !important; border-color: rgba(130,90,255,.4) !important; }
/* Thread list */
#rp-phone.rp-theme-star .rp-tn { color: #e8e0ff !important; font-weight: 600 !important; }
#rp-phone.rp-theme-star .rp-tp { color: rgba(200,185,255,.6) !important; }
#rp-phone.rp-theme-star .rp-tt { color: rgba(180,165,255,.45) !important; }

/* ── ✨ STAR: API settings button text contrast fix ── */
#rp-phone.rp-theme-star .rp-api-preset-btn {
  background: rgba(50,28,110,.72) !important;
  border: 1.5px solid rgba(160,120,255,.55) !important;
  color: #e0d4ff !important;
  font-weight: 700 !important;
  border-radius: 12px !important;
  text-shadow: 0 0 8px rgba(160,120,255,.5) !important;
}
#rp-phone.rp-theme-star .rp-api-preset-btn:active {
  background: rgba(80,40,160,.8) !important;
}
#rp-phone.rp-theme-star #rp-api-save-v {
  background: linear-gradient(135deg, #6d28d9, #8b5cf6) !important;
  color: #fff !important;
  font-weight: 700 !important;
  border: none !important;
  border-radius: 14px !important;
  box-shadow: 0 0 18px rgba(120,60,255,.45), 0 4px 14px rgba(0,0,0,.4) !important;
  text-shadow: 0 1px 4px rgba(80,20,180,.4) !important;
}
#rp-phone.rp-theme-star #rp-api-save-v.rp-saved {
  background: linear-gradient(135deg, #059669, #10b981) !important;
}
#rp-phone.rp-theme-star #rp-fetch-models-btn {
  background: rgba(50,28,110,.65) !important;
  border: 1.5px solid rgba(160,120,255,.45) !important;
  color: #d4c8ff !important;
  font-weight: 600 !important;
  border-radius: 10px !important;
}
#rp-phone.rp-theme-star .rp-api-opt {
  color: #e0d4ff !important;
  font-weight: 600 !important;
  text-shadow: 0 0 6px rgba(160,120,255,.4) !important;
}
#rp-phone.rp-theme-star #rp-view-api-settings input {
  background: rgba(30,18,60,.78) !important;
  border: 1.5px solid rgba(160,120,255,.45) !important;
  color: #e0d4ff !important;
  border-radius: 12px !important;
}
#rp-phone.rp-theme-star #rp-view-api-settings input::placeholder {
  color: rgba(180,160,255,.4) !important;
}
#rp-phone.rp-theme-star #rp-model-list {
  background: rgba(25,14,55,.88) !important;
  border: 1.5px solid rgba(160,120,255,.4) !important;
  color: #e0d4ff !important;
  border-radius: 12px !important;
}

/* ── Theme card text contrast ── */
#rp-phone.rp-theme-star .rp-theme-name { color: #e0d4ff !important; font-weight: 700 !important; }
#rp-phone.rp-theme-star .rp-theme-desc { color: rgba(200,185,255,.85) !important; }
#rp-phone.rp-theme-misty .rp-theme-name { color: #1a2e44 !important; font-weight: 700 !important; }
#rp-phone.rp-theme-misty .rp-theme-desc { color: rgba(44,74,106,.75) !important; }
#rp-phone.rp-theme-candy .rp-theme-name { color: #5a1030 !important; font-weight: 700 !important; }
#rp-phone.rp-theme-candy .rp-theme-desc { color: rgba(100,30,60,.7) !important; }

/* ══ Wallpaper direct-apply on all inner views (bulletproof) ══ */
#rp-phone.rp-theme-candy #rp-view-messages,
#rp-phone.rp-theme-candy #rp-view-thread,
#rp-phone.rp-theme-candy #rp-view-moments,
#rp-phone.rp-theme-candy #rp-view-settings,
#rp-phone.rp-theme-candy #rp-view-api-settings,
#rp-phone.rp-theme-candy #rp-view-game,
#rp-phone.rp-theme-candy #rp-view-themes {
  background: var(--rp-home-wall) !important;
  background-size: cover !important;
  background-position: center !important;
}
#rp-phone.rp-theme-star #rp-view-messages,
#rp-phone.rp-theme-star #rp-view-thread,
#rp-phone.rp-theme-star #rp-view-moments,
#rp-phone.rp-theme-star #rp-view-settings,
#rp-phone.rp-theme-star #rp-view-api-settings,
#rp-phone.rp-theme-star #rp-view-game,
#rp-phone.rp-theme-star #rp-view-themes {
  background: var(--rp-home-wall) !important;
  background-size: cover !important;
  background-position: center !important;
}
#rp-phone.rp-theme-misty #rp-view-messages,
#rp-phone.rp-theme-misty #rp-view-thread,
#rp-phone.rp-theme-misty #rp-view-moments,
#rp-phone.rp-theme-misty #rp-view-settings,
#rp-phone.rp-theme-misty #rp-view-api-settings,
#rp-phone.rp-theme-misty #rp-view-game,
#rp-phone.rp-theme-misty #rp-view-themes {
  background: var(--rp-home-wall) !important;
  background-size: cover !important;
  background-position: center !important;
}
/* ── THEMES VIEW ── */
/* ── Misty Blue Hydrangea Theme ── */
#rp-phone.rp-theme-misty {
  --rp-frame-bg:linear-gradient(160deg,#f0f4f8,#dce6ef,#e8eff5);
  --rp-frame-sh:0 0 0 1.5px rgba(140,170,200,.3),0 0 0 1.5px rgba(140,170,200,.15),0 36px 80px rgba(80,110,140,.25),inset 0 1px 0 rgba(255,255,255,.9);
  --rp-btn-bg:#b0c4d8;
  --rp-island-bg:#1a2635;
  --rp-island-ring:#e8eff5;
  --rp-screen-bg:transparent;
  --rp-sbar-color:rgba(220,238,252,.92);
  --rp-bat-border:rgba(44,74,106,.4);
  --rp-bat-nub:rgba(44,74,106,.3);
  --rp-lock-wall:linear-gradient(rgba(200,225,245,.08),rgba(180,215,240,.10)),url('https://i.postimg.cc/wjTgWzdY/lan-se-xiu-qiu-yu-bi-lan-da-hai-de-lang-man-xie-hou-bi-zhi-1-guang-yu-Wallpaper-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat;
  --rp-lock-color:#1e3a54;
  --rp-lock-time:#1a2e44;
  --rp-swipe-color:rgba(44,74,106,.35);
  --rp-ln-bg:rgba(240,246,252,.85);
  --rp-ln-bd:rgba(140,175,210,.2);
  --rp-ln-text:rgba(30,58,84,.85);
  --rp-home-wall:linear-gradient(rgba(200,225,245,.06),rgba(180,215,240,.08)),url('https://i.postimg.cc/wjTgWzdY/lan-se-xiu-qiu-yu-bi-lan-da-hai-de-lang-man-xie-hou-bi-zhi-1-guang-yu-Wallpaper-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat;
  --rp-clock-color:rgba(220,238,252,.92);
  --rp-app-lbl:rgba(26,46,68,.85);
  --rp-app-lbl-sh:0 1px 3px rgba(255,255,255,.9);
  --rp-indicator:rgba(44,74,106,.22);
  --rp-widget-bg:rgba(240,248,255,.62);
  --rp-widget-bd:rgba(140,175,210,.28);
  --rp-widget-color:#1a2e44;
  --rp-wd-fill:linear-gradient(90deg,#5b8fb9,#8ab4d4);
  --rp-nav-bg:rgba(240,248,255,.7);
  --rp-nav-bd:rgba(140,175,210,.25);
  --rp-nav-title:rgba(235,248,255,.95);
  --rp-nav-btn:#3d6e9a;
  --rp-msg-bg:transparent;
  --rp-bubbles-bg:transparent;
  --rp-sent-bg:linear-gradient(135deg,#4a7fa8,#6fa3c4);
  --rp-recv-bg:rgba(255,255,255,.88);
  --rp-recv-color:#1a2e44;
  --rp-composer-bg:rgba(240,246,252,.95);
  --rp-composer-bd:rgba(140,175,210,.2);
  --rp-input-bg:rgba(255,255,255,.7);
  --rp-input-bd:rgba(140,175,210,.3);
  --rp-input-color:#1a2e44;
  --rp-send-bg:linear-gradient(135deg,#4a7fa8,#6fa3c4);
  /* Shape & Animation */
  --rp-ico-radius:18px;
  --rp-ico-sh:0 4px 14px rgba(80,120,160,.18),0 0 0 1px rgba(140,175,210,.2);
  --rp-ico-hover-sh:0 8px 24px rgba(80,120,160,.28),0 0 0 1.5px rgba(91,143,185,.4);
  --rp-ico-hover-lift:translateY(-3px) scale(1.05);
  --rp-ico-active:scale(.88);
  --rp-send-size:34px;
  --rp-send-radius:20px 14px 14px 20px;
  --rp-send-sh:0 4px 12px rgba(74,127,168,.4);
  --rp-send-hover-sh:0 6px 20px rgba(74,127,168,.55);
  --rp-input-radius:20px;
  --rp-input-sh:0 2px 8px rgba(140,175,210,.15);
  --rp-input-focus-sh:0 0 0 3px rgba(91,143,185,.25),0 4px 12px rgba(140,175,210,.2);
  --rp-bubble-radius:22px;
  --rp-bubble-radius-out:22px 22px 6px 22px;
  --rp-bubble-radius-in:22px 22px 22px 6px;
  --rp-nav-btn-radius:20px;
  --rp-nav-sh:0 2px 12px rgba(140,175,210,.15);
  --rp-thread-radius:14px;
  --rp-thread-mx:10px;
  --rp-thread-sh:0 2px 8px rgba(80,120,160,.08);
  --rp-moment-radius:14px;
  --rp-widget-radius:22px;
  --rp-widget-sh:0 4px 20px rgba(80,120,160,.15),0 0 0 1px rgba(140,175,210,.2);
  --rp-transition:transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease;
  --rp-themes-bg:transparent;
  --rp-themes-label:#3d6e9a;
  --rp-tc-bg:rgba(240,246,252,.9);
  --rp-threads-bg:transparent;
  --rp-thread-bd:rgba(140,175,210,.18);
  --rp-thread-hover:rgba(140,175,210,.08);
  --rp-tn-color:#1a2e44;
  --rp-tp-color:rgba(44,74,106,.5);
  --rp-tt-color:rgba(44,74,106,.4);
  --rp-hd-name:rgba(44,74,106,.6);
  --rp-bts-color:rgba(44,74,106,.35);
  --rp-moments-bg:transparent;
  --rp-moment-card:rgba(240,246,252,.88);
  --rp-moment-name:#3d6e9a;
  --rp-moment-text:#1a2e44;
  --rp-moment-bd:rgba(140,175,210,.15);
}
/* misty home-bg grain texture */
#rp-phone.rp-theme-misty .rp-home-bg::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.0;background-image:none}
/* misty lock same grain */
#rp-phone.rp-theme-misty .rp-lock-bg::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.0;background-image:none}
/* star particles - only visible in star theme (via home-bg pseudo-element) */
#rp-phone.rp-theme-star .rp-home-bg::after{content:'';position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(1.2px 1.2px at 12% 18%,rgba(255,255,255,.75) 0%,transparent 100%),radial-gradient(1px 1px at 35% 8%,rgba(255,255,255,.6) 0%,transparent 100%),radial-gradient(1.5px 1.5px at 72% 22%,rgba(255,255,255,.85) 0%,transparent 100%),radial-gradient(1px 1px at 88% 35%,rgba(255,255,255,.55) 0%,transparent 100%),radial-gradient(1.2px 1.2px at 25% 42%,rgba(255,255,255,.65) 0%,transparent 100%),radial-gradient(1px 1px at 58% 55%,rgba(255,255,255,.5) 0%,transparent 100%),radial-gradient(1.5px 1.5px at 45% 70%,rgba(255,255,255,.7) 0%,transparent 100%),radial-gradient(1px 1px at 80% 65%,rgba(255,255,255,.55) 0%,transparent 100%),radial-gradient(1.2px 1.2px at 8% 80%,rgba(255,255,255,.7) 0%,transparent 100%),radial-gradient(1px 1px at 92% 12%,rgba(255,255,255,.6) 0%,transparent 100%),radial-gradient(1px 1px at 62% 88%,rgba(255,255,255,.5) 0%,transparent 100%),radial-gradient(1.5px 1.5px at 18% 60%,rgba(255,255,255,.6) 0%,transparent 100%)}
#rp-view-themes{background:transparent !important;display:flex;flex-direction:column}
.rp-theme-card{background:var(--rp-tc-bg);border-radius:18px;overflow:hidden;cursor:pointer;box-shadow:0 2px 12px rgba(100,60,200,.1);transition:transform .15s,box-shadow .15s}
.rp-theme-card:active{transform:scale(.94)}
.rp-theme-card.rp-tc-active{box-shadow:0 0 0 2.5px #a855f7,0 3px 14px rgba(130,60,200,.25)}
.rp-theme-preview{height:96px;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
.rp-theme-mini{display:flex;flex-direction:column;align-items:center;gap:7px}
.rp-theme-mini-clock{font-size:20px;font-weight:100;letter-spacing:-1px;opacity:.9}
.rp-theme-mini-dots{display:flex;gap:5px}
.rp-theme-mini-dot{width:16px;height:16px;border-radius:5px;background:rgba(255,255,255,.65);box-shadow:0 1px 4px rgba(0,0,0,.15)}
.rp-theme-check{position:absolute;top:8px;right:9px;width:20px;height:20px;background:#a855f7;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700;box-shadow:0 2px 6px rgba(168,85,247,.5)}
.rp-theme-info{padding:8px 12px 12px}
.rp-theme-name{font-size:12px;font-weight:700;color:var(--rp-nav-title);margin-bottom:2px}
.rp-theme-desc{font-size:10px;color:var(--rp-tp-color);line-height:1.4}
.rp-dark .rp-wd-label{color:rgba(160,175,255,.4)}
.rp-dark .rp-wd-stage{color:#dde0f2}
.rp-dark .rp-wd-track{background:rgba(255,255,255,.1)}
.rp-dark .rp-wd-status{color:rgba(160,175,255,.52)}
.rp-dark .rp-home-indicator{background:rgba(255,255,255,.22)}
/* ── DARK MESSAGES ── */

.rp-dark .rp-thread{border-bottom-color:rgba(255,255,255,.05)}
.rp-dark .rp-thread:hover{background:rgba(255,255,255,.03)}
.rp-dark .rp-tn{color:#dde0f2}
.rp-dark .rp-tp{color:rgba(160,175,255,.46)}
.rp-dark .rp-tt{color:rgba(160,175,255,.36)}
.rp-dark .rp-nav-bar{background:#0c0c1a;border-bottom-color:rgba(255,255,255,.07)}
.rp-dark .rp-nav-title{color:#dde0f2!important}
.rp-dark .rp-back{color:#7090f0 !important}
.rp-dark .rp-nav-add{color:#7090f0 !important}
.rp-dark .rp-hd-name{color:rgba(160,175,255,.62)}
/* ── DARK THREAD ── */


.rp-dark .rp-recv{background:#161628;color:#dde0f2}
.rp-dark .rp-bts{color:rgba(160,175,255,.3)}
.rp-dark #rp-composer{background:#0c0c1a !important;border-top-color:rgba(255,255,255,.06) !important}
.rp-dark #rp-input{background:rgba(255,255,255,.05) !important;border-color:rgba(255,255,255,.1) !important;color:#dde0f2 !important}
.rp-dark #rp-input::placeholder{color:rgba(160,175,255,.3)}
.rp-dark #rp-pending-queue{background:rgba(37,99,235,.05);border-top-color:rgba(37,99,235,.1)}
.rp-dark .rp-pending-item{color:#8aaef0;background:rgba(37,99,235,.12)}
.rp-dark .rp-pending-hint{color:rgba(160,175,255,.3)}
.rp-dark #rp-add-form{background:#12122a}
.rp-dark #rp-add-form h3{color:#dde0f2}
.rp-dark #rp-add-form input{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#dde0f2}
.rp-dark #rp-add-cancel{background:#1c1c38 !important;color:#dde0f2 !important}
.rp-dark #rp-notif-banner{background:rgba(8,8,20,.95);border-color:rgba(255,255,255,.08)}
.rp-dark .rp-nb-from{color:rgba(160,175,255,.5)}
.rp-dark .rp-nb-text{color:#dde0f2}
.rp-dark .rp-nb-time{color:rgba(160,175,255,.36)}
.rp-dark #rp-home-ind{background:rgba(255,255,255,.22)}
/* ── MOMENTS VIEW ── */
#rp-view-moments{background:transparent !important;display:flex;flex-direction:column}

#rp-moments-list{flex:1;overflow-y:auto;scrollbar-width:none;padding-bottom:8px}
#rp-moments-list::-webkit-scrollbar{display:none}
.rp-moment{background:var(--rp-moment-card);margin-bottom:8px;padding:14px 16px}
.rp-dark .rp-moment{background:#0e0e20}
.rp-moment-hd{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.rp-moment-av{width:42px;height:42px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0}
.rp-moment-meta{flex:1;min-width:0}
.rp-moment-name{font-size:14px;font-weight:700;color:var(--rp-moment-name)}
.rp-dark .rp-moment-name{color:#8aaef0}
.rp-moment-time{font-size:10.5px;color:rgba(0,0,0,.38);margin-top:2px;font-weight:600}
.rp-dark .rp-moment-time{color:rgba(160,175,255,.38)}
.rp-moment-text{font-size:14px;color:var(--rp-moment-text);line-height:1.65;margin-bottom:10px;word-break:break-word}
.rp-dark .rp-moment-text{color:#d5d8f0}
.rp-moment-bar{display:flex;align-items:center;justify-content:flex-end;gap:2px;padding:6px 0 2px;border-top:1px solid var(--rp-moment-bd)}
.rp-dark .rp-moment-bar{border-top-color:rgba(255,255,255,.06)}
.rp-moment-act{display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:8px;font-size:12px;font-weight:600;color:rgba(0,0,0,.42);cursor:pointer;transition:background .12s,color .12s;border:none;background:none;font-family:inherit}
.rp-dark .rp-moment-act{color:rgba(160,175,255,.42)}
.rp-moment-act:hover{background:rgba(0,0,0,.04)}
.rp-dark .rp-moment-act:hover{background:rgba(255,255,255,.04)}
.rp-moment-act.rp-liked{color:#e53e3e !important}
.rp-moment-comments-wrap{background:rgba(0,0,0,.03);border-radius:10px;padding:8px 12px;margin-top:8px;display:flex;flex-direction:column;gap:5px}
.rp-dark .rp-moment-comments-wrap{background:rgba(255,255,255,.04)}
.rp-moment-comment{font-size:13px;color:#222;line-height:1.55}
.rp-dark .rp-moment-comment{color:#c0c8e8}
.rp-moment-cname{color:#2563eb;font-weight:700}
.rp-dark .rp-moment-cname{color:#8aaef0}
.rp-moment-reply-btn{color:rgba(0,0,0,.35);font-size:11px;cursor:pointer;margin-left:6px}
.rp-dark .rp-moment-reply-btn{color:rgba(160,175,255,.35)}
.rp-moment-input-row{display:flex;gap:6px;margin-top:8px;padding-top:6px;border-top:1px solid rgba(0,0,0,.06)}
.rp-dark .rp-moment-input-row{border-top-color:rgba(255,255,255,.06)}
.rp-moment-cinput{flex:1;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.1);border-radius:8px;padding:6px 10px;font-size:12.5px;color:#1a1a1a;font-family:inherit;outline:none}
.rp-dark .rp-moment-cinput{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#d5d8f0}
.rp-moment-csend{background:#2563eb;color:#fff;border:none;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap;flex-shrink:0}
.rp-moment-csend:hover{opacity:.85}
.rp-moments-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:200px;color:rgba(0,0,0,.3);font-size:13px;gap:8px}
.rp-dark .rp-moments-empty{color:rgba(160,175,255,.3)}

/* ── AVATAR IMAGES ── */
.rp-av-img,.rp-moment-av.rp-av-img{overflow:hidden;padding:0}
.rp-av-photo{width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit}
/* ── SETTINGS VIEW ── */
#rp-view-settings{background:transparent;display:flex;flex-direction:column;overflow-y:auto}
#rp-view-api-settings{background:transparent;display:flex;flex-direction:column}
.rp-dark #rp-view-settings{background:transparent}
.rp-set-section{background:#fff;border-radius:12px;margin:10px 12px 0;padding:0 14px;overflow:hidden}
.rp-dark .rp-set-section{background:rgba(255,255,255,.04)}
.rp-set-section-title{font-size:12px;font-weight:600;color:#8a8a9a;text-transform:uppercase;letter-spacing:.05em;margin:16px 12px 5px;padding:0}
.rp-dark .rp-set-section-title{color:#6a6a7a}
.rp-set-row{display:flex;align-items:center;padding:11px 0;border-bottom:1px solid rgba(0,0,0,.06);gap:10px;min-height:44px}
.rp-dark .rp-set-row{border-bottom-color:rgba(255,255,255,.05)}
.rp-set-row:last-child{border-bottom:none}
.rp-set-key{font-size:15px;color:#1a1a2e;flex:1}
.rp-dark .rp-set-key{color:#c8cce8}
.rp-set-hint{font-size:12px;color:#8a8a9a;flex:1}
.rp-dark .rp-set-hint{color:rgba(200,190,255,.45)}
.rp-set-select{font-size:14px;color:#3a3a5e;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.1);border-radius:8px;padding:4px 8px;font-family:inherit;max-width:150px;outline:none}
.rp-dark .rp-set-select{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.1);color:#c0c4e0}
.rp-avatar-upload-btn{font-size:13.5px;color:#2563eb;background:rgba(37,99,235,.08);border:1px solid rgba(37,99,235,.18);border-radius:8px;padding:6px 12px;cursor:pointer;flex-shrink:0;display:inline-flex;align-items:center;gap:4px}
.rp-dark .rp-avatar-upload-btn{color:#7090f0;background:rgba(112,144,240,.12);border-color:rgba(112,144,240,.2)}
.rp-set-upload-btn{font-size:13.5px;font-family:inherit;padding:8px 12px;border-radius:10px;border:none;cursor:pointer;background:rgba(0,0,0,.06);color:#333;white-space:nowrap;display:flex;align-items:center;justify-content:center;gap:4px}
.rp-dark .rp-set-upload-btn{background:rgba(255,255,255,.08);color:#c8cce8}
.rp-wall-reset-btn{background:rgba(0,0,0,.05)!important;color:#666!important}
.rp-dark .rp-wall-reset-btn{background:rgba(255,255,255,.06)!important;color:rgba(200,190,255,.6)!important}
.rp-set-avatar-preview{width:38px;height:38px;border-radius:19px;overflow:hidden;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff}

/* ===== DIARY VIEW ===== */
#rp-view-diary{background:transparent;display:flex;flex-direction:column;overflow:hidden}
.rp-diary-gen-btn{background:none;border:none;cursor:pointer;color:var(--rp-nav-btn,#2563eb);width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:transform .3s;flex-shrink:0}
.rp-diary-gen-btn:disabled{opacity:.35;cursor:default}
.rp-diary-gen-btn.rp-spinning{animation:rpSpin .7s linear infinite}
.rp-diary-entry{margin-bottom:14px;border-radius:14px;overflow:hidden;background:rgba(255,255,255,.55);border:1px solid rgba(255,255,255,.6);box-shadow:0 2px 12px rgba(0,0,0,.06)}
.rp-diary-hd{padding:10px 14px 6px}
.rp-diary-meta{display:flex;flex-direction:column}
.rp-diary-author{font-size:13px;font-weight:600;color:#1a1a2e}
.rp-diary-date{font-size:11px;color:#888}
.rp-diary-body{font-size:14px;line-height:1.7;color:#1a1a2e;padding:0 14px 10px;word-break:break-word}
.rp-diary-ai-badge{font-size:10px;background:rgba(236,72,153,.12);color:#ec4899;border-radius:8px;padding:1px 6px;margin-left:4px;vertical-align:middle}
.rp-diary-reply{background:rgba(200,50,100,.04);border-top:1px solid rgba(200,50,100,.08);padding:8px 14px}
.rp-diary-reply-name{font-size:12px;font-weight:600;color:#c0306a;margin-bottom:2px}
.rp-diary-reply-text{font-size:13px;color:#333;line-height:1.6}
.rp-diary-compose{flex-shrink:0;padding:10px 14px 18px;border-top:1px solid rgba(192,48,106,.1);display:flex;flex-direction:column;gap:8px}
.rp-diary-input{width:100%;box-sizing:border-box;border:1px solid rgba(0,0,0,.1);border-radius:12px;padding:10px 12px;font-size:14px;font-family:inherit;resize:none;outline:none;background:rgba(255,255,255,.7)!important;color:#1a1a2e!important;line-height:1.6}
.rp-diary-input::placeholder{color:rgba(60,60,80,.38)}
.rp-diary-send-btn{align-self:flex-end;padding:8px 22px;border-radius:20px;border:none;cursor:pointer;font-size:14px;font-weight:700;color:#fff;background:linear-gradient(135deg,#f97316,#ec4899)}
.rp-diary-send-btn:disabled{opacity:.45;cursor:default}
.rp-diary-empty{text-align:center;color:rgba(0,0,0,.3);padding:40px 0;font-size:14px}
.rp-dark .rp-diary-entry{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.08)}
.rp-dark .rp-diary-author{color:#dde0f2}
.rp-dark .rp-diary-date{color:rgba(200,190,255,.5)}
.rp-dark .rp-diary-body{color:#d5d8f0}
.rp-dark .rp-diary-reply{background:rgba(255,255,255,.04);border-top-color:rgba(255,255,255,.07)}
.rp-dark .rp-diary-reply-text{color:#c8cce8}
.rp-dark .rp-diary-compose{border-top-color:rgba(255,255,255,.07)}
.rp-dark .rp-diary-input{background:rgba(255,255,255,.07)!important;border-color:rgba(255,255,255,.12);color:#e0e4ff!important}
#rp-phone.rp-theme-star .rp-diary-entry{background:rgba(30,15,80,.55);border-color:rgba(140,110,255,.25)}
#rp-phone.rp-theme-star .rp-diary-author{color:#d4c8ff}
#rp-phone.rp-theme-star .rp-diary-date{color:rgba(180,165,255,.55)}
#rp-phone.rp-theme-star .rp-diary-body{color:#c8c0f0}
#rp-phone.rp-theme-star .rp-diary-reply{background:rgba(140,100,255,.08);border-top-color:rgba(140,110,255,.15)}
#rp-phone.rp-theme-star .rp-diary-reply-name{color:#a78bfa}
#rp-phone.rp-theme-star .rp-diary-reply-text{color:#c0b8e8}
#rp-phone.rp-theme-star .rp-diary-compose{border-top-color:rgba(140,110,255,.2)}
#rp-phone.rp-theme-star .rp-diary-input{background:rgba(28,14,72,.65)!important;border-color:rgba(140,110,255,.3);color:#e0d8ff!important}
#rp-phone.rp-theme-star .rp-diary-input::placeholder{color:rgba(180,165,255,.45)}
#rp-phone.rp-theme-star .rp-diary-send-btn{background:linear-gradient(135deg,#7c3aed,#a855f7)}
#rp-phone.rp-theme-star .rp-diary-empty{color:rgba(180,165,255,.35)}
#rp-phone.rp-theme-star #rp-gen-diary{color:#a78bfa}
#rp-phone.rp-theme-misty .rp-diary-entry{background:rgba(235,248,255,.76);border-color:rgba(100,170,220,.35);backdrop-filter:blur(10px) saturate(1.2);-webkit-backdrop-filter:blur(10px) saturate(1.2)}
#rp-phone.rp-theme-misty .rp-diary-author{color:#0a1828;font-weight:700}
#rp-phone.rp-theme-misty .rp-diary-date{color:rgba(40,80,130,.8)}
#rp-phone.rp-theme-misty .rp-diary-body{color:#0d1e30;line-height:1.75}
#rp-phone.rp-theme-misty .rp-diary-reply{background:rgba(60,120,180,.12);border-top-color:rgba(100,170,220,.28)}
#rp-phone.rp-theme-misty .rp-diary-reply-name{color:#1a5a8a;font-weight:700}
#rp-phone.rp-theme-misty .rp-diary-reply-text{color:#0d1e30}
#rp-phone.rp-theme-misty .rp-diary-compose{border-top-color:rgba(100,170,220,.2)}
#rp-phone.rp-theme-misty .rp-diary-input{background:rgba(235,248,255,.72)!important;border-color:rgba(100,170,220,.4);color:#0a1828!important}
#rp-phone.rp-theme-misty .rp-diary-input::placeholder{color:rgba(44,90,140,.4)}
#rp-phone.rp-theme-misty .rp-diary-send-btn{background:linear-gradient(135deg,#0ea5e9,#38bdf8)}
#rp-phone.rp-theme-misty .rp-diary-empty{color:rgba(44,74,106,.4)}
#rp-phone.rp-theme-misty #rp-gen-diary{color:rgba(220,238,252,.90)!important;filter:drop-shadow(0 1px 3px rgba(0,20,60,.43))!important}
/* Candy gen-diary explicit (candy has no theme class, CSS var handles it but be safe) */
#rp-gen-diary{color:var(--rp-nav-btn,#c0306a)}
/* 图标颜色由 CSS color: var(--rp-clock-color) + SVG currentColor 统一管理，与时钟颜色始终一致 */

/* ══ 2048 GAME ══ */
#rp-view-g2048{position:relative;background:transparent;display:flex;flex-direction:column;overflow:hidden;height:100%}
#g2048-header{display:flex;align-items:center;justify-content:space-between;padding:6px 14px;flex-shrink:0}
#g2048-scores{display:flex;gap:7px}
.g2048-sbox{background:rgba(255,255,255,.82);border:1px solid rgba(0,0,0,.08);border-radius:7px;padding:3px 10px;text-align:center;min-width:50px;box-shadow:0 1px 4px rgba(0,0,0,.1)}
.g2048-slbl{font-size:9.5px;font-weight:700;color:rgba(60,40,30,.65);text-transform:uppercase;letter-spacing:.04em}
#g2048-score,#g2048-best{font-size:15px;font-weight:800;color:#4a3728}
#g2048-turn{font-size:11.5px;font-weight:600;color:#fff;background:rgba(0,0,0,.38);padding:2px 10px;border-radius:12px;text-shadow:0 1px 3px rgba(0,0,0,.5)}
#g2048-newbtn{background:none;border:none;color:var(--rp-nav-btn,#c0306a);font-size:13px;font-weight:600;cursor:pointer;padding:4px 6px}
#g2048-board-wrap{display:flex;justify-content:center;padding:4px 0 2px;flex-shrink:0}
#g2048-board{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,1fr);gap:5px;padding:6px;background:rgba(195,95,128,.52);border-radius:9px;width:214px;height:214px;box-shadow:0 3px 12px rgba(160,40,80,.2)}
.g2048-cell{background:rgba(235,165,185,.42);border-radius:4px;display:flex;align-items:center;justify-content:center;overflow:hidden;min-width:0;min-height:0}
@keyframes g2048Pop{0%{transform:scale(.72)}55%{transform:scale(1.12)}100%{transform:scale(1)}}
@keyframes g2048Merge{0%{transform:scale(1)}40%{transform:scale(1.22)}100%{transform:scale(1)}}
.g2048-tile{width:100%;height:100%;border-radius:4px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:22px;animation:g2048Pop .14s ease-out}
#g2048-dpad{display:flex;justify-content:center;gap:5px;padding:3px 0;flex-shrink:0}
.g2048-drow{display:none}
.g2048-dir{width:34px;height:24px;border-radius:7px;border:none;background:rgba(187,173,160,.5);color:#776e65;font-size:14px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center}
.g2048-dir:active{background:rgba(187,173,160,.85)}
#g2048-chat{flex:1 1 0;min-height:0;overflow-y:auto;padding:5px 8px;display:flex;flex-direction:column;gap:2px;margin:0 8px;background:rgba(0,0,0,.28);border-radius:8px;backdrop-filter:blur(5px);cursor:pointer}
#g2048-chat::-webkit-scrollbar{display:none}
#g2048-input-row{display:flex;gap:6px;padding:6px 12px 10px;flex-shrink:0;border-top:1px solid rgba(0,0,0,.06)}
#g2048-input{flex:1;border-radius:18px;border:1px solid rgba(0,0,0,.12);padding:6px 12px;font-size:13px;background:rgba(255,255,255,.88);font-family:inherit;outline:none;color:#1a1008}
#g2048-send{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#e05888,#c0306a);border:none;color:#fff;font-weight:800;cursor:pointer;font-size:16px;flex-shrink:0;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(160,30,80,.4)}
#g2048-over{position:absolute;inset:0;background:rgba(0,0,0,.62);z-index:50;flex-direction:column;align-items:center;justify-content:center;gap:12px;display:none}
.g2048-over-emoji{font-size:52px;line-height:1}
.g2048-over-title{font-size:20px;font-weight:800;color:#fff}
.g2048-over-sub{font-size:13px;color:rgba(255,255,255,.8);text-align:center;padding:0 20px}
.g2048-over-btn{padding:9px 18px;border-radius:20px;border:none;background:linear-gradient(135deg,#f472b6,#a855f7);color:#fff;font-weight:700;font-size:13px;cursor:pointer}

/* 2048 fullscreen chat */
#g2048-chat-hint{font-size:9.5px;color:rgba(240,225,205,.55);text-align:right;padding:0 16px 2px;flex-shrink:0;text-shadow:0 1px 2px rgba(0,0,0,.5)}
#g2048-chat-fs{position:absolute;inset:0;z-index:40;background:rgba(0,0,0,.78);backdrop-filter:blur(8px);display:flex;flex-direction:column}
#g2048-chat-fs-hd{display:flex;align-items:center;justify-content:space-between;padding:52px 16px 10px;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,.12)}
#g2048-chat-fs-title{color:#fff;font-weight:600;font-size:14px}
#g2048-chat-fs-close{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);border-radius:50%;color:#fff;font-size:16px;cursor:pointer;width:32px;height:32px;display:flex;align-items:center;justify-content:center}
#g2048-chat-fs-body{flex:1;overflow-y:auto;padding:8px 14px;display:flex;flex-direction:column;gap:4px}
#g2048-chat-fs-body::-webkit-scrollbar{display:none}
#g2048-chat-fs-body .game-msg{font-size:13px;line-height:1.6;padding:3px 0}
#g2048-chat-fs-body .game-msg-sys{color:rgba(240,230,215,.88)}
#g2048-chat-fs-body .game-msg-user{color:#ffd6e8;font-weight:600}
#g2048-chat-fs-body .game-msg-char{color:#fce8ff;font-weight:600}
#rp-phone.rp-theme-star #g2048-chat-fs-body .game-msg-sys{color:rgba(210,200,255,.88)}
#rp-phone.rp-theme-star #g2048-chat-fs-body .game-msg-user{color:#f0c0ff}
#rp-phone.rp-theme-star #g2048-chat-fs-body .game-msg-char{color:#c8b8ff}
#rp-phone.rp-theme-misty #g2048-chat-fs-body .game-msg-sys{color:rgba(200,228,255,.92)}
#rp-phone.rp-theme-misty #g2048-chat-fs-body .game-msg-user{color:rgba(255,210,228,.92)}
#rp-phone.rp-theme-misty #g2048-chat-fs-body .game-msg-char{color:rgba(185,228,255,.95)}


/* 2048 API tip blink */
@keyframes g2048TipBlink{0%,100%{opacity:1}50%{opacity:.55}}
#g2048-api-tip{font-size:11px;text-align:center;padding:3px 14px 0;flex-shrink:0;animation:g2048TipBlink 2.4s ease-in-out infinite;color:#8a0030;font-weight:700;text-shadow:-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff,0 0 6px rgba(255,255,255,.9)}
#rp-phone.rp-theme-star #g2048-api-tip{color:#e8d8ff;text-shadow:-1px -1px 0 rgba(20,0,60,.9),1px -1px 0 rgba(20,0,60,.9),-1px 1px 0 rgba(20,0,60,.9),1px 1px 0 rgba(20,0,60,.9),0 0 8px rgba(100,50,200,.6)}
#rp-phone.rp-theme-misty #g2048-api-tip{color:#002a5c;text-shadow:-1px -1px 0 rgba(255,255,255,.95),1px -1px 0 rgba(255,255,255,.95),-1px 1px 0 rgba(255,255,255,.95),1px 1px 0 rgba(255,255,255,.95),0 0 6px rgba(255,255,255,.8)}

/* 2048 chat message colors */
#g2048-chat .game-msg{font-size:12px;line-height:1.55;padding:2px 0;font-weight:500}
/* Candy default: warm white on dark overlay */
#g2048-chat .game-msg-sys{color:rgba(255,240,225,.90);text-shadow:0 0 4px rgba(0,0,0,.8),0 1px 3px rgba(0,0,0,.6)}
#g2048-chat .game-msg-user{color:#ffd6e8;font-weight:600;text-shadow:0 0 4px rgba(0,0,0,.8),0 1px 3px rgba(0,0,0,.6)}
#g2048-chat .game-msg-char{color:#fce8ff;font-weight:600}
/* Star: purple-tinted */
#rp-phone.rp-theme-star #g2048-chat{background:rgba(8,2,30,.52)!important}
#rp-phone.rp-theme-star #g2048-chat .game-msg-sys{color:rgba(210,200,255,.88)}
#rp-phone.rp-theme-star #g2048-chat .game-msg-user{color:#f0c0ff}
#rp-phone.rp-theme-star #g2048-chat .game-msg-char{color:#c8b8ff}
/* Misty: blue-tinted overlay + blue-white text */
#rp-phone.rp-theme-misty #g2048-chat{background:rgba(0,15,40,.42)!important}
#rp-phone.rp-theme-misty #g2048-chat .game-msg-sys{color:rgba(200,228,255,.92);text-shadow:0 0 4px rgba(0,10,40,.8)}
#rp-phone.rp-theme-misty #g2048-chat .game-msg-user{color:rgba(255,210,228,.92);text-shadow:0 0 4px rgba(0,10,40,.8)}
#rp-phone.rp-theme-misty #g2048-chat .game-msg-char{color:rgba(185,228,255,.95)}

/* ── 2048 tile colors (Candy warm) ── */
/* Candy: pink-rose palette */
.g2048-tile[data-v="2"]{background:#f9dce5;color:#9a3555}
.g2048-tile[data-v="4"]{background:#f5c6d5;color:#8a2a4a}
.g2048-tile[data-v="8"]{background:#f0a0b8;color:#fff}
.g2048-tile[data-v="16"]{background:#e87aa0;color:#fff}
.g2048-tile[data-v="32"]{background:#e05888;color:#fff}
.g2048-tile[data-v="64"]{background:#d83070;color:#fff}
.g2048-tile[data-v="128"]{background:#c82068;color:#ffd6e8}
.g2048-tile[data-v="256"]{background:linear-gradient(135deg,#e03878,#c02060);color:#fff}
.g2048-tile[data-v="512"]{background:linear-gradient(135deg,#d02870,#a81858);color:#fff}
.g2048-tile[data-v="1024"]{background:linear-gradient(135deg,#c01868,#900048);color:#fff}
.g2048-tile[data-v="2048"]{background:linear-gradient(135deg,#ff6699,#e0205a,#c01050);color:#fff}
.g2048-tile[data-v="high"]{background:#7a0035;color:#ffd6e8}
/* ── Star theme tiles (purple) ── */
#rp-phone.rp-theme-star .g2048-tile[data-v="2"]{background:rgba(55,15,105,.55);color:#c8b8ff}
#rp-phone.rp-theme-star .g2048-tile[data-v="4"]{background:rgba(70,20,135,.65);color:#d4c8ff}
#rp-phone.rp-theme-star .g2048-tile[data-v="8"]{background:rgba(90,28,170,.75);color:#e8e0ff}
#rp-phone.rp-theme-star .g2048-tile[data-v="16"]{background:rgba(110,32,195,.8);color:#f0ebff}
#rp-phone.rp-theme-star .g2048-tile[data-v="32"]{background:rgba(135,22,205,.85);color:#fff}
#rp-phone.rp-theme-star .g2048-tile[data-v="64"]{background:rgba(155,18,215,.9);color:#fff}
#rp-phone.rp-theme-star .g2048-tile[data-v="128"]{background:linear-gradient(135deg,rgba(80,8,150,.95),rgba(140,10,200,.95));color:#ffd8ff}
#rp-phone.rp-theme-star .g2048-tile[data-v="256"]{background:linear-gradient(135deg,rgba(100,5,160,.95),rgba(160,8,210,.95));color:#fff}
#rp-phone.rp-theme-star .g2048-tile[data-v="512"]{background:linear-gradient(135deg,rgba(120,0,170,.95),rgba(180,5,220,.95));color:#fff}
#rp-phone.rp-theme-star .g2048-tile[data-v="1024"]{background:linear-gradient(135deg,#4c0080,#7c00c8);color:#fff}
#rp-phone.rp-theme-star .g2048-tile[data-v="2048"]{background:linear-gradient(135deg,#9333ea,#c026d3);color:#fff}
#rp-phone.rp-theme-star .g2048-tile[data-v="high"]{background:#2d0060;color:#e8d0ff}
/* ── Misty theme tiles (blue) ── */
#rp-phone.rp-theme-misty .g2048-tile[data-v="2"]{background:rgba(185,218,242,.52);color:#0e2540}
#rp-phone.rp-theme-misty .g2048-tile[data-v="4"]{background:rgba(165,208,238,.62);color:#0e2540}
#rp-phone.rp-theme-misty .g2048-tile[data-v="8"]{background:rgba(82,158,222,.78);color:#fff}
#rp-phone.rp-theme-misty .g2048-tile[data-v="16"]{background:rgba(58,140,212,.84);color:#fff}
#rp-phone.rp-theme-misty .g2048-tile[data-v="32"]{background:rgba(38,118,195,.88);color:#fff}
#rp-phone.rp-theme-misty .g2048-tile[data-v="64"]{background:rgba(18,95,178,.92);color:#fff}
#rp-phone.rp-theme-misty .g2048-tile[data-v="128"]{background:linear-gradient(135deg,rgba(45,125,205,.95),rgba(20,85,175,.95));color:#d8f0ff}
#rp-phone.rp-theme-misty .g2048-tile[data-v="256"]{background:linear-gradient(135deg,rgba(30,108,192,.95),rgba(10,70,162,.95));color:#e8f5ff}
#rp-phone.rp-theme-misty .g2048-tile[data-v="512"]{background:linear-gradient(135deg,rgba(15,90,178,.95),rgba(5,55,148,.95));color:#fff}
#rp-phone.rp-theme-misty .g2048-tile[data-v="1024"]{background:linear-gradient(135deg,#0369a1,#0c4a6e);color:#fff}
#rp-phone.rp-theme-misty .g2048-tile[data-v="2048"]{background:linear-gradient(135deg,#0ea5e9,#06b6d4);color:#fff}
#rp-phone.rp-theme-misty .g2048-tile[data-v="high"]{background:#073763;color:#d0eeff}

/* Star theme 2048 */
#rp-phone.rp-theme-star #g2048-board{background:rgba(20,8,60,.82)}
#rp-phone.rp-theme-star .g2048-cell{background:rgba(60,25,120,.45)}
#rp-phone.rp-theme-star .g2048-sbox{background:rgba(25,10,65,.88)!important;border-color:rgba(140,110,255,.3)}
#rp-phone.rp-theme-star .g2048-slbl{color:rgba(180,165,255,.72)}
#rp-phone.rp-theme-star #g2048-score,#rp-phone.rp-theme-star #g2048-best{color:#ddd4ff!important;font-weight:800}
#rp-phone.rp-theme-star #g2048-turn{color:#e8e0ff!important;background:rgba(18,6,55,.78)!important}
#rp-phone.rp-theme-star .g2048-dir{background:rgba(80,40,160,.45);color:#c8b8ff;border:1px solid rgba(140,110,255,.2)}
#rp-phone.rp-theme-star #g2048-input{background:rgba(30,14,72,.82)!important;border-color:rgba(140,110,255,.35);color:#e8e0ff!important}
#rp-phone.rp-theme-star #g2048-send{background:linear-gradient(135deg,#7c3aed,#a855f7)!important;color:#fff!important;box-shadow:0 2px 8px rgba(100,30,200,.4)!important}
#rp-phone.rp-theme-star #g2048-input::placeholder{color:rgba(200,185,255,.4)!important}
#rp-phone.rp-theme-star #g2048-turn{color:rgba(200,185,255,.65)!important}
#rp-phone.rp-theme-star .g2048-dir:active{background:rgba(120,60,200,.7)}
/* Misty theme 2048 */
#rp-phone.rp-theme-misty #g2048-board{background:rgba(80,130,180,.58)}
#rp-phone.rp-theme-misty .g2048-cell{background:rgba(160,200,230,.38)}
#rp-phone.rp-theme-misty .g2048-sbox{background:rgba(225,242,255,.88)!important;border-color:rgba(100,170,220,.25)}
#rp-phone.rp-theme-misty .g2048-slbl{color:rgba(10,40,80,.65)}
#rp-phone.rp-theme-misty #g2048-score,#rp-phone.rp-theme-misty #g2048-best{color:#0a1828!important;font-weight:800}
#rp-phone.rp-theme-misty #g2048-turn{color:rgba(220,238,252,.95)!important;background:rgba(0,30,70,.55)!important;text-shadow:0 1px 3px rgba(0,20,60,.6)}
#rp-phone.rp-theme-misty .g2048-dir{background:rgba(180,215,240,.55);color:#0a2035;border:1px solid rgba(100,160,210,.25)}
#rp-phone.rp-theme-misty #g2048-input{background:rgba(235,248,255,.7)!important;border-color:rgba(100,170,220,.3);color:#0a1828!important}
#rp-phone.rp-theme-misty #g2048-input::placeholder{color:rgba(10,24,40,.38)!important}
#rp-phone.rp-theme-misty #g2048-send{background:linear-gradient(135deg,#0ea5e9,#0369a1)!important;color:#fff!important;box-shadow:0 2px 8px rgba(0,80,160,.35)!important}
#rp-phone.rp-theme-misty .g2048-dir:active{background:rgba(130,185,230,.8)}
/* Candy theme 2048 input explicit colors */
#rp-phone.rp-theme-candy #g2048-input{background:rgba(255,255,255,.92)!important;border-color:rgba(220,130,165,.4)!important;color:#3a1020!important}
#rp-phone.rp-theme-candy #g2048-input::placeholder{color:rgba(58,16,32,.38)!important}
/* ── COMPOSE MODAL ── */
/* ── Compose Modal ── */
/* ══════════════════════════════════════════════════════════
   COMPOSE MODAL - 磨砂壁纸玻璃效果(三主题通用)
   结构:::before=模糊壁纸  ::after=主题色调层  子元素z-index:2
   ══════════════════════════════════════════════════════════ */
#rp-compose-modal {
  position:absolute; inset:0; z-index:700;
  background: transparent;
  display:flex; flex-direction:column;
  overflow: hidden;
}
/* 弹起动画 */
@keyframes rp-compose-rise {
  from { opacity:0; transform: translateY(28px) scale(.98); }
  to   { opacity:1; transform: translateY(0)   scale(1);   }
}
#rp-compose-modal[style*="block"],
#rp-compose-modal:not([style*="none"]) {
  animation: rp-compose-rise .28s cubic-bezier(.22,1,.36,1) both;
}

/* ── 第1层:磨砂壁纸 ── */
#rp-compose-modal::before {
  content:'';
  position:absolute; inset:-40px; /* 超出边界消除 blur 边缘白边 */
  z-index:0;
  background-image: var(--rp-home-wall);
  background-size: cover;
  background-position: center;
  filter: blur(30px) saturate(1.35) brightness(1.04);
}
/* ── 第2层:主题色调染色 ── */
#rp-compose-modal::after {
  content:'';
  position:absolute; inset:0;
  z-index:1;
  background: rgba(255,245,250,0.64); /* 默认(Candy) 暖白粉 */
}
/* ── 所有直接子元素浮在最上面 ── */
#rp-compose-modal > * {
  position: relative;
  z-index: 2;
}

/* ── Star 主题:深紫黑染色 ── */
#rp-phone.rp-theme-star  #rp-compose-modal::after { background: rgba(6,3,22,.82); }
/* ── Misty 主题:清冷蓝染色 ── */
#rp-phone.rp-theme-misty #rp-compose-modal::after { background: rgba(222,240,255,.66); }
/* ── Dark mode ── */
.rp-dark #rp-compose-modal::after { background: rgba(4,3,18,.86); }

/* ══ 导航栏 - 更亮玻璃条,带模糊分隔感 ══ */
#rp-compose-modal .rp-nav-bar {
  background: rgba(255,255,255,.55) !important;
  backdrop-filter: blur(20px) saturate(1.6) !important;
  -webkit-backdrop-filter: blur(20px) saturate(1.6) !important;
  border-bottom: 1px solid rgba(255,255,255,.45) !important;
  box-shadow: 0 1px 0 rgba(0,0,0,.05) !important;
}
#rp-phone.rp-theme-star  #rp-compose-modal .rp-nav-bar {
  background: rgba(10,5,32,.55) !important;
  border-bottom-color: rgba(140,110,255,.2) !important;
  box-shadow: 0 1px 0 rgba(140,100,255,.1) !important;
}
#rp-phone.rp-theme-misty #rp-compose-modal .rp-nav-bar {
  background: rgba(220,238,255,.55) !important;
  border-bottom-color: rgba(80,150,210,.18) !important;
  box-shadow: 0 1px 0 rgba(80,150,210,.08) !important;
}
.rp-dark #rp-compose-modal .rp-nav-bar {
  background: rgba(6,4,22,.55) !important;
  border-bottom-color: rgba(255,255,255,.07) !important;
}

/* ══ compose body ══ */
.rp-compose-body {
  flex:1; overflow-y:auto; padding:14px 14px 24px;
  display:flex; flex-direction:column; gap:12px;
}

/* user row */
.rp-compose-user-row {
  display:flex; align-items:center; gap:12px;
  padding: 12px 16px 0;
}
.rp-compose-avatar {
  width:42px; height:42px; border-radius:50%;
  background: linear-gradient(145deg, #64748b, #475569);
  display:flex; align-items:center; justify-content:center;
  font-size:15px; font-weight:700; color:#fff; flex-shrink:0;
  box-shadow: 0 2px 10px rgba(0,0,0,.18), 0 0 0 2px rgba(255,255,255,.5);
}
.rp-compose-uname {
  font-size:15px; font-weight:700; color:var(--rp-moment-name);
  text-shadow: 0 1px 6px rgba(0,0,0,.08);
}

/* ══ 玻璃卡片 ══ */
.rp-compose-card {
  background: rgba(255,255,255,.55);
  backdrop-filter: blur(18px) saturate(1.5);
  -webkit-backdrop-filter: blur(18px) saturate(1.5);
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,.75);
  box-shadow: 0 4px 24px rgba(0,0,0,.08), 0 1px 0 rgba(255,255,255,.6) inset;
  padding: 14px 16px;
  display:flex; flex-direction:column; gap:0;
  margin: 0;
}
#rp-phone.rp-theme-star  .rp-compose-card {
  background: rgba(20,10,55,.50) !important;
  border-color: rgba(140,110,255,.28) !important;
  box-shadow: 0 4px 28px rgba(0,0,0,.35), 0 1px 0 rgba(160,130,255,.15) inset !important;
}
#rp-phone.rp-theme-misty .rp-compose-card {
  background: rgba(215,238,255,.52) !important;
  border-color: rgba(100,170,220,.28) !important;
  box-shadow: 0 4px 24px rgba(0,60,120,.1), 0 1px 0 rgba(180,220,255,.6) inset !important;
}
.rp-dark .rp-compose-card {
  background: rgba(12,8,36,.52) !important;
  border-color: rgba(140,110,255,.2) !important;
  box-shadow: 0 4px 24px rgba(0,0,0,.4), 0 1px 0 rgba(140,110,255,.1) inset !important;
}

/* textarea */
#rp-compose-text {
  width:100%; min-height:100px;
  border:none; background:transparent !important;
  font-size:15px; color:#1a1a2e;
  resize:none; outline:none;
  font-family:inherit; line-height:1.75;
  box-sizing:border-box;
}
/* compose-text: default(candy) card is white-ish → dark text; others override */
#rp-compose-text { color: #1a1a2e !important; background: transparent !important; }
#rp-phone.rp-theme-star #rp-compose-text {
  background: rgba(28,14,72,.65) !important;
  color: #e8e4ff !important;
  border-radius: 10px !important;
  padding: 8px 10px !important;
}
#rp-phone.rp-theme-misty #rp-compose-text {
  background: rgba(200,230,255,.18) !important;
  color: #0f2035 !important;
  border-radius: 10px !important;
  padding: 8px 10px !important;
}
.rp-dark #rp-compose-text {
  background: rgba(20,10,55,.5) !important;
  color: #e8e4ff !important;
  border-radius: 10px !important;
  padding: 8px 10px !important;
}

.rp-compose-sep {
  height:1px;
  background: rgba(0,0,0,.07);
  margin: 10px 0;
}
#rp-phone.rp-theme-star  .rp-compose-sep { background: rgba(140,110,255,.2) !important; }
#rp-phone.rp-theme-misty .rp-compose-sep { background: rgba(80,150,200,.15) !important; }
.rp-dark .rp-compose-sep { background: rgba(255,255,255,.07) !important; }

#rp-compose-text::placeholder { color: rgba(60,60,80,.38); }
#rp-phone.rp-theme-star  #rp-compose-text::placeholder { color: rgba(200,190,255,.4) !important; }
#rp-phone.rp-theme-misty #rp-compose-text::placeholder { color: rgba(44,90,140,.4) !important; }
.rp-dark #rp-compose-text::placeholder { color: rgba(200,190,255,.35) !important; }
.rp-compose-hint {
  font-size:11px; color:rgba(0,0,0,.35);
  text-align:right; letter-spacing:.3px; padding-top:2px;
}
#rp-phone.rp-theme-star  .rp-compose-hint { color: rgba(180,165,255,.45) !important; }
#rp-phone.rp-theme-misty .rp-compose-hint { color: rgba(44,90,140,.4) !important; }
.rp-dark .rp-compose-hint { color: rgba(200,190,255,.35) !important; }

/* ══ 取消 / 发布 按钮 ══ */
.rp-compose-cancel {
  background:none !important; border:none !important;
  color: var(--rp-nav-btn) !important;
  font-size:14px !important; font-weight:400 !important;
  cursor:pointer !important; padding:0 6px !important;
  font-family:inherit !important; display:inline-flex !important;
  align-items:center !important; visibility:visible !important;
  opacity:1 !important; pointer-events:auto !important;
}
.rp-compose-post-btn {
  border: none !important;
  color: #fff !important;
  font-size:13px !important; font-weight:700 !important;
  cursor:pointer !important;
  padding: 6px 16px !important;
  border-radius: 22px !important;
  font-family:inherit !important; display:inline-flex !important;
  align-items:center !important; visibility:visible !important;
  opacity:1 !important; pointer-events:auto !important;
  letter-spacing:.4px !important;
  /* 默认(Candy):玫瑰粉渐变 + 光晕 */
  background: linear-gradient(135deg, #e0567a, #f472b6) !important;
  box-shadow: 0 3px 14px rgba(224,86,122,.45) !important;
  transition: box-shadow .15s, transform .1s !important;
}
.rp-compose-post-btn:active {
  transform: scale(.93) !important;
  box-shadow: 0 1px 6px rgba(224,86,122,.3) !important;
}
/* Star:紫光渐变 */
#rp-phone.rp-theme-star  .rp-compose-post-btn {
  background: linear-gradient(135deg, #7c3aed, #a855f7) !important;
  box-shadow: 0 3px 14px rgba(124,58,237,.5) !important;
}
/* Misty:天蓝渐变 */
#rp-phone.rp-theme-misty .rp-compose-post-btn {
  background: linear-gradient(135deg, #0ea5e9, #38bdf8) !important;
  box-shadow: 0 3px 14px rgba(14,165,233,.45) !important;
}
/* Dark */
.rp-dark .rp-compose-post-btn {
  background: linear-gradient(135deg, #6d28d9, #8b5cf6) !important;
  box-shadow: 0 3px 14px rgba(109,40,217,.45) !important;
}
.rp-compose-post-btn:active { opacity:.75 !important; }
/* ── XHS theme-adaptive polish ── */
#rp-phone{
  --rp-xhs-bg:#fff6f8;
  --rp-xhs-panel:rgba(255,255,255,.82);
  --rp-xhs-card:#ffffff;
  --rp-xhs-soft:#fff1f4;
  --rp-xhs-border:rgba(255,60,95,.10);
  --rp-xhs-border-strong:rgba(255,60,95,.18);
  --rp-xhs-text:#1f2937;
  --rp-xhs-text-soft:#6b7280;
  --rp-xhs-text-faint:#b6bcc8;
  --rp-xhs-accent:#ff2442;
  --rp-xhs-accent-2:#ff6b88;
  --rp-xhs-chip:rgba(255,36,66,.08);
  --rp-xhs-shadow:0 10px 24px rgba(225,70,110,.10);
  --rp-xhs-shadow-2:0 18px 38px rgba(225,70,110,.12);
}
#rp-phone.rp-theme-star{
  --rp-xhs-bg:rgba(18,10,42,.92);
  --rp-xhs-panel:rgba(22,14,54,.80);
  --rp-xhs-card:rgba(27,17,62,.94);
  --rp-xhs-soft:rgba(57,34,120,.34);
  --rp-xhs-border:rgba(167,139,250,.14);
  --rp-xhs-border-strong:rgba(167,139,250,.26);
  --rp-xhs-text:#eee7ff;
  --rp-xhs-text-soft:rgba(218,208,255,.72);
  --rp-xhs-text-faint:rgba(184,167,255,.45);
  --rp-xhs-accent:#a78bfa;
  --rp-xhs-accent-2:#c084fc;
  --rp-xhs-chip:rgba(167,139,250,.14);
  --rp-xhs-shadow:0 10px 28px rgba(7,2,25,.34);
  --rp-xhs-shadow-2:0 18px 42px rgba(6,0,20,.48);
}
#rp-phone.rp-theme-misty{
  --rp-xhs-bg:rgba(234,244,251,.82);
  --rp-xhs-panel:rgba(244,250,255,.74);
  --rp-xhs-card:rgba(248,252,255,.92);
  --rp-xhs-soft:rgba(201,225,243,.28);
  --rp-xhs-border:rgba(74,127,168,.14);
  --rp-xhs-border-strong:rgba(74,127,168,.22);
  --rp-xhs-text:#16324a;
  --rp-xhs-text-soft:rgba(22,50,74,.70);
  --rp-xhs-text-faint:rgba(61,110,154,.45);
  --rp-xhs-accent:#4a7fa8;
  --rp-xhs-accent-2:#7db6d9;
  --rp-xhs-chip:rgba(74,127,168,.10);
  --rp-xhs-shadow:0 10px 26px rgba(80,120,160,.10);
  --rp-xhs-shadow-2:0 18px 36px rgba(80,120,160,.14);
}
#rp-view-xhs,#rp-view-xhs-detail,#rp-view-xhs-compose{flex-direction:column!important;overflow:hidden!important;background:transparent!important;min-height:0!important;height:100%!important}
/* XHS三主题：壁纸穿透，中央区域留白透出边缘壁纸 */
#rp-phone.rp-theme-candy #rp-view-xhs,
#rp-phone.rp-theme-candy #rp-view-xhs-detail,
#rp-phone.rp-theme-candy #rp-view-xhs-compose,
#rp-phone.rp-theme-star  #rp-view-xhs,
#rp-phone.rp-theme-star  #rp-view-xhs-detail,
#rp-phone.rp-theme-star  #rp-view-xhs-compose,
#rp-phone.rp-theme-misty #rp-view-xhs,
#rp-phone.rp-theme-misty #rp-view-xhs-detail,
#rp-phone.rp-theme-misty #rp-view-xhs-compose {
  background: var(--rp-home-wall) !important;
  background-size: cover !important;
  background-position: center !important;
}
#rp-view-xhs .rp-nav-bar,#rp-view-xhs-detail .rp-nav-bar,#rp-view-xhs-compose .rp-nav-bar{flex:0 0 auto!important;background:rgba(255,255,255,.55)!important;border-bottom:1px solid var(--rp-xhs-border)!important;backdrop-filter:blur(18px) saturate(1.4)!important;-webkit-backdrop-filter:blur(18px) saturate(1.4)!important}
#rp-phone.rp-theme-star #rp-view-xhs .rp-nav-bar,
#rp-phone.rp-theme-star #rp-view-xhs-detail .rp-nav-bar,
#rp-phone.rp-theme-star #rp-view-xhs-compose .rp-nav-bar{background:rgba(10,5,32,.55)!important;border-bottom-color:rgba(140,110,255,.2)!important}
#rp-phone.rp-theme-misty #rp-view-xhs .rp-nav-bar,
#rp-phone.rp-theme-misty #rp-view-xhs-detail .rp-nav-bar,
#rp-phone.rp-theme-misty #rp-view-xhs-compose .rp-nav-bar{background:rgba(220,238,255,.55)!important;border-bottom-color:rgba(100,170,220,.18)!important}
#rp-view-xhs .rp-nav-title,#rp-view-xhs-detail .rp-nav-title,#rp-view-xhs-compose .rp-nav-title{color:var(--rp-xhs-text)!important}
#rp-view-xhs .rp-back,#rp-view-xhs-detail .rp-back,#rp-view-xhs-compose .rp-back,#rp-xhs-compose,#rp-xhs-refresh{color:var(--rp-xhs-accent)!important}
#rp-xhs-list{scrollbar-width:none;overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;touch-action:pan-y!important;overscroll-behavior-y:contain!important;padding:8px 0 14px!important}
#rp-xhs-detail-body{scrollbar-width:none;overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;touch-action:pan-y!important;overscroll-behavior-y:contain!important}
#rp-xhs-list::-webkit-scrollbar,#rp-xhs-detail-body::-webkit-scrollbar{display:none}
/* XHS卡片：半透明磨砂玻璃，重要区域遮罩，边缘壁纸透出 */
.rp-xhs-card{background:rgba(255,255,255,.62)!important;backdrop-filter:blur(14px) saturate(1.2)!important;-webkit-backdrop-filter:blur(14px) saturate(1.2)!important;border:none!important;border-bottom:1px solid var(--rp-xhs-border)!important;border-radius:0!important;box-shadow:none!important;padding:12px 14px!important;margin:0 8px!important;border-radius:16px!important;margin-bottom:6px!important;transition:background .12s ease!important}
#rp-phone.rp-theme-star  .rp-xhs-card{background:rgba(14,8,40,.62)!important;backdrop-filter:blur(14px) saturate(1.2)!important;-webkit-backdrop-filter:blur(14px) saturate(1.2)!important}
#rp-phone.rp-theme-misty .rp-xhs-card{background:rgba(225,242,255,.60)!important;backdrop-filter:blur(14px) saturate(1.2)!important;-webkit-backdrop-filter:blur(14px) saturate(1.2)!important}
.rp-xhs-card::before{display:none}
.rp-xhs-card:hover{background:rgba(255,255,255,.72)!important}
#rp-phone.rp-theme-star  .rp-xhs-card:hover{background:rgba(18,10,50,.72)!important}
#rp-phone.rp-theme-misty .rp-xhs-card:hover{background:rgba(225,245,255,.72)!important}
.rp-xhs-card>div:first-child>div:first-child{box-shadow:0 8px 18px rgba(0,0,0,.08)!important}
.rp-xhs-card>div:first-child>div:nth-child(2)>div:first-child,#rp-xhs-detail-body>div:nth-child(5){color:var(--rp-xhs-text)!important}
.rp-xhs-card>div:first-child>div:nth-child(2)>div:nth-child(2){color:var(--rp-xhs-text-faint)!important}
.rp-xhs-card>div:first-child>div:last-child{background:var(--rp-xhs-chip)!important;color:var(--rp-xhs-accent)!important;border:1px solid var(--rp-xhs-border)!important;border-radius:999px!important;padding:2px 7px!important;font-weight:700!important;font-size:9px!important;line-height:1.2!important}
.rp-xhs-card>div:nth-child(2),#rp-xhs-detail-body>div:nth-child(2){color:var(--rp-xhs-text)!important;letter-spacing:.01em!important}
.rp-xhs-card>div:nth-child(3),#rp-xhs-detail-body>div:nth-child(3){color:var(--rp-xhs-text-soft)!important}
.rp-xhs-card>div:last-child{border-top:1px solid var(--rp-xhs-border)!important;padding-top:10px!important;margin-top:10px!important}
.rp-xhs-card>div:last-child>div,#rp-xhs-detail-body>div:nth-child(4)>div,#rp-xhs-detail-body>div:nth-child(4) button{color:var(--rp-xhs-text-faint)!important}
#rp-xhs-detail-body>div:nth-child(4) button[style*="#ff2442"],.rp-xhs-card>div:last-child>div[style*="#ff2442"],.rp-xhs-comment [style*="color:#ff2442"],.rp-xhs-comment [style*="@"]{color:var(--rp-xhs-accent)!important}
#rp-view-xhs-detail{position:relative!important;min-height:0!important}
#rp-xhs-detail-body{flex:1 1 auto!important;min-height:0!important;height:auto!important;overflow-y:auto!important;padding:14px 14px 12px!important;display:block!important}
#rp-xhs-detail-body>div:first-child{background:var(--rp-xhs-panel)!important;border:1px solid var(--rp-xhs-border)!important;border-radius:18px!important;padding:12px!important;box-shadow:var(--rp-xhs-shadow)!important;position:relative!important;overflow:hidden!important}
#rp-xhs-detail-body>div:first-child::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.12),transparent 46%);pointer-events:none}
#rp-xhs-detail-body>div:first-child>div:first-child{font-size:13px!important;font-weight:700!important}

#rp-xhs-detail-body>div:first-child>div:nth-child(1){font-size:12px!important;font-weight:700!important;line-height:1.3!important}
#rp-xhs-detail-body>div:first-child>div:nth-child(2){font-size:10px!important;line-height:1.35!important;color:var(--rp-xhs-text-faint)!important}
#rp-xhs-detail-body>div:nth-child(2){margin:14px 2px 10px!important;font-size:18px!important;font-weight:800!important;line-height:1.42!important;color:var(--rp-xhs-text)!important}
#rp-xhs-detail-body>div:nth-child(3){margin:0 0 12px!important;font-size:13px!important;line-height:1.86!important;background:linear-gradient(180deg,var(--rp-xhs-panel),var(--rp-xhs-card))!important;border:1px solid var(--rp-xhs-border)!important;border-radius:20px!important;padding:15px 14px!important;box-shadow:var(--rp-xhs-shadow)!important;color:var(--rp-xhs-text-soft)!important}
#rp-xhs-detail-body>div:nth-child(4){display:flex!important;align-items:center!important;gap:16px!important;background:linear-gradient(180deg,var(--rp-xhs-panel),var(--rp-xhs-card))!important;border:1px solid var(--rp-xhs-border)!important;border-radius:18px!important;padding:11px 14px!important;box-shadow:var(--rp-xhs-shadow)!important}
#rp-xhs-detail-body>div:nth-child(4) button,#rp-xhs-detail-body>div:nth-child(4)>div{font-size:12px!important;display:inline-flex!important;align-items:center!important;gap:5px!important}
#rp-xhs-detail-body>div:nth-child(5){margin:16px 4px 8px!important;font-size:11.5px!important;font-weight:800!important;letter-spacing:.02em!important;color:var(--rp-xhs-text)!important}
#rp-xhs-comments-list{background:var(--rp-xhs-panel)!important;border:1px solid var(--rp-xhs-border)!important;border-radius:20px!important;padding:2px 14px!important;box-shadow:var(--rp-xhs-shadow)!important}
.rp-xhs-comment{padding:14px 0!important;border-bottom:1px solid var(--rp-xhs-border)!important}
.rp-xhs-comment>div:first-child{min-width:0!important}
.rp-xhs-comment>div:first-child>div:first-child{display:flex!important;align-items:center!important;gap:6px!important;margin-bottom:5px!important}
.rp-xhs-comment>div:first-child>div:nth-child(2){font-size:12px!important;line-height:1.74!important;color:var(--rp-xhs-text-soft)!important}
.rp-xhs-comment [data-reply-cidx]{margin-top:7px!important;color:var(--rp-xhs-accent)!important;background:var(--rp-xhs-chip)!important;border-radius:999px!important;padding:4px 10px!important;display:inline-flex!important}
#rp-xhs-detail-input-bar{flex:0 0 auto!important;background:rgba(255,255,255,.72)!important;border-top:1px solid var(--rp-xhs-border)!important;backdrop-filter:blur(18px) saturate(1.4)!important;-webkit-backdrop-filter:blur(18px) saturate(1.4)!important;padding:8px 12px 10px!important;position:relative!important;z-index:10!important}
#rp-phone.rp-theme-star  #rp-xhs-detail-input-bar{background:rgba(10,5,32,.72)!important;border-top-color:rgba(140,110,255,.2)!important}
#rp-phone.rp-theme-misty #rp-xhs-detail-input-bar{background:rgba(220,240,255,.72)!important;border-top-color:rgba(100,170,220,.2)!important}
#rp-xhs-detail-input,#rp-xhs-post-title,#rp-xhs-post-body{background:var(--rp-xhs-card)!important;border:1px solid var(--rp-xhs-border)!important;color:var(--rp-xhs-text)!important;box-shadow:0 4px 14px rgba(0,0,0,.03)!important}
#rp-xhs-detail-input{border-radius:16px!important;padding:10px 14px!important;line-height:1.55!important;min-height:42px!important}
#rp-xhs-detail-input::placeholder,#rp-xhs-post-title::placeholder,#rp-xhs-post-body::placeholder{color:var(--rp-xhs-text-faint)!important}
#rp-xhs-detail-input:focus,#rp-xhs-post-title:focus,#rp-xhs-post-body:focus{border-color:var(--rp-xhs-border-strong)!important;box-shadow:0 0 0 3px var(--rp-xhs-chip),0 8px 18px rgba(0,0,0,.04)!important;outline:none!important}
#rp-view-xhs-compose{position:relative!important}
#rp-view-xhs-compose .rp-nav-bar{padding-inline:12px!important}
#rp-view-xhs-compose .rp-nav-bar .rp-back{padding:6px 10px!important;border-radius:999px!important;background:var(--rp-xhs-chip)!important;border:1px solid var(--rp-xhs-border)!important}
#rp-view-xhs-compose .rp-nav-bar .rp-nav-title{font-weight:800!important;letter-spacing:.02em!important}
#rp-view-xhs-compose>div:nth-child(2){padding:16px 14px 20px!important;background:transparent!important}
#rp-view-xhs-compose>div:nth-child(2)>div{background:var(--rp-xhs-panel)!important;border:1px solid var(--rp-xhs-border)!important;border-radius:24px!important;padding:16px!important;box-shadow:var(--rp-xhs-shadow-2)!important;position:relative!important;overflow:hidden!important;backdrop-filter:blur(14px) saturate(1.08)!important;-webkit-backdrop-filter:blur(14px) saturate(1.08)!important}
#rp-view-xhs-compose>div:nth-child(2)>div::before{content:"";position:absolute;inset:0 0 auto 0;height:64px;background:linear-gradient(180deg,rgba(255,255,255,.18),transparent);pointer-events:none}
#rp-view-xhs-compose [style*="font-size:11px;color:#999"]{color:var(--rp-xhs-text-soft)!important;font-size:11.5px!important;font-weight:700!important;letter-spacing:.02em!important}
#rp-xhs-post-title{background:var(--rp-xhs-card)!important;border:1px solid var(--rp-xhs-border)!important;border-radius:18px!important;padding:13px 14px!important;margin-bottom:14px!important;font-size:14px!important;font-weight:700!important;box-shadow:0 4px 14px rgba(0,0,0,.03)!important}
#rp-xhs-post-body{background:var(--rp-xhs-card)!important;border:1px solid var(--rp-xhs-border)!important;border-radius:22px!important;padding:14px 14px 18px!important;min-height:180px!important;line-height:1.8!important;box-shadow:0 6px 18px rgba(0,0,0,.04)!important}
#rp-xhs-post-title::placeholder,#rp-xhs-post-body::placeholder{color:var(--rp-xhs-text-faint)!important}
#rp-xhs-post-title:focus,#rp-xhs-post-body:focus{border-color:var(--rp-xhs-border-strong)!important;box-shadow:0 0 0 3px var(--rp-xhs-chip),0 8px 18px rgba(0,0,0,.04)!important;outline:none!important}
#rp-xhs-tag-row{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:5px!important;margin-top:8px!important}
#rp-xhs-detail-send,#rp-xhs-post-btn{background:linear-gradient(135deg,var(--rp-xhs-accent),var(--rp-xhs-accent-2))!important;color:#fff!important;border:none!important;box-shadow:0 8px 18px rgba(0,0,0,.15)!important}
#rp-xhs-post-btn{border-radius:10px!important;padding:4px 12px!important;min-width:0!important;font-weight:600!important;font-size:12px!important;letter-spacing:0!important}
#rp-xhs-detail-send{border-radius:10px!important;padding:5px 14px!important;min-width:0!important;font-weight:600!important;font-size:12px!important}
.rp-xhs-tag-btn{background:var(--rp-xhs-chip,rgba(255,36,66,.06))!important;color:var(--rp-xhs-text,#333)!important;border:1px solid var(--rp-xhs-border)!important;border-radius:999px!important;padding:0 10px!important;height:24px!important;min-height:24px!important;font-size:10.5px!important;line-height:1.2!important;font-weight:500!important;cursor:pointer!important;transition:all .15s!important;font-family:inherit!important;box-shadow:0 3px 10px rgba(0,0,0,.03)!important;width:100%!important;min-width:0!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
.rp-xhs-tag-btn:hover{background:var(--rp-xhs-soft)!important;border-color:var(--rp-xhs-border-strong)!important;transform:translateY(-1px)!important}
.rp-xhs-tag-selected{background:linear-gradient(135deg,var(--rp-xhs-accent),var(--rp-xhs-accent-2)) !important;color:#fff !important;border-color:transparent !important}.rp-xhs-tag-btn.rp-xhs-tag-selected{background:linear-gradient(135deg,var(--rp-xhs-accent),var(--rp-xhs-accent-2)) !important;color:#fff !important;border-color:transparent !important;outline:none !important;box-shadow:0 4px 14px rgba(0,0,0,.2)!important;transform:scale(1.04)!important;font-weight:700!important}
#rp-xhs-loading{background:var(--rp-xhs-panel)!important;border:1px dashed var(--rp-xhs-border)!important;border-radius:16px!important;box-shadow:var(--rp-xhs-shadow)!important;position:relative;overflow:hidden!important;animation:rpXhsLoadingFloat 1.8s ease-in-out infinite}
#rp-xhs-loading::after{content:"";position:absolute;inset:0;background:linear-gradient(100deg,transparent 0%,rgba(255,255,255,.10) 35%,rgba(255,255,255,.42) 50%,rgba(255,255,255,.10) 65%,transparent 100%);transform:translateX(-120%);animation:rpXhsShine 1.5s ease-in-out infinite;pointer-events:none}
#rp-xhs-loading{color:var(--rp-xhs-accent)!important;font-weight:700!important;letter-spacing:.02em!important}
@keyframes rpXhsShine{to{transform:translateX(120%)}}
#rp-phone.rp-theme-star #rp-xhs-detail-input,
#rp-phone.rp-theme-star #rp-xhs-post-title,
#rp-phone.rp-theme-star #rp-xhs-post-body{color:#eee7ff!important;background:rgba(35,22,78,.96)!important;border-color:rgba(167,139,250,.25)!important}
#rp-phone.rp-theme-star .rp-xhs-tag-btn{background:rgba(60,35,120,.85)!important;color:#d4bbff!important;border-color:rgba(167,139,250,.3)!important}
#rp-phone.rp-theme-star .rp-xhs-tag-btn.rp-xhs-tag-selected{background:linear-gradient(135deg,#a78bfa,#c084fc)!important;color:#fff!important;border-color:transparent!important;box-shadow:0 4px 14px rgba(167,139,250,.45)!important}
#rp-phone.rp-theme-misty .rp-xhs-tag-btn{background:rgba(210,232,248,.7)!important;color:#16324a!important;border-color:rgba(74,127,168,.22)!important}
#rp-phone.rp-theme-misty .rp-xhs-tag-btn.rp-xhs-tag-selected{background:linear-gradient(135deg,#4a7fa8,#7db6d9)!important;color:#fff!important;border-color:transparent!important}
#rp-phone.rp-theme-star #rp-xhs-detail-input::placeholder,
#rp-phone.rp-theme-star #rp-xhs-post-title::placeholder,
#rp-phone.rp-theme-star #rp-xhs-post-body::placeholder{color:rgba(210,195,255,.55)!important}
#rp-phone.rp-theme-misty #rp-xhs-detail-input,
#rp-phone.rp-theme-misty #rp-xhs-post-title,
#rp-phone.rp-theme-misty #rp-xhs-post-body{color:#16324a!important;background:rgba(242,251,255,.97)!important;border-color:rgba(74,127,168,.2)!important}
#rp-phone.rp-theme-misty #rp-xhs-detail-input::placeholder,
#rp-phone.rp-theme-misty #rp-xhs-post-title::placeholder,
#rp-phone.rp-theme-misty #rp-xhs-post-body::placeholder{color:rgba(74,127,168,.5)!important}
@keyframes rpXhsLoadingFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
/* ── MOMENT IMAGE ── */
.rp-moment-img-wrap{margin-bottom:10px;border-radius:8px;overflow:hidden;max-width:180px}
.rp-moment-img{width:100%;display:block;border-radius:8px}
/* ── Moments generate button ── */
#rp-gen-moments {
  background: none !important; border: none !important;
  color: var(--rp-nav-btn) !important;
  cursor: pointer !important; padding: 2px 4px !important;
  display: inline-flex !important; align-items: center !important;
  justify-content: center !important; border-radius: 6px !important;
  transition: transform .25s, opacity .2s !important;
  visibility: visible !important; opacity: 1 !important;
  pointer-events: auto !important;
}
#rp-gen-moments:hover { transform: rotate(180deg) !important; }
#rp-gen-moments:disabled { opacity: .35 !important; cursor: default !important; transform: none !important; }
#rp-gen-moments.rp-spinning { animation: rpSpin .7s linear infinite !important; }
@keyframes rpSpin { to { transform: rotate(360deg); } }
.rp-moment-likes-row { font-size: 11px; color: rgba(160,30,65,.88); padding: 2px 0 4px; line-height: 1.4; }
.rp-dark .rp-moment-likes-row { color: rgba(200,190,255,.45); }
/* ── MOMENTS send button fix ── */
.rp-moment-input-row{display:flex;gap:6px;margin-top:8px;padding-top:6px;border-top:1px solid rgba(0,0,0,.06);align-items:center}
.rp-dark .rp-moment-input-row{border-top-color:rgba(255,255,255,.06)}
.rp-moment-cinput{flex:1;min-width:0;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.1);border-radius:8px;padding:6px 10px;font-size:12.5px;color:#1a1a1a;font-family:inherit;outline:none}
.rp-dark .rp-moment-cinput{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#d5d8f0}
.rp-moment-csend{flex-shrink:0;background:#2563eb !important;color:#fff !important;border:none !important;border-radius:8px !important;padding:6px 12px !important;font-size:12px !important;font-weight:700 !important;cursor:pointer !important;font-family:inherit !important;display:inline-flex !important;align-items:center !important;visibility:visible !important;opacity:1 !important;pointer-events:auto !important}
.rp-moment-csend:hover{opacity:.85 !important}

/* ══════════════════════════════════════════════════════════
   🎨 THEME STUDIO - AI 自定义主题工作室
   ══════════════════════════════════════════════════════════ */
#rp-view-theme-studio {
  background: transparent;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
/* 主题工作室：壁纸背景 */
#rp-phone.rp-theme-candy  #rp-view-theme-studio,
#rp-phone.rp-theme-star   #rp-view-theme-studio,
#rp-phone.rp-theme-misty  #rp-view-theme-studio {
  background: var(--rp-home-wall) !important;
  background-size: cover !important;
  background-position: center !important;
}
/* 对话区 */
#rp-ts-bubbles {
  flex: 1;
  overflow-y: auto;
  padding: 12px 10px 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scrollbar-width: none;
}
#rp-ts-bubbles::-webkit-scrollbar { display: none; }

/* 欢迎卡片 */
.rp-ts-welcome {
  background: rgba(255,255,255,.62);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,.7);
  border-radius: 18px;
  padding: 14px 16px;
  font-size: 13px;
  color: #3a1030;
  line-height: 1.65;
  box-shadow: 0 4px 20px rgba(0,0,0,.08);
}
#rp-phone.rp-theme-star .rp-ts-welcome {
  background: rgba(14,8,40,.78) !important;
  border-color: rgba(140,110,255,.28) !important;
  color: #d4c8ff !important;
}
#rp-phone.rp-theme-misty .rp-ts-welcome {
  background: rgba(225,242,255,.72) !important;
  border-color: rgba(100,170,220,.3) !important;
  color: #0e1f30 !important;
}
.rp-ts-welcome-title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 6px;
}
.rp-ts-welcome-hint {
  font-size: 11px;
  opacity: .55;
  margin-top: 6px;
}

/* 快捷模板按钮区 */
.rp-ts-tpls {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}
.rp-ts-tpl-btn {
  font-size: 11px !important;
  padding: 5px 11px !important;
  border-radius: 14px !important;
  border: 1px solid rgba(200,100,140,.28) !important;
  background: rgba(255,255,255,.5) !important;
  color: #8a1840 !important;
  cursor: pointer !important;
  font-family: inherit !important;
  font-weight: 600 !important;
  transition: background .12s, transform .1s !important;
  white-space: nowrap !important;
  display: inline-flex !important;
  align-items: center !important;
  visibility: visible !important;
  opacity: 1 !important;
  pointer-events: auto !important;
  box-shadow: none !important;
  outline: none !important;
}
.rp-ts-tpl-btn:active { transform: scale(.93) !important; }
#rp-phone.rp-theme-star .rp-ts-tpl-btn {
  background: rgba(60,30,120,.55) !important;
  border-color: rgba(140,100,255,.45) !important;
  color: #d4c8ff !important;
}
#rp-phone.rp-theme-misty .rp-ts-tpl-btn {
  background: rgba(210,232,248,.6) !important;
  border-color: rgba(80,150,210,.3) !important;
  color: #1a3050 !important;
}

/* 气泡：AI 回复 */
.rp-ts-bubble-ai {
  max-width: 88%;
  align-self: flex-start;
  background: rgba(255,255,255,.68);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,.7);
  border-radius: 16px 16px 16px 4px;
  padding: 10px 13px;
  font-size: 13px;
  color: #2a0a1a;
  line-height: 1.55;
  box-shadow: 0 3px 14px rgba(0,0,0,.08);
}
#rp-phone.rp-theme-star .rp-ts-bubble-ai {
  background: rgba(18,10,48,.82) !important;
  border-color: rgba(130,90,255,.25) !important;
  color: #ddd4ff !important;
}
#rp-phone.rp-theme-misty .rp-ts-bubble-ai {
  background: rgba(228,244,255,.78) !important;
  border-color: rgba(100,165,215,.25) !important;
  color: #0e2035 !important;
}

/* 气泡：用户消息 */
.rp-ts-bubble-user {
  max-width: 80%;
  align-self: flex-end;
  background: var(--rp-sent-bg, #2563eb);
  border-radius: 16px 16px 4px 16px;
  padding: 9px 13px;
  font-size: 13px;
  color: #fff;
  line-height: 1.5;
}

/* CSS 应用成功提示条 */
.rp-ts-applied {
  align-self: center;
  font-size: 11px;
  font-weight: 600;
  background: rgba(34,197,94,.15);
  border: 1px solid rgba(34,197,94,.35);
  border-radius: 12px;
  padding: 4px 12px;
  color: #166534;
}
#rp-phone.rp-theme-star .rp-ts-applied {
  background: rgba(22,101,52,.3) !important;
  color: #86efac !important;
  border-color: rgba(34,197,94,.4) !important;
}

/* 打字动画指示器 */
.rp-ts-typing {
  align-self: flex-start;
  background: rgba(255,255,255,.55);
  border-radius: 12px;
  padding: 8px 14px;
  display: flex;
  gap: 4px;
  align-items: center;
}
.rp-ts-typing span {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: rgba(160,60,100,.5);
  animation: rp-ts-dot 1.2s ease-in-out infinite;
  display: inline-block;
}
.rp-ts-typing span:nth-child(2) { animation-delay: .2s; }
.rp-ts-typing span:nth-child(3) { animation-delay: .4s; }
@keyframes rp-ts-dot {
  0%,80%,100% { transform: scale(.6); opacity:.4; }
  40% { transform: scale(1); opacity:1; }
}
#rp-phone.rp-theme-star .rp-ts-typing {
  background: rgba(18,10,48,.7) !important;
}
#rp-phone.rp-theme-star .rp-ts-typing span {
  background: rgba(160,130,255,.6) !important;
}
#rp-phone.rp-theme-misty .rp-ts-typing {
  background: rgba(220,240,255,.6) !important;
}

/* 底部输入区 */
#rp-ts-composer {
  display: flex !important;
  align-items: flex-end !important;
  gap: 7px !important;
  padding: 8px 10px 20px !important;
  border-top: 1px solid rgba(255,255,255,.2) !important;
  flex-shrink: 0 !important;
  background: rgba(255,255,255,.45) !important;
  backdrop-filter: blur(16px) !important;
}
#rp-phone.rp-theme-star #rp-ts-composer {
  background: rgba(8,4,26,.72) !important;
  border-top-color: rgba(130,90,255,.18) !important;
}
#rp-phone.rp-theme-misty #rp-ts-composer {
  background: rgba(220,240,255,.55) !important;
  border-top-color: rgba(100,165,215,.2) !important;
}
/* textarea 自动撑高，仅限 theme-studio */
#rp-ts-input {
  flex: 1 !important;
  background: rgba(255,255,255,.7) !important;
  border: 1px solid rgba(0,0,0,.12) !important;
  border-radius: 14px !important;
  padding: 8px 12px !important;
  color: #1a1a2e !important;
  font-size: 13px !important;
  line-height: 1.5 !important;
  outline: none !important;
  font-family: inherit !important;
  min-width: 0 !important;
  box-sizing: border-box !important;
  resize: none !important;
  overflow: hidden !important;
  min-height: 36px !important;
  max-height: 110px !important;
  overflow-y: auto !important;
  display: block !important;
  scrollbar-width: none !important;
}
#rp-ts-input::-webkit-scrollbar { display: none !important; }
#rp-ts-input::placeholder { color: rgba(60,20,40,.38); }
#rp-phone.rp-theme-star #rp-ts-input {
  background: rgba(25,14,58,.75) !important;
  border-color: rgba(130,90,255,.35) !important;
  color: #e0d8ff !important;
}
#rp-phone.rp-theme-star #rp-ts-input::placeholder { color: rgba(180,165,255,.4) !important; }
#rp-phone.rp-theme-misty #rp-ts-input {
  background: rgba(240,250,255,.82) !important;
  border-color: rgba(100,165,215,.3) !important;
  color: #0e2035 !important;
}
/* 发送按钮 */
#rp-ts-send {
  width: 34px !important; height: 34px !important;
  min-width: 34px !important; border-radius: 50% !important;
  background: var(--rp-send-bg, linear-gradient(135deg,#e0567a,#f472b6)) !important;
  border: none !important; color: #fff !important;
  font-size: 16px !important; font-weight: 700 !important;
  cursor: pointer !important;
  display: flex !important; align-items: center !important;
  justify-content: center !important; flex-shrink: 0 !important;
  transition: transform .12s, opacity .15s !important;
  visibility: visible !important; opacity: 1 !important;
  pointer-events: auto !important; padding: 0 !important;
  outline: none !important;
}
#rp-ts-send:hover { opacity: .88 !important; transform: scale(1.06) !important; }
#rp-ts-send:disabled { opacity: .4 !important; cursor: default !important; }
/* 提示文字闪烁 */
#rp-ts-tip {
  font-size: 10.5px;
  font-weight: 600;
  text-align: center;
  padding: 5px 14px 3px;
  flex-shrink: 0;
  color: #9a1840;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff, 0 0 6px rgba(255,255,255,.8);
  animation: rp-ts-tip-blink 2.4s ease-in-out infinite;
  letter-spacing: .01em;
  line-height: 1.4;
}
#rp-phone.rp-theme-star #rp-ts-tip {
  color: #e8d8ff;
  text-shadow: -1px -1px 0 rgba(20,0,60,.9), 1px -1px 0 rgba(20,0,60,.9), -1px 1px 0 rgba(20,0,60,.9), 1px 1px 0 rgba(20,0,60,.9), 0 0 8px rgba(100,50,200,.6);
}
#rp-phone.rp-theme-misty #rp-ts-tip {
  color: #002a5c;
  text-shadow: -1px -1px 0 rgba(255,255,255,.95), 1px -1px 0 rgba(255,255,255,.95), -1px 1px 0 rgba(255,255,255,.95), 1px 1px 0 rgba(255,255,255,.95);
}
@keyframes rp-ts-tip-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: .45; }
}
/* 回退按钮 */
#rp-ts-undo {
  width: 30px !important; height: 30px !important;
  min-width: 30px !important; border-radius: 50% !important;
  background: rgba(0,0,0,.07) !important;
  border: 1px solid rgba(0,0,0,.1) !important;
  color: #5a2040 !important;
  font-size: 14px !important; cursor: pointer !important;
  display: flex !important; align-items: center !important;
  justify-content: center !important; flex-shrink: 0 !important;
  transition: opacity .15s !important;
  visibility: visible !important; opacity: 1 !important;
  pointer-events: auto !important; padding: 0 !important;
  outline: none !important; box-shadow: none !important;
}
#rp-ts-undo:disabled { opacity: .35 !important; cursor: default !important; }
#rp-phone.rp-theme-star #rp-ts-undo {
  background: rgba(50,25,100,.55) !important;
  border-color: rgba(140,100,255,.35) !important;
  color: #c8b8ff !important;
}
#rp-phone.rp-theme-misty #rp-ts-undo {
  background: rgba(210,232,248,.5) !important;
  border-color: rgba(80,150,210,.25) !important;
  color: #1a3050 !important;
}
/* ── 工作室操作按钮栏 ── */
#rp-ts-action-bar {
  display: none;
  gap: 8px !important;
  padding: 5px 10px 3px !important;
  flex-shrink: 0 !important;
}
.rp-ts-action-btn {
  flex: 1 !important;
  padding: 6px 2px !important;
  border-radius: 14px !important;
  border: none !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  font-family: inherit !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 3px !important;
  visibility: visible !important;
  opacity: 1 !important;
  pointer-events: auto !important;
  transition: opacity .18s, transform .12s, box-shadow .18s !important;
  white-space: nowrap !important;
  letter-spacing: .1px !important;
  position: relative !important;
  overflow: hidden !important;
}
.rp-ts-action-btn::before {
  content: '' !important;
  position: absolute !important; inset: 0 !important;
  background: rgba(255,255,255,.12) !important;
  opacity: 0 !important;
  transition: opacity .15s !important;
  pointer-events: none !important;
}
.rp-ts-action-btn:hover::before { opacity: 1 !important; }
.rp-ts-action-btn:active { transform: scale(.93) !important; }
/* ── 回到上一版：玻璃磨砂卡 ── */
.rp-ts-undo-btn {
  background: rgba(255,255,255,.52) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  color: #7a1840 !important;
  border: 1.5px solid rgba(220,130,165,.35) !important;
  box-shadow: 0 3px 14px rgba(200,80,120,.12), inset 0 1px 0 rgba(255,255,255,.6) !important;
}
/* ── 保存本次方案：玫瑰渐变卡 ── */
.rp-ts-save-btn {
  background: linear-gradient(135deg, #d94b78 0%, #f06298 50%, #f896b8 100%) !important;
  color: #fff !important;
  border: 1.5px solid rgba(255,255,255,.28) !important;
  box-shadow: 0 4px 16px rgba(210,70,110,.40), inset 0 1px 0 rgba(255,255,255,.3) !important;
  text-shadow: 0 1px 3px rgba(140,20,60,.3) !important;
}
/* ── Star 主题 ── */
#rp-phone.rp-theme-star .rp-ts-undo-btn {
  background: rgba(28,12,72,.68) !important;
  backdrop-filter: blur(14px) !important;
  -webkit-backdrop-filter: blur(14px) !important;
  border-color: rgba(150,110,255,.5) !important;
  color: #d4c8ff !important;
  box-shadow: 0 3px 14px rgba(80,30,200,.25), inset 0 1px 0 rgba(160,130,255,.18) !important;
}
#rp-phone.rp-theme-star .rp-ts-save-btn {
  background: linear-gradient(135deg, #5b16cc 0%, #8b3af5 50%, #b06aff 100%) !important;
  border-color: rgba(255,255,255,.22) !important;
  box-shadow: 0 4px 18px rgba(120,50,240,.5), inset 0 1px 0 rgba(220,190,255,.25) !important;
}
/* ── Misty 主题 ── */
#rp-phone.rp-theme-misty .rp-ts-undo-btn {
  background: rgba(230,244,255,.62) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border-color: rgba(100,165,210,.38) !important;
  color: #1a3a5a !important;
  box-shadow: 0 3px 14px rgba(60,120,180,.12), inset 0 1px 0 rgba(255,255,255,.7) !important;
}
#rp-phone.rp-theme-misty .rp-ts-save-btn {
  background: linear-gradient(135deg, #1878b8 0%, #3aabdf 50%, #6ac8f0 100%) !important;
  border-color: rgba(255,255,255,.3) !important;
  box-shadow: 0 4px 16px rgba(30,120,200,.4), inset 0 1px 0 rgba(255,255,255,.3) !important;
}
/* 保存成功提示 */
.rp-ts-saved-toast {
  align-self: center;
  font-size: 11px;
  font-weight: 600;
  background: rgba(34,197,94,.15);
  border: 1px solid rgba(34,197,94,.35);
  border-radius: 12px;
  padding: 4px 12px;
  color: #166534;
}
/* ── 主题选择页：已保存方案区 ── */
#rp-saved-section {
  margin-top: 18px;
}
#rp-saved-section-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--rp-themes-label);
  text-align: center;
  margin-bottom: 10px;
  opacity: .75;
  letter-spacing: .4px;
}
#rp-saved-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.rp-saved-card {
  background: var(--rp-tc-bg);
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(100,60,200,.1);
  transition: transform .15s, box-shadow .15s;
  position: relative;
}
.rp-saved-card:active { transform: scale(.94); }
.rp-saved-card.rp-tc-active { box-shadow: 0 0 0 2.5px #a855f7, 0 3px 14px rgba(130,60,200,.25); }
.rp-saved-card-preview {
  height: 72px;
  position: relative;
  overflow: hidden;
}
.rp-saved-card-info {
  padding: 7px 10px 10px;
}
.rp-saved-card-name {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--rp-nav-title);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rp-saved-card-time {
  font-size: 10px;
  color: var(--rp-tp-color);
  opacity: .7;
}
.rp-saved-card-del {
  position: absolute !important;
  top: 5px !important; right: 6px !important;
  width: 18px !important; height: 18px !important;
  border-radius: 50% !important;
  background: rgba(0,0,0,.28) !important;
  border: none !important;
  color: #fff !important;
  font-size: 10px !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  line-height: 1 !important;
  padding: 0 !important;
  visibility: visible !important;
  opacity: 1 !important;
  pointer-events: auto !important;
  z-index: 10 !important;
}
/* 已保存方案：操作按钮栏（编辑名称 + 删除） */
.rp-saved-card-actions {
  display: flex;
  gap: 4px;
  padding: 4px 6px 7px;
}
.rp-saved-card-act-btn {
  flex: 1 !important;
  padding: 5px 4px !important;
  border-radius: 8px !important;
  border: none !important;
  font-size: 10px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  font-family: inherit !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 2px !important;
  min-width: 0 !important;
  min-height: 26px !important;
  overflow: hidden !important;
  transition: opacity .15s, transform .1s !important;
  visibility: visible !important;
  opacity: 1 !important;
  pointer-events: auto !important;
  white-space: nowrap !important;
}
.rp-saved-card-act-btn:active { transform: scale(.92) !important; }
.rp-saved-card-rename-btn {
  background: rgba(255,255,255,.65) !important;
  color: #5a1030 !important;
  border: 1px solid rgba(200,120,160,.25) !important;
}
.rp-saved-card-delete-btn {
  background: rgba(239,68,68,.1) !important;
  color: #b91c1c !important;
  border: 1px solid rgba(239,68,68,.22) !important;
}
/* Star/Misty主题下操作按钮适配 */
#rp-phone.rp-theme-star .rp-saved-card-rename-btn {
  background: rgba(60,30,120,.55) !important;
  color: #d4c8ff !important;
  border-color: rgba(140,100,255,.4) !important;
}
#rp-phone.rp-theme-star .rp-saved-card-delete-btn {
  background: rgba(127,29,29,.35) !important;
  color: #fca5a5 !important;
  border-color: rgba(239,68,68,.3) !important;
}
#rp-phone.rp-theme-misty .rp-saved-card-rename-btn {
  background: rgba(210,232,248,.6) !important;
  color: #1a3050 !important;
  border-color: rgba(80,150,210,.28) !important;
}
#rp-phone.rp-theme-misty .rp-saved-card-delete-btn {
  background: rgba(254,226,226,.5) !important;
  color: #7f1d1d !important;
  border-color: rgba(239,68,68,.22) !important;
}
/* 确认按钮（改名模式） */
.rp-saved-card-confirm-btn {
  background: linear-gradient(135deg,#a855f7,#7c3aed) !important;
  color: #fff !important;
  border: none !important;
}
#rp-phone.rp-theme-misty .rp-saved-card-confirm-btn {
  background: linear-gradient(135deg,#0ea5e9,#2d6d9a) !important;
}
/* 内联重命名输入框 */
.rp-saved-card-name-input {
  width: 100% !important;
  box-sizing: border-box !important;
  border: 1.5px solid rgba(168,85,247,.45) !important;
  border-radius: 7px !important;
  padding: 3px 7px !important;
  font-size: 11.5px !important;
  font-weight: 600 !important;
  font-family: inherit !important;
  outline: none !important;
  background: rgba(255,255,255,.88) !important;
  color: #3a1060 !important;
}
#rp-phone.rp-theme-star .rp-saved-card-name-input {
  background: rgba(30,14,72,.82) !important;
  border-color: rgba(160,120,255,.5) !important;
  color: #e0d8ff !important;
}
#rp-phone.rp-theme-misty .rp-saved-card-name-input {
  background: rgba(240,250,255,.9) !important;
  border-color: rgba(80,150,210,.45) !important;
  color: #1a3050 !important;
}
#rp-phone.rp-theme-star .rp-saved-card { background: rgba(20,14,55,.9); border: 1px solid rgba(130,90,255,.3); }
#rp-phone.rp-theme-star .rp-saved-card-name { color: #e0d8ff; }
#rp-phone.rp-theme-misty .rp-saved-card { background: rgba(240,248,255,.88); border: 1px solid rgba(130,175,215,.25); }
#rp-phone.rp-theme-misty .rp-saved-card-name { color: #1a2e44; }
/* 自定义主题卡片激活状态 */
.rp-theme-card[data-tid="custom"].rp-tc-active {
  box-shadow: 0 0 0 2.5px #ec4899, 0 3px 14px rgba(200,60,130,.25) !important;
}
/* 自定义主题预览背景 */
.rp-ts-custom-preview {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  font-size: 28px;
  background: linear-gradient(135deg, #fce4ec, #f8bbd0, #e1bee7);
}
/* 小手机内的自定义 CSS 注入标签 */
#rp-custom-theme-style { /* managed by JS */ }

/* ── INCOMING CALL OVERLAY ── */
#rp-call-overlay{position:absolute;top:0;right:0;bottom:0;left:0;z-index:800;background:linear-gradient(180deg,#0d0d1a,#1a1a2e);display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:60px 20px 50px}
.rp-call-av{width:88px;height:88px;border-radius:44px;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:700;color:#fff;margin-bottom:14px;animation:rp-cpulse 1.8s ease-in-out infinite}
@keyframes rp-cpulse{0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,.08),0 0 0 14px rgba(255,255,255,.04)}60%{box-shadow:0 0 0 14px rgba(255,255,255,.1),0 0 0 28px rgba(255,255,255,.04)}}
.rp-call-name{font-size:24px;font-weight:700;color:#fff;letter-spacing:.01em;text-align:center}
.rp-call-sub{font-size:13px;color:rgba(255,255,255,.45);margin-top:6px;text-align:center}
.rp-call-btns{display:flex;gap:56px;align-items:flex-start}
.rp-call-btn-wrap{display:flex;flex-direction:column;align-items:center;gap:8px}
.rp-call-dec{width:64px;height:64px;border-radius:32px;background:#e53935;display:flex;align-items:center;justify-content:center;font-size:26px;cursor:pointer;box-shadow:0 6px 24px rgba(229,57,53,.45);transition:transform .15s}
.rp-call-dec:active{transform:scale(.92)}
.rp-call-ans{width:64px;height:64px;border-radius:32px;background:#43a047;display:flex;align-items:center;justify-content:center;font-size:26px;cursor:pointer;box-shadow:0 6px 24px rgba(67,160,71,.45);transition:transform .15s}
.rp-call-ans:active{transform:scale(.92)}
.rp-call-lbl{font-size:11px;color:rgba(255,255,255,.45)}
/* ── CALL RECORD ── */
.rp-sys-msg{display:flex;justify-content:center;margin:8px 0}
.rp-call-rec{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;background:rgba(0,0,0,.04);color:rgba(0,0,0,.4)}
.rp-dark .rp-call-rec{background:rgba(255,255,255,.06);color:rgba(255,255,255,.35)}
.rp-call-rec.missed{color:#e53935;background:rgba(229,57,53,.07)}
/* ── HONGBAO ── */
.rp-hongbao{background:linear-gradient(145deg,#c62828,#b71c1c);border-radius:16px;overflow:hidden;cursor:pointer;box-shadow:0 4px 20px rgba(183,28,28,.4);width:200px;user-select:none;transition:opacity .2s}
.rp-hb-top{padding:14px 16px 12px;display:flex;align-items:center;gap:12px}
.rp-hb-ico{width:44px;height:44px;border-radius:22px;background:rgba(255,213,79,.18);border:1.5px solid rgba(255,213,79,.4);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.rp-hb-info{flex:1;min-width:0}
.rp-hb-from{font-size:13px;font-weight:700;color:#fff;margin-bottom:3px}
.rp-hb-note{font-size:11.5px;color:rgba(255,255,255,.65);line-height:1.35}
.rp-hb-bot{background:rgba(0,0,0,.22);padding:9px 16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:4px}
.rp-hb-action{font-size:13px;font-weight:700;color:#ffd54f;letter-spacing:.02em}
.rp-hb-tag{font-size:10.5px;color:rgba(255,213,79,.5)}
.rp-hongbao.opened{cursor:default}
.rp-hongbao.opened .rp-hb-top{background:rgba(0,0,0,.1)}
.rp-hb-amount{font-size:26px;font-weight:900;color:#ffd54f;text-align:center;padding:6px 0 2px;letter-spacing:.02em;width:100%}
.rp-hb-amount small{font-size:14px;font-weight:600}
/* ── VOICE MESSAGE ── */
.rp-voice-wrap{display:flex;flex-direction:column;gap:0}
.rp-voice-bbl{display:flex;align-items:center;gap:10px;padding:10px 14px;background:rgba(0,0,0,.05);border-radius:14px;cursor:pointer;min-width:150px;transition:background .15s}
.rp-dark .rp-voice-bbl{background:rgba(255,255,255,.07)}
.rp-voice-bbl:active{background:rgba(0,0,0,.09)}
.rp-voice-play{width:30px;height:30px;border-radius:15px;background:#2563eb;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px;color:#fff;transition:background .2s}
.rp-voice-bbl.played .rp-voice-play{background:#94a3b8}
.rp-wave{flex:1;display:flex;align-items:center;gap:2px;height:22px}
.rp-wb{width:3px;border-radius:2px;background:rgba(37,99,235,.65)}
.rp-voice-bbl:not(.played) .rp-wb{animation:rp-wv 1.3s ease-in-out infinite}
.rp-voice-bbl.played .rp-wb{animation:none;opacity:.3}
@keyframes rp-wv{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}
.rp-wb:nth-child(2){animation-delay:.07s}.rp-wb:nth-child(3){animation-delay:.14s}.rp-wb:nth-child(4){animation-delay:.21s}.rp-wb:nth-child(5){animation-delay:.28s}.rp-wb:nth-child(6){animation-delay:.14s}.rp-wb:nth-child(7){animation-delay:.07s}
.rp-voice-dur{font-size:11.5px;color:rgba(0,0,0,.4);flex-shrink:0}
.rp-dark .rp-voice-dur{color:rgba(255,255,255,.35)}
.rp-voice-txt{font-size:13px;color:#333;line-height:1.65;padding:8px 14px 2px;display:none}
.rp-dark .rp-voice-txt{color:#c8cce8}
.rp-voice-bbl.played~.rp-voice-txt{display:block}
/* ── GROUP CHAT ── */
.rp-bwrap.rp-in.rp-grp{flex-direction:row;align-items:flex-start;gap:8px}
.rp-bwrap.rp-out.rp-grp{flex-direction:row-reverse;align-items:flex-start;gap:8px}
.rp-bwrap.rp-grp>div:not(.rp-grp-av){flex:1;min-width:0}
.rp-bwrap.rp-grp .rp-bubble{max-width:100%}
.rp-bwrap.rp-out.rp-grp>div:not(.rp-grp-av){display:flex;flex-direction:column;align-items:flex-end}
.rp-grp-sender{font-size:11px;font-weight:700;color:rgba(0,0,0,.45);margin-bottom:3px}
.rp-dark .rp-grp-sender{color:rgba(255,255,255,.4)}
.rp-grp-av{width:34px;height:34px;border-radius:17px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0;margin-top:2px;overflow:hidden}

/* ── ATTACH PANEL ── */
#rp-attach-btn{width:30px;height:30px;border-radius:15px;background:rgba(0,0,0,.07);border:none;font-size:18px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#555;transition:background .15s}
#rp-attach-btn:active{background:rgba(0,0,0,.13)}
.rp-dark #rp-attach-btn{background:rgba(255,255,255,.1);color:#c8cce8}
#rp-attach-panel{position:absolute;bottom:100%;left:0;right:0;background:#fff;border-top:1px solid rgba(0,0,0,.08);padding:6px 0 10px;z-index:50;display:none}
.rp-dark #rp-attach-panel{background:#111128;border-top-color:rgba(255,255,255,.07)}
.rp-attach-row{display:grid;grid-template-columns:repeat(3,1fr);gap:0;padding:4px 0}
.rp-attach-item{display:flex;flex-direction:column;align-items:center;gap:7px;padding:14px 8px;cursor:pointer;font-size:12px;color:#555;font-weight:500}
.rp-dark .rp-attach-item{color:#9aa0c0}
.rp-attach-item:active{background:rgba(0,0,0,.04)}
.rp-attach-ico{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;background:rgba(0,0,0,.05)}
.rp-dark .rp-attach-ico{background:rgba(255,255,255,.07)}
.rp-hb-modal{position:absolute;top:0;right:0;bottom:0;left:0;z-index:600;background:rgba(0,0,0,.45);display:flex;align-items:flex-end}
.rp-hb-sheet{background:#fff;border-radius:18px 18px 0 0;padding:20px 20px 32px;width:100%;box-sizing:border-box}
.rp-dark .rp-hb-sheet{background:#13132a}
.rp-hb-sheet h3{margin:0 0 16px;font-size:16px;font-weight:700;color:#222;text-align:center}
.rp-dark .rp-hb-sheet h3{color:#e0e4ff}
.rp-hb-sheet input{width:100%;box-sizing:border-box;border:1px solid rgba(0,0,0,.12);border-radius:10px;padding:10px 14px;font-size:14px;outline:none;margin-bottom:10px;background:#fafafa}
.rp-dark .rp-hb-sheet input{background:#1c1c38;border-color:rgba(255,255,255,.1);color:#dde0f2}
.rp-hb-send-btn{width:100%;padding:12px;background:#c62828;color:#ffd54f;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer}
.rp-hb-cancel-btn{width:100%;padding:10px;background:none;color:rgba(0,0,0,.4);border:none;font-size:13px;cursor:pointer;margin-top:4px}
.rp-dark .rp-hb-cancel-btn{color:rgba(255,255,255,.3)}
.rp-loc-modal{position:absolute;top:0;right:0;bottom:0;left:0;z-index:600;background:rgba(0,0,0,.45);display:flex;align-items:flex-end}
.rp-loc-sheet{background:#fff;border-radius:18px 18px 0 0;padding:20px 20px 32px;width:100%;box-sizing:border-box}
.rp-dark .rp-loc-sheet{background:#13132a}
.rp-loc-sheet h3{margin:0 0 16px;font-size:16px;font-weight:700;color:#222;text-align:center}
.rp-dark .rp-loc-sheet h3{color:#e0e4ff}
.rp-loc-sheet input{width:100%;box-sizing:border-box;border:1px solid rgba(0,0,0,.12);border-radius:10px;padding:10px 14px;font-size:14px;outline:none;margin-bottom:10px;background:#fafafa}
.rp-dark .rp-loc-sheet input{background:#1c1c38;border-color:rgba(255,255,255,.1);color:#dde0f2}
.rp-loc-send-btn{width:100%;padding:12px;background:#2e7d32;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:8px}
.rp-loc-cancel-btn{width:100%;padding:10px;background:none;color:rgba(0,0,0,.4);border:none;font-size:13px;cursor:pointer;margin-top:4px}
.rp-dark .rp-loc-cancel-btn{color:rgba(255,255,255,.3)}
.rp-loc-card{display:flex;align-items:center;gap:10px;padding:10px 14px;background:rgba(0,0,0,.04);border-radius:12px;max-width:220px}
.rp-dark .rp-loc-card{background:rgba(255,255,255,.06)}
.rp-loc-ico{font-size:22px;flex-shrink:0}
.rp-loc-txt{font-size:13px;color:#333;font-weight:500}
.rp-dark .rp-loc-txt{color:#c8cce8}
.rp-img-bbl{max-width:180px;border-radius:12px;overflow:hidden}
.rp-img-bbl img{width:100%;display:block}
/* ── ADD CHOICE ── */
.rp-add-choice{position:absolute;top:0;right:0;bottom:0;left:0;z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,.35);gap:10px}
.rp-add-choice-box{background:#fff;border-radius:16px;overflow:hidden;width:80%;max-width:240px;box-shadow:0 8px 32px rgba(0,0,0,.2)}
.rp-dark .rp-add-choice-box{background:#1c1c38}
.rp-add-choice-item{padding:16px 20px;font-size:15px;font-weight:600;color:#222;cursor:pointer;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(0,0,0,.06)}
.rp-dark .rp-add-choice-item{color:#e0e4ff;border-bottom-color:rgba(255,255,255,.06)}
.rp-add-choice-item:last-child{border-bottom:none}
.rp-add-choice-item:active{background:rgba(0,0,0,.04)}
.rp-add-choice-delete{color:#ef4444!important}#rp-del-picker{flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important;gap:0!important;background:transparent;overflow:hidden}#rp-del-picker::before{content:"";position:absolute;inset:-40px;z-index:0;background-image:var(--rp-home-wall);background-size:cover;background-position:center;filter:blur(28px) saturate(1.3) brightness(1.04)}#rp-del-picker::after{content:"";position:absolute;inset:0;z-index:1;background:rgba(255,245,250,.68)}#rp-del-picker > *{position:relative;z-index:2}#rp-del-picker .rp-nav-bar{background:rgba(255,255,255,.55)!important;backdrop-filter:blur(18px) saturate(1.5)!important;-webkit-backdrop-filter:blur(18px) saturate(1.5)!important;border-bottom:1px solid rgba(255,255,255,.45)!important;box-shadow:0 1px 0 rgba(0,0,0,.05)!important}#rp-del-picker #rp-del-cancel{color:var(--rp-nav-btn)!important;background:none!important;border:none!important;cursor:pointer!important;font-size:15px!important}#rp-del-picker #rp-del-confirm{color:#ef4444!important;font-weight:700!important;background:none!important;border:none!important;cursor:pointer!important;font-size:15px!important}#rp-del-list{flex:1;overflow-y:auto;padding:8px 0}.rp-del-pick-av{width:36px;height:36px;border-radius:18px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff}.rp-del-pick-item{display:flex;align-items:center;gap:12px;padding:12px 18px;cursor:pointer;background:rgba(255,255,255,.45);border-bottom:1px solid rgba(255,255,255,.3);backdrop-filter:blur(4px);transition:background .12s}.rp-del-pick-item:active{background:rgba(255,255,255,.65)}.rp-del-pick-item.rp-del-selected{background:rgba(239,68,68,.08);border-bottom-color:rgba(239,68,68,.15)}.rp-del-pick-name{flex:1;font-size:14px;font-weight:500;color:#222}.rp-del-chk{margin-left:auto;width:22px;height:22px;border-radius:50%;border:2px solid rgba(0,0,0,.22);flex-shrink:0;display:flex;align-items:center;justify-content:center}.rp-del-pick-item.rp-del-selected .rp-del-chk{background:#ef4444;border-color:#ef4444}.rp-del-pick-item.rp-del-selected .rp-del-chk::after{content:"✓";color:#fff;font-size:13px}.rp-dark #rp-del-picker::after{background:rgba(4,3,18,.86)}.rp-dark #rp-del-picker .rp-nav-bar{background:rgba(6,4,22,.55)!important;border-bottom-color:rgba(255,255,255,.07)!important}.rp-dark .rp-del-pick-item{background:rgba(255,255,255,.06);border-bottom-color:rgba(255,255,255,.05)}.rp-dark .rp-del-pick-item:active{background:rgba(255,255,255,.1)}.rp-dark .rp-del-pick-item.rp-del-selected{background:rgba(239,68,68,.14)}.rp-dark .rp-del-pick-name{color:#e0e4ff}.rp-dark .rp-del-chk{border-color:rgba(255,255,255,.28)}#rp-phone.rp-theme-star #rp-del-picker::after{background:rgba(6,3,22,.82)}#rp-phone.rp-theme-star #rp-del-picker .rp-nav-bar{background:rgba(10,5,32,.55)!important;border-bottom-color:rgba(140,110,255,.2)!important}#rp-phone.rp-theme-star .rp-del-pick-item{background:rgba(140,100,255,.08);border-bottom-color:rgba(140,100,255,.12)}#rp-phone.rp-theme-star .rp-del-pick-item:active{background:rgba(140,100,255,.16)}#rp-phone.rp-theme-star .rp-del-pick-item.rp-del-selected{background:rgba(239,68,68,.14)}#rp-phone.rp-theme-star .rp-del-pick-name{color:#dde0ff}#rp-phone.rp-theme-star .rp-del-chk{border-color:rgba(160,120,255,.45)}#rp-phone.rp-theme-candy #rp-del-picker::after{background:rgba(255,240,248,.64)}#rp-phone.rp-theme-candy #rp-del-picker .rp-nav-bar{background:rgba(255,255,255,.55)!important;border-bottom-color:rgba(200,100,140,.15)!important}#rp-phone.rp-theme-candy .rp-del-pick-item{background:rgba(255,255,255,.5);border-bottom-color:rgba(200,100,140,.1)}#rp-phone.rp-theme-candy .rp-del-pick-item:active{background:rgba(255,255,255,.72)}#rp-phone.rp-theme-candy .rp-del-pick-item.rp-del-selected{background:rgba(239,68,68,.06)}#rp-phone.rp-theme-candy .rp-del-pick-name{color:#4a1030}#rp-phone.rp-theme-candy .rp-del-chk{border-color:rgba(200,100,140,.4)}#rp-phone.rp-theme-misty #rp-del-picker::after{background:rgba(222,240,255,.66)}#rp-phone.rp-theme-misty #rp-del-picker .rp-nav-bar{background:rgba(220,238,255,.55)!important;border-bottom-color:rgba(80,150,210,.18)!important}#rp-phone.rp-theme-misty .rp-del-pick-item{background:rgba(255,255,255,.5);border-bottom-color:rgba(100,160,210,.12)}#rp-phone.rp-theme-misty .rp-del-pick-item:active{background:rgba(255,255,255,.72)}#rp-phone.rp-theme-misty .rp-del-pick-item.rp-del-selected{background:rgba(239,68,68,.06)}#rp-phone.rp-theme-misty .rp-del-pick-name{color:#1a3a5c}#rp-phone.rp-theme-misty .rp-del-chk{border-color:rgba(100,160,210,.4)}
.rp-grp-pick-item{display:flex;align-items:center;gap:12px;padding:11px 16px;cursor:pointer;border-bottom:1px solid rgba(0,0,0,.05);transition:background .12s}.rp-grp-pick-item:active{background:rgba(0,0,0,.04)}.rp-grp-pick-item.selected{background:rgba(37,99,235,.06)}.rp-dark .rp-grp-pick-item{border-bottom-color:rgba(255,255,255,.05)}.rp-dark .rp-grp-pick-item.selected{background:rgba(90,120,255,.1)}.rp-grp-pick-av{width:36px;height:36px;border-radius:18px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff}.rp-grp-pick-name{flex:1;font-size:14px;font-weight:500;color:#222}.rp-dark .rp-grp-pick-name{color:#e0e4ff}.rp-grp-pick-chk{width:22px;height:22px;border-radius:11px;border:1.5px solid rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;font-size:13px;color:transparent;flex-shrink:0;transition:all .15s}
.rp-grp-pick-item.selected .rp-grp-pick-chk{background:#2563eb;border-color:#2563eb;color:#fff}
.rp-grp-modal{background:#fff;border-radius:16px;overflow:hidden;width:90%;max-width:290px;box-shadow:0 8px 32px rgba(0,0,0,.2)}
.rp-dark .rp-grp-modal{background:#1c1c38}
.rp-grp-modal-hd{padding:14px 16px;font-size:15px;font-weight:700;color:#222;border-bottom:1px solid rgba(0,0,0,.06);text-align:center}
.rp-dark .rp-grp-modal-hd{color:#e0e4ff;border-bottom-color:rgba(255,255,255,.06)}
.rp-grp-name-inp{width:100%;box-sizing:border-box;border:1px solid rgba(0,0,0,.12);border-radius:8px;padding:8px 12px;font-size:13px;outline:none;background:#fafafa}
.rp-dark .rp-grp-name-inp{background:#131328;border-color:rgba(255,255,255,.1);color:#dde0f2}
.rp-grp-modal-ft{display:flex;border-top:1px solid rgba(0,0,0,.06)}
.rp-dark .rp-grp-modal-ft{border-top-color:rgba(255,255,255,.06)}
.rp-grp-ft-btn{flex:1;padding:12px;border:none;background:none;font-size:14px;font-weight:600;cursor:pointer}
.rp-grp-ft-cancel{color:rgba(0,0,0,.35);border-right:1px solid rgba(0,0,0,.06)}
.rp-grp-ft-ok{color:#2563eb}
.rp-dark .rp-grp-ft-cancel{color:rgba(255,255,255,.25);border-right-color:rgba(255,255,255,.06)}
/* ── CHAT BUBBLE INSET ── */
.rp-cb{display:flex;align-items:flex-start;gap:8px;margin:8px 0;clear:both}
.rp-cb-av{width:28px;height:28px;border-radius:14px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;overflow:hidden;margin-top:1px}
.rp-cb-av img{width:100%;height:100%;object-fit:cover}
.rp-cb-txt{background:rgba(0,0,0,.07);border-radius:3px 14px 14px 14px;padding:8px 12px;font-size:13.5px;line-height:1.6;color:#1a1a2e;max-width:78%;word-break:break-word;font-style:normal}
.rp-sms-echo{display:block;margin-top:6px;padding:5px 10px;border-left:2px solid rgba(0,0,0,.18);font-size:13px;line-height:1.5;color:inherit;opacity:.82;font-style:normal;word-break:break-word}
.rp-sms-echo .rp-sms-echo-name{font-weight:600;margin-right:0px}
.rp-dark .rp-sms-echo{border-left-color:rgba(255,255,255,.22)}
/* ── PHONE BLOCK DIVIDER（取代折叠块） ── */
.rp-phone-divider{display:block;margin:8px 0 4px;border:none;border-top:1px solid rgba(0,0,0,.18);position:relative;text-align:center}
.rp-phone-divider::before{content:attr(data-label);position:absolute;top:-9px;left:50%;transform:translateX(-50%);background:var(--SmartThemeChatBackground,#fff);padding:0 8px;font-size:11px;font-weight:600;color:rgba(0,0,0,.4);white-space:nowrap}
.rp-dark .rp-phone-divider{border-top-color:rgba(255,255,255,.2)}
.rp-dark .rp-phone-divider::before{color:rgba(255,255,255,.35);background:var(--SmartThemeChatBackground,#1a1a2e)}
.rp-phone-echo-block{display:block;margin:2px 0;font-size:13px;line-height:1.55}
.rp-phone-echo-name{font-weight:600;color:rgba(0,0,80,.65);margin-right:2px}
.rp-phone-echo-moment-tag{font-size:10px;font-weight:700;color:rgba(180,40,80,.6);background:rgba(180,40,80,.08);border-radius:4px;padding:1px 5px;margin-right:4px;vertical-align:middle}
.rp-dark .rp-phone-echo-name{color:rgba(160,175,255,.8)}
.rp-dark .rp-phone-echo-moment-tag{color:rgba(200,140,170,.8);background:rgba(200,140,170,.12)}
/* 隐藏旧 rp-sms-echo，统一用新样式 */
.rp-sms-echo{display:none!important}
/* ── WALLPAPER ── */
.rp-wall-preview-img{width:100%;height:80px;border-radius:10px;object-fit:cover;display:block;border:1px solid rgba(0,0,0,.08);margin-bottom:10px}

/* FIX #3: hide terminal SMS inbox panel */
.p4{display:none!important}
/* FIX #5: attach panel - position relative to composer */
#rp-composer{position:relative}
#rp-attach-panel{position:absolute;bottom:100%;left:0;right:0;background:#fff;border-top:1px solid rgba(0,0,0,.08);padding:6px 0 10px;z-index:500;display:none;border-radius:12px 12px 0 0;box-shadow:0 -4px 20px rgba(0,0,0,.08)}
.rp-dark #rp-attach-panel{background:#111128;border-top-color:rgba(255,255,255,.07)}
/* FIX #4: wallpaper layer */
#rp-wallpaper-layer{position:absolute;top:0;right:0;bottom:0;left:0;z-index:0;background-size:cover;background-position:center;background-repeat:no-repeat;pointer-events:none}
.rp-view{z-index:1}

/* ══ LUDO GAME - Candy Garden 糖果花园 ══ */
#rp-view-game{background:transparent;display:flex;flex-direction:column}
.rp-dark #rp-view-game{background:transparent}
#rp-view-game .rp-nav-bar{background:rgba(255,255,255,.55)!important;border-bottom:1px solid rgba(180,120,200,.2)!important}
#rp-view-game .rp-nav-title{color:#4a1060!important;font-weight:700}
.rp-dark #rp-view-game .rp-nav-title{color:#e8d0ff!important}
#rp-view-game .rp-back{color:#b060d0!important}
/* Board */
#rp-game-board-wrap{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4px 0;overflow:hidden;min-height:0}
#rp-ludo-canvas{border-radius:16px;max-width:262px;max-height:262px;display:block;box-shadow:0 4px 24px rgba(160,80,200,.18),0 1px 0 rgba(255,255,255,.9) inset,0 8px 32px rgba(0,0,0,.08)}
/* Controls */
#rp-game-controls{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;background:rgba(255,255,255,.55);border-top:1px solid rgba(180,120,200,.18);flex-shrink:0;gap:10px}
.rp-dark #rp-game-controls{background:rgba(30,10,40,.7);border-top-color:rgba(200,120,255,.1)}
.rp-game-info{flex:1;min-width:0}
.rp-game-players{font-size:12px;font-weight:700;color:#4a1060}
.rp-dark .rp-game-players{color:#e8d0ff}
.rp-game-status{font-size:10.5px;color:#a060c0;margin-top:2px}
.rp-dark .rp-game-status{color:rgba(220,170,255,.6)}
/* Dice */
#rp-dice-btn{width:50px;height:50px;border-radius:25px;background:linear-gradient(145deg,#f472b6,#a855f7);border:none;color:#fff;font-size:22px;cursor:pointer;display:flex!important;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(168,85,247,.4),0 1px 3px rgba(0,0,0,.1);transition:transform .15s,box-shadow .2s;flex-shrink:0;visibility:visible!important;opacity:1!important;pointer-events:auto!important;animation:diceGlow 2.5s ease-in-out infinite}
@keyframes diceGlow{0%,100%{box-shadow:0 4px 16px rgba(168,85,247,.4),0 1px 3px rgba(0,0,0,.1)}50%{box-shadow:0 4px 24px rgba(244,114,182,.6),0 1px 6px rgba(0,0,0,.12)}}
#rp-dice-btn:active{transform:scale(.88);animation:none}
#rp-dice-btn:disabled{opacity:.4!important;cursor:default;animation:none!important}
#rp-dice-face{font-size:30px;min-width:36px;text-align:center;flex-shrink:0}
/* Chat log */
#rp-game-chat{max-height:64px;overflow-y:auto;padding:5px 14px;display:flex;flex-direction:column;gap:2px;flex-shrink:0;background:rgba(255,255,255,.6);border-top:1px solid rgba(180,120,200,.1);scrollbar-width:none;cursor:pointer;transition:background .2s}
#rp-game-chat:hover{background:rgba(255,255,255,.85)}
#rp-game-chat::-webkit-scrollbar{display:none}
.rp-dark #rp-game-chat{background:rgba(30,10,40,.4);border-top-color:rgba(200,120,255,.08)}
#rp-game-chat-hint{font-size:9.5px;color:rgba(160,80,200,.5);text-align:right;padding:0 14px 1px;flex-shrink:0}
/* Full-screen chat */
#rp-game-chat-fs{position:absolute;top:12%;bottom:0;left:0;right:0;z-index:200;background:rgba(250,245,255,.97);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);display:flex;flex-direction:column}
.rp-dark #rp-game-chat-fs{background:rgba(18,8,28,.97)}
#rp-game-chat-fs-header{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid rgba(180,120,200,.15);flex-shrink:0}
#rp-game-chat-fs-title{font-size:14px;font-weight:600;color:#4a1060}
.rp-dark #rp-game-chat-fs-title{color:#e8d0ff}
#rp-game-chat-fs-close{width:30px;height:30px;border-radius:15px;background:rgba(160,80,200,.1);border:none;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#7030a0;position:relative;z-index:10;pointer-events:auto}
.rp-dark #rp-game-chat-fs-close{background:rgba(200,120,255,.15);color:#e8d0ff}
#rp-game-chat-fs-body{flex:1;overflow-y:auto;padding:10px 14px;display:flex;flex-direction:column;gap:4px}
#rp-game-chat-fs-body .game-msg{font-size:13px;line-height:1.6;padding:3px 0}
#rp-game-chat-fs-hint{font-size:10px;color:rgba(160,80,200,.5);text-align:center;padding:2px 0 1px;flex-shrink:0}
/* Messages */
.game-msg{font-size:11px;line-height:1.45;padding:1px 0}
.game-msg-user{color:#db2777;text-align:right;font-weight:500}
.game-msg-char{color:#7c3aed;font-weight:500}
.rp-dark .game-msg-char{color:#c084fc}
.game-msg-sys{color:#9ca3af;text-align:center;font-style:italic}
.rp-dark .game-msg-sys{color:rgba(255,255,255,.35)}
/* ── Square Event Popup - bright clean card ── */
#rp-sq-event{position:absolute;inset:0;z-index:60;background:rgba(100,50,150,.25);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;border-radius:48px}
#rp-sq-event-box{background:#fff;border:1px solid rgba(200,150,255,.3);border-radius:24px;padding:24px 22px;max-width:230px;text-align:center;box-shadow:0 8px 40px rgba(150,80,200,.2),0 2px 8px rgba(0,0,0,.08)}
.rp-dark #rp-sq-event-box{background:linear-gradient(145deg,#1e0a30,#120520)}
#rp-sq-event-sq{font-size:10px;color:#b07ad0;margin-bottom:8px;letter-spacing:1.5px;text-transform:uppercase}
.rp-dark #rp-sq-event-sq{color:rgba(220,170,255,.5)}
#rp-sq-event-emoji{font-size:44px;margin-bottom:10px;line-height:1}
#rp-sq-event-text{font-size:15px;font-weight:700;color:#2d1060;margin-bottom:8px;line-height:1.5}
.rp-dark #rp-sq-event-text{color:#f0e0ff}
#rp-sq-event-note{font-size:11px;color:#9070b0;margin-bottom:18px;line-height:1.5}
.rp-dark #rp-sq-event-note{color:rgba(220,180,255,.5)}
#rp-sq-event-done{background:linear-gradient(135deg,#f472b6,#a855f7);color:#fff;border:none;border-radius:22px;padding:10px 28px;font-size:14px;cursor:pointer;font-weight:700;letter-spacing:.3px;box-shadow:0 4px 16px rgba(168,85,247,.35)}
#rp-sq-event-done:active{transform:scale(.96)}
/* ── Task bar - 居中弹窗 ── */
#rp-sq-task-bar{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:200px;background:#fff;border:1px solid rgba(200,150,255,.3);color:#2d1060;border-radius:22px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:18px 20px;z-index:55;box-shadow:0 8px 40px rgba(150,80,200,.2),0 2px 10px rgba(0,0,0,.08);text-align:center}
.rp-dark #rp-sq-task-bar{background:linear-gradient(145deg,#1e0a30,#120520);color:#f0e0ff;border-color:rgba(200,150,255,.2)}
#rp-sq-task-text{font-size:13px;font-weight:700;line-height:1.5;margin-bottom:12px;white-space:normal;word-break:break-all;color:#2d1060}
.rp-dark #rp-sq-task-text{color:#f0e0ff}
#rp-sq-task-done-btn{background:linear-gradient(135deg,#f472b6,#a855f7);border:none;border-radius:20px;color:#fff;padding:8px 26px;font-size:13px;cursor:pointer;font-weight:700;box-shadow:0 3px 12px rgba(168,85,247,.35);transition:opacity .2s,transform .15s}
#rp-sq-task-done-btn:not(:disabled):hover{opacity:.9}
#rp-sq-task-done-btn:disabled{opacity:.35;cursor:not-allowed;background:#ccc;box-shadow:none}
#rp-sq-task-done-btn:not(:disabled):active{transform:scale(.95)}
#rp-sq-task-hint{font-size:10px;color:#a070c0;margin-top:8px;animation:taskHintBlink 1.3s ease-in-out infinite}
.rp-dark #rp-sq-task-hint{color:rgba(220,170,255,.6)}
@keyframes taskHintBlink{0%,100%{opacity:1}50%{opacity:.2}}
/* Input row */
#rp-game-input-row{display:flex;gap:6px;padding:6px 12px 20px;background:rgba(255,255,255,.7);border-top:1px solid rgba(180,120,200,.1);flex-shrink:0;align-items:center}
.rp-dark #rp-game-input-row{background:rgba(20,8,32,.6);border-top-color:rgba(180,120,255,.1)}
#rp-game-input{flex:1;min-width:0;background:rgba(255,255,255,.9);border:1.5px solid rgba(180,120,200,.25);border-radius:18px;padding:7px 14px;font-size:12px;font-family:inherit;color:#2d1060;outline:none;transition:border-color .2s}
.rp-dark #rp-game-input{background:rgba(255,255,255,.07);border-color:rgba(180,120,255,.2);color:#f0e0ff}
#rp-game-input:focus{border-color:#a855f7}
#rp-game-input::placeholder{color:rgba(120,80,160,.4)}
.rp-dark #rp-game-input::placeholder{color:rgba(220,170,255,.3)}
#rp-game-send{width:28px!important;height:28px!important;min-width:28px!important;border-radius:14px!important;background:linear-gradient(135deg,#f472b6,#a855f7)!important;border:none!important;color:#fff!important;font-size:14px!important;cursor:pointer!important;display:flex!important;align-items:center!important;justify-content:center!important;flex-shrink:0!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;padding:0!important;margin:0!important;box-shadow:0 2px 8px rgba(168,85,247,.35)!important}
#rp-game-send:hover{opacity:.85!important}
/* Win overlay */
#rp-game-win{position:absolute;inset:0;background:rgba(120,60,180,.3);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:100}
.game-win-box{background:#fff;border:1px solid rgba(200,150,255,.3);border-radius:28px;padding:32px 24px;text-align:center;max-width:224px;width:88%;box-shadow:0 12px 48px rgba(160,80,200,.25),0 2px 8px rgba(0,0,0,.06)}
.rp-dark .game-win-box{background:linear-gradient(145deg,#1e0a30,#120520);border-color:rgba(200,150,255,.2)}
.game-win-emoji{font-size:66px;margin-bottom:10px;line-height:1}
.game-win-title{font-size:22px;font-weight:800;color:#2d1060;margin-bottom:8px;letter-spacing:-.2px}
.rp-dark .game-win-title{color:#f0e0ff}
.game-win-sub{font-size:13px;color:#9070b0;margin-bottom:22px;line-height:1.6}
.rp-dark .game-win-sub{color:rgba(220,180,255,.6)}
.game-win-btn{width:100%!important;padding:14px!important;background:linear-gradient(135deg,#f472b6,#a855f7)!important;color:#fff!important;border:none!important;border-radius:18px!important;font-size:15px!important;font-weight:800!important;cursor:pointer!important;font-family:inherit!important;display:block!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;letter-spacing:.3px!important;box-shadow:0 4px 18px rgba(168,85,247,.4)!important}
.game-win-btn:hover{opacity:.88!important}
@keyframes rp-dice-roll{0%{transform:rotate(0deg) scale(1)}25%{transform:rotate(90deg) scale(1.3)}50%{transform:rotate(180deg) scale(1)}75%{transform:rotate(270deg) scale(1.3)}100%{transform:rotate(360deg) scale(1)}}
.ludo-rolling{animation:rp-dice-roll .4s ease-in-out 3}
/* ── GAMES FOLDER (iOS style) ── */
.rp-folder-ico {
  width: 52px; height: 52px; border-radius: 16px;
  background: rgba(255,255,255,0.22);
  border: 1px solid rgba(255,255,255,0.30);
  display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;
  gap: 3px; padding: 7px;
  box-sizing: border-box; overflow: hidden;
  transition: transform .14s ease, filter .14s ease;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,.30));
}
.rp-folder-ico:active { transform: scale(.88); }
.rp-fi-item {
  border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; line-height: 1;
  background: transparent;
}
.rp-fi-empty { opacity: 0; }
#rp-folder-modal {
  position: absolute; inset: 0; z-index: 800;
  background: rgba(0,0,0,0.45); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;
}
.rp-folder-title-lbl {
  color: rgba(255,255,255,0.92); font-size: 14px; font-weight: 600;
  text-shadow: 0 1px 6px rgba(0,0,0,0.55); text-align: center; letter-spacing: .8px;
}
.rp-folder-popup {
  background: rgba(255,255,255,0.18); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.28); border-radius: 26px; padding: 18px 16px;
  display: flex; flex-direction: row; gap: 14px; align-items: flex-start;
  box-shadow: 0 8px 32px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.35);
}
.rp-folder-item {
  min-width: 60px;
  display: flex; flex-direction: column; align-items: center; gap: 10px; cursor: pointer;
  transition: transform .15s cubic-bezier(.34,1.56,.64,1);
}
.rp-folder-item:active { transform: scale(.84); }
.rp-folder-item-ico {
  width: 58px; height: 58px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  background: transparent !important;
  box-shadow: none !important;
}
.rp-folder-item-ico svg { width: 34px; height: 34px; }
.rp-folder-game-ludo,
.rp-folder-game-2048 { color: #f6d7e3; }
.rp-folder-item-lbl {
  font-size: 13px; color: #f6d7e3; font-weight: 700;
  text-shadow: 0 1px 2px rgba(0,0,0,.22); white-space: nowrap; letter-spacing: .1px;
}
/* ── Candy theme folder ── */
#rp-phone.rp-theme-candy .rp-folder-ico {
  background: rgba(255,200,220,0.45) !important;
  border-color: rgba(255,180,200,0.50) !important;
  filter: drop-shadow(0 1px 5px rgba(200,60,90,.45)) drop-shadow(0 0 8px rgba(255,255,255,.5)) !important;
}
#rp-phone.rp-theme-candy .rp-fi-item { background: transparent !important; }
#rp-phone.rp-theme-candy .rp-fi-empty { opacity: 0 !important; }
#rp-phone.rp-theme-candy #rp-folder-modal {
  background: rgba(180,60,90,0.28);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
}
#rp-phone.rp-theme-candy .rp-folder-popup {
  background: rgba(255,228,238,0.55);
  border-color: rgba(220,130,165,0.35);
  box-shadow: 0 8px 32px rgba(200,100,140,0.20), inset 0 1px 0 rgba(255,255,255,0.65);
}
#rp-phone.rp-theme-candy .rp-folder-title-lbl {
  color: rgba(120,20,50,0.92);
  text-shadow: 0 1px 4px rgba(255,255,255,0.55);
}
#rp-phone.rp-theme-candy .rp-folder-item-lbl {
  color: #ffeaf2;
  text-shadow: 0 1px 2px rgba(120,20,50,.38);
}
#rp-phone.rp-theme-candy .rp-folder-game-ludo,
#rp-phone.rp-theme-candy .rp-folder-game-2048 {
  color:#ffeaf2 !important;
  filter:drop-shadow(0 0 5px rgba(255,255,255,.55)) drop-shadow(0 1px 3px rgba(120,20,50,.38)) !important;
}
/* ── Star theme folder ── */
#rp-phone.rp-theme-star .rp-folder-ico {
  background: rgba(30,10,80,0.70) !important;
  border-color: rgba(160,110,255,0.50) !important;
  filter: drop-shadow(0 0 8px rgba(160,100,255,.65)) drop-shadow(0 1px 3px rgba(0,0,0,.6)) !important;
}
#rp-phone.rp-theme-star .rp-fi-item { background: transparent !important; filter: drop-shadow(0 0 3px rgba(200,170,255,.6)); }
#rp-phone.rp-theme-star .rp-fi-empty { opacity: 0 !important; }
#rp-phone.rp-theme-star #rp-folder-modal {
  background: rgba(4,2,18,0.72);
}
#rp-phone.rp-theme-star .rp-folder-popup {
  background: rgba(15,7,48,0.82);
  border-color: rgba(150,100,255,0.35);
  box-shadow: 0 8px 32px rgba(80,40,200,0.35), inset 0 1px 0 rgba(170,130,255,0.20);
}
#rp-phone.rp-theme-star .rp-folder-title-lbl {
  color: rgba(220,200,255,0.95);
  text-shadow: 0 0 12px rgba(160,100,255,0.6), 0 1px 4px rgba(0,0,0,0.6);
}
#rp-phone.rp-theme-star .rp-folder-item-lbl {
  color: #f7f2ff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.4);
}
#rp-phone.rp-theme-star .rp-folder-game-ludo,
#rp-phone.rp-theme-star .rp-folder-game-2048 {
  color:#f7f2ff !important;
  filter:drop-shadow(0 0 6px rgba(180,150,255,.55)) drop-shadow(0 1px 3px rgba(0,0,0,.42)) !important;
}
/* ── Misty theme folder ── */
#rp-phone.rp-theme-misty .rp-folder-ico {
  background: rgba(190,215,240,0.50) !important;
  border-color: rgba(255,255,255,0.55) !important;
  filter: drop-shadow(0 1px 4px rgba(0,30,80,.35)) drop-shadow(0 0 6px rgba(180,210,240,.4)) !important;
}
#rp-phone.rp-theme-misty .rp-fi-item { background: transparent !important; }
#rp-phone.rp-theme-misty .rp-fi-empty { opacity: 0 !important; }
#rp-phone.rp-theme-misty #rp-folder-modal {
  background: rgba(160,195,220,0.38);
  backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
}
#rp-phone.rp-theme-misty .rp-folder-popup {
  background: rgba(230,242,252,0.55);
  border-color: rgba(255,255,255,0.60);
  box-shadow: 0 8px 32px rgba(100,155,200,0.20), inset 0 1px 0 rgba(255,255,255,0.65);
}
#rp-phone.rp-theme-misty .rp-folder-title-lbl {
  color: rgba(60,90,120,0.90);
  text-shadow: 0 1px 4px rgba(255,255,255,0.55);
}
#rp-phone.rp-theme-misty .rp-folder-item-lbl {
  color: #2a4e70;
  text-shadow: 0 1px 2px rgba(255,255,255,.42);
}
#rp-phone.rp-theme-misty .rp-folder-game-ludo,
#rp-phone.rp-theme-misty .rp-folder-game-2048 {
  color:#2f587d !important;
  filter:drop-shadow(0 1px 2px rgba(255,255,255,.38)) drop-shadow(0 0 3px rgba(20,60,90,.15)) !important;
}
/* ══ 黄金矿工 GAME ══ */
#rp-view-ggold{position:relative;background:transparent;display:flex;flex-direction:column;overflow:hidden;height:100%}
#ggold-header{display:flex;align-items:center;justify-content:space-between;padding:5px 12px;flex-shrink:0;gap:4px}
.ggold-score-box{background:rgba(255,255,255,.82);border:1px solid rgba(0,0,0,.08);border-radius:7px;padding:3px 8px;text-align:center;min-width:60px;box-shadow:0 1px 4px rgba(0,0,0,.1)}
.ggold-score-lbl{font-size:9px;font-weight:700;color:rgba(60,40,10,.65);text-transform:uppercase;letter-spacing:.04em}
.ggold-score-val{font-size:14px;font-weight:800;color:#4a3010}
#ggold-round-info{font-size:11px;font-weight:600;color:#fff;background:rgba(0,0,0,.38);padding:2px 8px;border-radius:12px;text-shadow:0 1px 3px rgba(0,0,0,.5);white-space:nowrap;text-align:center}
#ggold-timer-wrap{padding:2px 12px;flex-shrink:0}
#ggold-timer-bg{height:5px;border-radius:3px;background:rgba(0,0,0,.15);overflow:hidden}
#ggold-timer-bar{height:5px;border-radius:3px;background:var(--rp-wd-fill,linear-gradient(90deg,#f59e0b,#ef4444));transition:width .5s linear;width:100%}
#ggold-canvas-wrap{display:flex;justify-content:center;padding:2px 0;flex-shrink:0}
#ggold-canvas{border-radius:8px;display:block}
#ggold-action-row{display:flex;justify-content:center;align-items:center;gap:10px;padding:3px 12px;flex-shrink:0}
#ggold-launch-btn{padding:6px 22px;border-radius:18px;border:none;background:linear-gradient(135deg,var(--rp-nav-btn,#e05888),color-mix(in srgb,var(--rp-nav-btn,#e05888) 70%,#000 30%));color:#fff;font-weight:700;font-size:13px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.25)}
#ggold-launch-btn:disabled{opacity:.45;cursor:not-allowed}
#ggold-turn-badge{font-size:11px;font-weight:600;color:#fff;background:rgba(0,0,0,.32);padding:2px 10px;border-radius:12px}
#ggold-chat-hint{font-size:9.5px;color:rgba(224,64,122,.65);text-align:right;padding:0 14px 1px;flex-shrink:0}
#ggold-chat{flex:1 1 0;min-height:0;overflow-y:auto;padding:5px 8px;display:flex;flex-direction:column;gap:2px;margin:0 8px;background:rgba(0,0,0,.28);border-radius:8px;backdrop-filter:blur(5px);cursor:pointer}
#ggold-chat::-webkit-scrollbar{display:none}
#ggold-input-row{display:flex;gap:6px;padding:6px 12px 10px;flex-shrink:0;border-top:1px solid rgba(0,0,0,.06)}
#ggold-input{flex:1;border-radius:18px;border:1px solid rgba(0,0,0,.12);padding:6px 12px;font-size:13px;background:rgba(255,255,255,.88);font-family:inherit;outline:none;color:#1a1008}
#ggold-send{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--rp-nav-btn,#e05888),color-mix(in srgb,var(--rp-nav-btn,#e05888) 70%,#000 30%));border:none;color:#fff;font-weight:800;cursor:pointer;font-size:16px;flex-shrink:0;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.3)}
#ggold-over{position:absolute;inset:0;background:rgba(0,0,0,.62);z-index:50;flex-direction:column;align-items:center;justify-content:center;gap:12px;display:none;border-radius:48px}
.ggold-over-emoji{font-size:48px;line-height:1}
.ggold-over-title{font-size:19px;font-weight:800;color:#fff}
.ggold-over-sub{font-size:12px;color:rgba(255,255,255,.8);text-align:center;padding:0 20px;line-height:1.5;white-space:pre-line}
.ggold-over-btn{padding:8px 18px;border-radius:20px;border:none;background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;font-weight:700;font-size:13px;cursor:pointer;margin-top:2px}
#ggold-mode-select{position:absolute;inset:0;background:rgba(0,0,0,.55);z-index:60;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;border-radius:48px;backdrop-filter:blur(6px)}
.ggold-mode-title{font-size:17px;font-weight:800;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.4)}
.ggold-mode-sub{font-size:11px;color:rgba(255,255,255,.72);text-align:center;padding:0 24px;line-height:1.5;margin-top:-8px}
.ggold-mode-btn{width:180px;padding:10px 0;border-radius:22px;border:none;font-weight:700;font-size:13px;cursor:pointer;box-shadow:0 3px 12px rgba(0,0,0,.22)}
#ggold-mode-vs{background:linear-gradient(135deg,#ef4444,#b91c1c);color:#fff}
#ggold-mode-co{background:linear-gradient(135deg,#10b981,#059669);color:#fff}
.rp-folder-game-gold{color:#f6d7e3}
#rp-phone.rp-theme-candy .rp-folder-game-gold{color:#ffeaf2 !important;filter:drop-shadow(0 0 5px rgba(255,255,255,.55)) drop-shadow(0 1px 3px rgba(120,20,50,.38)) !important}
#rp-phone.rp-theme-star .rp-folder-game-gold{color:#f7f2ff !important;filter:drop-shadow(0 0 6px rgba(180,150,255,.55)) drop-shadow(0 1px 3px rgba(0,0,0,.42)) !important}
#rp-phone.rp-theme-misty .rp-folder-game-gold{color:#2f587d !important;filter:drop-shadow(0 1px 2px rgba(255,255,255,.38)) drop-shadow(0 0 3px rgba(20,60,90,.15)) !important}
#rp-phone.rp-theme-star #ggold-canvas{filter:brightness(.88) saturate(.9)}
#rp-phone.rp-theme-misty #ggold-chat .game-msg-sys{color:rgba(200,228,255,.92);text-shadow:0 0 4px rgba(0,10,40,.8)}
#rp-phone.rp-theme-misty #ggold-chat .game-msg-user{color:rgba(255,210,228,.92);text-shadow:0 0 4px rgba(0,10,40,.8)}
#rp-phone.rp-theme-misty #ggold-chat .game-msg-char{color:rgba(185,228,255,.95)}
#rp-phone.rp-theme-star #ggold-chat .game-msg-sys{color:rgba(210,200,255,.88)}
#rp-phone.rp-theme-star #ggold-chat .game-msg-user{color:#f0c0ff}
#rp-phone.rp-theme-star #ggold-chat .game-msg-char{color:#c8b8ff}
#ggold-coop-bar{padding:0 12px 2px;flex-shrink:0;display:none}
#ggold-coop-label{font-size:9.5px;color:rgba(255,255,255,.7);text-align:center;margin-bottom:2px}
#ggold-coop-progress-bg{height:4px;border-radius:2px;background:rgba(255,255,255,.2);overflow:hidden}
#ggold-coop-progress-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,#10b981,#34d399);transition:width .4s ease}

@keyframes rpApiBlink{0%,100%{opacity:1}50%{opacity:.3}}
#rp-api-blink{animation:rpApiBlink 1.6s ease-in-out infinite}
/* API settings */
#rp-api-btn{width:30px;height:30px;border-radius:15px;background:rgba(168,85,247,.1);border:1.5px solid rgba(168,85,247,.22);color:#7c3aed;font-size:12px;cursor:pointer;display:flex!important;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s;font-weight:700;padding:0;visibility:visible!important;pointer-events:auto!important}
#rp-api-btn:hover{background:rgba(168,85,247,.22)}
.rp-dark #rp-api-btn{background:rgba(168,85,247,.15);border-color:rgba(168,85,247,.3);color:#c084fc}
#rp-api-panel{position:absolute;inset:0;z-index:80;background:rgba(80,30,130,.28);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;border-radius:48px}
#rp-api-box{background:#fff;border:1px solid rgba(200,150,255,.3);border-radius:24px;padding:22px 20px;width:222px;max-width:92%;box-shadow:0 8px 40px rgba(150,80,200,.22)}
.rp-dark #rp-api-box{background:linear-gradient(145deg,#1e0a30,#120520);border-color:rgba(200,150,255,.2)}
.rp-api-title{font-size:15px;font-weight:800;color:#2d1060;margin-bottom:5px}
.rp-dark .rp-api-title{color:#f0e0ff}
.rp-api-desc{font-size:10.5px;color:#9070b0;margin-bottom:14px;line-height:1.55}
.rp-dark .rp-api-desc{color:rgba(220,180,255,.6)}
.rp-api-opt{display:flex;align-items:center;gap:8px;font-size:12.5px;color:#2d1060;margin-bottom:7px;cursor:pointer}
.rp-dark .rp-api-opt{color:#e8d0ff}
#rp-api-custom-fields{margin-top:10px;display:flex;flex-direction:column;gap:7px}
.rp-api-presets{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:2px}
.rp-api-preset-btn{padding:3px 9px;border-radius:10px;border:1px solid rgba(168,85,247,.3);background:transparent;color:#7c3aed;font-size:10px;cursor:pointer;transition:background .15s}
.rp-api-preset-btn:hover{background:rgba(168,85,247,.12)}
.rp-api-input{background:rgba(255,255,255,.9);border:1.5px solid rgba(180,120,200,.25);border-radius:12px;padding:7px 12px;font-size:11.5px;color:#2d1060;font-family:inherit;outline:none;width:100%;box-sizing:border-box}
.rp-dark .rp-api-input{background:rgba(255,255,255,.08);border-color:rgba(180,120,255,.2);color:#f0e0ff}
.rp-api-input:focus{border-color:#a855f7}
.rp-api-input::placeholder{color:rgba(120,80,160,.4)}
.rp-api-save-row{display:flex;gap:8px;margin-top:16px}
.rp-api-save-btn{flex:1;padding:9px;background:linear-gradient(135deg,#f472b6,#a855f7);color:#fff;border:none;border-radius:16px;font-size:13px;font-weight:700;cursor:pointer}
.rp-api-cancel-btn{padding:9px 14px;background:rgba(120,60,180,.08);border:1px solid rgba(168,85,247,.2);border-radius:16px;font-size:13px;color:#7c3aed;cursor:pointer}

/* ── EDIT PENCIL BUTTON (SVG线条铅笔,适配主题色) ── */
.rp-edit-btn {
  display:inline-flex; align-items:center; justify-content:center;
  width:22px; height:22px; border-radius:50%;
  background:rgba(0,0,0,.06); border:none; cursor:pointer;
  color:var(--rp-nav-btn,#c0306a); line-height:1;
  flex-shrink:0; margin-left:4px; transition:opacity .15s,background .15s;
  padding:3px; opacity:0; pointer-events:none;
}
/* 桌面端:hover 气泡时显示 */
.rp-bwrap.rp-in:hover .rp-edit-btn,
.rp-bwrap.rp-in .rp-edit-btn:focus { opacity:1; pointer-events:auto; }
.rp-bwrap.rp-out:hover .rp-edit-btn,
.rp-bwrap.rp-out .rp-edit-btn:focus { opacity:1; pointer-events:auto; }
/* 触屏端:常驻半透明,随时可点 */
@media (hover:none) and (pointer:coarse) {
  .rp-edit-btn { opacity:0.5; pointer-events:auto; }
}
.rp-edit-btn:hover,.rp-edit-btn:active { background:rgba(0,0,0,.14); opacity:1; }

/* ── DELETE BUTTON ── */
.rp-del-btn {
  display:inline-flex; align-items:center; justify-content:center;
  width:22px; height:22px; border-radius:50%;
  background:rgba(0,0,0,.06); border:none; cursor:pointer;
  color:#e05060; line-height:1;
  flex-shrink:0; margin-left:2px; transition:opacity .15s,background .15s;
  padding:3px; opacity:0; pointer-events:none;
}
.rp-bwrap.rp-in:hover .rp-del-btn,
.rp-bwrap.rp-in .rp-del-btn:focus { opacity:1; pointer-events:auto; }
.rp-bwrap.rp-out:hover .rp-del-btn,
.rp-bwrap.rp-out .rp-del-btn:focus { opacity:1; pointer-events:auto; }
@media (hover:none) and (pointer:coarse) {
  .rp-del-btn { opacity:0.5; pointer-events:auto; }
}
.rp-del-btn:hover,.rp-del-btn:active { background:rgba(220,50,70,.15); opacity:1; }

/* 游戏聊天铅笔 */
.game-msg-char { position:relative; display:flex; align-items:flex-start; gap:4px; }
.game-edit-btn {
  display:inline-flex; align-items:center; justify-content:center;
  background:none; border:none; cursor:pointer;
  color:var(--rp-nav-btn,#c0306a); padding:2px;
  flex-shrink:0; line-height:1; width:18px; height:18px;
  opacity:0; pointer-events:none; transition:opacity .15s;
}
.game-msg-char:hover .game-edit-btn { opacity:1; pointer-events:auto; }
@media (hover:none) and (pointer:coarse) {
  .game-edit-btn { opacity:0.5; pointer-events:auto; }
}
.game-edit-btn:active { opacity:1; }
/* 日记回复铅笔 */
.rp-diary-reply { position:relative; }
.rp-diary-edit-btn {
  display:inline-flex; align-items:center; justify-content:center;
  background:none; border:none; cursor:pointer;
  color:var(--rp-nav-btn,#c0306a); padding:2px;
  width:18px; height:18px; line-height:1;
  opacity:0; pointer-events:none; transition:opacity .15s;
}
.rp-diary-reply:hover .rp-diary-edit-btn { opacity:1; pointer-events:auto; }
@media (hover:none) and (pointer:coarse) {
  .rp-diary-edit-btn { opacity:0.5; pointer-events:auto; }
}
.rp-diary-edit-btn:active { opacity:1; }
/* 内联编辑区 */
.rp-inline-edit-wrap {
  display:flex; flex-direction:column; gap:4px;
  max-width:72%; min-width:80px;
}
.rp-inline-textarea {
  border:1.5px solid var(--rp-nav-btn,#c0306a) !important;
  border-radius:12px !important; padding:8px 10px !important;
  font-size:13px !important; font-family:inherit !important;
  resize:none !important; outline:none !important;
  background:#ffffff !important; color:#1a1a2e !important;
  line-height:1.45 !important; min-height:48px !important;
  box-shadow:0 0 0 3px rgba(192,48,106,.12) !important;
}
/* star主题(深色): 编辑区用深紫底+亮字 */
#rp-phone.rp-theme-star .rp-inline-textarea {
  background:#1e1060 !important; color:#e8e0ff !important;
  border-color:#a78bfa !important;
  box-shadow:0 0 0 3px rgba(167,139,250,.18) !important;
}
/* misty主题(浅蓝): 白底深字 */
#rp-phone.rp-theme-misty .rp-inline-textarea {
  background:#f0f8ff !important; color:#0d2236 !important;
  border-color:#3d8abf !important;
  box-shadow:0 0 0 3px rgba(61,138,191,.14) !important;
}
/* candy主题(粉色,默认): 白底深字 */
.rp-inline-textarea {
  background:#ffffff !important; color:#2d1030 !important;
}
.rp-inline-edit-btns {
  display:flex; gap:6px; justify-content:flex-end;
}
.rp-inline-ok, .rp-inline-cancel {
  width:28px; height:28px; border-radius:50%; border:none;
  cursor:pointer; font-size:14px; display:flex;
  align-items:center; justify-content:center; font-weight:700;
}
.rp-inline-ok { background:var(--rp-nav-btn,#c0306a); color:#fff; }
.rp-inline-cancel { background:rgba(0,0,0,.1); color:#555; }

/* ══════════════════════════════════════════════════════════
   🏦 BANK CARD MODULE - 银行卡资产模块 (重构 v2)
   设计语言: 金融级高级感 · 浮雕质感 · 三主题全适配
   ══════════════════════════════════════════════════════════ */

/* ── CSS 设计 token (每主题独立覆盖) ── */
#rp-phone {
  --bank-bg-overlay: rgba(255,248,250,.18);
  --bank-hero-grad: linear-gradient(145deg, #1a0a0e 0%, #2d1020 40%, #1e0c18 70%, #0f0608 100%);
  --bank-hero-shine: linear-gradient(125deg, rgba(200,160,80,.22) 0%, transparent 45%, rgba(180,120,60,.12) 100%);
  --bank-hero-border: rgba(200,160,80,.28);
  --bank-hero-text: #f5ede0;
  --bank-hero-sub: rgba(245,237,224,.55);
  --bank-hero-accent: #c8a050;
  --bank-hero-amount: #faf0dc;
  --bank-card-bg: rgba(255,255,255,.62);
  --bank-card-border: rgba(255,255,255,.72);
  --bank-card-shadow: 0 6px 24px rgba(0,0,0,.07), 0 1px 0 rgba(255,255,255,.65) inset;
  --bank-label: rgba(80,20,48,.55);
  --bank-text: #1a0a12;
  --bank-text-sub: rgba(58,16,40,.78);
  --bank-divider: rgba(0,0,0,.06);
  --bank-ico-bg: rgba(255,255,255,.55);
  --bank-ico-shadow: 0 1px 5px rgba(0,0,0,.1);
  --bank-pos: #0d8a3e;
  --bank-neg: #d42020;
  --bank-tag-bg: rgba(180,130,60,.1);
  --bank-tag-text: #8a5a10;
  --bank-loading-color: #c03060;
  --bank-empty-color: rgba(60,16,40,.3);
  --bank-chip-bg: rgba(255,255,255,.55);
  --bank-chip-border: rgba(200,160,80,.25);
}

/* ─── 🌸 CANDY TOKEN (default, no class needed) ─── */
/* defaults above cover candy */

/* ─── ✨ STAR TOKEN ─── */
#rp-phone.rp-theme-star {
  --bank-bg-overlay: rgba(6,3,20,.15);
  --bank-hero-grad: linear-gradient(145deg, #0c0630 0%, #1a0858 40%, #120440 70%, #060220 100%);
  --bank-hero-shine: linear-gradient(125deg, rgba(160,120,255,.25) 0%, transparent 45%, rgba(100,60,200,.15) 100%);
  --bank-hero-border: rgba(160,120,255,.35);
  --bank-hero-text: #f0eaff;
  --bank-hero-sub: rgba(220,210,255,.5);
  --bank-hero-accent: #a87cfa;
  --bank-hero-amount: #ede4ff;
  --bank-card-bg: rgba(20,10,52,.72);
  --bank-card-border: rgba(140,100,255,.28);
  --bank-card-shadow: 0 6px 28px rgba(0,0,0,.45), 0 1px 0 rgba(160,130,255,.14) inset;
  --bank-label: rgba(210,195,255,.65);
  --bank-text: #e4d8ff;
  --bank-text-sub: rgba(200,185,255,.82);
  --bank-divider: rgba(140,100,255,.12);
  --bank-ico-bg: rgba(60,30,120,.55);
  --bank-ico-shadow: 0 1px 6px rgba(80,40,180,.22);
  --bank-pos: #86efac;
  --bank-neg: #fca5a5;
  --bank-tag-bg: rgba(140,100,255,.15);
  --bank-tag-text: #c8b0ff;
  --bank-loading-color: #a87cfa;
  --bank-empty-color: rgba(180,165,255,.35);
  --bank-chip-bg: rgba(40,20,90,.55);
  --bank-chip-border: rgba(160,120,255,.3);
}

/* ─── 🌿 MISTY TOKEN ─── */
#rp-phone.rp-theme-misty {
  --bank-bg-overlay: rgba(200,228,248,.12);
  --bank-hero-grad: linear-gradient(145deg, #062040 0%, #0e3060 40%, #0a2448 70%, #040e22 100%);
  --bank-hero-shine: linear-gradient(125deg, rgba(120,180,240,.28) 0%, transparent 45%, rgba(60,130,200,.15) 100%);
  --bank-hero-border: rgba(120,180,240,.32);
  --bank-hero-text: #e8f4ff;
  --bank-hero-sub: rgba(200,232,255,.52);
  --bank-hero-accent: #6ab4e8;
  --bank-hero-amount: #dff0ff;
  --bank-card-bg: rgba(228,243,255,.65);
  --bank-card-border: rgba(100,168,218,.3);
  --bank-card-shadow: 0 6px 24px rgba(0,60,120,.09), 0 1px 0 rgba(180,220,255,.62) inset;
  --bank-label: rgba(22,60,100,.62);
  --bank-text: #0c1e30;
  --bank-text-sub: rgba(20,50,88,.82);
  --bank-divider: rgba(80,150,210,.14);
  --bank-ico-bg: rgba(190,225,250,.55);
  --bank-ico-shadow: 0 1px 5px rgba(40,100,160,.12);
  --bank-pos: #0e7a36;
  --bank-neg: #c41c1c;
  --bank-tag-bg: rgba(60,130,200,.1);
  --bank-tag-text: #1a5a90;
  --bank-loading-color: #3d8fbf;
  --bank-empty-color: rgba(44,74,106,.4);
  --bank-chip-bg: rgba(200,228,250,.55);
  --bank-chip-border: rgba(80,150,210,.28);
}

/* ────────────────────────────────────────────
   VIEW CONTAINER
──────────────────────────────────────────── */
#rp-view-bank {
  background: transparent;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
#rp-phone.rp-theme-candy #rp-view-bank,
#rp-phone.rp-theme-star  #rp-view-bank,
#rp-phone.rp-theme-misty #rp-view-bank {
  background: var(--rp-home-wall) !important;
  background-size: cover !important;
  background-position: center !important;
}
/* 资产概览标题与 loading/empty 颜色统一 */
#rp-view-bank .rp-nav-title {
  color: var(--bank-loading-color, #c03060) !important;
  text-shadow: none !important;
}
#rp-view-bank .rp-back,
#rp-view-bank .rp-nav-add,
#rp-view-bank #rp-bank-refresh {
  color: var(--bank-loading-color, #c03060) !important;
  text-shadow: none !important;
}

/* ────────────────────────────────────────────
   SCROLL BODY
──────────────────────────────────────────── */
#rp-bank-body {
  flex: 1;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  padding: 12px 11px 32px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
#rp-bank-body::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
#rp-view-bank { scrollbar-width: none !important; }
#rp-view-bank::-webkit-scrollbar { display: none !important; }

/* ────────────────────────────────────────────
   HERO CARD (总资产 / 净资产)
   效果: 深色磨砂金属质感 + 金色/紫色/蓝色光晕
──────────────────────────────────────────── */
.rp-bank-hero {
  position: relative;
  border-radius: 22px;
  padding: 18px 18px 16px;
  overflow: visible;
  background: var(--bank-hero-grad);
  border: 1px solid var(--bank-hero-border);
  box-shadow:
    0 12px 40px rgba(0,0,0,.35),
    0 2px 0 rgba(255,255,255,.06) inset,
    0 -1px 0 rgba(0,0,0,.25) inset;
  /* clip 内容但不裁子元素伪元素 */
  isolation: isolate;
}
/* 金属反光层 */
.rp-bank-hero::before {
  content: '';
  position: absolute; inset: 0;
  background: var(--bank-hero-shine);
  pointer-events: none;
  border-radius: inherit;
  z-index: 0;
}
/* 底部柔和光晕 — 放到 box-shadow 代替伪元素避免裁切问题 */
.rp-bank-hero::after {
  content: '';
  position: absolute; bottom: -18px; left: 15%; right: 15%;
  height: 36px;
  background: var(--bank-hero-border);
  filter: blur(18px);
  opacity: .38;
  pointer-events: none;
  z-index: -1;
  border-radius: 50%;
}
.rp-bank-hero > * { position: relative; z-index: 1; }
.rp-bank-hero-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: var(--bank-chip-bg);
  border: 1px solid var(--bank-chip-border);
  border-radius: 20px;
  padding: 3px 10px 3px 7px;
  margin-bottom: 14px;
  backdrop-filter: blur(8px);
}
.rp-bank-hero-chip-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--bank-hero-accent);
  box-shadow: 0 0 6px var(--bank-hero-accent);
  flex-shrink: 0;
}
.rp-bank-hero-chip-text {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: .5px;
  text-transform: uppercase;
  color: var(--bank-hero-sub);
}
.rp-bank-hero-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .5px;
  text-transform: uppercase;
  color: var(--bank-hero-sub);
  margin-bottom: 6px;
}
.rp-bank-hero-amount {
  font-size: 34px;
  font-weight: 200;
  letter-spacing: -2px;
  color: var(--bank-hero-amount);
  line-height: 1;
  margin-bottom: 3px;
}
.rp-bank-hero-unit {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  vertical-align: super;
  margin-right: 3px;
  opacity: .75;
}
.rp-bank-hero-sub {
  font-size: 10px;
  color: var(--bank-hero-sub);
  letter-spacing: .2px;
  margin-top: 2px;
}
/* 底部分隔线 */
.rp-bank-hero-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--bank-hero-border), transparent);
  margin: 12px 0 10px;
  opacity: .6;
}
/* 底部快速指标行 */
.rp-bank-hero-stats {
  display: flex;
  gap: 0;
}
.rp-bank-hero-stat {
  flex: 1;
  text-align: center;
  padding: 0 4px;
  border-right: 1px solid rgba(255,255,255,.08);
}
.rp-bank-hero-stat:last-child { border-right: none; }
.rp-bank-hero-stat-val {
  font-size: 12px;
  font-weight: 700;
  color: var(--bank-hero-text);
  letter-spacing: -.3px;
}
.rp-bank-hero-stat-lbl {
  font-size: 9px;
  color: var(--bank-hero-sub);
  margin-top: 2px;
  letter-spacing: .3px;
}

/* ────────────────────────────────────────────
   SECTION CARD (资产分项 / 交易记录 等)
──────────────────────────────────────────── */
.rp-bank-card {
  background: var(--bank-card-bg);
  backdrop-filter: blur(18px) saturate(1.4);
  -webkit-backdrop-filter: blur(18px) saturate(1.4);
  border: 1px solid var(--bank-card-border);
  border-radius: 20px;
  padding: 14px 14px 10px;
  box-shadow: var(--bank-card-shadow);
}

/* ── 旧 .rp-bank-card 兼容:如果 hero 和 card 共用则 hero 覆盖 ── */
.rp-bank-card.rp-bank-hero {
  background: var(--bank-hero-grad) !important;
  border-color: var(--bank-hero-border) !important;
  box-shadow: 0 12px 40px rgba(0,0,0,.35) !important;
}

/* ────────────────────────────────────────────
   SECTION TITLE
──────────────────────────────────────────── */
.rp-bank-section-title {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: .55px;
  text-transform: uppercase;
  color: var(--bank-label);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}
/* 左侧装饰线 */
.rp-bank-section-title::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 11px;
  border-radius: 2px;
  background: var(--bank-hero-accent);
  opacity: .75;
  flex-shrink: 0;
}

/* ────────────────────────────────────────────
   总资产数字 (兼容旧 HTML 结构)
──────────────────────────────────────────── */
.rp-bank-total {
  font-size: 32px;
  font-weight: 200;
  letter-spacing: -2px;
  color: var(--bank-hero-amount);
  line-height: 1;
  margin-bottom: 3px;
}
.rp-bank-total-label {
  font-size: 10px;
  color: var(--bank-hero-sub);
  margin-bottom: 14px;
  letter-spacing: .3px;
}

/* ────────────────────────────────────────────
   资产构成 — 全新卡片列表布局（v4 完全重写）
   每个资产项 = 独立小卡片，上下分区，无截断
──────────────────────────────────────────── */

/* 资产列表容器：垂直堆叠，间距分明 */
.rp-asset-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
}

/* 每个资产项：独立小卡片 */
.rp-asset-item {
  background: var(--bank-ico-bg);
  border-radius: 14px;
  border: 1px solid var(--bank-divider);
  padding: 12px 14px;
  box-sizing: border-box;
}

/* 顶行：图标 + 资产名称（名称完整显示，允许换行） */
.rp-asset-header {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.rp-asset-ico {
  flex: 0 0 28px;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background: var(--bank-ico-bg);
  box-shadow: var(--bank-ico-shadow);
  border: 1px solid rgba(255,255,255,.3);
  margin-top: 1px;
}

.rp-asset-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--bank-text);
  line-height: 1.4;
  /* 关键：允许换行，绝不截断 */
  white-space: normal;
  word-break: break-word;
  flex: 1 1 0;
}

/* 底行：金额独占一行，desc 另起一行截断显示 */
.rp-asset-footer {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-left: 36px; /* 与名称对齐 */
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.rp-asset-amount {
  font-size: 15px;
  font-weight: 700;
  color: var(--bank-text);
  letter-spacing: -.3px;
  white-space: nowrap;
}
.rp-asset-amount.rp-bank-neg { color: var(--bank-neg) !important; }

.rp-asset-desc-wrap {
  position: relative;
  max-width: 100%;
}
.rp-asset-desc {
  font-size: 10px;
  color: var(--bank-text-sub);
  line-height: 1.5;
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  max-width: 100%;
}
.rp-asset-desc.rp-desc-expanded {
  display: block;
  -webkit-line-clamp: unset;
  overflow: visible;
}
.rp-asset-desc-more {
  color: var(--bank-hero-accent, #c8a050);
  cursor: pointer;
  font-size: 10px;
  user-select: none;
  white-space: nowrap;
}
.rp-asset-desc-more:active { opacity: 0.7; }

.rp-asset-change { display: none; }

/* 涨跌色 */
.rp-bank-pos { color: var(--bank-pos) !important; }
.rp-bank-neg-text { color: var(--bank-neg) !important; }

/* ────────────────────────────────────────────
   交易记录行
──────────────────────────────────────────── */
.rp-bank-txn {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: start;
  gap: 8px;
  padding: 9px 0;
  border-bottom: 1px solid var(--bank-divider);
}
.rp-bank-txn:last-child { border-bottom: none; }
.rp-bank-txn-ico {
  width: 34px; height: 34px;
  min-width: 34px;
  border-radius: 11px;
  display: flex; align-items: center; justify-content: center;
  font-size: 17px;
  background: var(--bank-ico-bg);
  box-shadow: var(--bank-ico-shadow);
  flex-shrink: 0;
  border: 1px solid rgba(255,255,255,.3);
  margin-top: 1px;
}
.rp-bank-txn-info { min-width: 0; overflow: hidden; width: 100%; }
.rp-bank-txn-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--bank-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.3;
  width: 100%;
}
.rp-bank-txn-date {
  font-size: 10px;
  color: var(--bank-text-sub);
  margin-top: 1px;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.rp-bank-txn-amt {
  font-size: 13px;
  font-weight: 700;
  color: var(--bank-text);
  flex-shrink: 0;
  letter-spacing: -.2px;
  white-space: nowrap;
}
.rp-bank-txn-amt.rp-bank-out { color: var(--bank-neg) !important; }
.rp-bank-txn-amt.rp-bank-in  { color: var(--bank-pos) !important; }

/* ────────────────────────────────────────────
   进度条 (借款/信用额度)
──────────────────────────────────────────── */
.rp-bank-bar-wrap {
  height: 4px;
  border-radius: 2px;
  background: var(--bank-divider);
  margin-top: 8px;
  overflow: hidden;
}
.rp-bank-bar-fill {
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--bank-hero-accent), var(--bank-hero-border));
  transition: width .9s cubic-bezier(.25,.46,.45,.94);
}

/* ────────────────────────────────────────────
   REFRESH 按钮
──────────────────────────────────────────── */
#rp-bank-refresh {
  background: none !important; border: none !important;
  color: var(--rp-nav-btn) !important;
  cursor: pointer !important; padding: 2px 4px !important;
  display: inline-flex !important; align-items: center !important;
  justify-content: center !important; border-radius: 6px !important;
  transition: transform .25s, opacity .2s !important;
  visibility: visible !important; opacity: 1 !important;
  pointer-events: auto !important;
}
#rp-bank-refresh:hover { transform: rotate(180deg) !important; }
#rp-bank-refresh:disabled { opacity: .35 !important; cursor: default !important; transform: none !important; }
#rp-bank-refresh.rp-spinning { animation: rpSpin .7s linear infinite !important; }

/* ────────────────────────────────────────────
   LOADING 占位
──────────────────────────────────────────── */
#rp-bank-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 24px 12px;
  padding: 24px 20px;
  border-radius: 18px;
  background: var(--bank-card-bg, rgba(255,255,255,.62));
  border: 1px solid var(--bank-card-border, rgba(255,255,255,.72));
  box-shadow: var(--bank-card-shadow, 0 6px 24px rgba(0,0,0,.07));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: var(--bank-loading-color, #c03060);
  font-size: 13px;
  font-weight: 600;
}
.rp-bank-loading-dots { display: flex; gap: 4px; }
.rp-bank-loading-dots span {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--bank-loading-color, #c03060);
  animation: rp-ts-dot 1.2s ease-in-out infinite;
  display: inline-block;
}
.rp-bank-loading-dots span:nth-child(2) { animation-delay: .2s; }
.rp-bank-loading-dots span:nth-child(3) { animation-delay: .4s; }

/* ────────────────────────────────────────────
   EMPTY 空状态
──────────────────────────────────────────── */
.rp-bank-empty {
  text-align: center;
  color: var(--bank-loading-color, #c03060);
  opacity: .88;
  margin: 24px 12px;
  padding: 28px 20px;
  border-radius: 18px;
  background: var(--bank-card-bg, rgba(255,255,255,.62));
  border: 1px solid var(--bank-card-border, rgba(255,255,255,.72));
  box-shadow: var(--bank-card-shadow, 0 6px 24px rgba(0,0,0,.07));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.6;
}

/* ── GLOBAL SCROLLBAR HIDE ── */
/* PC端隐藏所有滚动条，移动端靠原生手势滚动，不展示滚动条 */
#rp-phone * {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
#rp-phone *::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

`;
