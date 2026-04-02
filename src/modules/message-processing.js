// ================================================================
//  MESSAGE PROCESSING
//  消息处理模块 - 处理AI回复中的各种消息格式
// ================================================================

function onAIMessage() {
  const ctx = getContext();
  const chat = ctx?.chat;
  if (!chat || chat.length === 0) return;

  const lastMsg = chat[chat.length - 1];
  if (!lastMsg || lastMsg.is_user) return;

  const text = lastMsg.mes || '';
  if (!text) return;

  const phoneRegex = /<PHONE\b[^>]*>[\s\S]*?<\/PHONE>/gi;
  const phoneMatches = text.match(phoneRegex);

  if (!phoneMatches || phoneMatches.length === 0) return;

  phoneMatches.forEach(block => {
    const parsed = parsePhone(block);

    if (parsed.sms && parsed.sms.length > 0) {
      parsed.sms.forEach(sms => {
        const threadId = matchThread(sms.from);
        if (threadId) {
          incomingMsg(threadId, sms.text, sms.time);
        } else {
          const newThreadId = findOrCreateThread(sms.from);
          incomingMsg(newThreadId, sms.text, sms.time);
        }
      });
    }

    if (parsed.moments && parsed.moments.length > 0) {
      parsed.moments.forEach(moment => {
        const now = new Date();
        const ts = moment.time || (String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0'));
        const initials = moment.from.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase() || moment.from.slice(0, 2).toUpperCase();
        STATE.moments.push({
          id: 'm_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
          from: 'npc',
          name: moment.from,
          initials: initials,
          avatarBg: generateAvatarBg(),
          time: ts,
          text: moment.text,
          img: moment.img || null,
          pendingImg: moment.pendingImg || null,
          pendingImgType: moment.pendingImgType || null,
          likes: [],
          comments: [],
        });
        saveState();
        momentAISocial(STATE.moments[STATE.moments.length - 1].id);
      });
    }

    if (parsed.groupMsgs && parsed.groupMsgs.length > 0) {
      parsed.groupMsgs.forEach(gmsg => {
        const groupThreadId = matchThread(gmsg.group);
        if (groupThreadId) {
          incomingMsg(groupThreadId, gmsg.text, gmsg.time);
        }
      });
    }

    if (parsed.hongbao && parsed.hongbao.length > 0) {
      parsed.hongbao.forEach(hb => {
        const threadId = matchThread(hb.from);
        if (threadId) {
          const th = STATE.threads[threadId];
          if (th) {
            const now = new Date();
            const ts = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
            th.messages.push({
              from: threadId,
              text: `[红包] ${hb.amount}元 - ${hb.note}`,
              time: ts,
              type: 'hongbao',
              amount: hb.amount,
              note: hb.note,
            });
            if (STATE.currentView === 'thread' && STATE.currentThread === threadId) {
              renderBubbles(threadId);
            }
            updatePreviews();
            saveState();
          }
        }
      });
    }

    if (parsed.voice && parsed.voice.length > 0) {
      parsed.voice.forEach(voice => {
        const threadId = matchThread(voice.from);
        if (threadId) {
          const th = STATE.threads[threadId];
          if (th) {
            th.messages.push({
              from: threadId,
              text: voice.text || '[语音消息]',
              time: voice.time,
              type: 'voice',
              duration: voice.duration,
            });
            if (STATE.currentView === 'thread' && STATE.currentThread === threadId) {
              renderBubbles(threadId);
            }
            updatePreviews();
            saveState();
          }
        }
      });
    }

    if (parsed.location && parsed.location.length > 0) {
      parsed.location.forEach(loc => {
        const threadId = matchThread(loc.from);
        if (threadId) {
          const th = STATE.threads[threadId];
          if (th) {
            th.messages.push({
              from: threadId,
              text: `[位置] ${loc.text}`,
              time: loc.time,
              type: 'location',
              location: loc.text,
            });
            if (STATE.currentView === 'thread' && STATE.currentThread === threadId) {
              renderBubbles(threadId);
            }
            updatePreviews();
            saveState();
          }
        }
      });
    }
  });

  hidePhoneTagsInChat();
  hideOocInUserBubbles();
  rewriteAllHistoryPhoneBlocks();
}

function onMessageUpdatedForImages(messageIndex) {
  const ctx = getContext();
  const chat = ctx?.chat;
  if (!chat || messageIndex < 0 || messageIndex >= chat.length) return;

  const msg = chat[messageIndex];
  if (!msg || msg.is_user) return;

  const text = msg.mes || '';
  if (!text) return;

  const phoneRegex = /<PHONE\b[^>]*>[\s\S]*?<\/PHONE>/gi;
  const phoneMatches = text.match(phoneRegex);

  if (!phoneMatches || phoneMatches.length === 0) return;

  phoneMatches.forEach(block => {
    const imgRegex = /<img\b[^>]*src=["']([^"']+)["'][^>]*>/gi;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(block)) !== null) {
      const imgSrc = imgMatch[1];
      if (imgSrc && imgSrc.startsWith('data:image/')) {
        const smsRegex = /<SMS\b[^>]*FROM\s*=\s*["']([^"']+)["'][^>]*>/gi;
        const smsMatch = smsRegex.exec(block);
        if (smsMatch) {
          const from = smsMatch[1].trim();
          const threadId = matchThread(from);
          if (threadId) {
            const th = STATE.threads[threadId];
            if (th && th.messages.length > 0) {
              const lastMsg = th.messages[th.messages.length - 1];
              if (lastMsg.from === threadId) {
                lastMsg.img = imgSrc;
                if (STATE.currentView === 'thread' && STATE.currentThread === threadId) {
                  renderBubbles(threadId);
                }
                saveState();
              }
            }
          }
        }
      }
    }
  });
}

function rewritePhoneEchoInChat(block, fp) {
  const container = document.querySelectorAll('.mes:not([data-rp-processed])');
  if (!container.length) return;

  const parsed = parsePhone(block);
  if (!parsed.sms || parsed.sms.length === 0) return;

  container.forEach(el => {
    el.setAttribute('data-rp-processed', 'true');
    const textEl = el.querySelector('.mes_text');
    if (!textEl) return;

    let html = textEl.innerHTML || '';
    parsed.sms.forEach(sms => {
      const smsPattern = new RegExp(`<SMS\\b[^>]*FROM\\s*=\\s*["']${escapeRegExp(sms.from)}["'][^>]*>[^<]*<\\/SMS>`, 'gi');
      html = html.replace(smsPattern, `<div class="rp-sms-echo">📱 ${sms.from}: ${sms.text}</div>`);
    });

    textEl.innerHTML = html;
  });
}

function rewriteAllHistoryPhoneBlocks() {
  const ctx = getContext();
  const chat = ctx?.chat;
  if (!chat || chat.length === 0) return;

  chat.forEach((msg, idx) => {
    if (msg.is_user) return;
    const text = msg.mes || '';
    if (!text) return;

    const phoneRegex = /<PHONE\b[^>]*>[\s\S]*?<\/PHONE>/gi;
    const phoneMatches = text.match(phoneRegex);

    if (phoneMatches) {
      phoneMatches.forEach(block => {
        rewritePhoneEchoInChat(block, idx);
      });
    }
  });
}

function hidePhoneTagsInChat() {
  const allMsgs = document.querySelectorAll('.mes_text');
  allMsgs.forEach(el => {
    let html = el.innerHTML || '';
    html = html.replace(/<PHONE\b[^>]*>[\s\S]*?<\/PHONE>/gi, '<span class="rp-phone-hidden"></span>');
    html = html.replace(/<SMS\b[^>]*>[^<]*<\/SMS>/gi, '<span class="rp-sms-hidden"></span>');
    html = html.replace(/<MOMENTS\b[^>]*>[^<]*<\/MOMENTS>/gi, '<span class="rp-moments-hidden"></span>');
    html = html.replace(/<GMSG\b[^>]*>[^<]*<\/GMSG>/gi, '<span class="rp-gmsg-hidden"></span>');
    el.innerHTML = html;
  });
}

function hideOocInUserBubbles() {
  const userMsgs = document.querySelectorAll('.mes[is_user="true"]');
  userMsgs.forEach(el => {
    const textEl = el.querySelector('.mes_text');
    if (!textEl) return;

    let html = textEl.innerHTML || '';
    html = html.replace(/\[(?:手机短信提示|叙事指令|手机群聊提示)[^\]]*\]/gi, '<span class="rp-ooc-hidden"></span>');
    textEl.innerHTML = html;
  });
}

function beautifySMSInChat() {
  const allMsgs = document.querySelectorAll('.mes_text');
  allMsgs.forEach(el => {
    let html = el.innerHTML || '';
    html = html.replace(/<SMS\b[^>]*FROM\s*=\s*["']([^"']+)["'][^>]*>([^<]*)<\/SMS>/gi, 
      '<div class="rp-sms-beautify">📱 <strong>$1</strong>: $2</div>');
    el.innerHTML = html;
  });
}