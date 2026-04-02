// ================================================================
//  XIAOHONGSHU TIMER
//  小红书定时器模块
// ================================================================

let _xhsEtaTimer = null;

function _xhsStartEtaTimer(estSeconds) {
  _xhsClearEtaTimer();
  if (!estSeconds) return;
  let remaining = estSeconds;
  _xhsEtaTimer = setInterval(() => {
    remaining--;
    const numEl = document.getElementById('rp-xhs-eta-num');
    const etaEl = document.getElementById('rp-xhs-eta');
    if (remaining > 0) {
      if (numEl) numEl.textContent = remaining;
    } else {
      if (etaEl) etaEl.textContent = '即将完成…';
      _xhsClearEtaTimer();
    }
  }, 1000);
}

function _xhsClearEtaTimer() {
  if (_xhsEtaTimer) { 
    clearInterval(_xhsEtaTimer); 
    _xhsEtaTimer = null; 
  }
}