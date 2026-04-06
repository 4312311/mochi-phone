// ================================================================
//  MESSAGES MODULE
// ================================================================

// Group colors
const GROUP_COLORS = [
  '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7',
  '#dfe6e9', '#e17055', '#00b894', '#6c5ce7', '#a29bfe'
];

// State
let STATE = {
  currentView: 'lock',
  currentThread: null,
  threads: {},
  notifications: [],
  sync: { stage: 1, progress: 0, status: '乖巧' },
  chatId: null,
  pendingMessages: [], // 多条消息队列
  moments: [],
  xhsFeed: [],
  xhsCurrentPost: null,
  xhsSelectedTag: '日常',
  xhsReplyToCidx: null,
  bankData: null,          // 银行卡资产数据，按 chatId 独立
  wallpaper: null,
  darkMode: false,
  avatars: {},
  settings: {
    userAvatar: '',
    userName: '我'
  },
  _lastAiFingerprint: null
};

// Chat store for caching different chat states
const CHAT_STORE = {};

// Get current character ID
function getCurrentCharacterId() {
  try {
    if (window.SillyTavern && window.SillyTavern.getContext) {
      const context = window.SillyTavern.getContext();
      return context?.chatId || (context?.characterId != null ? `char_${context.characterId}` : 'default');
    }
  } catch(e) {
    console.error('[Messages] Failed to get current character:', e);
  }
  return 'default';
}

// Get state key for current character
function getStateKey() {
  return `rp_state_${getCurrentCharacterId()}`;
}

// Load state from localStorage
function loadState() {
  try {
    const stateKey = getStateKey();
    console.log('[Messages] Loading state with key:', stateKey);
    const saved = localStorage.getItem(stateKey);
    if (saved) {
      const loadedState = JSON.parse(saved);
      // 直接使用加载的状态，包括chatId
      STATE = loadedState;
      // 确保状态结构完整
      if (!STATE.threads) STATE.threads = {};
      if (!STATE.avatars) STATE.avatars = {};
      if (!STATE.settings) {
        STATE.settings = {
          userAvatar: '',
          userName: '我'
        };
      }
      if (!STATE.notifications) STATE.notifications = [];
      if (!STATE.sync) STATE.sync = { stage: 1, progress: 0, status: '乖巧' };
      if (!STATE.pendingMessages) STATE.pendingMessages = [];
      if (!STATE.moments) STATE.moments = [];
      if (!STATE.xhsFeed) STATE.xhsFeed = [];
      if (STATE.xhsCurrentPost === undefined) STATE.xhsCurrentPost = null;
      if (!STATE.xhsSelectedTag) STATE.xhsSelectedTag = '日常';
      if (STATE.xhsReplyToCidx === undefined) STATE.xhsReplyToCidx = null;
      if (STATE.bankData === undefined) STATE.bankData = null;
      if (STATE.wallpaper === undefined) STATE.wallpaper = null;
      if (STATE.darkMode === undefined) STATE.darkMode = false;
      if (STATE.currentView === undefined) STATE.currentView = 'lock';
      if (STATE.currentThread === undefined) STATE.currentThread = null;
      if (STATE._lastAiFingerprint === undefined) STATE._lastAiFingerprint = null;
      if (STATE.chatId === undefined) {
        STATE.chatId = getCurrentCharacterId();
      }
    } else {
      // Initialize empty state for new character
      STATE = {
        currentView: 'lock',
        currentThread: null,
        threads: {},
        notifications: [],
        sync: { stage: 1, progress: 0, status: '乖巧' },
        chatId: getCurrentCharacterId(),
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
        settings: {
          userAvatar: '',
          userName: '我'
        },
        _lastAiFingerprint: null
      };
    }
  } catch(e) {
    console.error('[Messages] Failed to load state:', e);
    // Initialize empty state on error
    STATE = {
      currentView: 'lock',
      currentThread: null,
      threads: {},
      notifications: [],
      sync: { stage: 1, progress: 0, status: '乖巧' },
      chatId: getCurrentCharacterId(),
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
      settings: {
        userAvatar: '',
        userName: '我'
      },
      _lastAiFingerprint: null
    };
  }
  console.log('[Messages] Loaded state:', {
    threads: Object.keys(STATE.threads).length,
    chatId: STATE.chatId
  });
}

// Save state to localStorage
function saveState() {
  try {
    const stateKey = getStateKey();
    console.log('[Messages] Saving state with key:', stateKey);
    console.log('[Messages] State to save:', {
      threads: Object.keys(STATE.threads).length,
      chatId: STATE.chatId
    });
    localStorage.setItem(stateKey, JSON.stringify(STATE));
    console.log('[Messages] State saved successfully');
  } catch(e) {
    console.error('[Messages] Failed to save state:', e);
  }
}

// Get state
function getSTATE() {
  return STATE;
}

// Sync to current chat
function syncToCurrentChat() {
  // 重试获取字符ID，直到获取到非default的字符ID
  function trySync() {
    // 使用getCurrentCharacterId函数来获取当前字符ID，确保与其他函数使用相同的逻辑
    const newChatId = getCurrentCharacterId();
    
    console.log('[Messages] syncToCurrentChat: trying to sync to', newChatId);
    
    if (newChatId === 'default') {
      // 还没有获取到字符ID，继续重试
      console.log('[Messages] Waiting for character to load...');
      setTimeout(trySync, 500);
      return;
    }
    
    if (newChatId === STATE.chatId) {
      console.log('[Messages] syncToCurrentChat: already synced to', newChatId);
      return; // 已一致,跳过
    }

    console.log('[Messages] syncToCurrentChat:', STATE.chatId, '->', newChatId);

    // 切换前把当前头像备份到 _AV(防止切换后丢失)
    Object.assign(_AV, STATE.avatars || {});

    // 保存旧窗口状态
    if (STATE.chatId) {
      // 保存旧状态到CHAT_STORE
      CHAT_STORE[STATE.chatId] = {
        threads: JSON.parse(JSON.stringify(STATE.threads)),
        avatars: Object.assign({}, STATE.avatars || {}),
        settings: Object.assign({}, STATE.settings || {})
      };
      
      // 保存旧状态到localStorage，使用旧的状态键
      const oldStateKey = `rp_state_${STATE.chatId}`;
      console.log('[Messages] Saving old state with key:', oldStateKey);
      try {
        localStorage.setItem(oldStateKey, JSON.stringify(STATE));
        console.log('[Messages] Old state saved successfully');
      } catch(e) {
        console.error('[Messages] Failed to save old state:', e);
      }
    }

    // 切到新窗口
    STATE.chatId = newChatId;

    // 直接从localStorage加载状态，不依赖CHAT_STORE
    // 这样可以确保每次切换对话时都能获取最新的状态
    const newStateKey = `rp_state_${newChatId}`;
    console.log('[Messages] Loading new state with key:', newStateKey);
    const saved = localStorage.getItem(newStateKey);
    if (saved) {
      try {
        const loadedState = JSON.parse(saved);
        STATE.threads = loadedState.threads || {};
        STATE.avatars = loadedState.avatars || {};
        STATE.settings = loadedState.settings || {
          userAvatar: '',
          userName: '我'
        };
        console.log('[Messages] New state loaded successfully:', {
          threads: Object.keys(STATE.threads).length,
          chatId: STATE.chatId
        });
      } catch(e) {
        console.error('[Messages] Failed to parse saved state:', e);
        // 初始化空状态
        STATE.threads = {};
        STATE.avatars = {};
        STATE.settings = {
          userAvatar: '',
          userName: '我'
        };
        console.log('[Messages] Initialized empty state for new chat');
      }
    } else {
      // 初始化空状态
      STATE.threads = {};
      STATE.avatars = {};
      STATE.settings = {
        userAvatar: '',
        userName: '我'
      };
      console.log('[Messages] Initialized empty state for new chat');
    }

    // 更新CHAT_STORE
    CHAT_STORE[newChatId] = {
      threads: JSON.parse(JSON.stringify(STATE.threads)),
      avatars: Object.assign({}, STATE.avatars || {}),
      settings: Object.assign({}, STATE.settings || {})
    };

    // 强制重新渲染联系人列表
    console.log('[Messages] Rendering thread list with', Object.keys(STATE.threads).length, 'threads');
    renderThreadList();
    
    // 自动添加当前对话的角色到联系人
    autoAddCharContact();
    
    // 清理无效联系人
    cleanInvalidContacts();
    
    console.log('[Messages] Sync completed successfully');
  }
  
  trySync();
}

// Get context
function getContext() {
  if (window.SillyTavern && window.SillyTavern.getContext) {
    return window.SillyTavern.getContext();
  }
  return null;
}

// Parse phone block from AI response
// ── 辅助：从文本内容中提取 <img src="..."> 并返回 {imgs, cleanText, pendingPrompts}
function extractImgsFromText(raw) {
  const imgs = [];
  const pendingPrompts = [];

  // 1) 标准 <img src="...">
  const imgRe = /<img\b[^>]*?\ssrc\s*=\s*["']([^"']+)["'][^>]*\/?>/gi;
  let im;
  while ((im = imgRe.exec(raw)) !== null) {
    imgs.push(im[1]);
  }

  if (imgs.length === 0) {
    const looseImgRe = /<img\b[^>]*?\ssrc\s*=\s*["']([^"']+)["']/gi;
    while ((im = looseImgRe.exec(raw)) !== null) {
      imgs.push(im[1]);
    }
  }

  if (imgs.length === 0) {
    const ultraLooseImgRe = /<img[^>]*src=["']([^"']+)["'][^>]*>/gi;
    while ((im = ultraLooseImgRe.exec(raw)) !== null) {
      imgs.push(im[1]);
    }
  }

  // 2) 智绘姬格式 image###prompt###
  const chatu8Re = /image###([\s\S]*?)###/gi;
  let cm;
  while ((cm = chatu8Re.exec(raw)) !== null) {
    const prompt = (cm[1] || '').trim();
    if (prompt) pendingPrompts.push(prompt);
  }

  // 3) 旧格式兼容：<img prompt="...">
  const imgPromptRe = /<img\b(?![^>]*\bsrc=)[^>]*\bprompt=["']([^"']+)["'][^>]*\/?>/gi;
  let pm;
  while ((pm = imgPromptRe.exec(raw)) !== null) {
    const prompt = (pm[1] || '').trim();
    if (prompt) pendingPrompts.push(prompt);
  }

  let cleanText = raw
    .replace(/<img\b[^>]*>>*/gi, '')
    .replace(/image###[\s\S]*?###/gi, '')
    .replace(/<pic\b[^>]*>[\s\S]*?<\/pic>/gi, '')
    .replace(/<pic\b[\s\S]*?\/>/gi, '')
    .replace(/<pic\b[^>]*>/gi, '')
    .replace(/<imageTag>[\s\S]*?<\/imageTag>/gi, '')
    .replace(/<image>[\s\S]*?<\/image>/gi, '')
    .replace(/<imgthink>[\s\S]*?<\/imgthink>/gi, '')
    .trim();

  return { imgs, cleanText, pendingPrompts };
}

function parsePhone(block, messageId) {
  console.log('[parsePhone] ========== START PARSING ==========');
  console.log('[parsePhone] Input block type:', typeof block);
  console.log('[parsePhone] Input block length:', typeof block === 'string' ? block.length : 'not a string');
  console.log('[parsePhone] Full block content:', typeof block === 'string' ? block : block);
  console.log('[Raymond Phone] parsePhone messageId:', messageId);

  let parsedCount = 0;
  let m;

  // ── 收集待排序消息：记录原始位置用于按源码顺序排序 ──
  const _pendingMessages = []; // { threadId, msgObj, index: 源码中位置 }
  function _queueMessage(threadId, msgObj, sourceIndex) {
    _pendingMessages.push({ threadId, msgObj, index: sourceIndex });
  }
  function _flushMessages() {
    if (_pendingMessages.length === 0) return 0;
    // 按线程分组，每组内按源码位置排序（保持 AI 输出的原始顺序）
    const byThread = {};
    _pendingMessages.forEach(({ threadId, msgObj, index }) => {
      byThread[threadId] = byThread[threadId] || [];
      byThread[threadId].push({ msgObj, index });
    });
    let added = 0;
    Object.entries(byThread).forEach(([threadId, items]) => {
      const th = STATE.threads[threadId];
      if (!th) return;
      // 按源码位置排序
      items.sort((a, b) => a.index - b.index);
      items.forEach(({ msgObj }) => {
        th.messages.push(msgObj);
        added++;
      });
      if (STATE.currentView !== 'thread' || STATE.currentThread !== threadId) th.unread += items.length;
      if (STATE.currentView === 'thread' && STATE.currentThread === threadId) renderBubbles(threadId);
      refreshBadges(); updatePreviews();
    });
    _pendingMessages.length = 0;
    return added;
  }

  // 去重：检查这条消息是否已经处理过（通过消息指纹）
  // 指纹 = PHONE块内容的MD5或简化哈希
  const blockHash = (messageId || 'noId') + '|' + block.length + '|' + (block.slice(0, 100) + block.slice(-100));
  if (window._lastPhoneBlockHash === blockHash) {
    console.log('[parsePhone] SKIP: Same PHONE block already processed (hash match)');
    return 0;
  }
  window._lastPhoneBlockHash = blockHash;
  console.log('[parsePhone] New PHONE block, will parse (hash:', blockHash, ')');

  // ── 严禁 AI 替 user 发言：获取 user 名字，所有 FROM 解析处都会跳过 user 名 ──
  const _parseUserName = (typeof getContext === 'function' ? getContext()?.name1 : null) || '';
  console.log('[parsePhone] User name for filtering:', _parseUserName);
  function _isUserFrom(fromStr) {
    if (!_parseUserName || !fromStr) return false;
    return fromStr.trim().toLowerCase() === _parseUserName.toLowerCase();
  }

  // ── 辅助：把图片 src 路由到指定线程
  function routeImgToThread(threadId, src, time, msgId) {
    const th = STATE.threads[threadId];
    if (!th) return;
    const fallbackTime = time || `${String(new Date().getHours()).padStart(2,'0')}:${String(new Date().getMinutes()).padStart(2,'0')}`;
    const isDup = th.messages.some(msg => msg.type === 'image' && msg.src === src);
    if (isDup) return;
    const msgObj = { id: `aimg_${Date.now()}_${Math.random().toString(36).slice(2,6)}`, from: threadId, type: 'image', time: fallbackTime, src };
    if (msgId) msgObj.messageId = msgId;
    th.messages.push(msgObj);
    if (STATE.currentView !== 'thread' || STATE.currentThread !== threadId) th.unread++;
    refreshBadges(); updatePreviews();
    if (STATE.currentView === 'thread' && STATE.currentThread === threadId) renderBubbles(threadId);
    showBanner(th.name, '[图片]', fallbackTime);
    saveState();
  }

  // 收集所有标签及其位置
  const allTags = [];
  
  // 定义所有标签的正则表达式
  const tagRegexes = [
    { name: 'SMS', regex: /<SMS\b([^>]*)>([\s\S]*?)<\/SMS>/gi },
    { name: 'CALL', regex: /<CALL\s+FROM="([^"]+)"\s+TIME="([^"]+)"\s*\/>/gi },
    { name: 'HONGBAO', regex: /<HONGBAO\s+FROM="([^"]+)"\s+AMOUNT="([^"]+)"(?:\s+NOTE="([^"]*)")?\s*\/>/gi },
    { name: 'VOICE', regex: /<VOICE\s+FROM="([^"]+)"\s+TIME="([^"]+)"\s+DURATION="([^"]+)">([\s\S]*?)<\/VOICE>/gi },
    { name: 'GMSG', regex: /<GMSG\s+FROM="([^"]+)"\s+GROUP="([^"]+)"\s+TIME="([^"]+)">([\s\S]*?)<\/GMSG>/gi },
    { name: 'GVOICE', regex: /<GVOICE\s+FROM="([^"]+)"\s+GROUP="([^"]+)"\s+TIME="([^"]+)"\s+DURATION="([^"]+)">([\s\S]*?)<\/GVOICE>/gi },
    { name: 'GHONGBAO', regex: /<GHONGBAO\s+FROM="([^"]+)"\s+GROUP="([^"]+)"\s+AMOUNT="([^"]+)"(?:\s+NOTE="([^"]*)")?\s*\/>/gi },
    { name: 'MOMENTS', regex: /<MOMENTS\b([^>]*)>([\s\S]*?)<\/MOMENTS>/gi },
    { name: 'COMMENT', regex: /<COMMENT\b([^>]*)>([\s\S]*?)<\/COMMENT>/gi },
    { name: 'SYNC', regex: /<SYNC\b([^>]*)\s*\/>/gi }
  ];
  
  // 收集所有标签及其位置
  tagRegexes.forEach(({ name, regex }) => {
    let match;
    while ((match = regex.exec(block)) !== null) {
      allTags.push({
        name,
        match,
        index: match.index
      });
    }
  });
  
  // 按在文本中的位置排序
  allTags.sort((a, b) => a.index - b.index);
  
  // 处理排序后的标签
  allTags.forEach(({ name, match }) => {
    switch (name) {
      case 'SMS': {
        const attrs = getTagAttrs(match[1]);
        const fromRaw0 = (attrs.FROM || '').trim();
        console.log('[parsePhone] Found SMS tag:', { from: fromRaw0, attrs, contentPreview: match[2].substring(0, 50) });

        // 严禁 AI 替 user 发言：FROM 是 user 名字时直接跳过
        if (_isUserFrom(fromRaw0)) { console.log('[Phone:guard] SMS FROM=user blocked:', fromRaw0); return; }
        const time = (attrs.TIME || '').trim();
        const rawContent = match[2] || '';

        // 先从 SMS 内容里提取图片（生图插件替换后的 <img src>）和智绘姬 pending prompts
        const { imgs: smsImgs, cleanText: smsCleanText, pendingPrompts: smsPendingPrompts } = extractImgsFromText(rawContent);
        console.log('[parsePhone] Extracted from SMS:', { imgsCount: smsImgs.length, imgs: smsImgs, textLength: smsCleanText.length });
        const text = sanitizeSmsText(smsCleanText);

        // 线程路由策略:
        // 1) 若存在 pending(刚由本端发起短信),优先落到 pending 线程
        // 2) 按 FROM 精确/模糊匹配已有线程
        // 3) FROM 匹配不到时,先试当前打开的线程 (currentThread),不立即新建孤立线程
        // 4) FROM 为空时退化到 currentThread
        // 5) 以上都失败才新建
        let threadId = null;
        let fromRaw = fromRaw0;

        const pendingThreadId = STATE._pendingPhoneReply?.threadId;
        const hasPendingThread = !!(pendingThreadId && STATE.threads?.[pendingThreadId]);
        const pendingFresh = !!(STATE._pendingPhoneReply && (Date.now() - (STATE._pendingPhoneReply.sentAt || 0) < 300000));

        if (hasPendingThread && pendingFresh) {
          // 优先 pending:用户刚通过手机发了短信,回复一定属于这个线程
          threadId = pendingThreadId;
          if (!fromRaw) fromRaw = STATE.threads[threadId]?.name || '';
        } else if (fromRaw) {
          threadId = matchThread(fromRaw);
          console.log('[parsePhone] Matched thread for "' + fromRaw + '":', threadId);
          if (!threadId) {
            // FROM 名字匹配失败 → 自动新建该 NPC 的线程，不要把消息误投到当前打开的线程
            const newTh = findOrCreateThread(fromRaw);
            threadId = newTh.id;
            console.log('[Phone:diag] parsePhone: FROM "' + fromRaw + '" not in contacts, auto-created thread', threadId);
          }
        } else if (STATE.currentThread && STATE.threads?.[STATE.currentThread]) {
          threadId = STATE.currentThread;
          fromRaw = STATE.threads[threadId]?.name || '';
          console.log('[parsePhone] Using current thread:', threadId, fromRaw);
        }

        if (!threadId) {
          console.log('[Phone:diag] parsePhone: no threadId found for FROM=' + fromRaw0, 'Available threads:', Object.keys(STATE.threads));
          return;
        }
        const fallbackTime = `${String(new Date().getHours()).padStart(2,'0')}:${String(new Date().getMinutes()).padStart(2,'0')}`;
        const msgTime = time || fallbackTime;
        console.log('[Phone:diag] incomingMsg called', { threadId, text: text.slice(0,40), time: msgTime });

        const th = STATE.threads[threadId];
        if (!th) {
          console.log('[Phone:diag] Thread not found:', threadId);
          return;
        }

        // 构建消息列表：图片在前，文本在后（保持顺序）
        const msgItems = [];

        // 图片消息
        smsImgs.forEach((src, idx) => {
          const isDup = th.messages.some(msg => msg.type === 'image' && msg.src === src);
          if (!isDup) {
            const msgObj = { id: `aimg_${Date.now()}_${idx}`, from: threadId, type: 'image', time: msgTime, src };
            if (messageId) msgObj.messageId = messageId;
            msgItems.push(msgObj);
            console.log(`[Raymond Phone] Added image to batch:`, src.slice(0, 50));
          }
        });

        // 文本消息
        if (text && text.trim()) {
          // 去重：优先用 messageId，否则用 text+time 组合判断
          let isDup = false;
          if (messageId) {
            isDup = th.messages.some(msg => msg.messageId === messageId && msg.text === text);
          } else {
            isDup = th.messages.some(msg => msg.text === text && msg.time === msgTime);
          }
          if (isDup) {
            console.log('[Raymond Phone] Skip duplicate SMS:', { threadId, text: text.slice(0, 20), messageId });
          } else {
            const msgObj = { from: threadId, text, time: msgTime };
            if (messageId) msgObj.messageId = messageId;
            msgItems.push(msgObj);
          }
        }

        // 批量添加消息（队列模式，按源码顺序排序）
        if (msgItems.length > 0) {
          const sourceIndex = match.index; // 记录源码位置
          msgItems.forEach((msgObj, idx) => {
            // 使用相同的源码位置，确保同一SMS标签内的消息按添加顺序排列
            _queueMessage(threadId, msgObj, sourceIndex + idx);
          });
          parsedCount += msgItems.length;
        }

        // ComfyUI <pic> 触发词：把 prompt → threadId 记录到 STATE._pendingComfyPics
        STATE._pendingComfyPics = STATE._pendingComfyPics || new Map();
        const picTagRe2 = /<pic\b([\s\S]*?)\/>/gi;
        let picM2;
        while ((picM2 = picTagRe2.exec(rawContent)) !== null) {
          const pa = getTagAttrs(picM2[1]);
          const pp = (pa.prompt || '').trim();
          if (pp) {
            STATE._pendingComfyPics.set(pp, { threadId, time: msgTime });
            console.log('[Phone:comfy] 注册 ComfyUI pending pic', { threadId, prompt: pp.slice(0, 50) });
          }
        }

        // pending_image 占位：image###prompt### 表示 AI 要求生图但图片尚未就绪（智绘姬模式）
        const pendingPrompts = smsPendingPrompts;
        pendingPrompts.forEach(prompt => {
          const th = STATE.threads[threadId];
          if (th) {
            const pendingId = `pending_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
            const msgObj = { id: pendingId, from: threadId, type: 'pending_image', time: msgTime, prompt };
            if (messageId) msgObj.messageId = messageId;
            th.messages.push(msgObj);
            if (STATE.currentView === 'thread' && STATE.currentThread === threadId) renderBubbles(threadId);
            saveState();
            parsedCount++;
          }
        });
        break;
      }
      
      case 'CALL': {
        const callFrom = match[1].trim();
        if (_isUserFrom(callFrom)) { console.log('[Phone:guard] CALL FROM=user blocked:', callFrom); return; }
        incomingCall(callFrom, match[2].trim());
        parsedCount++;
        break;
      }
      
      case 'HONGBAO': {
        const fromName = match[1].trim();
        const _userName = (typeof getContext === 'function' ? getContext()?.name1 : null) || '';
        // 跳过 user 自己发出的红包(AI 确认回显),只处理 char 发来的
        if (_userName && fromName.toLowerCase() === _userName.toLowerCase()) return;
        incomingHongbao(fromName, match[2].trim(), match[3] ? match[3].trim() : '恭喜发财');
        parsedCount++;
        break;
      }
      
      case 'VOICE': {
        const voiceFrom = match[1].trim();
        if (_isUserFrom(voiceFrom)) { console.log('[Phone:guard] VOICE FROM=user blocked:', voiceFrom); return; }
        const sourceIndex = match.index;
        const thread = findOrCreateThread(voiceFrom);
        const msgTime = match[2].trim();
        const voiceText = match[4].trim();
        
        // 去重：优先用 messageId，否则用 text+time 组合判断
        let isDup = false;
        if (messageId) {
          isDup = thread.messages.some(msg => msg.messageId === messageId && msg.type === 'voice' && msg.text === voiceText);
        } else {
          isDup = thread.messages.some(msg => msg.type === 'voice' && msg.text === voiceText && msg.time === msgTime);
        }
        if (isDup) {
          console.log('[Raymond Phone] Skip duplicate VOICE:', { threadId: thread.id, text: voiceText.slice(0, 20), messageId });
          return;
        }
        
        const msgObj = {
          id: `vc_${Date.now()}`,
          from: 'incoming',
          type: 'voice',
          name: voiceFrom,
          time: msgTime,
          duration: match[3].trim(),
          text: voiceText,
          played: false
        };
        if (messageId) msgObj.messageId = messageId;
        _queueMessage(thread.id, msgObj, sourceIndex);
        parsedCount++;
        break;
      }
      
      case 'GMSG': {
        const gmsgFrom = match[1].trim();
        if (_isUserFrom(gmsgFrom)) { console.log('[Phone:guard] GMSG FROM=user blocked:', gmsgFrom); return; }
        incomingGroupMsg(gmsgFrom, match[2].trim(), match[3].trim(), match[4].trim());
        parsedCount++;
        break;
      }
      
      case 'GVOICE': {
        const fromRaw = match[1].trim(), groupName = match[2].trim(), time = match[3].trim();
        // 严禁 AI 替 user 发言
        if (_isUserFrom(fromRaw)) { console.log('[Phone:guard] GVOICE FROM=user blocked:', fromRaw); return; }
        const duration = match[4].trim(), voiceText = match[5].trim();
        const groupId = `grp_${groupName}`;
        if (!STATE.threads[groupId]) {
          const colorIdx = Object.keys(STATE.threads).length % GROUP_COLORS.length;
          STATE.threads[groupId] = {
            id: groupId, name: groupName,
            initials: groupName.slice(0, 2),
            avatarBg: `linear-gradient(145deg,${GROUP_COLORS[colorIdx]},${GROUP_COLORS[(colorIdx+1)%GROUP_COLORS.length]})`,
            type: 'group', messages: [], unread: 0
          };
        }
        const grpThread = STATE.threads[groupId];
        // 去重：用 text 而非 voiceText
        const isDupGV = grpThread.messages.some(msg => msg.type === 'group_voice' && msg.name === fromRaw && msg.text === voiceText);
        if (!isDupGV) {
          const senderTh = findOrCreateThread(fromRaw);
          grpThread.messages.push({
            id: `ggv_${Date.now()}`, from: 'incoming',
            type: 'group_voice', name: fromRaw, time, duration, text: voiceText,
            initials: senderTh.initials, avatarBg: senderTh.avatarBg
          });
          grpThread.unread = (grpThread.unread || 0) + 1;
          refreshBadges(); renderThreadList();
          if (STATE.currentThread === groupId) renderBubbles(groupId);
          showBanner(groupName, `${fromRaw}: 🎤 [${duration}]`);
        }
        saveState();
        parsedCount++;
        break;
      }
      
      case 'GHONGBAO': {
        const fromRaw = match[1].trim(), groupName = match[2].trim();
        const amount = match[3].trim(), note = match[4] ? match[4].trim() : '恭喜发财';
        const groupId = `grp_${groupName}`;
        if (!STATE.threads[groupId]) {
          const colorIdx = Object.keys(STATE.threads).length % GROUP_COLORS.length;
          STATE.threads[groupId] = {
            id: groupId, name: groupName,
            initials: groupName.slice(0, 2),
            avatarBg: `linear-gradient(145deg,${GROUP_COLORS[colorIdx]},${GROUP_COLORS[(colorIdx+1)%GROUP_COLORS.length]})`,
            type: 'group', messages: [], unread: 0
          };
        }
        const grpThread = STATE.threads[groupId];
        const isDupGH = grpThread.messages.some(msg => msg.type === 'group_hongbao' && msg.name === fromRaw && msg.amount === amount);
        if (!isDupGH) {
          const senderTh = findOrCreateThread(fromRaw);
          grpThread.messages.push({
            id: `ggh_${Date.now()}`, from: 'incoming',
            type: 'group_hongbao', name: fromRaw, time: (() => {
              const now = new Date();
              return `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
            })(),
            amount, note, opened: false,
            initials: senderTh.initials, avatarBg: senderTh.avatarBg
          });
          grpThread.unread = (grpThread.unread || 0) + 1;
          refreshBadges(); renderThreadList();
          if (STATE.currentThread === groupId) renderBubbles(groupId);
          showBanner(groupName, `${fromRaw}: 🧧 ${amount}`);
        }
        saveState();
        parsedCount++;
        break;
      }

      case 'MOMENTS': {
        const attrs = getTagAttrs(match[1]);
        const fromName = (attrs.FROM || '').trim();
        const time = (attrs.TIME || '').trim();
        const rawContent = match[2] || '';

        // 提取图片（生图插件替换后的 <img src>）和智绘姬 pending prompts
        const { imgs: momentImgs, cleanText: momentCleanText, pendingPrompts: momentPendingPrompts } = extractImgsFromText(rawContent);
        const text = sanitizeSmsText(momentCleanText);

        if (fromName) {
          const th = findOrCreateThread(fromName);
          const momentId = `moment_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
          const moment = {
            id: momentId,
            from: 'npc',
            name: fromName,
            text: text,
            time: time || (() => {
              const now = new Date();
              return `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
            })(),
            img: momentImgs[0] || null,
            pendingImg: null,
            initials: th.initials,
            avatarBg: th.avatarBg,
            likes: [],
            comments: []
          };

          // 处理 pending_image 占位（智绘姬模式）
          if (momentPendingPrompts.length > 0) {
            moment.pendingImg = momentPendingPrompts[0];
            moment.pendingImgType = 'chatu8';
          }

          STATE.moments.push(moment);
          saveState();
          parsedCount++;

          // 如果当前在朋友圈视图，重新渲染
          if (STATE.currentView === 'moments' && window.renderMoments) {
            window.renderMoments();
          }

          console.log('[Raymond Phone] Added moment:', { fromName, text: text.slice(0, 30), time, img: !!moment.img, pendingImg: moment.pendingImg });
        }
        break;
      }

      case 'COMMENT': {
        const attrs = getTagAttrs(match[1]);
        const momentId = (attrs.MOMENT_ID || '').trim();
        const fromName = (attrs.FROM || '').trim();
        const time = (attrs.TIME || '').trim();
        const text = (match[2] || '').trim();

        if (momentId && fromName && text) {
          const moment = STATE.moments.find(m => m.id === momentId);
          if (moment) {
            const comment = {
              id: Date.now(),
              name: fromName,
              text: text,
              time: time || (() => {
                const now = new Date();
                return `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
              })(),
              replyTo: null
            };

            if (!moment.comments) moment.comments = [];
            moment.comments.push(comment);
            saveState();
            parsedCount++;

            // 如果当前在朋友圈视图，重新渲染
            if (STATE.currentView === 'moments' && window.renderMoments) {
              window.renderMoments();
            }

            console.log('[parsePhone] Added comment:', { momentId, fromName, text: text.slice(0, 30) });
          } else {
            console.warn('[parsePhone] Moment not found for comment:', momentId);
          }
        }
        break;
      }

      case 'SYNC': {
        const attrs = getTagAttrs(match[1]);
        const stage = parseInt(attrs.STAGE || '1', 10);
        const progress = parseInt(attrs.PROGRESS || '0', 10);
        const status = (attrs.STATUS || '').trim();

        if (!isNaN(stage) && !isNaN(progress)) {
          STATE.sync = {
            stage: stage,
            progress: progress,
            status: status || '乖巧'
          };
          saveState();
          parsedCount++;
          console.log('[parsePhone] Updated sync state:', STATE.sync);
        }
        break;
      }
    }
  });

  // 刷新队列中的消息（按源码顺序排序）
  const firstThreadId = _pendingMessages[0]?.threadId;
  const flushed = _flushMessages();
  if (flushed > 0) {
    const th = STATE.threads[firstThreadId];
    if (th) {
      showBanner(th.name, '', '');
    }
    saveState();
    parsedCount += flushed;
  }

  console.log('[parsePhone] Finished parsing. Total items:', parsedCount);
  console.log('[parsePhone] Current threads:', Object.keys(STATE.threads));
  return parsedCount;
}

// 清理旧消息（当 AI 消息被重新生成时）
// messageId: 可选，要删除的消息所属的 AI 楼层 ID，如果不传则删除所有消息
function cleanupOldPhoneMessages(messageId) {
  console.log('[Raymond Phone] Cleaning up old phone messages, messageId:', messageId);

  // 如果没有有效的 messageId，不删除任何消息（防止误删）
  const hasValidMessageId = messageId !== undefined && messageId !== null && messageId !== '';
  if (!hasValidMessageId) {
    console.log('[Raymond Phone] No valid messageId, skipping cleanup to prevent accidental deletion');
    return;
  }

  let cleanedCount = 0;

  // 只有提供了有效的 messageId，才只删除该楼层对应的消息
  Object.keys(STATE.threads).forEach(threadId => {
    const thread = STATE.threads[threadId];
    if (thread && thread.messages) {
      const oldLength = thread.messages.length;

      // 只删除带有指定 messageId 的消息
      thread.messages = thread.messages.filter(msg => msg.messageId !== messageId);

      const newLength = thread.messages.length;
      cleanedCount += (oldLength - newLength);
      if (oldLength - newLength > 0) {
        console.log('[Raymond Phone] Cleared thread:', threadId, 'removed', oldLength - newLength, 'messages');
      }
    }
  });

  console.log('[Raymond Phone] Cleanup complete, removed', cleanedCount, 'messages total');

  // 刷新界面
  refreshBadges();
  updatePreviews();
  if (STATE.currentView === 'thread' && STATE.currentThread) {
    renderBubbles(STATE.currentThread);
  }
  saveState();
}

// Get tag attributes
function getTagAttrs(attrStr) {
  const attrs = {};
  const re = /\b([a-zA-Z][a-zA-Z0-9]*)\s*=\s*(?:'([^']*)'|"([^"]*)"|([^\s>]+))/g;
  let m;
  while ((m = re.exec(attrStr)) !== null) {
    attrs[m[1].toUpperCase()] = m[2] || m[3] || m[4] || '';
  }
  return attrs;
}

// Match thread by name
function matchThread(name) {
  if (!name) return null;
  const lowerName = name.toLowerCase();
  for (const id in STATE.threads) {
    const th = STATE.threads[id];
    if (th.name.toLowerCase() === lowerName) return id;
  }
  return null;
}

// 头像模块级缓存--独立于 STATE.avatars,不受 chatId 切换影响
// 所有读头像的地方统一调 getAvatar(key),写头像调 setAvatar(key, dataUrl)
const _AV = {};
function getAvatar(key) {
  // window._rpAV 最高优先级,不受任何闭包/STATE切换影响
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

// 自动将当前对话的 char 加入联系人(每个对话框独立,无需开场白 <PHONE> 标签)
function autoAddCharContact() {
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
    renderThreadList();
    saveState();
    console.log('[Phone] 自动添加联系人:', charName);
  } catch(e) { /* ignore */ }
}

// 清理无效联系人(SillyTavern 本身、旧硬编码遗留等)
function cleanInvalidContacts() {
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
  if (changed) { renderThreadList(); saveState(); }
}

// Test parsePhone function
function testParsePhone() {
  const testBlock = `
    <PHONE>
      <!-- 短信 -->
      <SMS FROM="雫" TIME="21:30">没事</SMS>
      
      <!-- 红包 -->
      <HONGBAO FROM="雫" AMOUNT="100" NOTE="恭喜发财"/>
      
      <!-- 语音 -->
      <VOICE FROM="雫" TIME="21:30" DURATION="0:08">你好</VOICE>
      
      <!-- 通话 -->
      <CALL FROM="雫" TIME="21:30"/>
      
      <!-- 群聊消息 -->
      <GMSG FROM="雫" GROUP="好友群" TIME="21:30">大家好</GMSG>
      
      <!-- 群聊语音 -->
      <GVOICE FROM="雫" GROUP="好友群" TIME="21:30" DURATION="0:08">大家好</GVOICE>
      
      <!-- 群聊红包 -->
      <GHONGBAO FROM="雫" GROUP="好友群" AMOUNT="100" NOTE="恭喜发财"/>
    </PHONE>
  `;
  
  console.log('[Test] Testing parsePhone with various message types...');
  const parsedCount = parsePhone(testBlock);
  console.log('[Test] Parse completed. Parsed', parsedCount, 'messages.');
  console.log('[Test] Current threads:', Object.keys(STATE.threads));
}

// Export statement moved to end of file

// Escape HTML
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Sanitize SMS text
function sanitizeSmsText(text) {
  return escHtml(text);
}

// Find or create thread
function findOrCreateThread(contactId, contactName, initials) {
  let thread = STATE.threads[contactId];
  if (!thread) {
    const name = contactName || contactId || '';
    const colorIdx = Object.keys(STATE.threads).length % GROUP_COLORS.length;
    thread = {
      id: contactId,
      name: name,
      initials: initials || (name ? name.slice(0, 2).toUpperCase() : '??'),
      avatarBg: `linear-gradient(145deg,${GROUP_COLORS[colorIdx]},${GROUP_COLORS[(colorIdx+1)%GROUP_COLORS.length]})`,
      messages: [],
      unread: 0
    };
    STATE.threads[contactId] = thread;
    saveState();
  }
  return thread;
}

// Send SMS
function sendSMS() {
  // 先把输入框当前内容并入队列
  const currentText = $('#rp-input').val().trim();
  if (currentText) {
    if (!STATE.pendingMessages) STATE.pendingMessages = [];
    STATE.pendingMessages.push(currentText);
    $('#rp-input').val('');
  }

  if (!STATE.currentThread || !STATE.pendingMessages || STATE.pendingMessages.length === 0) return;

  const th = STATE.threads[STATE.currentThread];
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  // 写入手机 UI(全部排队消息)
  const allMessages = [...STATE.pendingMessages];
  STATE.pendingMessages = [];
  renderPendingQueue();

  allMessages.forEach(text => {
    th.messages.push({ from: 'user', text, time: ts });
  });
  renderBubbles(STATE.currentThread);
  updatePreviews();
  saveState();

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

  // 获取当前上下文
  function getContext() {
    if (window.SillyTavern && window.SillyTavern.getContext) {
      return window.SillyTavern.getContext();
    }
    return null;
  }

  // 判断联系人是否为主角,生成不同的 OOC 指令
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

  // 用 setExtensionPrompt 注入隐藏 OOC,不在聊天框显示
  const hasExtPrompt = typeof setExtensionPrompt === 'function' && extension_prompt_types;
  console.log('[Raymond Phone] sendSMS triggered', {
    threadId: STATE.currentThreadId,
    threadType: th.type,
    isGroupThread,
    hasExtPrompt,
    oocText,
    smsLine,
    mainText
  });

  if (hasExtPrompt) {
    setExtensionPrompt(extension_prompt_types.SYSTEM, oocText);
  } else {
    ta.value = `${mainText}\n${smsLine}\n${oocText}`;
  }

  // 自动提交
  const sendBtn = document.querySelector('#send-button');
  if (sendBtn) {
    sendBtn.click();
  }
}

// Extract SMS summaries
function extractSmsSummaries() {
  return Object.values(STATE.threads).map(t => ({
    id: t.id,
    name: t.name,
    initials: t.initials,
    lastMsg: t.messages.length > 0 ? t.messages[t.messages.length - 1] : null,
    unread: t.unread
  }));
}

// Update previews
function updatePreviews() {
  const container = $('#rp-thread-list').empty();

  Object.values(STATE.threads).forEach(th => {
    const lastMsg = th.messages.at(-1);
    let previewText = '暂无消息';
    let time = '';
    
    if (lastMsg) {
      time = lastMsg.time || '';
      const senderLabel = lastMsg.from === 'user' ? '我' : th.name.split(' ')[0];
      
      if (lastMsg.type === 'image') {
        previewText = senderLabel + ': [图片]';
      } else if (lastMsg.type === 'voice') {
        previewText = senderLabel + ': [语音]';
      } else if (lastMsg.type === 'group_voice') {
        previewText = senderLabel + ': [语音]';
      } else if (lastMsg.text) {
        previewText = senderLabel + ':' + lastMsg.text;
      } else {
        previewText = senderLabel + ': [消息]';
      }
    }
    
    const preview = previewText.length > 28 ? previewText.slice(0, 27) + '...' : previewText;
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

// Render bubbles
function renderBubbles(threadId) {
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
      area.append(wrap); return;
    }
    // ── 群聊消息 (NPC/char 发送) ──
    if (msg.type === 'group_msg') {
      const customImg = STATE.avatars && STATE.avatars[msg.name];
      const avEl = customImg
        ? $(`<div class="rp-grp-av rp-av-img"><img class="rp-av-photo" src="${customImg}" alt=""/></div>`)
        : $(`<div class="rp-grp-av" style="background:${msg.avatarBg}">${msg.initials}</div>`);
      const wrap = $('<div class="rp-bwrap rp-in rp-grp"></div>');
      const inner = $('<div>');
      inner.append($('<div>').addClass('rp-grp-sender').text(msg.name));
      inner.append($('<div>').addClass('rp-bubble rp-recv').text(msg.text));
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
          <div class="rp-voice-txt">${escHtml(msg.text)}</div>
        </div>
      `));
      inner.append($('<div>').addClass('rp-bts').text(msg.time));
      wrap.append(avEl, inner);
      area.append(wrap); return;
    }
    // ── 图片消息 ──
    if (msg.type === 'image') {
      const isUser = msg.from === 'user';
      const wrap = $(`<div class="rp-bwrap ${isUser ? 'rp-out' : 'rp-in'}"></div>`);
      const bubble = $(`<div class="rp-bubble ${isUser ? 'rp-sent' : 'rp-recv'} rp-img-bubble"><img src="${escHtml(msg.src)}" alt="图片" style="max-width:100%;display:block"/></div>`);
      const time = $(`<div class="rp-bts">${msg.time}</div>`);
      wrap.append(bubble, time);
      area.append(wrap);
      return;
    }
    // ── 普通文本消息 ──
    const isUser = msg.from === 'user';
    const wrap = $(`<div class="rp-bwrap ${isUser ? 'rp-out' : 'rp-in'}"></div>`);
    const bubble = $(`<div class="rp-bubble ${isUser ? 'rp-sent' : 'rp-recv'}">${escHtml(msg.text)}</div>`);
    const time = $(`<div class="rp-bts">${msg.time}</div>`);
    wrap.append(bubble, time);
    area.append(wrap);
  });

  // Scroll to bottom
  area.scrollTop(area[0].scrollHeight);
}

// Open thread
function openThread(threadId) {
  STATE.currentThread = threadId;
  const th = STATE.threads[threadId];
  if (!th) return;

  th.unread = 0;
  refreshBadges();

  // Get avatar
  function getAvatar(name) {
    if (STATE.avatars && STATE.avatars[name]) {
      return STATE.avatars[name];
    }
    return null;
  }

  const _hdImg = getAvatar(th.name);
  if (_hdImg) {
    $('#rp-hd-av').empty().append(`<img class="rp-av-photo" src="${_hdImg}" alt=""/>`).css('background', 'transparent');
  } else {
    $('#rp-hd-av').empty().text(th.initials).css('background', th.avatarBg);
  }
  $('#rp-hd-name').text(th.name);

  // 切换对话时清空待发队列
  STATE.pendingMessages = [];
  renderPendingQueue();

  renderBubbles(threadId);
  updatePreviews();
  saveState();
}

// Format time
function formatTime(timestamp) {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Render thread list
function renderThreadList() {
  updatePreviews();
}

// Render pending queue (placeholder)
function renderPendingQueue() {
  const $queue = $('#rp-pending-queue');
  if (!$queue) return;
  $queue.empty();
}

// Incoming call (placeholder)
function incomingCall(callerId, callerName) {
  console.log('[Messages] Incoming call from:', callerName);
}

// Resolve call (placeholder)
function resolveCall(action) {
  console.log('[Messages] Call resolved:', action);
}

// Incoming hongbao (placeholder)
function incomingHongbao(threadId, senderName, amount) {
  console.log('[Messages] Incoming hongbao:', amount);
}

// Open hongbao (placeholder)
function openHongbao(hongbaoId) {
  console.log('[Messages] Open hongbao:', hongbaoId);
}

// Send user hongbao (placeholder)
function sendUserHongbao(threadId, amount, message) {
  console.log('[Messages] Send hongbao:', amount);
}

// Show hongbao sheet (placeholder)
function showHongbaoSheet(hongbaoData) {
  console.log('[Messages] Show hongbao sheet:', hongbaoData);
}

// Incoming voice
function incomingVoice(fromRaw, time, duration, text) {
  const thread = findOrCreateThread(fromRaw);
  // 去重:同 from+duration+text 已存在则跳过
  const isDup = thread.messages.some(m => m.type === 'voice' && m.name === fromRaw && m.duration === duration && m.text === text);
  if (isDup) {
    console.log('[Raymond Phone] Skip duplicate voice:', fromRaw, duration);
    return;
  }
  thread.messages.push({
    id: `vc_${Date.now()}`, from: 'incoming',
    type: 'voice', name: fromRaw, time,
    duration, text, played: false
  });
  thread.unread = (thread.unread || 0) + 1;
  refreshBadges(); renderThreadList();
  if (STATE.currentThread === thread.id) renderBubbles(thread.id);
  showBanner(thread.name, `🎤 语音消息 ${duration}`);
  saveState();
  console.log('[Raymond Phone] Added voice message:', { fromRaw, duration, text: text?.slice(0, 20) });
}

// Play voice
function playVoice(threadId, voiceId) {
  console.log('[Raymond Phone] Play voice:', threadId, voiceId);
  const th = STATE.threads[threadId];
  if (!th) return;
  const msg = th.messages.find(m => m.id === voiceId);
  if (msg) {
    msg.played = true;
    saveState();
    renderBubbles(threadId);
  }
}

// 暴露到全局
if (typeof window !== 'undefined') {
  window.playVoice = playVoice;
}

// Incoming group message
function incomingGroupMsg(fromRaw, groupName, time, text) {
  const groupId = `grp_${groupName}`;
  if (!STATE.threads[groupId]) {
    const colorIdx = Object.keys(STATE.threads).length % GROUP_COLORS.length;
    STATE.threads[groupId] = {
      id: groupId, name: groupName,
      initials: groupName.slice(0, 2),
      avatarBg: `linear-gradient(145deg,${GROUP_COLORS[colorIdx]},${GROUP_COLORS[(colorIdx+1)%GROUP_COLORS.length]})`,
      type: 'group', messages: [], unread: 0
    };
  }
  const thread = STATE.threads[groupId];
  const senderTh = findOrCreateThread(fromRaw);

  // 从 text 中提取图片（和 SMS 一样的逻辑）
  const { imgs, cleanText } = extractImgsFromText(text);
  const cleanTextFinal = sanitizeSmsText(cleanText);

  // 构建消息列表：图片在前，文本在后
  const msgItems = [];

  // 图片消息
  imgs.forEach((src, idx) => {
    const isDup = thread.messages.some(msg => msg.type === 'image' && msg.src === src);
    if (!isDup) {
      msgItems.push({
        id: `gimg_${Date.now()}_${idx}`, from: groupId,
        type: 'image', time, src,
        name: fromRaw, initials: senderTh.initials, avatarBg: senderTh.avatarBg
      });
    }
  });

  // 只有当有文本内容时才添加文本消息
  if (cleanTextFinal.trim()) {
    // 文本消息去重
    const isDup = thread.messages.some(m => m.type === 'group_msg' && m.name === fromRaw && m.text === cleanTextFinal);
    if (isDup) {
      console.log('[Raymond Phone] Skip duplicate GMSG:', fromRaw, cleanTextFinal?.slice(0, 20));
      // 但仍添加图片（如果没有重复）
      if (msgItems.length > 0) {
        msgItems.forEach(msgObj => thread.messages.push(msgObj));
        thread.unread = (thread.unread || 0) + 1;
        refreshBadges(); renderThreadList();
        if (STATE.currentThread === groupId) renderBubbles(groupId);
        saveState();
      }
      return;
    }

    // 文本消息
    msgItems.push({
      id: `gm_${Date.now()}`, from: 'incoming',
      type: 'group_msg', name: fromRaw, time, text: cleanTextFinal,
      initials: senderTh.initials, avatarBg: senderTh.avatarBg
    });
  }

  // 批量添加
  if (msgItems.length > 0) {
    msgItems.forEach(msgObj => thread.messages.push(msgObj));
    thread.unread = (thread.unread || 0) + 1;
    refreshBadges(); renderThreadList();
    if (STATE.currentThread === groupId) renderBubbles(groupId);
    showBanner(groupName, `${fromRaw}:${cleanTextFinal?.slice(0,22) || '[图片]'}${cleanTextFinal?.length>22?'...':''}`);
    saveState();
    console.log('[Raymond Phone] Added group message:', { groupName, fromRaw, text: cleanTextFinal?.slice(0, 20), imgCount: imgs.length });
  }
}

// Incoming group voice (placeholder)
function incomingGroupVoice(groupId, senderName, duration) {
  console.log('[Messages] Incoming group voice:', duration);
}

// Incoming group hongbao (placeholder)
function incomingGroupHongbao(groupId, senderName, amount) {
  console.log('[Messages] Incoming group hongbao:', amount);
}

// Toggle attach panel (placeholder)
function toggleAttachPanel() {
  console.log('[Messages] Toggle attach panel');
}

// Show banner (placeholder)
function showBanner(from, text) {
  const $banner = $('#rp-notif-banner');
  if (!$banner) return;

  $('#rp-nb-from').text(sanitizeSmsText(from));
  $('#rp-nb-text').text(sanitizeSmsText(text));
  $('#rp-nb-time').text(formatTime(Date.now()));

  $banner.show();
  setTimeout(() => $banner.hide(), 3000);
}

// Refresh badges
function refreshBadges() {
  const totalUnread = Object.values(STATE.threads).reduce((sum, t) => sum + (t.unread || 0), 0);

  const $mainBadge = $('#rp-main-badge');
  if ($mainBadge && $mainBadge.length > 0) {
    if (totalUnread > 0) {
      $mainBadge.text(totalUnread).show();
    } else {
      $mainBadge.hide();
    }
  }
}

// Beautify SMS in chat (placeholder)
function beautifySMSInChat(text) {
  return sanitizeSmsText(text);
}

// Initialize messages module
function initSMS() {
  console.log('[Raymond Phone] Messages Module initialized');

  // 暴露 API 到全局，供 main.js 使用
  window.RaymondPhone = window.RaymondPhone || {};
  window.RaymondPhone.cleanupOldMessages = cleanupOldPhoneMessages;

  // 重试加载状态，直到获取到非default的字符ID（最多重试10次）
  let retryCount = 0;
  const MAX_RETRIES = 10;

  function tryLoadState() {
    const characterId = getCurrentCharacterId();

    if (characterId === 'default' && retryCount < MAX_RETRIES && window.SillyTavern) {
      // 还没有获取到字符ID，继续重试
      retryCount++;
      console.log(`[Messages] Waiting for character to load... (${retryCount}/${MAX_RETRIES})`);
      setTimeout(tryLoadState, 500);
    } else {
      // 已经获取到字符ID或达到最大重试次数，直接加载
      console.log('[Messages] Loading state for character:', characterId);
      loadState();
      renderThreadList();
    }
  }

  tryLoadState();

  // Bind thread item click
  $(document).on('click', '.rp-thread', function() {
    const threadId = $(this).data('thread');
    openThread(threadId);

    // Navigate to thread view
    $('#rp-view-messages').hide();
    $('#rp-view-thread').show();
  });

  // Bind back button in thread view
  $(document).on('click', '#rp-view-thread .rp-back', function() {
    $('#rp-view-thread').hide();
    $('#rp-view-messages').show();
  });

  // Bind send button
  $(document).on('click', '#rp-send', function() {
    const $input = $('#rp-input');
    const text = $input.val().trim();
    if (!text) return;

    const currentThread = getSTATE().currentThread;
    const thread = STATE.threads[currentThread];
    if (thread) {
      sendSMS();
      $input.val('');
    }
  });

  // Bind input enter key
  $(document).on('keypress', '#rp-input', function(e) {
    if (e.which === 13) {
      const $input = $(this);
      const text = $input.val().trim();
      if (!text) return;

      const currentThread = getSTATE().currentThread;
      const thread = STATE.threads[currentThread];
      if (thread) {
        sendSMS();
        $input.val('');
      }
    }
  });

  // Bind add button
  $(document).on('click', '#rp-add-btn', function() {
    // Check if we have a current character
    const characterId = getCurrentCharacterId();
    if (characterId === 'default') {
      alert('请先打开一个对话，然后再添加联系人。');
      return;
    }
    showAddChoice();
  });

  // Show add choice
  function showAddChoice() {
    $('#rp-add-choice').remove();
    $('#rp-screen').append(`
      <div class="rp-add-choice" id="rp-add-choice">
        <div class="rp-add-choice-box">
          <div class="rp-add-choice-item" data-action="contact">👤 添加联系人</div>
          <div class="rp-add-choice-item" data-action="group">👥 创建群聊</div>
          <div class="rp-add-choice-item rp-add-choice-delete" data-action="delete">🗑️ 删除好友</div>
        </div>
        <div class="rp-add-choice-cancel" data-action="cancel">取消</div>
      </div>
    `);
  }

  // Hide add choice
  function hideAddChoice() { $('#rp-add-choice').remove(); }

  // Show add contact modal
  function showAddModal() {
    $('#rp-add-modal').show();
    $('#rp-add-name').focus();
  }

  // Bind add choice actions
  $(document).on('click', '.rp-add-choice-item', function() {
    const action = $(this).data('action');
    switch(action) {
      case 'contact':
        hideAddChoice();
        showAddModal();
        break;
      case 'group':
        hideAddChoice();
        showGroupPicker();
        break;
      case 'delete':
        hideAddChoice();
        showDeletePicker();
        break;
    }
  });

  // Bind add choice cancel
  $(document).on('click', '.rp-add-choice-cancel', function() {
    hideAddChoice();
  });

  // Bind add modal buttons
  $(document).on('click', '#rp-add-confirm', function() {
    const name = $('#rp-add-name').val().trim();
    const initials = $('#rp-add-initials').val().trim() || name.slice(0, 2);
    if (!name) return;

    // 检查是否有当前字符ID（不是默认值）
    const characterId = getCurrentCharacterId();
    if (characterId === 'default') {
      alert('请先打开一个对话，然后再添加联系人');
      return;
    }

    const threadId = name;
    const colorIdx = Object.keys(STATE.threads).length % GROUP_COLORS.length;
    STATE.threads[threadId] = {
      id: threadId, name, initials,
      avatarBg: `linear-gradient(145deg,${GROUP_COLORS[colorIdx]},${GROUP_COLORS[(colorIdx+1)%GROUP_COLORS.length]})`,
      messages: [], unread: 0
    };

    saveState();
    renderThreadList();
    $('#rp-add-modal').hide();
    $('#rp-add-name').val('');
    $('#rp-add-initials').val('');
  });

  // Bind add modal cancel
  $(document).on('click', '#rp-add-cancel', function() {
    $('#rp-add-modal').hide();
    $('#rp-add-name').val('');
    $('#rp-add-initials').val('');
  });

  // Show group picker
  function showGroupPicker() {
    $('#rp-grp-create').remove();
    const contacts = Object.values(STATE.threads).filter(t => !t.id.startsWith('grp_'));
    const items = contacts.map(t => {
      const img = STATE.avatars?.[t.name];
      const avHtml = img
        ? `<div class="rp-grp-pick-av rp-av-img" style="overflow:hidden"><img src="${img}" style="width:100%;height:100%;object-fit:cover"/></div>`
        : `<div class="rp-grp-pick-av" style="background:${t.avatarBg}">${t.initials}</div>`;
      return `<div class="rp-grp-pick-item" data-tid="${t.id}">${avHtml}<span class="rp-grp-pick-name">${escHtml(t.name)}</span><div class="rp-grp-pick-chk">✓</div></div>`;
    }).join('');
    $('#rp-screen').append(`
      <div class="rp-add-choice" id="rp-grp-create">
        <div class="rp-grp-modal">
          <div class="rp-grp-modal-hd">选择群聊成员</div>
          <div id="rp-grp-pick-list" style="max-height:220px;overflow-y:auto">
            ${items || '<div style="padding:16px;color:rgba(0,0,0,.4);text-align:center;font-size:13px">暂无联系人</div>'}
          </div>
          <div style="padding:10px 14px;border-top:1px solid rgba(0,0,0,.06)">
            <input id="rp-grp-name-inp" class="rp-grp-name-inp" type="text" placeholder="群聊名称(留空则自动生成)" maxlength="20"/>
          </div>
          <div class="rp-grp-modal-ft">
            <button class="rp-grp-ft-btn rp-grp-ft-cancel" data-action="grp-cancel">取消</button>
            <button class="rp-grp-ft-btn rp-grp-ft-ok"     data-action="grp-confirm">创建</button>
          </div>
        </div>
      </div>
    `);
    setTimeout(() => $('#rp-grp-name-inp').focus(), 80);
  }

  // Confirm create group
  function confirmCreateGroup() {
    const selected = $('#rp-grp-pick-list .rp-grp-pick-item.selected');
    if (!selected.length) return;
    const memberIds = selected.map((_, el) => $(el).data('tid')).get();
    let name = $('#rp-grp-name-inp').val().trim();
    if (!name) name = memberIds.map(id => STATE.threads[id]?.name || id).join('、');
    $('#rp-grp-create').remove();
    const groupId = `grp_${name}`;
    const colorIdx = Object.keys(STATE.threads).length % GROUP_COLORS.length;
    STATE.threads[groupId] = {
      id: groupId, name, initials: name.slice(0,2),
      avatarBg: `linear-gradient(145deg,${GROUP_COLORS[colorIdx]},${GROUP_COLORS[(colorIdx+1)%GROUP_COLORS.length]})`,
      type: 'group', members: memberIds, messages: [], unread: 0
    };
    saveState(); renderThreadList(); openThread(groupId);
  }

  // Show delete picker
  function showDeletePicker() {
    $('#rp-del-picker').remove();
    const contacts = Object.values(STATE.threads);
    if (!contacts.length) return;
    const items = contacts.map(t => {
      const img = STATE.avatars?.[t.name];
      const avHtml = img
        ? `<div class="rp-del-pick-av rp-av-img" style="overflow:hidden"><img src="${img}" style="width:100%;height:100%;object-fit:cover"/></div>`
        : `<div class="rp-del-pick-av" style="background:${t.avatarBg}">${t.initials}</div>`;
      return `<div class="rp-del-pick-item" data-tid="${escHtml(t.id)}">${avHtml}<span class="rp-del-pick-name">${escHtml(t.name)}</span><div class="rp-del-chk"></div></div>`;
    }).join('');

    $('#rp-screen').append(`
      <div class="rp-add-choice rp-del-picker-view" id="rp-del-picker">
        <div class="rp-nav-bar">
          <button class="rp-back" id="rp-del-cancel">取消</button>
          <span class="rp-nav-title">删除好友</span>
          <button id="rp-del-confirm" >删除</button>
        </div>
        <div id="rp-del-list" style="flex:1;overflow-y:auto;padding:8px 0">${items}</div>
      </div>
    `);
  }

  // Bind group picker items
  $(document).on('click', '.rp-grp-pick-item', function() {
    $(this).toggleClass('selected');
  });

  // Bind group modal buttons
  $(document).on('click', '.rp-grp-ft-btn', function() {
    const action = $(this).data('action');
    if (action === 'grp-confirm') {
      confirmCreateGroup();
    } else {
      $('#rp-grp-create').remove();
    }
  });

  // Bind delete picker items
  $(document).on('click', '.rp-del-pick-item', function() {
    $(this).toggleClass('selected');
  });

  // Bind delete picker buttons
  $(document).on('click', '#rp-del-cancel', function() {
    $('#rp-del-picker').remove();
  });

  $(document).on('click', '#rp-del-confirm', function() {
    const selected = $('#rp-del-list .rp-del-pick-item.selected');
    if (!selected.length) return;
    const threadIds = selected.map((_, el) => $(el).data('tid')).get();
    threadIds.forEach(id => {
      delete STATE.threads[id];
    });
    saveState();
    renderThreadList();
    $('#rp-del-picker').remove();
  });
}

export {
  sendSMS,
  sanitizeSmsText,
  extractSmsSummaries,
  beautifySMSInChat,
  initSMS,
  renderThreadList,
  openThread,
  renderBubbles,
  updatePreviews,
  renderPendingQueue,
  incomingCall,
  resolveCall,
  incomingHongbao,
  openHongbao,
  sendUserHongbao,
  showHongbaoSheet,
  incomingVoice,
  playVoice,
  incomingGroupMsg,
  incomingGroupVoice,
  incomingGroupHongbao,
  toggleAttachPanel,
  findOrCreateThread,
  showBanner,
  refreshBadges,
  syncToCurrentChat,
  parsePhone,
  testParsePhone,
  autoAddCharContact,
  cleanInvalidContacts,
  getAvatar,
  setAvatar,
  getSTATE,
  saveState
};