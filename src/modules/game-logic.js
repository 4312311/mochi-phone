// ================================================================
//  GAME LOGIC
//  游戏逻辑模块
// ================================================================

function lgCoords(player, pos) {
  const CELL = 60;
  const MARGIN = 10;
  const x = MARGIN + pos * (CELL + MARGIN);
  const y = player === 'char' ? 10 : 80;
  return { x, y };
}

function lgRender() {
  const canvas = document.getElementById('rp-game-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const CELL = 60;
  const MARGIN = 10;
  
  ctx.fillStyle = '#2c3e50';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < 6; i++) {
    const charCoords = lgCoords('char', i);
    const userCoords = lgCoords('user', i);
    
    ctx.fillStyle = '#34495e';
    ctx.fillRect(charCoords.x, charCoords.y, CELL, CELL);
    ctx.fillRect(userCoords.x, userCoords.y, CELL, CELL);
  }
}

function lgDrawPiece(C, player, pos, CELL) {
  const coords = lgCoords(player, pos);
  const ctx = document.getElementById('rp-game-canvas').getContext('2d');
  ctx.fillStyle = C;
  ctx.beginPath();
  ctx.arc(coords.x + CELL/2, coords.y + CELL/2, CELL/3, 0, Math.PI * 2);
  ctx.fill();
}

function lgRoll() {
  return Math.floor(Math.random() * 6) + 1;
}

function lgStatus(txt) {
  $('#rp-game-status-text').text(txt);
}

function lgMsg(type, text) {
  const container = $('#rp-game-messages');
  const cls = type === 'system' ? 'rp-game-msg-system' : 'rp-game-msg-normal';
  container.append(`<div class="${cls}">${text}</div>`);
  container.scrollTop(container[0].scrollHeight);
}

function lgWin(winner) {
  lgStatus(winner + ' 获胜！');
  lgMsg('system', winner + ' 获胜！');
}

function cleanGameReply(raw, charName) {
  if (!raw) return '';
  return raw
    .replace(/\*([^*]+)投掷骰子[^\*]*\*/gi, '')
    .replace(/\[游戏提示[^\]]*\]/gi, '')
    .replace(/<GAME[^>]*>[\s\S]*?<\/GAME>/gi, '')
    .trim();
}

function lgGetPersona() {
  const ctx = getContext();
  const charName = ctx?.name2 || '对方';
  const userName = ctx?.name1 || '用户';
  
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
  
  return {
    charName,
    userName,
    charPersona
  };
}

function lgCharComment(event) {
  const comments = [
    '好运气！',
    '这局我要赢了！',
    '再来一次！',
    '有意思...',
    '你很强！',
    '让我想想...',
    '这步不错！'
  ];
  const comment = comments[Math.floor(Math.random() * comments.length)];
  lgMsg('char', comment);
}