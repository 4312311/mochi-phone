// ================================================================
//  DIARY RENDERING
//  日记渲染模块
// ================================================================

function renderDiary() {
  const container = $('#rp-diary-list');
  if (!container.length) return;
  
  if (!STATE.diary || STATE.diary.length === 0) {
    container.append('<div class="rp-diary-empty"><span>📖</span><span>暂无日记</span></div>');
    return;
  }
  
  [...STATE.diary].reverse().forEach(entry => {
    const date = new Date(entry.id);
    const dateStr = date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' });
    const timeStr = String(date.getHours()).padStart(2,'0') + ':' + String(date.getMinutes()).padStart(2,'0');
    container.append(`
      <div class="rp-diary-entry" data-id="${entry.id}">
        <div class="rp-diary-header">
          <div class="rp-diary-date">${dateStr} ${timeStr}</div>
          <button class="rp-diary-edit" data-id="${entry.id}">编辑</button>
          <button class="rp-diary-del" data-id="${entry.id}">删除</button>
        </div>
        <div class="rp-diary-text">${entry.text}</div>
      </div>
    `);
  });
}