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
