// ================================================================
//  INIT MODULE
//  核心初始化逻辑、事件绑定
// ================================================================

import { eventSource, event_types, getContext, IS_TOUCH_DEVICE } from './utils.js';
import { STATE, loadState, saveState, DEFAULT_THREADS, mergeGlobalAvatars, cleanInvalidContacts, autoAddCharContact } from './state.js';
import { RP_PHONE_HTML } from '../templates/html.js';
import { renderThreadList, refreshBadges, refreshWidget, refreshLockNotifs, renderPendingQueue, go, hidePhoneTagsInChat, updatePreviews } from '../modules/chat.js';
import { rebuildContactsFromHistory, syncToCurrentChat, findOrCreateThread } from '../modules/helpers.js';

export function initPhone() {
  console.log('[Raymond Phone] 初始化手机...');
  
  // 插入HTML模板
  $('body').append(RP_PHONE_HTML);
  
  // 绑定UI事件
  bindUI();
  
  // 设置时钟更新定时器
  setInterval(updateClock, 30000); // 每30秒更新一次
  
  // 初始化时钟
  updateClock();
  
  // 设置聊天变化监听器
  eventSource.on(event_types.CHAT_CHANGED, onChatChanged);
  
  // 设置可拖动
  makeDraggable();
  
  // 初始化状态
  onChatChanged();
}

export function bindUI() {
  // 铅笔编辑按钮:事件委托,同时处理 click 和 touchend,兼容触屏和桌面
  $(document).on('click touchend', '#rp-bubbles .rp-edit-btn', function(e) {
    e.stopPropagation(); e.preventDefault();
    const btn = $(this);
    const msgIdx = parseInt(btn.data('msgidx'), 10);
    const threadId = btn.data('threadid');
    // 找到气泡：按钮现在在 .rp-btn-row 里，需向上找 .rp-bwrap 再找气泡
    const bbl = btn.closest('.rp-bwrap').find('.rp-bubble')[0];
    if (!bbl || !threadId || isNaN(msgIdx)) return;
    const th = STATE.threads[threadId];
    if (!th || !th.messages[msgIdx]) return;
    rpInlineEdit(bbl, threadId, th.messages[msgIdx], msgIdx);
  });

  // 垃圾桶删除按钮:事件委托
  $(document).on('click touchend', '#rp-bubbles .rp-del-btn', function(e) {
    e.stopPropagation(); e.preventDefault();
    const btn = $(this);
    const msgIdx = parseInt(btn.data('msgidx'), 10);
    const threadId = btn.data('threadid');
    if (!threadId || isNaN(msgIdx)) return;
    const th = STATE.threads[threadId];
    if (!th || !th.messages[msgIdx]) return;
    th.messages.splice(msgIdx, 1);
    saveState();
    updatePreviews();
    renderBubbles(threadId);
  });

  // 来电:接听 / 拒绝(事件委托)
  $(document).on('click', '#rp-call-ans', () => resolveCall('answered'));
  $(document).on('click', '#rp-call-dec', () => resolveCall('declined'));

  $('#rp-fab').on('click', (e) => {
    e.stopPropagation();
    const phone = $('#rp-phone');
    if (phone.is(':visible')) {
      // 关闭手机前保存当前 view,下次打开时恢复
      saveState();
      phone.hide();
      return;
    }
    // 记录打开时间戳,防止 document click 在同一事件循环内把手机关掉（部分 Android 合成 click 问题）
    STATE._phoneOpenedAt = Date.now();
    // 防御性同步:若 CHAT_CHANGED 未触发(用户直接切换了对话),此处补偿
    syncToCurrentChat();
    // 从聊天历史重建联系人(服务端数据,PC/手机共享同一份聊天记录)
    var _fabChatId = STATE.chatId;
    setTimeout(function() { rebuildContactsFromHistory(_fabChatId); }, 300);
    // 恢复上次关闭时的界面(同一 session 内)
    const _rv = STATE.currentView;
    const _rt = STATE.currentThread;
    const _gameViews = ['g2048', 'game', 'ludo'];
    if (_rv && _rv !== 'lock' && !_gameViews.includes(_rv)) {
      if (_rv === 'thread' && _rt && STATE.threads[_rt]) {
        phone.show();
        openThread(_rt);
      } else {
        go(_rv);
        phone.show();
      }
    } else {
      go('lock');
      phone.show();
    }
    // 手机端: 修正 phone 面板位置(html有transform时 50%失效,用实际尺寸计算)
    if (IS_TOUCH_DEVICE) {
      setTimeout(() => {
        // 先强制 frame 尺寸,再测量居中(确保 offsetWidth/Height 正确)
        const frame = document.getElementById('rp-frame');
        if (frame) {
          frame.style.setProperty('width', '300px', 'important');
          frame.style.setProperty('height', '560px', 'important');
          frame.style.setProperty('border-radius', '38px', 'important');
        }
        const ph = phone[0].offsetHeight || 500;
        const pw = phone[0].offsetWidth || 270;
        const t = Math.max(10, (window.innerHeight - ph) / 2);
        const l = Math.max(0, (window.innerWidth - pw) / 2);
        phone[0].style.setProperty('top', t + 'px', 'important');
        phone[0].style.setProperty('left', l + 'px', 'important');
        phone[0].style.setProperty('right', 'auto', 'important');
        phone[0].style.setProperty('bottom', 'auto', 'important');
      }, 0);
    }
  });

  // Click outside phone → close
  $(document).on('click', (e) => {
    const phone = $('#rp-phone');
    if (!phone.is(':visible')) return;
    // 防止 FAB 打开手机后同一帧/合成 click 立即关闭（部分 Android 问题）
    if (STATE._phoneOpenedAt && Date.now() - STATE._phoneOpenedAt < 300) return;
    // 防止 pending_image 触发主楼生图按钮时，合成 click 误关手机
    if (STATE._suppressClose && Date.now() - STATE._suppressClose < 500) return;
    // 若有任何模态/浮层打开,跳过关闭判断(防止 grp-cancel/confirm 误触)
    if ($('#rp-add-choice, #rp-grp-create, #rp-del-picker, #rp-add-modal:visible, #rp-compose-modal:visible').length) return;
    // 若 e.target 已被从 DOM 移除(事件传播期间被删),跳过
    if (!document.contains(e.target)) return;
    if (!$(e.target).closest('#rp-phone, #rp-fab').length) {
      saveState();
      phone.hide();
    }
  });

  $('#rp-swipe-zone, #rp-lock-time, #rp-lock-date').on('click', () => go('home'));

  $(document).on('click', '.rp-app[data-app]', function () {
    const app = $(this).data('app');
    if (app === 'settings') { openSettings(); return; }
    go(app);
  });

  $(document).on('click', '.rp-thread[data-thread]', function () {
    openThread($(this).data('thread'));
  });

  $(document).on('click', '.rp-back[data-to]', function () {
    go($(this).data('to'));
  });

  // FIX3: 发送按钮 → 统一发出所有排队消息
  $('#rp-send').on('click', sendSMS);

  // FIX3: 回车键 → 暂存到队列,不立即发送
  $('#rp-input').on('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addToQueue();
    }
  });

  $('#rp-add-btn').on('click', (e) => {
    e.stopPropagation();
    showAddChoice();
  });

  // Attach panel (event delegation - button lives inside dynamically built HTML)
  $(document).on('click', '#rp-attach-btn', (e) => {
    e.stopPropagation();
    toggleAttachPanel();
  });
  $(document).on('click', (e) => {
    if (!$(e.target).closest('#rp-attach-panel, #rp-attach-btn').length) {
      $('#rp-attach-panel').hide();
    }
  });

  $('#rp-add-cancel').on('click', () => {
    $('#rp-add-modal').hide();
  });

  $('#rp-add-confirm').on('click', addContact);

  $('#rp-add-modal').on('click', function (e) {
    if (e.target === this) $(this).hide();
  });


  // ── Games Folder ─────────────────────────────────────────────
  $(document).on('click', '[data-app="folder-games"]', function(e) {
    e.stopPropagation();
    $('#rp-folder-modal').show();
  });
  $(document).on('click', '#rp-folder-modal', function(e) {
    if (e.target === this) {
      $(this).hide();
      go('home');
    }
  });
  $(document).on('click', '[data-folder-app]', function(e) {
    e.stopPropagation();
    const app = $(this).data('folder-app');
    $('#rp-folder-modal').hide();
    if (app === 'ludo') {
      go('game');
      try { if (!LG || !LG.active) lgInit(); else lgRender(); } catch(ex) { console.warn('[Folder]', ex); }
    } else if (app === 'g2048') {
      go('g2048');
      try { if (!LG2048 || !LG2048.active) g2048Init(); } catch(ex) { console.warn('[Folder]', ex); }
    } else if (app === 'ggold') {
      go('ggold');
      try { ggoldOpen(); } catch(ex) { console.warn('[Folder/ggold]', ex); }
    }
  });
  // ── Ludo game ────────────────────────────────────────────────
  $(document).on('click', '[data-app="ludo"]', function(e) {
    e.stopPropagation();
    if (!LG.active) lgInit();
    else lgRender();
    go('game');
  });

  // ── API 面板事件 ──
  // ── API Settings VIEW (首页入口) ──
  // ── Diary app ──
  $(document).on('click', '[data-app="diary"]', function() {
    STATE.diary = STATE.diary || [];
    renderDiary();
    go('diary');
  });
}

export function updateClock() {
  const now  = new Date();
  const h    = String(now.getHours()).padStart(2, '0');
  const m    = String(now.getMinutes()).padStart(2, '0');
  const t    = `${h}:${m}`;
  const days = ['周日','周一','周二','周三','周四','周五','周六'];
  const d    = `${days[now.getDay()]}  ${now.getMonth()+1}月${now.getDate()}日`;

  $('#rp-sbar-time, #rp-lock-time, #rp-home-clock').text(t);
  $('#rp-lock-date, #rp-home-date').text(d);
}

export function onChatChanged() {
  const ctx = getContext();
  const newChatId = ctx?.chatId || (ctx?.characterId != null ? `char_${ctx?.characterId}` : 'default');

  if (newChatId === STATE.chatId) return;

  // 保存当前窗口状态(内存 + localStorage)
  // FIX: 与 syncToCurrentChat 同步——合并内存与持久化数据再写回，防止数据踩踏
  if (STATE.chatId) {
    const _oldPersisted2 = (() => { try { return JSON.parse(localStorage.getItem(`rp-phone-v1-${STATE.chatId}`) || 'null'); } catch(e) { return null; } })();
    const _safeArr2 = (memArr, persArr) => {
      const m = memArr  || [];
      const p = persArr || [];
      return p.length > m.length ? p : m;
    };
    const _safeMoments2 = _safeArr2(STATE.moments, _oldPersisted2 && _oldPersisted2.moments);
    const _safeDiary2   = _safeArr2(STATE.diary,   _oldPersisted2 && _oldPersisted2.diary);
    CHAT_STORE[STATE.chatId] = {
      threads: JSON.parse(JSON.stringify(STATE.threads)),
      notifications: [...STATE.notifications],
      sync: { ...STATE.sync },
      currentThread: STATE.currentThread,
      moments: JSON.parse(JSON.stringify(_safeMoments2)),
      diary:   JSON.parse(JSON.stringify(_safeDiary2)),
      avatars: Object.assign({}, STATE.avatars || {}),
      bankData: STATE.bankData ? JSON.parse(JSON.stringify(STATE.bankData)) : null,
    };
    const _tmpM2 = STATE.moments, _tmpD2 = STATE.diary;
    STATE.moments = _safeMoments2; STATE.diary = _safeDiary2;
    saveState();
    STATE.moments = _tmpM2; STATE.diary = _tmpD2;
  }

  // 切换到新窗口
  STATE.chatId = newChatId;
  STATE.pendingMessages = [];

  // 优先从内存缓存恢复,其次从 localStorage,最后初始化
  if (CHAT_STORE[newChatId]) {
    const s = CHAT_STORE[newChatId];
    STATE.threads = s.threads || {};
    STATE.notifications = s.notifications;
    STATE.sync = { ...s.sync };
    STATE.moments = JSON.parse(JSON.stringify(s.moments || []));
    STATE.diary   = JSON.parse(JSON.stringify(s.diary   || []));
    STATE.avatars = Object.assign({}, s.avatars || {});
    STATE.bankData = s.bankData ? JSON.parse(JSON.stringify(s.bankData)) : null;
    STATE.currentThread = s.currentThread;
  } else {
    const persisted = loadState(newChatId);
    if (persisted) {
      STATE.threads = persisted.threads || {};
      STATE.notifications = persisted.notifications || [];
      STATE.sync = persisted.sync || { stage: 1, progress: 0, status: '乖巧' };
      STATE.moments = persisted.moments || [];
      STATE.diary = persisted.diary || [];
      STATE.avatars = persisted.avatars || {};
      STATE.bankData = persisted.bankData || null;
      STATE.currentThread = null;
    } else {
      STATE.threads = DEFAULT_THREADS();
      STATE.notifications = [];
      STATE.sync = { stage: 1, progress: 0, status: '乖巧' };
      STATE.moments = [];
      STATE.diary   = [];
      STATE.avatars = {};
      STATE.bankData = null;
      STATE.currentThread = null;
    }
  }
  mergeGlobalAvatars();

  // 重置 UI(加载新状态后立即同步清理无效联系人)
  // 切换对话时重置运行时缓存，防止跨对话污染
  STATE._lastAiFingerprint = null;
  STATE._imgExtractedFps = new Set();
  STATE._pendingComfyPics = new Map();
  STATE._friendsInteractDone = new Set();
  STATE._charRespondDone = new Set();
  if (window.rpObserverSeenSrcs) window.rpObserverSeenSrcs.clear();
  if (window.rpImgWaitQueue) window.rpImgWaitQueue = [];
  cleanInvalidContacts();
  go('lock');
  renderThreadList();
  refreshBadges();
  refreshWidget();
  refreshLockNotifs();
  renderPendingQueue();

  // 延迟执行:等 ctx.name2 稳定后再添加联系人
  // 记录当前 chatId,防止用户快速切换导致竞态
  var _expectedChatId = STATE.chatId;
  setTimeout(function() {
    try {
      // 守卫:如果已经切到别的窗口,终止
      if (STATE.chatId !== _expectedChatId) return;
      cleanInvalidContacts();
      autoAddCharContact();
      hidePhoneTagsInChat();
    } catch (ex) { console.error('[onChatChanged]', ex); }
  }, 600);
}

export function makeDraggable() {
  const phone = document.querySelector('#rp-phone');
  if (!phone) return;
  // 移除旧 handler 防止重复(用具名函数)
  if (phone._rpMoveHandler) document.removeEventListener('mousemove', phone._rpMoveHandler);
  if (phone._rpUpHandler)   document.removeEventListener('mouseup',   phone._rpUpHandler);
  let dragging = false, ox, oy, ex, ey;

  phone.addEventListener('mousedown', e => {
    if (IS_TOUCH_DEVICE) return;
    if (e.target.closest('input,textarea,select,button,a,[contenteditable]')) return;
    // 从 #rp-phone 外边缘算起，热区宽度 BORDER_HIT px 内视为边框（含 box-shadow 外圈）
    const pr = phone.getBoundingClientRect();
    const BORDER_HIT = 22;
    const inLeft   = e.clientX - pr.left   < BORDER_HIT;
    const inRight  = pr.right  - e.clientX < BORDER_HIT;
    const inTop    = e.clientY - pr.top    < BORDER_HIT;
    const inBottom = pr.bottom - e.clientY < BORDER_HIT;
    if (!inLeft && !inRight && !inTop && !inBottom) return;
    dragging = true;
    const r = phone.getBoundingClientRect();
    phone.style.right = 'auto';
    phone.style.bottom = 'auto';
    phone.style.left = r.left + 'px';
    phone.style.top = r.top + 'px';
    ox = r.left; oy = r.top; ex = e.clientX; ey = e.clientY;
    e.preventDefault();
  });
  phone._rpMoveHandler = e => {
    if (!dragging) return;
    // 若滑屏手势已接管此次拖拽，停止手机移动
    if (window._rpSwipeLocked) { dragging = false; return; }
    phone.style.left = (ox + e.clientX - ex) + 'px';
    phone.style.top  = (oy + e.clientY - ey) + 'px';
  };
  phone._rpUpHandler = () => { dragging = false; };
  document.addEventListener('mousemove', phone._rpMoveHandler);
  document.addEventListener('mouseup',   phone._rpUpHandler);
}