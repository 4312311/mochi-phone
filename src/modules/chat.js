/**
 * 聊天模块
 * 处理线程列表、气泡渲染、消息发送等功能
 */

import { STATE } from '../core/state.js';
import { getAvatar, escHtml, getContext } from '../core/utils.js';
import { saveState } from '../core/state.js';
import { findOrCreateThread, openHongbao, playVoice } from './helpers.js';

const LC_MAX = 5;
const LC_TTL = 8000;

/**
 * 渲染线程列表
 */
export function renderThreadList() {
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

/**
 * 打开线程
 */
export function openThread(threadId) {
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

  // FIX3: 切换对话时清空待发队列
  STATE.pendingMessages = [];
  renderPendingQueue();

  renderBubbles(threadId);
  go('thread');
}

/**
 * 渲染气泡
 */
export function renderBubbles(threadId) {
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
          <div class="rp-voice-txt" style="display:block">${escHtml(msg.voiceText)}</div>
        </div>
      `));
      inner.append($('<div>').addClass('rp-bts').text(msg.time));
      wrap.append(avEl, inner);
      area.append(wrap); return;
    }
    // ── 群聊红包 (group_hongbao) ──
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
      area.append(wrap); return;
    }
    // ── user 发的红包 ──
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
      area.append(wrap); return;
    }
    // ── 图片生成占位（pending_image）──
    if (msg.type === 'pending_image') {
      const wrap = $(`<div class="rp-bwrap rp-in" data-pending-id="${escHtml(msg.id||'')}"></div>`);
      // 用 data 属性存参数，避免 prompt 含特殊字符导致 inline onclick JS 语法错误
      const pendingBtn = $(`
        <div class="rp-img-bbl rp-pending-img" style="min-width:90px;cursor:pointer;display:flex;align-items:center;justify-content:center;background:rgba(128,128,128,0.13);border-radius:12px;padding:12px 18px;gap:7px;" title="点击触发生图">
          <span style="font-size:17px;">📷</span>
          <span class="rp-pending-label" style="font-size:12px;opacity:0.75;">点击生图</span>
        </div>
      `);
      pendingBtn.data('threadid', threadId);
      pendingBtn.data('msgid', msg.id || '');
      pendingBtn.data('prompt', msg.prompt || '');
      pendingBtn.on('click', function(e) {
        e.stopPropagation();
        rpTriggerPendingImg($(this).data('threadid'), $(this).data('msgid'), $(this).data('prompt'), this);
      });
      const timeEl = $(`<div class="rp-bts">${msg.time}</div>`);
      const delBtn = $(`<button class="rp-del-btn" title="删除" data-msgidx="${msgIdx}" data-threadid="${threadId}">${DEL_SVG_EARLY}</button>`);
      wrap.append(pendingBtn, timeEl, delBtn);
      area.append(wrap); return;
    }
    // ── 图片 ──
    if (msg.type === 'image') {
      const isUser = msg.from === 'user';
      const wrap = $(`<div class="rp-bwrap ${isUser?'rp-out':'rp-in'}"></div>`);
      const imgEl = $(`<div class="rp-img-bbl"><img src="${msg.src}" alt="图片"/></div>`);
      imgEl.find('img').on('load', function() {
        const a = this.closest('#rp-bubbles'); if (a) a.scrollTop = a.scrollHeight;
      });
      const timeEl = $(`<div class="rp-bts">${msg.time}</div>`);
      const delBtn = $(`<button class="rp-del-btn" title="删除" data-msgidx="${msgIdx}" data-threadid="${threadId}">${DEL_SVG_EARLY}</button>`);
      wrap.append(imgEl, timeEl, delBtn);
      area.append(wrap); return;
    }
    // ── 位置 ──
    if (msg.type === 'location') {
      const isUser = msg.from === 'user';
      const wrap = $(`<div class="rp-bwrap ${isUser?'rp-out':'rp-in'}"></div>`);
      wrap.html(`
        <div class="rp-loc-card">
          <div class="rp-loc-ico">📍</div>
          <div class="rp-loc-txt">${escHtml(msg.place)}</div>
        </div>
        <div class="rp-bts">${msg.time}</div>
      `);
      area.append(wrap); return;
    }
    // ── user 发的红包 ──
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
      area.append(wrap); return;
    }
    // ── 普通消息 ──
    const isUser = msg.from === 'user';
    const isGrpThread = thread.type === 'group' || (threadId && threadId.startsWith('grp_'));
    const wrap = $('<div>').addClass('rp-bwrap ' + (isUser ? 'rp-out' : 'rp-in') + (isGrpThread ? ' rp-grp' : ''));

    // 通用删除按钮 SVG
    const DEL_SVG = `<svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;pointer-events:none"><path d="M3 3.5L3.7 11.5C3.75 12.05 4.2 12.5 4.75 12.5H9.25C9.8 12.5 10.25 12.05 10.3 11.5L11 3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M2 3.5H12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M5.5 3.5V2.5C5.5 2.22 5.72 2 6 2H8C8.28 2 8.5 2.22 8.5 2.5V3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><line x1="7" y1="6" x2="7" y2="10.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><line x1="5.5" y1="6.2" x2="5.8" y2="10.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><line x1="8.5" y1="6.2" x2="8.2" y2="10.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>`;

    // 通用编辑/删除按钮 SVG（铅笔）
    const EDIT_SVG_BTN = (idx, tid) => $(`<button class="rp-edit-btn" title="编辑" data-msgidx="${idx}" data-threadid="${tid}"><svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;pointer-events:none"><rect x="3.5" y="1.2" width="4" height="9.5" rx="0.8" transform="rotate(38 7 7)" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M9.8 2.5 L11.4 4.1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M3.2 9.8 L2.5 11.6 L4.3 10.9" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" opacity="0.7"/></svg></button>`);
    const DEL_BTN = (idx, tid) => $(`<button class="rp-del-btn" title="删除" data-msgidx="${idx}" data-threadid="${tid}">${DEL_SVG}</button>`);

    if (isGrpThread && isUser) {
      const uImg = getAvatar('user');
      const uAvHtml = uImg
        ? `<div class="rp-grp-av rp-av-img"><img class="rp-av-photo" src="${uImg}" alt=""/></div>`
        : `<div class="rp-grp-av" style="background:linear-gradient(145deg,#64748b,#475569)">我</div>`;
      const inner = $('<div>');
      inner.append($('<div>').addClass('rp-bubble rp-sent').text(msg.text));
      // 横排按钮组
      const btnRow = $('<div>').addClass('rp-btn-row');
      btnRow.append(EDIT_SVG_BTN(msgIdx, threadId), DEL_BTN(msgIdx, threadId));
      inner.append(btnRow);
      inner.append($('<div>').addClass('rp-bts').text(msg.time));
      // 头像放前面，内容放后面；配合 row-reverse CSS 头像会显示在右侧
      wrap.append($(uAvHtml), inner);
    } else if (isGrpThread && !isUser) {
      // 群聊中 NPC/char 消息：同样支持编辑和删除
      const charImg = STATE.avatars && STATE.avatars[msg.name] ? STATE.avatars[msg.name] : null;
      const charAvHtml = charImg
        ? `<div class="rp-grp-av rp-av-img"><img class="rp-av-photo" src="${charImg}" alt=""/></div>`
        : `<div class="rp-grp-av" style="background:${msg.avatarBg || '#7c3aed'}">${msg.initials || (msg.name ? msg.name[0] : 'C')}</div>`;
      const inner = $('<div>');
      inner.append($('<div>').addClass('rp-grp-sender').text(msg.name || ''));
      inner.append($('<div>').addClass('rp-bubble rp-recv').text(msg.text));
      // 横排按钮组
      const btnRow = $('<div>').addClass('rp-btn-row');
      btnRow.append(EDIT_SVG_BTN(msgIdx, threadId), DEL_BTN(msgIdx, threadId));
      inner.append(btnRow);
      inner.append($('<div>').addClass('rp-bts').text(msg.time));
      wrap.append($(charAvHtml), inner);
    } else {
      // 渲染时清除生图触发词（image###...###、<pic> 等），避免显示为乱文
      const displayText = (msg.text || '')
        .replace(/image###[\s\S]*?###/gi, '')
        .replace(/<pic\b[^>]*>[\s\S]*?<\/pic>/gi, '')
        .replace(/<pic\b[\s\S]*?\/>/gi, '')
        .replace(/<img\b(?![^>]*\bsrc=)[^>]*>/gi, '')
        .trim();
      const bbl = $('<div>').addClass('rp-bubble ' + (isUser ? 'rp-sent' : 'rp-recv')).text(displayText);
      const ts  = $('<div>').addClass('rp-bts').text(msg.time);
      // 横排按钮组
      const btnRow = $('<div>').addClass('rp-btn-row');
      btnRow.append(EDIT_SVG_BTN(msgIdx, threadId), DEL_BTN(msgIdx, threadId));
      wrap.append(bbl, btnRow, ts);
    }
    area.append(wrap);
  });

  // 先同步滚一次，再 setTimeout 等 DOM & 图片布局稳定后再滚一次
  area.scrollTop(area[0].scrollHeight);
  setTimeout(function() {
    var el = area[0];
    if (el) el.scrollTop = el.scrollHeight;
  }, 80);
}

/**
 * 触发生图（智绘姬）
 */
export function rpTriggerPendingImg(threadId, msgId, prompt, triggerEl) {
  // triggerEl: 被点击的 .rp-pending-img DOM 元素（由 jQuery .on('click') 传入）
  try {
  // 1) 在主楼聊天里找包含这个 prompt 的智绘姬按钮，点击它触发生图
  //    智绘姬按钮是 <button class="image-tag-button st-chatu8-image-button" data-link="prompt">
  let triggered = false;
  const btns = document.querySelectorAll('button.st-chatu8-image-button, button.image-tag-button');
  for (const btn of btns) {
    const btnPrompt = (btn.getAttribute('data-link') || btn.getAttribute('data-prompt') || btn.textContent || '').trim();
    if (btnPrompt && prompt && (
      btnPrompt.includes(prompt.slice(0, 30)) ||
      prompt.includes(btnPrompt.slice(0, 30))
    )) {
      STATE._suppressClose = Date.now();
      btn.click();
      triggered = true;
      console.log('[Phone:pendingImg] 已触发智绘姬按钮点击', { prompt: prompt.slice(0, 50) });
      break;
    }
  }

  if (!triggered) {
    // 2) 没找到对应按钮：点最后一条 AI 消息里的第一个未生成的智绘姬按钮
    const allBtns = Array.from(document.querySelectorAll('button.st-chatu8-image-button, button.image-tag-button'));
    const pending = allBtns.filter(b => b.getAttribute('data-loading') !== 'false' && !b.querySelector('img'));
    if (pending.length > 0) {
      STATE._suppressClose = Date.now();
      pending[0].click();
      triggered = true;
      console.log('[Phone:pendingImg] 兜底：点击第一个未完成的智绘姬按钮');
    }
  }

  if (!triggered) {
    console.warn('[Phone:pendingImg] 未找到可触发的智绘姬按钮，prompt=', prompt);
    if (triggerEl) triggerEl.innerHTML = '<span style="font-size:12px;opacity:0.6;">⚠️ 请在主楼手动点击生图按钮</span>';
    return;
  }

  // 3) 触发成功：把这个请求加入等待队列，MutationObserver 收到图片后来消费
  window.rpImgWaitQueue = window.rpImgWaitQueue || [];
  window.rpImgWaitQueue.push({ threadId, pendingMsgId: msgId, prompt, addedAt: Date.now() });
  console.log('[Phone:pendingImg] 已加入等待队列', { threadId, msgId, queueLen: window.rpImgWaitQueue.length });

  // 更新气泡显示为"生成中..."
  if (triggerEl) {
    triggerEl.innerHTML = '<span style="font-size:17px;">⏳</span><span style="font-size:12px;opacity:0.7;"> 生成中…</span>';
    triggerEl.style.cursor = 'default';
    triggerEl.style.pointerEvents = 'none';
  }
  } catch(err) {
    console.error('[Phone:pendingImg] 触发生图时出错', err);
  }
}

/**
 * 发送短信
 */
export function sendSMS() {
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
  // 修复:mainCharName 为空时,仅将内置线程 raymond/gaspard 视为主角,避免把所有 NPC 错误归为主角
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
    // 将 smsLine 和 oocText 合并注入,用户聊天框不显示任何提示语
    setExtensionPrompt('rp-phone-ooc', `${smsLine}\n${oocText}`, extension_prompt_types.BEFORE_PROMPT, 0, false, 0);
    console.log('[Raymond Phone] setExtensionPrompt called with BEFORE_PROMPT, depth=0');
    ta.value = mainText || '';
  } else {
    // 降级:OOC 直接写入消息(旧版 ST 兼容)
    // 只把 smsLine 写入输入框(可见叙事行),oocText 不放进去以免显示在气泡里
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
  // (防止 setExtensionPrompt 不可用时 OOC 文字暴露给用户)
  setTimeout(function() {
    try {
      const allUserMsgs = document.querySelectorAll('.mes[is_user="true"]');
      if (!allUserMsgs.length) return;
      const lastUserMsg = allUserMsgs[allUserMsgs.length - 1];
      const textEl = lastUserMsg && lastUserMsg.querySelector('.mes_text');
      if (!textEl) return;
      // 把 [...] 形式的 OOC 指令行从 innerHTML 里删掉
      let html = textEl.innerHTML || '';
      // 匹配 [手机短信提示:...] / [叙事指令:...] / [手机群聊提示:...] 及其 HTML 转义变体
      html = html.replace(/\[(?:手机短信提示|叙事指令|手机群聊提示)[^\]]*\]/g, '');
      // 清理多余换行/br
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

/**
 * 渲染待发队列
 */
export function renderPendingQueue() {
  const queueContainer = $('#rp-pending-queue');
  if (!queueContainer.length) return;
  
  queueContainer.empty();
  
  if (STATE.pendingMessages && STATE.pendingMessages.length > 0) {
    STATE.pendingMessages.forEach((msg, idx) => {
      queueContainer.append(`
        <div class="rp-pending-item">
          <span>${msg.text.substring(0, 30)}${msg.text.length > 30 ? '...' : ''}</span>
        </div>
      `);
    });
    
    if (STATE.pendingMessages.length > 3) {
      queueContainer.append(`
        <div class="rp-pending-hint">还有 ${STATE.pendingMessages.length - 3} 条待发送...</div>
      `);
    }
  }
}

/**
 * 刷新徽章
 */
export function refreshBadges() {
  let total = 0;
  Object.values(STATE.threads).forEach(th => {
    const badgeEl = $(`#rp-tbadge-${th.id}`);
    const previewEl = $(`#rp-tp-${th.id}`);
    const timeEl = $(`#rp-tt-${th.id}`);
    
    if (badgeEl.length) {
      th.unread > 0 ? badgeEl.text(th.unread).show() : badgeEl.hide();
    }
    
    if (previewEl.length) {
      const lastMsg = th.messages.at(-1);
      const senderLabel = lastMsg ? (lastMsg.from === 'user' ? '我' : th.name.split(' ')[0]) : '';
      const previewFull = lastMsg ? (senderLabel + ':' + lastMsg.text) : '暂无消息';
      const preview = previewFull.length > 28 ? previewFull.slice(0, 27) + '...' : previewFull;
      previewEl.text(preview);
      
      if (timeEl.length && lastMsg) {
        timeEl.text(lastMsg.time);
      }
    }
    
    total += th.unread;
  });
  total > 0 ? $('#rp-main-badge').text(total).show() : $('#rp-main-badge').hide();
}

/**
 * 更新预览
 */
export function updatePreviews() {
  Object.values(STATE.threads).forEach(th => {
    const previewEl = $(`#rp-tp-${th.id}`);
    const timeEl = $(`#rp-tt-${th.id}`);
    
    if (previewEl.length) {
      const lastMsg = th.messages.at(-1);
      const senderLabel = lastMsg ? (lastMsg.from === 'user' ? '我' : th.name.split(' ')[0]) : '';
      const previewFull = lastMsg ? (senderLabel + ':' + lastMsg.text) : '暂无消息';
      const preview = previewFull.length > 28 ? previewFull.slice(0, 27) + '...' : previewFull;
      previewEl.text(preview);
      
      if (timeEl.length && lastMsg) {
        timeEl.text(lastMsg.time);
      }
    }
  });
}

/**
 * 接收消息
 */
export function incomingMsg(threadId, text, time) {
  const th = STATE.threads[threadId];
  if (!th) return;

  // 去重:相同 from+text 在近期消息中不重复插入(time 可能略有不同)
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
  saveState(); // FIX2: 持久化收到的消息
}

/**
 * 显示横幅通知
 */
export function showBanner(from, text, time) {
  // 短时去重:同 from+text 在 3s 内不重复弹出
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

/**
 * 显示实时聊天气泡
 */
export function showLiveChat(name, avatarBg, customImg, text) {
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

// 将函数暴露到全局，供HTML中的onclick使用
window.renderThreadList = renderThreadList;
window.openThread = openThread;
window.renderBubbles = renderBubbles;
window.rpTriggerPendingImg = rpTriggerPendingImg;
window.sendSMS = sendSMS;
window.renderPendingQueue = renderPendingQueue;
window.refreshBadges = refreshBadges;
window.updatePreviews = updatePreviews;
window.incomingMsg = incomingMsg;
window.showBanner = showBanner;
window.showLiveChat = showLiveChat;

/**
 * 页面跳转函数
 */
export function go(view) {
  $('.rp-view').hide();
  $(`#rp-view-${view}`).show();
  STATE.currentView = view;
  saveState();
}

/**
 * 添加到队列
 */
export function addToQueue() {
  const input = $('#rp-input');
  const text = input.val().trim();
  if (!text) return;
  
  // 添加到待发消息队列
  STATE.pendingMessages = STATE.pendingMessages || [];
  STATE.pendingMessages.push({
    text: text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
  
  input.val('');
  renderPendingQueue();
}

/**
 * 显示添加选择
 */
export function showAddChoice() {
  $('#rp-add-choice').show();
}

/**
 * 切换附件面板
 */
export function toggleAttachPanel() {
  const panel = $('#rp-attach-panel');
  if (panel.is(':visible')) {
    panel.hide();
  } else {
    panel.show();
  }
}

/**
 * 添加联系人
 */
export function addContact() {
  // 实现添加联系人的逻辑
  $('#rp-add-modal').hide();
}

/**
 * 打开设置
 */
export function openSettings() {
  go('settings');
}

/**
 * 刷新徽章
 */
/**
 * 刷新小部件
 */
export function refreshWidget() {
  // 刷新主页小部件
}

/**
 * 刷新锁屏通知
 */
export function refreshLockNotifs() {
  // 刷新锁屏通知
}

/**
 * 隐藏聊天标签
 */
export function hidePhoneTagsInChat() {
  // 隐藏聊天中的手机标签
}

/**
 * 刷新锁屏通知
 */

/**
 * 渲染待发队列
 */
/**
 * 渲染日记
 */
export function renderDiary() {
  var container = $('#rp-diary-list').empty();
  var entries = (STATE.diary || []).slice().reverse();
  if (!entries.length) {
    container.append('<div class="rp-diary-empty">暂无日记，按上方按钮生成或自己写一篇</div>');
    return;
  }
  var _ctx = getContext();
  var charName = _ctx && _ctx.name2 ? _ctx.name2 : 'TA';
  var charAvatarBg = 'linear-gradient(145deg,#7c3aed,#0891b2)';
  entries.forEach(function(e) {
    var isAI = e.author === 'ai';
    var authorLabel = isAI ? charName : '我';
    var replyHtml = '';
    if (!isAI && e.reply) {
      replyHtml = '<div class="rp-diary-reply"><div class="rp-diary-reply-name">' + escHtml(charName)
        + '<button class="rp-diary-edit-btn" onclick="diaryInlineEdit(this,\'' + e.id + '\')" title="编辑"><svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;pointer-events:none"><rect x="3.5" y="1.2" width="4" height="9.5" rx="0.8" transform="rotate(38 7 7)" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M9.8 2.5 L11.4 4.1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M3.2 9.8 L2.5 11.6 L4.3 10.9" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" opacity="0.7"/><circle cx="5.5" cy="5.5" r="0" fill="none"/></svg></button></div>'
        + '<div class="rp-diary-reply-text">' + escHtml(e.reply) + '</div></div>';
    }
    container.append(
      '<div class="rp-diary-entry">'
      + '<div class="rp-diary-hd">'
      + '<div class="rp-diary-meta"><div class="rp-diary-author">' + authorLabel + '</div>'
      + '<div class="rp-diary-date">' + escHtml(e.date) + ' ' + escHtml(e.time) + '</div></div></div>'
      + '<div class="rp-diary-body">' + escHtml(e.text) + '</div>'
      + replyHtml
      + '</div>'
    );
  });
}

/**
 * 日记行内编辑
 */
export function diaryInlineEdit(button, entryId) {
  const entry = STATE.diary.find(e => e.id === entryId);
  if (!entry) return;
  
  const replyDiv = $(button).closest('.rp-diary-reply').find('.rp-diary-reply-text');
  const originalText = replyDiv.text();
  
  const input = $('<input type="text" class="rp-diary-edit-input" style="width:100%;padding:5px;margin:2px 0;border:1px solid #ccc;border-radius:4px;">');
  input.val(originalText);
  
  replyDiv.empty().append(input);
  
  input.focus().select();
  
  const saveEdit = () => {
    const newText = input.val();
    if (newText.trim() && newText !== originalText) {
      entry.reply = newText;
      saveState();
      renderDiary();
    } else {
      renderDiary(); // 恢复原状
    }
  };
  
  input.on('keypress', function(e) {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      renderDiary(); // 取消编辑
    }
  });
  
  input.on('blur', function() {
    saveEdit();
  });
}

// 将函数暴露到全局，供HTML中的onclick使用
window.diaryInlineEdit = diaryInlineEdit;