// ================================================================
//  AVATAR UPLOAD
//  头像上传模块
// ================================================================

function _bindAvatarUpload() {
  $(document).on('click', '#rp-avatar-upload', function() {
    const input = $('<input type="file" accept="image/*">');
    input.on('change', function() {
      const file = this.files[0];
      if (!file) return;
      
      const who = $('#rp-avatar-select').val();
      if (!who) {
        alert('请先选择要设置头像的角色');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = function(e) {
        const dataUrl = e.target.result;
        setAvatar(who, dataUrl);
        updateAvatarPreviewSwatch(who);
        
        const th = Object.values(STATE.threads).find(t => t.name === who);
        if (th && STATE.currentView === 'thread' && STATE.currentThread === th.id) {
          const hdAv = $('#rp-hd-av');
          hdAv.empty().append(`<img class="rp-av-photo" src="${dataUrl}" alt=""/>`).css('background', 'transparent');
        }
        
        if (STATE.currentView === 'threads') {
          renderThreadList();
        }
        
        if (STATE.currentView === 'moments') {
          renderMoments();
        }
        
        saveState();
      };
      reader.readAsDataURL(file);
    });
    input.click();
  });
}

function getAvatar(key) {
  if (window._rpAV && window._rpAV[key]) return window._rpAV[key];
  if (_AV[key]) return _AV[key];
  if (STATE.avatars && STATE.avatars[key]) {
    setAvatar(key, STATE.avatars[key]);
    return STATE.avatars[key];
  }
  return null;
}

function setAvatar(key, dataUrl) {
  if (!key || !dataUrl) return;
  _AV[key] = dataUrl;
  window._rpAV = window._rpAV || {};
  window._rpAV[key] = dataUrl;
  STATE.avatars[key] = dataUrl;
  saveGlobalAvatars();
}

function mergeGlobalAvatars() {
  if (window._rpAV) {
    Object.assign(_AV, window._rpAV);
    Object.assign(STATE.avatars, window._rpAV);
  }
}

function saveGlobalAvatars() {
  try {
    localStorage.setItem('rp_global_avatars', JSON.stringify(_AV));
  } catch(e) {
    console.warn('[Phone] saveGlobalAvatars error:', e);
  }
}