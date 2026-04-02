// ================================================================
//  XIAOHONGSHU (小红书)
//  小红书模块
// ================================================================

const XHS_TAGS = ['日常', '美食', '旅行', '穿搭', '美妆', '家居', '学习', '运动', '萌宠', '摄影'];

function renderXhsFeed() {
  const container = $('#rp-xhs-feed').empty();
  if (!STATE.xhsFeed || STATE.xhsFeed.length === 0) {
    container.append('<div class="rp-xhs-empty"><span>📱</span><span>暂无内容</span></div>');
    return;
  }
  STATE.xhsFeed.forEach(post => {
    const tagsHtml = post.tags.map(t => `<span class="rp-xhs-tag ${t===STATE.xhsSelectedTag?'rp-xhs-tag-active':''}">#${t}</span>`).join(' ');
    const liked = post.likes.includes('user');
    const likeCount = post.likes.length;
    container.append(`
      <div class="rp-xhs-post" data-id="${post.id}">
        <div class="rp-xhs-hd">
          <div class="rp-xhs-av">${post.author.slice(0,1)}</div>
          <div class="rp-xhs-meta">
            <div class="rp-xhs-author">${post.author}</div>
            <div class="rp-xhs-time">${post.time}</div>
          </div>
        </div>
        <div class="rp-xhs-title">${post.title}</div>
        <div class="rp-xhs-text">${post.text}</div>
        ${post.img ? `<div class="rp-xhs-img-wrap"><img class="rp-xhs-img" src="${post.img}" alt=""/></div>` : ''}
        <div class="rp-xhs-tags">${tagsHtml}</div>
        <div class="rp-xhs-bar">
          <button class="rp-xhs-act rp-xhs-like-btn${liked?' rp-liked':''}" data-id="${post.id}">${liked?'❤️':'🤍'} ${likeCount>0?likeCount:'点赞'}</button>
          <button class="rp-xhs-act rp-xhs-comment-btn" data-id="${post.id}">💬 ${post.comments.length}</button>
        </div>
      </div>
    `);
  });
}

function openXhsPost(id) {
  const post = STATE.xhsFeed.find(p => p.id === id);
  if (!post) return;
  STATE.xhsCurrentPost = post;
  const container = $('#rp-xhs-post-content').empty();
  const tagsHtml = post.tags.map(t => `<span class="rp-xhs-tag">#${t}</span>`).join(' ');
  const liked = post.likes.includes('user');
  const likeCount = post.likes.length;
  const commentsHtml = post.comments.map((cm, idx) => {
    const replyPart = cm.replyTo !== null && cm.replyTo !== undefined
      ? `回复 <span class="rp-xhs-cname">${post.comments[cm.replyTo]?.author || '?'}</span>:`
      : '';
    return `<div class="rp-xhs-comment">
      <span class="rp-xhs-cname">${cm.author}</span>:${replyPart}${cm.text}
      <span class="rp-xhs-reply-btn" data-cidx="${idx}" data-rname="${cm.author}">回复</span>
    </div>`;
  }).join('');
  container.html(`
    <div class="rp-xhs-hd">
      <div class="rp-xhs-av">${post.author.slice(0,1)}</div>
      <div class="rp-xhs-meta">
        <div class="rp-xhs-author">${post.author}</div>
        <div class="rp-xhs-time">${post.time}</div>
      </div>
    </div>
    <div class="rp-xhs-title">${post.title}</div>
    <div class="rp-xhs-text">${post.text}</div>
    ${post.img ? `<div class="rp-xhs-img-wrap"><img class="rp-xhs-img" src="${post.img}" alt=""/></div>` : ''}
    <div class="rp-xhs-tags">${tagsHtml}</div>
    <div class="rp-xhs-bar">
      <button class="rp-xhs-act rp-xhs-like-btn${liked?' rp-liked':''}" id="rp-xhs-post-like">${liked?'❤️':'🤍'} ${likeCount>0?likeCount:'点赞'}</button>
    </div>
    <div class="rp-xhs-comments">${commentsHtml}</div>
    <div class="rp-xhs-input-row">
      <input class="rp-xhs-cinput" type="text" placeholder="发表评论..." autocomplete="off"/>
      <button class="rp-xhs-csend">发送</button>
    </div>
  `);
  $('#rp-xhs-feed-view').hide();
  $('#rp-xhs-post-view').show();
}

function closeXhsPost() {
  STATE.xhsCurrentPost = null;
  STATE.xhsReplyToCidx = null;
  $('#rp-xhs-feed-view').show();
  $('#rp-xhs-post-view').hide();
}

function likeXhsPost(id) {
  const post = STATE.xhsFeed.find(p => p.id === id);
  if (!post) return;
  const idx = post.likes.indexOf('user');
  if (idx === -1) {
    post.likes.push('user');
  } else {
    post.likes.splice(idx, 1);
  }
  renderXhsFeed();
  if (STATE.xhsCurrentPost && STATE.xhsCurrentPost.id === id) {
    openXhsPost(id);
  }
  saveState();
}

function sendXhsComment(text) {
  if (!STATE.xhsCurrentPost || !text) return;
  const now = new Date();
  const ts = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
  STATE.xhsCurrentPost.comments.push({
    author: 'user',
    text: text,
    time: ts,
    replyTo: STATE.xhsReplyToCidx
  });
  STATE.xhsReplyToCidx = null;
  openXhsPost(STATE.xhsCurrentPost.id);
  renderXhsFeed();
  saveState();
}

function filterXhsByTag(tag) {
  STATE.xhsSelectedTag = tag;
  renderXhsFeed();
}