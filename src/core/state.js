// ================================================================
//  STATE MANAGEMENT
//  状态管理模块
// ================================================================

function DEFAULT_THREADS() {
  return {};
}

const STATE = {
  currentView: 'lock',
  currentThread: null,
  threads: DEFAULT_THREADS(),
  notifications: [],
  sync: { stage: 1, progress: 0, status: '乖巧' },
  chatId: null,
  pendingMessages: [],
  moments: [],
  xhsFeed: [],
  xhsCurrentPost: null,
  xhsSelectedTag: '日常',
  xhsReplyToCidx: null,
  bankData: null,
  wallpaper: null,
  darkMode: false,
  avatars: {},
  _lastAiFingerprint: null,
};

const CHAT_STORE = {};

const _AV = {};

function getAvatar(key) {
  if (window._rpAV && window._rpAV[key]) return window._rpAV[key];
  if (_AV[key]) return _AV[key];
  if (STATE.avatars && STATE.avatars[key]) {
    setAvatar(key, STATE.avatars[key]);
    return STATE.avatars[key];
  }
  return null;
}

function setAvatar(key, dataUrl) {
  window._rpAV = window._rpAV || {};
  window._rpAV[key] = dataUrl;
  _AV[key] = dataUrl;
  STATE.avatars = STATE.avatars || {};
  STATE.avatars[key] = dataUrl;
}

function mergeGlobalAvatars() {
  if (!window._rpAV) return;
  Object.keys(window._rpAV).forEach(k => {
    if (!STATE.avatars[k]) {
      STATE.avatars[k] = window._rpAV[k];
    }
  });
}

function saveState() {
  try {
    const data = {
      threads: STATE.threads,
      notifications: STATE.notifications,
      sync: STATE.sync,
      currentThread: STATE.currentThread,
      moments: STATE.moments,
      diary: STATE.diary,
      xhsFeed: STATE.xhsFeed,
      avatars: STATE.avatars,
      bankData: STATE.bankData,
      wallpaper: STATE.wallpaper,
      darkMode: STATE.darkMode,
    };
    localStorage.setItem(`rp-phone-v1-${STATE.chatId}`, JSON.stringify(data));
  } catch(e) {
    console.warn('[Phone] saveState error:', e);
  }
}

function loadState(chatId) {
  try {
    const raw = localStorage.getItem(`rp-phone-v1-${chatId}`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch(e) {
    console.warn('[Phone] loadState error:', e);
    return null;
  }
}