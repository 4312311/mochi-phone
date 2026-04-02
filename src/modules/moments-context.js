// ================================================================
//  MOMENTS CONTEXT
//  朋友圈上下文模块
// ================================================================

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