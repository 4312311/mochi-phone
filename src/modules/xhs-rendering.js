// ================================================================
//  XIAOHONGSHU RENDERING
//  小红书渲染模块
// ================================================================

function renderXHSCard(p) {
  const likeK = p.likes >= 10000 ? (p.likes/10000).toFixed(1)+'w' : p.likes >= 1000 ? (p.likes/1000).toFixed(1)+'k' : p.likes;
  const commentCount = p.comments ? p.comments.length : 0;
  const isUser = p.from === 'user';
  return `
    <div class="rp-xhs-card" data-xhsid="${p.id}" style="cursor:pointer">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div style="flex:1;min-width:0">
          <div style="font-weight:600;font-size:14px;color:#333">${escHtml(p.author)}</div>
          <div style="font-size:12px;color:#999">${p.time}</div>
        </div>
        ${isUser ? '<button class="rp-xhs-edit" data-id="'+p.id+'">编辑</button>' : ''}
      </div>
      <div style="font-size:15px;color:#222;line-height:1.5;margin-bottom:8px">${escHtml(p.title)}</div>
      <div style="font-size:13px;color:#555;line-height:1.6;margin-bottom:8px">${escHtml(p.text)}</div>
      ${p.img ? `<div style="margin-bottom:8px"><img src="${escHtml(p.img)}" style="width:100%;border-radius:8px;object-fit:cover"/></div>` : ''}
      <div style="display:flex;align-items:center;gap:16px;font-size:12px;color:#666">
        <span>❤️ ${likeK}</span>
        <span>💬 ${commentCount}</span>
        <span>⭐ 收藏</span>
      </div>
      ${p.tags && p.tags.length > 0 ? `<div style="margin-top:8px">${p.tags.map(t => `<span class="rp-xhs-tag">#${t}</span>`).join(' ')}</div>` : ''}
    </div>
  `;
}

function renderXHSFeed(forceRefresh) {
  const container = $('#rp-xhs-feed');
  if (!container.length) return;
  
  if (!STATE.xhsFeed || STATE.xhsFeed.length === 0) {
    container.html('<div class="rp-xhs-empty"><span>📱</span><span>暂无内容</span></div>');
    return;
  }
  
  const filtered = STATE.xhsSelectedTag === '日常' 
    ? STATE.xhsFeed 
    : STATE.xhsFeed.filter(p => p.tags && p.tags.includes(STATE.xhsSelectedTag));
  
  if (filtered.length === 0) {
    container.html(`<div class="rp-xhs-empty"><span>📱</span><span>该标签下暂无内容</span></div>`);
    return;
  }
  
  container.empty();
  filtered.forEach(p => {
    container.append(renderXHSCard(p));
  });
}

function openXHSDetail(postId) {
  const post = STATE.xhsFeed.find(p => p.id === postId);
  if (!post) return;
  STATE.xhsCurrentPost = post;
  
  const container = $('#rp-xhs-post-content');
  const likeK = post.likes >= 10000 ? (post.likes/10000).toFixed(1)+'w' : post.likes >= 1000 ? (post.likes/1000).toFixed(1)+'k' : post.likes;
  const isUser = post.from === 'user';
  const liked = post.likes.includes('user');
  
  const commentsHtml = post.comments && post.comments.length > 0 
    ? post.comments.map((cm, idx) => {
        const replyPart = cm.replyTo !== null && cm.replyTo !== undefined
          ? `回复 <span class="rp-xhs-cname">${post.comments[cm.replyTo]?.author || '?'}</span>:`
          : '';
        return `<div class="rp-xhs-comment">
          <span class="rp-xhs-cname">${cm.author}</span>:${replyPart}${cm.text}
          <span class="rp-xhs-reply-btn" data-cidx="${idx}" data-rname="${cm.author}">回复</span>
        </div>`;
      }).join('')
    : '<div class="rp-xhs-comments-empty">暂无评论</div>';
  
  container.html(`
    <div class="rp-xhs-detail">
      <div class="rp-xhs-detail-header">
        <div class="rp-xhs-detail-av">${post.author.slice(0,1)}</div>
        <div class="rp-xhs-detail-meta">
          <div class="rp-xhs-detail-author">${post.author}</div>
          <div class="rp-xhs-detail-time">${post.time}</div>
        </div>
      </div>
      <div class="rp-xhs-detail-title">${post.title}</div>
      <div class="rp-xhs-detail-text">${post.text}</div>
      ${post.img ? `<div class="rp-xhs-detail-img"><img src="${post.img}" alt=""/></div>` : ''}
      ${post.tags && post.tags.length > 0 ? `<div class="rp-xhs-detail-tags">${post.tags.map(t => `<span class="rp-xhs-tag">#${t}</span>`).join(' ')}</div>` : ''}
      <div class="rp-xhs-detail-stats">
        <span>❤️ ${likeK}</span>
        <span>💬 ${post.comments ? post.comments.length : 0}</span>
      </div>
      <div class="rp-xhs-detail-actions">
        <button class="rp-xhs-detail-like ${liked ? 'rp-liked' : ''}" id="rp-xhs-detail-like">${liked ? '❤️' : '🤍'} 点赞</button>
        ${isUser ? '<button class="rp-xhs-detail-edit" id="rp-xhs-detail-edit-btn">编辑</button>' : ''}
      </div>
      <div class="rp-xhs-detail-comments">${commentsHtml}</div>
      <div class="rp-xhs-detail-input">
        <input class="rp-xhs-cinput" type="text" placeholder="发表评论..." autocomplete="off"/>
        <button class="rp-xhs-csend">发送</button>
      </div>
    </div>
  `);
  
  $('#rp-xhs-feed-view').hide();
  $('#rp-xhs-post-view').show();
}

function postUserXHS() {
  const title = $('#rp-xhs-post-title').val().trim();
  const text = $('#rp-xhs-post-text').val().trim();
  const tags = $('#rp-xhs-post-tags').val().trim().split(/[,，]/).map(t => t.trim()).filter(Boolean);
  
  if (!title || !text) {
    alert('请填写标题和内容');
    return;
  }
  
  const now = new Date();
  const ts = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
  
  const post = {
    id: 'xhs_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    from: 'user',
    author: '我',
    title: title,
    text: text,
    time: ts,
    img: null,
    tags: tags.length > 0 ? tags : ['日常'],
    likes: [],
    comments: []
  };
  
  STATE.xhsFeed.unshift(post);
  saveState();
  renderXHSFeed();
  
  $('#rp-xhs-post-title').val('');
  $('#rp-xhs-post-text').val('');
  $('#rp-xhs-post-tags').val('');
  $('#rp-xhs-post-modal').hide();
}

function toggleXHSLike(postId) {
  const post = STATE.xhsFeed.find(p => p.id === postId);
  if (!post) return;
  
  const idx = post.likes.indexOf('user');
  if (idx === -1) {
    post.likes.push('user');
  } else {
    post.likes.splice(idx, 1);
  }
  
  saveState();
  renderXHSFeed();
  
  if (STATE.xhsCurrentPost && STATE.xhsCurrentPost.id === postId) {
    openXHSDetail(postId);
  }
}