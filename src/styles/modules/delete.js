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
