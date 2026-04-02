// ================================================================
//  MAIN ENTRY POINT
//  主入口文件 - 整合所有模块
// ================================================================

import { RP_PHONE_CSS } from './styles/css.js';
import { STATE, saveState, loadState, mergeGlobalAvatars } from './core/state.js';
import { initPhone, injectStyles, getContext, escHtml, go, refreshBadges, refreshWidget, refreshLockNotifs, hidePhoneTagsInChat, hideOocInUserBubbles, rewriteAllHistoryPhoneBlocks } from './core/init.js';
import { autoAddCharContact, cleanInvalidContacts, syncToCurrentChat, onChatChanged, rebuildContactsFromHistory, findOrCreateThread, matchThread, generateAvatarBg, addContact, renderThreadList, openThread } from './modules/chat.js';
import { addToQueue, renderPendingQueue, sendSMS, incomingMsg, showBanner, showLiveChat } from './modules/sms.js';
import { STAGE_NAMES, normNameKey, resolveNpcPersonaByName, getMomentsCtx, cleanMomentText, renderMoments, friendsInteractOnMoment, generateAIReply, momentAISocial, incomingComment } from './modules/moments.js';
import { getMomentsCtx as getMomentsCtxFull } from './modules/moments-context.js';
import { THEMES, RP_THEME_ICONS, lgRenderHomeIcons, lgApplyTheme, rpStripFrameRing, lgInitTheme, lgEnsureCustomStyleTag, lgInjectCustomCSS, lgUndoCustomCSS, toggleDarkMode, applyWallpaper } from './modules/themes.js';
import { API_SETTINGS, saveApiSettings, apiSettingsRender, apiSettingsSave, apiSettingsTest, comfyGenerate, lgCallAPI, aiCallAPI } from './modules/api-settings.js';
import { G2048, GM, GGOLD, g2048Init, g2048UserMove, g2048CharTurn, g2048GameOver, g2048Chat } from './modules/games-complete.js';
import { LG2048, g2048SlideRow, g2048Transpose, g2048RevRows, g2048Apply, g2048AddTile, g2048HasMoves, g2048BestDir } from './modules/2048-logic.js';
import { gmDraw, gmDrawItem } from './modules/gold-miner-render.js';
import { ggoldBindEvents, ggoldOpen, ggoldStartGame } from './modules/gold-miner-events.js';
import { lgInitFabDrag } from './modules/fab-drag.js';
import { lgAddChatMsg, lgWin } from './modules/game-chat.js';
import { lgGetPersona } from './modules/get-persona.js';
import { renderDiaryList, openDiaryEntry, closeDiaryView, saveDiaryEntry, deleteDiaryEntry } from './modules/diary.js';
import { XHS_TAGS, renderXhsFeed, openXhsPost, closeXhsPost, likeXhsPost, sendXhsComment, filterXhsByTag } from './modules/xiaohongshu.js';
import { renderXHSCard, renderXHSFeed as renderXHSFeedFull, openXHSDetail, postUserXHS, toggleXHSLike as toggleXHSLikeFull } from './modules/xhs-rendering.js';
import { _xhsStartEtaTimer, _xhsClearEtaTimer } from './modules/xhs-timer.js';
import { openXHSDetail as openXHSDetailFull, renderXHSDetail } from './modules/xhs-detail.js';
import { postUserXHS as postUserXHSFull } from './modules/xhs-user-post.js';
import { renderBankCard, addBankTransaction } from './modules/bank.js';
import { normalizePhoneMarkup, cleanPhoneFallbackReply, sanitizeSmsText, escapeRegExp, extractSmsSummaries, getTagAttrs, parsePhone, dataURLtoBlob } from './modules/utils.js';
import { onAIMessage, onMessageUpdatedForImages, rewritePhoneEchoInChat, rewriteAllHistoryPhoneBlocks as rewriteHistoryPhoneBlocks, hidePhoneTagsInChat as hidePhoneTags, hideOocInUserBubbles as hideOoc, beautifySMSInChat } from './modules/message-processing.js';
import { renderLockScreen, renderHomeScreen, renderThreadsView, renderThreadView, renderMomentsView, renderSettingsView, renderApiSettingsView, renderThemesView, renderGamesView, renderG2048View, renderDiaryView, renderXhsView, renderBankView, renderAddContactModal } from './modules/ui-rendering.js';
import { updateClock, makeDraggable, addLockNotif, openCompose, closeCompose, toggleAttachPanel, showHongbaoSheet, sendUserHongbao, triggerImagePick, sendImageMessage, showLocationInput, sendLocation, showDeletePicker, showAddChoice, showGroupPicker, confirmCreateGroup, incomingCall, resolveCall, incomingHongbao, openHongbao, incomingVoice, playVoice, incomingGroupMsg, populateAvatarSelect, updateAvatarPreviewSwatch, openSettings } from './modules/init-events.js';
import { lgTsUpdateActionBar, lgSaveCurrentTheme, lgRenderSavedThemes, lgApplySavedTheme, lgDeleteSavedTheme, lgRenderThemePicker, lgRenderThemeStudio, lgTsAddBubble, lgTsShowTyping, lgTsHideTyping, lgTsScrollBottom, lgTsSanitizeInput, lgTsSanitizeCSS } from './modules/theme-studio.js';
import { lgInitFabDrag, lgInit } from './modules/lg-init.js';
import { lgCoords, lgRender, lgDrawPiece, lgRoll, lgStatus, lgMsg, lgWin, cleanGameReply, lgGetPersona, lgCharComment } from './modules/game-logic.js';
import { rpInlineEdit, gameInlineEdit, diaryInlineEdit } from './modules/inline-edit.js';
import { getAvatar, setAvatar, mergeGlobalAvatars, saveGlobalAvatars, _bindAvatarUpload } from './modules/avatar-upload.js';
import { rpTriggerPendingImg } from './modules/pending-images.js';
import { renderDiary } from './modules/diary-render.js';
import { lgFillAPIView } from './modules/api-view.js';
import { lgThemeStudioSend } from './modules/theme-studio-ai.js';

// ================================================================
//  GLOBAL VARIABLES
// ================================================================

const CHAT_STORE = {};
const _AV = {};

const DEFAULT_THREADS = () => ({
  'thread_001': { id: 'thread_001', name: '林语', initials: '林', avatarBg: 'linear-gradient(145deg,#1a1a2e,#16213e)', messages: [], unread: 0 },
  'thread_002': { id: 'thread_002', name: '苏婉', initials: '苏', avatarBg: 'linear-gradient(145deg,#2e1c1c,#4e2c2c)', messages: [], unread: 0 },
  'thread_003': { id: 'thread_003', name: '陈默', initials: '陈', avatarBg: 'linear-gradient(145deg,#1c2e2e,#2c4e4e)', messages: [], unread: 0 },
});

// ================================================================
//  UI RENDERING FUNCTIONS
// ================================================================

function renderBubbles(threadId) {
  const container = $('#rp-bubbles').empty();
  const th = STATE.threads[threadId];
  if (!th) return;

  th.messages.forEach(msg => {
    const isUser = msg.from === 'user';
    const cls = isUser ? 'rp-bubble rp-bubble-user' : 'rp-bubble rp-bubble-other';
    const avHtml = !isUser ? (() => {
      const ci = STATE.avatars && STATE.avatars[msg.from];
      return ci ? `<div class="rp-bubble-av rp-av-img"><img class="rp-av-photo" src="${ci}" alt=""/></div>` : `<div class="rp-bubble-av" style="background:${th.avatarBg}">${th.initials}</div>`;
    })() : '';
    container.append(`
      <div class="${cls}">
        ${avHtml}
        <div class="rp-bubble-content">
          <div class="rp-bubble-text">${escHtml(msg.text)}</div>
          <div class="rp-bubble-time">${msg.time}</div>
        </div>
      </div>
    `);
  });
  container.scrollTop(container[0].scrollHeight);
}

function updatePreviews() {
  Object.values(STATE.threads).forEach(th => {
    const lastMsg = th.messages.at(-1);
    const senderLabel = lastMsg ? (lastMsg.from === 'user' ? '我' : th.name.split(' ')[0]) : '';
    const previewFull = lastMsg ? (senderLabel + ':' + lastMsg.text) : '暂无消息';
    const preview = previewFull.length > 28 ? previewFull.slice(0, 27) + '...' : previewFull;
    const time = lastMsg ? lastMsg.time : '';
    const badgeDisplay = th.unread > 0 ? '' : 'display:none';
    const badgeCount = th.unread;

    const previewEl = $(`#rp-tp-${th.id}`);
    const timeEl = $(`#rp-tt-${th.id}`);
    const badgeEl = $(`#rp-tbadge-${th.id}`);

    if (previewEl.length) previewEl.text(preview);
    if (timeEl.length) timeEl.text(time);
    if (badgeEl.length) {
      badgeEl.text(badgeCount);
      badgeEl.css('display', badgeDisplay);
    }
  });
}

// ================================================================
//  EVENT HANDLERS
// ================================================================

function bindEvents() {
  $(document).on('click', '#rp-fab', function(e) {
    if (e.target.closest('.rp-av-photo')) return;
    if ($('#rp-phone').is(':visible')) {
      go('lock');
    } else {
      $('#rp-phone').show();
    }
  });

  $(document).on('click', '.rp-app', function() {
    const app = $(this).data('app');
    if (app === 'messages') go('threads');
    else if (app === 'moments') { renderMoments(); go('moments'); }
    else if (app === 'settings') { apiSettingsRender(); go('settings'); }
    else if (app === 'folder-games') { G2048.init(); go('games'); }
    else if (app === 'api-settings') { apiSettingsRender(); go('api-settings'); }
    else if (app === 'themes') go('themes');
    else if (app === 'diary') { renderDiaryList(); go('diary'); }
    else if (app === 'xhs') { renderXhsFeed(); go('xhs'); }
    else if (app === 'g2048') { G2048.init(); go('g2048'); }
    else if (app === 'bank') { renderBankCard(); go('bank'); }
  });

  $(document).on('click', '#rp-back', function() {
    if (STATE.currentView === 'thread') go('threads');
    else if (STATE.currentView === 'moments' || STATE.currentView === 'diary' || STATE.currentView === 'xhs') go('home');
    else if (STATE.currentView === 'settings' || STATE.currentView === 'api-settings' || STATE.currentView === 'themes' || STATE.currentView === 'games' || STATE.currentView === 'g2048' || STATE.currentView === 'bank') go('home');
    else go('lock');
  });

  $(document).on('click', '.rp-thread', function() {
    const id = $(this).data('thread');
    openThread(id);
  });

  $(document).on('click', '#rp-send', sendSMS);
  $(document).on('click', '#rp-pending-queue', function() {
    if (STATE.pendingMessages.length > 0) sendSMS();
  });

  $(document).on('click', '.rp-like-btn', function() {
    const mid = $(this).data('moment');
    const m = STATE.moments.find(mm => mm.id === mid);
    if (!m) return;
    const idx = m.likes.indexOf('user');
    if (idx === -1) m.likes.push('user');
    else m.likes.splice(idx, 1);
    renderMoments();
    saveState();
  });

  $(document).on('click', '.rp-comment-toggle', function() {
    const mid = $(this).data('moment');
    $(`#rp-ci-${mid}`).toggle();
  });

  $(document).on('click', '.rp-moment-csend', function() {
    const mid = $(this).data('moment');
    const text = $(`#rp-ci-${mid} .rp-moment-cinput`).val().trim();
    if (!text) return;
    const now = new Date();
    const ts = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
    incomingComment(mid, 'user', ts, text, null);
    $(`#rp-ci-${mid} .rp-moment-cinput`).val('');
    $(`#rp-ci-${mid}`).hide();
    generateAIReply(mid, text);
  });

  $(document).on('click', '.rp-moment-reply-btn', function() {
    const mid = $(this).data('moment');
    const cidx = $(this).data('cidx');
    const rname = $(this).data('rname');
    const input = $(`#rp-ci-${mid} .rp-moment-cinput`);
    input.val(`@${rname} `).focus();
    STATE.xhsReplyToCidx = cidx;
  });

  $(document).on('click', '.rp-moment-del-btn', function() {
    const mid = $(this).data('moment');
    STATE.moments = STATE.moments.filter(m => m.id !== mid);
    renderMoments();
    saveState();
  });

  $(document).on('click', '.rp-moment-pending-img', async function() {
    const mid = $(this).data('mid');
    const prompt = $(this).data('prompt');
    const m = STATE.moments.find(mm => mm.id === mid);
    if (!m) return;
    m.pendingImg = null;
    m.pendingImgType = 'comfy';
    renderMoments();
    const url = await comfyGenerate(prompt);
    if (url) {
      m.img = url;
      m.pendingImg = null;
      m.pendingImgType = null;
      renderMoments();
      saveState();
    } else {
      m.pendingImg = prompt;
      m.pendingImgType = 'manual';
      renderMoments();
    }
  });

  $(document).on('click', '.rp-theme-card', function() {
    const id = $(this).data('theme');
    lgApplyTheme(id);
  });

  $(document).on('click', '#rp-dm-toggle', toggleDarkMode);

  $(document).on('click', '#rp-api-save', apiSettingsSave);
  $(document).on('click', '#rp-api-comfy-test', () => apiSettingsTest('comfy'));
  $(document).on('click', '#rp-api-lg-test', () => apiSettingsTest('lg'));
  $(document).on('click', '#rp-api-ai-test', () => apiSettingsTest('ai'));

  $(document).on('click', '.rp-diary-item', function() {
    const id = $(this).data('id');
    openDiaryEntry(id);
  });

  $(document).on('click', '#rp-diary-back', closeDiaryView);
  $(document).on('click', '#rp-diary-save', saveDiaryEntry);
  $(document).on('click', '.rp-diary-del', function(e) {
    e.stopPropagation();
    const id = $(this).data('id');
    deleteDiaryEntry(id);
  });

  $(document).on('click', '.rp-xhs-post', function() {
    const id = $(this).data('id');
    openXhsPost(id);
  });

  $(document).on('click', '#rp-xhs-back', closeXhsPost);
  $(document).on('click', '.rp-xhs-like-btn', function() {
    const id = $(this).data('id');
    likeXhsPost(id);
  });

  $(document).on('click', '.rp-xhs-csend', function() {
    const text = $('.rp-xhs-cinput').val().trim();
    if (!text) return;
    sendXhsComment(text);
    $('.rp-xhs-cinput').val('');
  });

  $(document).on('click', '.rp-xhs-reply-btn', function() {
    const cidx = $(this).data('cidx');
    const rname = $(this).data('rname');
    const input = $('.rp-xhs-cinput');
    input.val(`@${rname} `).focus();
    STATE.xhsReplyToCidx = cidx;
  });

  $(document).on('click', '.rp-xhs-tag', function() {
    const tag = $(this).text().replace('#', '');
    filterXhsByTag(tag);
  });

  $(document).on('keydown', function(e) {
    if (STATE.currentView === 'g2048') {
      if (e.key === 'ArrowUp') { G2048.move('up'); e.preventDefault(); }
      else if (e.key === 'ArrowDown') { G2048.move('down'); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { G2048.move('left'); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { G2048.move('right'); e.preventDefault(); }
    }
  });

  $(document).on('click', '#rp-2048-reset', function() {
    G2048.reset();
  });

  $(document).on('click', '#rp-add-contact', addContact);
  $(document).on('click', '#rp-add-cancel', function() {
    $('#rp-add-modal').hide();
  });

  $(document).on('click', '#rp-add-contact-btn', function() {
    $('#rp-add-modal').show();
  });
}

// ================================================================
//  INITIALIZATION
// ================================================================

lgInit();
bindEvents();
console.log('[Raymond Phone] 已加载');