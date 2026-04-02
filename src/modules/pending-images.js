// ================================================================
//  PENDING IMAGES
//  待处理图片模块
// ================================================================

function rpTriggerPendingImg(threadId, msgId, prompt, triggerEl) {
  if (!threadId || !msgId || !prompt) return;
  
  const th = STATE.threads[threadId];
  if (!th) return;
  
  const msg = th.messages.find(m => m.id === msgId);
  if (!msg) return;
  
  triggerEl.text('生成中...');
  triggerEl.prop('disabled', true);
  
  comfyGenerate(prompt).then(url => {
    if (url) {
      msg.img = url;
      msg.pendingImg = null;
      msg.pendingImgType = null;
      
      if (STATE.currentView === 'thread' && STATE.currentThread === threadId) {
        renderBubbles(threadId);
      }
      
      saveState();
    } else {
      triggerEl.text('生成失败');
      setTimeout(() => {
        triggerEl.text('点击生图');
        triggerEl.prop('disabled', false);
      }, 2000);
    }
  }).catch(err => {
    console.warn('[Phone] rpTriggerPendingImg error:', err);
    triggerEl.text('生成失败');
    setTimeout(() => {
      triggerEl.text('点击生图');
      triggerEl.prop('disabled', false);
    }, 2000);
  });
}