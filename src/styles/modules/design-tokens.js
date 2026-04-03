/* ── CSS 设计 token (每主题独立覆盖) ── */
#rp-phone {
  --bank-bg-overlay: rgba(255,248,250,.18);
  --bank-hero-grad: linear-gradient(145deg, #1a0a0e 0%, #2d1020 40%, #1e0c18 70%, #0f0608 100%);
  --bank-hero-shine: linear-gradient(125deg, rgba(200,160,80,.22) 0%, transparent 45%, rgba(180,120,60,.12) 100%);
  --bank-hero-border: rgba(200,160,80,.28);
  --bank-hero-text: #f5ede0;
  --bank-hero-sub: rgba(245,237,224,.55);
  --bank-hero-accent: #c8a050;
  --bank-hero-amount: #faf0dc;
  --bank-card-bg: rgba(255,255,255,.62);
  --bank-card-border: rgba(255,255,255,.72);
  --bank-card-shadow: 0 6px 24px rgba(0,0,0,.07), 0 1px 0 rgba(255,255,255,.65) inset;
  --bank-label: rgba(80,20,48,.55);
  --bank-text: #1a0a12;
  --bank-text-sub: rgba(58,16,40,.78);
  --bank-divider: rgba(0,0,0,.06);
  --bank-ico-bg: rgba(255,255,255,.55);
  --bank-ico-shadow: 0 1px 5px rgba(0,0,0,.1);
  --bank-pos: #0d8a3e;
  --bank-neg: #d42020;
  --bank-tag-bg: rgba(180,130,60,.1);
  --bank-tag-text: #8a5a10;
  --bank-loading-color: #c03060;
  --bank-empty-color: rgba(60,16,40,.3);
  --bank-chip-bg: rgba(255,255,255,.55);
  --bank-chip-border: rgba(200,160,80,.25);
}

/* ─── 🌸 CANDY TOKEN (default, no class needed) ─── */
/* defaults above cover candy */

/* ─── ✨ STAR TOKEN ─── */
#rp-phone.rp-theme-star {
  --bank-bg-overlay: rgba(6,3,20,.15);
  --bank-hero-grad: linear-gradient(145deg, #0c0630 0%, #1a0858 40%, #120440 70%, #060220 100%);
  --bank-hero-shine: linear-gradient(125deg, rgba(160,120,255,.25) 0%, transparent 45%, rgba(100,60,200,.15) 100%);
  --bank-hero-border: rgba(160,120,255,.35);
  --bank-hero-text: #f0eaff;
  --bank-hero-sub: rgba(220,210,255,.5);
  --bank-hero-accent: #a87cfa;
  --bank-hero-amount: #ede4ff;
  --bank-card-bg: rgba(20,10,52,.72);
  --bank-card-border: rgba(140,100,255,.28);
  --bank-card-shadow: 0 6px 28px rgba(0,0,0,.45), 0 1px 0 rgba(160,130,255,.14) inset;
  --bank-label: rgba(210,195,255,.65);
  --bank-text: #e4d8ff;
  --bank-text-sub: rgba(200,185,255,.82);
  --bank-divider: rgba(140,100,255,.12);
  --bank-ico-bg: rgba(60,30,120,.55);
  --bank-ico-shadow: 0 1px 6px rgba(80,40,180,.22);
  --bank-pos: #86efac;
  --bank-neg: #fca5a5;
  --bank-tag-bg: rgba(140,100,255,.15);
  --bank-tag-text: #c8b0ff;
  --bank-loading-color: #a87cfa;
  --bank-empty-color: rgba(180,165,255,.35);
  --bank-chip-bg: rgba(40,20,90,.55);
  --bank-chip-border: rgba(160,120,255,.3);
}

/* ─── 🌿 MISTY TOKEN ─── */
#rp-phone.rp-theme-misty {
  --bank-bg-overlay: rgba(200,228,248,.12);
  --bank-hero-grad: linear-gradient(145deg, #062040 0%, #0e3060 40%, #0a2448 70%, #040e22 100%);
  --bank-hero-shine: linear-gradient(125deg, rgba(120,180,240,.28) 0%, transparent 45%, rgba(60,130,200,.15) 100%);
  --bank-hero-border: rgba(120,180,240,.32);
  --bank-hero-text: #e8f4ff;
  --bank-hero-sub: rgba(200,232,255,.52);
  --bank-hero-accent: #6ab4e8;
  --bank-hero-amount: #dff0ff;
  --bank-card-bg: rgba(228,243,255,.65);
  --bank-card-border: rgba(100,168,218,.3);
  --bank-card-shadow: 0 6px 24px rgba(0,60,120,.09), 0 1px 0 rgba(180,220,255,.62) inset;
  --bank-label: rgba(22,60,100,.62);
  --bank-text: #0c1e30;
  --bank-text-sub: rgba(20,50,88,.82);
  --bank-divider: rgba(80,150,210,.14);
  --bank-ico-bg: rgba(190,225,250,.55);
  --bank-ico-shadow: 0 1px 5px rgba(40,100,160,.12);
  --bank-pos: #0e7a36;
  --bank-neg: #c41c1c;
  --bank-tag-bg: rgba(60,130,200,.1);
  --bank-tag-text: #1a5a90;
  --bank-loading-color: #3d8fbf;
  --bank-empty-color: rgba(44,74,106,.4);
  --bank-chip-bg: rgba(200,228,250,.55);
  --bank-chip-border: rgba(80,150,210,.28);
}

/* ────────────────────────────────────────────
   VIEW CONTAINER
──────────────────────────────────────────── */
#rp-view-bank {
  background: transparent;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
#rp-phone.rp-theme-candy #rp-view-bank,
#rp-phone.rp-theme-star  #rp-view-bank,
#rp-phone.rp-theme-misty #rp-view-bank {
  background: var(--rp-home-wall) !important;
  background-size: cover !important;
  background-position: center !important;
}
/* 资产概览标题与 loading/empty 颜色统一 */
#rp-view-bank .rp-nav-title {
  color: var(--bank-loading-color, #c03060) !important;
  text-shadow: none !important;
}
#rp-view-bank .rp-back,
#rp-view-bank .rp-nav-add,
#rp-view-bank #rp-bank-refresh {
  color: var(--bank-loading-color, #c03060) !important;
  text-shadow: none !important;
}

/* ────────────────────────────────────────────
   SCROLL BODY
──────────────────────────────────────────── */
#rp-bank-body {
  flex: 1;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  padding: 12px 11px 32px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
#rp-bank-body::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
#rp-view-bank { scrollbar-width: none !important; }
#rp-view-bank::-webkit-scrollbar { display: none !important; }

/* ────────────────────────────────────────────
   HERO CARD (总资产 / 净资产)
   效果: 深色磨砂金属质感 + 金色/紫色/蓝色光晕
──────────────────────────────────────────── */
.rp-bank-hero {
  position: relative;
  border-radius: 22px;
  padding: 18px 18px 16px;
  overflow: visible;
  background: var(--bank-hero-grad);
  border: 1px solid var(--bank-hero-border);
  box-shadow:
    0 12px 40px rgba(0,0,0,.35),
    0 2px 0 rgba(255,255,255,.06) inset,
    0 -1px 0 rgba(0,0,0,.25) inset;
  /* clip 内容但不裁子元素伪元素 */
  isolation: isolate;
}
/* 金属反光层 */
.rp-bank-hero::before {
  content: '';
  position: absolute; inset: 0;
  background: var(--bank-hero-shine);
  pointer-events: none;
  border-radius: inherit;
  z-index: 0;
}
/* 底部柔和光晕 — 放到 box-shadow 代替伪元素避免裁切问题 */
.rp-bank-hero::after {
  content: '';
  position: absolute; bottom: -18px; left: 15%; right: 15%;
  height: 36px;
  background: var(--bank-hero-border);
  filter: blur(18px);
  opacity: .38;
  pointer-events: none;
  z-index: -1;
  border-radius: 50%;
}
.rp-bank-hero > * { position: relative; z-index: 1; }
.rp-bank-hero-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: var(--bank-chip-bg);
  border: 1px solid var(--bank-chip-border);
  border-radius: 20px;
  padding: 3px 10px 3px 7px;
  margin-bottom: 14px;
  backdrop-filter: blur(8px);
}
.rp-bank-hero-chip-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--bank-hero-accent);
  box-shadow: 0 0 6px var(--bank-hero-accent);
  flex-shrink: 0;
}
.rp-bank-hero-chip-text {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: .5px;
  text-transform: uppercase;
  color: var(--bank-hero-sub);
}
.rp-bank-hero-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .5px;
  text-transform: uppercase;
  color: var(--bank-hero-sub);
  margin-bottom: 6px;
}
.rp-bank-hero-amount {
  font-size: 34px;
  font-weight: 200;
  letter-spacing: -2px;
  color: var(--bank-hero-amount);
  line-height: 1;
  margin-bottom: 3px;
}
.rp-bank-hero-unit {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  vertical-align: super;
  margin-right: 3px;
  opacity: .75;
}
.rp-bank-hero-sub {
  font-size: 10px;
  color: var(--bank-hero-sub);
  letter-spacing: .2px;
  margin-top: 2px;
}
/* 底部分隔线 */
.rp-bank-hero-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--bank-hero-border), transparent);
  margin: 12px 0 10px;
  opacity: .6;
}
/* 底部快速指标行 */
.rp-bank-hero-stats {
  display: flex;
  gap: 0;
}
.rp-bank-hero-stat {
  flex: 1;
  text-align: center;
  padding: 0 4px;
  border-right: 1px solid rgba(255,255,255,.08);
}
.rp-bank-hero-stat:last-child { border-right: none; }
.rp-bank-hero-stat-val {
  font-size: 12px;
  font-weight: 700;
  color: var(--bank-hero-text);
  letter-spacing: -.3px;
}
.rp-bank-hero-stat-lbl {
  font-size: 9px;
  color: var(--bank-hero-sub);
  margin-top: 2px;
  letter-spacing: .3px;
}

/* ────────────────────────────────────────────
   SECTION CARD (资产分项 / 交易记录 等)
──────────────────────────────────────────── */
.rp-bank-card {
  background: var(--bank-card-bg);
  backdrop-filter: blur(18px) saturate(1.4);
  -webkit-backdrop-filter: blur(18px) saturate(1.4);
  border: 1px solid var(--bank-card-border);
  border-radius: 20px;
  padding: 14px 14px 10px;
  box-shadow: var(--bank-card-shadow);
}
