/* ── GLOBAL SCROLLBAR HIDE ── */
/* PC端隐藏所有滚动条，移动端靠原生手势滚动，不展示滚动条 */
#rp-phone * {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
#rp-phone *::-webkit-scrollbar {
  display: none !important;