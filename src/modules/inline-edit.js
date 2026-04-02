// ================================================================
//  INLINE EDITING
//  内联编辑模块
// ================================================================

function rpInlineEdit(bubbleEl, threadId, msg, msgIdx) {
  if (!bubbleEl || !threadId || !msg) return;
  
  const textEl = bubbleEl.find('.rp-bubble-text');
  if (!textEl.length) return;
  
  const originalText = msg.text;
  const input = $('<textarea class="rp-inline-edit-input" rows="3"></textarea>');
  input.val(originalText);
  
  const buttons = $('<div class="rp-inline-edit-buttons"></div>');
  const saveBtn = $('<button class="rp-inline-save">保存</button>');
  const cancelBtn = $('<button class="rp-inline-cancel">取消</button>');
  buttons.append(saveBtn, cancelBtn);
  
  textEl.empty().append(input, buttons);
  input.focus();
  
  saveBtn.on('click', function() {
    const newText = input.val().trim();
    if (newText && newText !== originalText) {
      msg.text = newText;
      textEl.text(newText);
      saveState();
      updatePreviews();
    } else {
      textEl.text(originalText);
    }
    buttons.remove();
    input.remove();
  });
  
  cancelBtn.on('click', function() {
    textEl.text(originalText);
    buttons.remove();
    input.remove();
  });
}

function gameInlineEdit(btn) {
  const container = btn.closest('.rp-game-container');
  if (!container.length) return;
  
  const statusEl = container.find('.rp-game-status-text');
  const messagesEl = container.find('.rp-game-messages');
  
  const originalStatus = statusEl.text();
  const originalMessages = messagesEl.html();
  
  const statusInput = $('<input type="text" class="rp-game-status-input">');
  statusInput.val(originalStatus);
  
  const messagesInput = $('<textarea class="rp-game-messages-input" rows="5"></textarea>');
  messagesInput.val(messagesEl.text());
  
  const buttons = $('<div class="rp-game-edit-buttons"></div>');
  const saveBtn = $('<button class="rp-game-edit-save">保存</button>');
  const cancelBtn = $('<button class="rp-game-edit-cancel">取消</button>');
  buttons.append(saveBtn, cancelBtn);
  
  statusEl.empty().append(statusInput);
  messagesEl.empty().append(messagesInput, buttons);
  
  statusInput.focus();
  
  saveBtn.on('click', function() {
    const newStatus = statusInput.val().trim();
    const newMessages = messagesInput.val().trim();
    
    if (newStatus) statusEl.text(newStatus);
    if (newMessages) messagesEl.text(newMessages);
    
    buttons.remove();
    statusInput.remove();
    messagesInput.remove();
  });
  
  cancelBtn.on('click', function() {
    statusEl.text(originalStatus);
    messagesEl.html(originalMessages);
    buttons.remove();
    statusInput.remove();
    messagesInput.remove();
  });
}

function diaryInlineEdit(btn, entryId) {
  const container = btn.closest('.rp-diary-entry');
  if (!container.length) return;
  
  const textEl = container.find('.rp-diary-text');
  if (!textEl.length) return;
  
  const entry = STATE.diary.find(e => e.id === entryId);
  if (!entry) return;
  
  const originalText = entry.text;
  const input = $('<textarea class="rp-diary-edit-input" rows="5"></textarea>');
  input.val(originalText);
  
  const buttons = $('<div class="rp-diary-edit-buttons"></div>');
  const saveBtn = $('<button class="rp-diary-edit-save">保存</button>');
  const cancelBtn = $('<button class="rp-diary-edit-cancel">取消</button>');
  buttons.append(saveBtn, cancelBtn);
  
  textEl.empty().append(input, buttons);
  input.focus();
  
  saveBtn.on('click', function() {
    const newText = input.val().trim();
    if (newText && newText !== originalText) {
      entry.text = newText;
      textEl.text(newText);
      saveState();
    } else {
      textEl.text(originalText);
    }
    buttons.remove();
    input.remove();
  });
  
  cancelBtn.on('click', function() {
    textEl.text(originalText);
    buttons.remove();
    input.remove();
  });
}