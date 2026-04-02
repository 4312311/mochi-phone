// ================================================================
//  THEMES MODULE
// ================================================================

// Theme definitions
const THEMES = {
  candy: {
    name: '糖果花园',
    emoji: '🌸',
    desc: '粉色海边,温柔包裹',
    clockColor: '#3a0a20',
    bg: `linear-gradient(rgba(255,230,240,.3),rgba(255,210,225,.35)),url('https://i.postimg.cc/Hx8NSZL6/shou-ji-bi-zhi-fen-xiang-fen-se-da-hai-wen-rou-bao-ji-1-chao-ji-kun-dan-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat`,
  },
  star: {
    name: '星夜',
    emoji: '✨',
    desc: '暗夜栀子,深邃迷人',
    clockColor: '#f2eeff',
    bg: `linear-gradient(rgba(8,4,20,.5),rgba(12,6,30,.55)),url('https://i.postimg.cc/DfjgWdyn/wan-an-bi-zhi-an-se-xi-hua-hua-bi-zhi-1-bai-le-you-de-bai-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat`,
  },
  misty: {
    name: '烟蓝·绣球',
    emoji: '🌿',
    desc: '蓝色绣球,海边浪漫',
    clockColor: '#1a2e44',
    bg: `linear-gradient(rgba(200,225,245,.2),rgba(180,215,240,.25)),url('https://i.postimg.cc/wjTgWzdY/lan-se-xiu-qiu-yu-bi-lan-da-hai-de-lang-man-xie-hou-bi-zhi-1-guang-yu-Wallpaper-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat`,
  },
  custom: {
    name: '✦ 自定义',
    emoji: '🎨',
    desc: '告诉 AI，打造专属主题',
    clockColor: '#6b21a8',
    bg: `linear-gradient(135deg, #fce4ec, #f8bbd0, #e1bee7)`,
    isCustom: true,
  }
};

// Theme icons
const RP_THEME_ICONS = {
  messages: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h8M8 14h5" stroke="currentColor" opacity=".7"/></svg>',
  moments: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="3.5"/><ellipse cx="12" cy="5"  rx="2" ry="3" opacity=".8"/><ellipse cx="12" cy="19" rx="2" ry="3" opacity=".8"/><ellipse cx="5"  cy="12" rx="3" ry="2" opacity=".8"/><ellipse cx="19" cy="12" rx="3" ry="2" opacity=".8"/><ellipse cx="7"  cy="7"  rx="2" ry="3" transform="rotate(-45 7 7)"   opacity=".6"/><ellipse cx="17" cy="7"  rx="2" ry="3" transform="rotate(45 17 7)"   opacity=".6"/><ellipse cx="7"  cy="17" rx="2" ry="3" transform="rotate(45 7 17)"   opacity=".6"/><ellipse cx="17" cy="17" rx="2" ry="3" transform="rotate(-45 17 17)" opacity=".6"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2.5M12 19.5V22M4.22 4.22l1.77 1.77M18 18l1.78 1.78M2 12h2.5M19.5 12H22M4.22 19.78l1.77-1.77M18 6l1.78-1.78"/></svg>',
  'folder-games': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="5"/><line x1="8"  y1="12" x2="12" y2="12" stroke-width="1.7"/><line x1="10" y1="10" x2="10" y2="14" stroke-width="1.7"/><circle cx="16" cy="10.5" r="1.3" fill="currentColor" stroke="none"/><circle cx="18.6" cy="13.5" r="1.3" fill="currentColor" stroke="none"/></svg>',
  'api-settings': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 13h7l-1 9 9-11h-7z"/></svg>',
  themes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><circle cx="9"  cy="9.5"  r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="9.5"  r="1.4" fill="currentColor" stroke="none" opacity=".8"/><circle cx="9"  cy="14.5" r="1.4" fill="currentColor" stroke="none" opacity=".7"/><circle cx="15" cy="14.5" r="1.4" fill="currentColor" stroke="none" opacity=".6"/><circle cx="12" cy="12"   r="1.2" fill="currentColor" stroke="none" opacity=".5"/></svg>',
  diary: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="13" height="20" rx="2.5"/><circle cx="6"  cy="7"  r="1.6" stroke-width="1.5"/><circle cx="6"  cy="12" r="1.6" stroke-width="1.5"/><circle cx="6"  cy="17" r="1.6" stroke-width="1.5"/><line x1="10" y1="8.5"  x2="17" y2="8.5"  stroke-width="1.5"/><line x1="10" y1="12.5" x2="17" y2="12.5" stroke-width="1.5" opacity=".7"/><line x1="10" y1="16.5" x2="15" y2="16.5" stroke-width="1.5" opacity=".5"/></svg>',
  xhs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="4"/><path d="M8.5 9.5L12 7l-.7 4 4-3.5" stroke-width="1.8"/><line x1="8" y1="15" x2="16" y2="15" stroke-width="1.6" opacity=".9"/><line x1="10" y1="18" x2="14" y2="18" stroke-width="1.6" opacity=".65"/></svg>',
  g2048: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2"  y="2"  width="9" height="9" rx="2"/><rect x="13" y="2"  width="9" height="9" rx="2"/><rect x="2"  y="13" width="9" height="9" rx="2"/><rect x="13" y="13" width="9" height="9" rx="2"/></svg>',
  bank: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10" stroke-width="2"/><line x1="6" y1="15" x2="9" y2="15" stroke-width="1.5"/><line x1="12" y1="15" x2="16" y2="15" stroke-width="1.5" opacity=".65"/></svg>'
};

// Theme icon colors (backup)
const RP_ICON_COLORS = {
  candy: '#d4607a',
  star: '#e8e0ff',
  misty: 'rgba(222,240,253,.91)',
  custom: null
};

// Theme studio templates
const RP_TS_TEMPLATES = [
  { label: '🌙 暗夜樱花', text: '深紫黑背景渐变壁纸，樱花粉气泡，梦幻夜间风格，图标标签用浅粉色' },
  { label: '🌊 薄荷海洋', text: '薄荷绿到海蓝渐变壁纸，清透玻璃气泡，图标标签用深青绿色，夏日海边氛围' },
  { label: '☕ 奶茶咖啡', text: '壁纸用棕白渐变，气泡用暖棕色，图标标签用咖啡棕色，整体温柔慵懒咖啡馆风格' },
  { label: '🌸 初春嫩粉', text: '嫩粉到白渐变壁纸，气泡用浅樱花粉，图标标签用玫瑰粉色，清新春日少女感' },
  { label: '🍂 秋日余晖', text: '橙金渐变壁纸，暖橙气泡，图标标签用深橙棕色，秋天黄昏温暖感' },
  { label: '🌌 深空极光', text: '深蓝黑渐变壁纸，极光青绿和紫色气泡，图标标签用冷白色，科幻宇宙感' },
];

// Render home icons
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

// Apply theme
function lgApplyTheme(id) {
  const phone = document.getElementById('rp-phone');
  if (!phone) return;

  const theme = THEMES[id] || THEMES.candy;

  // 移除所有内置主题 class（custom 不加 class，靠注入 CSS 实现）
  Object.keys(THEMES).filter(k => k !== 'custom').forEach(k => phone.classList.remove(`rp-theme-${k}`));
  if (id && id !== 'candy' && id !== 'custom') phone.classList.add(`rp-theme-${id}`);

  // 切换到内置主题时禁用自定义 CSS，切回 custom 时恢复
  const styleEl = document.getElementById('rp-custom-theme-style');
  if (styleEl) styleEl.disabled = (id !== 'custom');

  // 切换到内置主题时，彻底清除自定义 CSS 注入的 style 内容（防止 disabled 在部分浏览器失效导致变量残留）
  if (id !== 'custom' && styleEl) {
    styleEl.textContent = '';
  }

  // 切回 custom 时，从 localStorage 重新载入保存的 CSS（因为切走时已清空 textContent）
  if (id === 'custom' && styleEl) {
    const saved = localStorage.getItem('rp_custom_css') || '';
    styleEl.textContent = saved;
    styleEl.disabled = false;
  }

  // 保存主题选择
  localStorage.setItem('rp_theme', id || 'candy');

  // 设置主题背景
  phone.style.setProperty('--rp-bg', theme.bg);
  phone.style.setProperty('--rp-clock-color', theme.clockColor);

  // 自定义主题 CSS 注入后需浏览器至少一帧才能计算变量，用双帧确保 --rp-clock-color 已生效
  if (id === 'custom') {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      lgRenderHomeIcons();
      rpStripFrameRing();
    }));
  } else {
    requestAnimationFrame(() => {
      lgRenderHomeIcons();
      rpStripFrameRing();
    });
  }
}

// Strip frame ring
function rpStripFrameRing() {
  const frame = document.getElementById('rp-frame');
  if (!frame) return;
  const computed = getComputedStyle(frame).boxShadow;
  if (!computed || computed === 'none') return;
  // 将 box-shadow 按逗号分割，过滤掉 spread 为 7px~11px 且颜色为不透明色的那一层（外圈特征）
  // 匹配形如 "0px 0px 0px 9px ..." 或 "0 0 0 9px ..." 的层
  const cleaned = computed
    .split(/,(?![^(]*\))/)  // 按逗号分割（不切 rgba 括号内的逗号）
    .filter(layer => !/\b0\s*px\s+0\s*px\s+0\s*px\s+(7|8|9|10|11)px\b|\b0\s+0\s+0\s+(7|8|9|10|11)px\b/.test(layer))
    .join(',');
  frame.style.setProperty('box-shadow', cleaned, 'important');
}

// Initialize theme
function lgInitTheme() {
  // 先确保 custom style 标签存在（恢复已保存的 CSS）
  lgEnsureCustomStyleTag();
  // lgApplyTheme 内部已经用 rAF 延迟调用 lgRenderHomeIcons，无需再次调用
  lgApplyTheme(localStorage.getItem('rp_theme') || 'candy');
}

// Ensure custom style tag exists
function lgEnsureCustomStyleTag() {
  if (document.getElementById('rp-custom-theme-style')) return;
  const el = document.createElement('style');
  el.id = 'rp-custom-theme-style';
  const saved = localStorage.getItem('rp_custom_css') || '';
  el.textContent = saved;
  el.disabled = (localStorage.getItem('rp_theme') !== 'custom');
  document.head.appendChild(el);
}

// Render theme picker
function lgRenderThemePicker() {
  const cur = localStorage.getItem('rp_theme') || 'candy';
  const $c = $('#rp-theme-cards');
  if (!$c || $c.length === 0) return;
  $c.empty();

  Object.entries(THEMES).forEach(([id, t]) => {
    const active = id === cur;
    if (t.isCustom) {
      // 自定义卡片：特殊渲染，点击进工作室而非直接切换
      const hasCustom = !!(localStorage.getItem('rp_custom_css') || '').trim();
      $c.append(`
        <div class="rp-theme-card${active ? ' rp-tc-active' : ''}" data-tid="custom" style="cursor:pointer">
          <div class="rp-theme-preview" style="background:${t.bg};position:relative;overflow:hidden">
            <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
              <div style="font-size:26px">🎨</div>
              <div style="font-size:10px;font-weight:700;color:#6b21a8;opacity:.85;letter-spacing:.3px">AI 定制</div>
            </div>
            ${active ? '<div class="rp-theme-check">✓</div>' : ''}
            ${hasCustom && !active ? '<div style="position:absolute;top:7px;right:8px;width:8px;height:8px;border-radius:50%;background:#a855f7;box-shadow:0 0 5px rgba(168,85,247,.7)"></div>' : ''}
          </div>
          <div class="rp-theme-info">
            <div class="rp-theme-name">${t.emoji} ${t.name}</div>
            <div class="rp-theme-desc">${t.desc}</div>
          </div>
        </div>
      `);
    } else {
      $c.append(`
        <div class="rp-theme-card${active ? ' rp-tc-active' : ''}" data-tid="${id}">
          <div class="rp-theme-preview" style="background:${t.bg}">
            <div class="rp-theme-mini">
              <div class="rp-theme-mini-clock" style="color:${t.clockColor}">12:00</div>
              <div class="rp-theme-mini-dots">
                <div class="rp-theme-mini-dot"></div>
                <div class="rp-theme-mini-dot"></div>
                <div class="rp-theme-mini-dot"></div>
              </div>
            </div>
            ${active ? '<div class="rp-theme-check">✓</div>' : ''}
          </div>
          <div class="rp-theme-info">
            <div class="rp-theme-name">${t.emoji} ${t.name}</div>
            <div class="rp-theme-desc">${t.desc}</div>
          </div>
        </div>
      `);
    }
  });

  // 渲染已保存方案区
  lgRenderSavedThemes();
}

// Initialize themes module
function initThemes() {
  console.log('[Raymond Phone] Themes Module initialized');
  lgInitTheme();
  lgRenderThemePicker();
}

// HTML escape helper
function escHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Placeholder functions for unimplemented features
function lgInjectCustomCSS(css) {
  console.log('[ThemeStudio] Inject custom CSS:', css);
  lgEnsureCustomStyleTag();
  localStorage.setItem('rp_custom_css', css);
  const el = document.getElementById('rp-custom-theme-style');
  if (el) {
    el.textContent = css;
    el.disabled = false;
  }
  localStorage.setItem('rp_theme', 'custom');
  lgApplyTheme('custom');
  requestAnimationFrame(() => {
    lgRenderHomeIcons();
    rpStripFrameRing();
  });
}

function lgRenderSavedThemes() {
  const saved = (() => {
    try {
      return JSON.parse(localStorage.getItem('rp_saved_themes') || '[]');
    } catch(e) {
      return [];
    }
  })();
  const $section = $('#rp-saved-section');
  const $cards = $('#rp-saved-cards');
  if (!$section || !$cards) return;

  if (!saved.length) {
    $section.hide();
    return;
  }
  $section.show();
  $cards.empty();
  const curCss = localStorage.getItem('rp_custom_css') || '';

  saved.forEach((s, i) => {
    const isActive = (localStorage.getItem('rp_theme') === 'custom' && s.css === curCss);
    $cards.append(`
      <div class="rp-saved-card${isActive ? ' rp-tc-active' : ''}" data-idx="${i}">
        <div class="rp-saved-card-preview" style="background:${escHtml(s.preview.wall)};background-size:cover">
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:5px;padding:8px">
            <div style="height:10px;width:38px;border-radius:6px;background:${escHtml(s.preview.sent)};opacity:.9"></div>
            <div style="height:10px;width:28px;border-radius:6px;background:rgba(255,255,255,.55)"></div>
          </div>
          ${isActive ? '<div class="rp-theme-check">✓</div>' : ''}
        </div>
        <div class="rp-saved-card-info">
          <div class="rp-saved-card-name">${escHtml(s.label)}</div>
          <div class="rp-saved-card-time">${escHtml(s.timeStr)}</div>
        </div>
        <div class="rp-saved-card-actions">
          <button class="rp-saved-card-act-btn rp-saved-card-rename-btn" data-idx="${i}">改名</button>
          <button class="rp-saved-card-act-btn rp-saved-card-delete-btn" data-idx="${i}">删除</button>
        </div>
      </div>
    `);
  });
}

function lgRenderThemeStudio() {
  console.log('[ThemeStudio] Render studio');
  const $bubbles = $('#rp-ts-bubbles');
  if (!$bubbles) return;

  $bubbles.empty();

  // 欢迎卡片
  const tplBtns = RP_TS_TEMPLATES.map(t =>
    `<button class="rp-ts-tpl-btn" data-tpl="${escHtml(t.text)}">${t.label}</button>`
  ).join('');

  $bubbles.append(`
    <div class="rp-ts-welcome">
      <div class="rp-ts-welcome-title">🎨 想要什么样的主题？</div>
      <div style="margin-bottom:10px;font-size:12.5px;line-height:1.65;opacity:.85">
        告诉我你的风格想象，我来生成 CSS 并直接应用到手机上。<br>可以自由描述颜色、氛围、风格感觉。
      </div>
      <div class="rp-ts-tpls">${tplBtns}</div>
      <div class="rp-ts-welcome-hint">💡 点击标签快速套用描述，或直接在下方输入</div>
    </div>
  `);

  // 如果有历史 CSS，显示已有主题提示
  if (localStorage.getItem('rp_custom_css') && localStorage.getItem('rp_theme') === 'custom') {
    $bubbles.append(`<div class="rp-ts-applied">✓ 自定义主题已生效，可继续修改</div>`);
  }

  const el = document.getElementById('rp-ts-bubbles');
  if (el) el.scrollTop = el.scrollHeight;
}

function lgTsAddBubble(role, text) {
  const $bubbles = $('#rp-ts-bubbles');
  if (!$bubbles) return;
  const cls = role === 'user' ? 'rp-ts-bubble-user' : 'rp-ts-bubble-ai';
  $bubbles.append(`<div class="${cls}">${escHtml(text)}</div>`);
  const el = document.getElementById('rp-ts-bubbles');
  if (el) el.scrollTop = el.scrollHeight;
}

function lgTsScrollBottom() {
  const el = document.getElementById('rp-ts-bubbles');
  if (el) el.scrollTop = el.scrollHeight;
}

function lgThemeStudioSend(userText) {
  if (!userText.trim()) return;
  console.log('[ThemeStudio] Send:', userText);
  lgTsAddBubble('user', userText);
  lgTsAddBubble('ai', '主题生成中...');
  const $input = $('#rp-ts-input');
  if ($input) $input.val('');
}

function lgTsUpdateActionBar() {
  // Placeholder
}

function lgUndoCustomCSS() {
  console.log('[ThemeStudio] Undo custom CSS');
}

function lgSaveCurrentTheme() {
  console.log('[ThemeStudio] Save current theme');
  lgTsAddBubble('ai', '💾 已保存为当前方案！');
}

function lgApplySavedTheme(idx) {
  console.log('[ThemeStudio] Apply saved theme:', idx);
}

function lgDeleteSavedTheme(idx) {
  console.log('[ThemeStudio] Delete saved theme:', idx);
}

function lgTsSanitizeInput(raw) {
  return String(raw || '').slice(0, 200).trim();
}

function lgTsSanitizeCSS(css) {
  if (!css || typeof css !== 'string') return '';
  // Basic sanitization
  css = css.replace(/@import\s+[^;]+;?/gi, '/* @import blocked */');
  css = css.replace(/expression\s*\([^)]*\)/gi, 'none');
  css = css.replace(/javascript\s*:/gi, '');
  return css;
}

function lgTsShowTyping() {
  const $bubbles = $('#rp-ts-bubbles');
  if (!$bubbles) return;
  $bubbles.append(`<div id="rp-ts-typing-indicator" class="rp-ts-typing"><span></span><span></span><span></span></div>`);
  lgTsScrollBottom();
}

function lgTsHideTyping() {
  $('#rp-ts-typing-indicator').remove();
}

export {
  THEMES,
  RP_THEME_ICONS,
  RP_ICON_COLORS,
  RP_TS_TEMPLATES,
  lgRenderHomeIcons,
  lgApplyTheme,
  rpStripFrameRing,
  lgInitTheme,
  lgEnsureCustomStyleTag,
  lgInjectCustomCSS,
  lgUndoCustomCSS,
  lgTsUpdateActionBar,
  lgSaveCurrentTheme,
  lgRenderSavedThemes,
  lgApplySavedTheme,
  lgDeleteSavedTheme,
  lgRenderThemePicker,
  lgRenderThemeStudio,
  lgTsAddBubble,
  lgTsShowTyping,
  lgTsHideTyping,
  lgTsScrollBottom,
  lgTsSanitizeInput,
  lgTsSanitizeCSS,
  lgThemeStudioSend,
  initThemes
};
