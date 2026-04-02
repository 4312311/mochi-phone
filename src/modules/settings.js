// ================================================================
//  SETTINGS MODULE
// ================================================================

let STATE = window.STATE || {};

// Initialize settings module
function initSettings() {
  STATE = window.STATE || {};
  console.log('[Raymond Phone] Settings Module initialized');
  _bindAvatarUpload();
  _bindWallpaperUpload();
  _bindThemeSettings();
}

// Bind avatar upload
function _bindAvatarUpload() {
  const fileInput = document.getElementById('rp-avatar-input');
  const uploadBtn = document.getElementById('rp-avatar-upload');
  if (!fileInput || !uploadBtn) {
    console.log('[Phone:av] _bindAvatarUpload: elements not found');
    return;
  }
  uploadBtn.onclick = function() {
    fileInput.click();
  };
  fileInput.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      const imgData = e.target.result;
      _saveAvatar('user', imgData);
    };
    reader.readAsDataURL(file);
  };
}

// Bind wallpaper upload
function _bindWallpaperUpload() {
  const wallInput = document.getElementById('rp-wall-input');
  const wallUpload = document.getElementById('rp-wall-upload');
  const wallReset = document.getElementById('rp-wall-reset');
  if (!wallInput || !wallUpload) return;
  wallUpload.onclick = function() {
    wallInput.click();
  };
  wallInput.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      const imgData = e.target.result;
      STATE.wallpaper = imgData;
      saveState();
      updateWallpaper();
    };
    reader.readAsDataURL(file);
  };
  if (wallReset) {
    wallReset.onclick = function() {
      if (confirm('确定要恢复默认壁纸吗？')) {
        STATE.wallpaper = null;
        saveState();
        updateWallpaper();
      }
    };
  }
}

// Bind theme settings
function _bindThemeSettings() {
  const themeSelect = document.getElementById('rp-theme-select');
  if (!themeSelect) return;
  themeSelect.value = STATE.theme || 'candy';
  themeSelect.onchange = function() {
    const theme = this.value;
    STATE.theme = theme;
    saveState();
    updateTheme();
  };
}

// Save avatar
function _saveAvatar(key, imgData) {
  if (!STATE.avatars) STATE.avatars = {};
  STATE.avatars[key] = imgData;
  try {
    const globalAvatars = JSON.parse(localStorage.getItem('rp_avatars') || '{}');
    globalAvatars[key] = imgData;
    localStorage.setItem('rp_avatars', JSON.stringify(globalAvatars));
  } catch(e) {
    console.warn('[Phone:av] save global avatar failed:', e);
  }
  saveState();
  updateAvatars();
}

// Update wallpaper
function updateWallpaper() {
  const lockWidget = document.getElementById('rp-lock-widget');
  if (lockWidget) {
    if (STATE.wallpaper) {
      lockWidget.style.background = `linear-gradient(rgba(255,230,240,.10),rgba(255,210,225,.12)),url('${STATE.wallpaper}') center/cover no-repeat`;
    } else {
      lockWidget.style.background = 'linear-gradient(rgba(255,230,240,.10),rgba(255,210,225,.12)),url("https://i.postimg.cc/Hx8NSZL6/shou-ji-bi-zhi-fen-xiang-fen-se-da-hai-wen-rou-bao-ji-1-chao-ji-kun-dan-lai-zi-xiao-hong-shu-wang-ye-ban.jpg") center/cover no-repeat';
    }
  }
}

// Update theme
function updateTheme() {
  const phone = document.getElementById('rp-phone');
  if (phone) {
    phone.className = phone.className.replace(/rp-theme-\w+/g, '');
    if (STATE.theme) {
      phone.classList.add(`rp-theme-${STATE.theme}`);
    }
  }
}

// Update avatars
function updateAvatars() {
  // This function would update avatars across the app
  // For now, we'll just refresh the current view
  if (STATE.currentView === 'moments') {
    if (window.renderMoments) {
      window.renderMoments();
    }
  }
  if (STATE.currentView === 'messages') {
    if (window.renderThreadList) {
      window.renderThreadList();
    }
  }
}

// Save state
function saveState() {
  if (window.__saveState) {
    window.__saveState();
  }
}

export {
  initSettings,
  _bindAvatarUpload
};