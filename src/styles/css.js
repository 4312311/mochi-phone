// ================================================================
//  CSS STYLES
//  CSS 样式定义
// ================================================================
const RP_PHONE_CSS = `/* ── wrapper ── */
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
  --rp-frame-bg:linear-gradient(160deg,#e8e8e8,#d0d0d0);
  --rp-frame-sh:0 0 0 1.5px rgba(0,0,0,.12),0 0 0 1.5px rgba(0,0,0,.08),0 36px 80px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.5);
  --rp-btn-bg:#c0c0c0;
  --rp-island-bg:#000;
  --rp-island-ring:#f5f5f5;
  --rp-screen-bg:#fff;
  --rp-sbar-color:#e06080;
  --rp-bat-border:rgba(0,0,0,.4);
  --rp-bat-nub:rgba(0,0,0,.3);
  --rp-lock-wall:linear-gradient(rgba(255,230,240,.10),rgba(255,210,225,.12)),url('https://i.postimg.cc/Hx8NSZL6/shou-ji-bi-zhi-fen-xiang-fen-se-da-hai-wen-rou-bao-ji-1-chao-ji-kun-dan-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat;
  --rp-lock-color:#4a1030;
  --rp-lock-time:#e06080;
  --rp-swipe-color:rgba(120,40,70,.4);
  --rp-ln-bg:rgba(255,255,255,.85);
  --rp-ln-bd:rgba(0,0,0,.06);
  --rp-ln-text:rgba(0,0,0,.85);
  --rp-home-wall:linear-gradient(rgba(255,230,240,.08),rgba(255,215,228,.10)),url('https://i.postimg.cc/Hx8NSZL6/shou-ji-bi-zhi-fen-xiang-fen-se-da-hai-wen-rou-bao-ji-1-chao-ji-kun-dan-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat;
  --rp-clock-color:#e06080;
  --rp-app-lbl:#c04870;
  --rp-app-lbl-sh:0 1px 6px rgba(255,255,255,.8);
  --rp-indicator:rgba(0,0,0,.25);
  --rp-widget-bg:rgba(255,255,255,.6);
  --rp-widget-bd:rgba(0,0,0,.08);
  --rp-widget-color:#000;
  --rp-wd-fill:linear-gradient(90deg,#2563eb,#60a5fa);
  --rp-nav-bg:rgba(255,255,255,.72);
  --rp-nav-bd:rgba(255,180,200,.2);
  --rp-nav-title:#4a1030;
  --rp-nav-btn:#c0306a;
  --rp-msg-bg:transparent;
  --rp-bubbles-bg:transparent;
  --rp-sent-bg:#2563eb;
  --rp-recv-bg:#e9ecef;
  --rp-recv-color:#000;
  --rp-composer-bg:rgba(255,255,255,.75);
  --rp-composer-bd:rgba(255,180,200,.2);
  --rp-input-bg:rgba(0,0,0,.04);
  --rp-input-bd:rgba(0,0,0,.12);
  --rp-input-color:#000;
  --rp-send-bg:linear-gradient(135deg,#e0567a,#f472b6);
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
  --rp-threads-bg:transparent;
  --rp-thread-bd:rgba(0,0,0,.08);
  --rp-thread-hover:rgba(0,0,0,.03);
  --rp-tn-color:#000;
  --rp-tp-color:rgba(0,0,0,.5);
  --rp-tt-color:rgba(0,0,0,.4);
  --rp-hd-name:rgba(0,0,0,.6);
  --rp-bts-color:rgba(0,0,0,.4);
  --rp-moments-bg:transparent;
  --rp-moment-card:#fff;
  --rp-moment-name:#2563eb;
  --rp-moment-text:#1a1a1a;
  --rp-moment-bd:rgba(0,0,0,.06);
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
.rp-ln-del-btn {
  position: absolute;
  right: 0; top: 0; bottom: 0;
  width: 72px;
  background: #ff3b30;
  display: flex; align-items:center; justify-content:center;
  color: #fff; font-size: 12px; font-weight: 700;
  cursor: pointer;
  border-radius: 0 14px 14px 0;
  user-select: none;
  z-index: 1;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease;
}
.rp-ln-wrap.rp-ln-wrap-active .rp-ln-del-btn {
  opacity: 1;
  pointer-events: auto;
}
.rp-ln {
  position: relative;
  z-index: 2;
  background:var(--rp-ln-bg); backdrop-filter:blur(24px);
  border:1px solid var(--rp-ln-bd); border-radius:14px;
  padding:10px 14px; display:flex; flex-direction:column; gap:4px;
  box-shadow:0 2px 8px rgba(0,0,0,.08);
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

/* Pending queue */
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
  visibility:visible !important; opacity:1 !important; pointer-events:auto !important;
}
.rp-thread-hd { display:flex; flex-direction:column; align-items:center; gap:4px; }
.rp-hd-av { width:32px; height:32px; border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#fff; }
.rp-hd-name { font-size:11px; color:var(--rp-hd-name); }

/* ── ADD CONTACT MODAL ── */
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

/* ── DARK FRAME ── */
.rp-dark #rp-frame{background:linear-gradient(160deg,#1e1e1e,#101010);box-shadow:0 0 0 1.5px rgba(255,255,255,.06),0 0 0 9px #0c0c0c,0 0 0 10px rgba(255,255,255,.04),0 36px 80px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.06)}
.rp-dark .rp-btn{background:#2c2c2c}
.rp-dark #rp-screen{background:var(--rp-home-wall);background-size:cover;background-position:center}
.rp-dark #rp-island{background:#0a0a0a}
.rp-dark .rp-lock-bg{background:radial-gradient(ellipse 120% 80% at 30% 15%,rgba(80,60,200,.35),transparent 55%),radial-gradient(ellipse 100% 80% at 80% 85%,rgba(40,60,200,.25),transparent 55%),linear-gradient(180deg,#0c0c1a,#08080f,#0c0c1a)}
.rp-dark .rp-lock-body{color:#e0e2f0}
.rp-dark #rp-lock-time{color:#eef0ff}
.rp-dark #rp-lock-date{display:none!important}
.rp-dark .rp-ln{background:rgba(12,12,24,.88);border-color:rgba(255,255,255,.07)}
.rp-dark .rp-ln-type{color:rgba(160,175,255,.45)}
.rp-dark .rp-ln-text{color:rgba(210,218,255,.85)}
.rp-dark #rp-swipe-hint{color:rgba(180,195,255,.3)}
.rp-dark #rp-sbar{color:#dde0f2}
.rp-dark .rp-home-bg{background:radial-gradient(ellipse 100% 70% at 20% 10%,rgba(50,60,140,.38),transparent 50%),radial-gradient(ellipse 100% 70% at 80% 90%,rgba(30,50,130,.28),transparent 50%),linear-gradient(170deg,#0c0c1a,#090912,#0c0c1a)}
.rp-dark #rp-home-clock{color:#eef0ff}
.rp-dark .rp-app-lbl{color:rgba(210,218,255,.88);text-shadow:0 1px 3px rgba(0,0,0,.7)}
.rp-dark .rp-app-ico{box-shadow:0 2px 10px rgba(0,0,0,.5)}
.rp-dark .rp-app-off{opacity:.2}
.rp-dark #rp-widget{background:rgba(12,12,24,.78);border-color:rgba(255,255,255,.07);box-shadow:0 2px 12px rgba(0,0,0,.4)}

/* ── Base: remove all hardcoded inline bg on icons ── */
#rp-phone .rp-app-ico {
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
  font-size: 28px !important;
  transition: transform .14s ease, filter .14s ease !important;
  filter: drop-shadow(0 1px 4px rgba(0,0,0,.35)) !important;
  color: var(--rp-clock-color) !important;
}
#rp-phone .rp-app-ico:active { transform: scale(.88) !important; }

/* ══ 🌸 CANDY: PINK BUBBLES ══ */
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
#rp-phone.rp-theme-candy .rp-nav-bar {
  background: transparent !important;
  border-bottom: 1px solid rgba(220,130,165,.15) !important;
}
#rp-phone.rp-theme-candy #rp-send {
  background: linear-gradient(135deg, #e8648a, #f472b6) !important;
  border-radius: 50% !important;
  box-shadow: 0 4px 16px rgba(220,80,130,.35) !important;
}
#rp-phone.rp-theme-candy #rp-input {
  border-color: rgba(220,130,165,.35) !important;
  border-radius: 20px !important;
}
#rp-phone.rp-theme-candy .rp-av {
  border-radius: 50% !important;
  box-shadow: 0 3px 12px rgba(200,100,140,.2) !important;
}
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

/* ══ ✨ STAR: DARK TECH CHIPS ══ */
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
#rp-phone.rp-theme-star .rp-nav-bar {
  background: transparent !important;
  border-bottom: 1px solid rgba(150,100,255,.15) !important;
}
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
#rp-phone.rp-theme-star .rp-av {
  border-radius: 10px !important;
  box-shadow: 0 0 8px rgba(120,60,255,.25) !important;
}

/* ══ 🌿 MISTY: WATERCOLOR OVALS ══ */
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
#rp-phone.rp-theme-misty .rp-nav-bar {
  background: transparent !important;
  border-bottom: 1px solid rgba(130,175,215,.2) !important;
}
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

/* ── about page ── */
#rp-about-page {
  position:absolute; inset:0;
  display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  padding:20px 24px 36px;
  --rp-about-card-bg: rgba(255,240,245,.72);
  --rp-about-card-bd: rgba(224,96,128,.18);
  --rp-about-text: #7a2040;
  --rp-about-hl-color: #a01838;
  --rp-about-bg:var(--rp-screen-bg,#fff);
}
#rp-phone.rp-theme-star #rp-about-page {
  --rp-about-card-bg: rgba(14,10,45,.78);
  --rp-about-card-bd: rgba(168,85,247,.22);
  --rp-about-text: #e0d8ff;
  --rp-about-hl-color: #c8b4ff;
}
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

/* ── LOCK SCREEN WIDGET ── */
#rp-lock-widget {
  position:absolute; bottom:80px; left:0; right:0;
  display:flex; justify-content:center;
  pointer-events:none;
}

/* Hide scrollbars */
#rp-phone *::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}
`;