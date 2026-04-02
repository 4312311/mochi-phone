// ================================================================
//  LUDO SQUARE EVENT
//  飞行棋方块事件模块
// ================================================================

async function lgTriggerSquareEvent(player, pos) {
  const ev = SQUARE_EVENTS[pos];
  if (!ev) return;
  const isUser = player === 'user';
  const moverName = isUser ? '你' : LG.charName;

  document.getElementById('rp-sq-event-sq').textContent = `第 ${pos} 格`;
  document.getElementById('rp-sq-event-emoji').textContent = ev.emoji;
  document.getElementById('rp-sq-event-text').textContent = ev.text;
  const noteEl = document.getElementById('rp-sq-event-note');
  noteEl.textContent = isUser ? (ev.note || '') : `${LG.charName}将完成此任务`;
  lgMsg('sys', `📍 第${pos}格 ${ev.emoji} - ${ev.text}`);
  LG.taskChatCount = 2;

  await new Promise(resolve => {
    const overlay = document.getElementById('rp-sq-event');
    const btn     = document.getElementById('rp-sq-event-done');
    overlay.style.display = 'flex';
    const handler = () => { btn.removeEventListener('click', handler); overlay.style.display = 'none'; resolve(); };
    btn.addEventListener('click', handler);
  });

  if (ev.type === 'move') {
    const curPos = isUser ? LG.userPos : LG.charPos;
    const newPos = Math.max(1, Math.min(53, curPos + ev.delta));
    const step   = ev.delta > 0 ? 1 : -1;
    for (let p = curPos + step; step > 0 ? p <= newPos : p >= newPos; p += step) {
      if (isUser) LG.userPos = p; else LG.charPos = p;
      lgRender();
      await new Promise(r => setTimeout(r, 320));
    }
    lgMsg('sys', ev.delta > 0 ? `${moverName}前进${ev.delta}格,到第${newPos}格` : `${moverName}后退${Math.abs(ev.delta)}格,到第${newPos}格`);
    await new Promise(r => setTimeout(r, 300));
    
    let _chainKey = null;
    if (newPos >= 49 && newPos <= 53) {
      if (SQUARE_EVENTS[newPos]) _chainKey = newPos;
    } else if (newPos >= 1 && newPos <= 48) {
      const _e2 = isUser ? USER_ENTRY : CHAR_ENTRY;
      const _a2 = (_e2 + newPos - 1) % LUDO_PATH_LEN;
      const _k2 = _a2 + 1;
      if (SQUARE_EVENTS[_k2]) _chainKey = _k2;
    }
    if (_chainKey !== null) await lgTriggerSquareEvent(player, _chainKey);
    return;
  }
  
  if (ev.type === 'skip') {
    if (isUser) LG.userSkip = true; else LG.charSkip = true;
    lgMsg('sys', `⏸️ ${moverName}下一轮停留`);
    return;
  }
  
  if (ev.type === 'reroll') {
    LG.pendingReroll = player;
    lgMsg('sys', `🎲 ${moverName}获得额外一次掷骰!`);
    return;
  }

  const bar = document.getElementById('rp-sq-task-bar');
  const btn = document.getElementById('rp-sq-task-done-btn');
  const txt = document.getElementById('rp-sq-task-text');

  if (!isUser) {
    txt.textContent = `💙 ${LG.charName} 任务中...`;
    btn.disabled = true;
    btn.textContent = '☐ 已完成';
    bar.style.display = 'flex';
    const hintEl = document.getElementById('rp-sq-task-hint');
    if (hintEl) hintEl.textContent = `请耐心等待${LG.charName}的回答`;

    const persona   = lgGetPersona();
    const actHint   = ev.type === 'action' ? '(若有动作用*动作*格式,不超过8字)' : '';
    const _taskExpandHint = (ev.type === 'talk' || ev.type === 'truth' || !ev.type)
      ? `\n★ 强制要求：必须直接给出具体答案/内容，严禁用括号包裹任务名称（如"（关于…）"是错误格式），严禁以"关于这个问题"/"我的回答是"等元描述开头，直接说出实际内容。示例——任务"分享一个秘密"→正确:"我偷偷存了你的联系人头像" 错误:"（关于分享一个秘密……）"。任务"最喜欢对方哪里"→正确:"你笑起来眼睛会弯成月亮，我每次都想多看两眼" 错误:"我最喜欢你的…"。`
      : '';
    const prompt    = `[飞行棋强制任务规则]无论角色性格如何,踩到任务格必须立刻直接完成任务,不许沉默、回避、卖关子或绕弯子。${_taskExpandHint}\n${persona}\n当前任务:${ev.text}${actHint}\n请以${LG.charName}的身份用中文口语直接完成该任务，30字以内，纯对话台词，不带括号(任务动作除外)、引号，直接开口说内容。`;
    const rawReply = await lgCallAPI(prompt, 150);
    let cleanedReply = rawReply && rawReply.trim() ? cleanGameReply(rawReply, LG.charName) : '';
    const _taskTextInReply = cleanedReply && ev.text && cleanedReply.includes(ev.text.slice(0, 8));
    const _tooShort = cleanedReply.length <= 4;
    if (_taskTextInReply || _tooShort) cleanedReply = '';
    const replied  = cleanedReply.length > 1;
    if (replied) lgMsg('char', cleanedReply);
    else {
      const _fallbackPrompt = `${persona}\n你正在玩飞行棋，踩到任务格，任务是：${ev.text}。请直接说出你的回答，不超过15字，不要重复任务内容，直接开口。`;
      const _fb = await lgCallAPI(_fallbackPrompt, 80);
      const _fbClean = _fb && _fb.trim() ? cleanGameReply(_fb, LG.charName) : '';
      if (_fbClean && _fbClean.length > 1 && !_fbClean.includes(ev.text.slice(0, 8))) {
        lgMsg('char', _fbClean);
      } else {
        lgMsg('char', ev.type === 'action' ? `*完成${ev.text}*` : `嗯……这个问题让我想一想。`);
      }
    }

    txt.textContent = `💙 ${LG.charName} 完成了吗?`;
    btn.disabled = false;
    btn.textContent = '✅ 已完成';
  } else {
    txt.textContent = `💬 ${ev.text}`;
    bar.style.display = 'flex';
    const hintEl2 = document.getElementById('rp-sq-task-hint');
    if (hintEl2) hintEl2.textContent = '请在下方对话框内完成指定任务';
  }

  await new Promise(resolve => {
    const handler = () => { btn.removeEventListener('click', handler); bar.style.display = 'none'; resolve(); };
    btn.addEventListener('click', handler);
  });
  LG.justDidTask = true;
}