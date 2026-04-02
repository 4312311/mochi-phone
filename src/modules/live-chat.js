// ================================================================
//  LIVE CHAT OVERLAY
//  实时聊天覆盖模块
// ================================================================

const LC_TTL = 6000;
const LC_MAX = 3;
const RP_DISABLE_LIVE_OVERLAY = true;

function showLiveChat(name, avatarBg, customImg, text) {
  if (RP_DISABLE_LIVE_OVERLAY) return;
  const lc = $('#rp-live-chat');
  if (!lc.length) return;
  const id = `lc_${Date.now()}`;
  const avHtml = customImg
    ? `<div class="rp-lc-av"><img src="${customImg}" style="width:100%;height:100%;object-fit:cover"/></div>`
    : `<div class="rp-lc-av" style="background:${avatarBg}">${escHtml((name||'?').slice(0,2))}</div>`;
  lc.append(`
    <div class="rp-lc-bubble" id="${id}">
      ${avHtml}
      <div class="rp-lc-body">
        <div class="rp-lc-name">${escHtml(name)}</div>
        <div class="rp-lc-text">${escHtml(text.slice(0,80))}${text.length>80?'...':''}</div>
      </div>
      <div class="rp-lc-dismiss" onclick="$('#${id}').remove()">×</div>
    </div>
  `);
  const all = lc.children();
  if (all.length > LC_MAX) all.first().remove();
  setTimeout(() => $(`#${id}`).fadeOut(400, function(){ $(this).remove(); }), LC_TTL);
}