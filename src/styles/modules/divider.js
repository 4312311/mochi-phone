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