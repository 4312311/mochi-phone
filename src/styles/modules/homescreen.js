/* ── HOME PAGES (双屏横滑) ── */
#rp-home-pages {
  position:absolute; inset:0;
  display:flex; flex-direction:row;
  width:200%; overflow:hidden;
  transition:transform .32s cubic-bezier(.4,0,.2,1);
  will-change:transform;
}
.rp-home-page {
  width:50%; flex-shrink:0;
  position:relative; height:100%;
  overflow:hidden;
}
/* 页面指示点 */
#rp-home-dots {
  position:absolute; bottom:22px; left:50%; transform:translateX(-50%);
  display:flex; gap:6px; z-index:10;
}
.rp-home-dot {
  width:6px; height:6px; border-radius:50%;
  background:var(--rp-indicator,rgba(0,0,0,.25));
  transition:background .25s, transform .25s;
}
.rp-home-dot-active {
  background:var(--rp-clock-color,#e06080);
  transform:scale(1.25);