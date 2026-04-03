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
function parsePhone(block) {
  let parsedCount = 0;
  let m;

  // ── 严禁 AI 替 user 发言：获取 user 名字，所有 FROM 解析处都会跳过 user 名 ──
  const _parseUserName = (typeof getContext === 'function' ? getContext()?.name1 : null) || '';
  function _isUserFrom(fromStr) {
    if (!_parseUserName || !fromStr) return false;
    return fromStr.trim().toLowerCase() === _parseUserName.toLowerCase();
  }

  // ── 辅助：从文本内容中提取 <img src="..."> 并返回 {imgs, cleanText, pendingPrompts}
  function extractImgsFromText(raw) {
    const imgs = [];
    const pendingPrompts = [];

    // 1) 标准 <img src="..."> —— 生图插件替换后的最终形态
    const imgRe = /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*\/?>/gi;
    let im;
    while ((im = imgRe.exec(raw)) !== null) imgs.push(im[1]);

    // 2) 智绘姬格式 image###prompt### —— 提取 prompt，存为 pending_image 占位
    const chatu8Re = /image###([\s\S]*?)###/gi;
    let cm;
    while ((cm = chatu8Re.exec(raw)) !== null) {
      const prompt = (cm[1] || '').trim();
      if (prompt) pendingPrompts.push(prompt);
    }

    // 3) <pic light_intensity="..." prompt="..." /> —— ComfyUI 世界书触发格式

    // 4) 旧格式兼容：<img prompt="..." light_intensity="..."/> 且没有 src 属性
    const imgPromptRe = /<img\b(?![^>]*\bsrc=)[^>]*\bprompt=["']([^"']+)["'][^>]*\/?>/gi;
    let pm;
    while ((pm = imgPromptRe.exec(raw)) !== null) {
      const prompt = (pm[1] || '').trim();
      if (prompt) pendingPrompts.push(prompt);
    }

    let cleanText = raw
      .replace(/<img\b[^>]*>>*/gi, '')               // 吃掉img标签及ComfyUI插件可能残留的多余>
      .replace(/image###[\s\S]*?###/gi, '')          // 智绘姬 image###...###
      .replace(/<pic\b[^>]*>[\s\S]*?<\/pic>/gi, '')  // <pic>...</pic> 格式
      .replace(/<pic\b[\s\S]*?\/>/gi, '')            // <pic .../> 自闭合（含prompt内有>的情况）
      .replace(/<pic\b[^>]*>/gi, '')                 // 兜底：非自闭合 <pic ...> 无 </pic> 的残留开标签
      .replace(/<imageTag>[\s\S]*?<\/imageTag>/gi, '') // 主楼生图世界书外壳
      .replace(/<image>[\s\S]*?<\/image>/gi, '')     // <image>...</image> 包裹块
      .replace(/<imgthink>[\s\S]*?<\/imgthink>/gi, '') // <imgthink> 思考过程
      .trim();

    return { imgs, cleanText, pendingPrompts };
  }

  // ── 辅助：把图片 src 路由到指定线程
  function routeImgToThread(threadId, src, time) {
    const th = STATE.threads[threadId];
    if (!th) return;
    const fallbackTime = time || `${String(new Date().getHours()).padStart(2,'0')}:${String(new Date().getMinutes()).padStart(2,'0')}`;
    const isDup = th.messages.some(msg => msg.type === 'image' && msg.src === src);
    if (isDup) return;
    th.messages.push({ id: `aimg_${Date.now()}_${Math.random().toString(36).slice(2,6)}`, from: threadId, type: 'image', time: fallbackTime, src });
    if (STATE.currentView !== 'thread' || STATE.currentThread !== threadId) th.unread++;
    refreshBadges(); updatePreviews();
    if (STATE.currentView === 'thread' && STATE.currentThread === threadId) renderBubbles(threadId);
    showBanner(th.name, '[图片]', fallbackTime);
    saveState();
  }

  // 更鲁棒:支持属性顺序变化、单引号/双引号
  const smsTagRe = /<SMS\b([^>]*)>([\s\S]*?)<\/SMS>/gi;
  while ((m = smsTagRe.exec(block)) !== null) {
    const attrs    = getTagAttrs(m[1]);
    const fromRaw0 = (attrs.FROM || '').trim();
    // 严禁 AI 替 user 发言：FROM 是 user 名字时直接跳过
    if (_isUserFrom(fromRaw0)) { console.log('[Phone:guard] SMS FROM=user blocked:', fromRaw0); continue; }
    const time     = (attrs.TIME || '').trim();
    const rawContent = m[2] || '';

    // 先从 SMS 内容里提取图片（生图插件替换后的 <img src>）和智绘姬 pending prompts
    const { imgs: smsImgs, cleanText: smsCleanText, pendingPrompts: smsPendingPrompts } = extractImgsFromText(rawContent);
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
      if (!threadId) {
        // FROM 名字匹配失败 → 自动新建该 NPC 的线程，不要把消息误投到当前打开的线程
        const newTh = findOrCreateThread(fromRaw);
        threadId = newTh.id;
        console.log('[Phone:diag] parsePhone: FROM "' + fromRaw + '" not in contacts, auto-created thread', threadId);
      }
    } else if (STATE.currentThread && STATE.threads?.[STATE.currentThread]) {
      threadId = STATE.currentThread;
      fromRaw = STATE.threads[threadId]?.name || '';
    }

    if (!threadId) {
      console.log('[Phone:diag] parsePhone: no threadId found for FROM=' + fromRaw0);
      continue;
    }
    const fallbackTime = `${String(new Date().getHours()).padStart(2,'0')}:${String(new Date().getMinutes()).padStart(2,'0')}`;
    const msgTime = time || fallbackTime;
    console.log('[Phone:diag] incomingMsg called', { threadId, text: text.slice(0,40), time: msgTime });

    // 先发已有图片（生图插件已替换完的 <img src>）
    smsImgs.forEach(src => routeImgToThread(threadId, src, msgTime));

    // 发送文本消息
    if (text) {
      const th = STATE.threads[threadId];
      if (th) {
        th.messages.push({ from: threadId, text, time: msgTime });
        if (STATE.currentView !== 'thread' || STATE.currentThread !== threadId) th.unread++;
        refreshBadges(); updatePreviews();
        if (STATE.currentView === 'thread' && STATE.currentThread === threadId) renderBubbles(threadId);
        showBanner(th.name, text, msgTime);
        saveState();
        parsedCount++;
      }
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
        th.messages.push({ id: pendingId, from: threadId, type: 'pending_image', time: msgTime, prompt });
        if (STATE.currentView === 'thread' && STATE.currentThread === threadId) renderBubbles(threadId);
        saveState();
        parsedCount++;
      }
    });
  }

  // ── CALL ──
  const callRe = /<CALL\s+FROM="([^"]+)"\s+TIME="([^"]+)"\s*\/?>/gi;
  while ((m = callRe.exec(block)) !== null) {
    const callFrom = m[1].trim();
    if (_isUserFrom(callFrom)) { console.log('[Phone:guard] CALL FROM=user blocked:', callFrom); continue; }
    incomingCall(callFrom, m[2].trim());
    parsedCount++;
  }
  
  // ── HONGBAO ──
  const hongbaoRe = /<HONGBAO\s+FROM="([^"]+)"\s+AMOUNT="([^"]+)"(?:\s+NOTE="([^"]*)")?\s*\/?>/gi;
  const _userName = (typeof getContext === 'function' ? getContext()?.name1 : null) || '';
  while ((m = hongbaoRe.exec(block)) !== null) {
    const fromName = m[1].trim();
    // 跳过 user 自己发出的红包(AI 确认回显),只处理 char 发来的
    if (_userName && fromName.toLowerCase() === _userName.toLowerCase()) continue;
    incomingHongbao(fromName, m[2].trim(), m[3] ? m[3].trim() : '恭喜发财');
    parsedCount++;
  }
  
  // ── VOICE ──
  const voiceRe = /<VOICE\s+FROM="([^"]+)"\s+TIME="([^"]+)"\s+DURATION="([^"]+)">([\s\S]*?)<\/VOICE>/gi;
  while ((m = voiceRe.exec(block)) !== null) {
    const voiceFrom = m[1].trim();
    if (_isUserFrom(voiceFrom)) { console.log('[Phone:guard] VOICE FROM=user blocked:', voiceFrom); continue; }
    incomingVoice(voiceFrom, m[2].trim(), m[3].trim(), m[4].trim());
    parsedCount++;
  }
  
  // ── GROUP MSG ──
  const gmsgRe = /<GMSG\s+FROM="([^"]+)"\s+GROUP="([^"]+)"\s+TIME="([^"]+)">([\s\S]*?)<\/GMSG>/gi;
  while ((m = gmsgRe.exec(block)) !== null) {
    const gmsgFrom = m[1].trim();
    if (_isUserFrom(gmsgFrom)) { console.log('[Phone:guard] GMSG FROM=user blocked:', gmsgFrom); continue; }
    incomingGroupMsg(gmsgFrom, m[2].trim(), m[3].trim(), m[4].trim());
    parsedCount++;
  }
  
  // ── GROUP VOICE (群聊语音) ──
  // 格式: <GVOICE FROM="角色" GROUP="群名" TIME="HH:MM" DURATION="0:08">语音文字</GVOICE>
  const gvoiceRe = /<GVOICE\s+FROM="([^"]+)"\s+GROUP="([^"]+)"\s+TIME="([^"]+)"\s+DURATION="([^"]+)">([\s\S]*?)<\/GVOICE>/gi;
  while ((m = gvoiceRe.exec(block)) !== null) {
    const fromRaw = m[1].trim(), groupName = m[2].trim(), time = m[3].trim();
    // 严禁 AI 替 user 发言
    if (_isUserFrom(fromRaw)) { console.log('[Phone:guard] GVOICE FROM=user blocked:', fromRaw); continue; }
    const duration = m[4].trim(), voiceText = m[5].trim();
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
    const isDupGV = grpThread.messages.some(msg => msg.type === 'group_voice' && msg.name === fromRaw && msg.voiceText === voiceText);
    if (!isDupGV) {
      const senderTh = findOrCreateThread(fromRaw);
      grpThread.messages.push({
        id: `ggv_${Date.now()}`, from: 'incoming',
        type: 'group_voice', name: fromRaw, time, duration, voiceText,
        initials: senderTh.initials, avatarBg: senderTh.avatarBg
      });
      grpThread.unread = (grpThread.unread || 0) + 1;
      refreshBadges(); renderThreadList();
      if (STATE.currentThread === groupId) renderBubbles(groupId);
      showBanner(groupName, `${fromRaw}: 🎤 [${duration}]`);
    }
    saveState();
    parsedCount++;
  }
  
  // ── GROUP HONGBAO (群聊红包) ──
  // 格式: <GHONGBAO FROM="角色" GROUP="群名" AMOUNT="金额" NOTE="备注"/>
  const ghongbaoRe = /<GHONGBAO\s+FROM="([^"]+)"\s+GROUP="([^"]+)"\s+AMOUNT="([^"]+)"(?:\s+NOTE="([^"]*)")?\s*\/?>/gi;
  while ((m = ghongbaoRe.exec(block)) !== null) {
    const fromRaw = m[1].trim(), groupName = m[2].trim();
    const amount = m[3].trim(), note = m[4] ? m[4].trim() : '恭喜发财';
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
  }

  return parsedCount;
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

// Export test function for debugging
export { testParsePhone, autoAddCharContact, cleanInvalidContacts, getAvatar, setAvatar };

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
    const colorIdx = Object.keys(STATE.threads).length % GROUP_COLORS.length;
    thread = {
      id: contactId,
      name: contactName,
      initials: initials || contactName.slice(0, 2).toUpperCase(),
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

  if (!STATE.currentThreadId || !STATE.pendingMessages || STATE.pendingMessages.length === 0) return;

  const th = STATE.threads[STATE.currentThreadId];
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  // 写入手机 UI(全部排队消息)
  const allMessages = [...STATE.pendingMessages];
  STATE.pendingMessages = [];
  renderPendingQueue();

  allMessages.forEach(text => {
    th.messages.push({ from: 'user', text, time: ts });
  });
  renderBubbles(STATE.currentThreadId);
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
          <div class="rp-voice-txt">${escHtml(msg.text)}</div>
        </div>
      `));
      inner.append($('<div>').addClass('rp-bts').text(msg.time));
      wrap.append(avEl, inner);
      area.append(wrap); return;
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
  STATE.currentThreadId = threadId;
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

// Incoming voice (placeholder)
function incomingVoice(threadId, senderName, duration) {
  console.log('[Messages] Incoming voice:', duration);
}

// Play voice (placeholder)
function playVoice(voiceId) {
  console.log('[Messages] Play voice:', voiceId);
}

// Incoming group message (placeholder)
function incomingGroupMsg(groupId, groupName, senderName, text) {
  console.log('[Messages] Incoming group message:', text);
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

    const currentThreadId = getSTATE().currentThreadId;
    const currentThread = STATE.threads[currentThreadId];
    if (currentThread) {
      sendSMS(currentThreadId, text);
      $input.val('');
    }
  });

  // Bind input enter key
  $(document).on('keypress', '#rp-input', function(e) {
    if (e.which === 13) {
      const $input = $(this);
      const text = $input.val().trim();
      if (!text) return;

      const currentThreadId = getSTATE().currentThreadId;
      const currentThread = STATE.threads[currentThreadId];
      if (currentThread) {
        sendSMS(currentThreadId, text);
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
  getSTATE
};