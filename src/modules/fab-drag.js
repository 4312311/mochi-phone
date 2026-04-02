// ================================================================
//  FAB DRAG
//  FAB拖拽功能模块
// ================================================================

function lgInitFabDrag() {
  const fab = document.getElementById('rp-fab');
  if (!fab || fab._rpDrag) return;
  fab._rpDrag = true;

  let dragging = false, moved = false;

  function startDrag(cx, cy) {
    dragging = true; moved = false;
    const r = fab.getBoundingClientRect();
    fab._dx = cx; fab._dy = cy;
    fab._il = r.left; fab._it = r.top;
    fab.style.setProperty('right',  'auto',        'important');
    fab.style.setProperty('bottom', 'auto',        'important');
    fab.style.setProperty('left',   r.left + 'px', 'important');
    fab.style.setProperty('top',    r.top  + 'px', 'important');
    fab.style.cursor = 'grabbing'; fab.style.transition = 'none';
  }

  function moveDrag(cx, cy) {
    if (!dragging) return;
    const dx = cx - fab._dx, dy = cy - fab._dy;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true;
    const nL = Math.max(0, Math.min(window.innerWidth  - fab.offsetWidth,  fab._il + dx));
    const nT = Math.max(0, Math.min(window.innerHeight - fab.offsetHeight, fab._it + dy));
    fab.style.setProperty('left', nL + 'px', 'important');
    fab.style.setProperty('top',  nT + 'px', 'important');
  }

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    fab.style.cursor = 'grab'; fab.style.transition = '';
    if (moved) {
      const posKey = IS_TOUCH_DEVICE ? 'rp_fab_pos_mobile' : 'rp_fab_pos';
      localStorage.setItem(posKey, JSON.stringify({ left: fab.style.left, top: fab.style.top }));
    }
    moved = false;
  }

  fab.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
    const mm = e2 => moveDrag(e2.clientX, e2.clientY);
    const mu = () => { endDrag(); document.removeEventListener('mousemove', mm); document.removeEventListener('mouseup', mu); };
    document.addEventListener('mousemove', mm);
    document.addEventListener('mouseup', mu);
  });

  fab.addEventListener('touchstart', e => {
    const t = e.touches[0]; startDrag(t.clientX, t.clientY);
    const tm = e2 => { e2.preventDefault(); const t2 = e2.touches[0]; moveDrag(t2.clientX, t2.clientY); };
    const te = () => { endDrag(); fab.removeEventListener('touchmove', tm); fab.removeEventListener('touchend', te); };
    fab.addEventListener('touchmove', tm, { passive: false });
    fab.addEventListener('touchend', te);
  }, { passive: true });

  fab.addEventListener('click', e => { if (moved) { moved = false; e.stopImmediatePropagation(); } }, true);

  try {
    const posKey = IS_TOUCH_DEVICE ? 'rp_fab_pos_mobile' : 'rp_fab_pos';
    const s = JSON.parse(localStorage.getItem(posKey) || 'null');
    if (s) {
      const fw = Math.max(fab.offsetWidth, 54);
      const fh = Math.max(fab.offsetHeight, 54);
      const l = Math.max(0, Math.min(window.innerWidth  - fw, parseFloat(s.left)));
      const t = Math.max(0, Math.min(window.innerHeight - fh, parseFloat(s.top)));
      fab.style.setProperty('right',  'auto',      'important');
      fab.style.setProperty('bottom', 'auto',      'important');
      fab.style.setProperty('left',   l + 'px', 'important');
      fab.style.setProperty('top',    t + 'px', 'important');
    }
  } catch(e) {}
}