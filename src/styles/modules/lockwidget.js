/* ── LOCK SCREEN WIDGET ── */
#rp-lock-widget {
  position:absolute; bottom:72px; left:50%; transform:translateX(-50%);
  width:calc(100% - 40px); max-width:220px;
  background:rgba(255,255,255,.18);
  border:1px solid rgba(255,255,255,.28);
  border-radius:18px; padding:12px 16px;
  color:#fff; text-align:left;
  display:none;
}
#rp-lock-widget .rp-lw-label {
  font-size:10px; font-weight:700; letter-spacing:.8px;
  text-transform:uppercase; opacity:.55; margin-bottom:5px;
}
#rp-lock-widget .rp-lw-stage {
  font-size:16px; font-weight:600; margin-bottom:4px; letter-spacing:-.3px;
}
#rp-lock-widget .rp-lw-status {
  font-size:11px; opacity:.7;
}
/* Star theme lock widget */
#rp-phone.rp-theme-star #rp-lock-widget {
  background:rgba(60,30,120,.35);
  border-color:rgba(160,120,255,.35);
  color:#e8e0ff;
  box-shadow:0 4px 20px rgba(80,40,180,.3);
}
/* Misty theme lock widget */
#rp-phone.rp-theme-misty #rp-lock-widget {
  background:rgba(255,255,255,.3);
  border-color:rgba(140,180,220,.4);
  color:#0a2040;
}