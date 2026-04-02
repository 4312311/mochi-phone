// ================================================================
//  MOMENTS MODULE
// ================================================================

let STATE = window.STATE || {};

// Initialize moments module
function initMoments() {
  STATE = window.STATE || {};
  console.log('[Raymond Phone] Moments Module initialized');
  mergeGlobalAvatars();
  renderMoments();

  // Bind moment actions
  $(document).on('click', '.rp-moment-act', function() {
    const momentId = $(this).data('moment');
    const action = $(this).hasClass('rp-like-btn') ? 'like' : 
                   $(this).hasClass('rp-comment-toggle') ? 'comment' : 
                   $(this).hasClass('rp-moment-del-btn') ? 'delete' : '';

    switch(action) {
      case 'like':
        toggleLike(momentId);
        break;
      case 'comment':
        $('#rp-ci-' + momentId).toggle();
        break;
      case 'delete':
        deleteMoment(momentId);
        break;
    }
  });

  // Bind comment reply
  $(document).on('click', '.rp-moment-reply-btn', function() {
    const momentId = $(this).data('moment');
    const replyTo = $(this).data('rname');
    const $inputRow = $('#rp-ci-' + momentId);
    const $input = $inputRow.find('.rp-moment-cinput');
    $input.attr('placeholder', `回复 ${replyTo}...`).focus();
    $inputRow.show();
  });

  // Bind comment send
  $(document).on('click', '.rp-moment-csend', function() {
    const momentId = $(this).data('moment');
    const $input = $(this).siblings('.rp-moment-cinput');
    const text = $input.val().trim();
    if (!text) return;
    sendMomentComment(momentId, text);
    $input.val('');
  });

  // Bind comment input enter
  $(document).on('keypress', '.rp-moment-cinput', function(e) {
    if (e.which === 13) {
      const momentId = $(this).siblings('.rp-moment-csend').data('moment');
      const text = $(this).val().trim();
      if (!text) return;
      sendMomentComment(momentId, text);
      $(this).val('');
    }
  });
}

// Merge global avatars
function mergeGlobalAvatars() {
  if (!STATE.avatars) STATE.avatars = {};
  try {
    const globalAvatars = JSON.parse(localStorage.getItem('rp_avatars') || '{}');
    Object.assign(STATE.avatars, globalAvatars);
  } catch(e) {
    console.warn('[Phone:av] mergeGlobalAvatars failed:', e);
  }
}

// Render moments
function renderMoments() {
  const container = $('#rp-moments-list').empty();
  if (!STATE.moments || STATE.moments.length === 0) {
    container.append('<div class="rp-moments-empty"><span>📭</span><span>暂无动态</span></div>');
    return;
  }
  const _ctx = getContext();
  const _uname = _ctx?.name1 || '我';
  [...STATE.moments].reverse().forEach(moment => {
    const liked = moment.likes.includes('user');
    const likeNames = moment.likes.map(l => l === 'user' ? _uname : l);
    const likeCount = likeNames.length;
    let commentsHtml = '';
    if (moment.comments && moment.comments.length > 0) {
      const items = moment.comments.map((cm, idx) => {
        const replyPart = cm.replyTo !== null && cm.replyTo !== undefined
          ? `回复 <span class="rp-moment-cname">${moment.comments[cm.replyTo]?.name || '?'}</span>:`
          : '';
        return `<div class="rp-moment-comment">
          <span class="rp-moment-cname">${escHtml(cm.name)}</span>:${replyPart}${escHtml(cm.text)}
          <span class="rp-moment-reply-btn" data-moment="${moment.id}" data-cidx="${idx}" data-rname="${escHtml(cm.name)}">回复</span>
        </div>`;
      }).join('');
      commentsHtml = `<div class="rp-moment-comments-wrap">${items}</div>`;
    }
    container.append(`
      <div class="rp-moment" data-mid="${moment.id}">
        <div class="rp-moment-hd">
          ${(()=>{const k=moment.from==='user'?'user':moment.name;const ci=STATE.avatars&&STATE.avatars[k];return ci?`<div class="rp-moment-av rp-av-img"><img class="rp-av-photo" src="${ci}" alt=""/></div>`:`<div class="rp-moment-av" style="background:${moment.avatarBg}">${moment.initials}</div>`;})()}
          <div class="rp-moment-meta">
            <div class="rp-moment-name">${escHtml(moment.name)}</div>
            <div class="rp-moment-time">${moment.time}</div>
          </div>
        </div>
        <div class="rp-moment-text">${escHtml(cleanMomentText(moment.text))}</div>
        ${moment.img
          ? `<div class="rp-moment-img-wrap"><img class="rp-moment-img" src="${escHtml(moment.img)}" alt=""/></div>`
          : moment.pendingImg
            ? moment.pendingImgType === 'comfy'
              ? `<div class="rp-moment-img-wrap" style="min-width:90px;display:inline-flex;align-items:center;justify-content:center;background:rgba(128,128,128,0.13);border-radius:12px;padding:10px 16px;gap:6px;"><span style="font-size:16px;">⏳</span><span style="font-size:12px;opacity:0.7;">生成中…</span></div>`
              : `<div class="rp-moment-img-wrap rp-moment-pending-img" data-mid="${moment.id}" data-prompt="${escHtml(moment.pendingImg)}" style="min-width:90px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;background:rgba(128,128,128,0.13);border-radius:12px;padding:10px 16px;gap:6px;" title="点击触发生图"><span style="font-size:16px;">📷</span><span style="font-size:12px;opacity:0.75;">点击生图</span></div>`
            : ''
        }
        <div class="rp-moment-bar">
          <button class="rp-moment-act rp-like-btn${liked ? ' rp-liked' : ''}" data-moment="${moment.id}">${liked ? '❤️' : '🤍'} ${likeCount > 0 ? likeCount : '点赞'}</button>
          <button class="rp-moment-act rp-comment-toggle" data-moment="${moment.id}">💬 评论</button>
          <button class="rp-moment-act rp-moment-del-btn" data-moment="${moment.id}" style="color:rgba(200,60,60,.6);margin-left:auto">🗑️ 删除</button>
        </div>
        ${likeCount > 0 ? `<div class="rp-moment-likes-row">❤️ ${likeNames.slice(0,4).join('、')}${likeCount > 4 ? ` 等${likeCount}人` : ''}</div>` : ''}
        ${commentsHtml}
        <div class="rp-moment-input-row" id="rp-ci-${moment.id}" style="display:none">
          <input class="rp-moment-cinput" type="text" placeholder="发表评论..." autocomplete="off"/>
          <button class="rp-moment-csend" data-moment="${moment.id}">发送</button>
        </div>
      </div>
    `);
  });
}

// Toggle like
function toggleLike(momentId) {
  const moment = (STATE.moments || []).find(m => m.id === momentId);
  if (!moment) return;
  const userIndex = moment.likes.indexOf('user');
  if (userIndex > -1) {
    moment.likes.splice(userIndex, 1);
  } else {
    moment.likes.push('user');
  }
  saveState();
  renderMoments();
}

// Send moment comment
async function sendMomentComment(momentId, text, replyToName) {
  const moment = (STATE.moments || []).find(m => m.id === momentId);
  if (!moment) return;
  const _ctx = getContext();
  const _uname = _ctx?.name1 || '我';
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  const replyTo = replyToName ? moment.comments.findIndex(c => c.name === replyToName) : null;
  const comment = {
    id: Date.now(),
    name: _uname,
    text: text,
    time: time,
    replyTo: replyTo
  };
  if (!moment.comments) moment.comments = [];
  moment.comments.push(comment);
  saveState();
  renderMoments();
  // Generate AI reply
  try {
    await generateAIReply(momentId, text, _uname);
  } catch(e) {
    console.warn('[Phone:moments] AI reply failed:', e);
  }
}

// Delete moment
function deleteMoment(momentId) {
  if (!confirm('确定要删除这条动态吗？')) return;
  STATE.moments = (STATE.moments || []).filter(m => m.id !== momentId);
  saveState();
  renderMoments();
}

// Clean moment text
function cleanMomentText(text) {
  return text.replace(/<[^>]+>/g, '');
}

// Get context
function getContext() {
  if (window.SillyTavern && window.SillyTavern.getContext) {
    return window.SillyTavern.getContext();
  }
  return null;
}

// Save state
function saveState() {
  if (window.__saveState) {
    window.__saveState();
  }
}

// Escape HTML
function escHtml(str) {
  return String(str || '').replace(/[&<>"]/g, s => {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
    return map[s];
  });
}

// Generate AI reply
async function generateAIReply(momentId, userCommentText, fromName) {
  // This function would typically call an AI API to generate a reply
  // For now, we'll just add a placeholder reply
  const moment = (STATE.moments || []).find(m => m.id === momentId);
  if (!moment) return;
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  const replyText = `这是对"${userCommentText}"的回复`;
  const reply = {
    id: Date.now(),
    name: moment.name,
    text: replyText,
    time: time,
    replyTo: moment.comments.length - 1
  };
  moment.comments.push(reply);
  saveState();
  renderMoments();
}

export {
  initMoments,
  renderMoments,
  mergeGlobalAvatars
};