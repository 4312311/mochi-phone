// ================================================================
//  CHAT & THREADS MANAGEMENT
//  聊天和联系人管理模块
// ================================================================

function autoAddCharContact() {
  try {
    const ctx = getContext();
    if (!ctx?.chatId) return;
    const charName = ctx?.name2 || (ctx?.characters && ctx?.characterId !== undefined
      ? ctx.characters[ctx.characterId]?.name : null);
    if (!charName) return;
    const invalid = /^(sillytavern|tavern|system|assistant|ai)$/i;
    if (invalid.test(charName.trim())) return;
    const exists = Object.values(STATE.threads).some(t =>
      t.name && t.name.toLowerCase() === charName.toLowerCase()
    );
    if (exists) return;
    findOrCreateThread(charName);
    renderThreadList();
    saveState();
    console.log('[Phone] 自动添加联系人:', charName);
  } catch(e) { }
}

function cleanInvalidContacts() {
  const invalid = /^(sillytavern|tavern|system|assistant|ai)$/i;
  let changed = false;
  Object.keys(STATE.threads).forEach(function(k) {
    const name = (STATE.threads[k] && STATE.threads[k].name) || '';
    if (invalid.test(name.trim())) {
      delete STATE.threads[k];
      changed = true;
      console.log('[Phone] 清理无效联系人:', name);
    }
  });
  if (changed) { renderThreadList(); saveState(); }
}

function syncToCurrentChat() {
  const ctx = getContext();
  const newChatId = ctx?.chatId || (ctx?.characterId != null ? 'char_' + ctx.characterId : 'default');
  if (newChatId === STATE.chatId) return;

  Object.assign(_AV, STATE.avatars || {});

  console.log('[Phone] syncToCurrentChat:', STATE.chatId, '->', newChatId);

  if (STATE.chatId) {
    const _oldPersisted = (() => { try { return JSON.parse(localStorage.getItem(`rp-phone-v1-${STATE.chatId}`) || 'null'); } catch(e) { return null; } })();
    const _safeArr = (memArr, persArr) => {
      const m = memArr  || [];
      const p = persArr || [];
      return p.length > m.length ? p : m;
    };
    const _safeMoments = _safeArr(STATE.moments, _oldPersisted && _oldPersisted.moments);
    const _safeDiary   = _safeArr(STATE.diary,   _oldPersisted && _oldPersisted.diary);
    CHAT_STORE[STATE.chatId] = {
      threads:       JSON.parse(JSON.stringify(STATE.threads)),
      notifications: [...STATE.notifications],
      sync:          { ...STATE.sync },
      currentThread: STATE.currentThread,
      moments:       JSON.parse(JSON.stringify(_safeMoments)),
      diary:         JSON.parse(JSON.stringify(_safeDiary)),
      avatars:       Object.assign({}, STATE.avatars || {}),
      bankData:      STATE.bankData ? JSON.parse(JSON.stringify(STATE.bankData)) : null,
    };
    const _tmpM = STATE.moments, _tmpD = STATE.diary;
    STATE.moments = _safeMoments; STATE.diary = _safeDiary;
    saveState();
    STATE.moments = _tmpM; STATE.diary = _tmpD;
  }

  STATE.chatId = newChatId;
  STATE.pendingMessages = [];

  if (CHAT_STORE[newChatId]) {
    const s = CHAT_STORE[newChatId];
    STATE.threads       = s.threads || {};
    STATE.notifications = s.notifications || [];
    STATE.sync          = Object.assign({}, s.sync);
    STATE.moments       = JSON.parse(JSON.stringify(s.moments || []));
    STATE.diary         = JSON.parse(JSON.stringify(s.diary   || []));
    STATE.avatars       = Object.assign({}, s.avatars || {});
    STATE.currentThread = s.currentThread || null;
    STATE.bankData      = s.bankData ? JSON.parse(JSON.stringify(s.bankData)) : null;
  } else {
    const persisted = loadState(newChatId);
    if (persisted) {
      STATE.threads       = persisted.threads || {};
      STATE.notifications = persisted.notifications || [];
      STATE.sync          = persisted.sync || { stage: 1, progress: 0, status: '乖巧' };
      STATE.moments       = persisted.moments || [];
      STATE.diary         = persisted.diary   || [];
      STATE.avatars       = persisted.avatars || {};
      STATE.bankData      = persisted.bankData || null;
    } else {
      STATE.threads       = {};
      STATE.notifications = [];
      STATE.sync          = { stage: 1, progress: 0, status: '乖巧' };
      STATE.moments       = [];
      STATE.diary         = [];
      STATE.avatars       = {};
      STATE.bankData      = null;
    }
    STATE.currentThread = null;
  }
  mergeGlobalAvatars();

  cleanInvalidContacts();
  autoAddCharContact();
  go('lock');
  renderThreadList();
  refreshBadges();
  refreshWidget();
  refreshLockNotifs();
}

function onChatChanged() {
  const ctx = getContext();
  const newChatId = ctx?.chatId || (ctx?.characterId != null ? `char_${ctx?.characterId}` : 'default');

  if (newChatId === STATE.chatId) return;

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

  STATE.chatId = newChatId;
  STATE.pendingMessages = [];

  if (CHAT_STORE[newChatId]) {
    const s = CHAT_STORE[newChatId];
    STATE.threads = s.threads || {};
    STATE.notifications = s.notifications;
    STATE.sync = { ...s.sync };
    STATE.moments = JSON.parse(JSON.stringify(s.moments || []));
    STATE.diary   = JSON.parse(JSON.stringify(s.diary   || []));
    STATE.avatars = Object.assign({}, s.avatars || {});
    STATE.currentThread = s.currentThread;
    STATE.bankData = s.bankData ? JSON.parse(JSON.stringify(s.bankData)) : null;
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

  var _expectedChatId = STATE.chatId;
  setTimeout(function() {
    try {
      if (STATE.chatId !== _expectedChatId) return;
      cleanInvalidContacts();
      autoAddCharContact();
      hidePhoneTagsInChat();
      hideOocInUserBubbles();
      rebuildContactsFromHistory(_expectedChatId);
      setTimeout(function() {
        try { rewriteAllHistoryPhoneBlocks(); } catch(e) {}
      }, 300);
    } catch(e) { console.warn('[Phone] onChatChanged delayed error', e); }
  }, 600);
}

function rebuildContactsFromHistory(chatId) {
  try {
    const ctx = getContext();
    if (!ctx?.chat) return;
    const chat = ctx.chat;
    if (!chat || chat.length === 0) return;

    const phoneRegex = /<SMS\b[^>]*FROM\s*=\s*["']([^"']+)["'][^>]*>/gi;
    const foundNames = new Set();

    chat.forEach(function(msg) {
      if (msg.is_user) return;
      const text = msg.mes || '';
      let match;
      while ((match = phoneRegex.exec(text)) !== null) {
        const name = match[1].trim();
        if (name && name.length > 0 && name.length < 50) {
          foundNames.add(name);
        }
      }
    });

    foundNames.forEach(function(name) {
      const invalid = /^(sillytavern|tavern|system|assistant|ai|user)$/i;
      if (invalid.test(name.trim())) return;
      const exists = Object.values(STATE.threads).some(t =>
        t.name && t.name.toLowerCase() === name.toLowerCase()
      );
      if (!exists) {
        findOrCreateThread(name);
        console.log('[Phone] 从历史消息重建联系人:', name);
      }
    });

    if (foundNames.size > 0) {
      renderThreadList();
      saveState();
    }
  } catch(e) {
    console.warn('[Phone] rebuildContactsFromHistory error:', e);
  }
}

function findOrCreateThread(nameRaw) {
  const name = String(nameRaw || '').trim();
  if (!name) return null;

  const existing = Object.values(STATE.threads).find(t =>
    t.name && t.name.toLowerCase() === name.toLowerCase()
  );
  if (existing) return existing.id;

  const id = 'thread_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  const initials = name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase() || name.slice(0, 2).toUpperCase();

  STATE.threads[id] = {
    id: id,
    name: name,
    initials: initials,
    avatarBg: generateAvatarBg(),
    messages: [],
    unread: 0
  };

  return id;
}

function matchThread(fromRaw) {
  const lower = fromRaw.toLowerCase();

  for (const th of Object.values(STATE.threads)) {
    if (th.name.toLowerCase() === lower) return th.id;
  }

  for (const th of Object.values(STATE.threads)) {
    const thName = th.name.toLowerCase();
    if (lower.includes(thName) || thName.includes(lower)) return th.id;
  }

  return null;
}

function generateAvatarBg() {
  const colors = [
    ['#2e1c1c','#4e2c2c'],
    ['#1c2e2e','#2c4e4e'],
    ['#2e2e1c','#4e4e2c'],
    ['#1c1c2e','#2c2c4e'],
    ['#2e1c2e','#4e2c4e'],
    ['#1c2e1c','#2c4a2c'],
    ['#2e251c','#4e3c2c'],
    ['#1c252e','#2c3c4e'],
  ];
  const pair = colors[Math.floor(Math.random() * colors.length)];
  return `linear-gradient(145deg,${pair[0]},${pair[1]})`;
}

function addContact() {
  const name = $('#rp-add-name').val().trim();
  let initials = $('#rp-add-initials').val().trim().toUpperCase();

  if (!name) return;

  if (!initials) {
    initials = name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }
  if (!initials) initials = name.slice(0, 2).toUpperCase();

  const id = 'custom_' + Date.now();

  STATE.threads[id] = {
    id: id,
    name: name,
    initials: initials,
    avatarBg: generateAvatarBg(),
    messages: [],
    unread: 0
  };

  $('#rp-add-modal').hide();
  renderThreadList();
  saveState();

  console.log(`[Raymond Phone] 添加联系人: ${name} (${id})`);
}

function renderThreadList() {
  const container = $('#rp-thread-list').empty();

  Object.values(STATE.threads).forEach(th => {
    const lastMsg = th.messages.at(-1);
    const senderLabel = lastMsg ? (lastMsg.from === 'user' ? '我' : th.name.split(' ')[0]) : '';
    const previewFull = lastMsg ? (senderLabel + ':' + lastMsg.text) : '暂无消息';
    const preview = previewFull.length > 28 ? previewFull.slice(0, 27) + '...' : previewFull;
    const time    = lastMsg ? lastMsg.time : '';
    const badgeDisplay = th.unread > 0 ? '' : 'display:none';
    const badgeCount   = th.unread;

    container.append(`
      <div class="rp-thread" data-thread="${th.id}">
        ${(()=>{const ci=STATE.avatars&&STATE.avatars[th.name];return ci?`<div class="rp-av rp-av-img"><img class="rp-av-photo" src="${ci}" alt=""/></div>`:`<div class="rp-av" style="background:${th.avatarBg}">${th.initials}</div>`;})()}
        <div class="rp-ti">
          <div class="rp-tn">${th.name}</div>
          <div class="rp-tp" id="rp-tp-${th.id}">${preview}</div>
        </div>
        <div class="rp-tm">
          <div class="rp-tt" id="rp-tt-${th.id}">${time}</div>
          <div class="rp-tbadge" id="rp-tbadge-${th.id}" style="${badgeDisplay}">${badgeCount}</div>
        </div>
      </div>
    `);
  });
}

function openThread(threadId) {
  STATE.currentThread = threadId;
  const th = STATE.threads[threadId];
  if (!th) return;

  th.unread = 0;
  refreshBadges();

  const _hdImg = getAvatar(th.name);
  if (_hdImg) {
    $('#rp-hd-av').empty().append(`<img class="rp-av-photo" src="${_hdImg}" alt=""/>`).css('background', 'transparent');
  } else {
    $('#rp-hd-av').empty().text(th.initials).css('background', th.avatarBg);
  }
  $('#rp-hd-name').text(th.name);

  renderBubbles(threadId);
  go('thread');
}