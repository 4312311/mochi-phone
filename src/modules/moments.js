/**
 * 朋友圈模块
 * 处理朋友圈动态、点赞、评论等功能
 */

import { STATE } from '../core/state.js';
import { escHtml } from '../core/utils.js';
import { saveState } from '../core/state.js';
import { showBanner } from './chat.js';
import { matchThread } from './sms.js';

/**
 * 清理朋友圈文本
 */
export function cleanMomentText(text) {
  if (!text) return '';
  return text
    .replace(/<img\b[^>]*>/gi, '')
    .replace(/image###[\s\S]*?###/gi, '')
    .replace(/<pic\b[^>]*>[\s\S]*?<\/pic>/gi, '')
    .replace(/<pic\b[\s\S]*?\/>/gi, '')
    .replace(/<pic\b[^>]*>/gi, '')
    .trim();
}

/**
 * 渲染朋友圈
 */
export function renderMoments() {
  console.log('[Phone:diag] renderMoments STATE.avatars=', JSON.stringify(STATE.avatars));
  console.log('[Phone:diag] renderMoments called from:', new Error().stack.split('\n').slice(1,4).join(' | '));
  const momentImgSnap = (STATE.moments||[]).map(m=>({id:m.id,hasImg:!!m.img,pendingImg:m.pendingImg?.slice(0,20)}));
  console.log('[Phone:diag] renderMoments moments snapshot:', JSON.stringify(momentImgSnap));
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

/**
 * 接收朋友圈动态
 */
export function incomingMoment(fromRaw, time, text, img, pendingImgPrompt, pendingImgType) {
  // ── momentId：from + time + 毫秒戳，每条唯一，彻底避免同时刻不同角色/纯图片碰撞 ──
  const _idBase = fromRaw.toLowerCase().replace(/\s+/g,'_') + '_' + time.replace(':','');
  const momentId = _idBase + '_' + Date.now();

  // ── FIX: chatId 一致性守卫 ──
  // CHAT_CHANGED 事件有时滞后，导致 STATE.chatId 还是旧窗口的 id，
  // 此时 ctx.chatId 才是真正"正在聊天的窗口"。
  // 如果两者不一致，说明这条 moment 属于当前真实窗口（ctx.chatId），
  // 不能写进 STATE.moments（那是旧窗口的），要直接写到正确 chatId 的 localStorage slot，
  // 等 onChatChanged/syncToCurrentChat 后续触发时自然加载回来。
  const _ctx = getContext();
  const _realChatId = _ctx?.chatId || ((_ctx?.characterId != null) ? 'char_' + _ctx.characterId : null);
  if (_realChatId && _realChatId !== STATE.chatId) {
    console.warn('[Phone:moment] chatId 不一致，STATE:', STATE.chatId, '→ ctx:', _realChatId, '，写入正确 slot 而非内存');
    try {
      const _slotRaw = localStorage.getItem(`rp-phone-v1-${_realChatId}`);
      const _slot = _slotRaw ? JSON.parse(_slotRaw) : null;
      if (_slot) {
        _slot.moments = _slot.moments || [];
        const _threadId0 = matchThread(fromRaw) || fromRaw;
        const _dup = _slot.moments.find(m =>
          m.from === _threadId0 && m.time === time && m.text === (text || '')
        );
        if (!_dup) {
          _slot.moments.push({
            id: momentId,
            from: _threadId0,
            name: fromRaw,
            initials: fromRaw.slice(0,2).toUpperCase(),
            avatarBg: 'linear-gradient(145deg,#555,#333)',
            time, text,
            img: img || null,
            pendingImg: (!img && pendingImgPrompt) ? pendingImgPrompt : null,
            pendingImgType: (!img && pendingImgPrompt) ? (pendingImgType || 'chatu8') : null,
            likes: [], comments: [],
          });
          localStorage.setItem(`rp-phone-v1-${_realChatId}`, JSON.stringify(_slot));
          console.log('[Phone:moment] 已写入正确 slot:', _realChatId, momentId);
        }
      }
    } catch(e) { console.warn('[Phone:moment] 写入正确 slot 失败', e); }
    return momentId; // 不污染当前 STATE.moments
  }

  // ── 去重：from+time+text 三字段去重（不含 img）──
  // 原因：ComfyUI 完成生图后 media-auto-generation 会修改 mes，触发 1.2s 轮询再次 parsePhone，
  // 此时 img 字段从 null 变为真实 src，若用 img 参与去重则命中失败，导致插入重复脏条目。
  const _threadId = matchThread(fromRaw) || fromRaw;
  const existingMoment = STATE.moments && STATE.moments.find(m =>
    m.from === _threadId && m.time === time && m.text === (text || '')
  );
  if (existingMoment) {
    // 若已存在 moment 没有图片，但本次解析拿到了图片 → 回填（ComfyUI 完成态覆盖 pending 态）
    if (!existingMoment.img && img) {
      existingMoment.img = img;
      existingMoment.pendingImg = null;
      existingMoment.pendingImgType = null;
      // 同时清理 _pendingMomentImgs 里对应条目，避免 Observer 重复回填
      if (STATE._pendingMomentImgs) {
        for (const [k, v] of STATE._pendingMomentImgs) {
          if (v === momentId) { STATE._pendingMomentImgs.delete(k); break; }
        }
      }
      if (STATE.currentView === 'moments') renderMoments();
      saveState();
      console.log('[Phone:moment:update] ComfyUI 完成，回填已存在 moment 的图片', { momentId, src: img.slice(0, 80) });
    }
    return existingMoment.id;  // 必须返回 id，否则 parsePhone 的 _pendingMomentImgs.set 会写入 undefined
  }
  const threadId = matchThread(fromRaw);
  const th = STATE.threads[threadId];
  STATE.moments = STATE.moments || [];
  STATE.moments.push({
    id: momentId,
    from: threadId || fromRaw,
    name: th ? th.name : fromRaw,
    initials: th ? th.initials : fromRaw.slice(0,2).toUpperCase(),
    avatarBg: th ? th.avatarBg : 'linear-gradient(145deg,#555,#333)',
    time, text,
    img: img || null,
    // ── 朋友圈生图占位：等待生图完成后回填 ──
    // pendingImgType: 'chatu8'(智绘姬,需点击) | 'comfy'(ComfyUI,全自动)
    pendingImg: (!img && pendingImgPrompt) ? pendingImgPrompt : null,
    pendingImgType: (!img && pendingImgPrompt) ? (pendingImgType || 'chatu8') : null,
    likes: [],
    comments: [],
  });
  if (STATE.currentView === 'moments') renderMoments();
  showBanner((th ? th.name : fromRaw), '发了朋友圈:' + (text ? text.slice(0,25) + (text.length>25?'...':'') : '📷 图片'), time);
  saveState();
  // 好友自动点赞+评论
  setTimeout(() => friendsInteractOnMoment(momentId), 1500);
  return momentId; // 供调用方（parsePhone）获取真实 ID 用于 _pendingMomentImgs 映射
}

/**
 * 接收朋友圈评论
 */
export function incomingComment(momentId, fromRaw, time, text, replyTo) {
  // 优先精确匹配，其次做 includes 模糊匹配
  let moment = STATE.moments && (
    STATE.moments.find(m => m.id === momentId) ||
    STATE.moments.find(m => m.id.includes(momentId) || momentId.includes(m.id))
  );
  if (!moment) {
    // Fallback: 找最近一条动态（不局限于 user，避免评论打到错误动态）
    moment = (STATE.moments && STATE.moments.length > 0)
      ? STATE.moments[STATE.moments.length - 1]
      : null;
  }
  if (!moment) return;
  const threadId = matchThread(fromRaw);
  const th = STATE.threads[threadId];
  const name = th ? th.name : fromRaw;
  let replyToIdx = null;
  if (replyTo) {
    replyToIdx = moment.comments.findIndex(cm => cm.name === replyTo);
    if (replyToIdx < 0) replyToIdx = null;
  }
  moment.comments = moment.comments || [];
  // 去重：同名同文的评论不重复插入
  const isDup = moment.comments.some(c => c.name === name && c.text === text);
  if (isDup) return;
  moment.comments.push({ from: threadId || fromRaw, name, text, time, replyTo: replyToIdx });
  if (STATE.currentView === 'moments') renderMoments();
  saveState();
}

/**
 * 切换点赞
 */
export function toggleLike(momentId) {
  const moment = STATE.moments && STATE.moments.find(m => m.id === momentId);
  if (!moment) return;
  const idx = moment.likes.indexOf('user');
  if (idx >= 0) moment.likes.splice(idx, 1);
  else moment.likes.push('user');
  renderMoments();
  saveState();
}

/**
 * 发送朋友圈评论
 */
export async function sendMomentComment(momentId, text, replyToName) {
  const moment = STATE.moments && STATE.moments.find(m => m.id === momentId);
  if (!moment || !text.trim()) return;
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  let replyToIdx = null;
  if (replyToName) {
    replyToIdx = moment.comments.findIndex(cm => cm.name === replyToName);
    if (replyToIdx < 0) replyToIdx = null;
  }
  moment.comments = moment.comments || [];
  moment.comments.push({ from: 'user', name: '我', text: text.trim(), time: ts, replyTo: replyToIdx });
  renderMoments();
  saveState();
  // 直接调 API 生成回复,不走 ST send_textarea
  if (moment.from !== 'user') {
    // 评论的是 AI 角色的动态 → 该角色回复(用 moment.name 而不是 moment.from)
    setTimeout(() => generateAIReply(momentId, text.trim(), moment.name), 600);
  } else {
    // 评论的是用户自己的动态 → 触发 AI 社交互动
    setTimeout(() => momentAISocial(momentId), 600);
  }
}

/**
 * 好友互动（占位函数）
 */
function friendsInteractOnMoment(momentId) {
  // TODO: 实现好友自动点赞+评论逻辑
  console.log('[Phone:moment] friendsInteractOnMoment called for', momentId);
}

/**
 * 生成AI回复（占位函数）
 */
function generateAIReply(momentId, text, charName) {
  // TODO: 实现AI回复评论的逻辑
  console.log('[Phone:moment] generateAIReply called for', momentId, text, charName);
}

/**
 * 朋友圈AI社交互动（占位函数）
 */
function momentAISocial(momentId) {
  // TODO: 实现朋友圈AI社交互动逻辑
  console.log('[Phone:moment] momentAISocial called for', momentId);
}

// 将函数暴露到全局，供HTML中的onclick使用
window.renderMoments = renderMoments;
window.cleanMomentText = cleanMomentText;
window.incomingMoment = incomingMoment;
window.incomingComment = incomingComment;
window.toggleLike = toggleLike;
window.sendMomentComment = sendMomentComment;
