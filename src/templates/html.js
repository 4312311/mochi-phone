export const RP_PHONE_HTML = `
<div id="rp-fab" title="打开手机"><svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;"><rect x="8" y="3" width="32" height="42" rx="6" fill="#fff" stroke="#e0e0e0" stroke-width="1.5"/><rect x="11" y="7" width="26" height="30" rx="3" fill="#f0f4ff"/><circle cx="24" cy="41" r="2.2" fill="#c8c8d0"/><rect x="19" y="5" width="10" height="2" rx="1" fill="#d0d0d8"/><rect x="13" y="10" width="22" height="14" rx="2" fill="#7c9fff" opacity=".7"/><rect x="13" y="27" width="10" height="3" rx="1.5" fill="#b0bcff"/><rect x="25" y="27" width="10" height="3" rx="1.5" fill="#ffa0b4"/><rect x="13" y="32" width="22" height="3" rx="1.5" fill="#e0e0e8"/></svg></div>
<div id="rp-wrapper">

  <div id="rp-phone" style="display:none">
    <div id="rp-frame">
      <div class="rp-btn rp-vol-up"></div>
      <div class="rp-btn rp-vol-dn"></div>
      <div class="rp-btn rp-power"></div>

      <div id="rp-screen">
        <div id="rp-wallpaper-layer"></div>
        <div id="rp-island"></div>
        <div id="rp-sbar">
          <span id="rp-sbar-time"></span>
          <div class="rp-sbar-r">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor" opacity=".8">
              <rect x="0" y="4" width="3" height="6" rx="1"/>
              <rect x="4" y="2" width="3" height="8" rx="1"/>
              <rect x="8" y="0" width="3" height="10" rx="1"/>
              <rect x="12" y="0" width="3" height="10" rx="1" opacity=".3"/>
            </svg>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor" opacity=".8">
              <path d="M7 2C9.5 2 11.7 3.1 13.2 4.8L14 4C12.3 2 9.8 1 7 1S1.7 2 0 4l.8.8C2.3 3.1 4.5 2 7 2z"/>
              <path d="M7 4c1.7 0 3.2.7 4.3 1.8L12 5c-1.3-1.3-3-2-5-2S3.3 3.7 2 5l.7.8C3.8 4.7 5.3 4 7 4z"/>
              <circle cx="7" cy="9" r="1.2"/>
            </svg>
            <div id="rp-bat">
              <div id="rp-bat-fill"></div>
            </div>
          </div>
        </div>

        <!-- 锁屏 -->
        <div id="rp-view-lock" class="rp-view">
          <div class="rp-lock-bg"></div>
          <div class="rp-lock-body">
            <div id="rp-lock-time"></div>
            <div id="rp-lock-date"></div>
            <div id="rp-lock-notifs"></div>
          </div>
          <div id="rp-lock-widget"></div>
          <div id="rp-swipe-hint">点击解锁</div>
          <div id="rp-swipe-zone"></div>
        </div>

        <!-- 主屏 -->
        <div id="rp-view-home" class="rp-view" style="display:none">
          <div class="rp-home-bg"></div>
          <!-- 双页横滑容器 -->
          <div id="rp-home-pages">
            <!-- 第一屏：主屏幕 -->
            <div class="rp-home-page" id="rp-home-page-0">
              <div class="rp-home-body">
                <div id="rp-home-clock"></div>
                <div id="rp-home-date"></div>
                <div id="rp-app-grid">
                  <!-- row 1: 信息 朋友圈 夜间 -->
                  <div class="rp-app" data-app="messages">
                    <div class="rp-app-ico">
                      <div class="rp-badge" id="rp-main-badge" style="display:none">0</div>
                    </div>
                    <div class="rp-app-lbl">信息</div>
                  </div>
                  <div class="rp-app" data-app="moments">
                    <div class="rp-app-ico"></div>
                    <div class="rp-app-lbl">朋友圈</div>
                  </div>

                  <!-- row 2: 设置 飞行棋 占位 -->
                  <div class="rp-app" data-app="settings">
                    <div class="rp-app-ico"></div>
                    <div class="rp-app-lbl">设置</div>
                  </div>
                  <div class="rp-app" id="rp-folder-games-btn" data-app="folder-games">
                    <div class="rp-app-ico"></div>
                    <div class="rp-app-lbl">游戏</div>
                  </div>
                  <div class="rp-app" data-app="api-settings">
                    <div class="rp-app-ico"></div>
                    <div class="rp-app-lbl">API</div>
                  </div>
                  <!-- row 3: 美化 日记 -->
                  <div class="rp-app" data-app="themes">
                    <div class="rp-app-ico"></div>
                    <div class="rp-app-lbl">主题</div>
                  </div>
                  <div class="rp-app" data-app="diary">
                    <div class="rp-app-ico"></div>
                    <div class="rp-app-lbl">日记</div>
                  </div>
                  <div class="rp-app" data-app="xhs" title="小红书">
                    <div class="rp-app-ico"></div>
                    <div class="rp-app-lbl">小红书</div>
                  </div>
                  <div class="rp-app" data-app="bank" title="银行卡">
                    <div class="rp-app-ico"></div>
                    <div class="rp-app-lbl">银行卡</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 第二屏：关于 -->
            <div class="rp-home-page" id="rp-home-page-1">
              <div id="rp-about-page">
                <svg id="rp-about-deco" viewBox="0 0 260 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="130" cy="72" r="44" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".18"/>
                  <circle cx="130" cy="72" r="32" fill="none" stroke="currentColor" stroke-width="1" opacity=".22"/>
                  <circle cx="130" cy="72" r="20" fill="currentColor" opacity=".10"/>
                  <!-- 花瓣装饰 -->
                  <ellipse cx="130" cy="36" rx="5" ry="11" fill="currentColor" opacity=".18" transform="rotate(0 130 72)"/>
                  <ellipse cx="130" cy="36" rx="5" ry="11" fill="currentColor" opacity=".18" transform="rotate(45 130 72)"/>
                  <ellipse cx="130" cy="36" rx="5" ry="11" fill="currentColor" opacity=".18" transform="rotate(90 130 72)"/>
                  <ellipse cx="130" cy="36" rx="5" ry="11" fill="currentColor" opacity=".18" transform="rotate(135 130 72)"/>
                  <ellipse cx="130" cy="36" rx="5" ry="11" fill="currentColor" opacity=".18" transform="rotate(180 130 72)"/>
                  <ellipse cx="130" cy="36" rx="5" ry="11" fill="currentColor" opacity=".18" transform="rotate(225 130 72)"/>
                  <ellipse cx="130" cy="36" rx="5" ry="11" fill="currentColor" opacity=".18" transform="rotate(270 130 72)"/>
                  <ellipse cx="130" cy="36" rx="5" ry="11" fill="currentColor" opacity=".18" transform="rotate(315 130 72)"/>
                  <!-- 中心图标：手机 -->
                  <rect x="122" y="60" width="16" height="24" rx="3" fill="currentColor" opacity=".55"/>
                  <rect x="124" y="62" width="12" height="16" rx="1.5" fill="none" stroke="var(--rp-about-bg,#fff)" stroke-width="1.2" opacity=".7"/>
                  <circle cx="130" cy="81" r="1.2" fill="var(--rp-about-bg,#fff)" opacity=".8"/>
                  <!-- 散点 -->
                  <circle cx="52"  cy="48"  r="2.5" fill="currentColor" opacity=".13"/>
                  <circle cx="208" cy="55"  r="2"   fill="currentColor" opacity=".11"/>
                  <circle cx="38"  cy="150" r="3"   fill="currentColor" opacity=".10"/>
                  <circle cx="222" cy="145" r="2.5" fill="currentColor" opacity=".12"/>
                  <circle cx="78"  cy="170" r="2"   fill="currentColor" opacity=".09"/>
                  <circle cx="185" cy="175" r="2"   fill="currentColor" opacity=".09"/>
                </svg>
                <div class="rp-about-card">
                  <div id="rp-about-title">🍡 mochi-phone</div>
                  <div id="rp-about-author">by 棠栀 Talia</div>
                  <div id="rp-about-divider"></div>
                  <div id="rp-about-notice">
                    本扩展由作者免费发布于<br>
                    <span class="rp-about-hl">DC社区：旅程 / 类脑 / 多林国</span><br>
                    其他渠道获取均视为盗版。
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 页面指示点 -->
          <div id="rp-home-dots">
            <span class="rp-home-dot rp-home-dot-active"></span>
            <span class="rp-home-dot"></span>
          </div>
          <div class="rp-home-indicator"></div>
        </div>

        <!-- API 设置 -->
        <div id="rp-view-api-settings" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">API 设置</span>
          </div>
          <div style="flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:18px 18px 10px;display:flex;flex-direction:column;gap:0">
            <div style="font-size:17px;color:#2d1060;font-weight:800;text-align:center;margin-bottom:12px;letter-spacing:-.2px">⚡ 自定义API设置</div>
            <div style="font-size:11px;color:#9070b0;line-height:1.7;margin-bottom:16px;background:rgba(168,85,247,.06);border-radius:12px;padding:10px 12px">
              本API将使用在除信息以外的全部小手机功能中,信息功能仍使用原本的酒馆API<br>
              <span id="rp-api-blink" style="color:#a855f7;font-weight:700">建议接入 DeepSeek 等国产模型,让生成速度更快。</span><br>
              接入后直接调用真实 API,需自备 Key。
            </div>
            <label class="rp-api-opt" style="margin-bottom:10px"><input type="radio" name="rp-api-mode-v" value="st" id="rp-api-mode-st-v" checked> 使用当前 API(SillyTavern)</label>
            <label class="rp-api-opt" style="margin-bottom:12px"><input type="radio" name="rp-api-mode-v" value="custom" id="rp-api-mode-custom-v"> 接入其他 API</label>
            <div id="rp-api-custom-fields-v" style="display:none;flex-direction:column;gap:8px">
              <div class="rp-api-presets" style="margin-bottom:4px">
                <button class="rp-api-preset-btn" data-url="https://api.deepseek.com/v1" data-model="deepseek-chat">DeepSeek</button>
                <button class="rp-api-preset-btn" data-url="https://dashscope.aliyuncs.com/compatible-mode/v1" data-model="qwen-turbo">通义</button>
                <button class="rp-api-preset-btn" data-url="https://open.bigmodel.cn/api/paas/v4" data-model="glm-4-flash">GLM</button>
                <button class="rp-api-preset-btn" data-url="" data-model="">其他OpenAI</button>
              </div>
              <input class="rp-api-input" id="rp-api-url-v" placeholder="API 地址 (如 https://api.deepseek.com/v1)" type="url">
              <input class="rp-api-input" id="rp-api-key-v" placeholder="API Key" type="password">
              <div style="display:flex;gap:6px;align-items:center">
                <input class="rp-api-input" id="rp-api-model-v" placeholder="模型名称 (如 deepseek-chat)" style="flex:1;min-width:0">
                <button id="rp-api-fetch-models" style="flex-shrink:0;padding:7px 10px;border-radius:12px;border:1.5px solid rgba(168,85,247,.3);background:rgba(168,85,247,.08);color:#7c3aed;font-size:11px;cursor:pointer;white-space:nowrap;font-weight:600">获取模型</button>
              </div>
              <div id="rp-model-list" style="display:none;background:rgba(255,255,255,.95);border:1px solid rgba(168,85,247,.2);border-radius:12px;max-height:140px;overflow-y:auto"></div>
            </div>
            <div id="rp-api-status-v" style="font-size:11px;color:#a855f7;min-height:18px;margin-top:8px"></div>
          </div>
          <div style="padding:10px 18px 28px;flex-shrink:0;display:flex;flex-direction:column;gap:10px">
            <button id="rp-api-test-v" style="width:100%;padding:11px;margin-bottom:8px;background:rgba(255,255,255,.18);border:1.5px solid rgba(168,85,247,.45);color:#6d28d9;border-radius:16px;font-size:13px;font-weight:600;cursor:pointer">📡 测试连通性</button>
            <button id="rp-api-save-v" style="width:100%;padding:13px;background:linear-gradient(135deg,#f472b6,#a855f7);color:#fff;border:none;border-radius:18px;font-size:14px;font-weight:700;cursor:pointer">保存设置</button>
          </div>
        </div>

        <!-- 信息列表 -->
        <div id="rp-view-messages" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">信息</span>
            <button class="rp-nav-add" id="rp-add-btn">+</button>
          </div>
          <div id="rp-thread-list"></div>
        </div>

        <!-- 对话线程 -->
        <div id="rp-view-thread" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="messages">‹</button>
            <div class="rp-thread-hd">
              <div class="rp-hd-av" id="rp-hd-av"></div>
              <span class="rp-hd-name" id="rp-hd-name"></span>
            </div>
            <span></span>
          </div>
          <div id="rp-bubbles"></div>
          <div id="rp-pending-queue" style="display:none"></div>
          <div id="rp-composer">
            <div id="rp-attach-panel"></div>
            <button id="rp-attach-btn" type="button">+</button>
            <input id="rp-input" type="text" placeholder="iMessage(回车暂存)" autocomplete="off"/>
            <button id="rp-send" type="button">↑</button>
          </div>
        </div>

        <!-- 其他视图占位... 完整HTML太长,后续补充 -->
      </div>
    </div>
  </div>
</div>
`;