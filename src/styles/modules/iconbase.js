/* ── Base: remove all hardcoded inline bg on icons ── */
#rp-phone .rp-app-ico {
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
  font-size: 28px !important;
  transition: transform .14s ease, filter .14s ease !important;
  filter: drop-shadow(0 1px 4px rgba(0,0,0,.35)) !important;
  /* SVG 线条颜色始终跟随时钟颜色，通过 currentColor 继承，无需 JS 读取时机 */
  color: var(--rp-clock-color) !important;
}
#rp-phone .rp-app-ico:active { transform: scale(.88) !important; }