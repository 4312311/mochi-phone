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