// ================================================================
//  GROUP PICKER
//  群聊选择器模块
// ================================================================

function showGroupPicker() {
  $('#rp-grp-create').remove();
  const contacts = Object.values(STATE.threads).filter(t => !t.id.startsWith('grp_'));
  const items = contacts.map(t => {
    const img = STATE.avatars?.[t.name];
    const avHtml = img
      ? `<div class="rp-grp-pick-av rp-av-img" style="overflow:hidden"><img src="${img}" style="width:100%;height:100%;object-fit:cover"/></div>`
      : `<div class="rp-grp-pick-av" style="background:${t.avatarBg}">${t.initials}</div>`;
    return `<div class="rp-grp-pick-item" data-tid="${t.id}">${avHtml}<span class="rp-grp-pick-name">${escHtml(t.name)}</span><div class="rp-grp-pick-chk">✓</div></div>`;
  }).join('');
  $('#rp-screen').append(`
    <div class="rp-add-choice" id="rp-grp-create">
      <div class="rp-grp-modal">
        <div class="rp-grp-modal-hd">选择群聊成员</div>
        <div id="rp-grp-pick-list" style="max-height:220px;overflow-y:auto">
          ${items || '<div style="padding:16px;color:rgba(0,0,0,.4);text-align:center;font-size:13px">暂无联系人</div>'}
        </div>
        <div style="padding:10px 14px;border-top:1px solid rgba(0,0,0,.06)">
          <input id="rp-grp-name-inp" class="rp-grp-name-inp" type="text" placeholder="群聊名称(留空则自动生成)" maxlength="20"/>
        </div>
        <div class="rp-grp-modal-ft">
          <button class="rp-grp-ft-btn rp-grp-ft-cancel" data-action="grp-cancel">取消</button>
          <button class="rp-grp-ft-btn rp-grp-ft-ok"     data-action="grp-confirm">创建</button>
        </div>
      </div>
    </div>
  `);
  setTimeout(() => $('#rp-grp-name-inp').focus(), 80);
}

function confirmCreateGroup() {
  const selected = $('#rp-grp-pick-list .rp-grp-pick-item.selected');
  if (!selected.length) return;
  const memberIds = selected.map((_, el) => $(el).data('tid')).get();
  let name = $('#rp-grp-name-inp').val().trim();
  if (!name) name = memberIds.map(id => STATE.threads[id]?.name || id).join('、');
  $('#rp-grp-create').remove();
  const groupId = `grp_${name}`;
  const colorIdx = Object.keys(STATE.threads).length % GROUP_COLORS.length;
  STATE.threads[groupId] = {
    id: groupId, name, initials: name.slice(0,2),
    avatarBg: `linear-gradient(145deg,${GROUP_COLORS[colorIdx]},${GROUP_COLORS[(colorIdx+1)%GROUP_COLORS.length]})`,
    type: 'group', members: memberIds, messages: [], unread: 0
  };
  saveState(); 
  renderThreadList(); 
  openThread(groupId);
}