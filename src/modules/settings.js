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
  _bindAPISettings();
}

// Bind avatar upload
function _bindAvatarUpload() {
  const fileInput = document.getElementById('rp-avatar-file-input');
  const uploadBtn = document.getElementById('rp-avatar-upload-btn');
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
  const wallInput = document.getElementById('rp-wall-file');
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

// Bind API settings
function _bindAPISettings() {
  // Bind API mode toggle
  $(document).on('change', 'input[name="rp-api-mode-v"]', function() {
    if ($(this).val() === 'custom') {
      $('#rp-api-custom-fields-v').css('display', 'flex');
    } else {
      $('#rp-api-custom-fields-v').hide();
    }
  });

  // Bind API preset buttons
  $(document).on('click', '.rp-api-preset-btn', function(e) {
    e.preventDefault();
    const url = $(this).data('url');
    const model = $(this).data('model');
    $('#rp-api-url-v').val(url);
    $('#rp-api-model-v').val(model);
    if (!url) {
      $('#rp-api-url-v').focus();
    } else {
      $('#rp-api-key-v').val('').focus();
    }
  });

  // Bind API test button
  $(document).on('click', '#rp-api-test-v', function() {
    var $btn = $(this);
    var mode = $('input[name="rp-api-mode-v"]:checked').val();
    if (mode !== 'custom') {
      $btn.text('⚠️ 请先选择「接入其他 API」');
      setTimeout(function() {
        $btn.text('📡 测试连通性');
      }, 2500);
      return;
    }
    var url = ($('#rp-api-url-v').val() || '').trim().replace(/\/+$/, '');
    var key = ($('#rp-api-key-v').val() || '').trim();
    var model = ($('#rp-api-model-v').val() || 'gpt-3.5-turbo').trim();
    if (!url || !key) {
      $btn.text('⚠️ 请先填写URL和Key');
      setTimeout(function() {
        $btn.text('📡 测试连通性');
      }, 2500);
      return;
    }
    $btn.addClass('testing').text('连接中...');
    var t0 = Date.now();
    fetch(url + '/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
      body: JSON.stringify({ model: model, messages: [{ role: 'user', content: 'hi' }], max_tokens: 5 }),
      signal: AbortSignal.timeout(8000)
    }).then(function(r) {
      var status = r.status;
      return r.json().then(function(d) {
        var ms = Date.now() - t0;
        if (!r.ok) {
          var errMsg = (d.error && (d.error.message || d.error.code)) || ('HTTP ' + status);
          $btn.removeClass('testing').addClass('fail').text('❌ ' + String(errMsg).substring(0, 22));
          setTimeout(function() {
            $btn.removeClass('fail').text('📡 测试连通性');
          }, 8000);
          return;
        }
        if (d.error) {
          var errMsg2 = (d.error.message || d.error.code || '接口返回错误').substring(0, 22);
          $btn.removeClass('testing').addClass('fail').text('❌ ' + errMsg2);
          setTimeout(function() {
            $btn.removeClass('fail').text('📡 测试连通性');
          }, 8000);
          return;
        }
        var m = (d.model || model).replace(/^.+\//, '');
        $btn.removeClass('testing').addClass('ok').text('✅ ' + m + ' ' + ms + 'ms');
        setTimeout(function() {
          $btn.removeClass('ok').text('📡 测试连通性');
        }, 8000);
      });
    }).catch(function(e) {
      $btn.removeClass('testing').addClass('fail').text('❌ ' + (e.message || '连接失败').substring(0, 20));
      setTimeout(function() {
        $btn.removeClass('fail').text('📡 测试连通性');
      }, 8000);
    });
  });

  // Bind API save button
  $(document).on('click', '#rp-api-save-v', function() {
    const mode = $('input[name="rp-api-mode-v"]:checked').val() || 'st';
    const cfg = { mode };
    if (mode === 'custom') {
      cfg.url = $('#rp-api-url-v').val().trim();
      cfg.key = $('#rp-api-key-v').val().trim();
      cfg.model = $('#rp-api-model-v').val().trim() || 'deepseek-chat';
      if (!cfg.url || !cfg.key) {
        $('#rp-api-status-v').text('⚠️ 请填写 API 地址和 Key');
        return;
      }
    }
    localStorage.setItem('rp_ludo_api', JSON.stringify(cfg));
    // 保存成功 toast
    const $btn = $('#rp-api-save-v');
    const origText = $btn.text();
    $btn.text('✓ 保存成功').css('background', 'linear-gradient(135deg,#34d399,#059669)');
    setTimeout(() => {
      $btn.text(origText).css('background', 'linear-gradient(135deg,#f472b6,#a855f7)');
      if (window.navigateTo) {
        window.navigateTo('home');
      }
    }, 1400);
  });
}

// Fill API view
function lgFillAPIView() {
  const cfg = (() => {
    try {
      return JSON.parse(localStorage.getItem('rp_ludo_api') || '{}');
    } catch(e) {
      return {};
    }
  })();
  if (cfg.mode === 'custom') {
    $('#rp-api-mode-custom-v').prop('checked', true);
    $('#rp-api-url-v').val(cfg.url || '');
    $('#rp-api-key-v').val(cfg.key || '');
    $('#rp-api-model-v').val(cfg.model || '');
    $('#rp-api-custom-fields-v').css('display', 'flex');
  } else {
    $('#rp-api-mode-st-v').prop('checked', true);
    $('#rp-api-custom-fields-v').hide();
  }
  $('#rp-api-status-v').text('');
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
  _bindAvatarUpload,
  lgFillAPIView
};