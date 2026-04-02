// ================================================================
//  PHONE BLOCK PARSER
//  PHONE块解析模块
// ================================================================

function parsePhoneBlocks(block) {
  let parsedCount = 0;
  let m;

  const _isUserFrom = function(from) {
    const ctx = typeof getContext === 'function' ? getContext() : {};
    const userName = (ctx && ctx.name1) || 'user';
    const fromLower = String(from || '').toLowerCase();
    const userLower = String(userName).toLowerCase();
    return fromLower === userLower || fromLower === 'user' || fromLower === '我';
  };

  const _userName = (typeof getContext === 'function' ? getContext()?.name1 : null) || '';

  const momentRe = /<MOMENTS\s+FROM="([^"]+)"\s+TIME="([^"]+)"(?:\s+PENDING_IMG="([^"]*)")?(?:\s+PENDING_IMG_TYPE="([^"]*)")?\s*>([\s\S]*?)<\/MOMENTS>/gi;
  while ((m = momentRe.exec(block)) !== null) {
    const momentFrom = m[1].trim();
    const momentTime = m[2].trim();
    const pendingPrompt = m[3] ? m[3].trim() : '';
    const pendingImgType = m[4] ? m[4].trim() : '';
    const momentText = m[5].trim();

    const ctx = typeof getContext === 'function' ? getContext() : {};
    const userName = (ctx && ctx.name1) || '我';
    const charName = (ctx && ctx.name2) || '对方';

    const isUser = momentFrom.toLowerCase() === 'user' || momentFrom === userName;
    const effectiveFrom = isUser ? 'user' : momentFrom;

    const momentId = 'moment_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const existing = (STATE.moments || []).find(x => x.from === effectiveFrom && x.text === momentText);
    if (existing) {
      console.log('[Phone:parse] duplicate moment skipped:', effectiveFrom);
      continue;
    }

    const effectivePendingPrompt = pendingPrompt || null;
    const comfyPendingPrompt = pendingImgType === 'comfy' ? pendingPrompt : null;

    STATE.moments.push({
      id: momentId,
      from: effectiveFrom,
      name: effectiveFrom === 'user' ? userName : momentFrom,
      text: momentText,
      time: momentTime,
      img: null,
      pendingImg: effectivePendingPrompt,
      pendingImgType: pendingImgType || (pendingPrompt ? 'comfy' : null),
      likes: [],
      comments: []
    });

    if (effectivePendingPrompt) {
      if (!STATE._pendingMomentImgs) STATE._pendingMomentImgs = new Map();
      STATE._pendingMomentImgs.set(effectivePendingPrompt, momentId);
      if (comfyPendingPrompt) {
        STATE._pendingComfyPics = STATE._pendingComfyPics || new Map();
        STATE._pendingComfyPics.set(comfyPendingPrompt, { threadId: '__moment__', momentId, time: momentTime });
        console.log('[Phone:moment:comfy] 朋友圈 ComfyUI 等待生图', { momentId, prompt: comfyPendingPrompt.slice(0, 50) });
      } else {
        console.log('[Phone:moment:pending] 朋友圈智绘姬等待生图', { momentId, prompt: pendingPrompt.slice(0, 50) });
      }

      if (!comfyPendingPrompt && pendingPrompt) {
        const allBtns = document.querySelectorAll('button.st-chatu8-image-button, button.image-tag-button');
        for (const btn of allBtns) {
          const btnPrompt = (btn.getAttribute('data-link') || btn.getAttribute('data-prompt') || btn.textContent || '').trim();
          if (btnPrompt && (btnPrompt.includes(pendingPrompt.slice(0, 30)) || pendingPrompt.includes(btnPrompt.slice(0, 30)))) {
            const imgEl = btn.querySelector('img');
            if (imgEl && imgEl.src && imgEl.src.length > 10) {
              const mo = STATE.moments && STATE.moments.find(function(x) { return x.id === momentId; });
              if (mo && !mo.img) {
                mo.img = imgEl.src;
                mo.pendingImg = null;
                mo.pendingImgType = null;
                STATE._pendingMomentImgs.delete(effectivePendingPrompt);
                if (STATE.currentView === 'moments') renderMoments();
                saveState();
                console.log('[Phone:moment:earlyFill] 主楼图片早于 parsePhone，直接回填', { momentId, src: imgEl.src.slice(0, 80) });
              }
            }
            break;
          }
        }
      }
    }
    parsedCount++;
  }

  const commentRe = /<COMMENT\s+MOMENT_ID="([^"]+)"\s+FROM="([^"]+)"\s+TIME="([^"]+)"(?:\s+REPLY_TO="([^"]*)")?\s*>([\s\S]*?)<\/COMMENT>/gi;
  while ((m = commentRe.exec(block)) !== null) {
    incomingComment(m[1].trim(), m[2].trim(), m[3].trim(), m[5].trim(), m[4] ? m[4].trim() : null);
    parsedCount++;
  }

  const sync = block.match(/<SYNC\s+STAGE="(\d+)"\s+PROGRESS="(\d+)"\s+STATUS="([^"]+)"\/>/i);
  if (sync) {
    STATE.sync = { stage: +sync[1], progress: +sync[2], status: sync[3] };
    refreshWidget();
    saveState();
    parsedCount++;
  }

  const callRe = /<CALL\s+FROM="([^"]+)"\s+TIME="([^"]+)"\s*\/?>/gi;
  while ((m = callRe.exec(block)) !== null) {
    const callFrom = m[1].trim();
    if (_isUserFrom(callFrom)) { console.log('[Phone:guard] CALL FROM=user blocked:', callFrom); continue; }
    incomingCall(callFrom, m[2].trim());
    parsedCount++;
  }

  const hongbaoRe = /<HONGBAO\s+FROM="([^"]+)"\s+AMOUNT="([^"]+)"(?:\s+NOTE="([^"]*)")?\s*\/?>/gi;
  while ((m = hongbaoRe.exec(block)) !== null) {
    const fromName = m[1].trim();
    if (_userName && fromName.toLowerCase() === _userName.toLowerCase()) continue;
    incomingHongbao(fromName, m[2].trim(), m[3] ? m[3].trim() : '恭喜发财');
    parsedCount++;
  }

  const voiceRe = /<VOICE\s+FROM="([^"]+)"\s+TIME="([^"]+)"\s+DURATION="([^"]+)">([\s\S]*?)<\/VOICE>/gi;
  while ((m = voiceRe.exec(block)) !== null) {
    const voiceFrom = m[1].trim();
    if (_isUserFrom(voiceFrom)) { console.log('[Phone:guard] VOICE FROM=user blocked:', voiceFrom); continue; }
    incomingVoice(voiceFrom, m[2].trim(), m[3].trim(), m[4].trim());
    parsedCount++;
  }

  const gmsgRe = /<GMSG\s+FROM="([^"]+)"\s+GROUP="([^"]+)"\s+TIME="([^"]+)">([\s\S]*?)<\/GMSG>/gi;
  while ((m = gmsgRe.exec(block)) !== null) {
    const gmsgFrom = m[1].trim();
    if (_isUserFrom(gmsgFrom)) { console.log('[Phone:guard] GMSG FROM=user blocked:', gmsgFrom); continue; }
    incomingGroupMsg(gmsgFrom, m[2].trim(), m[3].trim(), m[4].trim());
    parsedCount++;
  }

  const gvoiceRe = /<GVOICE\s+FROM="([^"]+)"\s+GROUP="([^"]+)"\s+TIME="([^"]+)"\s+DURATION="([^"]+)">([\s\S]*?)<\/GVOICE>/gi;
  while ((m = gvoiceRe.exec(block)) !== null) {
    const fromRaw = m[1].trim(), groupName = m[2].trim(), time = m[3].trim();
    if (_isUserFrom(fromRaw)) { console.log('[Phone:guard] GVOICE FROM=user blocked:', fromRaw); continue; }
    const duration = m[4].trim(), voiceText = m[5].trim();
    const groupId = `grp_${groupName}`;
    incomingGroupMsg(fromRaw, groupName, time, `[语音 ${duration}] ${voiceText}`);
    parsedCount++;
  }

  return parsedCount;
}