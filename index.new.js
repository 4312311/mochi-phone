// ================================================================
//  MAIN ENTRY - 主入口文件
//  职责：模块导入、CSS注入、主框架渲染、路由控制
// ================================================================

// 1. 导入CSS样式模块
import { RP_PHONE_CSS } from './src/styles/css.js';

// 2. 导入短信模块
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
} from './src/modules/sms.js';

// 3. 导入主题模块
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

// 4. 导入占位符模块（显示未迁移功能提示）
import { showMigratingMessage } from './src/modules/placeholder.js';

// ================================================================
//  注入CSS样式
// ================================================================
(function injectStyles() {
  const style = document.createElement('style');
  style.textContent = RP_PHONE_CSS;
  document.head.appendChild(style);
})();

// ================================================================
//  全局状态（仅核心状态，各模块状态在模块内部管理）
// ================================================================
const STATE = {
  chatId: null,
  threads: {
    'raymond': {
      id: 'raymond',
      name: 'Raymond',
      type: 'sms',
      messages: []
    }
  },
  currentThread: 'raymond',
  pendingMessages: [],
  avatars: {},
  diary: [],
  settings: {}
};

// ================================================================
//  工具函数（通用工具）
// ================================================================

// HTML转义
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// 获取标签属性
function getTagAttrs(str) {
  const attrs = {};
  if (!str) return attrs;
  str.replace(/(\w+)=["']([^"']*)["']/g, (_, k, v) => { attrs[k] = v; });
  return attrs;
}

// 获取SillyTavern上下文
function getContext() {
  return window.getContext ? getContext() : (window.SillyTavern && window.SillyTavern.getContext ? window.SillyTavern.getContext() : null);
}

// ================================================================
//  状态管理（核心状态保存/加载）
// ================================================================

function saveState() {
  if (!STATE.chatId) return;
  try {
    const threads = JSON.parse(JSON.stringify(STATE.threads));
    for (const th of Object.values(threads)) {
      if (th.messages) {
        if (th.messages.length > 100) th.messages = th.messages.slice(-100);
        th.messages = th.messages.map(m =>
          (m.type === 'image' && m.src?.startsWith('data:')) ? { ...m, src: '__img_expired__' } : m
        );
      }
    }
    const data = { threads: threads, avatars: STATE.avatars || {}, diary: STATE.diary || [], settings: STATE.settings || {} };
    localStorage.setItem(`rp_phone_${STATE.chatId}`, JSON.stringify(data));
  } catch(e) {
    console.warn('[Raymond Phone] saveState failed:', e);
  }
}

function loadState() {
  const ctx = getContext();
  if (!ctx?.chatId) return;
  STATE.chatId = ctx.chatId;
  try {
    const data = JSON.parse(localStorage.getItem(`rp_phone_${STATE.chatId}`) || '{}');
    STATE.threads = data.threads || STATE.threads;
    STATE.avatars = data.avatars || {};
    STATE.diary = data.diary || [];
    STATE.settings = data.settings || {};
    window._rpAV = Object.assign(window._rpAV || {}, STATE.avatars || {});
  } catch(e) {
    console.warn('[Raymond Phone] loadState failed:', e);
  }
}

// ================================================================
//  将模块函数暴露到window（供HTML中的onclick使用）
// ================================================================
window.STATE = STATE;
window.sendSMS = sendSMS;
window.lgApplyTheme = lgApplyTheme;
window.lgRenderThemePicker = lgRenderThemePicker;
window.saveState = saveState;
window.getContext = getContext;
window.getSTATE = () => STATE;
window.navigateTo = navigateTo;
window.openHongbao = openHongbao;
window.sendUserHongbao = sendUserHongbao;
window.showHongbaoSheet = showHongbaoSheet;
window.playVoice = playVoice;
window.toggleAttachPanel = toggleAttachPanel;
window.resolveCall = resolveCall;
window.findOrCreateThread = findOrCreateThread;

// ================================================================
//  HTML模板（主框架结构）
// ================================================================
const RP_PHONE_HTML = `
<div id="rp-wrapper" style="display:none">
  <div id="rp-fab" title="打开手机">📱</div>
  
  <div id="rp-phone">
    <div id="rp-frame">
      <!-- 首页 -->
      <div id="rp-home">
        <div class="rp-home-body">
          <div id="rp-home-clock"></div>
          <div id="rp-home-date"></div>
          <div id="rp-app-grid">
            <!-- 信息（已迁移） -->
            <div class="rp-app" data-app="messages">
              <div class="rp-app-ico">
                <div class="rp-badge" id="rp-main-badge" style="display:none">0</div>
              </div>
              <div class="rp-app-lbl">信息</div>
            </div>
            <!-- 朋友圈（未迁移） -->
            <div class="rp-app" data-app="moments">
              <div class="rp-app-ico"></div>
              <div class="rp-app-lbl">朋友圈</div>
            </div>
            <!-- 设置（未迁移） -->
            <div class="rp-app" data-app="settings">
              <div class="rp-app-ico"></div>
              <div class="rp-app-lbl">设置</div>
            </div>
            <!-- 游戏（未迁移） -->
            <div class="rp-app" id="rp-folder-games-btn" data-app="folder-games">
              <div class="rp-app-ico"></div>
              <div class="rp-app-lbl">游戏</div>
            </div>
            <!-- 主题（已迁移） -->
            <div class="rp-app" data-app="themes">
              <div class="rp-app-ico"></div>
              <div class="rp-app-lbl">主题</div>
            </div>
            <!-- 日记（未迁移） -->
            <div class="rp-app" data-app="diary">
              <div class="rp-app-ico"></div>
              <div class="rp-app-lbl">日记</div>
            </div>
            <!-- 小红书（未迁移） -->
            <div class="rp-app" data-app="xhs" title="小红书">
              <div class="rp-app-ico"></div>
              <div class="rp-app-lbl">小红书</div>
            </div>
            <!-- 银行（未迁移） -->
            <div class="rp-app" data-app="bank">
              <div class="rp-app-ico"></div>
              <div class="rp-app-lbl">银行</div>
            </div>
          </div>
        </div>
        <div class="rp-home-bar"></div>
      </div>
      
      <!-- 各模块的页面容器（初始隐藏，由各模块自己填充内容） -->
      <!-- 信息页面（由SMS模块负责） -->
      <div id="rp-messages" class="rp-view" style="display:none"></div>
      
      <!-- 主题页面（由Themes模块负责） -->
      <div id="rp-themes" class="rp-view" style="display:none"></div>
      
      <!-- 未迁移功能提示 -->
      <div id="rp-not-migrated" class="rp-view" style="display:none">
        <div class="rp-page-header">
          <button class="rp-back-btn">◀</button>
          <span class="rp-page-title">功能迁移中</span>
        </div>
        <div class="rp-not-migrated-content">
          <p id="rp-not-migrated-app-name">此功能正在迁移中，暂不可用</p>
        </div>
      </div>

      <!-- 通话覆盖层 -->
      <div id="rp-call-overlay" style="display:none;position:absolute;inset:0;background:rgba(0,0,0,.85);z-index:300;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff"></div>
    </div>
  </div>
</div>
`;

// ================================================================
//  路由控制
// ================================================================
const navigateTo = function(page, appInfo = null) {
  // 隐藏所有视图
  $('#rp-home').hide();
  $('.rp-view').hide();

  switch(page) {
    case 'home':
      $('#rp-home').show();
      break;
    case 'messages':
      $('#rp-messages').show();
      break;
    case 'themes':
      $('#rp-themes').show();
      break;
    case 'not-migrated':
      $('#rp-not-migrated').show();
      if (appInfo) {
        showNotMigrated(appInfo);
      }
      break;
  }
};

// ================================================================
//  初始化
// ================================================================
async function init() {
  console.log('[Raymond Phone] Initializing...');
  
  // 注入HTML
  document.body.insertAdjacentHTML('beforeend', RP_PHONE_HTML);
  
  // 加载状态
  loadState();
  
  // 初始化主题模块
  initThemes();
  
  // 初始化短信模块
  initSMS();
  
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
      default:
        // 未迁移的功能显示提示
        showNotMigrated(app);
        navigateTo('not-migrated', app);
    }
  });
  
  // 绑定未迁移页面的返回按钮
  $('#rp-not-migrated .rp-back-btn').on('click', function() {
    navigateTo('home');
  });

  // 绑定通话按钮
  $(document).on('click', '#rp-call-dec', function() {
    resolveCall('declined');
  });
  $(document).on('click', '#rp-call-ans', function() {
    resolveCall('answered');
  });

  // 显示FAB
  $('#rp-wrapper').show();
  
  console.log('[Raymond Phone] Initialized successfully');
}

// ================================================================
//  启动应用
// ================================================================
jQuery(async () => {
  try {
    await init();
  } catch(e) {
    console.error('[Raymond Phone] init failed:', e);
    setTimeout(async () => {
      if (!document.getElementById('rp-fab')) {
        try { await init(); } catch(e2) {}
      }
    }, 1500);
  }
});
