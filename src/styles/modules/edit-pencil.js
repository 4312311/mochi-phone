/* ── EDIT PENCIL BUTTON (SVG线条铅笔,适配主题色) ── */
.rp-edit-btn {
  display:inline-flex; align-items:center; justify-content:center;
  width:22px; height:22px; border-radius:50%;
  background:rgba(0,0,0,.06); border:none; cursor:pointer;
  color:var(--rp-nav-btn,#c0306a); line-height:1;
  flex-shrink:0; margin-left:4px; transition:opacity .15s,background .15s;
  padding:3px; opacity:0; pointer-events:none;
}
/* 桌面端:hover 气泡时显示 */
.rp-bwrap.rp-in:hover .rp-edit-btn,
.rp-bwrap.rp-in .rp-edit-btn:focus { opacity:1; pointer-events:auto; }
.rp-bwrap.rp-out:hover .rp-edit-btn,
.rp-bwrap.rp-out .rp-edit-btn:focus { opacity:1; pointer-events:auto; }
/* 触屏端:常驻半透明,随时可点 */
@media (hover:none) and (pointer:coarse) {
  .rp-edit-btn { opacity:0.5; pointer-events:auto; }
}
.rp-edit-btn:hover,.rp-edit-btn:active { background:rgba(0,0,0,.14); opacity:1; }
