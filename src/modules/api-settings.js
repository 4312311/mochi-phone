// ================================================================
//  API SETTINGS MODULE
//  API设置面板相关功能
// ================================================================

import { STATE } from '../core/state.js';
import { escHtml } from '../core/utils.js';
import { saveState } from '../core/state.js';
import { go } from './chat.js';

/**
 * 打开设置面板
 */
export function openSettings() {
  populateAvatarSelect();
  updateAvatarPreviewSwatch($('#rp-avatar-select').val());
  go('settings');
}

/**
 * 填充头像选择器
 */
function populateAvatarSelect() {
  const sel = $('#rp-avatar-select');
  sel.empty().append('<option value="user">我(User)</option>');
  // Add NPCs from threads
  Object.values(STATE.threads).forEach(th => {
    sel.append(`<option value="${th.name}">${th.name}</option>`);
  });
  // Add NPCs from moments (unique)
  const seen = new Set(['user', ...Object.values(STATE.threads).map(t => t.name)]);
  (STATE.moments || []).forEach(m => {
    if (m.from !== 'user' && !seen.has(m.name)) {
      seen.add(m.name);
      sel.append(`<option value="${m.name}">${m.name}</option>`);
    }
  });
}

/**
 * 更新头像预览色块
 */
function updateAvatarPreviewSwatch(who) {
  const swatch = $('#rp-avatar-preview-swatch');
  const ci = STATE.avatars && STATE.avatars[who];
  if (ci) {
    swatch.html(`<img class="rp-av-photo" src="${ci}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:19px"/>`);
    swatch.css('background', 'transparent');
  } else if (who === 'user') {
    swatch.text('我').css('background', 'linear-gradient(145deg,#64748b,#475569)');
  } else {
    const th = Object.values(STATE.threads).find(t => t.name === who);
    swatch.text(th ? th.initials : who.slice(0,2).toUpperCase()).css('background', th ? th.avatarBg : 'linear-gradient(145deg,#555,#333)');
  }
}

// 将函数暴露到全局，供HTML中的onclick使用
window.openSettings = openSettings;