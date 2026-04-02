/**
 * 短信解析模块
 * 处理<SMS>、<MOMENTS>、<CALL>等标签的解析
 */

import { STATE } from '../core/state.js';
import { escHtml } from '../core/utils.js';
import { saveState } from '../core/state.js';
import { renderBubbles, refreshBadges, updatePreviews, showBanner, showLiveChat, renderThreadList } from './chat.js';
import { findOrCreateThread } from './helpers.js';

const GROUP_COLORS = ['#7c3aed','#0891b2','#0d9488','#b45309','#be185d','#1d4ed8'];

/**
 * 匹配线程
 */
export function matchThread(fromRaw) {
  const lower = fromRaw.toLowerCase();

  for (const th of Object.values(STATE.threads)) {
    if (th.name.toLowerCase() === lower) return th.id;
  }

  for (const th of Object.values(STATE.threads)) {
    const thName = th.name.toLowerCase();
    if (lower.includes(thName) || thName.includes(lower)) return th.id;
  }

  return null;
}

/**
 * 解析标签属性
 */
function getTagAttrs(attrText) {
  const attrs = {};
  if (!attrText) return attrs;
  // 兼容:KEY="v" / KEY='v' / KEY="v" / KEY='v' / KEY=v(无引号)
  const attrRe = /(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|"([^"]*)"|'([^']*)'|([^\s>]+))/g;
  let am;
  while ((am = attrRe.exec(attrText)) !== null) {
    attrs[am[1].toUpperCase()] = (am[2] ?? am[3] ?? am[4] ?? am[5] ?? am[6] ?? '').trim();
  }
  return attrs;
}

/**
 * 标准化手机标记
 */
export function normalizePhoneMarkup(raw) {
  let s = String(raw || '');
  // HTML 实体反转义(有些渲染链会把标签转成实体)
  s = s
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, ' ');
  // 全角尖括号兼容
  s = s.replace(/</g, '<').replace(/>/g, '>');
  return s;
}

/**
 * 清理短信文本
 */
export function sanitizeSmsText(text) {
  if (!text) return '';
  return text
    .replace(/\n\s*\n+/g, '\n\n')
    .trim();
}

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
 * 提取短信摘要
 */
export function extractSmsSummaries(block) {
  const smsRe = /<SMS\s+FROM="([^"]+)"\s+TIME="([^"]+)">([^<]*)<\/SMS>/gi;
  const summaries = [];
  let m;
  while ((m = smsRe.exec(block)) !== null) {
    summaries.push({
      from: m[1],
      time: m[2],
      text: m[3].trim().slice(0, 50)
    });
  }
  return summaries;
}

/**
 * 清理手机回声
 */
export function cleanPhoneFallbackReply(raw, fromName) {
  if (!raw) return '';
  // 移除 AI 可能重复用户输入的内容
  let text = raw;
  const patterns = [
    new RegExp(`^${fromName}[,:：]?\\s*`, 'i'),
    /^(好的|收到|了解|明白|OK|ok)[,，。]*\\s*/,
  ];
  patterns.forEach(p => {
    text = text.replace(p, '');
  });
  return text.trim();
}

/**
 * 在元素中应用手机折叠
 */
export function applyPhoneCollapseToEl(textEl, block, fp) {
  if (!textEl || !block) return;
  // 清理PHONE标签
  const cleanBlock = block.replace(/<PHONE[^>]*>/gi, '').replace(/<\/PHONE>/gi, '').trim();
  textEl.innerHTML = cleanBlock;
}

/**
 * 在聊天中重写手机回声
 */
export function rewritePhoneEchoInChat(block, fp) {
  // 清理AI回复中的<PHONE>标签内容
  return block.replace(/<PHONE[^>]*>[\s\S]*?<\/PHONE>/gi, '').trim();
}

/**
 * 重写所有历史手机块
 */
export function rewriteAllHistoryPhoneBlocks() {
  // 遍历所有消息，清理PHONE标签
  document.querySelectorAll('.mes_text').forEach(el => {
    const html = el.innerHTML;
    const cleaned = html.replace(/<PHONE[^>]*>[\s\S]*?<\/PHONE>/gi, '');
    if (cleaned !== html) {
      el.innerHTML = cleaned;
    }
  });
}

/**
 * 核心函数：解析手机块
 */
export function parsePhone(block) {
  let parsedCount = 0;
  let m;

  // ── 严禁 AI 替 user 发言：获取 user 名字，所有 FROM 解析处都会跳过 user 名 ──
  const _parseUserName = (typeof getContext === 'function' ? getContext()?.name1 : null) || '';
  function _isUserFrom(fromStr) {
    if (!_parseUserName || !fromStr) return false;
    return fromStr.trim().toLowerCase() === _parseUserName.toLowerCase();
  }

  // ── 辅助：从文本内容中提取 <img src="..."> 并返回 {imgs, cleanText, pendingPrompts}
  // 生图插件会把 <pic>/<image> 等替换成标准 <img src="...">, 这里统一处理
  function extractImgsFromText(raw) {
    const imgs = [];
    const pendingPrompts = [];

    // 1) 标准 <img src="..."> —— 生图插件替换后的最终形态
    //    注意：ComfyUI 完成后的图片格式为 <img src="..." prompt="..." light_intensity="..." />
    //    必须先提取 src，后续不再把这类标签当 pending 处理
    const imgRe = /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*\/?>/gi;
    let im;
    while ((im = imgRe.exec(raw)) !== null) imgs.push(im[1]);

    // 2) 智绘姬格式 image###prompt### —— 提取 prompt，存为 pending_image 占位
    //    不提取 src（此时尚无图），清洗出文字；生图完成后由 MutationObserver 替换 pending_image
    const chatu8Re = /image###([\s\S]*?)###/gi;
    let cm;
    while ((cm = chatu8Re.exec(raw)) !== null) {
      const prompt = (cm[1] || '').trim();
      if (prompt) pendingPrompts.push(prompt);
    }

    // 3) <pic light_intensity="..." prompt="..." /> —— ComfyUI 世界书触发格式
    //    ComfyUI 插件全自动生图，无需用户点击，不生成 pending_image 占位。
    //    cleanText 里会被清除（见下方 replace），MutationObserver 模式B在图片生成后自动路由。
    //    （此处仅注释说明，无需额外代码处理）

    // 4) 旧格式兼容：<img prompt="..." light_intensity="..."/> 且没有 src 属性
    //    （仅当确实无 src 时才当 pending；ComfyUI 完成图含 src，不会命中此规则）
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

    // ComfyUI <pic> 触发词：把 prompt → threadId 记录到 STATE._pendingComfyPics
    // Observer 模式B通过 prompt 匹配来定向路由，避免主楼正文图片误入手机
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
    // 存入线程作为占位，MutationObserver 捕捉到新图片时会来替换它
    const pendingPrompts = smsPendingPrompts;
    pendingPrompts.forEach(prompt => {
      const th = STATE.threads[threadId];
      if (!th) return;
      // 避免重复添加同一 prompt 的 pending_image
      const alreadyPending = th.messages.some(m => m.type === 'pending_image' && m.prompt === prompt);
      if (alreadyPending) return;
      const pid = `pimg_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
      th.messages.push({ id: pid, from: threadId, type: 'pending_image', prompt, time: msgTime });
      if (STATE.currentView !== 'thread' || STATE.currentThread !== threadId) th.unread++;
      refreshBadges(); updatePreviews();
      if (STATE.currentView === 'thread' && STATE.currentThread === threadId) renderBubbles(threadId);
      showBanner(th.name, '📷 图片生成中...', msgTime);
      saveState();
      console.log('[Phone:pendingImg] 添加 pending_image 占位', { threadId, prompt: prompt.slice(0, 50) });
    });

    if (text) {
      incomingMsg(threadId, text, msgTime);
      parsedCount++;
    } else if (smsImgs.length > 0 || pendingPrompts.length > 0) {
      parsedCount++; // 纯图片/pending_image SMS，无文字也计数
    }
  }

  const notifRe = /<NOTIF\s+TYPE="([^"]+)"\s+TEXT="([^"]+)"\/>/gi;
  const _uname = (typeof getContext === 'function' ? getContext()?.name1 : null) || '';
  while ((m = notifRe.exec(block)) !== null) {
    const nType = m[1], nText = m[2];
    // 跳过由 user 操作触发的位置/红包通知(AI 叙事确认,非 char 主动发起)
    if (STATE._suppressUserNotifUntil && Date.now() < STATE._suppressUserNotifUntil) {
      const lowerText = nText.toLowerCase();
      if (lowerText.includes('位置') || lowerText.includes('红包')) { parsedCount++; continue; }
    }
    addLockNotif(nType, nText);
    parsedCount++;
  }

  // 解析朋友圈
  const momentsRe = /<MOMENTS\s+FROM="([^"]+)"\s+TIME="([^"]+)"(?:\s+IMG="([^"]*)")?\s*>([\s\S]*?)<\/MOMENTS>/gi;
  while ((m = momentsRe.exec(block)) !== null) {
    const rawMomentContent = m[4] || '';
    // 支持 MOMENTS 内容里有 <img src> (生图插件替换后)，优先作为配图
    const { imgs: momentImgs, cleanText: momentCleanText, pendingPrompts: momentPendingPrompts } = extractImgsFromText(rawMomentContent);
    const momentImg = m[3] ? m[3].trim() : (momentImgs[0] || null); // IMG属性优先，否则取内嵌第一张
    const fromName = m[1].trim(), momentTime = m[2].trim();
    // momentId 由 incomingMoment 生成并返回，parsePhone 不再独立计算

    // ── 朋友圈生图适配 A：智绘姬 image###prompt### → 需要用户点击触发 ──
    const pendingPrompt = (!momentImg && momentPendingPrompts && momentPendingPrompts.length > 0)
      ? momentPendingPrompts[0] : null;

    // ── 朋友圈生图适配 B：ComfyUI <pic prompt="..."/> → 全自动，注册到 _pendingMomentImgs 等 Observer 回填 ──
    let comfyPendingPrompt = null;
    if (!momentImg && !pendingPrompt) {
      const picTagReMoment = /<pic\b([\s\S]*?)\/>/gi;
      let picMomentM;
      while ((picMomentM = picTagReMoment.exec(rawMomentContent)) !== null) {
        const pa = getTagAttrs(picMomentM[1]);
        const pp = (pa.PROMPT || pa.prompt || '').trim();
        if (pp) { comfyPendingPrompt = pp; break; }
      }
    }

    const effectivePendingPrompt = pendingPrompt || comfyPendingPrompt;
    const momentId = incomingMoment(fromName, momentTime, momentCleanText.trim(), momentImg, effectivePendingPrompt, comfyPendingPrompt ? 'comfy' : 'chatu8');

    // 同步写 _pendingMomentImgs，供 Observer/MESSAGE_UPDATED 回填
    if (effectivePendingPrompt) {
      if (!STATE._pendingMomentImgs) STATE._pendingMomentImgs = new Map();
      STATE._pendingMomentImgs.set(effectivePendingPrompt, momentId);
      // ComfyUI 同时注册到 _pendingComfyPics，Observer 模式B 用 img.prompt 属性精确匹配
      if (comfyPendingPrompt) {
        STATE._pendingComfyPics = STATE._pendingComfyPics || new Map();
        STATE._pendingComfyPics.set(comfyPendingPrompt, { threadId: '__moment__', momentId, time: momentTime });
        console.log('[Phone:moment:comfy] 朋友圈 ComfyUI 等待生图', { momentId, prompt: comfyPendingPrompt.slice(0, 50) });
      } else {
        console.log('[Phone:moment:pending] 朋友圈智绘姬等待生图', { momentId, prompt: pendingPrompt.slice(0, 50) });
      }

      // ── 立即检查主楼是否已有对应图片（图片先于 parsePhone 生成的情况）──
      // 智绘姬模式：找 image-tag-button 内部已渲染的 <img>
      if (!comfyPendingPrompt && pendingPrompt) {
        const allBtns = document.querySelectorAll('button.st-chatu8-image-button, button.image-tag-button');
        for (const btn of allBtns) {
          const btnPrompt = (btn.getAttribute('data-link') || btn.getAttribute('data-prompt') || btn.textContent || '').trim();
          if (btnPrompt && (btnPrompt.includes(pendingPrompt.slice(0, 30)) || pendingPrompt.includes(btnPrompt.slice(0, 30)))) {
            const imgEl = btn.querySelector('img');
            if (imgEl && imgEl.src && imgEl.src.length > 10) {
              // 图片已经生成好了，直接回填
              const mo = STATE.moments && STATE.moments.find(function(x) { return x.id === momentId; });
              if (mo && !mo.img) {
                mo.img = imgEl.src;
                mo.pendingImg = null;
                mo.pendingImgType = null;
                STATE._pendingMomentImgs.delete(effectivePendingPrompt);
                if (STATE.currentView === 'moments') renderMoments();
                saveState();
                console.log('[Phone:moment:earlyFill] 主楼图片早于 parsePhone，直接回填', { momentId, src: imgEl.src.slice(0, 80) });
              }
            }
            break;
          }
        }
      }
    }
    parsedCount++;
  }

  const commentRe = /<COMMENT\s+MOMENT_ID="([^"]+)"\s+FROM="([^"]+)"\s+TIME="([^"]+)"(?:\s+REPLY_TO="([^"]*)")?\s*>([\s\S]*?)<\/COMMENT>/gi;
  while ((m = commentRe.exec(block)) !== null) {
    incomingComment(m[1].trim(), m[2].trim(), m[3].trim(), m[5].trim(), m[4] ? m[4].trim() : null);
    parsedCount++;
  }

  const sync = block.match(/<SYNC\s+STAGE="(\d+)"\s+PROGRESS="(\d+)"\s+STATUS="([^"]+)"\/>/i);
  if (sync) {
    STATE.sync = { stage: +sync[1], progress: +sync[2], status: sync[3] };
    refreshWidget();
    saveState(); // FIX2: 持久化关系进度
    parsedCount++;
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
      showBanner(groupName, `${fromRaw} 发了一个红包`);
    }
    saveState();
    parsedCount++;
  }

  // ── SIMG (生图专用标签) ──
  // 格式: <SIMG FROM="角色名" TIME="HH:MM">图片描述</SIMG>
  // 内容里的 <img src="..."> 由生图插件替换，小手机在这里提取
  // 也支持纯 src 属性形式: <SIMG FROM="角色名" SRC="url" TIME="HH:MM"/>
  const simgRe = /<SIMG\b([^>]*)>([\s\S]*?)<\/SIMG>/gi;
  while ((m = simgRe.exec(block)) !== null) {
    const attrs = getTagAttrs(m[1]);
    const fromRaw = (attrs.FROM || '').trim();
    const time = (attrs.TIME || '').trim();
    const innerContent = m[2] || '';
    const { imgs: simgImgs } = extractImgsFromText(innerContent);
    // 也接受 SRC 属性直接指定（给 AI 更简单的写法兜底）
    if (attrs.SRC) simgImgs.unshift(attrs.SRC.trim());
    if (simgImgs.length === 0) continue;
    // 路由线程
    let simgThreadId = null;
    if (fromRaw) {
      simgThreadId = matchThread(fromRaw);
      if (!simgThreadId) {
        const curTh = STATE.currentThread && STATE.threads?.[STATE.currentThread];
        simgThreadId = curTh ? STATE.currentThread : findOrCreateThread(fromRaw).id;
      }
    } else {
      simgThreadId = STATE.currentThread || null;
    }
    if (!simgThreadId) continue;
    simgImgs.forEach(src => routeImgToThread(simgThreadId, src, time));
    parsedCount++;
  }

  // ── SIMG 自闭合形式: <SIMG FROM="角色" SRC="url" TIME="HH:MM"/> ──
  const simgSelfRe = /<SIMG\b([^>]*)\/>/gi;
  while ((m = simgSelfRe.exec(block)) !== null) {
    const attrs = getTagAttrs(m[1]);
    const fromRaw = (attrs.FROM || '').trim();
    const time = (attrs.TIME || '').trim();
    const src = (attrs.SRC || '').trim();
    if (!src) continue;
    let simgThreadId2 = fromRaw ? matchThread(fromRaw) : null;
    if (!simgThreadId2) simgThreadId2 = STATE.currentThread || null;
    if (!simgThreadId2) continue;
    routeImgToThread(simgThreadId2, src, time);
    parsedCount++;
  }

  return parsedCount;
}

/**
 * 添加锁屏通知
 */
function addLockNotif(type, text) {
  // 去重:同 type+text 已在通知列表中则跳过
  const isDupe = STATE.notifications.some(n => n.type === type && n.text === text);
  if (isDupe) return;
  STATE.notifications.push({ type, text });
  // 最多保留最近 5 条
  if (STATE.notifications.length > 5) STATE.notifications = STATE.notifications.slice(-5);
  refreshLockNotifs();
}

/**
 * 刷新锁屏通知
 */
function refreshLockNotifs() {
  const c = $('#rp-lock-notifs').empty();
  // 显示全部通知（最多保留最近3条由 addLockNotif 控制）
  STATE.notifications.forEach((n, idx) => {
    const wrap = $('<div>').addClass('rp-ln-wrap');
    // 删除按钮层
    const delBtn = $('<div>').addClass('rp-ln-del-btn').text('删除');
    // 通知卡片
    const card = $('<div>').addClass('rp-ln').append(
      $('<span>').addClass('rp-ln-type').text(n.type),
      $('<span>').addClass('rp-ln-text').text(n.text)
    );

    wrap.append(delBtn, card);
    c.append(wrap);

    // ── 删除按钮点击 ──
    delBtn.on('click', function(e) {
      e.stopPropagation();
      STATE.notifications.splice(idx, 1);
      saveState();
      refreshLockNotifs();
    });

    // ── PC端：点击卡片切换滑开/收回 ──
    // ── 手机端：触摸左滑露出删除按钮，右滑收回 ──
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;
    let touchHandled = false; // 防止 touch 完成后 click 重复触发

    card.on('touchstart', function(e) {
      const t = e.originalEvent.touches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
      isSwiping = false;
      touchHandled = false;
    });

    card.on('touchmove', function(e) {
      const t = e.originalEvent.touches[0];
      const dx = t.clientX - touchStartX;
      const dy = Math.abs(t.clientY - touchStartY);
      // 优先横滑判断
      if (!isSwiping && Math.abs(dx) > 6 && dy < 12) {
        isSwiping = true;
      }
      if (isSwiping) {
        e.preventDefault();
        // 实时跟手时激活 wrap 显示删除按钮
        wrap.addClass('rp-ln-wrap-active');
        // 实时跟手（钳位：0 ~ -72px）
        const clamp = Math.max(-72, Math.min(0, dx - (card.hasClass('rp-ln-swiped') ? 72 : 0)));
        card.css({ transition: 'none', transform: `translateX(${clamp}px)` });
      }
    }, { passive: false });

    card.on('touchend', function(e) {
      touchHandled = true;
      if (!isSwiping) return;
      const t = e.originalEvent.changedTouches[0];
      const dx = t.clientX - touchStartX;
      // 滑动超过阈值 20px → 左滑完全展开；否则弹回
      card.css({ transition: '', transform: '' });
      if (dx < -20) {
        // 关闭其他已展开项
        $('#rp-lock-notifs .rp-ln').not(card[0]).removeClass('rp-ln-swiped');
        $('#rp-lock-notifs .rp-ln-wrap').not(wrap[0]).removeClass('rp-ln-wrap-active');
        card.addClass('rp-ln-swiped');
        wrap.addClass('rp-ln-wrap-active');
      } else {
        card.removeClass('rp-ln-swiped');
        wrap.removeClass('rp-ln-wrap-active');
      }
      isSwiping = false;
    });

    // PC端：点击卡片 toggle 展开（触摸端跳过）
    card.on('click', function(e) {
      if (touchHandled) { touchHandled = false; return; }
      const alreadySwiped = card.hasClass('rp-ln-swiped');
      // 关闭其他
      $('#rp-lock-notifs .rp-ln').not(card[0]).removeClass('rp-ln-swiped');
      $('#rp-lock-notifs .rp-ln-wrap').not(wrap[0]).removeClass('rp-ln-wrap-active');
      if (alreadySwiped) {
        card.removeClass('rp-ln-swiped');
        wrap.removeClass('rp-ln-wrap-active');
      } else {
        card.addClass('rp-ln-swiped');
        wrap.addClass('rp-ln-wrap-active');
      }
    });
  });
}

/**
 * 刷新小组件
 */
function refreshWidget() {
  const { stage, progress, status } = STATE.sync;
  $('#rp-wd-stage').text(`Stage ${stage} · ${(STAGE_NAMES[stage] || '').split('·')[1]?.trim()}`);
  $('#rp-wd-fill').css('width', (progress / 99 * 100).toFixed(1) + '%');
  $('#rp-wd-status').text(status);
}

const STAGE_NAMES = { 1: '初识 · 试探', 2: '增进 · 主导', 3: '陷落 · 占有' };

/**
 * 来电
 */
function incomingCall(fromRaw, time) {
  const thread = findOrCreateThread(fromRaw);
  const customImg = STATE.avatars && STATE.avatars[thread.name];
  const avHtml = customImg
    ? `<div class="rp-call-av rp-av-img" style="background:transparent;overflow:hidden"><img class="rp-av-photo" src="${customImg}" alt=""/></div>`
    : `<div class="rp-call-av" style="background:${thread.avatarBg}">${thread.initials}</div>`;
  $('#rp-call-overlay').html(`
    <div style="display:flex;flex-direction:column;align-items:center">
      ${avHtml}
      <div class="rp-call-name">${escHtml(thread.name)}</div>
      <div class="rp-call-sub">来电中...</div>
    </div>
    <div class="rp-call-btns">
      <div class="rp-call-btn-wrap">
        <div class="rp-call-dec" id="rp-call-dec">📵</div>
        <div class="rp-call-lbl">拒绝</div>
      </div>
      <div class="rp-call-btn-wrap">
        <div class="rp-call-ans" id="rp-call-ans">📞</div>
        <div class="rp-call-lbl">接听</div>
      </div>
    </div>
  `).show();
  STATE._pendingCall = { fromRaw, time, threadId: thread.id };
  clearTimeout(STATE._callTimer);
  STATE._callTimer = setTimeout(() => resolveCall('missed'), 15000);
  showBanner(thread.name, '📞 来电中...');
}

/**
 * 结束通话
 */
function resolveCall(result) {
  clearTimeout(STATE._callTimer);
  const call = STATE._pendingCall;
  $('#rp-call-overlay').hide().empty();
  if (!call) return;
  const thread = STATE.threads[call.threadId];
  if (!thread) return;
  const labels = { missed: '未接来电', declined: '已拒绝', answered: '已接听' };
  thread.messages.push({
    id: `call_${Date.now()}`, from: 'system',
    type: 'call_rec', result, time: call.time,
    label: labels[result]
  });
  if (result === 'missed') {
    thread.unread = (thread.unread || 0) + 1;
    refreshBadges();
  }
  renderThreadList();
  if (STATE.currentThread === thread.id) renderBubbles(thread.id);
  saveState();
  const ta = document.querySelector('#send_textarea');
  if (ta) {
    const actions = {
      missed:   `*${thread.name}拨打了电话,{{user}}未接听*`,
      declined: `*{{user}}拒绝了${thread.name}的来电*`,
      answered: `*{{user}}接听了${thread.name}的来电*`
    };
    ta.value = ta.value.trim() ? `${ta.value.trim()}\n${actions[result]}` : actions[result];
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#send_but')?.click();
  }
  STATE._pendingCall = null;
}

/**
 * 收到红包
 */
function incomingHongbao(fromRaw, amount, note) {
  const thread = findOrCreateThread(fromRaw);
  // 去重:同 from+amount+note 已存在则跳过
  const isDup = thread.messages.some(m => m.type === 'hongbao' && m.name === fromRaw && m.amount === amount && m.note === note);
  if (isDup) return;
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  thread.messages.push({
    id: `hb_${Date.now()}`, from: 'incoming',
    type: 'hongbao', name: fromRaw, time: ts,
    amount, note, opened: false
  });
  thread.unread = (thread.unread || 0) + 1;
  refreshBadges(); renderThreadList();
  if (STATE.currentThread === thread.id) renderBubbles(thread.id);
  showBanner(thread.name, '🧧 发来了一个红包');
  showLiveChat(thread.name, thread.avatarBg, STATE.avatars?.[thread.name] || null, `🧧 红包:${note}`);
  saveState();
}

/**
 * 收到语音消息
 */
function incomingVoice(fromRaw, time, duration, text) {
  const thread = findOrCreateThread(fromRaw);
  // 去重:同 from+duration+text 已存在则跳过
  const isDup = thread.messages.some(m => m.type === 'voice' && m.name === fromRaw && m.duration === duration && m.text === text);
  if (isDup) return;
  thread.messages.push({
    id: `vc_${Date.now()}`, from: 'incoming',
    type: 'voice', name: fromRaw, time,
    duration, text, played: false
  });
  thread.unread = (thread.unread || 0) + 1;
  refreshBadges(); renderThreadList();
  if (STATE.currentThread === thread.id) renderBubbles(thread.id);
  showBanner(thread.name, `🎤 语音消息 ${duration}`);
  showLiveChat(thread.name, thread.avatarBg, STATE.avatars?.[thread.name] || null, `🎤 ${duration}`);
  saveState();
}

/**
 * 收到群聊消息
 */
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
  // 去重:同 from+time+text 已存在则跳过
  const isDup = thread.messages.some(m => m.type === 'group_msg' && m.name === fromRaw && m.text === text);
  if (isDup) return;
  thread.messages.push({
    id: `gm_${Date.now()}`, from: 'incoming',
    type: 'group_msg', name: fromRaw, time, text,
    initials: senderTh.initials, avatarBg: senderTh.avatarBg
  });
  thread.unread = (thread.unread || 0) + 1;
  refreshBadges(); renderThreadList();
  if (STATE.currentThread === groupId) renderBubbles(groupId);
  showBanner(groupName, `${fromRaw}:${text.slice(0,22)}${text.length>22?'...':''}`);
  const _sth = senderTh;
  showLiveChat(fromRaw, _sth.avatarBg, STATE.avatars?.[fromRaw] || null, text);
  saveState();
}

// 将函数暴露到全局，供HTML中的onclick使用
window.parsePhone = parsePhone;
window.normalizePhoneMarkup = normalizePhoneMarkup;
window.matchThread = matchThread;
window.incomingCall = incomingCall;
window.resolveCall = resolveCall;
window.incomingHongbao = incomingHongbao;
window.incomingVoice = incomingVoice;
window.incomingGroupMsg = incomingGroupMsg;
window.addLockNotif = addLockNotif;
window.refreshLockNotifs = refreshLockNotifs;
