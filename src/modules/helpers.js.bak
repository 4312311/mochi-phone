/**
 * 辅助函数模块
 * 包含各种辅助功能函数
 */

import { STATE, loadState, saveState, DEFAULT_THREADS, mergeGlobalAvatars } from '../core/state.js';
import { renderBubbles, updatePreviews } from './chat.js';

/**
 * 行内编辑函数
 */
export function rpInlineEdit(bubbleEl, threadId, msg, msgIdx) {
  if (!bubbleEl) return;
  
  const $bubble = $(bubbleEl);
  const originalText = msg.text;
  
  // 创建编辑输入框
  const input = $('<input type="text" class="rp-inline-edit" style="width:100%;padding:5px;margin:2px 0;">');
  input.val(originalText);
  
  // 替换气泡内容为输入框
  $bubble.empty().append(input);
  
  // 聚焦并选择文本
  input.focus().select();
  
  // 处理确认编辑
  const confirmEdit = () => {
    const newText = input.val();
    if (newText.trim() && newText !== originalText) {
      msg.text = newText;
      saveState();
      renderBubbles(threadId);
      updatePreviews();
    } else {
      // 如果没有更改或文本为空，恢复原内容
      renderBubbles(threadId);
    }
  };
  
  // 绑定事件
  input.on('keypress', function(e) {
    if (e.key === 'Enter') {
      confirmEdit();
    } else if (e.key === 'Escape') {
      renderBubbles(threadId); // 取消编辑
    }
  });
  
  input.on('blur', function() {
    confirmEdit();
  });
}

/**
 * 解决通话结果
 */
export function resolveCall(result) {
  // 隐藏通话界面
  $('#rp-call-view').hide();
  
  // 记录通话结果
  if (STATE.currentThread) {
    const thread = STATE.threads[STATE.currentThread];
    if (thread) {
      const callRecord = {
        type: 'call_rec',
        result: result,
        label: result === 'answered' ? '已接听' : result === 'declined' ? '已拒绝' : '未接听',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      thread.messages.push(callRecord);
      saveState();
      
      // 如果在当前线程视图中，则重新渲染
      if (STATE.currentView === 'thread') {
        renderBubbles(STATE.currentThread);
      }
    }
  }
}

/**
 * 打开红包
 */
export function openHongbao(threadId, hongbaoId) {
  const thread = STATE.threads[threadId];
  if (!thread) return;
  
  const hongbao = thread.messages.find(msg => msg.id === hongbaoId && msg.type === 'hongbao');
  if (!hongbao || hongbao.opened) {
    return;
  }
  
  // 标记为已打开
  hongbao.opened = true;
  saveState();
  
  // 重新渲染气泡
  renderBubbles(threadId);
}

/**
 * 播放语音
 */
export function playVoice(src, duration) {
  // 模拟播放语音
  console.log(`[Raymond Phone] 播放语音: ${src}, 时长: ${duration}秒`);
  // 这里可以添加实际的音频播放逻辑
}

/**
 * 查找或创建线程
 */
export function findOrCreateThread(nameRaw) {
  // 检查是否已存在匹配的线程
  for (const th of Object.values(STATE.threads)) {
    if (th.name.toLowerCase() === nameRaw.toLowerCase()) {
      return th.id;
    }
  }

  // 检查模糊匹配
  for (const th of Object.values(STATE.threads)) {
    const thName = th.name.toLowerCase();
    if (nameRaw.toLowerCase().includes(thName) || thName.includes(nameRaw.toLowerCase())) {
      return th.id;
    }
  }

  // 创建新线程
  const id = `th_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
  const initials = nameRaw.replace(/[^\u4e00-\u9fa5a-zA-Z]/g, ' ')
                         .split(/\s+/)
                         .filter(Boolean)
                         .map(w => w.charAt(0))
                         .join('')
                         .substring(0, 2)
                         .toUpperCase();
  
  STATE.threads[id] = {
    id: id,
    name: nameRaw,
    initials: initials,
    avatarBg: `linear-gradient(145deg, hsl(${Math.random() * 360}, 70%, 60%), hsl(${Math.random() * 360}, 70%, 40%))`,
    messages: [],
    unread: 0
  };

  saveState();
  return id;
}

/**
 * 重建联系人从历史
 */
export function rebuildContactsFromHistory(chatId) {
  // 仅在指定的chatId上操作
  if (STATE.chatId !== chatId) return;

  // 从聊天历史中重建联系人
  // 这里应该从SilkyTavern的历史中获取信息
  console.log(`[Raymond Phone] 从历史重建联系人: ${chatId}`);
}

/**
 * 同步到当前聊天
 */
export function syncToCurrentChat() {
  const ctx = window.getContext ? getContext() : (window.SillyTavern?.getContext ? SillyTavern.getContext() : {});
  const newChatId = ctx?.chatId || (ctx?.characterId != null ? `char_${ctx.characterId}` : 'default');
  
  if (newChatId !== STATE.chatId) {
    // 保存当前状态
    if (STATE.chatId) {
      const _oldPersisted = (() => { try { return JSON.parse(localStorage.getItem(`rp-phone-v1-${STATE.chatId}`) || 'null'); } catch(e) { return null; } })();
      const _safeArr = (memArr, persArr) => {
        const m = memArr  || [];
        const p = persArr || [];
        return p.length > m.length ? p : m;
      };
      const _safeMoments = _safeArr(STATE.moments, _oldPersisted && _oldPersisted.moments);
      const _safeDiary   = _safeArr(STATE.diary,   _oldPersisted && _oldPersisted.diary);
      CHAT_STORE[STATE.chatId] = {
        threads: JSON.parse(JSON.stringify(STATE.threads)),
        notifications: [...STATE.notifications],
        sync: { ...STATE.sync },
        currentThread: STATE.currentThread,
        moments: JSON.parse(JSON.stringify(_safeMoments)),
        diary:   JSON.parse(JSON.stringify(_safeDiary)),
        avatars: Object.assign({}, STATE.avatars || {}),
        bankData: STATE.bankData ? JSON.parse(JSON.stringify(STATE.bankData)) : null,
      };
      const _tmpM = STATE.moments, _tmpD = STATE.diary;
      STATE.moments = _safeMoments; STATE.diary = _safeDiary;
      saveState();
      STATE.moments = _tmpM; STATE.diary = _tmpD;
    }

    // 切换到新聊天
    STATE.chatId = newChatId;
    STATE.pendingMessages = [];

    // 恢复或初始化状态
    const persisted = loadState(newChatId);
    if (persisted) {
      STATE.threads = persisted.threads || {};
      STATE.notifications = persisted.notifications || [];
      STATE.sync = persisted.sync || { stage: 1, progress: 0, status: '乖巧' };
      STATE.moments = persisted.moments || [];
      STATE.diary = persisted.diary || [];
      STATE.avatars = persisted.avatars || {};
      STATE.bankData = persisted.bankData || null;
      STATE.currentThread = null;
    } else {
      STATE.threads = DEFAULT_THREADS();
      STATE.notifications = [];
      STATE.sync = { stage: 1, progress: 0, status: '乖巧' };
      STATE.moments = [];
      STATE.diary   = [];
      STATE.avatars = {};
      STATE.bankData = null;
      STATE.currentThread = null;
    }
    
    mergeGlobalAvatars();
  }
}

// 将函数暴露到全局，供HTML中的onclick使用
window.rpInlineEdit = rpInlineEdit;
window.resolveCall = resolveCall;
window.openHongbao = openHongbao;
window.playVoice = playVoice;
window.findOrCreateThread = findOrCreateThread;