// ================================================================
//  MOMENTS (朋友圈)
//  朋友圈模块
// ================================================================

const STAGE_NAMES = { 1: '初识 · 试探', 2: '增进 · 主导', 3: '陷落 · 占有' };

function normNameKey(s) {
  return String(s || '').toLowerCase().replace(/[\s·•\-_]+/g, '');
}

function resolveNpcPersonaByName(name, npcPersonaMap) {
  if (!name || !npcPersonaMap) return '';
  const k = normNameKey(name);
  if (npcPersonaMap[k]) return npcPersonaMap[k];

  const keys = Object.keys(npcPersonaMap || {});
  for (const kk of keys) {
    const minLen = Math.min(k.length, kk.length);
    if (minLen < 4) continue;
    if (kk.startsWith(k) || k.startsWith(kk)) return npcPersonaMap[kk];
  }

  const first = String(name || '').trim().toLowerCase().split(/\s+/)[0] || '';
  if (first && first.length >= 4) {
    for (const kk of keys) {
      if (kk.startsWith(first) && kk.length >= first.length) return npcPersonaMap[kk];
    }
  }

  return '';
}

let _getMomentsCtxCache = null;
let _getMomentsCtxCacheTime = 0;
let _getMomentsCtxPromise = null;

async function getMomentsCtx() {
  const now = Date.now();
  if (_getMomentsCtxCache && (now - _getMomentsCtxCacheTime) < 30000) {
    return _getMomentsCtxCache;
  }
  if (_getMomentsCtxPromise) return _getMomentsCtxPromise;
  _getMomentsCtxPromise = _doGetMomentsCtx();
  try {
    const result = await _getMomentsCtxPromise;
    return result;
  } finally {
    _getMomentsCtxPromise = null;
  }
}

async function _doGetMomentsCtx() {
  const ctx = getContext();
  const charName = ctx?.name2 || ctx?.characters?.[ctx?.characterId]?.name || '对方';
  const userName = ctx?.name1 || '用户';

  const knownNPCs = new Set();
  Object.values(STATE.threads || {}).forEach(th => {
    if (!th.name || th.name === charName) return;
    if (th.type === 'group' || th.id.startsWith('grp_') || (th.members && th.members.length > 1)) return;
    knownNPCs.add(th.name);
  });
  (STATE.moments || []).filter(m => m.from !== 'user' && m.name !== charName).forEach(m => knownNPCs.add(m.name));

  const recentChat = (ctx?.chat || []).slice(-30).map(m => {
    const spk = m.is_user ? userName : (m.name || charName);
    return spk + ': ' + ((m.mes || '').replace(/<[^>]+>/g, '').trim().slice(0, 150));
  }).join('\n') || '(暂无对话记录)';

  let charPersona = '';
  try {
    const charObj = (ctx?.characters && ctx?.characterId !== undefined)
      ? ctx.characters[ctx.characterId]
      : (ctx?.char || null);
    if (charObj) {
      const parts = [];
      if (charObj.description) parts.push(charObj.description.replace(/\s+/g, ' ').trim().slice(0, 350));
      if (charObj.personality) parts.push('性格:' + charObj.personality.replace(/\s+/g, ' ').trim().slice(0, 150));
      if (charObj.scenario)    parts.push('背景:' + charObj.scenario.replace(/\s+/g, ' ').trim().slice(0, 200));
      charPersona = parts.filter(Boolean).join('\n');
    }
  } catch(e) { }

  const npcPersonaMap = {};

  try {
    const chars = Array.isArray(ctx?.characters)
      ? ctx.characters
      : (ctx?.characters && typeof ctx.characters === 'object' ? Object.values(ctx.characters) : []);
    chars.forEach(ch => {
      const name = (ch?.name || '').trim();
      if (!name || name === charName) return;
      const parts = [];
      if (ch.description) parts.push(ch.description.replace(/\s+/g, ' ').trim().slice(0, 280));
      if (ch.personality) parts.push('性格:' + ch.personality.replace(/\s+/g, ' ').trim().slice(0, 140));
      if (ch.scenario)    parts.push('背景:' + ch.scenario.replace(/\s+/g, ' ').trim().slice(0, 180));
      const persona = parts.filter(Boolean).join('\n');
      if (persona) npcPersonaMap[normNameKey(name)] = persona;
    });
  } catch(e) { }

  try {
    const wiTexts = [];

    try {
      const charObj = (ctx?.characters && ctx?.characterId !== undefined)
        ? ctx.characters[ctx.characterId] : (ctx?.char || null);
      const wiName = charObj?.data?.extensions?.world || charObj?.extensions?.world || '';
      if (wiName && typeof ctx.loadWorldInfo === 'function') {
        const wiData = await ctx.loadWorldInfo(wiName);
        if (wiData?.entries) {
          Object.values(wiData.entries).forEach(e => {
            const content = e?.content || e?.text || '';
            if (content) wiTexts.push(content);
          });
          console.log('[getMomentsCtx] loadWorldInfo:', wiName, '- entries:', Object.keys(wiData.entries).length);
        }
      }
    } catch(e) { console.warn('[getMomentsCtx] loadWorldInfo failed:', e.message); }

    [ctx?.worldInfoBefore, ctx?.worldInfoAfter, ctx?.world_info, ctx?.lorebook]
      .filter(Boolean).forEach(s => wiTexts.push(String(s)));

    try {
      const ep = window.extension_prompts || {};
      Object.values(ep).forEach(p => { if (p?.value) wiTexts.push(String(p.value)); });
    } catch(e) {}

    try {
      const wi = window.world_info || {};
      Object.values(wi).forEach(book => {
        const entries = book?.entries || book?.content || {};
        Object.values(entries).forEach(e => {
          const content = e?.content || e?.text || '';
          if (content && content.length > 10) wiTexts.push(content);
        });
      });
    } catch(e) { console.warn('[getMomentsCtx] window.world_info scan failed:', e.message); }

    const allWIText = wiTexts.join('\n');
    if (allWIText) {
      const blockRe = /<character(?:[_\-][^>]*)?>([\s\S]*?)<\/character(?:[_\-][^>]*)?>/gi;
      let bm;
      while ((bm = blockRe.exec(allWIText)) !== null) {
        const block = bm[1];
        const nameMatch = block.match(/^\s*name\s*[::]\s*(.+)/mi);
        if (!nameMatch) continue;
        const wName = nameMatch[1].trim().replace(/[<>]/g, '').split(/[\s,,]/)[0];
        if (!wName || normNameKey(wName) === normNameKey(charName)) continue;
        const fullText = block.replace(/<[^>]+>/g, '').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
        if (fullText.length > 20) {
          npcPersonaMap[normNameKey(wName)] = fullText.slice(0, 500);
        }
      }

      const wiEntries = wiTexts;
      wiEntries.forEach(entryText => {
        if (!entryText || entryText.length < 10) return;
        let extractedName = '';

        const bracketMatch = entryText.match(/^\s*\[([^\]|\/\\-]+?)(?:[-|\/\\][^\]]*?)?\]/m);
        if (bracketMatch) {
          extractedName = bracketMatch[1].trim();
        }
        if (!extractedName) {
          const mdMatch = entryText.match(/^\s*#{1,3}\s*([^\n#\--]+)/m);
          if (mdMatch) extractedName = mdMatch[1].trim();
        }
        if (!extractedName) {
          const colonMatch = entryText.match(/^\s*(?:name|角色名|名字)\s*[::：]\s*(.+)$/m);
          if (colonMatch) extractedName = colonMatch[1].trim();
        }

        if (extractedName && extractedName.length >= 2) {
          const cleaned = entryText.replace(/<[^>]+>/g, '').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
          if (cleaned.length > 20 && !npcPersonaMap[normNameKey(extractedName)]) {
            npcPersonaMap[normNameKey(extractedName)] = cleaned.slice(0, 500);
          }
        }
      });
    }
  } catch(e) { console.warn('[getMomentsCtx] world info parsing failed:', e.message); }

  return {
    charName,
    userName,
    charPersona,
    npcPersonaMap,
    knownNPCs: Array.from(knownNPCs),
    recentChat
  };
}

function cleanMomentText(text) {
  if (!text) return '';
  return text
    .replace(/<img\b[^>]*>/gi, '')
    .replace(/image###[\s\S]*?###/gi, '')
    .replace(/<pic\b[^>]*>[\s\S]*?<\/pic>/gi, '')
    .replace(/<pic\b[\s\S]*?\/>/gi, '')
    .replace(/<pic\b[^>]*>/gi, '')
    .trim();
}

function renderMoments() {
  console.log('[Phone:diag] renderMoments STATE.avatars=', JSON.stringify(STATE.avatars));
  const container = $('#rp-moments-list').empty();
  if (!STATE.moments || STATE.moments.length === 0) {
    container.append('<div class="rp-moments-empty"><span>📭</span><span>暂无动态</span></div>');
    return;
  }
  const _ctx = getContext();
  const _uname = _ctx?.name1 || '我';
  [...STATE.moments].reverse().forEach(moment => {
    const liked = moment.likes.includes('user');
    const likeNames = moment.likes.map(l => l === 'user' ? _uname : l);
    const likeCount = likeNames.length;
    let commentsHtml = '';
    if (moment.comments && moment.comments.length > 0) {
      const items = moment.comments.map((cm, idx) => {
        const replyPart = cm.replyTo !== null && cm.replyTo !== undefined
          ? `回复 <span class="rp-moment-cname">${moment.comments[cm.replyTo]?.name || '?'}</span>:`
          : '';
        return `<div class="rp-moment-comment">
          <span class="rp-moment-cname">${escHtml(cm.name)}</span>:${replyPart}${escHtml(cm.text)}
          <span class="rp-moment-reply-btn" data-moment="${moment.id}" data-cidx="${idx}" data-rname="${escHtml(cm.name)}">回复</span>
        </div>`;
      }).join('');
      commentsHtml = `<div class="rp-moment-comments-wrap">${items}</div>`;
    }
    container.append(`
      <div class="rp-moment" data-mid="${moment.id}">
        <div class="rp-moment-hd">
          ${(()=>{const k=moment.from==='user'?'user':moment.name;const ci=STATE.avatars&&STATE.avatars[k];return ci?`<div class="rp-moment-av rp-av-img"><img class="rp-av-photo" src="${ci}" alt=""/></div>`:`<div class="rp-moment-av" style="background:${moment.avatarBg}">${moment.initials}</div>`;})()}
          <div class="rp-moment-meta">
            <div class="rp-moment-name">${escHtml(moment.name)}</div>
            <div class="rp-moment-time">${moment.time}</div>
          </div>
        </div>
        <div class="rp-moment-text">${escHtml(cleanMomentText(moment.text))}</div>
        ${moment.img
          ? `<div class="rp-moment-img-wrap"><img class="rp-moment-img" src="${escHtml(moment.img)}" alt=""/></div>`
          : moment.pendingImg
            ? moment.pendingImgType === 'comfy'
              ? `<div class="rp-moment-img-wrap" style="min-width:90px;display:inline-flex;align-items:center;justify-content:center;background:rgba(128,128,128,0.13);border-radius:12px;padding:10px 16px;gap:6px;"><span style="font-size:16px;">⏳</span><span style="font-size:12px;opacity:0.7;">生成中…</span></div>`
              : `<div class="rp-moment-img-wrap rp-moment-pending-img" data-mid="${moment.id}" data-prompt="${escHtml(moment.pendingImg)}" style="min-width:90px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;background:rgba(128,128,128,0.13);border-radius:12px;padding:10px 16px;gap:6px;" title="点击触发生图"><span style="font-size:16px;">📷</span><span style="font-size:12px;opacity:0.75;">点击生图</span></div>`
            : ''
        }
        <div class="rp-moment-bar">
          <button class="rp-moment-act rp-like-btn${liked ? ' rp-liked' : ''}" data-moment="${moment.id}">${liked ? '❤️' : '🤍'} ${likeCount > 0 ? likeCount : '点赞'}</button>
          <button class="rp-moment-act rp-comment-toggle" data-moment="${moment.id}">💬 评论</button>
          <button class="rp-moment-act rp-moment-del-btn" data-moment="${moment.id}" style="color:rgba(200,60,60,.6);margin-left:auto">🗑️ 删除</button>
        </div>
        ${likeCount > 0 ? `<div class="rp-moment-likes-row">❤️ ${likeNames.slice(0,4).join('、')}${likeCount > 4 ? ` 等${likeCount}人` : ''}</div>` : ''}
        ${commentsHtml}
        <div class="rp-moment-input-row" id="rp-ci-${moment.id}" style="display:none">
          <input class="rp-moment-cinput" type="text" placeholder="发表评论..." autocomplete="off"/>
          <button class="rp-moment-csend" data-moment="${moment.id}">发送</button>
        </div>
      </div>
    `);
  });
}

async function friendsInteractOnMoment(momentId) {
  if (!STATE._friendsInteractDone) STATE._friendsInteractDone = new Set();
  if (STATE._friendsInteractDone.has(momentId)) return;
  STATE._friendsInteractDone.add(momentId);

  const moment = (STATE.moments || []).find(m => m.id === momentId);
  if (!moment) return;

  const { charName, npcs, npcPersonaMap } = await getMomentsCtx();

  const authorName = moment.name;
  const isUserMoment = moment.from === 'user';
  const allFriends = (isUserMoment ? npcs : [charName, ...npcs]).filter(n => n && n !== authorName);
  if (allFriends.length === 0) return;

  const now = new Date();
  const ts = () => {
    const d = new Date();
    return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
  };

  allFriends.forEach(name => {
    if (Math.random() < 0.7 && !moment.likes.includes(name)) {
      moment.likes.push(name);
    }
  });
  if (STATE.currentView === 'moments') renderMoments();
  saveState();

  if (isUserMoment) {
    if (STATE.currentView === 'moments') renderMoments();
    saveState();
    return;
  }

  const alreadyCommented = new Set((moment.comments || []).map(c => c.name));
  const eligible = allFriends.filter(n => !alreadyCommented.has(n));
  const shuffled = eligible.sort(() => Math.random() - 0.5);
  const commentors = shuffled.slice(0, 3);
  if (commentors.length === 0) return;

  const npcPersonaText = commentors.map(n => {
    const p = npcPersonaMap?.[normNameKey(n)] || '';
    return p ? ('- ' + n + ':' + p.replace(/\n/g, ';').slice(0, 150)) : ('- ' + n);
  }).join('\n');

  const sysMsg = '你是角色扮演社交媒体互动模拟器。\n规则:每个角色评论风格符合其人设;所有评论用中文;不超过20字;不加引号。';
  const prompt = '朋友圈动态作者:' + authorName + '\n内容:「' + (moment.text.slice(0, 80) || (moment.img ? '[发了一张图片]' : '[动态]')) + '」\n\n'
    + '以下角色各写一条评论(语气符合各自性格,互相不重复):\n' + npcPersonaText
    + '\n\n只返回JSON数组,格式:[{"from":"角色名","text":"评论内容"}, ...]';

  try {
    const resp = await lgCallAPI(prompt, 300, sysMsg);
    if (!resp) return;
    const jsonStr = resp.match(/\[[\s\S]*\]/)?.[0];
    if (!jsonStr) return;
    const items = JSON.parse(jsonStr);
    const allowedSet = new Set(allFriends.map(n => normNameKey(n)));
    items.forEach(item => {
      if (!item.from || !item.text) return;
      const k = normNameKey(item.from);
      const isAllowed = allowedSet.has(k) || [...allowedSet].some(a => a.startsWith(k) || k.startsWith(a));
      if (!isAllowed) return;
      const cleaned = item.text.trim().replace(/^[「"'\s]+|[」"'\s]+$/g, '');
      if (cleaned && cleaned.length > 1) {
        incomingComment(momentId, item.from.trim(), ts(), cleaned, null);
      }
    });
    if (STATE.currentView === 'moments') renderMoments();
    saveState();
  } catch(e) {
    console.warn('[Moments] friendsInteractOnMoment error:', e);
  }
}

async function generateAIReply(momentId, userCommentText, fromName) {
  const moment = STATE.moments?.find(m => m.id === momentId);
  if (!moment) return;
  const authorName = fromName || moment.name;
  const { charName, charPersona, npcPersonaMap } = await getMomentsCtx();
  let sysMsg3 = '';
  if (authorName === charName && charPersona) {
    sysMsg3 = '你正在扮演 ' + charName + ',人设如下:\n' + charPersona.slice(0, 300) + '\n\n回复时必须严格符合该人设的语气和性格,用中文回复,不超过20字,只返回回复内容本身。';
  } else {
    const npcPersona = resolveNpcPersonaByName(authorName, npcPersonaMap) || '';
    sysMsg3 = '你正在扮演 ' + authorName + ',' + (npcPersona ? ('其人设如下:\n' + npcPersona.slice(0, 300) + '\n') : '根据其在故事中的言行推断语气,') + '用中文回复,不超过20字,只返回回复内容本身。';
  }
  const prompt3 = authorName + '的朋友圈:「' + (moment.text || (moment.img ? '[发了一张图片]' : '[动态]')) + '」\n用户评论:「' + userCommentText + '」\n' + authorName + '回复:';
  const resp = await lgCallAPI(prompt3, 100, sysMsg3);
  if (!resp) return;
  const now = new Date();
  const ts = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
  const cleaned = resp.trim().replace(/^[「"']|[」"']$/g, '');
  incomingComment(momentId, authorName, ts, cleaned, null);
}

async function momentAISocial(momentId) {
  const moment = (STATE.moments || []).find(m => m.id === momentId);
  if (!moment) return;

  const { charName, charPersona, npcPersonaMap } = await getMomentsCtx();

  if (moment.from !== 'user') {
    await friendsInteractOnMoment(momentId);
    return;
  }

  const sysMsg = '你是角色扮演社交媒体互动模拟器。用户发了一条朋友圈,请让主角(' + charName + ')评论,语气符合其人设,用中文,不超过20字,只返回评论内容本身。';
  const prompt = charName + '的朋友圈:「' + (moment.text || (moment.img ? '[发了一张图片]' : '[动态]')) + '」\n' + charName + '评论:';
  try {
    const resp = await lgCallAPI(prompt, 100, sysMsg);
    if (!resp) return;
    const now = new Date();
    const ts = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
    const cleaned = resp.trim().replace(/^[「"']|[」"']$/g, '');
    incomingComment(momentId, charName, ts, cleaned, null);
  } catch(e) {
    console.warn('[Moments] momentAISocial error:', e);
  }
}

function incomingComment(momentId, name, time, text, replyTo) {
  const moment = (STATE.moments || []).find(m => m.id === momentId);
  if (!moment) return;
  if (!moment.comments) moment.comments = [];
  moment.comments.push({ name, time, text, replyTo });
  if (STATE.currentView === 'moments') renderMoments();
  saveState();
}