// ================================================================
//  UI RENDERING
//  UI渲染模块
// ================================================================

function renderLockScreen() {
  const container = $('#rp-content');
  const now = new Date();
  const timeStr = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
  const dateStr = now.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });

  container.html(`
    <div id="rp-lock" class="rp-view">
      <div class="rp-lock-bg"></div>
      <div class="rp-clock">
        <div class="rp-clock-time">${timeStr}</div>
        <div class="rp-clock-date">${dateStr}</div>
      </div>
      <div class="rp-lock-notifs"></div>
      <div class="rp-lock-hint">上滑解锁</div>
    </div>
  `);

  refreshLockNotifs();
}

function renderHomeScreen() {
  const container = $('#rp-content');
  const now = new Date();
  const timeStr = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');

  container.html(`
    <div id="rp-home" class="rp-view">
      <div class="rp-home-bg"></div>
      <div class="rp-status-bar">
        <div class="rp-status-time">${timeStr}</div>
        <div class="rp-status-icons">📶 🔋</div>
      </div>
      <div class="rp-app-grid">
        <div class="rp-app" data-app="messages">
          <div class="rp-app-ico"></div>
          <div class="rp-app-name">短信</div>
        </div>
        <div class="rp-app" data-app="moments">
          <div class="rp-app-ico"></div>
          <div class="rp-app-name">朋友圈</div>
        </div>
        <div class="rp-app" data-app="settings">
          <div class="rp-app-ico"></div>
          <div class="rp-app-name">设置</div>
        </div>
        <div class="rp-app" data-app="folder-games">
          <div class="rp-app-ico"></div>
          <div class="rp-app-name">游戏</div>
        </div>
        <div class="rp-app" data-app="api-settings">
          <div class="rp-app-ico"></div>
          <div class="rp-app-name">API</div>
        </div>
        <div class="rp-app" data-app="themes">
          <div class="rp-app-ico"></div>
          <div class="rp-app-name">主题</div>
        </div>
        <div class="rp-app" data-app="diary">
          <div class="rp-app-ico"></div>
          <div class="rp-app-name">日记</div>
        </div>
        <div class="rp-app" data-app="xhs">
          <div class="rp-app-ico"></div>
          <div class="rp-app-name">小红书</div>
        </div>
        <div class="rp-app" data-app="g2048">
          <div class="rp-app-ico"></div>
          <div class="rp-app-name">2048</div>
        </div>
        <div class="rp-app" data-app="bank">
          <div class="rp-app-ico"></div>
          <div class="rp-app-name">银行卡</div>
        </div>
      </div>
      <div class="rp-dock">
        <div class="rp-dock-app" data-app="messages">
          <div class="rp-dock-ico"></div>
        </div>
        <div class="rp-dock-app" data-app="moments">
          <div class="rp-dock-ico"></div>
        </div>
        <div class="rp-dock-app" data-app="settings">
          <div class="rp-dock-ico"></div>
        </div>
        <div class="rp-dock-app" data-app="api-settings">
          <div class="rp-dock-ico"></div>
        </div>
      </div>
    </div>
  `);

  lgRenderHomeIcons();
  applyWallpaper();
}

function renderThreadsView() {
  const container = $('#rp-content');
  container.html(`
    <div id="rp-threads" class="rp-view">
      <div class="rp-header">
        <div id="rp-back">←</div>
        <div class="rp-title">短信</div>
        <div id="rp-add-contact-btn">+</div>
      </div>
      <div id="rp-thread-list"></div>
    </div>
  `);
  renderThreadList();
}

function renderThreadView() {
  const container = $('#rp-content');
  container.html(`
    <div id="rp-thread" class="rp-view">
      <div class="rp-header">
        <div id="rp-back">←</div>
        <div class="rp-title">
          <div id="rp-hd-av"></div>
          <div id="rp-hd-name"></div>
        </div>
      </div>
      <div id="rp-bubbles"></div>
      <div class="rp-input-area">
        <input id="rp-input" type="text" placeholder="输入消息..." autocomplete="off"/>
        <button id="rp-send">发送</button>
      </div>
      <div id="rp-pending-queue"></div>
    </div>
  `);
}

function renderMomentsView() {
  const container = $('#rp-content');
  container.html(`
    <div id="rp-moments" class="rp-view">
      <div class="rp-header">
        <div id="rp-back">←</div>
        <div class="rp-title">朋友圈</div>
      </div>
      <div id="rp-moments-list"></div>
    </div>
  `);
}

function renderSettingsView() {
  const container = $('#rp-content');
  container.html(`
    <div id="rp-settings" class="rp-view">
      <div class="rp-header">
        <div id="rp-back">←</div>
        <div class="rp-title">设置</div>
      </div>
      <div class="rp-settings-content">
        <div class="rp-setting-item">
          <div class="rp-setting-label">主题</div>
          <div class="rp-setting-value">糖果花园</div>
        </div>
        <div class="rp-setting-item">
          <div class="rp-setting-label">壁纸</div>
          <div class="rp-setting-value">默认</div>
        </div>
        <div class="rp-setting-item">
          <div class="rp-setting-label">通知</div>
          <div class="rp-setting-value">开启</div>
        </div>
      </div>
    </div>
  `);
}

function renderApiSettingsView() {
  const container = $('#rp-content');
  container.html(`
    <div id="rp-api-settings" class="rp-view">
      <div class="rp-header">
        <div id="rp-back">←</div>
        <div class="rp-title">API设置</div>
      </div>
      <div class="rp-api-section">
        <h3>ComfyUI</h3>
        <div class="rp-api-row">
          <label>启用</label>
          <input type="checkbox" id="rp-api-comfy-enabled"/>
        </div>
        <div class="rp-api-row">
          <label>端点</label>
          <input type="text" id="rp-api-comfy-endpoint" placeholder="http://localhost:8188"/>
        </div>
        <div class="rp-api-row">
          <label>Workflow</label>
          <textarea id="rp-api-comfy-workflow" rows="3" placeholder="{}"></textarea>
        </div>
        <div class="rp-api-row">
          <label>Prompt占位符</label>
          <input type="text" id="rp-api-comfy-prompt-placeholder" placeholder="text"/>
        </div>
        <button id="rp-api-comfy-test">测试连接</button>
      </div>
      <div class="rp-api-section">
        <h3>LightGame</h3>
        <div class="rp-api-row">
          <label>启用</label>
          <input type="checkbox" id="rp-api-lg-enabled"/>
        </div>
        <div class="rp-api-row">
          <label>端点</label>
          <input type="text" id="rp-api-lg-endpoint" placeholder="http://localhost:5000"/>
        </div>
        <div class="rp-api-row">
          <label>模型</label>
          <input type="text" id="rp-api-lg-model" placeholder="gpt-3.5-turbo"/>
        </div>
        <div class="rp-api-row">
          <label>API Key</label>
          <input type="text" id="rp-api-lg-api-key" placeholder="sk-..."/>
        </div>
        <button id="rp-api-lg-test">测试连接</button>
      </div>
      <div class="rp-api-section">
        <h3>AI</h3>
        <div class="rp-api-row">
          <label>启用</label>
          <input type="checkbox" id="rp-api-ai-enabled"/>
        </div>
        <div class="rp-api-row">
          <label>端点</label>
          <input type="text" id="rp-api-ai-endpoint" placeholder="http://localhost:5000"/>
        </div>
        <div class="rp-api-row">
          <label>模型</label>
          <input type="text" id="rp-api-model" placeholder="gpt-3.5-turbo"/>
        </div>
        <div class="rp-api-row">
          <label>API Key</label>
          <input type="text" id="rp-api-ai-api-key" placeholder="sk-..."/>
        </div>
        <button id="rp-api-ai-test">测试连接</button>
      </div>
      <button id="rp-api-save">保存</button>
    </div>
  `);
}

function renderThemesView() {
  const container = $('#rp-content');
  let themesHtml = '';
  Object.keys(THEMES).forEach(key => {
    const theme = THEMES[key];
    themesHtml += `
      <div class="rp-theme-card" data-theme="${key}">
        <div class="rp-theme-emoji">${theme.emoji}</div>
        <div class="rp-theme-name">${theme.name}</div>
        <div class="rp-theme-desc">${theme.desc}</div>
      </div>
    `;
  });
  container.html(`
    <div id="rp-themes" class="rp-view">
      <div class="rp-header">
        <div id="rp-back">←</div>
        <div class="rp-title">主题</div>
      </div>
      <div id="rp-theme-list">${themesHtml}</div>
      <div class="rp-theme-options">
        <div id="rp-dm-toggle" class="rp-theme-option">
          <span class="rp-dm-ico">🌙</span>
          <span id="rp-dm-lbl">夜间</span>
        </div>
      </div>
    </div>
  `);
}

function renderGamesView() {
  const container = $('#rp-content');
  container.html(`
    <div id="rp-games" class="rp-view">
      <div class="rp-header">
        <div id="rp-back">←</div>
        <div class="rp-title">游戏</div>
      </div>
      <div class="rp-games-list">
        <div class="rp-game-card" data-app="g2048">
          <div class="rp-game-icon">🎮</div>
          <div class="rp-game-name">2048</div>
        </div>
      </div>
    </div>
  `);
}

function renderG2048View() {
  const container = $('#rp-content');
  container.html(`
    <div id="rp-g2048" class="rp-view">
      <div class="rp-header">
        <div id="rp-back">←</div>
        <div class="rp-title">2048</div>
      </div>
      <div class="rp-2048-score-board">
        <div class="rp-2048-score-label">分数</div>
        <div id="rp-2048-score">0</div>
      </div>
      <div id="rp-2048-board"></div>
      <div id="rp-2048-msg"></div>
      <button id="rp-2048-reset">重新开始</button>
    </div>
  `);
}

function renderDiaryView() {
  const container = $('#rp-content');
  container.html(`
    <div id="rp-diary" class="rp-view">
      <div class="rp-header">
        <div id="rp-back">←</div>
        <div class="rp-title">日记</div>
      </div>
      <div id="rp-diary-list-view">
        <div id="rp-diary-list"></div>
        <div class="rp-diary-input-area">
          <textarea id="rp-diary-input" placeholder="写日记..." rows="3"></textarea>
          <button id="rp-diary-save">保存</button>
        </div>
      </div>
      <div id="rp-diary-view" style="display:none">
        <div id="rp-diary-view-date"></div>
        <div id="rp-diary-view-text"></div>
        <button id="rp-diary-back">返回</button>
      </div>
    </div>
  `);
}

function renderXhsView() {
  const container = $('#rp-content');
  container.html(`
    <div id="rp-xhs" class="rp-view">
      <div class="rp-header">
        <div id="rp-back">←</div>
        <div class="rp-title">小红书</div>
      </div>
      <div id="rp-xhs-feed-view">
        <div id="rp-xhs-feed"></div>
      </div>
      <div id="rp-xhs-post-view" style="display:none">
        <div id="rp-xhs-post-content"></div>
        <button id="rp-xhs-back">返回</button>
      </div>
    </div>
  `);
}

function renderBankView() {
  const container = $('#rp-content');
  container.html(`
    <div id="rp-bank" class="rp-view">
      <div class="rp-header">
        <div id="rp-back">←</div>
        <div class="rp-title">银行卡</div>
      </div>
      <div id="rp-bank-card"></div>
    </div>
  `);
}

function renderAddContactModal() {
  if ($('#rp-add-modal').length > 0) return;
  $('body').append(`
    <div id="rp-add-modal" style="display:none">
      <div class="rp-add-modal-content">
        <h3>添加联系人</h3>
        <div class="rp-add-row">
          <label>姓名</label>
          <input type="text" id="rp-add-name" placeholder="输入姓名"/>
        </div>
        <div class="rp-add-row">
          <label>头像首字母</label>
          <input type="text" id="rp-add-initials" placeholder="自动生成"/>
        </div>
        <div class="rp-add-buttons">
          <button id="rp-add-cancel">取消</button>
          <button id="rp-add-contact">确定</button>
        </div>
      </div>
    </div>
  `);
}