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