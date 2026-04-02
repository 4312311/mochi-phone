// ================================================================
//  XIAOHONGSHU USER POST
//  小红书用户发帖模块
// ================================================================

function postUserXHS() {
  const title = $('#rp-xhs-post-title').val().trim();
  const body = $('#rp-xhs-post-body').val().trim();
  const tag = STATE.xhsSelectedTag || '日常';
  
  if (!body) { 
    alert('请输入内容'); 
    return; 
  }
  
  const ctx = getContext() || {};
  const userName = ctx?.name1 || '我';
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  const dateStr = `${now.getMonth()+1}-${now.getDate()}`;
  
  const post = {
    id: `xhs_user_${Date.now()}`,
    from: 'user',
    user: userName,
    title: title || body.slice(0,20) + (body.length>20?'...':''),
    body,
    tag,
    likes: Math.floor(Math.random() * 90000) + 10000,
    likedByUser: false,
    comments: [],
    date: dateStr,
    time: ts,
    img: null
  };
  
  STATE.xhsFeed.unshift(post);
  saveState();
  renderXHSFeed();
  
  $('#rp-xhs-post-title').val('');
  $('#rp-xhs-post-body').val('');
  $('#rp-xhs-post-modal').hide();
}