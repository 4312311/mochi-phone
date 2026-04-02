// ================================================================
//  GAMES (COMPLETE)
//  完整游戏模块
// ================================================================

let G2048 = {
  grid: [],
  score: 0,
  over: false,
  won: false,
  size: 4,
  init: function() {
    this.grid = Array(this.size * this.size).fill(0);
    this.score = 0;
    this.over = false;
    this.won = false;
    this.addRandomTile();
    this.addRandomTile();
    this.render();
  },
  addRandomTile: function() {
    const empty = this.grid.map((v,i) => v===0?i:-1).filter(i=>i!==-1);
    if (empty.length === 0) return;
    const idx = empty[Math.floor(Math.random()*empty.length)];
    this.grid[idx] = Math.random()<0.9?2:4;
  },
  render: function() {
    const container = $('#rp-2048-board').empty();
    for (let i=0;i<this.grid.length;i++) {
      const val = this.grid[i];
      const cls = val?'rp-2048-cell rp-2048-val-'+val:'rp-2048-cell rp-2048-empty';
      container.append(`<div class="${cls}">${val||''}</div>`);
    }
    $('#rp-2048-score').text(this.score);
    if (this.over) {
      $('#rp-2048-msg').text(this.won?'你赢了!':'游戏结束').show();
    } else {
      $('#rp-2048-msg').hide();
    }
  },
  move: function(dir) {
    if (this.over) return;
    const moved = this.slide(dir);
    if (moved) {
      this.addRandomTile();
      this.render();
      this.checkGameOver();
    }
  },
  slide: function(dir) {
    let moved = false;
    const rotate = (g,times) => {
      let r = [...g];
      for (let t=0;t<times;t++) {
        const n = new Array(16).fill(0);
        for (let i=0;i<4;i++) for (let j=0;j<4;j++) n[i*4+j]=r[(3-j)*4+i];
        r=n;
      }
      return r;
    };
    const slideLeft = (g) => {
      let m = false;
      const out = [];
      for (let i=0;i<4;i++) {
        let row = g.slice(i*4,i*4+1);
        const filtered = row.filter(v=>v!==0);
        const merged = [];
        for (let j=0;j<filtered.length;j++) {
          if (j+1<filtered.length && filtered[j]===filtered[j+1]) {
            merged.push(filtered[j]*2);
            this.score += filtered[j]*2;
            if (filtered[j]*2 === 2048 && !this.won) { this.won = true; }
            j++;
          } else {
            merged.push(filtered[j]);
          }
        }
        while (merged.length < 4) merged.push(0);
        out.push(...merged);
        if (row.join(',') !== merged.join(',')) m = true;
      }
      return { grid: out, moved: m };
    };
    const rotations = {left:0,up:1,right:2,down:3};
    const r = rotations[dir];
    const rotated = rotate(this.grid,r);
    const res = slideLeft(rotated);
    this.grid = rotate(res.grid, (4-r)%4);
    return res.moved;
  },
  checkGameOver: function() {
    if (this.grid.includes(0)) return;
    for (let i=0;i<4;i++) {
      for (let j=0;j<3;j++) {
        if (this.grid[i*4+j] === this.grid[i*4+j+1]) return;
        if (this.grid[j*4+i] === this.grid[(j+1)*4+i]) return;
      }
    }
    this.over = true;
  },
  reset: function() { this.init(); }
};

let GM = {
  canvas: null,
  ctx: null,
  tower: [],
  items: [],
  score: 0,
  round: 0,
  timer: 0,
  timerInterval: null,
  isCharTurn: false,
  isUserTurn: false,
  colors: { red: '#e74c3c', blue: '#3498db', green: '#2ecc71', yellow: '#f1c40f' },
  
  init: function() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 280;
    this.canvas.height = 400;
    this.ctx = this.canvas.getContext('2d');
    this.tower = [];
    this.items = [];
    this.score = 0;
    this.round = 1;
    this.timer = 30;
    this.isCharTurn = false;
    this.isUserTurn = false;
    this.buildTower();
    this.readColors();
    this.spawnItems();
    this.startTimer();
    this.loop();
  },
  
  buildTower: function() {
    this.tower = [];
    for (let i = 0; i < 5; i++) {
      this.tower.push({
        color: ['red', 'blue', 'green', 'yellow'][Math.floor(Math.random() * 4)],
        health: 3
      });
    }
  },
  
  readColors: function() {
    return this.colors;
  },
  
  spawnItems: function() {
    this.items = [];
    for (let i = 0; i < 3; i++) {
      this.items.push({
        type: ['red', 'blue', 'green', 'yellow'][Math.floor(Math.random() * 4)],
        x: 50 + i * 70,
        y: 350,
        radius: 20
      });
    }
  },
  
  drawItem: function(ctx, type, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = this.colors[type];
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  },
  
  draw: function() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = '#2c3e50';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.tower.forEach((block, i) => {
      this.ctx.fillStyle = this.colors[block.color];
      this.ctx.fillRect(90, 50 + i * 60, 100, 50);
      this.ctx.strokeStyle = '#fff';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(90, 50 + i * 60, 100, 50);
      
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '20px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(block.health, 140, 80 + i * 60);
    });
    
    this.items.forEach(item => {
      this.drawItem(this.ctx, item.type, item.x, item.y, item.radius);
    });
    
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '16px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`分数: ${this.score}`, 10, 25);
    this.ctx.fillText(`回合: ${this.round}`, 200, 25);
    this.ctx.fillText(`时间: ${this.timer}`, 10, 45);
  },
  
  loop: function(timestamp) {
    if (!this.ctx) return;
    this.draw();
    requestAnimationFrame((ts) => this.loop(ts));
  },
  
  startTimer: function() {
    this.timer = 30;
    this.updateTimerUI();
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timer--;
      this.updateTimerUI();
      if (this.timer <= 0) {
        clearInterval(this.timerInterval);
        this.addMsg('system', '时间到！');
      }
    }, 1000);
  },
  
  updateTimerUI: function() {
    $('#gm-timer').text(this.timer);
  },
  
  updateScoreUI: function() {
    $('#gm-score').text(this.score);
  },
  
  updateRoundUI: function() {
    $('#gm-round').text(this.round);
  },
  
  addMsg: function(type, text) {
    const container = $('#gm-messages');
    const cls = type === 'system' ? 'gm-msg-system' : 'gm-msg-normal';
    container.append(`<div class="${cls}">${text}</div>`);
    container.scrollTop(container[0].scrollHeight);
  },
  
  startCharTurn: function() {
    this.isCharTurn = true;
    this.addMsg('system', '角色回合');
    setTimeout(() => {
      this.isUserTurn = true;
      this.isCharTurn = false;
      this.addMsg('system', '你的回合');
    }, 2000);
  },
  
  startUserTurn: function() {
    this.isUserTurn = true;
    this.addMsg('system', '你的回合');
  }
};

let GGOLD = {
  mode: 'easy',
  score: 0,
  round: 0,
  timer: 0,
  timerInterval: null,
  
  open: function() {
    $('#gm-modal').show();
  },
  
  startGame: function(mode) {
    this.mode = mode;
    this.score = 0;
    this.round = 1;
    this.timer = mode === 'easy' ? 60 : 30;
    GM.init();
    this.bindEvents();
  },
  
  bindEvents: function() {
    $(document).off('click.gmgold').on('click.gmgold', '.gm-item', function() {
      if (!GM.isUserTurn) return;
      const type = $(this).data('type');
      console.log('选中:', type);
    });
  },
  
  init: function() {
    GM.init();
  }
};

function g2048Init() {
  G2048.init();
}

function g2048UserMove(dir) {
  G2048.move(dir);
}

function g2048CharTurn() {
  setTimeout(() => {
    const dirs = ['up', 'down', 'left', 'right'];
    const dir = dirs[Math.floor(Math.random() * dirs.length)];
    G2048.move(dir);
  }, 1000);
}

function g2048GameOver() {
  if (G2048.over) {
    alert('游戏结束！分数: ' + G2048.score);
  }
}

function g2048Chat(text) {
  console.log('2048 chat:', text);
}