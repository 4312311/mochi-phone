// ================================================================
//  MESSAGES MODULE
// ================================================================

// Group colors
const GROUP_COLORS = [
  '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7',
  '#dfe6e9', '#e17055', '#00b894', '#6c5ce7', '#a29bfe'
];

// State
let STATE = {
  threads: {},
  avatars: {},
  settings: {
    userAvatar: '',
    userName: '我'
  }
};

// Load state from localStorage
function loadState() {
  try {
    const saved = localStorage.getItem('rp_state');
    if (saved) {
      STATE = JSON.parse(saved);
    }
  } catch(e) {
    console.error('[Messages] Failed to load state:', e);
  }
}

// Save state to localStorage
function saveState() {
  try {
    localStorage.setItem('rp_state', JSON.stringify(STATE));
  } catch(e) {
    console.error('[Messages] Failed to save state:', e);
  }
}

// Get state
function getSTATE() {
  return STATE;
}

// Escape HTML
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Sanitize SMS text
function sanitizeSmsText(text) {
  return escHtml(text);
}

// Find or create thread
function findOrCreateThread(contactId, contactName, initials) {
  let thread = STATE.threads[contactId];
  if (!thread) {
    const colorIdx = Object.keys(STATE.threads).length % GROUP_COLORS.length;
    thread = {
      id: contactId,
      name: contactName,
      initials: initials || contactName.slice(0, 2).toUpperCase(),
      avatarBg: `linear-gradient(145deg,${GROUP_COLORS[colorIdx]},${GROUP_COLORS[(colorIdx+1)%GROUP_COLORS.length]})`,
      messages: [],
      unread: 0
    };
    STATE.threads[contactId] = thread;
    saveState();
  }
  return thread;
}

// Send SMS
function sendSMS(threadId, text) {
  const thread = STATE.threads[threadId];
  if (!thread) return;

  const msg = {
    id: Date.now(),
    text: text,
    sender: 'user',
    timestamp: Date.now()
  };

  thread.messages.push(msg);
  saveState();
  renderBubbles(threadId);
  updatePreviews();
  refreshBadges();
}

// Extract SMS summaries
function extractSmsSummaries() {
  return Object.values(STATE.threads).map(t => ({
    id: t.id,
    name: t.name,
    initials: t.initials,
    lastMsg: t.messages.length > 0 ? t.messages[t.messages.length - 1] : null,
    unread: t.unread
  }));
}

// Update previews
function updatePreviews() {
  const $list = $('#rp-thread-list');
  if (!$list || $list.length === 0) return;

  $list.empty();

  Object.values(STATE.threads).forEach(thread => {
    const lastMsg = thread.messages.length > 0 ? thread.messages[thread.messages.length - 1] : null;
    const preview = lastMsg ? lastMsg.text : '';
    const time = lastMsg ? formatTime(lastMsg.timestamp) : '';

    $list.append(`
      <div class="rp-thread-item" data-thread-id="${thread.id}">
        <div class="rp-thread-av" style="background:${thread.avatarBg}">${sanitizeSmsText(thread.initials)}</div>
        <div class="rp-thread-info">
          <div class="rp-thread-name">${sanitizeSmsText(thread.name)}</div>
          <div class="rp-thread-preview">${sanitizeSmsText(preview)}</div>
        </div>
        <div class="rp-thread-time">${time}</div>
        ${thread.unread > 0 ? `<div class="rp-thread-badge">${thread.unread}</div>` : ''}
      </div>
    `);
  });
}

// Render bubbles
function renderBubbles(threadId) {
  const $bubbles = $('#rp-bubbles');
  if (!$bubbles) return;

  const thread = STATE.threads[threadId];
  if (!thread) return;

  $bubbles.empty();

  thread.messages.forEach(msg => {
    const isUser = msg.sender === 'user';
    const time = formatTime(msg.timestamp);

    $bubbles.append(`
      <div class="rp-bubble rp-bubble-${isUser ? 'sent' : 'received'}">
        <div class="rp-bubble-content">
          <div class="rp-bubble-text">${sanitizeSmsText(msg.text)}</div>
          <div class="rp-bubble-time">${time}</div>
        </div>
      </div>
    `);
  });

  // Scroll to bottom
  $bubbles.scrollTop($bubbles[0].scrollHeight);
}

// Open thread
function openThread(threadId) {
  const thread = STATE.threads[threadId];
  if (!thread) return;

  // Update header
  $('#rp-hd-av').text(thread.initials).css('background', thread.avatarBg);
  $('#rp-hd-name').text(thread.name);

  // Clear unread
  thread.unread = 0;
  saveState();

  // Render bubbles
  renderBubbles(threadId);
  updatePreviews();
  refreshBadges();

  // Set current thread
  STATE.currentThreadId = threadId;
}

// Format time
function formatTime(timestamp) {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Render thread list
function renderThreadList() {
  updatePreviews();
}

// Render pending queue (placeholder)
function renderPendingQueue() {
  const $queue = $('#rp-pending-queue');
  if (!$queue) return;
  $queue.empty();
}

// Incoming call (placeholder)
function incomingCall(callerId, callerName) {
  console.log('[Messages] Incoming call from:', callerName);
}

// Resolve call (placeholder)
function resolveCall(action) {
  console.log('[Messages] Call resolved:', action);
}

// Incoming hongbao (placeholder)
function incomingHongbao(threadId, senderName, amount) {
  console.log('[Messages] Incoming hongbao:', amount);
}

// Open hongbao (placeholder)
function openHongbao(hongbaoId) {
  console.log('[Messages] Open hongbao:', hongbaoId);
}

// Send user hongbao (placeholder)
function sendUserHongbao(threadId, amount, message) {
  console.log('[Messages] Send hongbao:', amount);
}

// Show hongbao sheet (placeholder)
function showHongbaoSheet(hongbaoData) {
  console.log('[Messages] Show hongbao sheet:', hongbaoData);
}

// Incoming voice (placeholder)
function incomingVoice(threadId, senderName, duration) {
  console.log('[Messages] Incoming voice:', duration);
}

// Play voice (placeholder)
function playVoice(voiceId) {
  console.log('[Messages] Play voice:', voiceId);
}

// Incoming group message (placeholder)
function incomingGroupMsg(groupId, groupName, senderName, text) {
  console.log('[Messages] Incoming group message:', text);
}

// Incoming group voice (placeholder)
function incomingGroupVoice(groupId, senderName, duration) {
  console.log('[Messages] Incoming group voice:', duration);
}

// Incoming group hongbao (placeholder)
function incomingGroupHongbao(groupId, senderName, amount) {
  console.log('[Messages] Incoming group hongbao:', amount);
}

// Toggle attach panel (placeholder)
function toggleAttachPanel() {
  console.log('[Messages] Toggle attach panel');
}

// Show banner (placeholder)
function showBanner(from, text) {
  const $banner = $('#rp-notif-banner');
  if (!$banner) return;

  $('#rp-nb-from').text(sanitizeSmsText(from));
  $('#rp-nb-text').text(sanitizeSmsText(text));
  $('#rp-nb-time').text(formatTime(Date.now()));

  $banner.show();
  setTimeout(() => $banner.hide(), 3000);
}

// Refresh badges
function refreshBadges() {
  const totalUnread = Object.values(STATE.threads).reduce((sum, t) => sum + (t.unread || 0), 0);

  const $mainBadge = $('#rp-main-badge');
  if ($mainBadge && $mainBadge.length > 0) {
    if (totalUnread > 0) {
      $mainBadge.text(totalUnread).show();
    } else {
      $mainBadge.hide();
    }
  }
}

// Beautify SMS in chat (placeholder)
function beautifySMSInChat(text) {
  return sanitizeSmsText(text);
}

// Initialize messages module
function initSMS() {
  console.log('[Raymond Phone] Messages Module initialized');
  loadState();
  renderThreadList();

  // Bind thread item click
  $(document).on('click', '.rp-thread-item', function() {
    const threadId = $(this).data('thread-id');
    openThread(threadId);

    // Navigate to thread view
    $('#rp-view-messages').hide();
    $('#rp-view-thread').show();
  });

  // Bind back button in thread view
  $(document).on('click', '#rp-view-thread .rp-back', function() {
    $('#rp-view-thread').hide();
    $('#rp-view-messages').show();
  });

  // Bind send button
  $(document).on('click', '#rp-send', function() {
    const $input = $('#rp-input');
    const text = $input.val().trim();
    if (!text) return;

    const currentThread = STATE.threads.find(t => t.id === getSTATE().currentThreadId);
    if (currentThread) {
      sendSMS(currentThread.id, text);
      $input.val('');
    }
  });

  // Bind input enter key
  $(document).on('keypress', '#rp-input', function(e) {
    if (e.which === 13) {
      const $input = $(this);
      const text = $input.val().trim();
      if (!text) return;

      const currentThread = STATE.threads.find(t => t.id === getSTATE().currentThreadId);
      if (currentThread) {
        sendSMS(currentThread.id, text);
        $input.val('');
      }
    }
  });

  // Bind add button
  $(document).on('click', '#rp-add-btn', function() {
    showAddChoice();
  });

  // Show add choice
  function showAddChoice() {
    $('#rp-add-choice').remove();
    $('#rp-screen').append(`
      <div class="rp-add-choice" id="rp-add-choice">
        <div class="rp-add-choice-box">
          <div class="rp-add-choice-item" data-action="contact">👤 添加联系人</div>
          <div class="rp-add-choice-item" data-action="group">👥 创建群聊</div>
          <div class="rp-add-choice-item rp-add-choice-delete" data-action="delete">🗑️ 删除好友</div>
        </div>
        <div class="rp-add-choice-cancel" data-action="cancel">取消</div>
      </div>
    `);
  }

  // Hide add choice
  function hideAddChoice() { $('#rp-add-choice').remove(); }

  // Show add contact modal
  function showAddModal() {
    $('#rp-add-modal').show();
    $('#rp-add-name').focus();
  }

  // Bind add choice actions
  $(document).on('click', '.rp-add-choice-item', function() {
    const action = $(this).data('action');
    switch(action) {
      case 'contact':
        hideAddChoice();
        showAddModal();
        break;
      case 'group':
        hideAddChoice();
        showGroupPicker();
        break;
      case 'delete':
        hideAddChoice();
        showDeletePicker();
        break;
    }
  });

  // Bind add choice cancel
  $(document).on('click', '.rp-add-choice-cancel', function() {
    hideAddChoice();
  });

  // Bind add modal buttons
  $(document).on('click', '#rp-add-confirm', function() {
    const name = $('#rp-add-name').val().trim();
    const initials = $('#rp-add-initials').val().trim() || name.slice(0, 2);
    if (!name) return;

    const threadId = name;
    const colorIdx = STATE.threads.length % GROUP_COLORS.length;
    STATE.threads[threadId] = {
      id: threadId, name, initials,
      avatarBg: `linear-gradient(145deg,${GROUP_COLORS[colorIdx]},${GROUP_COLORS[(colorIdx+1)%GROUP_COLORS.length]})`,
      messages: [], unread: 0
    };

    saveState();
    renderThreadList();
    $('#rp-add-modal').hide();
    $('#rp-add-name').val('');
    $('#rp-add-initials').val('');
  });

  // Bind add modal cancel
  $(document).on('click', '#rp-add-cancel', function() {
    $('#rp-add-modal').hide();
    $('#rp-add-name').val('');
    $('#rp-add-initials').val('');
  });

  // Show group picker
  function showGroupPicker() {
    $('#rp-grp-create').remove();
    const contacts = Object.values(STATE.threads).filter(t => !t.id.startsWith('grp_'));
    const items = contacts.map(t => {
      const img = STATE.avatars?.[t.name];
      const avHtml = img
        ? `<div class="rp-grp-pick-av rp-av-img" style="overflow:hidden"><img src="${img}" style="width:100%;height:100%;object-fit:cover"/></div>`
        : `<div class="rp-grp-pick-av" style="background:${t.avatarBg}">${t.initials}</div>`;
      return `<div class="rp-grp-pick-item" data-tid="${t.id}">${avHtml}<span class="rp-grp-pick-name">${escHtml(t.name)}</span><div class="rp-grp-pick-chk">✓</div></div>`;
    }).join('');
    $('#rp-screen').append(`
      <div class="rp-add-choice" id="rp-grp-create">
        <div class="rp-grp-modal">
          <div class="rp-grp-modal-hd">选择群聊成员</div>
          <div id="rp-grp-pick-list" style="max-height:220px;overflow-y:auto">
            ${items || '<div style="padding:16px;color:rgba(0,0,0,.4);text-align:center;font-size:13px">暂无联系人</div>'}
          </div>
          <div style="padding:10px 14px;border-top:1px solid rgba(0,0,0,.06)">
            <input id="rp-grp-name-inp" class="rp-grp-name-inp" type="text" placeholder="群聊名称(留空则自动生成)" maxlength="20"/>
          </div>
          <div class="rp-grp-modal-ft">
            <button class="rp-grp-ft-btn rp-grp-ft-cancel" data-action="grp-cancel">取消</button>
            <button class="rp-grp-ft-btn rp-grp-ft-ok"     data-action="grp-confirm">创建</button>
          </div>
        </div>
      </div>
    `);
    setTimeout(() => $('#rp-grp-name-inp').focus(), 80);
  }

  // Confirm create group
  function confirmCreateGroup() {
    const selected = $('#rp-grp-pick-list .rp-grp-pick-item.selected');
    if (!selected.length) return;
    const memberIds = selected.map((_, el) => $(el).data('tid')).get();
    let name = $('#rp-grp-name-inp').val().trim();
    if (!name) name = memberIds.map(id => STATE.threads[id]?.name || id).join('、');
    $('#rp-grp-create').remove();
    const groupId = `grp_${name}`;
    const colorIdx = Object.keys(STATE.threads).length % GROUP_COLORS.length;
    STATE.threads[groupId] = {
      id: groupId, name, initials: name.slice(0,2),
      avatarBg: `linear-gradient(145deg,${GROUP_COLORS[colorIdx]},${GROUP_COLORS[(colorIdx+1)%GROUP_COLORS.length]})`,
      type: 'group', members: memberIds, messages: [], unread: 0
    };
    saveState(); renderThreadList(); openThread(groupId);
  }

  // Show delete picker
  function showDeletePicker() {
    $('#rp-del-picker').remove();
    const contacts = Object.values(STATE.threads);
    if (!contacts.length) return;
    const items = contacts.map(t => {
      const img = STATE.avatars?.[t.name];
      const avHtml = img
        ? `<div class="rp-del-pick-av rp-av-img" style="overflow:hidden"><img src="${img}" style="width:100%;height:100%;object-fit:cover"/></div>`
        : `<div class="rp-del-pick-av" style="background:${t.avatarBg}">${t.initials}</div>`;
      return `<div class="rp-del-pick-item" data-tid="${escHtml(t.id)}">${avHtml}<span class="rp-del-pick-name">${escHtml(t.name)}</span><div class="rp-del-chk"></div></div>`;
    }).join('');

    $('#rp-screen').append(`
      <div class="rp-add-choice rp-del-picker-view" id="rp-del-picker">
        <div class="rp-nav-bar">
          <button class="rp-back" id="rp-del-cancel">取消</button>
          <span class="rp-nav-title">删除好友</span>
          <button id="rp-del-confirm" >删除</button>
        </div>
        <div id="rp-del-list" style="flex:1;overflow-y:auto;padding:8px 0">${items}</div>
      </div>
    `);
  }

  // Bind group picker items
  $(document).on('click', '.rp-grp-pick-item', function() {
    $(this).toggleClass('selected');
  });

  // Bind group modal buttons
  $(document).on('click', '.rp-grp-ft-btn', function() {
    const action = $(this).data('action');
    if (action === 'grp-confirm') {
      confirmCreateGroup();
    } else {
      $('#rp-grp-create').remove();
    }
  });

  // Bind delete picker items
  $(document).on('click', '.rp-del-pick-item', function() {
    $(this).toggleClass('selected');
  });

  // Bind delete picker buttons
  $(document).on('click', '#rp-del-cancel', function() {
    $('#rp-del-picker').remove();
  });

  $(document).on('click', '#rp-del-confirm', function() {
    const selected = $('#rp-del-list .rp-del-pick-item.selected');
    if (!selected.length) return;
    const threadIds = selected.map((_, el) => $(el).data('tid')).get();
    threadIds.forEach(id => {
      delete STATE.threads[id];
    });
    saveState();
    renderThreadList();
    $('#rp-del-picker').remove();
  });
}

export {
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
  getSTATE,
  saveState,
  loadState
};