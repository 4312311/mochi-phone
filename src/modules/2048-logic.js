// ================================================================
//  2048 GAME LOGIC
//  2048游戏逻辑模块
// ================================================================

const LG2048 = {
  board: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
  score: 0,
  best: parseInt(localStorage.getItem('g2048_best') || '0'),
  turn: 'user',
  active: false,
  processing: false,
  won: false,
  charName: '对方',
  chatLog: [],
};

function g2048SlideRow(row) {
  var r = row.filter(function(x) { return x !== 0; });
  var score = 0;
  for (var i = 0; i < r.length - 1; i++) {
    if (r[i] === r[i + 1]) {
      r[i] *= 2;
      score += r[i];
      r.splice(i + 1, 1);
    }
  }
  while (r.length < 4) r.push(0);
  return { row: r, score: score };
}

function g2048Transpose(b) {
  return b[0].map(function(_, c) { return b.map(function(r) { return r[c]; }); });
}

function g2048RevRows(b) {
  return b.map(function(r) { return r.slice().reverse(); });
}

function g2048Apply(b, dir) {
  var board = b.map(function(r) { return r.slice(); });
  if (dir === 'right')      board = g2048RevRows(board);
  else if (dir === 'up')    board = g2048Transpose(board);
  else if (dir === 'down')  { board = g2048Transpose(board); board = g2048RevRows(board); }

  var totalScore = 0, changed = false;
  board = board.map(function(row) {
    var res = g2048SlideRow(row);
    totalScore += res.score;
    if (res.row.some(function(v, i) { return v !== row[i]; })) changed = true;
    return res.row;
  });

  if (dir === 'right')      board = g2048RevRows(board);
  else if (dir === 'up')    board = g2048Transpose(board);
  else if (dir === 'down')  { board = g2048RevRows(board); board = g2048Transpose(board); }

  return { board: board, score: totalScore, changed: changed };
}

function g2048AddTile() {
  var empty = [];
  LG2048.board.forEach(function(row, r) {
    row.forEach(function(v, co) { if (v === 0) empty.push([r, co]); });
  });
  if (!empty.length) return;
  var pos = empty[Math.floor(Math.random() * empty.length)];
  LG2048.board[pos[0]][pos[1]] = Math.random() < 0.9 ? 2 : 4;
}

function g2048HasMoves() {
  return ['left','right','up','down'].some(function(d) { return g2048Apply(LG2048.board, d).changed; });
}

function g2048BestDir() {
  var dirs = ['left','right','up','down'];
  var best = null, bestVal = -1;
  dirs.forEach(function(dir) {
    var res = g2048Apply(LG2048.board, dir);
    if (!res.changed) return;
    var flat = res.board.reduce(function(a, r) { return a.concat(r); }, []);
    var empty = flat.filter(function(x) { return x === 0; }).length;
    var maxTile = Math.max.apply(null, flat);
    var corners = [res.board[3][3], res.board[3][0], res.board[0][0], res.board[0][3]];
    var cornerBonus = corners.indexOf(maxTile) >= 0 ? 40 : 0;
    var val = res.score * 2 + empty * 10 + cornerBonus;
    if (val > bestVal) { bestVal = val; best = dir; }
  });
  if (!best) best = dirs.find(function(d) { return g2048Apply(LG2048.board, d).changed; }) || null;
  return best;
}