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
  },
  chatId: null
};

// Chat store for caching different chat states
const CHAT_STORE = {};

// Get current character ID
function getCurrentCharacterId() {
  try {
    if (window.SillyTavern && window.SillyTavern.getContext) {
      const context = window.SillyTavern.getContext();
      return context?.chatId || (context?.characterId != null ? `char_${context.characterId}` : 'default');
    }
  } catch(e) {
    console.error('[Messages] Failed to get current character:', e);
  }
  return 'default';
}

// Get state key for current character
function getStateKey() {
  return `rp_state_${getCurrentCharacterId()}`;
}

// Load state from localStorage
function loadState() {
  try {
    const saved = localStorage.getItem(getStateKey());
    if (saved) {
      STATE = JSON.parse(saved);
    } else {
      // Initialize empty state for new character
      STATE = {
        threads: {},
        avatars: {},
        settings: {
          userAvatar: '',
          userName: '我'
        }
      };
    }
  } catch(e) {
    console.error('[Messages] Failed to load state:', e);
    // Initialize empty state on error
    STATE = {
      threads: {},
      avatars: {},
      settings: {
        userAvatar: '',
        userName: '我'
      }
    };
  }
}

// Save state to localStorage
function saveState() {
  try {
    localStorage.setItem(getStateKey(), JSON.stringify(STATE));
  } catch(e) {
    console.error('[Messages] Failed to save state:', e);
  }
}

// Get state
function getSTATE() {
  return STATE;
}

// Sync to current chat
function syncToCurrentChat() {
  const ctx = getContext();
  const newChatId = ctx?.chatId || (ctx?.characterId != null ? `char_${ctx.characterId}` : 'default');
  if (newChatId === STATE.chatId) return; // 已一致,跳过

  console.log('[Messages] syncToCurrentChat:', STATE.chatId, '->', newChatId);

  // 保存旧窗口状态
  if (STATE.chatId) {
    CHAT_STORE[STATE.chatId] = {
      threads: JSON.parse(JSON.stringify(STATE.threads)),
      avatars: Object.assign({}, STATE.avatars || {}),
      settings: Object.assign({}, STATE.settings || {})
    };
    saveState();
  }

  // 切到新窗口
  STATE.chatId = newChatId;

  if (CHAT_STORE[newChatId]) {
    const s = CHAT_STORE[newChatId];
    STATE.threads = s.threads || {};
    STATE.avatars = Object.assign({}, s.avatars || {});
    STATE.settings = Object.assign({}, s.settings || {});
  } else {
    loadState();
  }

  renderThreadList();
}

// Get context
function getContext() {
  if (window.SillyTavern && window.SillyTavern.getContext) {
    return window.SillyTavern.getContext();
  }
  return null;
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
function sendSMS() {
  // 先把输入框当前内容并入队列
  const currentText = $('#rp-input').val().trim();
  if (currentText) {
    if (!STATE.pendingMessages) STATE.pendingMessages = [];
    STATE.pendingMessages.push(currentText);
    $('#rp-input').val('');
  }

  if (!STATE.currentThreadId || !STATE.pendingMessages || STATE.pendingMessages.length === 0) return;

  const th = STATE.threads[STATE.currentThreadId];
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  // 写入手机 UI(全部排队消息)
  const allMessages = [...STATE.pendingMessages];
  STATE.pendingMessages = [];
  renderPendingQueue();

  allMessages.forEach(text => {
    th.messages.push({ from: 'user', text, time: ts });
  });
  renderBubbles(STATE.currentThreadId);
  updatePreviews();
  saveState();

  const ta = document.querySelector('#send_textarea');
  if (!ta) return;

  const mainText = ta.value.trim();

  // 拼装可见行动描述
  let smsLine;
  if (allMessages.length === 1) {
    smsLine = `*{{user}}拿起手机,给${th.name}发了一条短信:「${allMessages[0]}」*`;
  } else {
    const msgList = allMessages.map(m => `「${m}」`).join('、');
    smsLine = `*{{user}}拿起手机,给${th.name}连续发了${allMessages.length}条短信:${msgList}*`;
  }

  // 获取当前上下文
  function getContext() {
    if (window.SillyTavern && window.SillyTavern.getContext) {
      return window.SillyTavern.getContext();
    }
    return null;
  }

  // 判断联系人是否为主角,生成不同的 OOC 指令
  const ctx = getContext();
  const mainCharName = ctx?.name2 || '';
  const isGroupThread = th.type === 'group' || th.id.startsWith('grp_');

  // 收集当前对话中存在的 NPC 名称(排除主角和 user、排除群组),用于朋友圈提示
  const allContactNames = Object.values(STATE.threads || {})
    .filter(t => t.type !== 'group' && t.id !== 'user')
    .map(t => t.name)
    .filter(Boolean);
  // 随机选最多2个角色发朋友圈(每次发SMS都可能触发,概率50%)
  const shouldTriggerMoment = Math.random() < 0.5;
  const momentNPCs = allContactNames
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  let oocText;

  if (isGroupThread) {
    const groupName = th.name;
    const memberNames = (th.members || [])
      .map(id => STATE.threads[id]?.name || id)
      .filter(Boolean);
    const momentHint = (shouldTriggerMoment && momentNPCs.length > 0)
      ? `同时,在PHONE块里为角色「${momentNPCs.join('、')}」各追加1条朋友圈动态,格式:<MOMENTS FROM="角色名" TIME="${ts}">内容</MOMENTS>;`
      : '';
    oocText = `[手机群聊提示:{{user}}在群聊「${groupName}」发了消息,当前时间${ts}。请按世界书手机UI协议输出,并严格满足:仅在<PHONE>...</PHONE>内输出手机内容;至少一条<GMSG FROM="角色名" GROUP="${groupName}" TIME="${ts}">内容</GMSG>。${momentHint}]`;
  } else {
    let isMainChar;
    if (mainCharName) {
      isMainChar = th.name.toLowerCase().includes(mainCharName.toLowerCase()) ||
        mainCharName.toLowerCase().includes(th.name.toLowerCase());
    } else {
      isMainChar = false;
    }

    const momentCharList = shouldTriggerMoment
      ? (momentNPCs.length > 0 ? momentNPCs.join('、') : th.name)
      : null;
    const momentHint = momentCharList
      ? `另外,在同一个PHONE块里,为角色「${momentCharList}」追加1条朋友圈动态,格式:<MOMENTS FROM="角色名" TIME="${ts}">内容</MOMENTS>;`
      : '';

    if (isMainChar) {
      oocText = `[手机短信提示:${th.name}收到{{user}}的短信,当前时间${ts}。按世界书手机UI协议输出,且必须满足:仅在<PHONE>...</PHONE>内输出手机内容;至少一条<SMS FROM="${th.name}" TIME="${ts}">回复内容</SMS>,SMS内容必须是${th.name}自己说的话,绝对不能复制或重复{{user}}刚才说的内容。${momentHint}]`;
    } else {
      const charName = mainCharName || '主角';
      oocText = `[叙事指令:{{user}}私下给NPC"${th.name}"发了手机短信(时间${ts})。${charName}完全不知情,本轮不得提及此短信。请按世界书手机UI协议输出,并严格满足:仅在<PHONE>...</PHONE>内输出手机内容;至少一条<SMS FROM="${th.name}" TIME="${ts}">回复内容</SMS>,SMS内容必须是${th.name}自己说的话,绝对不能复制或重复{{user}}刚才说的内容。${momentHint}]`;
    }
  }

  // 用 setExtensionPrompt 注入隐藏 OOC,不在聊天框显示
  const hasExtPrompt = typeof setExtensionPrompt === 'function' && extension_prompt_types;
  console.log('[Raymond Phone] sendSMS triggered', {
    threadId: STATE.currentThreadId,
    threadType: th.type,
    isGroupThread,
    hasExtPrompt,
    oocText,
    smsLine,
    mainText
  });

  if (hasExtPrompt) {
    setExtensionPrompt(extension_prompt_types.SYSTEM, oocText);
  } else {
    ta.value = `${mainText}\n${smsLine}\n${oocText}`;
  }

  // 自动提交
  const sendBtn = document.querySelector('#send-button');
  if (sendBtn) {
    sendBtn.click();
  }
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

// Render bubbles
function renderBubbles(threadId) {
  const area = $('#rp-bubbles').empty();
  const thread = STATE.threads[threadId];
  if (!thread) return;

  // DEL_SVG 提前定义，供 pending_image / image 等早期气泡使用
  const DEL_SVG_EARLY = `<svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;pointer-events:none"><path d="M3 3.5L3.7 11.5C3.75 12.05 4.2 12.5 4.75 12.5H9.25C9.8 12.5 10.25 12.05 10.3 11.5L11 3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M2 3.5H12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M5.5 3.5V2.5C5.5 2.22 5.72 2 6 2H8C8.28 2 8.5 2.22 8.5 2.5V3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><line x1="7" y1="6" x2="7" y2="10.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><line x1="5.5" y1="6.2" x2="5.8" y2="10.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><line x1="8.5" y1="6.2" x2="8.2" y2="10.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>`;

  thread.messages.forEach((msg, msgIdx) => {
    // ── 通话记录 ──
    if (msg.type === 'call_rec') {
      const icon = msg.result === 'answered' ? '📞' : '📵';
      const cls  = msg.result === 'missed' ? 'rp-call-rec missed' : 'rp-call-rec';
      area.append(`<div class="rp-sys-msg"><div class="${cls}">${icon} ${msg.label} · ${msg.time}</div></div>`);
      return;
    }
    // ── 红包 ──
    if (msg.type === 'hongbao') {
      const openedHtml = msg.opened
        ? `<div class="rp-hb-amount"><small>¥</small>${escHtml(msg.amount)}</div>` : '';
      const wrap = $(`<div class="rp-bwrap rp-in"></div>`);
      const onclick = msg.opened ? '' : `openHongbao('${threadId}','${msg.id}')`;
      wrap.html(`
        <div class="rp-hongbao ${msg.opened?'opened':''}" ${onclick?`onclick="${onclick}"`:''}>
          <div class="rp-hb-top">
            <div class="rp-hb-ico">🧧</div>
            <div class="rp-hb-info">
              <div class="rp-hb-from">${escHtml(msg.name)}</div>
              <div class="rp-hb-note">${escHtml(msg.note||'恭喜发财')}</div>
            </div>
          </div>
          <div class="rp-hb-bot">
            <div class="rp-hb-action">${msg.opened?'已领取':'点击领取红包'}</div>
            ${openedHtml}
            <div class="rp-hb-tag">微信红包</div>
          </div>
        </div>
        <div class="rp-bts">${msg.time}</div>
      `);
      area.append(wrap); return;
    }
    // ── 语音消息 ──
    if (msg.type === 'voice') {
      const playedCls = msg.played ? 'played' : '';
      const heights = [35,70,55,90,45,65,30];
      const bars = heights.map(h => `<div class="rp-wb" style="height:${h}%"></div>`).join('');
      const wrap = $(`<div class="rp-bwrap rp-in"></div>`);
      wrap.html(`
        <div class="rp-voice-wrap">
          <div class="rp-voice-bbl ${playedCls}" onclick="playVoice('${threadId}','${msg.id}')">
            <div class="rp-voice-play">${msg.played?'✓':'▶'}</div>
            <div class="rp-wave">${bars}</div>
            <div class="rp-voice-dur">${escHtml(msg.duration)}</div>
          </div>
          <div class="rp-voice-txt">${msg.played?escHtml(msg.text):''}</div>
        </div>
        <div class="rp-bts">${msg.time}</div>
      `);
      const delBtn = $(`<button class="rp-del-btn" title="删除" data-msgidx="${msgIdx}" data-threadid="${threadId}">${DEL_SVG_EARLY}</button>`);
      wrap.append(delBtn);
      area.append(wrap); return;
    }
    // ── 群聊消息 (NPC/char 发送，带编辑/删除按钮) ──
    if (msg.type === 'group_msg') {
      const customImg = STATE.avatars && STATE.avatars[msg.name];
      const avEl = customImg
        ? $(`<div class="rp-grp-av rp-av-img"><img class="rp-av-photo" src="${customImg}" alt=""/></div>`)
        : $(`<div class="rp-grp-av" style="background:${msg.avatarBg}">${msg.initials}</div>`);
      const wrap = $('<div class="rp-bwrap rp-in rp-grp"></div>');
      const inner = $('<div>');
      inner.append($('<div>').addClass('rp-grp-sender').text(msg.name));
      inner.append($('<div>').addClass('rp-bubble rp-recv').text(msg.text));
      // 横排按钮组（编辑 + 删除）
      const DEL_SVG_GM = `<svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;pointer-events:none"><path d="M3 3.5L3.7 11.5C3.75 12.05 4.2 12.5 4.75 12.5H9.25C9.8 12.5 10.25 12.05 10.3 11.5L11 3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M2 3.5H12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M5.5 3.5V2.5C5.5 2.22 5.72 2 6 2H8C8.28 2 8.5 2.22 8.5 2.5V3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><line x1="7" y1="6" x2="7" y2="10.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><line x1="5.5" y1="6.2" x2="5.8" y2="10.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><line x1="8.5" y1="6.2" x2="8.2" y2="10.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>`;
      const editBtnGM = $(`<button class="rp-edit-btn" title="编辑" data-msgidx="${msgIdx}" data-threadid="${threadId}"><svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;pointer-events:none"><rect x="3.5" y="1.2" width="4" height="9.5" rx="0.8" transform="rotate(38 7 7)" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M9.8 2.5 L11.4 4.1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M3.2 9.8 L2.5 11.6 L4.3 10.9" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" opacity="0.7"/></svg></button>`);
      const delBtnGM = $(`<button class="rp-del-btn" title="删除" data-msgidx="${msgIdx}" data-threadid="${threadId}">${DEL_SVG_GM}</button>`);
      const btnRowGM = $('<div>').addClass('rp-btn-row');
      btnRowGM.append(editBtnGM, delBtnGM);
      inner.append(btnRowGM);
      inner.append($('<div>').addClass('rp-bts').text(msg.time));
      wrap.append(avEl, inner);
      area.append(wrap); return;
    }
    // ── 群聊语音消息 (group_voice) ──
    if (msg.type === 'group_voice') {
      const customImg = STATE.avatars && STATE.avatars[msg.name];
      const avEl = customImg
        ? $(`<div class="rp-grp-av rp-av-img"><img class="rp-av-photo" src="${customImg}" alt=""/></div>`)
        : $(`<div class="rp-grp-av" style="background:${msg.avatarBg}">${msg.initials}</div>`);
      const wrap = $('<div class="rp-bwrap rp-in rp-grp"></div>');
      const inner = $('<div>');
      inner.append($('<div>').addClass('rp-grp-sender').text(msg.name));
      const heights = [35,70,55,90,45,65,30];
      const bars = heights.map(h => `<div class="rp-wb" style="height:${h}%"></div>`).join('');
      // 群聊语音默认已"播放"（直接展示文字，不需要点击）
      inner.append($(`
        <div class="rp-voice-wrap">
          <div class="rp-voice-bbl played">
            <div class="rp-voice-play">✓</div>
            <div class="rp-wave">${bars}</div>
            <div class="rp-voice-dur">${escHtml(msg.duration)}</div>
          </div>
          <div class="rp-voice-txt">${escHtml(msg.text)}</div>
        </div>
      `));
      inner.append($('<div>').addClass('rp-bts').text(msg.time));
      wrap.append(avEl, inner);
      area.append(wrap); return;
    }
    // ── 普通文本消息 ──
    const isUser = msg.from === 'user';
    const wrap = $(`<div class="rp-bwrap ${isUser ? 'rp-out' : 'rp-in'}"></div>`);
    const bubble = $(`<div class="rp-bubble ${isUser ? 'rp-sent' : 'rp-recv'}">${escHtml(msg.text)}</div>`);
    const time = $(`<div class="rp-bts">${msg.time}</div>`);
    wrap.append(bubble, time);
    area.append(wrap);
  });

  // Scroll to bottom
  area.scrollTop(area[0].scrollHeight);
}

// Open thread
function openThread(threadId) {
  STATE.currentThreadId = threadId;
  const th = STATE.threads[threadId];
  if (!th) return;

  th.unread = 0;
  refreshBadges();

  // Get avatar
  function getAvatar(name) {
    if (STATE.avatars && STATE.avatars[name]) {
      return STATE.avatars[name];
    }
    return null;
  }

  const _hdImg = getAvatar(th.name);
  if (_hdImg) {
    $('#rp-hd-av').empty().append(`<img class="rp-av-photo" src="${_hdImg}" alt=""/>`).css('background', 'transparent');
  } else {
    $('#rp-hd-av').empty().text(th.initials).css('background', th.avatarBg);
  }
  $('#rp-hd-name').text(th.name);

  // 切换对话时清空待发队列
  STATE.pendingMessages = [];
  renderPendingQueue();

  renderBubbles(threadId);
  updatePreviews();
  saveState();
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
  
  // 延迟加载状态，确保SillyTavern的上下文已经加载完成
  setTimeout(() => {
    const characterId = getCurrentCharacterId();
    console.log('[Messages] Loading state for character:', characterId);
    loadState();
    renderThreadList();
  }, 1000);

  // Bind thread item click
  $(document).on('click', '.rp-thread', function() {
    const threadId = $(this).data('thread');
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

    const currentThreadId = getSTATE().currentThreadId;
    const currentThread = STATE.threads[currentThreadId];
    if (currentThread) {
      sendSMS(currentThreadId, text);
      $input.val('');
    }
  });

  // Bind input enter key
  $(document).on('keypress', '#rp-input', function(e) {
    if (e.which === 13) {
      const $input = $(this);
      const text = $input.val().trim();
      if (!text) return;

      const currentThreadId = getSTATE().currentThreadId;
      const currentThread = STATE.threads[currentThreadId];
      if (currentThread) {
        sendSMS(currentThreadId, text);
        $input.val('');
      }
    }
  });

  // Bind add button
  $(document).on('click', '#rp-add-btn', function() {
    // Check if we have a current character
    const characterId = getCurrentCharacterId();
    if (characterId === 'default') {
      alert('请先打开一个对话，然后再添加联系人。');
      return;
    }
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

    // 检查是否有当前字符ID（不是默认值）
    const characterId = getCurrentCharacterId();
    if (characterId === 'default') {
      alert('请先打开一个对话，然后再添加联系人');
      return;
    }

    const threadId = name;
    const colorIdx = Object.keys(STATE.threads).length % GROUP_COLORS.length;
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