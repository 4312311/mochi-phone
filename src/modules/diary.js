// ================================================================
//  DIARY
//  日记模块
// ================================================================

function renderDiaryList() {
  const container = $('#rp-diary-list').empty();
  if (!STATE.diary || STATE.diary.length === 0) {
    container.append('<div class="rp-diary-empty"><span>📖</span><span>暂无日记</span></div>');
    return;
  }
  [...STATE.diary].reverse().forEach(entry => {
    const date = new Date(entry.id);
    const dateStr = date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' });
    const timeStr = String(date.getHours()).padStart(2,'0') + ':' + String(date.getMinutes()).padStart(2,'0');
    container.append(`
      <div class="rp-diary-item" data-id="${entry.id}">
        <div class="rp-diary-date">${dateStr} ${timeStr}</div>
        <div class="rp-diary-preview">${entry.text.slice(0, 60)}${entry.text.length>60?'...':''}</div>
        <button class="rp-diary-del" data-id="${entry.id}">删除</button>
      </div>
    `);
  });
}

function openDiaryEntry(id) {
  const entry = STATE.diary.find(e => e.id === id);
  if (!entry) return;
  const date = new Date(entry.id);
  const dateStr = date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit' });
  $('#rp-diary-view-date').text(dateStr);
  $('#rp-diary-view-text').text(entry.text);
  $('#rp-diary-view').show();
  $('#rp-diary-list-view').hide();
}

function closeDiaryView() {
  $('#rp-diary-view').hide();
  $('#rp-diary-list-view').show();
}

function saveDiaryEntry() {
  const text = $('#rp-diary-input').val().trim();
  if (!text) return;
  const entry = {
    id: Date.now(),
    text: text,
  };
  STATE.diary.push(entry);
  $('#rp-diary-input').val('');
  renderDiaryList();
  saveState();
}

function deleteDiaryEntry(id) {
  STATE.diary = STATE.diary.filter(e => e.id !== id);
  renderDiaryList();
  saveState();
}