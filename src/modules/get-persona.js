// ================================================================
//  GET PERSONA
//  角色人设提取模块
// ================================================================

function lgGetPersona() {
  try {
    const ctx = getContext?.() || window.SillyTavern?.getContext?.() || {};

    let char = null;
    if (ctx.characters && ctx.characterId !== undefined) {
      char = ctx.characters[ctx.characterId];
    }
    if (!char && typeof this_chid !== 'undefined' && window.characters) {
      char = window.characters[this_chid];
    }

    if (!char) {
      console.warn('[Ludo] No character data found');
      return '';
    }

    const parts = [];
    const nameInfo = _extractCharNames(ctx, char);
    const charName = nameInfo.primary;
    if (nameInfo.allNames.length > 1) {
      parts.push('角色名:' + nameInfo.primary + '(别名:' + nameInfo.aliases.join('/') + ',用户可能用任意名字称呼你)');
    } else if (charName) {
      parts.push('角色名:' + charName);
    }
    const personality = (char.personality || '').replace(/\s+/g, ' ').trim();
    if (personality) parts.push('性格:' + personality);
    const description = (char.description || '').replace(/\s+/g, ' ').trim();
    if (description) {
      parts.push('人设:' + description.substring(0, 1200));
    }
    const scenario = (char.scenario || '').replace(/\s+/g, ' ').trim();
    if (scenario) parts.push('场景背景:' + scenario.substring(0, 300));
    const example = (char.mes_example || char.first_mes || '').replace(/\s+/g, ' ').trim();
    const exampleClean = example.replace(/「[A-Z_a-z]+」/g, '').replace(/\s+/g, ' ').trim();
    if (exampleClean.length > 20) parts.push('说话语气示例:' + exampleClean.substring(0, 150));
    const wiText = _collectWorldInfoText(charName);
    if (wiText) parts.push('世界设定补充:\n' + wiText);

    const _extractMes = function(m, fallbackName) {
      const mes = (m.mes || '').trim();
      if (!mes) return null;
      const speaker = m.is_user ? (ctx.name1 || '用户') : (charName || ctx.name2 || fallbackName || 'char');
      if (mes.startsWith(':::') || /<(PHONE|SMS|NEWSPAPER|STATUS)[^>]*>/i.test(mes)) {
        if (m.is_user) return null;
        return `${speaker}: [以叙事方式回应]`;
      }
      if (/^\[.*\]$/.test(mes)) return null;
      const quoteMatch = mes.match(/[\u300c\u201c"](.*?)[\u300d\u201d"]/);
      if (quoteMatch) return `${speaker}: ${quoteMatch[1].slice(0, 60)}`;
      const cleaned = mes.replace(/\*[^*]+\*/g, '').replace(/\s+/g, ' ').trim();
      if (cleaned.length < 2) return null;
      return `${speaker}: ${cleaned.slice(0, 80)}`;
    };
    const chatArr = ctx.chat || ctx.messages || [];
    console.log('[lgGetPersona] ctx.chat length:', chatArr.length);
    const recentLines = chatArr.slice(-20)
      .map(m => _extractMes(m, charName))
      .filter(Boolean)
      .slice(-6);
    console.log('[lgGetPersona] recentLines:', recentLines);
    if (recentLines.length > 0) {
      parts.push('近期正文对话(用于判断与用户的关系/语境,勿直接复述):\n' + recentLines.join('\n'));
    }

    const src = parts.filter(Boolean).join('\n').trim();
    if (!src) return '';

    const filtered = src.split('\n').filter(l => {
      const s = l.trim();
      if (!s) return false;
      if (s.includes('权限::') || s.includes('指令::') || s.includes('系统::')) return false;
      if (/互动权限|互动指令/.test(s)) return false;
      if (/开启共演|开启扮演|开启示例/.test(s)) return false;
      return true;
    }).join('\n');

    const header = '【严格扮演以下角色本人,只体现该角色自身的性格特征,不得受描述中其他人物性格影响,不得OOC。无论用户用哪个名字称呼你都要回应】';
    return filtered.trim() ? `${header}\n${filtered.trim()}` : '';
  } catch(e) {
    console.error('[Ludo] lgGetPersona error:', e);
    return '';
  }
}