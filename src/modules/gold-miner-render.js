// ================================================================
//  GOLD MINER RENDERING
//  黄金矿工渲染模块
// ================================================================

let _gmBgGrad = null;
let _gmBgGradW = 0;
let _gmBgGradH = 0;

function gmDraw() {
  const canvas = document.getElementById('ggold-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  if (!_gmBgGrad || _gmBgGradW !== W || _gmBgGradH !== H) {
    _gmBgGrad = ctx.createLinearGradient(0, 0, 0, H);
    _gmBgGrad.addColorStop(0, 'rgba(18,9,4,.9)');
    _gmBgGrad.addColorStop(0.3, 'rgba(55,30,8,.85)');
    _gmBgGrad.addColorStop(1, 'rgba(85,50,12,.92)');
    _gmBgGradW = W; _gmBgGradH = H;
  }
  ctx.fillStyle = _gmBgGrad;
  ctx.fillRect(0, 0, W, H);

  const state = GGOLD;
  const cx = W / 2;
  const cy = 0;
  const r = 12;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(state.angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, state.len);
  ctx.strokeStyle = '#9ca3af';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.translate(0, state.len);
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = '#6b7280';
  ctx.fill();
  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();

  state.items.forEach(item => {
    gmDrawItem(ctx, item);
  });

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText(`分数: ${state.score}`, 10, 25);
  ctx.fillText(`时间: ${state.time}`, 10, 50);
  ctx.fillText(`目标: ${state.target}`, 10, 75);
}

function gmDrawItem(ctx, item) {
  const { x, y, type, r } = item;
  ctx.save();

  if (type === 'gold') {
    const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r * 1.2);
    g.addColorStop(0, '#fef08a');
    g.addColorStop(0.5, '#fbbf24');
    g.addColorStop(1, '#d97706');
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fill();
  } else if (type === 'stone') {
    const g = ctx.createRadialGradient(x - r * 0.2, y - r * 0.3, 0, x, y, r * 1.2);
    g.addColorStop(0, '#d1d5db');
    g.addColorStop(0.6, '#9ca3af');
    g.addColorStop(1, '#4b5563');
    ctx.beginPath();
    ctx.moveTo(x, y - r * 0.92);
    ctx.bezierCurveTo(x + r * 0.60, y - r * 1.0, x + r * 1.0, y - r * 0.45, x + r * 0.95, y + r * 0.15);
    ctx.bezierCurveTo(x + r * 0.90, y + r * 0.75, x + r * 0.40, y + r * 1.0, x - r * 0.10, y + r * 0.95);
    ctx.bezierCurveTo(x - r * 0.65, y + r * 1.0, x - r * 1.0, y + r * 0.55, x - r * 0.95, y - r * 0.15);
    ctx.bezierCurveTo(x - r * 1.0, y - r * 0.65, x - r * 0.55, y - r * 1.0, x, y - r * 0.92);
    ctx.closePath();
    ctx.fillStyle = g;
    ctx.fill();
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(x - r * 0.25, y - r * 0.32, r * 0.28, r * 0.16, -0.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
    ctx.fill();
  } else if (type === 'bomb') {
    const g = ctx.createRadialGradient(x - r * 0.25, y - r * 0.3, 0, x, y, r * 1.1);
    g.addColorStop(0, '#6b7280');
    g.addColorStop(0.5, '#1f2937');
    g.addColorStop(1, '#030712');
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(x - r * 0.28, y - r * 0.32, r * 0.22, r * 0.14, -0.4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fill();
    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 1.4;
    ctx.setLineDash([2, 1.5]);
    ctx.beginPath();
    ctx.moveTo(x + r * 0.45, y - r * 0.60);
    ctx.quadraticCurveTo(x + r * 0.15, y - r * 1.10, x - r * 0.05, y - r * 1.30);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(x - r * 0.05, y - r * 1.32, r * 0.14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(x - r * 0.10, y - r * 1.46, r * 0.09, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}