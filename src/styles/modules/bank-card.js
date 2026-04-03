/* ── 旧 .rp-bank-card 兼容:如果 hero 和 card 共用则 hero 覆盖 ── */
.rp-bank-card.rp-bank-hero {
  background: var(--bank-hero-grad) !important;
  border-color: var(--bank-hero-border) !important;
  box-shadow: 0 12px 40px rgba(0,0,0,.35) !important;
}

/* ────────────────────────────────────────────
   SECTION TITLE
──────────────────────────────────────────── */
.rp-bank-section-title {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: .55px;
  text-transform: uppercase;
  color: var(--bank-label);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}
/* 左侧装饰线 */
.rp-bank-section-title::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 11px;
  border-radius: 2px;
  background: var(--bank-hero-accent);
  opacity: .75;
  flex-shrink: 0;
}

/* ────────────────────────────────────────────
   总资产数字 (兼容旧 HTML 结构)
──────────────────────────────────────────── */
.rp-bank-total {
  font-size: 32px;
  font-weight: 200;
  letter-spacing: -2px;
  color: var(--bank-hero-amount);
  line-height: 1;
  margin-bottom: 3px;
}
.rp-bank-total-label {
  font-size: 10px;
  color: var(--bank-hero-sub);
  margin-bottom: 14px;
  letter-spacing: .3px;
}

/* ────────────────────────────────────────────
   资产构成 — 全新卡片列表布局（v4 完全重写）
   每个资产项 = 独立小卡片，上下分区，无截断
──────────────────────────────────────────── */

/* 资产列表容器：垂直堆叠，间距分明 */
.rp-asset-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
}

/* 每个资产项：独立小卡片 */
.rp-asset-item {
  background: var(--bank-ico-bg);
  border-radius: 14px;
  border: 1px solid var(--bank-divider);
  padding: 12px 14px;
  box-sizing: border-box;
}

/* 顶行：图标 + 资产名称（名称完整显示，允许换行） */
.rp-asset-header {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.rp-asset-ico {
  flex: 0 0 28px;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background: var(--bank-ico-bg);
  box-shadow: var(--bank-ico-shadow);
  border: 1px solid rgba(255,255,255,.3);
  margin-top: 1px;
}

.rp-asset-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--bank-text);
  line-height: 1.4;
  /* 关键：允许换行，绝不截断 */
  white-space: normal;
  word-break: break-word;
  flex: 1 1 0;
}

/* 底行：金额独占一行，desc 另起一行截断显示 */
.rp-asset-footer {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-left: 36px; /* 与名称对齐 */
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.rp-asset-amount {
  font-size: 15px;
  font-weight: 700;
  color: var(--bank-text);
  letter-spacing: -.3px;
  white-space: nowrap;
}
.rp-asset-amount.rp-bank-neg { color: var(--bank-neg) !important; }

.rp-asset-desc-wrap {
  position: relative;
  max-width: 100%;
}
.rp-asset-desc {
  font-size: 10px;
  color: var(--bank-text-sub);
  line-height: 1.5;
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  max-width: 100%;
}
.rp-asset-desc.rp-desc-expanded {
  display: block;
  -webkit-line-clamp: unset;
  overflow: visible;
}
.rp-asset-desc-more {
  color: var(--bank-hero-accent, #c8a050);
  cursor: pointer;
  font-size: 10px;
  user-select: none;
  white-space: nowrap;
}
.rp-asset-desc-more:active { opacity: 0.7; }

.rp-asset-change { display: none; }

/* 涨跌色 */
.rp-bank-pos { color: var(--bank-pos) !important; }
.rp-bank-neg-text { color: var(--bank-neg) !important; }

/* ────────────────────────────────────────────
   交易记录行
──────────────────────────────────────────── */
.rp-bank-txn {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: start;
  gap: 8px;
  padding: 9px 0;
  border-bottom: 1px solid var(--bank-divider);
}
.rp-bank-txn:last-child { border-bottom: none; }
.rp-bank-txn-ico {
  width: 34px; height: 34px;
  min-width: 34px;
  border-radius: 11px;
  display: flex; align-items: center; justify-content: center;
  font-size: 17px;
  background: var(--bank-ico-bg);
  box-shadow: var(--bank-ico-shadow);
  flex-shrink: 0;
  border: 1px solid rgba(255,255,255,.3);
  margin-top: 1px;
}
.rp-bank-txn-info { min-width: 0; overflow: hidden; width: 100%; }
.rp-bank-txn-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--bank-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.3;
  width: 100%;
}
.rp-bank-txn-date {
  font-size: 10px;
  color: var(--bank-text-sub);
  margin-top: 1px;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.rp-bank-txn-amt {
  font-size: 13px;
  font-weight: 700;
  color: var(--bank-text);
  flex-shrink: 0;
  letter-spacing: -.2px;
  white-space: nowrap;
}
.rp-bank-txn-amt.rp-bank-out { color: var(--bank-neg) !important; }
.rp-bank-txn-amt.rp-bank-in  { color: var(--bank-pos) !important; }

/* ────────────────────────────────────────────
   进度条 (借款/信用额度)
──────────────────────────────────────────── */
.rp-bank-bar-wrap {
  height: 4px;
  border-radius: 2px;
  background: var(--bank-divider);
  margin-top: 8px;
  overflow: hidden;
}
.rp-bank-bar-fill {
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--bank-hero-accent), var(--bank-hero-border));
  transition: width .9s cubic-bezier(.25,.46,.45,.94);
}

/* ────────────────────────────────────────────
   REFRESH 按钮
──────────────────────────────────────────── */
#rp-bank-refresh {
  background: none !important; border: none !important;
  color: var(--rp-nav-btn) !important;
  cursor: pointer !important; padding: 2px 4px !important;
  display: inline-flex !important; align-items: center !important;
  justify-content: center !important; border-radius: 6px !important;
  transition: transform .25s, opacity .2s !important;
  visibility: visible !important; opacity: 1 !important;
  pointer-events: auto !important;
}
#rp-bank-refresh:hover { transform: rotate(180deg) !important; }
#rp-bank-refresh:disabled { opacity: .35 !important; cursor: default !important; transform: none !important; }
#rp-bank-refresh.rp-spinning { animation: rpSpin .7s linear infinite !important; }

/* ────────────────────────────────────────────
   LOADING 占位
──────────────────────────────────────────── */
#rp-bank-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 24px 12px;
  padding: 24px 20px;
  border-radius: 18px;
  background: var(--bank-card-bg, rgba(255,255,255,.62));
  border: 1px solid var(--bank-card-border, rgba(255,255,255,.72));
  box-shadow: var(--bank-card-shadow, 0 6px 24px rgba(0,0,0,.07));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: var(--bank-loading-color, #c03060);
  font-size: 13px;
  font-weight: 600;
}
.rp-bank-loading-dots { display: flex; gap: 4px; }
.rp-bank-loading-dots span {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--bank-loading-color, #c03060);
  animation: rp-ts-dot 1.2s ease-in-out infinite;
  display: inline-block;
}
.rp-bank-loading-dots span:nth-child(2) { animation-delay: .2s; }
.rp-bank-loading-dots span:nth-child(3) { animation-delay: .4s; }

/* ────────────────────────────────────────────
   EMPTY 空状态
──────────────────────────────────────────── */
.rp-bank-empty {
  text-align: center;
  color: var(--bank-loading-color, #c03060);
  opacity: .88;
  margin: 24px 12px;
  padding: 28px 20px;
  border-radius: 18px;
  background: var(--bank-card-bg, rgba(255,255,255,.62));
  border: 1px solid var(--bank-card-border, rgba(255,255,255,.72));
  box-shadow: var(--bank-card-shadow, 0 6px 24px rgba(0,0,0,.07));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.6;
}
