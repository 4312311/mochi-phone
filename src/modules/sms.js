// ================================================================
//  SMS & MESSAGING
//  短信和消息处理模块
// ================================================================

function addToQueue() {
  const text = $('#rp-input').val().trim();
  if (!text || !STATE.currentThread) return;
  STATE.pendingMessages.push(text);
  $('#rp-input').val('');
  renderPendingQueue();
}

function renderPendingQueue() {
  const container = $('#rp-pending-queue');
  container.empty();
  if (STATE.pendingMessages.length === 0) {
    container.hide();
    return;
  }
  container.show();
  STATE.pendingMessages.forEach((msg) => {
    const short = msg.length > 30 ? msg.slice(0, 30) + '...' : msg;
    container.append(`<div class="rp-pending-item">${short}</div>`);
  });
  container.append(`<div class="rp-pending-hint">点击 ↑ 发送全部 ${STATE.pendingMessages.length} 条</div>`);
}

function sendSMS() {
  const currentText = $('#rp-input').val().trim();
  if (currentText) {
    STATE.pendingMessages.push(currentText);
    $('#rp-input').val('');
  }

  if (!STATE.currentThread || STATE.pendingMessages.length === 0) return;

  const th  = STATE.threads[STATE.currentThread];
  const now = new Date();
  const ts  = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  const allMessages = [...STATE.pendingMessages];
  STATE.pendingMessages = [];
  renderPendingQueue();

  allMessages.forEach(text => {
    th.messages.push({ from: 'user', text, time: ts });
  });
  renderBubbles(STATE.currentThread);
  updatePreviews();
  saveState();

  const ta = document.querySelector('#send_textarea');
  if (!ta) return;

  const mainText = ta.value.trim();

  let smsLine;
  if (allMessages.length === 1) {
    smsLine = `*{{user}}拿起手机,给${th.name}发了一条短信:「${allMessages[0]}」*`;
  } else {
    const msgList = allMessages.map(m => `「${m}」`).join('、');
    smsLine = `*{{user}}拿起手机,给${th.name}连续发了${allMessages.length}条短信:${msgList}*`;
  }

  const ctx = getContext();
  const mainCharName = ctx?.name2 || '';
  const isGroupThread = th.type === 'group' || th.id.startsWith('grp_');

  const allContactNames = Object.values(STATE.threads || {})
    .filter(t => t.type !== 'group' && t.id !== 'user')
    .map(t => t.name)
    .filter(Boolean);
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

  STATE._pendingPhoneReply = {
    threadId: STATE.currentThread,
    fromName: th.name,
    sentAt: Date.now(),
  };

  if (hasExtPrompt) {
    setTimeout(() => setExtensionPrompt('rp-phone-ooc', ''), 300);
  }

  setTimeout(function() {
    try {
      const allUserMsgs = document.querySelectorAll('.mes[is_user="true"]');
      if (!allUserMsgs.length) return;
      const lastUserMsg = allUserMsgs[allUserMsgs - 1];
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

function incomingMsg(threadId, text, time) {
  const th = STATE.threads[threadId];
  if (!th) return;

  const isDup = th.messages.some(m => m.from === threadId && m.text === text);
  if (isDup) {
    console.log('[Phone:diag] incomingMsg DEDUP blocked:', text.slice(0, 40));
    return;
  }

  th.messages.push({ from: threadId, text, time });

  if (STATE.currentView !== 'thread' || STATE.currentThread !== threadId) {
    th.unread++;
  }

  refreshBadges();
  updatePreviews();

  if (STATE.currentView === 'thread' && STATE.currentThread === threadId) {
    renderBubbles(threadId);
  }

  showLiveChat(th.name, th.avatarBg, STATE.avatars?.[th.name] || null, text);
  showBanner(th.name, text, time);
  saveState();
}

function showBanner(from, text, time) {
  const key = from + '|' + text;
  if (STATE._lastBannerKey === key && Date.now() - (STATE._lastBannerAt || 0) < 3000) return;
  STATE._lastBannerKey = key;
  STATE._lastBannerAt = Date.now();

  const b = $('#rp-notif-banner');
  $('#rp-nb-from').text(from);
  $('#rp-nb-text').text(text.length > 45 ? text.slice(0, 45) + '...' : text);
  $('#rp-nb-time').text(time);

  b.stop(true).show().addClass('rp-nb-in');
  setTimeout(() => {
    b.removeClass('rp-nb-in');
    setTimeout(() => b.hide(), 400);
  }, 3500);
}

function showLiveChat(name, avatarBg, customImg, text) {
  if (RP_DISABLE_LIVE_OVERLAY) return;
  const lc = $('#rp-live-chat');
  if (!lc.length) return;
  const id = `lc_${Date.now()}`;
  const avHtml = customImg
    ? `<div class="rp-lc-av"><img src="${customImg}" style="width:100%;height:100%;object-fit:cover"/></div>`
    : `<div class="rp-lc-av" style="background:${avatarBg}">${escHtml((name||'?').slice(0,2))}</div>`;
  lc.append(`
    <div class="rp-lc-bubble" id="${id}">
      ${avHtml}
      <div class="rp-lc-body">
        <div class="rp-lc-name">${escHtml(name)}</div>
        <div class="rp-lc-text">${escHtml(text.slice(0,80))}${text.length>80?'...':''}</div>
      </div>
      <div class="rp-lc-dismiss" onclick="$('#${id}').remove()">×</div>
    </div>
  `);
  const all = lc.children();
  if (all.length > LC_MAX) all.first().remove();
  setTimeout(() => $(`#${id}`).fadeOut(400, function(){ $(this).remove(); }), LC_TTL);
}

const LC_TTL = 6000;
const LC_MAX = 3;
const RP_DISABLE_LIVE_OVERLAY = true;