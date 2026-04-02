// ================================================================
//  INITIALIZATION
//  初始化模块
// ================================================================

function lgInitFabDrag() {
  const fab = $('#rp-fab');
  if (!fab.length) return;
  let isDragging = false;
  let startX, startY, initialRight, initialBottom;

  fab.on('mousedown', function(e) {
    if (e.target.closest('.rp-av-photo')) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialRight = parseInt(fab.css('right')) || 20;
    initialBottom = parseInt(fab.css('bottom')) || 20;
    fab.css('cursor', 'grabbing');
    e.preventDefault();
  });

  $(document).on('mousemove', function(e) {
    if (!isDragging) return;
    const deltaX = startX - e.clientX;
    const deltaY = e.clientY - startY;
    fab.css('right', initialRight + deltaX + 'px');
    fab.css('bottom', initialBottom + deltaY + 'px');
  });

  $(document).on('mouseup', function() {
    if (isDragging) {
      isDragging = false;
      fab.css('cursor', 'grab');
    }
  });
}

function lgInit() {
  injectStyles();
  lgInitTheme();
  lgInitFabDrag();
  
  const wrapper = $('#rp-wrapper');
  if (!wrapper.length) {
    $('body').append(`
      <div id="rp-wrapper">
        <div id="rp-fab">
          <div class="rp-fab-av"></div>
        </div>
        <div id="rp-phone">
          <div id="rp-frame">
            <div id="rp-screen">
              <div id="rp-notch"></div>
              <div id="rp-content"></div>
            </div>
          </div>
        </div>
        <div id="rp-notif-banner">
          <div id="rp-nb-from"></div>
          <div id="rp-nb-text"></div>
          <div id="rp-nb-time"></div>
        </div>
        <div id="rp-live-chat"></div>
      </div>
    `);
  }
  
  renderLockScreen();
  
  setInterval(updateClock, 1000);
  
  const eventSource = window.eventSource || SillyTavern?.eventSource;
  if (eventSource) {
    eventSource.on(event_types.CHAT_CHANGED, onChatChanged);
    eventSource.on(event_types.MESSAGE_RECEIVED, onAIMessage);
    eventSource.on(event_types.MESSAGE_UPDATED, onMessageUpdatedForImages);
    eventSource.on(event_types.GENERATION_STARTED, function() {
      STATE._lastAiFingerprint = null;
    });
  }
  
  setTimeout(function() {
    onChatChanged();
  }, 500);
  
  console.log('[Raymond Phone] 已初始化');
}