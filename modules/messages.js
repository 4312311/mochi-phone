// ================================================================//  MESSAGES MODULE// ================================================================// Inline edit helpersfunction rpInlineEdit(bubbleEl, threadId, msg, msgIdx) {
  if (bubbleEl.querySelector('.rp-inline-edit-wrap')) return; // 防重入
  const origText = msg.text;
  const wrap = document.createElement('div');
  wrap.className = 'rp-inline-edit-wrap';
  const ta = document.createElement('textarea');
  ta.className = 'rp-inline-textarea';
  ta.value = origText;
  ta.rows = 3;
  const btnRow = document.createElement('div');
  btnRow.className = 'rp-inline-edit-btns';
  const okBtn = document.createElement('button');
  okBtn.className = 'rp-inline-ok'; okBtn.textContent = '✓';
  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'rp-inline-cancel'; cancelBtn.textContent = '✕';
  btnRow.append(cancelBtn, okBtn);
  wrap.append(ta, btnRow);

  wrap.addEventListener('click', function(e) { e.stopPropagation(); });
  wrap.addEventListener('touchend', function(e) { e.stopPropagation(); });
  ta.addEventListener('click', function(e) { e.stopPropagation(); });

  // 隐藏原气泡文字,插入编辑区
  bubbleEl.style.display = 'none';
  bubbleEl.parentNode.insertBefore(wrap, bubbleEl.nextSibling);
  ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length);

  okBtn.onclick = function(e) {
    e.stopPropagation(); e.preventDefault();
    const newText = ta.value.trim();
    if (newText && newText !== origText) {
      const th = STATE.threads[threadId];
      if (th) {
        // 优先用 msgIdx 精确定位（user 和 char 消息都支持）
        const target = (typeof msgIdx === 'number' && th.messages[msgIdx])
          ? th.messages[msgIdx]
          : th.messages.find(function(m) { return m.text === origText; });
        if (target) target.text = newText;
        saveState();
      }
      renderBubbles(threadId);
    } else {
      wrap.remove(); bubbleEl.style.display = '';
    }
  };
  cancelBtn.onclick = function(e) {
    e.stopPropagation(); e.preventDefault();
    wrap.remove(); bubbleEl.style.display = '';
  };
}

// Group chat functionsfunction showAddChoice() {
  $('#rp-add-choice').remove();
  $('#rp-screen').append(`
    <div class="rp-add-choice" id="rp-add-choice">
      <div class="rp-add-choice-box">
        <div class="rp-add-choice-item" data-action="contact">👤 添加联系人</div>
        <div class="rp-add-choice-item" data-action="group">👥 创建群聊</div>
        <div class="rp-add-choice-item rp-add-choice-delete" data-action="delete">🗑️ 删除好友</div>
      </div>
      <div class="rp-add-choice-cancel" data-action="cancel">取消</div>
    </div>
  `);
}

function hideAddChoice() { $('#rp-add-choice').remove(); }

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
  saveState(); renderThreadList(); openThread(groupId);
}

// Contact managementfunction showDeletePicker() {
  $('#rp-del-picker').remove();
  const contacts = Object.values(STATE.threads);
  if (!contacts.length) return;
  const items = contacts.map(t => {
    const img = STATE.avatars?.[t.name];
    const avHtml = img
      ? `<div class="rp-del-pick-av rp-av-img" style="overflow:hidden"><img src="${img}" style="width:100%;height:100%;object-fit:cover"/></div>`
      : `<div class="rp-del-pick-av" style="background:${t.avatarBg}">${t.initials}</div>`;
    return `<div class="rp-del-pick-item" data-tid="${escHtml(t.id)}">${avHtml}<span class="rp-del-pick-name">${escHtml(t.name)}</span><div class="rp-del-chk"></div></div>`;
  }).join('');

  $('#rp-screen').append(`
    <div class="rp-add-choice rp-del-picker-view" id="rp-del-picker">
      <div class="rp-nav-bar">
        <button class="rp-back" id="rp-del-cancel">取消</button>
        <span class="rp-nav-title">删除好友</span>
        <button id="rp-del-confirm" >删除</button>
      </div>
      <div id="rp-del-list" style="flex:1;overflow-y:auto;padding:8px 0">${items}</div>
    </div>
  `);
}

// Location sharingfunction showLocationInput() {
  $('#rp-attach-panel').hide();
  $('#rp-loc-modal').remove();
  const dark = $('#rp-phone').hasClass('rp-dark') ? 'rp-dark' : '';
  $('#rp-screen').append(`
    <div class="rp-loc-modal ${dark}" id="rp-loc-modal" onclick="if(event.target===this)$('#rp-loc-modal').remove()">
      <div class="rp-loc-sheet">
        <h3>📍 发送位置</h3>
        <input id="rp-loc-inp" type="text" placeholder="输入你的位置..."/>
        <button class="rp-loc-send-btn" onclick="sendLocation()">发送</button>
        <button class="rp-loc-cancel-btn" onclick="$('#rp-loc-modal').remove()">取消</button>
      </div>
    </div>
  `);
  setTimeout(() => document.getElementById('rp-loc-inp')?.focus(), 60);
}

function sendLocation() {
  const place = $('#rp-loc-inp').val().trim();
  if (!place) return;
  const thread = STATE.threads[STATE.currentThread];
  if (!thread) return;
  const now = new Date();
  const ts  = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  thread.messages.push({
    id: `uloc_${Date.now()}`, from: 'user',
    type: 'location', time: ts, place
  });
  $('#rp-loc-modal').remove();
  $('#rp-attach-panel').hide();
  renderBubbles(thread.id);
  saveState();
  const ta = document.querySelector('#send_textarea');
  if (ta) {
    const action = `*{{user}}向${thread.name}共享了位置:${place}*`;
    STATE._suppressUserNotifUntil = Date.now() + 8000; // 8s 内屏蔽位置/红包通知
    ta.value = ta.value.trim() ? `${ta.value.trim()}\n${action}` : action;
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#send_but')?.click();
  }
}

// Image messagesfunction sendImageMessage(thread, src, mimeType) {
  const ta = document.querySelector('#send_textarea');
  if (!ta) { console.warn('[Raymond Phone] send_textarea not found'); return; }
  const action = `*{{user}}向${thread.name}发送了一张图片,请认真观看并以${thread.name}的视角做出符合人设的回应*`;
  ta.value = ta.value.trim() ? `${ta.value.trim()}\n${action}` : action;
  ta.dispatchEvent(new Event('input', { bubbles: true }));
  document.querySelector('#send_but')?.click();
}

// Live chat overlayconst LC_TTL = 6000;
const LC_MAX = 3;
const RP_DISABLE_LIVE_OVERLAY = true; // 用户反馈顶部彩色长条干扰,默认关闭

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

// Chat bubble beautificationfunction hidePhoneTagsInChat() {
  // 遍历所有消息,把 ST 渲染出的 <phone>/<sms>/<moments>/<comment> 等标签移除
  document.querySelectorAll('.mes_text').forEach(el => {
    // 方法1:先整体清空 <phone> 元素内容再移除,防止子文本节点遗留在 DOM 里
    el.querySelectorAll('phone').forEach(phoneEl => {
      // 清空所有子节点(包括 sms/text 文本节点),再从 DOM 删除
      while (phoneEl.firstChild) phoneEl.removeChild(phoneEl.firstChild);
      phoneEl.remove();
    });
    // 残余的裸 sms/gmsg 等标签(不在 phone 内)也一并清除
    el.querySelectorAll('sms, moments, comment, notify, sync, call, voice, gmsg, gvoice, ghongbao, simg, hongbao').forEach(tag => {
      while (tag.firstChild) tag.removeChild(tag.firstChild);
      tag.remove();
    });
    // 方法2:innerHTML 兜底,处理以纯文本存在的 <PHONE>...</PHONE>
    if (/<phone>/i.test(el.innerHTML)) {
      el.innerHTML = el.innerHTML.replace(/<phone>[\s\S]*?<\/phone>/gi, '').trim();
    }
    // 方法3:处理被转义成 &lt;PHONE&gt;...&lt;/PHONE&gt; 的文本
    // 注意:跳过已有折叠块的消息，避免破坏 <pre> 里存放的原始内容
    if (/&lt;phone&gt;/i.test(el.innerHTML) && !el.querySelector('details.rp-phone-collapse')) {
      el.innerHTML = el.innerHTML.replace(/&lt;phone&gt;[\s\S]*?&lt;\/phone&gt;/gi, '').trim();
    }
  });
}

// 清理用户气泡里遗留的 OOC 括号指令（历史消息持久化清理）
function hideOocInUserBubbles() {
  document.querySelectorAll('.mes[is_user="true"] .mes_text').forEach(el => {
    let html = el.innerHTML || '';
    // 匹配 [手机短信提示:...] / [叙事指令:...] / [手机群聊提示:...] 含多行内容
    const before = html;
    html = html.replace(/\[(?:手机短信提示|叙事指令|手机群聊提示)[^\]]*\]/g, '');
    // 兜底:跨行版本（有些浏览器把换行渲染成 <br>，导致方括号跨行）
    html = html.replace(/\[(?:手机短信提示|叙事指令|手机群聊提示)[\s\S]*?\]/g, '');
    if (html !== before) {
      // 清理多余空行
      html = html
        .replace(/(?:<br\s*\/?>\s*){2,}/gi, '<br>')
        .replace(/^\s*(?:<br\s*\/?>\s*)+/i, '')
        .replace(/(?:<br\s*\/?>\s*)+$/i, '')
        .trim();
      el.innerHTML = html;
    }
  });
}

function beautifySMSInChat() {
  try {
    // 每次调用先清理全部消息中的 <PHONE> 可见内容
    hidePhoneTagsInChat();

    const ctx = getContext();
    if (!ctx?.name) return;
    const charName = ctx.name;
    const allMsgs = document.querySelectorAll('.mes:not([is_user="true"])');
    if (!allMsgs.length) return;
    const lastMsg = allMsgs[allMsgs.length - 1];
    const textEl  = lastMsg?.querySelector('.mes_text');
    if (!textEl || textEl.dataset.rpDone) return;
    textEl.dataset.rpDone = '1';

    const thread   = Object.values(STATE.threads).find(t => t.name === charName);
    const avatarBg = thread?.avatarBg || 'linear-gradient(145deg,#555,#333)';
    const initials = charName.slice(0, 2);
    const customImg = STATE.avatars?.[charName];
    const avHtml = customImg
      ? `<div class="rp-cb-av"><img src="${customImg}" alt=""/></div>`
      : `<div class="rp-cb-av" style="background:${avatarBg}">${initials}</div>`;
    const mkBubble = (text) => {
      const d = document.createElement('div');
      d.className = 'rp-cb';
      d.innerHTML = `${avHtml}<div class="rp-cb-txt">${escHtml(text.trim())}</div>`;
      return d;
    };
    // Match em/i elements: curly quotes, straight quotes, or brackets
    textEl.querySelectorAll('em, i').forEach(el => {
      if (el.closest('.rp-cb')) return;
      const raw = el.textContent.trim();
      const isDialogue = /^["\u201c\u00ab\u300c\u300e\u300a\uff02]/.test(raw)
                      || /["\u201d\u00bb\u300d\u300f\u300b\uff02\u300c]$/.test(raw)
                      || /^\u300c|\u300d$/.test(raw);
      if (!isDialogue && raw.length < 3) return;
      // Strip wrapping quote chars
      const inner = raw.replace(/^["\u201c\u00ab\u300c\u300e\u300a\uff02\u300c]/, '')
                       .replace(/["\u201d\u00bb\u300d\u300f\u300b\uff02]$/, '');
      if (inner.trim().length > 0) el.replaceWith(mkBubble(inner));
    });
    // Match text nodes with curly-quote spans
    const walkText = (node) => {
      if (node.nodeType === 3) {
        const txt = node.textContent;
        const re = /[\u201c"][^\u201d"\n]{2,}[\u201d"]|[\u300c\u300e][^\u300d\u300f\n]{2,}[\u300d\u300f]/g;
        if (!re.test(txt)) return;
        re.lastIndex = 0;
        const frag = document.createDocumentFragment();
        let last = 0, m;
        while ((m = re.exec(txt)) !== null) {
          if (m.index > last) frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
          const inner = m[0].slice(1, -1);
          frag.appendChild(mkBubble(inner));
          last = m.index + m[0].length;
        }
        if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
        node.replaceWith(frag);
      } else if (node.nodeType === 1 && !node.classList.contains('rp-cb')) {
        Array.from(node.childNodes).forEach(walkText);
      }
    };
    Array.from(textEl.childNodes).forEach(walkText);
  } catch(e) {
    console.warn('[Raymond Phone] beautify:', e);
  }
}

export {
  rpInlineEdit,
  showAddChoice,
  hideAddChoice,
  showGroupPicker,
  confirmCreateGroup,
  showDeletePicker,
  showLocationInput,
  sendLocation,
  sendImageMessage,
  showLiveChat,
  hidePhoneTagsInChat,
  hideOocInUserBubbles,
  beautifySMSInChat
};