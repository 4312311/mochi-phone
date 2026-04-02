// ================================================================
//  INITIALIZATION & EVENT BINDING
//  初始化和事件绑定模块
// ================================================================

function updateClock() {
  const now = new Date();
  const timeStr = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
  $('.rp-clock-time').text(timeStr);
  $('.rp-status-time').text(timeStr);
}

function makeDraggable() {
  const fab = $('#rp-fab');
  const phone = $('#rp-phone');
  let isDragging = false;
  let startX, startY, initialRight, initialBottom;

  fab.on('mousedown', function(e) {
    if (e.target.closest('.rp-av-photo')) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialRight = parseInt(fab.css('right')) || 20;
    initialBottom = parseInt(fab.css('bottom')) || 20;
    fab.css('cursor', 'grabbing');
    e.preventDefault();
  });

  $(document).on('mousemove', function(e) {
    if (!isDragging) return;
    const deltaX = startX - e.clientX;
    const deltaY = e.clientY - startY;
    fab.css('right', initialRight + deltaX + 'px');
    fab.css('bottom', initialBottom + deltaY + 'px');
  });

  $(document).on('mouseup', function() {
    if (isDragging) {
      isDragging = false;
      fab.css('cursor', 'grab');
    }
  });
}

function addLockNotif(type, text) {
  const container = $('.rp-lock-notifs');
  const icon = type === 'sms' ? '📱' : type === 'moments' ? '📸' : '🔔';
  container.append(`<div class="rp-lock-notif">${icon} ${text}</div>`);
}

function openCompose() {
  $('#rp-compose-modal').show();
}

function closeCompose() {
  $('#rp-compose-modal').hide();
}

function toggleAttachPanel() {
  const panel = $('#rp-attach-panel');
  panel.toggle();
}

function showHongbaoSheet() {
  $('#rp-hongbao-sheet').show();
}

function sendUserHongbao() {
  const amount = $('#rp-hongbao-amount').val();
  const note = $('#rp-hongbao-note').val();
  if (!amount || !STATE.currentThread) return;
  const th = STATE.threads[STATE.currentThread];
  if (!th) return;
  const now = new Date();
  const ts = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
  th.messages.push({
    from: 'user',
    text: `[红包] ${amount}元 - ${note}`,
    time: ts,
    type: 'hongbao',
    amount: amount,
    note: note,
  });
  if (STATE.currentView === 'thread' && STATE.currentThread === th.id) {
    renderBubbles(th.id);
  }
  updatePreviews();
  saveState();
  $('#rp-hongbao-sheet').hide();
}

function triggerImagePick() {
  const input = $('<input type="file" accept="image/*">');
  input.on('change', function() {
    const file = this.files[0];
    if (!file || !STATE.currentThread) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      const src = e.target.result;
      sendImageMessage(STATE.threads[STATE.currentThread], src, file.type);
    };
    reader.readAsDataURL(file);
  });
  input.click();
}

function sendImageMessage(thread, src, mimeType) {
  const now = new Date();
  const ts = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
  thread.messages.push({
    from: 'user',
    text: '[图片]',
    time: ts,
    type: 'image',
    img: src,
  });
  if (STATE.currentView === 'thread' && STATE.currentThread === thread.id) {
    renderBubbles(thread.id);
  }
  updatePreviews();
  saveState();
}

function showLocationInput() {
  $('#rp-location-modal').show();
}

function sendLocation() {
  const location = $('#rp-location-input').val();
  if (!location || !STATE.currentThread) return;
  const th = STATE.threads[STATE.currentThread];
  if (!th) return;
  const now = new Date();
  const ts = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
  th.messages.push({
    from: 'user',
    text: `[位置] ${location}`,
    time: ts,
    type: 'location',
    location: location,
  });
  if (STATE.currentView === 'thread' && STATE.currentThread === th.id) {
    renderBubbles(th.id);
  }
  updatePreviews();
  saveState();
  $('#rp-location-modal').hide();
}

function showDeletePicker() {
  const container = $('#rp-delete-picker');
  if (container.length > 0) {
    container.remove();
    return;
  }
  const optionsHtml = Object.values(STATE.threads).map(th => 
    `<div class="rp-delete-option" data-id="${th.id}">${th.name}</div>`
  ).join('');
  $('body').append(`
    <div id="rp-delete-picker">
      <div class="rp-delete-header">选择要删除的联系人</div>
      <div class="rp-delete-options">${optionsHtml}</div>
      <button id="rp-delete-cancel">取消</button>
    </div>
  `);
}

function showAddChoice() {
  const container = $('#rp-add-choice');
  if (container.length > 0) {
    container.remove();
    return;
  }
  $('body').append(`
    <div id="rp-add-choice">
      <div class="rp-add-choice-item" data-action="contact">添加联系人</div>
      <div class="rp-add-choice-item" data-action="group">创建群聊</div>
    </div>
  `);
}

function showGroupPicker() {
  const container = $('#rp-group-picker');
  if (container.length > 0) {
    container.remove();
    return;
  }
  const contactsHtml = Object.values(STATE.threads).map(th => 
    `<div class="rp-group-contact" data-id="${th.id}">
      <input type="checkbox" class="rp-group-check" value="${th.id}"/>
      <span>${th.name}</span>
    </div>`
  ).join('');
  $('body').append(`
    <div id="rp-group-picker">
      <div class="rp-group-header">创建群聊</div>
      <div class="rp-group-name-input">
        <input type="text" id="rp-group-name" placeholder="群聊名称"/>
      </div>
      <div class="rp-group-contacts">${contactsHtml}</div>
      <div class="rp-group-buttons">
        <button id="rp-group-cancel">取消</button>
        <button id="rp-group-create">创建</button>
      </div>
    </div>
  `);
}

function confirmCreateGroup() {
  const name = $('#rp-group-name').val().trim();
  const selectedIds = $('.rp-group-check:checked').map(function() {
    return $(this).val();
  }).get();
  if (!name || selectedIds.length === 0) return;
  const id = 'grp_' + Date.now();
  STATE.threads[id] = {
    id: id,
    name: name,
    initials: name.slice(0, 2).toUpperCase(),
    avatarBg: generateAvatarBg(),
    type: 'group',
    members: selectedIds,
    messages: [],
    unread: 0,
  };
  $('#rp-group-picker').remove();
  renderThreadList();
  saveState();
}

function incomingCall(fromRaw, time) {
  const threadId = matchThread(fromRaw);
  if (!threadId) return;
  const th = STATE.threads[threadId];
  if (!th) return;
  showBanner(th.name, '来电', time);
}

function resolveCall(result) {
  console.log('[Phone] 通话结果:', result);
}

function incomingHongbao(fromRaw, amount, note) {
  const threadId = matchThread(fromRaw);
  if (!threadId) return;
  const th = STATE.threads[threadId];
  if (!th) return;
  const now = new Date();
  const ts = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
  th.messages.push({
    from: threadId,
    text: `[红包] ${amount}元 - ${note}`,
    time: ts,
    type: 'hongbao',
    amount: amount,
    note: note,
  });
  if (STATE.currentView === 'thread' && STATE.currentThread === threadId) {
    renderBubbles(threadId);
  }
  updatePreviews();
  saveState();
  showBanner(th.name, `收到${amount}元红包`, ts);
}

function openHongbao(threadId, msgId) {
  const th = STATE.threads[threadId];
  if (!th) return;
  const msg = th.messages.find(m => m.id === msgId);
  if (!msg || msg.type !== 'hongbao') return;
  alert(`红包金额: ${msg.amount}元\n备注: ${msg.note}`);
}

function incomingVoice(fromRaw, time, duration, text) {
  const threadId = matchThread(fromRaw);
  if (!threadId) return;
  const th = STATE.threads[threadId];
  if (!th) return;
  th.messages.push({
    from: threadId,
    text: text || '[语音消息]',
    time: time,
    type: 'voice',
    duration: duration,
  });
  if (STATE.currentView === 'thread' && STATE.currentThread === threadId) {
    renderBubbles(threadId);
  }
  updatePreviews();
  saveState();
}

function playVoice(threadId, msgId) {
  const th = STATE.threads[threadId];
  if (!th) return;
  const msg = th.messages.find(m => m.id === msgId);
  if (!msg || msg.type !== 'voice') return;
  console.log('[Phone] 播放语音:', msg);
}

function incomingGroupMsg(fromRaw, groupName, time, text) {
  const groupThreadId = matchThread(groupName);
  if (!groupThreadId) return;
  incomingMsg(groupThreadId, text, time);
}

function populateAvatarSelect() {
  const select = $('#rp-avatar-select');
  select.empty();
  const allNames = new Set();
  Object.values(STATE.threads).forEach(th => {
    if (th.name) allNames.add(th.name);
  });
  STATE.moments.forEach(m => {
    if (m.name) allNames.add(m.name);
  });
  allNames.forEach(name => {
    select.append(`<option value="${name}">${name}</option>`);
  });
}

function updateAvatarPreviewSwatch(who) {
  const url = getAvatar(who);
  const preview = $('#rp-avatar-preview');
  if (url) {
    preview.html(`<img src="${url}" alt=""/>`);
  } else {
    preview.text('无头像');
  }
}

function openSettings() {
  renderSettingsView();
  go('settings');
}