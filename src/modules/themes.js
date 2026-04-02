// ================================================================
//  THEMES MODULE - 主题模块（简化版，仅支持4个内置主题）
// ================================================================

// 主题配置（仅保留4个内置主题）
const THEMES = {
  candy: {
    name: '糖果花园', emoji: '🌸', desc: '粉色海边,温柔包裹',
    clockColor: '#3a0a20',
    bg: `linear-gradient(rgba(255,230,240,.3),rgba(255,210,225,.35)),url('https://i.postimg.cc/Hx8NSZL6/shou-ji-bi-zhi-fen-xiang-fen-se-da-hai-wen-rou-bao-ji-1-chao-ji-kun-dan-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat`,
  },
  star: {
    name: '星夜', emoji: '✨', desc: '暗夜栀子,深邃迷人',
    clockColor: '#f2eeff',
    bg: `linear-gradient(rgba(8,4,20,.5),rgba(12,6,30,.55)),url('https://i.postimg.cc/DfjgWdyn/wan-an-bi-zhi-an-se-xi-hua-hua-bi-zhi-1-bai-le-you-de-bai-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat`,
  },
  misty: {
    name: '烟蓝·绣球', emoji: '🌿', desc: '蓝色绣球,海边浪漫',
    clockColor: '#1a2e44',
    bg: `linear-gradient(rgba(200,225,245,.2),rgba(180,215,240,.25)),url('https://i.postimg.cc/wjTgWzdY/lan-se-xiu-qiu-yu-bi-lan-da-hai-de-lang-man-xie-hou-bi-zhi-1-guang-yu-Wallpaper-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat`,
  },
  default: {
    name: '简约白', emoji: '⚪', desc: '简约干净,清爽明亮',
    clockColor: '#333333',
    bg: 'linear-gradient(180deg, #f5f5f5 0%, #e8e8e8 100%)',
  }
};

// 应用图标配置
const RP_THEME_ICONS = {
  messages:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h8M8 14h5" stroke="currentColor" opacity=".7"/></svg>',
  moments:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="3.5"/><ellipse cx="12" cy="5"  rx="2" ry="3" opacity=".8"/><ellipse cx="12" cy="19" rx="2" ry="3" opacity=".8"/><ellipse cx="5"  cy="12" rx="3" ry="2" opacity=".8"/><ellipse cx="19" cy="12" rx="3" ry="2" opacity=".8"/><ellipse cx="7"  cy="7"  rx="2" ry="3" transform="rotate(-45 7 7)"   opacity=".6"/><ellipse cx="17" cy="7"  rx="2" ry="3" transform="rotate(45 17 7)"   opacity=".6"/><ellipse cx="7"  cy="17" rx="2" ry="3" transform="rotate(45 7 17)" opacity=".6"/><ellipse cx="17" cy="17" rx="2" ry="3" transform="rotate(-45 17 17)" opacity=".6"/></svg>',
  settings:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2.5M12 19.5V22M4.22 4.22l1.77 1.77M18 18l1.78 1.78M2 12h2.5M19.5 12H22M4.22 19.78l1.77-1.77M18 6l1.78-1.78"/></svg>',
  'folder-games':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="5"/><line x1="8"  y1="12" x2="12" y2="12" stroke-width="1.7"/><line x1="10" y1="10" x2="10" y2="14" stroke-width="1.7"/><circle cx="16" cy="10.5" r="1.3" fill="currentColor" stroke="none"/><circle cx="18.6" cy="13.5" r="1.3" fill="currentColor" stroke="none"/></svg>',
  'api-settings':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 13h7l-1 9 9-11h-7z"/></svg>',
  themes:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><circle cx="9"  cy="9.5"  r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="9.5"  r="1.4" fill="currentColor" stroke="none" opacity=".8"/><circle cx="9"  cy="14.5" r="1.4" fill="currentColor" stroke="none" opacity=".7"/><circle cx="15" cy="14.5" r="1.4" fill="currentColor" stroke="none" opacity=".6"/><circle cx="12" cy="12"   r="1.2" fill="currentColor" stroke="none" opacity=".5"/></svg>',
  diary:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="13" height="20" rx="2.5"/><circle cx="6"  cy="7"  r="1.6" stroke-width="1.5"/><circle cx="6"  cy="12" r="1.6" stroke-width="1.5"/><circle cx="6"  cy="17" r="1.6" stroke-width="1.5"/><line x1="10" y1="8.5"  x2="17" y2="8.5"  stroke-width="1.5"/><line x1="10" y1="12.5" x2="17" y2="12.5" stroke-width="1.5" opacity=".7"/><line x1="10" y1="16.5" x2="15" y2="16.5" stroke-width="1.5" opacity=".5"/></svg>',
  xhs:           '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="4"/><path d="M8.5 9.5L12 7l-.7 4 4-3.5" stroke-width="1.8"/><line x1="8" y1="15" x2="16" y2="15" stroke-width="1.6" opacity=".9"/><line x1="10" y1="18" x2="14" y2="18" stroke-width="1.6" opacity=".65"/></svg>',
  g2048:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2"  y="2"  width="9" height="9" rx="2"/><rect x="13" y="2"  width="9" height="9" rx="2"/><rect x="2"  y="13" width="9" height="9" rx="2"/><rect x="13" y="13" width="9" height="9" rx="2"/></svg>',
  bank:          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10" stroke-width="2"/><line x1="6" y1="15" x2="9" y2="15" stroke-width="1.5"/><line x1="12" y1="15" x2="16" y2="15" stroke-width="1.6" opacity=".65"/></svg>'
};

// 渲染首页图标
function lgRenderHomeIcons() {
  // SVG 图标已全部使用 currentColor，颜色由 CSS 的 color: var(--rp-clock-color) 控制。
  // 此函数仅负责将 SVG HTML 写入 DOM，不再需要读取/传递颜色值。
  document.querySelectorAll('#rp-app-grid [data-app]').forEach(el => {
    const appId = el.dataset.app;
    const ico = el.querySelector('.rp-app-ico');
    if (!ico || !RP_THEME_ICONS[appId]) return;
    const badge = ico.querySelector('.rp-badge');
    ico.innerHTML = RP_THEME_ICONS[appId];
    if (badge) ico.prepend(badge);
  });
}

// 应用主题
function lgApplyTheme(id) {
  const phone = document.getElementById('rp-phone');
  if (!phone) return;

  const theme = THEMES[id] || THEMES.candy;

  // 移除所有主题 class
  Object.keys(THEMES).forEach(k => phone.classList.remove(`rp-theme-${k}`));
  if (id && id !== 'candy') phone.classList.add(`rp-theme-${id}`);

  // 保存主题选择
  localStorage.setItem('rp_theme', id || 'candy');

  // 设置主题背景
  phone.style.setProperty('--rp-bg', theme.bg);
  phone.style.setProperty('--rp-clock-color', theme.clockColor);

  // 延迟渲染图标确保样式已生效
  requestAnimationFrame(() => {
    lgRenderHomeIcons();
    rpStripFrameRing();
  });
}

// 去除手机边框外圈 box-shadow
function rpStripFrameRing() {
  const frame = document.getElementById('rp-frame');
  if (!frame) return;
  const computed = getComputedStyle(frame).boxShadow;
  if (!computed || computed === 'none') return;
  // 将 box-shadow 按逗号分割，过滤掉 spread 为 7px~11px 且颜色为不透明色的那一层（外圈特征）
  const cleaned = computed
    .split(/,(?![^(]*\))/)
    .filter(layer => !/\b0\s*px\s+0\s*px\s+0\s*px\s+(7|8|9|10|11)px\b|\b0\s+0\s+0\s+(7|8|9|10|11)px\b/.test(layer))
    .join(',');
  frame.style.setProperty('box-shadow', cleaned, 'important');
}

// 初始化主题
function lgInitTheme() {
  const savedTheme = localStorage.getItem('rp_theme') || 'candy';
  lgApplyTheme(savedTheme);
}

// 渲染主题选择器
function lgRenderThemePicker() {
  const container = document.getElementById('rp-themes');
  if (!container) return;

  const currentTheme = localStorage.getItem('rp_theme') || 'candy';

  let html = `
    <div class="rp-page-header">
      <button class="rp-back-btn">◀</button>
      <span class="rp-page-title">主题</span>
    </div>
    <div class="rp-theme-list">
  `;

  Object.entries(THEMES).forEach(([id, theme]) => {
    const isActive = id === currentTheme ? 'active' : '';
    html += `
      <div class="rp-theme-item ${isActive}" data-theme="${id}">
        <div class="rp-theme-preview" style="background:${theme.bg};"></div>
        <div class="rp-theme-info">
          <span class="rp-theme-emoji">${theme.emoji}</span>
          <span class="rp-theme-name">${theme.name}</span>
          <span class="rp-theme-desc">${theme.desc}</span>
        </div>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;

  // 绑定点击事件
  container.querySelectorAll('.rp-theme-item').forEach(item => {
    item.addEventListener('click', () => {
      const themeId = item.dataset.theme;
      lgApplyTheme(themeId);

      // 更新选中状态
      container.querySelectorAll('.rp-theme-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // 绑定返回按钮
  container.querySelector('.rp-back-btn').addEventListener('click', () => {
    if (window.navigateTo) {
      window.navigateTo('home');
    }
  });
}

// 初始化主题模块
function initThemes() {
  console.log('[Raymond Phone] Themes Module initialized');
  lgInitTheme();
  lgRenderHomeIcons();
}

export {
  THEMES,
  RP_THEME_ICONS,
  lgApplyTheme,
  lgInitTheme,
  lgRenderHomeIcons,
  rpStripFrameRing,
  lgRenderThemePicker,
  initThemes
};
