export const css = `#rp-view-g2048{position:relative;background:transparent;display:flex;flex-direction:column;overflow:hidden;height:100%}
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
`;
