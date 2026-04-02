// ================================================================
//  GAMES (2048)
//  游戏模块
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