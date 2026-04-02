// ================================================================
//  GOLD MINER EVENTS
//  黄金矿工事件绑定模块
// ================================================================

let _ggoldBound = false;

function ggoldBindEvents() {
  $(document).on('click', '#ggold-mode-vs', function() { ggoldStartGame('vs'); });
  $(document).on('click', '#ggold-mode-co', function() { ggoldStartGame('coop'); });
  $(document).on('click', '#ggold-launch-btn', function() {
    if (!GM.active || GM.turn !== 'user' || GM.hookState !== 'swing') return;
    GM.hookState = 'go';
    $(this).prop('disabled', true);
  });
  $(document).on('click', '#ggold-newbtn', function() {
    if (GM.rafId) { cancelAnimationFrame(GM.rafId); GM.rafId = null; }
    if (GM.timerInterval) { clearInterval(GM.timerInterval); GM.timerInterval = null; }
    GM.active = false; GM.hookState = 'idle';
    if (GM.mode === 'coop') {
      GM.towerLevel = 0;
      const _tk = GM._towerKey || 'ggold_tower_default';
      localStorage.setItem(_tk, '0');
    }
    ggoldOpen();
  });
  $(document).on('click', '#ggold-reset-tower-btn', function() {
    GM.towerLevel = 0;
    localStorage.removeItem(GM._towerKey || 'ggold_tower_default');
    ggoldOpen();
  });
  $(document).on('click', '#ggold-replay-btn', function() {
    if (GM.coopWon) {
      GM.coopWon = false;
      ggoldStartGame('coop');
    } else {
      ggoldOpen();
    }
  });
  
  function ggoldSendChat() {
    const input = document.getElementById('ggold-input');
    const text = (input && input.value.trim()) || '';
    if (!text) return;
    input.value = '';
    gmAddMsg('user', text);
    
    (async () => {
      const rawCtx = typeof getContext === 'function' ? getContext() : {};
      const charName = GM.charName;
      const userName = (rawCtx && rawCtx.name1) || '你';
      
      const prompt = `你是${charName}，正在和${userName}玩黄金矿工游戏。当前游戏情况：${GM.mode === 'vs' ? '竞技模式' : '合作模式'}，第${GM.round}轮，你的分数：${GM.charScore}，${userName}的分数：${GM.userScore}。${userName}说："${text}"。请用简短、口语化的方式回应（不超过50字）。`;
      
      try {
        const reply = await aiCallAPI(prompt, 100, '');
        if (reply) {
          gmAddMsg('char', reply.trim());
        }
      } catch (e) {
        console.warn('[GoldMiner] ggoldSendChat error:', e);
      }
    })();
  }
  
  $(document).on('click', '#ggold-send', ggoldSendChat);
  $(document).on('keydown', '#ggold-input', function(e) {
    if (e.key === 'Enter') ggoldSendChat();
  });
}

function ggoldOpen() {
  if (!_ggoldBound) { ggoldBindEvents(); _ggoldBound = true; }
  const ctx = typeof getContext === 'function' ? getContext() : {};
  GM.charName = ctx?.name2 || ctx?.characters?.[ctx?.characterId]?.name || '对方';
  const clbl = document.getElementById('ggold-c-lbl');
  if (clbl) clbl.textContent = GM.charName;
  GM.towerTargets = gmBuildTower();
  const _towerKey = 'ggold_tower_' + (GM.charName || 'default');
  GM._towerKey = _towerKey;
  GM.towerLevel = parseInt(localStorage.getItem(_towerKey) || '0');
  if (GM.towerLevel >= GM.towerTargets.length) GM.towerLevel = GM.towerTargets.length - 1;
  gmReadColors();
  if (GM.rafId) { cancelAnimationFrame(GM.rafId); GM.rafId = null; }
  if (GM.timerInterval) { clearInterval(GM.timerInterval); GM.timerInterval = null; }
  GM.active = false;
  GM.hookState = 'idle';
  const modeEl = document.getElementById('ggold-mode-select');
  const overEl = document.getElementById('ggold-over');
  if (modeEl) modeEl.style.display = 'flex';
  if (overEl) overEl.style.display = 'none';
}

function ggoldStartGame(mode) {
  GM.mode = mode;
  GM.turn = 'user';
  GM.round = 1;
  GM.userScore = 0;
  GM.charScore = 0;
  GM.chatLog = [];
  GM.hookedItem = null;
  GM.active = true;
  const modeEl = document.getElementById('ggold-mode-select');
  const overEl = document.getElementById('ggold-over');
  const chatEl = document.getElementById('ggold-chat');
  const coopBar = document.getElementById('ggold-coop-bar');
  if (modeEl) modeEl.style.display = 'none';
  if (overEl) overEl.style.display = 'none';
  if (chatEl) chatEl.innerHTML = '';
  if (coopBar) coopBar.style.display = mode === 'coop' ? 'block' : 'none';
  gmUpdateScoreUI();
  gmUpdateRoundUI();
  gmSpawnItems();
  const target = GM.towerTargets[GM.towerLevel] || 1000;
  gmAddMsg('sys', mode === 'vs'
    ? '⚔️ 竞技模式开始！3轮比拼，最后比总分'
    : `🤝 合作模式！第${GM.towerLevel + 1}层，目标：${target}分`
  );
  gmStartUserTurn();
}