// ================================================================
//  MAIN ENTRY - 主入口文件
//  职责：模块导入、CSS注入、主框架渲染、路由控制
// ================================================================

// 1. 导入HTML模板
import { RP_PHONE_HTML } from './src/html.js';

// 2. 导入CSS样式模块（模块化）
import { RP_PHONE_CSS } from './src/styles/index.js';

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
  refreshBadges,
  syncToCurrentChat,
  parsePhone,
  autoAddCharContact,
  cleanInvalidContacts,
  getAvatar,
  setAvatar
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
//  获取SillyTavern上下文和全局对象
// ================================================================
function getContext() {
  if (window.SillyTavern && window.SillyTavern.getContext) {
    return window.SillyTavern.getContext();
  }
  if (window.getContext) {
    return window.getContext();
  }
  return null;
}

// 尝试多种方式获取 eventSource 和 eventTypes（通过 Promise 包装）
const getEventSource = async () => {
  let eventSource = window.eventSource || window.SillyTavern?.eventSource;
  let eventTypes = window.event_types || window.SillyTavern?.eventTypes;

  if (eventSource && eventTypes) {
    return { eventSource, eventTypes };
  }

  console.log('[Raymond Phone] eventSource/eventTypes not found, trying dynamic import...');

  try {
    const mod = await import('../../../../script.js');
    if (mod.eventSource) {
      console.log('[Raymond Phone] Found eventSource via dynamic import');
      eventSource = mod.eventSource;
    }
    if (mod.event_types) {
      console.log('[Raymond Phone] Found event_types via dynamic import');
      eventTypes = mod.event_types;
    }

    if (eventSource && eventTypes) {
      return { eventSource, eventTypes };
    }
  } catch(e) {
    console.log('[Raymond Phone] Dynamic import failed:', e);
  }

  return null;
};

let _eventSource = null;
let _eventTypes = null;

// 标准化 Phone 标记格式（处理 HTML 实体和全角符号）
function normalizePhoneMarkup(raw) {
  let s = String(raw || '');
  // HTML 实体反转义
  s = s
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, ' ');
  // 全角尖括号兼容
  s = s.replace(/</g, '<').replace(/>/g, '>');
  return s;
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
      // 同步到当前对话，确保联系人列表正确
      syncToCurrentChat();
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
      // 同步到当前对话，确保朋友圈数据正确
      syncToCurrentChat();
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

  // 清空指纹，防止热重载后第一条消息被跳过
  window._lastAiFingerprint = null;
  window._pendingPhoneReply = null;

  console.log('[Raymond Phone] Fingerprint reset for hot-reload');

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
        // 同步到当前对话
        syncToCurrentChat();
      }, 500);
    });
    
    // 监听可能的对话切换事件（如新建对话、选择对话等）
    $(document).on('click', '.chat-selector, .chat-item, #new-chat-button', function() {
      // 延迟执行，确保对话已切换
      setTimeout(() => {
        console.log('[Raymond Phone] Chat switched, reloading messages...');
        // 同步到当前对话
        syncToCurrentChat();
      }, 500);
    });
  }
}

// 监听AI回复消息，解析SMS格式
async function setupAIResponseListener() {
  console.log('[Raymond Phone] ===== setupAIResponseListener CALLED =====');
  console.log('[Raymond Phone] Setting up AI response listener...');

  // 等待获取 eventSource
  const eventObj = await getEventSource();

  if (!eventObj || !eventObj.eventSource || !eventObj.eventTypes) {
    console.warn('[Raymond Phone] eventSource or event_types not available');
    console.log('[Raymond Phone] Available globals:', {
      eventSource: !!eventObj?.eventSource,
      eventTypes: !!eventObj?.eventTypes,
      windowEventSource: !!window.eventSource,
      windowEventTypes: !!window.event_types,
      sillyTavernEventSource: !!(window.SillyTavern?.eventSource),
      sillyTavernEventTypes: !!(window.SillyTavern?.eventTypes),
      SillyTavern: !!window.SillyTavern
    });

    // 打印 SillyTavern 对象的所有属性
    if (window.SillyTavern) {
      console.log('[Raymond Phone] SillyTavern object keys:', Object.keys(window.SillyTavern));
      console.log('[Raymond Phone] SillyTavern object:', window.SillyTavern);
    }

    return;
  }

  const { eventSource, eventTypes } = eventObj;
  console.log('[Raymond Phone] eventSource available, event_types:', Object.keys(eventTypes));
  registerAIResponseListeners(eventSource, eventTypes);
}

// 实际注册事件监听器的函数
function registerAIResponseListeners(eventSource, eventTypes) {
  console.log('[Raymond Phone] Registering event listeners...');

  // 监听多个事件类型（兼容不同 ST 版本）
  const eventKeys = ['MESSAGE_RECEIVED', 'GENERATION_ENDED', 'MESSAGE_SWIPED'];
  eventKeys.forEach(key => {
    const eventType = eventTypes[key];
    if (eventType) {
      console.log(`[Raymond Phone] Setting up listener for ${key} (${eventType})`);

      eventSource.on(eventType, () => {
        console.log(`[Raymond Phone] Event triggered: ${key}`);

        // 获取上下文
        const ctx = getContext();
        if (!ctx) {
          console.warn('[Raymond Phone] getContext returned null');
          return;
        }

        console.log('[Raymond Phone] Context:', { chatId: ctx.chatId, chatLength: ctx.chat?.length });

        const chat = ctx.chat;
        if (!chat?.length) {
          console.warn('[Raymond Phone] No chat messages');
          return;
        }

        // 获取最后一条 AI 消息
        const lastAI = [...chat].reverse().find(m => !m.is_user);
        if (!lastAI) {
          console.warn('[Raymond Phone] No AI message found');
          return;
        }

        console.log('[Raymond Phone] Last AI message:', {
          is_user: lastAI.is_user,
          mesLength: lastAI.mes?.length,
          mesPreview: lastAI.mes?.substring(0, 150)
        });

        if (!lastAI.mes) {
          console.warn('[Raymond Phone] AI message has no text');
          return;
        }

        const raw = lastAI.mes;

        console.log('[Raymond Phone] Raw message preview:', raw.substring(0, 200));

        // 修复思维链冲突：先剥离 <think> 块
        const rawStripped = raw.replace(/<think>[\s\S]*?<\/think>/gi, '');
        const normalizedRaw = normalizePhoneMarkup(rawStripped);

        // 指纹防重
        const fp = `${ctx.chatId}|${raw.length}|${raw.slice(0, 24)}|${raw.slice(-24)}`;
        if (fp === window._lastAiFingerprint) {
          console.log('[Raymond Phone] Message already processed (same fingerprint)');
          return;
        }
        window._lastAiFingerprint = fp;

        // 检查是否包含 PHONE 标签
        const hasPhoneOpen = /<PHONE\b/i.test(normalizedRaw);
        const hasPhoneClose = /<\/PHONE>/i.test(normalizedRaw);
        const hasSmsOpen = /<SMS\b/i.test(normalizedRaw);
        const hasSmsClose = /<\/SMS>/i.test(normalizedRaw);

        console.log('[Raymond Phone] Message structure check:', {
          hasPhoneOpen,
          hasPhoneClose,
          hasSmsOpen,
          hasSmsClose
        });

        // 流式生成中间态保护
        if (hasPhoneOpen && !hasPhoneClose) {
          console.log('[Raymond Phone] EARLY RETURN: PHONE not closed (streaming)');
          return;
        }
        if (hasSmsOpen && !hasSmsClose) {
          console.log('[Raymond Phone] EARLY RETURN: SMS not closed (streaming)');
          return;
        }

        // 匹配 PHONE 块
        const phoneMatch = normalizedRaw.match(/<PHONE>([\s\S]*?)<\/PHONE>/i);
        const hasBarePhoneTags = /<(SMS|GMSG|GVOICE|GHONGBAO|SIMG|NOTIFY|MOMENTS|COMMENT|SYNC|CALL|VOICE|HONGBAO)\b/i.test(normalizedRaw);

        console.log('[Raymond Phone] Parsing result:', {
          hasPhoneBlock: !!phoneMatch,
          hasBarePhoneTags,
          phoneBlockContent: phoneMatch ? phoneMatch[1].substring(0, 100) : null
        });

        if (phoneMatch) {
          console.log('[Raymond Phone] Full PHONE block content:', phoneMatch[1]);
          console.log('[Raymond Phone] Calling parsePhone...');
          try {
            const parsedCount = parsePhone(phoneMatch[1]);
            console.log('[Raymond Phone] parsePhone returned:', parsedCount, 'items');

            if (parsedCount > 0) {
              console.log('[Raymond Phone] Successfully parsed', parsedCount, 'phone message(s)');
              // 清理 pending 状态
              if (window._pendingPhoneReply) {
                window._pendingPhoneReply = null;
              }
            } else {
              console.warn('[Raymond Phone] parsePhone returned 0 items, but PHONE block exists');
            }
          } catch(e) {
            console.error('[Raymond Phone] Error in parsePhone:', e);
          }
        } else if (hasBarePhoneTags) {
          console.log('[Raymond Phone] Found bare phone tags (no PHONE wrapper)');
          try {
            const parsedCount = parsePhone(normalizedRaw);
            console.log('[Raymond Phone] parsePhone (bare tags) returned:', parsedCount, 'items');
          } catch(e) {
            console.error('[Raymond Phone] Error in parsePhone (bare):', e);
          }
        } else {
          console.log('[Raymond Phone] No PHONE tags found in message');
        }
      });
    }
  });

  console.log('[Raymond Phone] AI response listener setup complete');
}

  // 自动初始化
$(async function() {
  try {
    console.log('[Raymond Phone] ===== INITIALIZATION START =====');
    console.log('[Raymond Phone] Starting initialization...');
    await init();
    console.log('[Raymond Phone] init() completed successfully');
    setupCharacterSwitchListener();
    console.log('[Raymond Phone] setupCharacterSwitchListener() completed');
    await setupAIResponseListener();
    console.log('[Raymond Phone] setupAIResponseListener() completed');
  console.log('[Raymond Phone] All initializations complete');

  // 添加全局调试函数，方便在控制台手动检查
  window.checkEventSource = function() {
    console.log('[Raymond Phone] Manual check:');
    console.log('  window.eventSource:', window.eventSource);
    console.log('  window.event_types:', window.event_types);
    console.log('  SillyTavern:', window.SillyTavern);
    console.log('  SillyTavern.eventSource:', window.SillyTavern?.eventSource);
    console.log('  SillyTavern.eventTypes:', window.SillyTavern?.eventTypes);
    console.log('  SillyTavern.event_types:', window.SillyTavern?.event_types);
  };
} catch(e) {
    console.error('[Raymond Phone] init failed:', e);
  }
});