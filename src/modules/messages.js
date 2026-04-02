// ================================================================
//  MESSAGES MODULE
// ================================================================

// State
let STATE = {
  threads: [],
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

// Sanitize SMS text
function sanitizeSmsText(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Find or create thread
function findOrCreateThread(contactId, contactName, initials) {
  let thread = STATE.threads.find(t => t.id === contactId);
  if (!thread) {
    thread = {
      id: contactId,
      name: contactName,
      initials: initials || contactName.slice(0, 2).toUpperCase(),
      avatar: '',
      messages: [],
      unread: 0
    };
    STATE.threads.push(thread);
    saveState();
  }
  return thread;
}

// Send SMS
function sendSMS(threadId, text) {
  const thread = STATE.threads.find(t => t.id === threadId);
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
  return STATE.threads.map(t => ({
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

  STATE.threads.forEach(thread => {
    const lastMsg = thread.messages.length > 0 ? thread.messages[thread.messages.length - 1] : null;
    const preview = lastMsg ? lastMsg.text : '';
    const time = lastMsg ? formatTime(lastMsg.timestamp) : '';

    $list.append(`
      <div class="rp-thread-item" data-thread-id="${thread.id}">
        <div class="rp-thread-av">${sanitizeSmsText(thread.initials)}</div>
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

  const thread = STATE.threads.find(t => t.id === threadId);
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
  const thread = STATE.threads.find(t => t.id === threadId);
  if (!thread) return;

  // Update header
  $('#rp-hd-av').text(thread.initials);
  $('#rp-hd-name').text(thread.name);

  // Clear unread
  thread.unread = 0;
  saveState();

  // Render bubbles
  renderBubbles(threadId);
  updatePreviews();
  refreshBadges();
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
  const totalUnread = STATE.threads.reduce((sum, t) => sum + (t.unread || 0), 0);

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
    const name = prompt('请输入联系人姓名：');
    if (!name) return;

    const initials = name.slice(0, 2).toUpperCase();
    const thread = findOrCreateThread(name, name, initials);
    renderThreadList();
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
