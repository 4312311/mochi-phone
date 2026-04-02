// ================================================================
//  THEME STUDIO
//  主题工作室模块
// ================================================================

function lgTsUpdateActionBar() {
  const saved = localStorage.getItem('rp_custom_css') || '';
  const history = (() => { try { return JSON.parse(localStorage.getItem('rp_custom_css_history') || '[]'); } catch(e) { return []; } })();
  $('#rp-ts-undo').prop('disabled', history.length === 0);
}

function lgSaveCurrentTheme() {
  const css = localStorage.getItem('rp_custom_css') || '';
  const savedThemes = (() => { try { return JSON.parse(localStorage.getItem('rp_saved_themes') || '[]'); } catch(e) { return []; } })();
  const name = prompt('请输入主题名称:');
  if (!name) return;
  savedThemes.push({ name, css });
  localStorage.setItem('rp_saved_themes', JSON.stringify(savedThemes));
  lgRenderSavedThemes();
  alert('主题已保存');
}

function lgRenderSavedThemes() {
  const container = $('#rp-saved-themes').empty();
  const savedThemes = (() => { try { return JSON.parse(localStorage.getItem('rp_saved_themes') || '[]'); } catch(e) { return []; } })();
  if (savedThemes.length === 0) {
    container.append('<div class="rp-saved-empty">暂无保存的主题</div>');
    return;
  }
  savedThemes.forEach((theme, idx) => {
    container.append(`
      <div class="rp-saved-theme" data-idx="${idx}">
        <div class="rp-saved-theme-name">${theme.name}</div>
        <button class="rp-saved-apply" data-idx="${idx}">应用</button>
        <button class="rp-saved-delete" data-idx="${idx}">删除</button>
      </div>
    `);
  });
}

function lgApplySavedTheme(idx) {
  const savedThemes = (() => { try { return JSON.parse(localStorage.getItem('rp_saved_themes') || '[]'); } catch(e) { return []; } })();
  if (idx < 0 || idx >= savedThemes.length) return;
  const theme = savedThemes[idx];
  lgInjectCustomCSS(theme.css);
}

function lgDeleteSavedTheme(idx) {
  const savedThemes = (() => { try { return JSON.parse(localStorage.getItem('rp_saved_themes') || '[]'); } catch(e) { return []; } })();
  if (idx < 0 || idx >= savedThemes.length) return;
  savedThemes.splice(idx, 1);
  localStorage.setItem('rp_saved_themes', JSON.stringify(savedThemes));
  lgRenderSavedThemes();
}

function lgRenderThemePicker() {
  const container = $('#rp-theme-picker').empty();
  Object.keys(THEMES).forEach(key => {
    const theme = THEMES[key];
    container.append(`
      <div class="rp-theme-option-card" data-theme="${key}">
        <div class="rp-theme-option-emoji">${theme.emoji}</div>
        <div class="rp-theme-option-name">${theme.name}</div>
        <div class="rp-theme-option-desc">${theme.desc}</div>
      </div>
    `);
  });
}

function lgRenderThemeStudio() {
  const container = $('#rp-theme-studio');
  if (container.length === 0) return;
  const savedCss = localStorage.getItem('rp_custom_css') || '';
  $('#rp-ts-editor').val(savedCss);
  lgRenderSavedThemes();
  lgTsUpdateActionBar();
}

function lgTsAddBubble(role, text) {
  const container = $('#rp-ts-chat');
  const cls = role === 'ai' ? 'rp-ts-bubble-ai' : 'rp-ts-bubble-user';
  container.append(`<div class="${cls}">${text}</div>`);
  lgTsScrollBottom();
}

function lgTsShowTyping() {
  $('#rp-ts-typing').show();
}

function lgTsHideTyping() {
  $('#rp-ts-typing').hide();
}

function lgTsScrollBottom() {
  const container = $('#rp-ts-chat');
  container.scrollTop(container[0].scrollHeight);
}

function lgTsSanitizeInput(raw) {
  if (!raw) return '';
  return raw
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function lgTsSanitizeCSS(css) {
  if (!css) return '';
  return css
    .replace(/expression\(/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}