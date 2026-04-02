// ================================================================
//  LUDO API CALL
//  飞行棋API调用模块
// ================================================================

async function lgCallAPI(prompt, maxTokens = 150, sysMsg = '') {
  const cfg = (() => { 
    try { 
      return JSON.parse(localStorage.getItem('rp_ludo_api') || '{}'); 
    } catch(e) { 
      return {}; 
    } 
  })();
  console.log('[LudoAPI] mode:', cfg.mode, '| promptLen:', (typeof prompt === 'string' ? prompt : JSON.stringify(prompt)).length, '| maxTokens:', maxTokens);

  if (cfg.mode === 'custom' && cfg.url && cfg.key) {
    try {
      const msgs = [];
      if (sysMsg) msgs.push({ role: 'system', content: sysMsg });
      msgs.push({ role: 'user', content: prompt });
      console.log('[LudoAPI] custom API → messages:', JSON.stringify(msgs).slice(0, 300));
      const res = await fetch(`${cfg.url.replace(/\/+$/, '')}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${cfg.key}` },
        body: JSON.stringify({
          model: cfg.model || 'deepseek-chat',
          messages: msgs,
          max_tokens: maxTokens,
          temperature: 0.9
        })
      });
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content?.trim();
      console.log('[LudoAPI] custom API raw response:', JSON.stringify(data).slice(0, 400));
      console.log('[LudoAPI] custom API extracted text:', JSON.stringify(text));
      if (text) return text;
      console.warn('[Ludo] custom API returned empty response, full data:', JSON.stringify(data));
    } catch(e) {
      console.warn('[Ludo] custom API error:', e.message);
    }
    return null;
  }

  try {
    const { generateRaw } = await import('../../../../script.js').catch(() => ({}));
    if (typeof generateRaw === 'function') {
      const msgs = [];
      if (sysMsg) msgs.push({ role: 'system', content: sysMsg });
      msgs.push({ role: 'user', content: prompt });
      console.log('[LudoAPI] ST generateRaw → messages:', JSON.stringify(msgs).slice(0, 300));
      const resp = await generateRaw({ prompt: msgs, responseLength: maxTokens });
      console.log('[LudoAPI] ST generateRaw raw resp:', JSON.stringify(resp));
      if (resp && resp.trim()) return resp.trim();
      console.warn('[LudoAPI] ST generateRaw returned empty');
    } else {
      console.warn('[LudoAPI] generateRaw not available');
    }
  } catch(e) {
    console.warn('[LudoAPI] ST generateRaw error:', e.message, e.stack?.slice(0,200));
  }
  return null;
}