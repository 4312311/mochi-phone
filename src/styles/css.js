// ================================================================
//  INJECT STYLES
//  CSS 从 manifest 的 css 字段移至此处 JS 注入,
//  彻底绕开 SillyTavern 扩展 CSS 加载管线,
//  避免与终端正则美化 <style> 标签的 CSS 解析器产生冲突。
// ================================================================

export const RP_PHONE_CSS = `/* ── wrapper ── */
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

/* ── Misty Blue Theme ── */
#rp-phone.rp-theme-misty {
  --rp-frame-bg:linear-gradient(160deg,#e0f0ff,#c0d8f0);
  --rp-frame-sh:0 0 0 1.5px rgba(140,175,210,.3),0 0 0 1.5px rgba(140,175,210,.15),0 36px 80px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.6);
  --rp-btn-bg:#a8c8e8;
  --rp-island-bg:#0d2236;
  --rp-island-ring:#1a3a5a;
  --rp-screen-bg:transparent;
  --rp-sbar-color:#1a4a7a;
  --rp-bat-border:rgba(26,74,122,.5);
  --rp-bat-nub:rgba(26,74,122,.4);
  --rp-lock-wall:linear-gradient(rgba(200,220,240,.08),rgba(180,205,230,.10)),url('https://i.postimg.cc/nLwzZd2w/blue-misty-wallpaper.jpg') center/cover no-repeat;
  --rp-lock-color:#0d2236;
  --rp-lock-time:#1a4a7a;
  --rp-swipe-color:rgba(26,74,122,.35);
  --rp-ln-bg:rgba(235,248,255,.88);
  --rp-ln-bd:rgba(140,175,210,.15);
  --rp-ln-text:rgba(13,34,54,.88);
  --rp-home-wall:linear-gradient(rgba(200,220,240,.06),rgba(180,205,230,.08)),url('https://i.postimg.cc/nLwzZd2w/blue-misty-wallpaper.jpg') center/cover no-repeat;
  --rp-clock-color:#1a4a7a;
  --rp-app-lbl:rgba(13,34,54,.92);
  --rp-app-lbl-sh:0 1px 5px rgba(255,255,255,.7);
  --rp-indicator:rgba(26,74,122,.3);
  --rp-widget-bg:rgba(235,248,255,.7);
  --rp-widget-bd:rgba(140,175,210,.18);
  --rp-widget-color:#0d2236;
  --rp-wd-fill:linear-gradient(90deg,#3b82f6,#0ea5e9);
  --rp-nav-bg:rgba(235,248,255,.75);
  --rp-nav-bd:rgba(140,175,210,.25);
  --rp-nav-title:#0d2236;
  --rp-nav-btn:#0ea5e9;
  --rp-msg-bg:transparent;
  --rp-bubbles-bg:transparent;
  --rp-sent-bg:#3b82f6;
  --rp-recv-bg:#e8f4fc;
  --rp-recv-color:#0d2236;
  --rp-composer-bg:rgba(235,248,255,.85);
  --rp-composer-bd:rgba(140,175,210,.22);
  --rp-input-bg:rgba(13,34,54,.05);
  --rp-input-bd:rgba(140,175,210,.25);
  --rp-input-color:#0d2236;
  --rp-send-bg:linear-gradient(135deg,#3b82f6,#0ea5e9);
  --rp-ico-radius:10px;
  --rp-ico-sh:0 2px 10px rgba(26,74,122,.18);
  --rp-ico-hover-sh:0 6px 18px rgba(14,165,233,.25);
  --rp-ico-hover-lift:translateY(-1.5px) scale(1.05);
  --rp-ico-active:scale(.86);
  --rp-send-size:34px;
  --rp-send-radius:10px;
  --rp-send-sh:0 2px 8px rgba(59,130,246,.3);
  --rp-send-hover-sh:0 4px 14px rgba(14,165,233,.45);
  --rp-input-radius:12px;
  --rp-input-sh:none;
  --rp-input-focus-sh:0 0 0 2.5px rgba(59,130,246,.12);
  --rp-bubble-radius:12px;
  --rp-bubble-radius-out:12px 12px 4px 12px;
  --rp-bubble-radius-in:12px 12px 12px 4px;
  --rp-nav-btn-radius:4px;
  --rp-nav-sh:0 1px 0 rgba(140,175,210,.18);
  --rp-thread-radius:0px;
  --rp-thread-mx:0px;
  --rp-thread-sh:none;
  --rp-moment-radius:0px;
  --rp-widget-radius:14px;
  --rp-widget-sh:0 2px 14px rgba(59,130,246,.12);
  --rp-transition:transform .1s ease, box-shadow .1s ease;
  --rp-themes-bg:transparent;
  --rp-themes-label:#1a4a7a;
  --rp-tc-bg:rgba(235,248,255,.9);
  --rp-threads-bg:transparent;
  --rp-thread-bd:rgba(140,175,210,.12);
  --rp-thread-hover:rgba(26,74,122,.04);
  --rp-tn-color:#0d2236;
  --rp-tp-color:rgba(26,74,122,.55);
  --rp-tt-color:rgba(26,74,122,.45);
  --rp-hd-name:rgba(26,74,122,.65);
  --rp-bts-color:rgba(26,74,122,.45);
  --rp-moments-bg:transparent;
  --rp-moment-card:rgba(235,248,255,.9);
  --rp-moment-name:#3b82f6;
  --rp-moment-text:#0d2236;
  --rp-moment-bd:rgba(140,175,210,.12);
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
  margin-bottom:8px;
}
#rp-about-ver {
  font-size:12px;
  color:var(--rp-about-text,#7a2040);
  margin-bottom:16px;
  opacity:.8;
}
.rp-about-desc {
  font-size:13px;
  color:var(--rp-about-text,#7a2040);
  line-height:1.7;
  text-align:center;
  max-width:220px;
}
#rp-about-credit {
  margin-top:16px;
  padding-top:16px;
  border-top:1px solid rgba(0,0,0,.08);
  font-size:11px;
  color:var(--rp-about-text,#7a2040);
  opacity:.65;
}

/* ── NAV BAR ── */
#rp-nav {
  position:absolute; top:0; left:0; right:0; height:48px;
  background:var(--rp-nav-bg); backdrop-filter:blur(20px);
  border-bottom:1px solid var(--rp-nav-bd);
  display:flex; align-items:center; padding:0 12px 0 4px;
  z-index:150; box-shadow:var(--rp-nav-sh);
}
#rp-nav-back {
  width:32px; height:32px;
  display:flex; align-items:center; justify-content:center;
  cursor:pointer; color:var(--rp-nav-btn);
  border-radius:var(--rp-nav-btn-radius);
}
#rp-nav-title {
  flex:1; text-align:center;
  font-size:15px; font-weight:600; color:var(--rp-nav-title);
  padding:0 12px;
}
#rp-nav-action {
  width:32px; height:32px;
  display:flex; align-items:center; justify-content:center;
  cursor:pointer; color:var(--rp-nav-btn);
  border-radius:var(--rp-nav-btn-radius);
}

/* ── SCROLL AREA ── */
.rp-scroll {
  position:absolute; inset:0;
  overflow-y:auto; overflow-x:hidden;
  padding-top:48px; padding-bottom:0;
}

/* ── THREAD LIST ── */
.rp-thread {
  display:flex; align-items:center; gap:10px;
  padding:10px 14px; margin:0 10px;
  border-radius:var(--rp-thread-radius);
  background:var(--rp-threads-bg);
  border-bottom:1px solid var(--rp-thread-bd);
  cursor:pointer; transition:background .15s;
}
.rp-thread:hover { background:var(--rp-thread-hover); }
.rp-thread-av { width:48px; height:48px; border-radius:20px; flex-shrink:0; object-fit:cover; background:#f0f0f5; }
.rp-thread-info { flex:1; min-width:0; }
.rp-thread-name { font-size:14px; font-weight:600; color:var(--rp-tn-color); margin-bottom:2px; }
.rp-thread-preview { font-size:12px; color:var(--rp-tp-color); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.rp-thread-time { font-size:11px; color:var(--rp-tt-color); white-space:nowrap; }
.rp-thread-meta { display:flex; flex-direction:column; align-items:flex-end; gap:4px; }
.rp-thread-unread { font-size:10px; color:#fff; background:var(--rp-nav-btn); padding:2px 5px; border-radius:10px; min-width:18px; text-align:center; }

/* ── CHAT VIEW ── */
#rp-chat-header {
  position:absolute; top:0; left:0; right:0; height:48px;
  background:var(--rp-nav-bg); backdrop-filter:blur(20px);
  border-bottom:1px solid var(--rp-nav-bd);
  display:flex; align-items:center; padding:0 12px;
  z-index:160;
}
#rp-chat-av { width:32px; height:32px; border-radius:14px; object-fit:cover; background:#f0f0f5; }
#rp-chat-info { flex:1; padding:0 10px; min-width:0; }
#rp-chat-name { font-size:14px; font-weight:600; color:var(--rp-nav-title); }
#rp-chat-status { font-size:11px; color:rgba(0,0,0,.5); }

#rp-chat-bubbles {
  position:absolute; top:48px; left:0; right:0; bottom:70px;
  overflow-y:auto; overflow-x:hidden;
  padding:10px 12px;
  background:var(--rp-bubbles-bg);
}
.rp-bubble-wrap {
  display:flex; gap:6px; margin-bottom:8px;
}
.rp-bubble-wrap.sent { flex-direction:row-reverse; }
.rp-bubble-av { width:28px; height:28px; border-radius:12px; flex-shrink:0; object-fit:cover; background:#f0f0f5; }
.rp-bubble {
  max-width:75%; padding:8px 11px;
  border-radius:var(--rp-bubble-radius);
  background:var(--rp-sent-bg);
  color:#fff;
  font-size:13px; line-height:1.45;
  word-wrap:break-word;
}
.rp-bubble-wrap.received .rp-bubble {
  background:var(--rp-recv-bg);
  color:var(--rp-recv-color);
  border-radius:var(--rp-bubble-radius);
}
.rp-bubble-time { font-size:10px; opacity:.55; margin-top:3px; text-align:right; }
.rp-bubble-wrap.received .rp-bubble-time { text-align:left; }

/* pending_image placeholder */
.rp-bubble.pending_image {
  min-width:80px; min-height:60px;
  display:flex; align-items:center; justify-content:center;
  background:var(--rp-recv-bg);
  color:rgba(0,0,0,.4);
  font-size:11px;
  position:relative;
  overflow:hidden;
}
.rp-bubble.pending_image::before {
  content:'';
  position:absolute; inset:0;
  background:repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(0,0,0,.03) 10px,rgba(0,0,0,.03) 20px);
  animation:rp-pending-scan 1.5s linear infinite;
}
@keyframes rp-pending-scan { from{transform:translateY(0)} to{transform:translateY(40px)} }

/* ── COMPOSER ── */
#rp-composer {
  position:absolute; left:0; right:0; bottom:0; height:70px;
  background:var(--rp-composer-bg); backdrop-filter:blur(20px);
  border-top:1px solid var(--rp-composer-bd);
  display:flex; align-items:center; gap:8px; padding:0 10px;
  z-index:170;
}
#rp-compose-input {
  flex:1; height:36px;
  border-radius:var(--rp-input-radius);
  background:var(--rp-input-bg);
  border:1.5px solid var(--rp-input-bd);
  color:var(--rp-input-color);
  font-size:13px; padding:0 12px;
  outline:none;
  box-shadow:var(--rp-input-sh);
}
#rp-compose-input:focus { box-shadow:var(--rp-input-focus-sh); }
#rp-compose-send {
  width:var(--rp-send-size); height:var(--rp-send-size);
  border-radius:var(--rp-send-radius);
  background:var(--rp-send-bg);
  border:none; color:#fff;
  font-size:14px; cursor:pointer;
  box-shadow:var(--rp-send-sh);
  transition:all .2s;
}
#rp-compose-send:hover { box-shadow:var(--rp-send-hover-sh); transform:scale(1.05); }

/* ── ATTACHMENT BUTTONS ── */
#rp-attach-panel {
  position:absolute; bottom:75px; left:12px; right:12px;
  background:var(--rp-composer-bg); backdrop-filter:blur(20px);
  border:1px solid var(--rp-composer-bd);
  border-radius:12px;
  padding:10px;
  display:none; gap:10px;
  box-shadow:0 4px 20px rgba(0,0,0,.15);
}
.rp-attach-btn {
  flex:1; display:flex; flex-direction:column;
  align-items:center; gap:6px;
  padding:12px 6px;
  border-radius:8px;
  cursor:pointer; transition:background .2s;
}
.rp-attach-btn:hover { background:rgba(0,0,0,.05); }
.rp-attach-btn span { font-size:12px; color:rgba(0,0,0,.7); }

/* ── THEMES VIEW ── */
#rp-themes-view {
  padding:16px;
  background:var(--rp-themes-bg);
}
.rp-themes-label {
  font-size:12px; text-transform:uppercase; letter-spacing:1px;
  color:var(--rp-themes-label); margin-bottom:12px;
}
.rp-theme-card {
  display:flex; align-items:center; gap:12px;
  padding:12px; margin-bottom:10px;
  background:var(--rp-tc-bg);
  border-radius:14px;
  border:1.5px solid rgba(0,0,0,.06);
  cursor:pointer;
}
.rp-theme-card:hover { border-color:var(--rp-nav-btn); }
.rp-theme-preview { width:44px; height:44px; border-radius:10px; flex-shrink:0; }
.rp-theme-info { flex:1; }
.rp-theme-name { font-size:14px; font-weight:600; color:var(--rp-nav-title); }
.rp-theme-desc { font-size:11px; color:rgba(0,0,0,.5); margin-top:2px; }

/* ── SETTINGS VIEW ── */
#rp-settings-view { padding:16px; }
.rp-setting-group { margin-bottom:20px; }
.rp-setting-label { font-size:12px; font-weight:600; color:rgba(0,0,0,.5); margin-bottom:8px; text-transform:uppercase; letter-spacing:.5px; }
.rp-setting-input {
  width:100%; padding:8px 12px;
  border:1.5px solid rgba(0,0,0,.12); border-radius:8px;
  font-size:13px; outline:none;
}
.rp-setting-input:focus { border-color:var(--rp-nav-btn); }
.rp-setting-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
.rp-setting-desc { font-size:12px; color:rgba(0,0,0,.5); margin-top:4px; }
.rp-setting-btn {
  padding:8px 16px; background:var(--rp-nav-btn); color:#fff;
  border:none; border-radius:8px; font-size:13px; cursor:pointer;
}

/* ── API SETTINGS VIEW ── */
#rp-api-view { padding:16px; }
.rp-api-section { margin-bottom:24px; padding-bottom:16px; border-bottom:1px solid rgba(0,0,0,.08); }
.rp-api-title { font-size:14px; font-weight:600; color:var(--rp-nav-title); margin-bottom:10px; }
.rp-api-field { margin-bottom:12px; }
.rp-api-label { font-size:12px; color:rgba(0,0,0,.6); margin-bottom:4px; }
.rp-api-textarea {
  width:100%; min-height:80px;
  padding:8px 10px; border:1.5px solid rgba(0,0,0,.12);
  border-radius:8px; font-size:12px;
  resize:vertical; outline:none; font-family:monospace;
}
.rp-api-btn-row { display:flex; gap:8px; margin-top:8px; }
.rp-api-btn {
  flex:1; padding:8px 12px;
  border-radius:6px; border:none;
  font-size:12px; cursor:pointer;
}
.rp-api-primary { background:var(--rp-nav-btn); color:#fff; }
.rp-api-secondary { background:rgba(0,0,0,.08); color:var(--rp-nav-title); }
.rp-api-status {
  padding:8px 12px; border-radius:6px;
  font-size:11px; margin-top:8px;
}
.rp-api-status.success { background:rgba(52,199,89,.15); color:#34c759; }
.rp-api-status.error { background:rgba(255,59,48,.15); color:#ff3b30; }

/* ── MOMENTS VIEW ── */
#rp-moments-view { padding:0; background:var(--rp-moments-bg); }
.rp-moment { padding:16px 14px; background:var(--rp-moment-card); border-bottom:1px solid var(--rp-moment-bd); }
.rp-moment-header { display:flex; align-items:center; gap:10px; margin-bottom:8px; }
.rp-moment-av { width:36px; height:36px; border-radius:14px; object-fit:cover; background:#f0f0f5; }
.rp-moment-name { font-size:13px; font-weight:600; color:var(--rp-moment-name); }
.rp-moment-time { font-size:11px; color:rgba(0,0,0,.4); margin-left:auto; }
.rp-moment-text { font-size:13px; color:var(--rp-moment-text); line-height:1.5; margin-bottom:8px; }
.rp-moment-img { width:100%; border-radius:8px; margin-bottom:8px; object-fit:cover; max-height:220px; }
.rp-moment-actions { display:flex; gap:16px; margin-top:8px; }
.rp-moment-action { display:flex; align-items:center; gap:4px; font-size:12px; color:rgba(0,0,0,.5); cursor:pointer; }
.rp-moment-action:hover { color:var(--rp-moment-name); }
.rp-moment-liked { color:var(--rp-moment-name); }

/* ── DIARY VIEW ── */
#rp-diary-view { padding:12px; }
.rp-diary-entry { padding:12px; margin-bottom:10px; background:rgba(255,255,255,.6); border-radius:10px; border:1px solid rgba(0,0,0,.06); }
.rp-diary-date { font-size:11px; color:rgba(0,0,0,.45); margin-bottom:4px; }
.rp-diary-text { font-size:13px; color:rgba(0,0,0,.75); line-height:1.6; }
.rp-diary-reply { margin-top:8px; padding:8px; background:rgba(37,99,235,.08); border-radius:8px; font-size:12px; color:rgba(37,99,235,.85); }

/* ── XIAOHONGSHU VIEW ── */
#rp-xhs-view { padding:12px; }
.rp-xhs-card { margin-bottom:12px; border-radius:12px; overflow:hidden; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,.06); }
.rp-xhs-cover { width:100%; height:180px; object-fit:cover; }
.rp-xhs-content { padding:10px; }
.rp-xhs-title { font-size:13px; font-weight:600; color:#1a1a1a; margin-bottom:4px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.rp-xhs-author { display:flex; align-items:center; gap:6px; margin-top:8px; }
.rp-xhs-author-av { width:20px; height:20px; border-radius:50%; background:#f0f0f5; }
.rp-xhs-author-name { font-size:11px; color:rgba(0,0,0,.6); }
.rp-xhs-meta { display:flex; gap:12px; margin-top:8px; font-size:11px; color:rgba(0,0,0,.45); }

/* ── BANK VIEW ── */
#rp-bank-view { padding:16px; }
.rp-bank-card {
  background:linear-gradient(135deg,#1a365d,#2c5282);
  border-radius:16px; padding:20px; margin-bottom:16px;
  color:#fff; box-shadow:0 4px 12px rgba(0,0,0,.15);
}
.rp-bank-balance { font-size:28px; font-weight:700; margin:8px 0; }
.rp-bank-label { font-size:11px; opacity:.7; }
.rp-bank-amount { font-size:11px; }
.rp-bank-income { color:#48bb78; }
.rp-bank-expense { color:#f56565; }
.rp-bank-row { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,.1); }
.rp-bank-row:last-child { border-bottom:none; }

/* ── GAME 2048 VIEW ── */
#rp-game-2048-view { padding:16px; display:flex; flex-direction:column; align-items:center; }
.rp-game-2048-grid {
  display:grid; grid-template-columns:repeat(4,1fr); gap:8px;
  background:rgba(187,173,160,.3); padding:8px; border-radius:6px;
  width:240px; height:240px;
}
.rp-game-2048-cell {
  background:rgba(238,228,218,.35); border-radius:3px;
  display:flex; align-items:center; justify-content:center;
  font-size:20px; font-weight:700; color:#776e65;
}
.rp-game-2048-score { font-size:16px; font-weight:600; margin-bottom:12px; }

/* ── GAME GOLD MINER VIEW ── */
#rp-game-gold-view { position:relative; overflow:hidden; }
.rp-game-canvas { display:block; width:100%; height:100%; }
.rp-game-ui { position:absolute; top:48px; left:0; right:0; padding:10px; display:flex; justify-content:space-between; font-size:13px; font-weight:600; color:#fff; text-shadow:0 1px 3px rgba(0,0,0,.3); }

/* ── GAME LUDO VIEW ── */
#rp-game-ludo-view { position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center; }
.rp-ludo-board { width:260px; height:260px; background:#fff; border-radius:12px; box-shadow:0 2px 12px rgba(0,0,0,.15); position:relative; }
.rp-ludo-square { position:absolute; width:28px; height:28px; border-radius:6px; border:1px solid rgba(0,0,0,.08); display:flex; align-items:center; justify-content:center; font-size:10px; }
.rp-ludo-safe { background:rgba(0,255,0,.1); }
.rp-ludo-piece { width:22px; height:22px; border-radius:50%; border:2px solid #fff; box-shadow:0 2px 4px rgba(0,0,0,.2); }
.rp-ludo-piece.user { background:#ef4444; }
.rp-ludo-piece.char { background:#3b82f6; }
.rp-ludo-dice { position:absolute; bottom:20px; left:50%; transform:translateX(-50%); width:50px; height:50px; background:#fff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,.15); display:flex; align-items:center; justify-content:center; font-size:28px; cursor:pointer; transition:transform .15s; }
.rp-ludo-dice:active { transform:translateX(-50%) scale(.9); }

/* ── OVERLAYS & DIALOGS ── */
.rp-overlay {
  position:fixed; inset:0; background:rgba(0,0,0,.4);
  display:none; align-items:center; justify-content:center;
  z-index:10000;
}
.rp-dialog {
  background:#fff; border-radius:16px;
  padding:20px; width:80%; max-width:280px;
  box-shadow:0 8px 32px rgba(0,0,0,.2);
}
.rp-dialog-title { font-size:16px; font-weight:600; margin-bottom:12px; }
.rp-dialog-btn { padding:10px 20px; border-radius:8px; border:none; font-size:14px; cursor:pointer; width:100%; }
.rp-dialog-primary { background:var(--rp-nav-btn); color:#fff; margin-top:8px; }

/* ── SCROLLBAR ── */
#rp-phone * { scrollbar-width: none !important; }
#rp-phone *::-webkit-scrollbar { display: none !important; }
#rp-phone *::-webkit-scrollbar-thumb { display: none !important; }
#rp-phone *::-webkit-scrollbar-track { display: none !important; }

#rp-phone * { -ms-overflow-style: none !important; }
#rp-phone *::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

`;

export function injectStyles() {
  if (document.getElementById('rp-phone-css')) return;
  const style = document.createElement('style');
  style.id = 'rp-phone-css';
  style.textContent = RP_PHONE_CSS;
  document.head.appendChild(style);
  console.log('[Raymond Phone] CSS injected');
}
