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
