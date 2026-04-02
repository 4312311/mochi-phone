// ================================================================
//  SMS MODULE - 短信模块
// ================================================================

// 获取全局STATE（从主入口）
function getSTATE() {
  return window.STATE || { threads: {}, currentThread: null, pendingMessages: [] };
}

// 保存状态（调用主入口的saveState）
function saveState() {
  if (window.saveState) {
    window.saveState();
  }
}

// 路由导航（调用主入口的navigateTo）
function navigateTo(page) {
  if (window.navigateTo) {
    window.navigateTo(page);
  }
}

// 获取上下文
function getContext() {
  return window.getContext ? getContext() : (window.SillyTavern && window.SillyTavern.getContext ? window.SillyTavern.getContext() : null);
}

// 获取标签属性
function getTagAttrs(str) {
  const attrs = {};
  if (!str) return attrs;
  str.replace(/(\w+)=["']([^"']*)["']/g, (_, k, v) => { attrs[k] = v; });
  return attrs;
}

// 群聊颜色配置
const GROUP_COLORS = ['#7c3aed','#0891b2','#0d9488','#b45309','#be185d','#1d4ed8'];

// 查找或创建线程
function findOrCreateThread(nameRaw) {
  const STATE = getSTATE();
  const lower = nameRaw.toLowerCase();
  // 优先匹配 id
  let thread = Object.values(STATE.threads).find(t => t.id?.toLowerCase() === lower || t.name?.toLowerCase() === lower);
  if (thread) return thread;

  // 生成新线程ID
  const newId = lower.replace(/\s+/g, '_');
  thread = {
    id: newId,
    name: nameRaw,
    initials: nameRaw.slice(0, 2),
    avatarBg: `linear-gradient(145deg,${GROUP_COLORS[Object.keys(STATE.threads).length % GROUP_COLORS.length]},${GROUP_COLORS[(Object.keys(STATE.threads).length + 1) % GROUP_COLORS.length]})`,
    type: 'sms',
    messages: [],
    unread: 0
  };
  STATE.threads[newId] = thread;
  saveState();
  return thread;
}

// 显示通知横幅
function showBanner(from, text) {
  const STATE = getSTATE();
  // 短时去重:同 from+text 在 3s 内不重复弹出
  const key = `${from}:${text}`;
  const now = Date.now();
  if (STATE._lastBanner === key && (now - (STATE._lastBannerTime || 0)) < 3000) {
    return;
  }
  STATE._lastBanner = key;
  STATE._lastBannerTime = now;

  const banner = $(`<div class="rp-banner"><div class="rp-banner-inner"><span class="rp-banner-from">${escHtml(from)}</span><span class="rp-banner-text">${escHtml(text)}</span></div></div>`);
  $('#rp-screen').append(banner);
  setTimeout(() => {
    banner.addClass('show');
    setTimeout(() => {
      banner.removeClass('show');
      setTimeout(() => banner.remove(), 300);
    }, 2000);
  }, 50);
}

// 更新徽章计数
function refreshBadges() {
  const STATE = getSTATE();
  let total = 0;
  Object.values(STATE.threads).forEach(th => {
    total += th.unread || 0;
  });
  const badge = $('#rp-main-badge');
  if (total > 0) {
    badge.text(total).show();
  } else {
    badge.hide();
  }
}

// 初始化短信模块
function initSMS() {
  console.log('[Raymond Phone] SMS Module initialized');
  renderThreadList();
}

// 渲染线程列表
function renderThreadList() {
  const container = $('#rp-messages');
  if (!container.length) return;

  const threads = getSTATE().threads || {};
  
  let html = `
    <div class="rp-page-header">
      <button class="rp-back-btn">◀</button>
      <span class="rp-page-title">信息</span>
    </div>
    <div id="rp-thread-list-inner">
  `;
  
  Object.values(threads).forEach(th => {
    const last = th.messages.at(-1);
    const preview = last ? (last.from === 'user' ? '我:' : th.name + ':') + last.text : '';
    const time = last ? last.time : '';
    
    html += `
      <div class="rp-thread-item" data-thread-id="${th.id}">
        <div class="rp-thread-avatar">${th.name.slice(0, 2)}</div>
        <div class="rp-thread-info">
          <div class="rp-thread-name">${th.name}</div>
          <div class="rp-thread-preview" id="rp-tp-${th.id}">${preview}</div>
        </div>
        <div class="rp-thread-time" id="rp-tt-${th.id}">${time}</div>
      </div>
    `;
  });
  
  html += '</div>';
  
  // 添加聊天视图（隐藏状态）
  html += `
    <div id="rp-chat-view" style="display:none">
      <div class="rp-chat-header">
        <button class="rp-chat-back">◀</button>
        <span class="rp-chat-title"></span>
        <button class="rp-attach-btn" title="附件">+</button>
      </div>
      <div id="rp-bubbles"></div>
      <div id="rp-pending-queue"></div>
      <div id="rp-attach-panel" style="display:none"></div>
      <div class="rp-input-area">
        <input type="text" id="rp-input" placeholder="输入消息...">
        <button id="rp-send-btn">发送</button>
      </div>
    </div>
  `;
  
  container.html(html);
  
  // 绑定线程点击事件
  container.find('.rp-thread-item').on('click', function() {
    const threadId = $(this).data('thread-id');
    openThread(threadId);
  });
  
  // 绑定返回按钮事件
  container.find('.rp-back-btn').on('click', function() {
    navigateTo('home');
  });

  // 绑定聊天返回按钮
  container.find('.rp-chat-back').on('click', function() {
    $('#rp-chat-view').hide();
    $('#rp-thread-list-inner').show();
  });

  // 绑定附件按钮
  container.find('.rp-attach-btn').on('click', function() {
    toggleAttachPanel();
  });

  // 绑定发送按钮
  container.find('#rp-send-btn').on('click', sendSMS);

  // 绑定回车发送
  container.find('#rp-input').on('keypress', function(e) {
    if (e.which === 13) {
      sendSMS();
    }
  });
}

// 打开线程
function openThread(threadId) {
  const STATE = getSTATE();
  if (!STATE) return;
  STATE.currentThread = threadId;
  const thread = STATE.threads[threadId];

  if (!thread) return;

  // 切换到聊天视图
  $('#rp-thread-list-inner').hide();
  $('#rp-chat-view').show();
  $('.rp-chat-title').text(thread.name);

  // 渲染气泡
  renderBubbles(threadId);
  renderPendingQueue();
}

// 更新预览
function updatePreviews() {
  const STATE = getSTATE();
  if (!STATE) return;

  Object.values(STATE.threads).forEach(th => {
    const last = th.messages.at(-1);
    if (!last) return;
    const sl = last.from === 'user' ? '我' : th.name.split(' ')[0];
    const pf = sl + ':' + last.text;
    $(`#rp-tp-${th.id}`).text(pf.length > 28 ? pf.slice(0, 27) + '...' : pf);
    $(`#rp-tt-${th.id}`).text(last.time);
  });
}

// 渲染待发送队列
function renderPendingQueue() {
  const container = $('#rp-pending-queue');
  if (!container.length) return;

  container.empty();
  const STATE = getSTATE();
  if (!STATE || STATE.pendingMessages.length === 0) {
    container.hide();
    return;
  }
  container.show();
  STATE.pendingMessages.forEach((msg) => {
    const short = msg.length > 30 ? msg.slice(0, 30) + '...' : msg;
    container.append(`<div class="rp-pending-item">${short}</div>`);
  });
}

// 渲染消息气泡
function renderBubbles(threadId) {
  const area = $('#rp-bubbles');
  if (!area.length) return;

  const STATE = getSTATE();
  if (!STATE) return;
  const thread = STATE.threads[threadId];
  if (!thread) return;

  area.empty();

  const DEL_SVG = `<svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;pointer-events:none"><path d="M3 3.5L3.7 11.5C3.75 12.05 4.2 12.5 4.75 12.5H9.25C9.8 12.5 10.25 12.05 10.3 11.5L11 3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M2 3.5H12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M5.5 3.5V2.5C5.5 2.22 5.72 2 6 2H8C8.28 2 8.5 2.22 8.5 2.5V3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><line x1="7" y1="6" x2="7" y2="10.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><line x1="5.5" y1="6.2" x2="5.8" y2="10.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><line x1="8.5" y1="6.2" x2="8.2" y2="10.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>`;

  thread.messages.forEach((msg, idx) => {
    // 通话记录
    if (msg.type === 'call_rec') {
      const icon = msg.result === 'answered' ? '📞' : '📵';
      const cls = msg.result === 'missed' ? 'rp-call-rec missed' : 'rp-call-rec';
      area.append(`<div class="rp-sys-msg"><div class="${cls}">${icon} ${msg.label} · ${msg.time}</div></div>`);
      return;
    }

    // 红包
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
      area.append(wrap);
      return;
    }

    // 语音消息
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
      const delBtn = $(`<button class="rp-del-btn" title="删除" data-msgidx="${idx}" data-threadid="${threadId}">${DEL_SVG}</button>`);
      wrap.append(delBtn);
      area.append(wrap);
      return;
    }

    // 群聊消息
    if (msg.type === 'group_msg') {
      const customImg = STATE.avatars && STATE.avatars[msg.name];
      const avEl = customImg
        ? $(`<div class="rp-grp-av rp-av-img"><img class="rp-av-photo" src="${customImg}" alt=""/></div>`)
        : $(`<div class="rp-grp-av" style="background:${msg.avatarBg}">${msg.initials}</div>`);
      const wrap = $('<div class="rp-bwrap rp-in rp-grp"></div>');
      const inner = $('<div>');
      inner.append($('<div>').addClass('rp-grp-sender').text(msg.name));
      inner.append($('<div>').addClass('rp-bubble rp-recv').text(msg.text));
      const delBtn = $(`<button class="rp-del-btn" title="删除" data-msgidx="${idx}" data-threadid="${threadId}">${DEL_SVG}</button>`);
      inner.append(delBtn);
      inner.append($('<div>').addClass('rp-bts').text(msg.time));
      wrap.append(avEl, inner);
      area.append(wrap);
      return;
    }

    // 群聊语音消息
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
      inner.append($(`
        <div class="rp-voice-wrap">
          <div class="rp-voice-bbl played">
            <div class="rp-voice-play">✓</div>
            <div class="rp-wave">${bars}</div>
            <div class="rp-voice-dur">${escHtml(msg.duration)}</div>
          </div>
          <div class="rp-voice-txt" style="display:block">${escHtml(msg.voiceText)}</div>
        </div>
      `));
      inner.append($('<div>').addClass('rp-bts').text(msg.time));
      wrap.append(avEl, inner);
      area.append(wrap);
      return;
    }

    // 群聊红包
    if (msg.type === 'group_hongbao') {
      const customImg = STATE.avatars && STATE.avatars[msg.name];
      const avEl = customImg
        ? $(`<div class="rp-grp-av rp-av-img"><img class="rp-av-photo" src="${customImg}" alt=""/></div>`)
        : $(`<div class="rp-grp-av" style="background:${msg.avatarBg}">${msg.initials}</div>`);
      const wrap = $('<div class="rp-bwrap rp-in rp-grp"></div>');
      const inner = $('<div>');
      inner.append($('<div>').addClass('rp-grp-sender').text(msg.name));
      const openedHtml = msg.opened ? `<div class="rp-hb-amount"><small>¥</small>${escHtml(msg.amount)}</div>` : '';
      inner.append($(`
        <div class="rp-hongbao ${msg.opened?'opened':''}">
          <div class="rp-hb-top">
            <div class="rp-hb-ico">🧧</div>
            <div class="rp-hb-info">
              <div class="rp-hb-from">${escHtml(msg.name)}</div>
              <div class="rp-hb-note">${escHtml(msg.note||'恭喜发财')}</div>
            </div>
          </div>
          <div class="rp-hb-bot">
            <div class="rp-hb-action">${msg.opened?'已领取':'点击领取'}</div>
            ${openedHtml}
            <div class="rp-hb-tag">群红包</div>
          </div>
        </div>
      `));
      inner.append($('<div>').addClass('rp-bts').text(msg.time));
      wrap.append(avEl, inner);
      area.append(wrap);
      return;
    }

    // 用户发送的红包
    if (msg.type === 'hongbao' && msg.from === 'user') {
      const wrap = $(`<div class="rp-bwrap rp-out"></div>`);
      wrap.html(`
        <div class="rp-hongbao opened" style="cursor:default">
          <div class="rp-hb-top">
            <div class="rp-hb-ico">🧧</div>
            <div class="rp-hb-info">
              <div class="rp-hb-from">我</div>
              <div class="rp-hb-note">${escHtml(msg.note||'恭喜发财')}</div>
            </div>
          </div>
          <div class="rp-hb-bot">
            <div class="rp-hb-action">已发送</div>
            <div class="rp-hb-amount"><small>¥</small>${escHtml(msg.amount)}</div>
            <div class="rp-hb-tag">微信红包</div>
          </div>
        </div>
        <div class="rp-bts">${msg.time}</div>
      `);
      area.append(wrap);
      return;
    }

    // 普通文本消息
    const isUser = msg.from === 'user';
    const isGrpThread = thread.type === 'group' || (threadId && threadId.startsWith('grp_'));

    // 清理生图触发词
    const displayText = (msg.text || '')
      .replace(/image###[\s\S]*?###/gi, '')
      .replace(/<pic\b[^>]*>[\s\S]*?<\/pic>/gi, '')
      .replace(/<pic\b[\s\S]*?\/>/gi, '')
      .trim();

    const bbl = $('<div>').addClass('rp-bubble ' + (isUser ? 'rp-sent' : 'rp-recv')).text(displayText);
    const ts = $('<div>').addClass('rp-bts').text(msg.time);

    if (isGrpThread) {
      const wrap = $('<div>').addClass('rp-bwrap ' + (isUser ? 'rp-out' : 'rp-in') + ' rp-grp');
      if (!isUser) {
        const customImg = STATE.avatars && STATE.avatars[msg.name];
        const avEl = customImg
          ? $(`<div class="rp-grp-av rp-av-img"><img class="rp-av-photo" src="${customImg}" alt=""/></div>`)
          : $(`<div class="rp-grp-av" style="background:${msg.avatarBg || '#7c3aed'}">${msg.initials || (msg.name ? msg.name[0] : 'C')}</div>`);
        wrap.append(avEl, $('<div>').append($('<div>').addClass('rp-grp-sender').text(msg.name), bbl, ts));
      } else {
        const uImg = STATE.avatars?.['user'];
        const uAvHtml = uImg
          ? `<div class="rp-grp-av rp-av-img"><img class="rp-av-photo" src="${uImg}" alt=""/></div>`
          : `<div class="rp-grp-av" style="background:linear-gradient(145deg,#64748b,#475569)">我</div>`;
        wrap.append($(uAvHtml), $('<div>').append(bbl, ts));
      }
      area.append(wrap);
    } else {
      const div = document.createElement('div');
      div.className = `rp-bubble ${isUser ? 'rp-user' : 'rp-char'}`;
      div.innerHTML = `
        <div class="rp-bubble-inner">
          <div class="rp-bubble-text">${escHtml(displayText)}</div>
          <div class="rp-bubble-time">${msg.time || ''}</div>
        </div>
        <button class="rp-bubble-del" title="删除">${DEL_SVG}</button>
      `;
      area.append(div);

      // 删除按钮事件
      div.querySelector('.rp-bubble-del').addEventListener('click', function(e) {
        e.stopPropagation();
        thread.messages.splice(idx, 1);
        saveState();
        renderBubbles(threadId);
        updatePreviews();
      });
    }
  });

  // 滚动到底部
  area.scrollTop(area.prop('scrollHeight'));
  setTimeout(function() {
    const el = area[0];
    if (el) el.scrollTop = el.scrollHeight;
  }, 80);
}

// HTML转义
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// 发送短信
function sendSMS() {
  const STATE = getSTATE();
  // FIX3: 先把输入框当前内容并入队列
  const currentText = $('#rp-input').val().trim();
  if (currentText) {
    STATE.pendingMessages.push(currentText);
    $('#rp-input').val('');
  }

  if (!STATE.currentThread || STATE.pendingMessages.length === 0) return;

  const th  = STATE.threads[STATE.currentThread];
  const now = new Date();
  const ts  = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  // 写入手机 UI(全部排队消息)
  const allMessages = [...STATE.pendingMessages];
  STATE.pendingMessages = [];
  renderPendingQueue();

  allMessages.forEach(text => {
    th.messages.push({ from: 'user', text, time: ts });
  });
  renderBubbles(STATE.currentThread);
  updatePreviews();
  saveState(); // FIX2: 持久化发出的消息

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

  // FIX4+FIX1: 判断联系人是否为主角,生成不同的 OOC 指令
  const ctx = getContext();
  const mainCharName = ctx?.name2 || '';
  const isGroupThread = th.type === 'group' || th.id.startsWith('grp_');

  // 收集当前对话中存在的 NPC 名称(排除主角和 user、排除群组),用于朋友圈提示
  const allContactNames = Object.values(getSTATE().threads || {})
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
      .map(id => getSTATE().threads[id]?.name || id)
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

  // FIX1: 用 setExtensionPrompt 注入隐藏 OOC,不在聊天框显示
  const hasExtPrompt = typeof setExtensionPrompt === 'function' && extension_prompt_types;
  console.log('[Raymond Phone] sendSMS triggered', {
    threadId: STATE.currentThread,
    threadType: th.type,
    isGroupThread,
    hasExtPrompt,
    oocText,
  });
  if (hasExtPrompt) {
    setExtensionPrompt('rp-phone-ooc', `${smsLine}\n${oocText}`, extension_prompt_types.BEFORE_PROMPT, 0, false, 0);
    console.log('[Raymond Phone] setExtensionPrompt called with BEFORE_PROMPT, depth=0');
    ta.value = mainText || '';
  } else {
    console.warn('[Raymond Phone] setExtensionPrompt not available, falling back to inline OOC');
    ta.value = mainText ? `${mainText}\n${smsLine}\n${oocText}` : `${smsLine}\n${oocText}`;
  }

  ta.dispatchEvent(new Event('input', { bubbles: true }));
  document.querySelector('#send_but')?.click();

  // 记录一次"等待手机回复"的状态:若模型未输出 <PHONE>,后续走兜底解析
  STATE._pendingPhoneReply = {
    threadId: STATE.currentThread,
    fromName: th.name,
    sentAt: Date.now(),
  };

  // 发送后清除隐藏提示
  if (hasExtPrompt) {
    setTimeout(() => setExtensionPrompt('rp-phone-ooc', ''), 300);
  }

  // 无论走哪条路径,发送后都从用户气泡 DOM 里抹掉 OOC 方括号提示
  setTimeout(function() {
    try {
      const allUserMsgs = document.querySelectorAll('.mes[is_user="true"]');
      if (!allUserMsgs.length) return;
      const lastUserMsg = allUserMsgs[allUserMsgs.length - 1];
      const textEl = lastUserMsg && lastUserMsg.querySelector('.mes_text');
      if (!textEl) return;
      let html = textEl.innerHTML || '';
      html = html.replace(/\[(?:手机短信提示|叙事指令|手机群聊提示)[^\]]*\]/g, '');
      html = html
        .replace(/(?:<br\s*\/?>[\s]*){2,}/gi, '<br>')
        .replace(/^\s*(?:<br\s*\/?>\s*)+/i, '')
        .replace(/(?:<br\s*\/?>\s*)+$/i, '')
        .trim();
      textEl.innerHTML = html;
    } catch(e) {
      console.warn('[Raymond Phone] OOC DOM cleanup failed:', e);
    }
  }, 400);
}

// 清理短信文本
function sanitizeSmsText(text) {
  let t = String(text || '').trim();
  if (!t) return '';

  const lines = t.split(/\n+/).map(s => s.trim()).filter(Boolean);
  if (!lines.length) return '';

  const dateHead = /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}\s+\d{1,2}(?::\d{0,2})?\s*$/;
  if (lines.length > 1 && dateHead.test(lines[0])) {
    lines.shift();
  }

  t = lines.join('\n').trim();

  if (dateHead.test(t)) return '';

  return t;
}

// 从PHONE块提取短信摘要
function extractSmsSummaries(block) {
  const out = [];
  if (!block) return out;
  const smsTagRe = /<SMS\b([^>]*)>([\s\S]*?)<\/SMS>/gi;
  let m;
  while ((m = smsTagRe.exec(block)) !== null) {
    const attrs = getTagAttrs(m[1]);
    const from  = (attrs.FROM || '').trim();
    const text  = sanitizeSmsText(m[2] || '');
    if (!text) continue;
    out.push({ from, text });
  }
  return out;
}

// 美化聊天中的短信显示
function beautifySMSInChat() {
  try {
    hidePhoneTagsInChat();

    const ctx = getContext();
    if (!ctx?.name) return;
    const charName = ctx.name;
    const allMsgs = document.querySelectorAll('.mes:not([is_user="true"])');
    if (!allMsgs.length) return;
    const lastMsg = allMsgs[allMsgs.length - 1];
    const textEl  = lastMsg?.querySelector('.mes_text');
    if (!textEl || textEl.dataset.rpDone) return;
    textEl.dataset.rpDone = '1';

    const STATE = getSTATE();
    const thread   = Object.values(STATE.threads).find(t => t.name === charName);
    const avatarBg = thread?.avatarBg || 'linear-gradient(145deg,#555,#333)';
    const initials = charName.slice(0, 2);
    const customImg = STATE.avatars?.[charName];
    const avHtml = customImg
      ? `<div class="rp-cb-av"><img src="${customImg}" alt=""/></div>`
      : `<div class="rp-cb-av" style="background:${avatarBg}">${initials}</div>`;
    const mkBubble = (text) => {
      const d = document.createElement('div');
      d.className = 'rp-cb';
      d.innerHTML = `${avHtml}<div class="rp-cb-txt">${escHtml(text.trim())}</div>`;
      return d;
    };
    textEl.querySelectorAll('em, i').forEach(el => {
      if (el.closest('.rp-cb')) return;
      const raw = el.textContent.trim();
      const isDialogue = /^["\u201c\u00ab\u300c\u300e\u300a\uff02]/.test(raw)
                      || /["\u201d\u00bb\u300d\u300f\u300b\uff02\u300c]$/.test(raw)
                      || /^\u300c|\u300d$/.test(raw);
      if (!isDialogue && raw.length < 3) return;
      const inner = raw.replace(/^["\u201c\u00ab\u300c\u300e\u300a\uff02\u300c]/, '')
                       .replace(/["\u201d\u00bb\u300d\u300f\u300b\uff02]$/, '');
      if (inner.trim().length > 0) el.replaceWith(mkBubble(inner));
    });
    const walkText = (node) => {
      if (node.nodeType === 3) {
        const txt = node.textContent;
        const re = /[\u201c"][^\u201d"\n]{2,}[\u201d"]|[\u300c\u300e][^\u300d\u300f\n]{2,}[\u300d\u300f]/g;
        if (!re.test(txt)) return;
        re.lastIndex = 0;
        const frag = document.createDocumentFragment();
        let last = 0, m;
        while ((m = re.exec(txt)) !== null) {
          if (m.index > last) frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
          const inner = m[0].slice(1, -1);
          frag.appendChild(mkBubble(inner));
          last = m.index + m[0].length;
        }
        if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
        node.replaceWith(frag);
      } else if (node.nodeType === 1 && !node.classList.contains('rp-cb')) {
        Array.from(node.childNodes).forEach(walkText);
      }
    };
    Array.from(textEl.childNodes).forEach(walkText);
  } catch(e) {
    console.warn('[Raymond Phone] beautify:', e);
  }
}

// ================================================================
//  电话功能
// ================================================================
function incomingCall(fromRaw, time) {
  const STATE = getSTATE();
  const thread = findOrCreateThread(fromRaw);
  const customImg = STATE.avatars && STATE.avatars[thread.name];
  const avHtml = customImg
    ? `<div class="rp-call-av rp-av-img" style="background:transparent;overflow:hidden"><img class="rp-av-photo" src="${customImg}" alt=""/></div>`
    : `<div class="rp-call-av" style="background:${thread.avatarBg}">${thread.initials}</div>`;
  $('#rp-call-overlay').html(`
    <div style="display:flex;flex-direction:column;align-items:center">
      ${avHtml}
      <div class="rp-call-name">${escHtml(thread.name)}</div>
      <div class="rp-call-sub">来电中...</div>
    </div>
    <div class="rp-call-btns">
      <div class="rp-call-btn-wrap">
        <div class="rp-call-dec" id="rp-call-dec">📵</div>
        <div class="rp-call-lbl">拒绝</div>
      </div>
      <div class="rp-call-btn-wrap">
        <div class="rp-call-ans" id="rp-call-ans">📞</div>
        <div class="rp-call-lbl">接听</div>
      </div>
    </div>
  `).show();
  STATE._pendingCall = { fromRaw, time, threadId: thread.id };
  clearTimeout(STATE._callTimer);
  STATE._callTimer = setTimeout(() => resolveCall('missed'), 15000);
  showBanner(thread.name, '📞 来电中...');
}

function resolveCall(result) {
  const STATE = getSTATE();
  clearTimeout(STATE._callTimer);
  const call = STATE._pendingCall;
  $('#rp-call-overlay').hide().empty();
  if (!call) return;
  const thread = STATE.threads[call.threadId];
  if (!thread) return;
  const labels = { missed: '未接来电', declined: '已拒绝', answered: '已接听' };
  thread.messages.push({
    id: `call_${Date.now()}`, from: 'system',
    type: 'call_rec', result, time: call.time,
    label: labels[result]
  });
  if (result === 'missed') {
    thread.unread = (thread.unread || 0) + 1;
    refreshBadges();
  }
  renderThreadList();
  if (STATE.currentThread === thread.id) renderBubbles(thread.id);
  saveState();
  const ta = document.querySelector('#send_textarea');
  if (ta) {
    const actions = {
      missed:   `*${thread.name}拨打了电话,{{user}}未接听*`,
      declined: `*{{user}}拒绝了${thread.name}的来电*`,
      answered: `*{{user}}接听了${thread.name}的来电*`
    };
    ta.value = ta.value.trim() ? `${ta.value.trim()}\n${actions[result]}` : actions[result];
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#send_but')?.click();
  }
  STATE._pendingCall = null;
}

// ================================================================
//  红包功能
// ================================================================
function incomingHongbao(fromRaw, amount, note) {
  const STATE = getSTATE();
  const thread = findOrCreateThread(fromRaw);
  const isDup = thread.messages.some(m => m.type === 'hongbao' && m.name === fromRaw && m.amount === amount && m.note === note);
  if (isDup) return;
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  thread.messages.push({
    id: `hb_${Date.now()}`, from: 'incoming',
    type: 'hongbao', name: fromRaw, time: ts,
    amount, note, opened: false
  });
  thread.unread = (thread.unread || 0) + 1;
  refreshBadges();
  renderThreadList();
  if (STATE.currentThread === thread.id) renderBubbles(thread.id);
  showBanner(thread.name, '🧧 发来了一个红包');
  saveState();
}

function openHongbao(threadId, msgId) {
  const STATE = getSTATE();
  const thread = STATE.threads[threadId];
  if (!thread) return;
  const msg = thread.messages.find(m => m.id === msgId);
  if (!msg || msg.opened) return;
  msg.opened = true;
  saveState();
  renderBubbles(threadId);
  const ta = document.querySelector('#send_textarea');
  if (ta) {
    const action = `*{{user}}打开了${msg.name}发来的红包,领到了¥${msg.amount}*`;
    ta.value = ta.value.trim() ? `${ta.value.trim()}\n${action}` : action;
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#send_but')?.click();
  }
}

function sendUserHongbao() {
  const STATE = getSTATE();
  const amount = $('#rp-hb-amount').val().trim();
  const note = $('#rp-hb-note').val().trim() || '恭喜发财';
  if (!amount) return;
  const thread = STATE.threads[STATE.currentThread];
  if (!thread) return;
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  thread.messages.push({
    id: `uhb_${Date.now()}`, from: 'user',
    type: 'hongbao', name: '我', time: ts,
    amount, note, opened: true
  });
  $('#rp-hb-modal').remove();
  renderBubbles(thread.id);
  saveState();
  const ta = document.querySelector('#send_textarea');
  if (ta) {
    const action = `*{{user}}发给${thread.name}一个¥${amount}的红包,备注"${note}"*`;
    ta.value = ta.value.trim() ? `${ta.value.trim()}\n${action}` : action;
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#send_but')?.click();
  }
}

function showHongbaoSheet() {
  $('#rp-attach-panel').hide();
  $('#rp-screen').append(`
    <div class="rp-hb-modal" id="rp-hb-modal">
      <div class="rp-hb-sheet">
        <h3>🧧 发红包</h3>
        <input id="rp-hb-amount" type="number" placeholder="金额(¥)" min="1"/>
        <input id="rp-hb-note"   type="text"   placeholder="祝福语(选填)" maxlength="15"/>
        <button class="rp-hb-send-btn" onclick="sendUserHongbao()">发送红包</button>
        <button class="rp-hb-cancel-btn" onclick="$('#rp-hb-modal').remove()">取消</button>
      </div>
    </div>
  `);
}

// ================================================================
//  语音消息
// ================================================================
function incomingVoice(fromRaw, time, duration, text) {
  const STATE = getSTATE();
  const thread = findOrCreateThread(fromRaw);
  const isDup = thread.messages.some(m => m.type === 'voice' && m.name === fromRaw && m.duration === duration && m.text === text);
  if (isDup) return;
  thread.messages.push({
    id: `vc_${Date.now()}`, from: 'incoming',
    type: 'voice', name: fromRaw, time,
    duration, text, played: false
  });
  thread.unread = (thread.unread || 0) + 1;
  refreshBadges();
  renderThreadList();
  if (STATE.currentThread === thread.id) renderBubbles(thread.id);
  showBanner(thread.name, `🎤 语音消息 ${duration}`);
  saveState();
}

function playVoice(threadId, msgId) {
  const STATE = getSTATE();
  const thread = STATE.threads[threadId];
  if (!thread) return;
  const msg = thread.messages.find(m => m.id === msgId);
  if (!msg || msg.played) return;
  msg.played = true;
  saveState();
  renderBubbles(threadId);
}

// ================================================================
//  群聊功能
// ================================================================
function incomingGroupMsg(fromRaw, groupName, time, text) {
  const STATE = getSTATE();
  const groupId = `grp_${groupName}`;
  if (!STATE.threads[groupId]) {
    const colorIdx = Object.keys(STATE.threads).length % GROUP_COLORS.length;
    STATE.threads[groupId] = {
      id: groupId, name: groupName,
      initials: groupName.slice(0, 2),
      avatarBg: `linear-gradient(145deg,${GROUP_COLORS[colorIdx]},${GROUP_COLORS[(colorIdx+1)%GROUP_COLORS.length]})`,
      type: 'group', messages: [], unread: 0
    };
  }
  const thread = STATE.threads[groupId];
  const senderTh = findOrCreateThread(fromRaw);
  const isDup = thread.messages.some(m => m.type === 'group_msg' && m.name === fromRaw && m.text === text);
  if (isDup) return;
  thread.messages.push({
    id: `gm_${Date.now()}`, from: 'incoming',
    type: 'group_msg', name: fromRaw, time, text,
    initials: senderTh.initials, avatarBg: senderTh.avatarBg
  });
  thread.unread = (thread.unread || 0) + 1;
  refreshBadges();
  renderThreadList();
  if (STATE.currentThread === groupId) renderBubbles(groupId);
  showBanner(groupName, `${fromRaw}:${text.slice(0,22)}${text.length>22?'...':''}`);
  saveState();
}

function incomingGroupVoice(fromRaw, groupName, time, duration, voiceText) {
  const STATE = getSTATE();
  const groupId = `grp_${groupName}`;
  if (!STATE.threads[groupId]) {
    const colorIdx = Object.keys(STATE.threads).length % GROUP_COLORS.length;
    STATE.threads[groupId] = {
      id: groupId, name: groupName,
      initials: groupName.slice(0, 2),
      avatarBg: `linear-gradient(145deg,${GROUP_COLORS[colorIdx]},${GROUP_COLORS[(colorIdx+1)%GROUP_COLORS.length]})`,
      type: 'group', messages: [], unread: 0
    };
  }
  const thread = STATE.threads[groupId];
  const senderTh = findOrCreateThread(fromRaw);
  const isDup = thread.messages.some(msg => msg.type === 'group_voice' && msg.name === fromRaw && msg.voiceText === voiceText);
  if (!isDup) {
    thread.messages.push({
      id: `ggv_${Date.now()}`, from: 'incoming',
      type: 'group_voice', name: fromRaw, time, duration, voiceText,
      initials: senderTh.initials, avatarBg: senderTh.avatarBg
    });
    thread.unread = (thread.unread || 0) + 1;
    refreshBadges();
    renderThreadList();
    if (STATE.currentThread === groupId) renderBubbles(groupId);
    showBanner(groupName, `${fromRaw}: 🎤 [${duration}]`);
    saveState();
  }
}

function incomingGroupHongbao(fromRaw, groupName, time, amount) {
  const STATE = getSTATE();
  const groupId = `grp_${groupName}`;
  if (!STATE.threads[groupId]) {
    const colorIdx = Object.keys(STATE.threads).length % GROUP_COLORS.length;
    STATE.threads[groupId] = {
      id: groupId, name: groupName,
      initials: groupName.slice(0, 2),
      avatarBg: `linear-gradient(145deg,${GROUP_COLORS[colorIdx]},${GROUP_COLORS[(colorIdx+1)%GROUP_COLORS.length]})`,
      type: 'group', messages: [], unread: 0
    };
  }
  const thread = STATE.threads[groupId];
  const senderTh = findOrCreateThread(fromRaw);
  const isDup = thread.messages.some(msg => msg.type === 'group_hongbao' && msg.name === fromRaw && msg.amount === amount);
  if (!isDup) {
    const now = new Date();
    thread.messages.push({
      id: `ggh_${Date.now()}`, from: 'incoming',
      type: 'group_hongbao', name: fromRaw, time,
      amount, note: '恭喜发财', opened: false,
      initials: senderTh.initials, avatarBg: senderTh.avatarBg
    });
    thread.unread = (thread.unread || 0) + 1;
    refreshBadges();
    renderThreadList();
    if (STATE.currentThread === groupId) renderBubbles(groupId);
    showBanner(groupName, `${fromRaw} 发了一个红包`);
    saveState();
  }
}

// ================================================================
//  附件菜单
// ================================================================
function toggleAttachPanel() {
  const p = $('#rp-attach-panel');
  if (p.is(':visible')) { p.hide(); return; }
  p.html(`
    <div class="rp-attach-row">
      <div class="rp-attach-item" onclick="showHongbaoSheet()">
        <div class="rp-attach-ico">🧧</div><span>红包</span>
      </div>
    </div>
  `).show();
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
  refreshBadges
};
