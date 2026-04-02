// ================================================================
//  STATE MANAGEMENT
// ================================================================

import { getContext, _extSettings, _saveSettings, EXT_KEY } from './utils.js';

// DEFAULT THREADS FACTORY
function DEFAULT_THREADS() {
  // 不硬编码联系人:联系人由 AI 发信时动态创建,每个对话框完全隔离
  return {};
}

// STATE
export const STATE = {
  currentView: 'lock',
  currentThread: null,
  threads: DEFAULT_THREADS(),
  notifications: [],
  sync: { stage: 1, progress: 0, status: '乖巧' },
  chatId: null,
  pendingMessages: [], // FIX3: 多条消息队列
  moments: [],
  xhsFeed: [],
  xhsCurrentPost: null,
  xhsSelectedTag: '日常',
  xhsReplyToCidx: null,
  bankData: null,          // 银行卡资产数据，按 chatId 独立
  wallpaper: null,
  darkMode: false,
  avatars: {},
  _lastAiFingerprint: null,
};

// FIX2: 按 chatId 存储各窗口的手机状态(内存缓存)
export const CHAT_STORE = {};

// 头像模块级缓存--独立于 STATE.avatars,不受 chatId 切换影响
// 所有读头像的地方统一调 getAvatar(key),写头像调 setAvatar(key, dataUrl)
const _AV = {};
export function getAvatar(key) {
  // window._rpAV 最高优先级,不受任何闭包/STATE切换影响
  if (window._rpAV && window._rpAV[key]) return window._rpAV[key];
  if (_AV[key]) return _AV[key];
  if (STATE.avatars && STATE.avatars[key]) {
    setAvatar(key, STATE.avatars[key]);
    return STATE.avatars[key];
  }
  return null;
}

export function setAvatar(key, dataUrl) {
  window._rpAV = window._rpAV || {};
  window._rpAV[key] = dataUrl;
  _AV[key] = dataUrl;
  STATE.avatars = STATE.avatars || {};
  STATE.avatars[key] = dataUrl;
}

// 自动将当前对话的 char 加入联系人(每个对话框独立,无需开场白 <PHONE> 标签)
export function autoAddCharContact() {
  try {
    const ctx = getContext();
    // 必须有真实 chatId(排除 ST 初始页面 / 无对话状态)
    if (!ctx?.chatId) return;
    const charName = ctx?.name2 || (ctx?.characters && ctx?.characterId !== undefined
      ? ctx.characters[ctx.characterId]?.name : null);
    if (!charName) return;
    // 过滤无效名字:SillyTavern 本身、空白、纯数字
    const invalid = /^(sillytavern|tavern|system|assistant|ai)$/i;
    if (invalid.test(charName.trim())) return;
    // 已存在则跳过
    const exists = Object.values(STATE.threads).some(t =>
      t.name && t.name.toLowerCase() === charName.toLowerCase()
    );
    if (exists) return;
    findOrCreateThread(charName);
    console.log('[Phone] 自动添加联系人:', charName);
  } catch(e) { /* ignore */ }
}

// 清理无效联系人(SillyTavern 本身、旧硬编码遗留等)
export function cleanInvalidContacts() {
  const invalid = /^(sillytavern|tavern|system|assistant|ai)$/i;
  let changed = false;
  Object.keys(STATE.threads).forEach(function(k) {
    const name = (STATE.threads[k] && STATE.threads[k].name) || '';
    if (invalid.test(name.trim())) {
      delete STATE.threads[k];
      changed = true;
      console.log('[Phone] 清理无效联系人:', name);
    }
  });
  return changed;
}

// 防御性同步:打开手机时确保 STATE 与当前 ST 对话一致
// 不依赖 CHAT_CHANGED 是否触发
export function syncToCurrentChat(renderThreadListFunc, refreshBadgesFunc, refreshWidgetFunc, refreshLockNotifsFunc, goFunc, rebuildContactsFromHistoryFunc) {
  const ctx = getContext();
  const newChatId = ctx?.chatId || (ctx?.characterId != null ? 'char_' + ctx.characterId : 'default');
  if (newChatId === STATE.chatId) return; // 已一致,跳过

  // 切换前把当前头像备份到 _AV(防止切换后丢失)
  Object.assign(_AV, STATE.avatars || {});

  console.log('[Phone] syncToCurrentChat:', STATE.chatId, '->', newChatId);

  // 保存旧窗口状态
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
      threads:       JSON.parse(JSON.stringify(STATE.threads)),
      notifications: [...STATE.notifications],
      sync:          { ...STATE.sync },
      currentThread: STATE.currentThread,
      moments:       JSON.parse(JSON.stringify(_safeMoments)),
      diary:         JSON.parse(JSON.stringify(_safeDiary)),
      avatars:       Object.assign({}, STATE.avatars || {}),
      bankData:      STATE.bankData ? JSON.parse(JSON.stringify(STATE.bankData)) : null,
    };
    const _tmpM = STATE.moments, _tmpD = STATE.diary;
    STATE.moments = _safeMoments; STATE.diary = _safeDiary;
    saveState();
    STATE.moments = _tmpM; STATE.diary = _tmpD;
  }

  // 切到新窗口
  STATE.chatId = newChatId;
  STATE.pendingMessages = [];

  if (CHAT_STORE[newChatId]) {
    const s = CHAT_STORE[newChatId];
    STATE.threads       = s.threads || {};
    STATE.notifications = s.notifications || [];
    STATE.sync          = Object.assign({}, s.sync);
    STATE.moments       = JSON.parse(JSON.stringify(s.moments || []));
    STATE.diary         = JSON.parse(JSON.stringify(s.diary   || []));
    STATE.avatars       = Object.assign({}, s.avatars || {});
    STATE.currentThread = s.currentThread || null;
    STATE.bankData      = s.bankData ? JSON.parse(JSON.stringify(s.bankData)) : null;
  } else {
    const persisted = loadState(newChatId);
    if (persisted) {
      STATE.threads       = persisted.threads || {};
      STATE.notifications = persisted.notifications || [];
      STATE.sync          = persisted.sync || { stage: 1, progress: 0, status: '乖巧' };
      STATE.moments       = persisted.moments || [];
      STATE.diary         = persisted.diary   || [];
      STATE.avatars       = persisted.avatars || {};
      STATE.bankData      = persisted.bankData || null;
    } else {
      STATE.threads       = {};
      STATE.notifications = [];
      STATE.sync          = { stage: 1, progress: 0, status: '乖巧' };
      STATE.moments       = [];
      STATE.diary         = [];
      STATE.avatars       = {};
      STATE.bankData      = null;
    }
    STATE.currentThread = null;
  }
  mergeGlobalAvatars();

  cleanInvalidContacts();
  autoAddCharContact();
  goFunc('lock');
  renderThreadListFunc();
  refreshBadgesFunc();
  refreshWidgetFunc();
  refreshLockNotifsFunc();
  // 延迟重建:等 ctx.chat 加载完成
  var _rebuildId = STATE.chatId;
  setTimeout(function() { rebuildContactsFromHistoryFunc(_rebuildId); }, 500);
}

// 从聊天历史重建联系人(聊天记录保存在服务端,所有设备加载同一对话时自动同步)
export function rebuildContactsFromHistory(chatId) {
  try {
    const ctx = getContext();
    const currentId = ctx?.chatId || (ctx?.characterId != null ? 'char_' + ctx.characterId : 'default');
    if (currentId !== chatId) return; // chatId 已变,放弃
    const msgs = ctx?.chat || [];
    let changed = false;
    msgs.filter(function(m) { return !m.is_user && m.mes; }).forEach(function(m) {
      const phoneMatch = m.mes.match(/<PHONE>([\s\S]*?)<\/PHONE>/i);
      if (!phoneMatch) return;
      const block = phoneMatch[1];
      const re = /<(?:SMS|MOMENTS|COMMENT)[^>]+FROM="([^"]+)"/gi;
      let ma;
      while ((ma = re.exec(block)) !== null) {
        const fromRaw = ma[1].trim();
        const invalid = /^(sillytavern|tavern|system|assistant|ai)$/i;
        if (invalid.test(fromRaw)) continue;
        const exists = Object.values(STATE.threads).some(function(t) {
          return t.name && t.name.toLowerCase() === fromRaw.toLowerCase();
        });
        if (!exists) { findOrCreateThread(fromRaw); changed = true; }
      }
    });
    if (changed) { cleanInvalidContacts(); renderThreadList(); saveState(); }
  } catch(e) { console.warn('[Phone] rebuildContacts error', e); }
}

// HELPER: findOrCreateThread
export function findOrCreateThread(nameRaw) {
  const lower = nameRaw.toLowerCase();
  for (const th of Object.values(STATE.threads)) {
    if (th.name && th.name.toLowerCase() === lower) return th;
  }
  const _colors = ['#7c3aed','#0891b2','#0d9488','#b45309','#be185d','#1d4ed8'];
  const colorIdx = Object.keys(STATE.threads).length % _colors.length;
  const tempId = `contact_${lower.replace(/\s+/g, '_')}`;
  if (!STATE.threads[tempId]) {
    STATE.threads[tempId] = {
      id: tempId, name: nameRaw,
      initials: nameRaw.slice(0, 2),
      avatarBg: `linear-gradient(145deg,${_colors[colorIdx]},${_colors[(colorIdx+1)%_colors.length]})`,
      type: 'contact', messages: [], unread: 0
    };
  }
  return STATE.threads[tempId];
}

// 从全局 key 合并头像(sessionStorage 优先,localStorage 兜底)
export function mergeGlobalAvatars() {
  try {
    const raw = sessionStorage.getItem('rp-phone-avatars-global')
             || localStorage.getItem('rp-phone-avatars-global');
    if (!raw) return;
    const parsed = JSON.parse(raw);
    STATE.avatars = Object.assign({}, STATE.avatars || {}, parsed);
  } catch(e) {}
}

// 持久化头像到 sessionStorage(不受 localStorage 配额限制)
export function saveGlobalAvatars() {
  try {
    const json = JSON.stringify(STATE.avatars || {});
    sessionStorage.setItem('rp-phone-avatars-global', json);
    console.log('[Phone:av] saved to sessionStorage, keys:', Object.keys(STATE.avatars || {}));
  } catch(e) {
    console.warn('[Phone:av] sessionStorage save failed:', e);
  }
  try { localStorage.setItem('rp-phone-avatars-global', JSON.stringify(STATE.avatars || {})); } catch(e) {}
}

export function saveState() {
  if (!STATE.chatId) return;
  try {
    const threads = JSON.parse(JSON.stringify(STATE.threads));
    for (const th of Object.values(threads)) {
      if (th.messages) {
        if (th.messages.length > 100) th.messages = th.messages.slice(-100);
        th.messages = th.messages.map(m =>
          (m.type === 'image' && m.src?.startsWith('data:')) ? { ...m, src: '__img_expired__' } : m
        );
      }
    }
    const moments = (STATE.moments || []).slice(-50);
    const payload = {
      threads,
      notifications: STATE.notifications,
      sync: STATE.sync,
      moments,
      diary: STATE.diary || [],
      darkMode: STATE.darkMode,
      avatars: Object.assign({}, _AV),
      currentView: STATE.currentView || 'home',
      currentThread: STATE.currentThread || null,
      bankData: STATE.bankData || null,
    };
    const jsonStr = JSON.stringify(payload);
    try {
      localStorage.setItem(`rp-phone-v1-${STATE.chatId}`, jsonStr);
    } catch(q) {
      try {
        const curKey = `rp-phone-v1-${STATE.chatId}`;
        Object.keys(localStorage).forEach(k => {
          if (k.startsWith('rp-phone-v1-') && k !== curKey) localStorage.removeItem(k);
        });
        localStorage.setItem(curKey, jsonStr);
        console.log('[Phone] saveState: cleared old keys, retry ok');
      } catch(q2) {
        console.warn('[Raymond Phone] saveState failed even after cleanup', q2);
      }
    }
    const es = _extSettings();
    if (es) {
      if (!es[EXT_KEY]) es[EXT_KEY] = {};
      es[EXT_KEY][STATE.chatId] = payload;
      _saveSettings();
    }
  } catch(e) { console.warn('[Raymond Phone] saveState failed', e); }
}

export function loadState(chatId) {
  try {
    const es = _extSettings();
    if (es && es[EXT_KEY] && es[EXT_KEY][chatId]) {
      try { localStorage.setItem(`rp-phone-v1-${chatId}`, JSON.stringify(es[EXT_KEY][chatId])); } catch(e) {}
      return es[EXT_KEY][chatId];
    }
    const raw = localStorage.getItem(`rp-phone-v1-${chatId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (es) {
        if (!es[EXT_KEY]) es[EXT_KEY] = {};
        es[EXT_KEY][chatId] = parsed;
        _saveSettings();
      }
      return parsed;
    }
    return null;
  } catch(e) { return null; }
}

// 临时引用，需要在主模块中注入
let renderThreadList = null;
export function setRenderThreadList(fn) { renderThreadList = fn; }
