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