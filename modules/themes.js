// ================================================================//  THEMES MODULE// ================================================================// Theme definitionsconst THEMES = {
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
  custom: {
    name: '✦ 自定义', emoji: '🎨', desc: '告诉 AI，打造专属主题',
    clockColor: '#6b21a8',
    bg: `linear-gradient(135deg, #fce4ec, #f8bbd0, #e1bee7)`,
    isCustom: true,
  }
};

// Theme iconsconst RP_THEME_ICONS = {
  messages:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h8M8 14h5" stroke="currentColor" opacity=".7"/></svg>',
  moments:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="3.5"/><ellipse cx="12" cy="5"  rx="2" ry="3" opacity=".8"/><ellipse cx="12" cy="19" rx="2" ry="3" opacity=".8"/><ellipse cx="5"  cy="12" rx="3" ry="2" opacity=".8"/><ellipse cx="19" cy="12" rx="3" ry="2" opacity=".8"/><ellipse cx="7"  cy="7"  rx="2" ry="3" transform="rotate(-45 7 7)"   opacity=".6"/><ellipse cx="17" cy="7"  rx="2" ry="3" transform="rotate(45 17 7)"   opacity=".6"/><ellipse cx="7"  cy="17" rx="2" ry="3" transform="rotate(45 7 17)"   opacity=".6"/><ellipse cx="17" cy="17" rx="2" ry="3" transform="rotate(-45 17 17)" opacity=".6"/></svg>',
  settings:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2.5M12 19.5V22M4.22 4.22l1.77 1.77M18 18l1.78 1.78M2 12h2.5M19.5 12H22M4.22 19.78l1.77-1.77M18 6l1.78-1.78"/></svg>',
  'folder-games':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="5"/><line x1="8"  y1="12" x2="12" y2="12" stroke-width="1.7"/><line x1="10" y1="10" x2="10" y2="14" stroke-width="1.7"/><circle cx="16" cy="10.5" r="1.3" fill="currentColor" stroke="none"/><circle cx="18.6" cy="13.5" r="1.3" fill="currentColor" stroke="none"/></svg>',
  'api-settings':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 13h7l-1 9 9-11h-7z"/></svg>',
  themes:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><circle cx="9"  cy="9.5"  r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="9.5"  r="1.4" fill="currentColor" stroke="none" opacity=".8"/><circle cx="9"  cy="14.5" r="1.4" fill="currentColor" stroke="none" opacity=".7"/><circle cx="15" cy="14.5" r="1.4" fill="currentColor" stroke="none" opacity=".6"/><circle cx="12" cy="12"   r="1.2" fill="currentColor" stroke="none" opacity=".5"/></svg>',
  diary:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="13" height="20" rx="2.5"/><circle cx="6"  cy="7"  r="1.6" stroke-width="1.5"/><circle cx="6"  cy="12" r="1.6" stroke-width="1.5"/><circle cx="6"  cy="17" r="1.6" stroke-width="1.5"/><line x1="10" y1="8.5"  x2="17" y2="8.5"  stroke-width="1.5"/><line x1="10" y1="12.5" x2="17" y2="12.5" stroke-width="1.5" opacity=".7"/><line x1="10" y1="16.5" x2="15" y2="16.5" stroke-width="1.5" opacity=".5"/></svg>',
  xhs:           '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="4"/><path d="M8.5 9.5L12 7l-.7 4 4-3.5" stroke-width="1.8"/><line x1="8" y1="15" x2="16" y2="15" stroke-width="1.6" opacity=".9"/><line x1="10" y1="18" x2="14" y2="18" stroke-width="1.6" opacity=".65"/></svg>',
  g2048:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2"  y="2"  width="9" height="9" rx="2"/><rect x="13" y="2"  width="9" height="9" rx="2"/><rect x="2"  y="13" width="9" height="9" rx="2"/><rect x="13" y="13" width="9" height="9" rx="2"/></svg>',
  bank:          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10" stroke-width="2"/><line x1="6" y1="15" x2="9" y2="15" stroke-width="1.5"/><line x1="12" y1="15" x2="16" y2="15" stroke-width="1.5" opacity=".65"/></svg>'
};

// Theme icon colors (backup)const RP_ICON_COLORS = {
  candy:  '#d4607a',
  star:   '#e8e0ff',
  misty:  'rgba(222,240,253,.91)',
  custom: null
};

// Theme studio templatesconst RP_TS_TEMPLATES = [
  { label: '🌙 暗夜樱花', text: '深紫黑背景渐变壁纸，樱花粉气泡，梦幻夜间风格，图标标签用浅粉色' },
  { label: '🌊 薄荷海洋', text: '薄荷绿到海蓝渐变壁纸，清透玻璃气泡，图标标签用深青绿色，夏日海边氛围' },
  { label: '☕ 奶茶咖啡', text: '壁纸用棕白渐变，气泡用暖棕色，图标标签用咖啡棕色，整体温柔慵懒咖啡馆风格' },
  { label: '🌸 初春嫩粉', text: '嫩粉到白渐变壁纸，气泡用浅樱花粉，图标标签用玫瑰粉色，清新春日少女感' },
  { label: '🍂 秋日余晖', text: '橙金渐变壁纸，暖橙气泡，图标标签用深橙棕色，秋天黄昏温暖感' },
  { label: '🌌 深空极光', text: '深蓝黑渐变壁纸，极光青绿和紫色气泡，图标标签用冷白色，科幻宇宙感' },
];

// Render home iconsfunction lgRenderHomeIcons() {
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

// Apply themefunction lgApplyTheme(id) {
  const phone = document.getElementById('rp-phone');
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
  localStorage.setItem('rp_theme', id || 'candy');
  // 自定义主题 CSS 注入后需浏览器至少一帧才能计算变量，用双帧确保 --rp-clock-color 已生效
  if (id === 'custom') {
    requestAnimationFrame(() => requestAnimationFrame(() => { lgRenderHomeIcons(); rpStripFrameRing(); }));
  } else {
    requestAnimationFrame(() => { lgRenderHomeIcons(); rpStripFrameRing(); });
  }
}

// Strip frame ringfunction rpStripFrameRing() {
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

// Initialize themefunction lgInitTheme() {
  // 先确保 custom style 标签存在（恢复已保存的 CSS）
  lgEnsureCustomStyleTag();
  // lgApplyTheme 内部已经用 rAF 延迟调用 lgRenderHomeIcons，无需再次调用
  lgApplyTheme(localStorage.getItem('rp_theme') || 'candy');
}

// Ensure custom style tag existsfunction lgEnsureCustomStyleTag() {
  if (document.getElementById('rp-custom-theme-style')) return;
  const el = document.createElement('style');
  el.id = 'rp-custom-theme-style';
  const saved = localStorage.getItem('rp_custom_css') || '';
  el.textContent = saved;
  el.disabled = (localStorage.getItem('rp_theme') !== 'custom');
  document.head.appendChild(el);
}

// Inject custom CSSfunction lgInjectCustomCSS(css) {
  lgEnsureCustomStyleTag();
  // 历史管理
  const history = (() => { try { return JSON.parse(localStorage.getItem('rp_custom_css_history') || '[]'); } catch(e) { return []; } })();
  const prev = localStorage.getItem('rp_custom_css') || '';
  if (prev) history.push(prev);
  if (history.length > 5) history.shift();
  localStorage.setItem('rp_custom_css_history', JSON.stringify(history));
  // 写入并启用
  localStorage.setItem('rp_custom_css', css);
  const el = document.getElementById('rp-custom-theme-style');
  if (el) { el.textContent = css; el.disabled = false; }
  // 更新操作栏（新版）
  lgTsUpdateActionBar();
  // 自定义主题注入后重新渲染图标（使图标颜色跟随主题色），延至下一帧确保样式已生效
  requestAnimationFrame(() => { lgRenderHomeIcons(); rpStripFrameRing(); });
  // 兼容旧版撤销按钮（如果还存在）
  const undoBtn = document.getElementById('rp-ts-undo');
  if (undoBtn) undoBtn.disabled = (history.length === 0);
}

// Undo custom CSSfunction lgUndoCustomCSS() {
  const history = (() => { try { return JSON.parse(localStorage.getItem('rp_custom_css_history') || '[]'); } catch(e) { return []; } })();
  if (!history.length) {
    lgTsAddBubble('ai', '暂时没有可以回退的版本哦。');
    return;
  }
  const prev = history.pop();
  localStorage.setItem('rp_custom_css_history', JSON.stringify(history));
  localStorage.setItem('rp_custom_css', prev);
  const el = document.getElementById('rp-custom-theme-style');
  if (el) { el.textContent = prev; el.disabled = false; }
  const undoBtn = document.getElementById('rp-ts-undo');
  if (undoBtn) undoBtn.disabled = (history.length === 0);
  // 操作栏撤销按钮在有历史时才启用（由 lgTsUpdateActionBar 管理）
  lgTsUpdateActionBar();
  // 添加撤销提示气泡
  lgTsAddBubble('ai', '↩ 已回到上一版主题效果。');
}

// Update action barfunction lgTsUpdateActionBar() {
  const hasCss = !!(localStorage.getItem('rp_custom_css') || '').trim();
  const history = (() => { try { return JSON.parse(localStorage.getItem('rp_custom_css_history') || '[]'); } catch(e) { return []; } })();
  const $bar = $('#rp-ts-action-bar');
  if (hasCss) {
    $bar.css('display', 'flex');
  } else {
    $bar.css('display', 'none');
  }
  const $undoV2 = $('#rp-ts-undo-v2');
  if ($undoV2.length) {
    $undoV2.prop('disabled', history.length === 0).css('opacity', history.length === 0 ? '.38' : '1');
  }
}

// Save current themefunction lgSaveCurrentTheme() {
  const css = localStorage.getItem('rp_custom_css') || '';
  if (!css.trim()) {
    lgTsAddBubble('ai', '还没有生成任何主题，先描述一下你想要的风格吧～');
    return;
  }
  const saved = (() => { try { return JSON.parse(localStorage.getItem('rp_saved_themes') || '[]'); } catch(e) { return []; } })();
  // 检查是否已存在相同 CSS（去重）
  if (saved.some(s => s.css === css)) {
    lgTsAddBubble('ai', '这个方案已经保存过啦！去主题页查看吧 ✨');
    return;
  }
  const now = new Date();
  const label = `方案 ${saved.length + 1}`;
  const timeStr = `${now.getMonth()+1}/${now.getDate()} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  // 从 CSS 尝试提取 --rp-home-wall 做预览色
  const wallMatch = css.match(/--rp-home-wall\s*:\s*([^;]+)/);
  const sentMatch = css.match(/--rp-sent-bg\s*:\s*([^;]+)/);
  const preview = {
    wall: wallMatch ? wallMatch[1].trim() : 'linear-gradient(135deg,#f5ece4,#d4a574)',
    sent: sentMatch ? sentMatch[1].trim() : 'linear-gradient(135deg,#c06040,#e08060)',
  };
  saved.push({ label, timeStr, css, preview });
  localStorage.setItem('rp_saved_themes', JSON.stringify(saved));
  lgTsAddBubble('ai', `💾 已保存为「${label}」！在主题页可以找到它。`);
  const $bubbles = $('#rp-ts-bubbles');
  $bubbles.append(`<div class="rp-ts-saved-toast">✓ 方案已保存，去主题页查看</div>`);
  lgTsScrollBottom();
  // 刷新主题页保存区
  lgRenderSavedThemes();
}

// Render saved themesfunction lgRenderSavedThemes() {
  const saved = (() => { try { return JSON.parse(localStorage.getItem('rp_saved_themes') || '[]'); } catch(e) { return []; } })();
  const $section = $('#rp-saved-section');
  const $cards = $('#rp-saved-cards').empty();
  if (!saved.length) {
    $section.hide();
    return;
  }
  $section.show();
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

// Apply saved themefunction lgApplySavedTheme(idx) {
  const saved = (() => { try { return JSON.parse(localStorage.getItem('rp_saved_themes') || '[]'); } catch(e) { return []; } })();
  if (!saved[idx]) return;
  lgInjectCustomCSS(saved[idx].css);
  lgApplyTheme('custom');
  localStorage.setItem('rp_theme', 'custom');
  lgRenderThemePicker();
  lgRenderSavedThemes();
}

// Delete saved themefunction lgDeleteSavedTheme(idx) {
  const saved = (() => { try { return JSON.parse(localStorage.getItem('rp_saved_themes') || '[]'); } catch(e) { return []; } })();
  saved.splice(idx, 1);
  // 重新编号
  saved.forEach((s, i) => { if (/^方案 \d+$/.test(s.label)) s.label = `方案 ${i+1}`; });
  localStorage.setItem('rp_saved_themes', JSON.stringify(saved));
  lgRenderSavedThemes();
}

// Render theme pickerfunction lgRenderThemePicker() {
  const cur = localStorage.getItem('rp_theme') || 'candy';
  const $c = $('#rp-theme-cards').empty();
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

// Render theme studiofunction lgRenderThemeStudio() {
  const $bubbles = $('#rp-ts-bubbles').empty();
  const history = (() => { try { return JSON.parse(localStorage.getItem('rp_custom_css_history') || '[]'); } catch(e) { return []; } })();

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

  // 更新撤销按钮
  const undoBtn = document.getElementById('rp-ts-undo');
  if (undoBtn) undoBtn.disabled = (history.length === 0);
  // 更新新版操作栏
  lgTsUpdateActionBar();

  lgTsScrollBottom();
}

// Add bubble to theme studiofunction lgTsAddBubble(role, text) {
  const $bubbles = $('#rp-ts-bubbles');
  const cls = role === 'user' ? 'rp-ts-bubble-user' : 'rp-ts-bubble-ai';
  $bubbles.append(`<div class="${cls}">${escHtml(text)}</div>`);
  lgTsScrollBottom();
}

// Show typing indicatorfunction lgTsShowTyping() {
  const $bubbles = $('#rp-ts-bubbles');
  $bubbles.append(`<div id="rp-ts-typing-indicator" class="rp-ts-typing"><span></span><span></span><span></span></div>`);
  lgTsScrollBottom();
}

// Hide typing indicatorfunction lgTsHideTyping() {
  $('#rp-ts-typing-indicator').remove();
}

// Scroll to bottomfunction lgTsScrollBottom() {
  const el = document.getElementById('rp-ts-bubbles');
  if (el) el.scrollTop = el.scrollHeight;
}

// Sanitize user inputfunction lgTsSanitizeInput(raw) {
  // 1. 长度限制：200字足够描述一个主题风格，超出截断
  let s = String(raw || '').slice(0, 200);
  // 2. 去除 prompt injection 常用前缀/指令模式（非贪婪，只清洗明显的）
  //    保留普通中英文颜色描述，仅剔除明确的角色扮演/覆盖指令
  s = s.replace(/忽略(前面|之前|上面|所有|以上).*?(指令|规则|要求|设定)/gi, '');
  s = s.replace(/ignore\s+(all\s+)?(previous|above|prior)\s+(instructions?|rules?|prompts?)/gi, '');
  s = s.replace(/你(现在)?是|now\s+you\s+(are|act|play)/gi, '');
  s = s.replace(/system\s*:/gi, '');
  s = s.replace(/assistant\s*:/gi, '');
  return s.trim();
}

// Sanitize CSSfunction lgTsSanitizeCSS(css) {
  if (!css || typeof css !== 'string') return '';
  // 拦截 url()（允许 data: 颜色渐变但禁止 http/https/relative URL）
  // 系统提示已要求"不得包含 url()"，这里作为兜底
  if (/url\s*\(\s*['"]?\s*https?:\/\//i.test(css)) {
    console.warn('[ThemeStudio] AI CSS 包含外部 url()，已拦截');
    css = css.replace(/url\s*\(\s*['"]?\s*https?:\/\/[^)]*\)/gi, 'none');
  }
  // 拦截相对路径 url()（非 data: 开头）
  if (/url\s*\(\s*['"]?(?!data:)[^)#]/i.test(css)) {
    css = css.replace(/url\s*\(\s*['"]?(?!data:)[^)]*\)/gi, 'none');
  }
  // 拦截 @import
  css = css.replace(/@import\s+[^;]+;?/gi, '/* @import blocked */');
  // 拦截 expression()
  css = css.replace(/expression\s*\([^)]*\)/gi, 'none');
  // 拦截 </style 标签（防止逃出 style 元素）
  css = css.replace(/<\/?\s*style\b[^>]*>/gi, '');
  // 拦截 javascript: 协议
  css = css.replace(/javascript\s*:/gi, '');
  return css;
}

// Send theme description to AIasync function lgThemeStudioSend(userText) {
  if (!userText.trim()) return;
  // ── 安全：清洗用户输入 ──
  userText = lgTsSanitizeInput(userText);
  if (!userText) return;
  const $input = $('#rp-ts-input');
  const $send = $('#rp-ts-send');
  $input.val('').prop('disabled', true);
  $input[0].style.height = 'auto'; // 重置 textarea 高度
  $send.prop('disabled', true);

  lgTsAddBubble('user', userText);
  lgTsShowTyping();

  // P3/P4: 读取当前已注入的自定义CSS作为上下文，让AI知道当前状态再修改
  const currentCss = localStorage.getItem('rp_custom_css') || '';
  const hasExistingTheme = currentCss.trim().length > 0 && localStorage.getItem('rp_theme') === 'custom';

  const sysMsg = `你是一个专业的手机主题 CSS 设计师。用户会描述他们想要的视觉风格，你需要生成一段 CSS 变量覆盖代码，作用在 #rp-phone 元素上，改变手机界面的主题颜色。

必须覆盖以下 CSS 变量（所有变量定义在 #rp-phone 上）：
- --rp-home-wall：主屏幕壁纸背景颜色，必须用纯色渐变（不要图片URL），格式例：linear-gradient(160deg, #颜色1, #颜色2)。壁纸色调决定整体风格基调`;
  
  // Note: The rest of this function would typically make an API call to generate CSS
  // For now, we'll just show a placeholder response
  setTimeout(() => {
    lgTsHideTyping();
    lgTsAddBubble('ai', '主题生成中...');
    $input.prop('disabled', false);
    $send.prop('disabled', false);
  }, 1000);
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
  lgThemeStudioSend
};