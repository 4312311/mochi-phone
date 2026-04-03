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
