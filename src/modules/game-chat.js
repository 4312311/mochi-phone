// ================================================================
//  GAME CHAT
//  游戏聊天模块
// ================================================================

function lgAddChatMsg(type, text) {
  const role = type === 'user' ? '你' : LG.charName;
  const color = type === 'user' ? 'var(--rp-sent-bg)' : 'var(--rp-recv-bg)';
  const align = type === 'user' ? 'flex-end' : 'flex-start';
  const msgHtml = `<div class="rp-game-chat-msg" style="align-self:${align};background:${color};color:${type==='user'?'#fff':'#000'}"><strong>${role}:</strong> ${escHtml(text)}</div>`;
  const el = document.getElementById('rp-game-chat');
  if (el) el.scrollTop = el.scrollHeight;
  const fs = document.getElementById('rp-game-chat-fs');
  if (fs && fs.style.display !== 'none') {
    const body = document.getElementById('rp-game-chat-fs-body');
    if (body) { 
      body.insertAdjacentHTML('beforeend', msgHtml); 
      body.scrollTop = body.scrollHeight; 
    }
  }
  if (type === 'user' || type === 'char') {
    if (!LG.chatLog) LG.chatLog = [];
    LG.chatLog.push({ role: type, text: text });
    if (LG.chatLog.length > 30) LG.chatLog.shift();
  }
}

function lgWin(winner) {
  LG.active = false;
  if (LG._animFrame) { 
    cancelAnimationFrame(LG._animFrame); 
    LG._animFrame = null; 
  }
  const isUser = winner === 'user';
  $('#game-win-emoji').text(isUser ? '🎉' : '😅');
  $('#game-win-title').text(isUser ? '你赢了!' : `${LG.charName} 赢了!`);
  $('#game-win-sub').text(isUser
    ? `你率先抵达终点!${LG.charName}甘拜下风~`
    : `${LG.charName}率先抵达终点!再来一局?`);
  $('#rp-game-win').show();
}