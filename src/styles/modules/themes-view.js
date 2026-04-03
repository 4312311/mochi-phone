export const css = `/* ── Misty Blue Hydrangea Theme ── */
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
`;
