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
