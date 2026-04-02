// ================================================================
//  MAIN ENTRY - 主入口文件
//  职责：模块导入、CSS注入、主框架渲染、路由控制
// ================================================================

// 1. 导入HTML模板
import { RP_PHONE_HTML } from './src/html.js';

// 2. 导入CSS样式模块
import { RP_PHONE_CSS } from './src/styles/css.js';

// 3. 导入短信模块
import {
  sendSMS,
  sanitizeSmsText,
  extractSmsSummaries,
  beautifySMSInChat,
  initSMS,
  renderThreadList,
  openThread,
  renderBubbles,
  updatePreviews,
  renderPendingQueue,
  incomingCall,
  resolveCall,
  incomingHongbao,
  openHongbao,
  sendUserHongbao,
  showHongbaoSheet,
  incomingVoice,
  playVoice,
  incomingGroupMsg,
  incomingGroupVoice,
  incomingGroupHongbao,
  toggleAttachPanel,
  findOrCreateThread,
  showBanner,
  refreshBadges
} from './src/modules/messages.js';

// 4. 导入主题模块
import {
  THEMES,
  RP_THEME_ICONS,
  lgApplyTheme,
  lgInitTheme,
  lgRenderHomeIcons,
  rpStripFrameRing,
  lgRenderThemePicker,
  initThemes
} from './src/modules/themes.js';

// 5. 导入朋友圈模块
import {
  initMoments,
  renderMoments,
  mergeGlobalAvatars
} from './src/modules/moments.js';

// 6. 导入设置模块
import {
  initSettings,
  _bindAvatarUpload,
  lgFillAPIView
} from './src/modules/settings.js';

// 5. 导入占位符模块（显示未迁移功能提示）
import { showMigratingMessage } from './src/modules/placeholder.js';

// ================================================================
//  工具函数（检测触摸设备）
// ================================================================
const IS_TOUCH_DEVICE = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// ================================================================
//  注入CSS样式
// ================================================================
function injectStyles() {
  if (document.getElementById('rp-phone-css')) return;
  const style = document.createElement('style');
  style.id = 'rp-phone-css';
  style.textContent = RP_PHONE_CSS;
  document.head.appendChild(style);
}

// ================================================================
//  获取SillyTavern上下文
// ================================================================
function getContext() {
  if (window.SillyTavern && window.SillyTavern.getContext) {
    return window.SillyTavern.getContext();
  }
  return null;
}

// ================================================================
//  路由控制
// ================================================================
function navigateTo(page, appInfo = null) {
  // 隐藏所有视图
  $('#rp-home').hide();
  $('.rp-view').hide();

  switch(page) {
    case 'home':
      $('#rp-view-home').show();
      break;
    case 'messages':
      $('#rp-view-messages').show();
      break;
    case 'thread':
      $('#rp-view-thread').show();
      break;
    case 'themes':
      $('#rp-view-themes').show();
      lgRenderThemePicker();
      break;
    case 'theme-studio':
      $('#rp-view-theme-studio').show();
      break;
    case 'api-settings':
      $('#rp-view-api-settings').show();
      lgFillAPIView();
      break;
    case 'settings':
      $('#rp-view-settings').show();
      _bindAvatarUpload();
      break;
    case 'moments':
      $('#rp-view-moments').show();
      renderMoments();
      break;
    case 'diary':
    case 'xhs':
    case 'bank':
    case 'folder-games':
    case 'g2048':
    case 'ggold':
    case 'game':
      // 未迁移的功能显示提示
      const appNames = {
        'folder-games': '游戏',
        'diary': '日记',
        'xhs': '小红书',
        'bank': '银行卡',
        'g2048': '2048游戏',
        'ggold': '黄金矿工',
        'game': '飞行棋'
      };
      const name = appNames[page] || page;
      alert(`【${name}】\n\n该功能正在迁移中，暂时无法使用。\n\n请等待后续更新。`);
      break;
    default:
      console.log('[Raymond Phone] Unknown page:', page);
  }
}

// ================================================================
//  初始化
// ================================================================
async function init() {
  console.log('[Raymond Phone] Initializing...');

  // Hot-reload safety: remove stale elements
  const stale = document.getElementById('rp-wrapper');
  if (stale) stale.remove();
  const staleFab = document.getElementById('rp-fab');
  if (staleFab) staleFab.remove();
  const staleCSS = document.getElementById('rp-phone-css');
  if (staleCSS) staleCSS.remove();

  // 注入CSS
  injectStyles();

  // 注入HTML
  document.body.insertAdjacentHTML('beforeend', RP_PHONE_HTML);

  // Defensive: ensure FAB visible after append
  var _f = document.getElementById('rp-fab');
  if (_f) {
    _f.style.cssText += ';display:flex!important;visibility:visible!important;opacity:1!important';
  }

  // 修复移动端布局
  (function fixMobileLayout() {
    const frame = document.getElementById('rp-frame');
    var _ph = document.getElementById('rp-phone');
    if (_ph) {
      IS_TOUCH_DEVICE ? _ph.classList.add('rp-mobile-pos') : _ph.classList.remove('rp-mobile-pos');
    }
    if (IS_TOUCH_DEVICE) {
      // 移动端 FAB 位置修复
      function _applyFabPos() {
        if (!IS_TOUCH_DEVICE) return;
        const _fab = document.getElementById('rp-fab');
        if (!_fab) return;
        const _h = Math.max(_fab.offsetHeight, 32);
        _fab.style.setProperty('top', (window.innerHeight - 110 - _h) + 'px', 'important');
        _fab.style.setProperty('bottom', 'auto', 'important');
        _fab.style.setProperty('right', '14px', 'important');
        _fab.style.setProperty('left', 'auto', 'important');
        _fab.style.setProperty('display', 'flex', 'important');
        _fab.style.setProperty('visibility', 'visible', 'important');
      }
      _applyFabPos();
      setTimeout(_applyFabPos, 200);
      setTimeout(_applyFabPos, 800);
      // 强制 frame 尺寸 300×560 (手机端专用)
      if (frame) {
        frame.style.setProperty('width', '300px', 'important');
        frame.style.setProperty('height', '560px', 'important');
        frame.style.setProperty('border-radius', '38px', 'important');
      }
    } else {
      // PC端：清除任何可能残留的手机端内联样式
      if (frame) {
        frame.style.removeProperty('width');
        frame.style.removeProperty('height');
        frame.style.removeProperty('border-radius');
      }
    }
  })();

  // 初始化主题模块
  initThemes();

  // 初始化短信模块
  initSMS();

  // 初始化朋友圈模块
  initMoments();

  // 初始化设置模块
  initSettings();

  // 绑定FAB点击事件
  $('#rp-fab').on('click', function() {
    $('#rp-phone').toggle();
  });

  // 绑定应用图标点击事件（路由）
  $('#rp-app-grid .rp-app').on('click', function() {
    const app = $(this).data('app');

    switch(app) {
      case 'messages':
        navigateTo('messages');
        break;
      case 'themes':
        navigateTo('themes');
        break;
      case 'api-settings':
        navigateTo('api-settings');
        break;
      default:
        // 未迁移的功能显示提示
        navigateTo(app);
    }
  });

  // 绑定返回按钮
  $(document).on('click', '.rp-back', function(e) {
    e.preventDefault();
    const to = $(this).data('to');
    if (to) {
      navigateTo(to);
    } else {
      navigateTo('home');
    }
  });

  // 绑定主题卡片点击
  $(document).on('click', '.rp-theme-card', function() {
    const tid = $(this).data('tid');
    if (tid === 'custom') {
      navigateTo('theme-studio');
    } else {
      lgApplyTheme(tid);
      lgRenderThemePicker();
    }
  });

  // 绑定游戏文件夹
  $(document).on('click', '#rp-folder-games-btn', function() {
    $('#rp-folder-modal').toggle();
  });

  // 绑定游戏项点击
  $(document).on('click', '.rp-folder-item', function() {
    const app = $(this).data('folder-app');
    $('#rp-folder-modal').hide();
    navigateTo(app);
  });

  // 绑定游戏文件夹外部点击关闭
  $(document).on('click', function(e) {
    if (!$(e.target).closest('#rp-folder-games-btn, #rp-folder-modal').length) {
      $('#rp-folder-modal').hide();
    }
  });

  // 绑定主页页面指示点
  $(document).on('click', '.rp-home-dot', function() {
    const idx = $(this).index();
    $('.rp-home-page').hide();
    $(`.rp-home-page:eq(${idx})`).show();
    $('.rp-home-dot').removeClass('rp-home-dot-active');
    $(this).addClass('rp-home-dot-active');
  });

  // 显示FAB
  $('#rp-wrapper').show();

  // 显示主屏
  navigateTo('home');

  console.log('[Raymond Phone] Initialized successfully');
}

// 导出navigateTo供其他模块使用
window.navigateTo = navigateTo;

// 监听角色切换事件
function setupCharacterSwitchListener() {
  // 检查是否存在角色切换的事件或方法
  if (window.SillyTavern) {
    // 监听可能的角色切换事件
    $(document).on('click', '.character-selector, .character-card', function() {
      // 延迟执行，确保角色已切换
      setTimeout(() => {
        console.log('[Raymond Phone] Character switched, reloading messages...');
        // 重新初始化消息模块
        initSMS();
      }, 500);
    });
  }
}

// 自动初始化
$(async function() {
  try {
    await init();
    setupCharacterSwitchListener();
  } catch(e) {
    console.error('[Raymond Phone] init failed:', e);
  }
});