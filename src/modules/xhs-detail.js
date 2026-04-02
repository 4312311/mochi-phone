// ================================================================
//  XIAOHONGSHU DETAIL
//  小红书详情模块
// ================================================================

function openXHSDetail(postId) {
  const post = (STATE.xhsFeed || []).find(p => p.id === postId);
  if (!post) return;
  STATE.xhsCurrentPost = postId;
  renderXHSDetail(post);
  go('xhs-detail');
}

function renderXHSDetail(post) {
  mergeGlobalAvatars();
  const body = $('#rp-xhs-detail-body');
  if (!body.length) return;
  
  const likeK = post.likes >= 10000 ? (post.likes/10000).toFixed(1)+'w' : post.likes >= 1000 ? (post.likes/1000).toFixed(1)+'k' : post.likes;
  const isUser = post.from === 'user';

  let commentsHtml = '';
  if (post.comments && post.comments.length > 0) {
    commentsHtml = post.comments.map((c, idx) => {
      const replyPart = (c.replyTo !== null && c.replyTo !== undefined && post.comments[c.replyTo])
        ? `<span style="color:var(--rp-xhs-text-faint,#999)">回复 </span><span style="color:#ff2442">@${escHtml(post.comments[c.replyTo].user)}</span>:`
        : '';
      const isMe = c.from === 'user';
      const _xhsAv3Color = (s) => { 
        const c=['#ff6b6b','#ffa94d','#a9e34b','#63e6be','#74c0fc','#e599f7','#ff8fab','#f783ac']; 
        let h=0; 
        for(let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))&0xffff; 
        return c[h%c.length]; 
      };

      return `
        <div class="rp-xhs-comment" data-cidx="${idx}" style="padding:8px 0;border-bottom:1px solid #fff5f6">
          <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:2px">
            <span style="font-size:12px;font-weight:600;color:var(--rp-xhs-text,#333)">${escHtml(c.user)}</span>
            <span style="font-size:10px;color:var(--rp-xhs-text-faint,#ccc)">${c.time||''}</span>
          </div>
          <div style="font-size:12px;color:var(--rp-xhs-text-soft,#444);line-height:1.6">${replyPart}${escHtml(c.text)}</div>
          <div style="font-size:10px;color:#ff2442;margin-top:3px;cursor:pointer" data-reply-cidx="${idx}" data-reply-uname="${escHtml(c.user)}">回复</div>
        </div>
      `;
    }).join('');
  } else {
    commentsHtml = '<div style="text-align:center;color:#ddd;font-size:12px;padding:20px 0">暂无评论,来抢沙发~</div>';
  }

  body.html(`
    <div style="margin-bottom:14px">
      <div style="font-size:13px;font-weight:700;color:var(--rp-xhs-text,#333)">${escHtml(post.user)}</div>
      <div style="font-size:10px;color:var(--rp-xhs-text-faint,#bbb)">${post.date||''} ${post.time||''} · ${escHtml(post.tag)}</div>
    </div>
    <div style="font-size:15px;font-weight:800;color:var(--rp-xhs-text,#1a1a1a);line-height:1.5;margin-bottom:10px">${escHtml(post.title)}</div>
    <div style="font-size:13px;color:var(--rp-xhs-text-soft,#444);line-height:1.8;margin-bottom:16px">${escHtml(post.body)}</div>
    ${post.img ? `<div style="margin-bottom:16px"><img src="${escHtml(post.img)}" style="width:100%;border-radius:8px;object-fit:cover"/></div>` : ''}
    <div style="display:flex;align-items:center;gap:16px;padding:10px 0;border-top:1px solid #fff0f2;border-bottom:1px solid #fff0f2;margin-bottom:14px">
      <button id="rp-xhs-like-btn" data-postid="${post.id}" style="background:none;border:none;cursor:pointer;font-size:13px;color:${post.likedByUser?'#ff2442':'#bbb'};display:flex;align-items:center;gap:4px">${post.likedByUser?'❤️':'🤍'} <span id="rp-xhs-like-count">${likeK}</span></button>
      <div style="font-size:13px;color:var(--rp-xhs-text-faint,#bbb);display:flex;align-items:center;gap:4px">💬 <span>${(post.comments||[]).length}</span></div>
    </div>
    <div style="font-size:12px;font-weight:700;color:var(--rp-xhs-text,#333);margin-bottom:8px">全部评论 · ${(post.comments||[]).length}条</div>
    <div id="rp-xhs-comments-list">${commentsHtml}</div>
  `);
}