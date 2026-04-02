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

        <!-- 美化/主题 -->
        <div id="rp-view-themes" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>

          </div>
          <div style="flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:20px 16px 28px">
            <div style="font-size:13px;font-weight:600;color:var(--rp-themes-label);text-align:center;margin-bottom:18px;opacity:.75;letter-spacing:.4px">✨ 选择主题</div>
            <div id="rp-theme-cards" style="display:grid;grid-template-columns:1fr 1fr;gap:14px"></div>
            <div id="rp-saved-section" style="display:none">
              <div id="rp-saved-section-title">📌 已保存的方案</div>
              <div id="rp-saved-cards"></div>
            </div>
          </div>
        </div>

        <!-- 🎨 AI 主题工作室 -->
        <div id="rp-view-theme-studio" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="themes">‹</button>
            <span class="rp-nav-title">🎨 主题工作室</span>
            <span style="width:32px"></span>
          </div>
          <div id="rp-ts-bubbles">
            <!-- 欢迎卡片（由 JS 渲染）-->
          </div>
          <div id="rp-ts-action-bar" style="display:none;gap:8px;padding:6px 12px 2px;flex-shrink:0">
            <button id="rp-ts-undo-v2" class="rp-ts-action-btn rp-ts-undo-btn">回到上一版</button>
            <button id="rp-ts-save-v2" class="rp-ts-action-btn rp-ts-save-btn">保存本次方案</button>
          </div>
          <div id="rp-ts-tip">⚡ 提示：本功能比较吃模型智商，建议使用 Claude 等聪明模型，尽量使用按量模型防止截断</div>
          <div id="rp-ts-composer">
            <textarea id="rp-ts-input" placeholder="描述你想要的风格…" rows="1"></textarea>
            <button id="rp-ts-send" type="button">↑</button>
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
          <!-- FIX3: 待发消息队列预览区 -->
          <div id="rp-pending-queue" style="display:none"></div>
          <div id="rp-composer">
            <div id="rp-attach-panel"></div>
            <button id="rp-attach-btn" type="button">+</button>
            <input id="rp-input" type="text" placeholder="iMessage(回车暂存)" autocomplete="off"/>
            <button id="rp-send" type="button">↑</button>
          </div>
        </div>

        <!-- 日记 -->
        <div id="rp-view-diary" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">日记</span>
            <button id="rp-gen-diary" title="AI生成今日日记" class="rp-diary-gen-btn"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.36-2.64"/><path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.36 2.64"/><polyline points="16 8 21 3 21 8"/><polyline points="8 16 3 21 3 16"/></svg></button>
          </div>
          <div id="rp-diary-list" style="flex:1;overflow-y:auto;padding:12px 14px 8px"></div>
          <div class="rp-diary-compose">
            <textarea id="rp-diary-input" class="rp-diary-input" placeholder="写下今天的心情..." rows="3"></textarea>
            <button id="rp-diary-send" class="rp-diary-send-btn">发布</button>
          </div>
        </div>

        <!-- 朋友圈 -->
        <div id="rp-view-moments" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">朋友圈</span>
            <div style="display:flex;gap:4px;align-items:center">
              <button id="rp-gen-moments" title="AI生成朋友圈"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.36-2.64"/><path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.36 2.64"/><polyline points="16 8 21 3 21 8"/><polyline points="8 16 3 21 3 16"/></svg></button>
              <button class="rp-nav-add" id="rp-moments-add" title="我要发动态">+</button>
            </div>
          </div>
          <div id="rp-moments-list"></div>
        </div>

        <!-- 小红书 -->
        <!-- 银行卡资产模块 -->
        <div id="rp-view-bank" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">资产概览</span>
            <button id="rp-bank-refresh" title="刷新资产">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
            </button>
          </div>
          <div id="rp-bank-body">
            <div class="rp-bank-empty">✦ 点击右上角刷新，读取 TA 的资产信息</div>
          </div>
        </div>

        <!-- 小红书 -->
        <div id="rp-view-xhs" class="rp-view" style="display:none;flex-direction:column">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">小红书</span>
            <div style="display:flex;gap:4px;align-items:center">
              <button id="rp-xhs-compose" title="发笔记" style="width:28px;height:28px;border:none;background:transparent;font-size:18px;cursor:pointer;color:var(--rp-nav-btn,#c0306a)">✏️</button>
              <button id="rp-xhs-refresh" title="刷新" style="width:28px;height:28px;border:none;background:transparent;font-size:18px;cursor:pointer;color:var(--rp-nav-btn,#c0306a)">↻</button>
            </div>
          </div>
          <div id="rp-xhs-list" style="flex:1;overflow-y:auto;padding:6px 10px 14px"></div>
        </div>

        <!-- 小红书详情页 -->
        <div id="rp-view-xhs-detail" class="rp-view" style="display:none;flex-direction:column">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="xhs">‹</button>
            <span class="rp-nav-title">帖子详情</span>
            <span></span>
          </div>
          <div id="rp-xhs-detail-body" style="flex:1;overflow-y:auto;padding:14px 14px 10px"></div>
          <div id="rp-xhs-detail-input-bar" style="flex-shrink:0;display:flex;align-items:center;padding:6px 10px 10px;gap:8px;min-width:0;position:relative;z-index:10">
            <textarea id="rp-xhs-detail-input" placeholder="发表评论..." autocomplete="off" rows="1" style="flex:1;border-radius:14px;padding:6px 12px;font-size:12px;outline:none;resize:none;overflow:hidden;line-height:1.5;max-height:72px;font-family:inherit;box-sizing:border-box;min-width:0;color:var(--rp-xhs-text,#1a1a1a);background:var(--rp-xhs-card,#fff)"></textarea>
            <button id="rp-xhs-detail-send" style="background:#ff2442;color:#fff;border:none;border-radius:20px;padding:6px 14px;font-size:12px;cursor:pointer;flex-shrink:0;white-space:nowrap;display:inline-flex !important;visibility:visible !important;opacity:1 !important;pointer-events:auto !important">发送</button>
          </div>
        </div>

        <!-- 小红书发帖 -->
        <div id="rp-view-xhs-compose" class="rp-view" style="display:none;flex-direction:column">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="xhs" style="font-size:12px;padding:5px 14px;border-radius:10px;border:1px solid var(--rp-xhs-border,#ffe0e6);background:transparent;color:var(--rp-xhs-text,#eee);cursor:pointer;font-weight:600">取消</button>
            <span class="rp-nav-title">发笔记</span>
            <button id="rp-xhs-post-btn" style="font-size:12px;padding:4px 12px;border-radius:8px;border:none;background:#ff2442;color:#fff;cursor:pointer;font-weight:600">发布</button>
          </div>
          <div style="padding:16px 14px;flex:1;overflow-y:auto;background:var(--rp-xhs-bg)">
            <input id="rp-xhs-post-title" type="text" placeholder="填写标题(选填)" maxlength="40" style="width:100%;border:none;border-bottom:1px solid var(--rp-xhs-border,#ffe4e8);padding:6px 0;font-size:14px;font-weight:600;outline:none;margin-bottom:10px;box-sizing:border-box;background:transparent;color:var(--rp-xhs-text,#1a1a1a)"/>
            <textarea id="rp-xhs-post-body" placeholder="分享一下你的故事..." rows="6" style="width:100%;border:1px solid var(--rp-xhs-border,#ffe4e8);border-radius:10px;padding:10px;font-size:13px;outline:none;resize:none;box-sizing:border-box;line-height:1.6;background:var(--rp-xhs-card,#fff);color:var(--rp-xhs-text,#1a1a1a)"></textarea>
            <div style="margin-top:10px">
              <div style="font-size:10px;color:var(--rp-xhs-text-faint,#bbb);margin-bottom:5px;letter-spacing:.03em">话题</div>
              <div id="rp-xhs-tag-row" style="display:flex;flex-wrap:wrap;gap:5px">
                <button class="rp-xhs-tag-btn" data-tag="日常">#日常</button>
                <button class="rp-xhs-tag-btn" data-tag="随想">#随想</button>
                <button class="rp-xhs-tag-btn" data-tag="情感">#情感</button>
                <button class="rp-xhs-tag-btn" data-tag="碎碎念">#碎碎念</button>
                <button class="rp-xhs-tag-btn" data-tag="求安慰">#求安慰</button>
                <button class="rp-xhs-tag-btn" data-tag="八卦">#八卦</button>
                <button class="rp-xhs-tag-btn" data-tag="吐槽">#吐槽</button>
                <button class="rp-xhs-tag-btn" data-tag="记录">#记录</button>
                <button class="rp-xhs-tag-btn" data-tag="树洞">#树洞</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 发朋友圈 -->
        <div id="rp-compose-modal" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back rp-compose-cancel" id="rp-compose-cancel">取消</button>
            <span class="rp-nav-title">发朋友圈</span>
            <button class="rp-compose-post-btn" id="rp-compose-post">发布</button>
          </div>
          <div class="rp-compose-body">
            <div class="rp-compose-card">
              <div class="rp-compose-user-row">
                <div class="rp-compose-avatar" id="rp-compose-av">我</div>
                <div class="rp-compose-uname" id="rp-compose-uname">我</div>
              </div>
              <div class="rp-compose-sep"></div>
              <textarea id="rp-compose-text" placeholder="这一刻的想法..." rows="4"></textarea>
              <div class="rp-compose-hint">分享给朋友圈里的每个人</div>
            </div>
          </div>
        </div>

        <div style="display:none">
        </div>

                <!-- 设置 -->
        <div id="rp-view-settings" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">设置</span>
            <span></span>
          </div>
          <div style="overflow-y:auto;flex:1">
            <div class="rp-set-section-title">头像管理</div>
            <div class="rp-set-section">
              <div class="rp-set-row">
                <span class="rp-set-key">修改对象</span>
                <select id="rp-avatar-select" class="rp-set-select">
                  <option value="user">我(User)</option>
                </select>
              </div>
              <div class="rp-set-row">
                <div id="rp-avatar-preview-swatch" class="rp-set-avatar-preview" style="background:linear-gradient(145deg,#64748b,#475569)">我</div>
                <span class="rp-set-hint">点击右侧上传图片</span>
                <button class="rp-avatar-upload-btn" id="rp-avatar-upload-btn">📷 选择</button>
                <input type="file" id="rp-avatar-file-input" accept="image/*" style="display:none">
              </div>
            </div>

            <div class="rp-set-section-title">壁纸管理</div>
            <div class="rp-set-section">
              <div class="rp-set-row" style="flex-direction:column;align-items:stretch;gap:8px">
                <img id="rp-wall-preview" class="rp-wall-preview-img" style="display:none" alt=""/>
                <div style="display:flex;gap:8px">
                  <button id="rp-wall-upload" class="rp-set-upload-btn" style="flex:1">📷 上传壁纸</button>
                  <button id="rp-wall-reset"  class="rp-set-upload-btn rp-wall-reset-btn" style="flex:1">恢复默认</button>
                </div>
                <input id="rp-wall-file" type="file" accept="image/*" style="display:none"/>
              </div>
            </div>


          </div>
        </div>

        <!-- 2048 游戏 -->
        <div id="rp-view-g2048" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">🎮 2048</span>
            <button id="g2048-newbtn">新局</button>
          </div>
          <div id="g2048-header">
            <div id="g2048-scores">
              <div class="g2048-sbox"><div class="g2048-slbl">分数</div><div id="g2048-score">0</div></div>
              <div class="g2048-sbox"><div class="g2048-slbl">最高</div><div id="g2048-best">0</div></div>
            </div>
            <div id="g2048-turn">你的回合</div>
          </div>
          <div id="g2048-board-wrap">
            <div id="g2048-board"></div>
          </div>
          <div id="g2048-dpad">
            <button class="g2048-dir" data-dir="left">◄</button>
            <button class="g2048-dir" data-dir="up">▲</button>
            <button class="g2048-dir" data-dir="down">▼</button>
            <button class="g2048-dir" data-dir="right">►</button>
          </div>
          <div id="g2048-api-tip">⚡ 请在API功能中更换国产模型,以提升回复速度。</div>
          <div id="g2048-chat-hint">点击展开 ↗</div>
          <div id="g2048-chat"></div>
          <div id="g2048-input-row">
            <input id="g2048-input" type="text" placeholder="游戏中聊天..." autocomplete="off"/>
            <button id="g2048-send" type="button">↑</button>
          </div>
          <!-- 2048 fullscreen chat -->
          <div id="g2048-chat-fs" style="display:none">
            <div id="g2048-chat-fs-hd">
              <span id="g2048-chat-fs-title">💬 聊天记录</span>
              <button id="g2048-chat-fs-close">✕</button>
            </div>
            <div id="g2048-chat-fs-body"></div>
          </div>
          <div id="g2048-over">
            <div class="g2048-over-emoji" id="g2048-over-emoji">🎉</div>
            <div class="g2048-over-title" id="g2048-over-title">达成2048!</div>
            <div class="g2048-over-sub" id="g2048-over-sub">你们合力完成了!</div>
            <div id="g2048-over-btns" style="display:flex;gap:10px;margin-top:6px">
              <button class="g2048-over-btn" id="g2048-continue" style="background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.5)">继续挑战</button>
              <button class="g2048-over-btn" id="g2048-restart">再来一局</button>
              <button class="g2048-over-btn" id="g2048-quit" style="background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.25)">退出</button>
            </div>
          </div>
        </div>

        <!-- 黄金矿工 -->
        <div id="rp-view-ggold" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">⛏️ 黄金矿工</span>
            <button id="ggold-newbtn" style="font-size:12px;font-weight:600">新局</button>
          </div>
          <div id="ggold-header">
            <div class="ggold-score-box"><div class="ggold-score-lbl" id="ggold-u-lbl">你</div><div class="ggold-score-val" id="ggold-u-score">0</div></div>
            <div id="ggold-round-info">第1轮 / 共3轮</div>
            <div class="ggold-score-box"><div class="ggold-score-lbl" id="ggold-c-lbl">对方</div><div class="ggold-score-val" id="ggold-c-score">0</div></div>
          </div>
          <div id="ggold-timer-wrap"><div id="ggold-timer-bg"><div id="ggold-timer-bar"></div></div></div>
          <div id="ggold-coop-bar"><div id="ggold-coop-label">合作目标：0 / 1000</div><div id="ggold-coop-progress-bg"><div id="ggold-coop-progress-fill" style="width:0%"></div></div></div>
          <div id="ggold-canvas-wrap"><canvas id="ggold-canvas" width="270" height="190"></canvas></div>
          <div id="ggold-action-row">
            <div id="ggold-turn-badge">你的回合</div>
            <button id="ggold-launch-btn" type="button">🪝 放钩！</button>
          </div>
          <div id="ggold-chat-hint">点击展开 ↗</div>
          <div id="ggold-chat"></div>
          <div id="ggold-input-row">
            <input id="ggold-input" type="text" placeholder="游戏中聊天..." autocomplete="off"/>
            <button id="ggold-send" type="button">↑</button>
          </div>
          <div id="ggold-over" style="display:none">
            <div class="ggold-over-emoji" id="ggold-over-emoji">🏆</div>
            <div class="ggold-over-title" id="ggold-over-title">游戏结束</div>
            <div class="ggold-over-sub" id="ggold-over-sub"></div>
            <button class="ggold-over-btn" id="ggold-replay-btn" type="button">再来一局</button>
            <button class="ggold-over-btn" id="ggold-reset-tower-btn" type="button" style="display:none;background:linear-gradient(135deg,#6366f1,#4338ca)">重置爬塔</button>
          </div>
          <div id="ggold-mode-select">
            <div class="ggold-mode-title">⛏️ 黄金矿工</div>
            <div class="ggold-mode-sub">选择游戏模式<br>3轮×2人，轮流挖矿</div>
            <button class="ggold-mode-btn" id="ggold-mode-vs" type="button">⚔️ 竞技模式<br><span style="font-size:10px;font-weight:400;opacity:.85">比拼总分，一决高下</span></button>
            <button class="ggold-mode-btn" id="ggold-mode-co" type="button">🤝 合作模式<br><span style="font-size:10px;font-weight:400;opacity:.85">共同达标，爬塔挑战</span></button>
          </div>
        </div>
        <!-- 飞行棋 -->
        <div id="rp-view-game" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">🎲 飞行棋</span>
            <span></span>
          </div>
          <div id="rp-game-board-wrap">
            <canvas id="rp-ludo-canvas" width="260" height="260"></canvas>
          </div>
          <div id="rp-game-controls">
            <div class="rp-game-info">
              <div class="rp-game-players"><span style="color:#ec4899">●</span> 你 vs <span style="color:#7c3aed">●</span> <span id="rp-game-char-name">对方</span></div>
              <div class="rp-game-status" id="rp-game-status-text">按骰子开始!</div>
            </div>
            <button id="rp-dice-btn" type="button" title="掷骰子">🎲</button>
            <div id="rp-dice-face"></div>
          </div>
          <div id="rp-game-chat-hint" style="font-size:9.5px;color:rgba(224,64,122,.65);text-align:right;padding:0 14px 1px;flex-shrink:0">点击展开 ↗</div>
          <div id="rp-game-chat"></div>
          <div id="rp-game-input-row">
            <input id="rp-game-input" type="text" placeholder="游戏中聊天..." autocomplete="off"/>
            <button id="rp-game-send" type="button">↑</button>
          </div>
          <div id="rp-game-win" style="display:none">
            <div class="game-win-box">
              <div class="game-win-emoji" id="game-win-emoji">🎉</div>
              <div class="game-win-title" id="game-win-title">恭喜你赢了!</div>
              <div class="game-win-sub" id="game-win-sub">你率先抵达终点,赢得了这场飞行棋!</div>
              <button class="game-win-btn" id="game-restart-btn" type="button">再来一局</button>
            </div>
          </div>
          <!-- API 设置面板 -->
          <div id="rp-api-panel" style="display:none">
            <div id="rp-api-box">
              <div class="rp-api-title">⚡ 回复速度设置</div>
              <div class="rp-api-desc">建议接入 DeepSeek 等国产模型<br>让角色在飞行棋任务中回复更快<br><span style="color:#a855f7;font-weight:600">接入后直接调用真实 API,需自备 Key</span></div>
              <label class="rp-api-opt"><input type="radio" name="rp-api-mode" value="st" id="rp-api-mode-st" checked> 使用当前 API(SillyTavern)</label>
              <label class="rp-api-opt"><input type="radio" name="rp-api-mode" value="custom" id="rp-api-mode-custom"> 接入其他 API</label>
              <div id="rp-api-custom-fields" style="display:none">
                <div class="rp-api-presets">
                  <button class="rp-api-preset-btn" data-url="https://api.deepseek.com/v1" data-model="deepseek-chat">DeepSeek</button>
                  <button class="rp-api-preset-btn" data-url="https://dashscope.aliyuncs.com/compatible-mode/v1" data-model="qwen-turbo">通义</button>
                  <button class="rp-api-preset-btn" data-url="https://open.bigmodel.cn/api/paas/v4" data-model="glm-4-flash">GLM</button>
                  <button class="rp-api-preset-btn" data-url="" data-model="">其他 OpenAI</button>
                </div>
                <input class="rp-api-input" id="rp-api-url" placeholder="API 地址 (如 https://api.deepseek.com/v1)" type="url">
                <input class="rp-api-input" id="rp-api-key" placeholder="API Key" type="password">
                <input class="rp-api-input" id="rp-api-model" placeholder="模型名称 (如 deepseek-chat)">
              </div>
              <div class="rp-api-save-row">
                <button class="rp-api-save-btn" id="rp-api-save">保存</button>
                <button class="rp-api-cancel-btn" id="rp-api-cancel">取消</button>
              </div>
            </div>
          </div>
          <!-- 格子事件弹窗 -->
          <div id="rp-sq-event" style="display:none">
            <div id="rp-sq-event-box">
              <div id="rp-sq-event-sq">第 X 格</div>
              <div id="rp-sq-event-emoji">💬</div>
              <div id="rp-sq-event-text">事件内容</div>
              <div id="rp-sq-event-note">备注</div>
              <button id="rp-sq-event-done" type="button">确认</button>
            </div>
          </div>
          <!-- 任务进行中条 -->
          <div id="rp-sq-task-bar" style="display:none">
            <span id="rp-sq-task-text">💬 任务进行中...</span>
            <button id="rp-sq-task-done-btn" type="button">✅ 已完成</button>
            <div id="rp-sq-task-hint">请在下方对话框内完成指定任务</div>
          </div>
          <!-- 全屏聊天记录 -->
          <div id="rp-game-chat-fs" style="display:none">
            <div id="rp-game-chat-fs-header">
              <span id="rp-game-chat-fs-title">💬 游戏聊天记录</span>
              <button id="rp-game-chat-fs-close" type="button">✕</button>
            </div>
            <div id="rp-game-chat-fs-body"></div>
          </div>
        </div>

        <!-- 来电遮罩 -->
        <div id="rp-call-overlay" style="display:none"></div>

        <!-- 通知横幅 -->
        <div id="rp-notif-banner" style="display:none">
          <div class="rp-nb-ico">💬</div>
          <div class="rp-nb-body">
            <div class="rp-nb-from" id="rp-nb-from"></div>
            <div class="rp-nb-text" id="rp-nb-text"></div>
          </div>
          <div class="rp-nb-time" id="rp-nb-time"></div>
        </div>

        <div id="rp-home-ind" style="display:none"></div>


        <!-- 游戏文件夹弹窗 -->
        <div id="rp-folder-modal" style="display:none">
          <div class="rp-folder-title-lbl">游戏</div>
          <div class="rp-folder-popup">
            <div class="rp-folder-item" data-folder-app="ludo">
              <div class="rp-folder-item-ico rp-folder-game-ludo">
                <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="8" y="8" width="24" height="24" rx="5" stroke-width="2"></rect>
                  <circle cx="15" cy="15" r="2.1" fill="currentColor" stroke="none"></circle>
                  <circle cx="25" cy="15" r="2.1" fill="currentColor" stroke="none"></circle>
                  <circle cx="15" cy="25" r="2.1" fill="currentColor" stroke="none"></circle>
                  <circle cx="25" cy="25" r="2.1" fill="currentColor" stroke="none"></circle>
                </svg>
              </div>
              <div class="rp-folder-item-lbl">飞行棋</div>
            </div>
            <div class="rp-folder-item" data-folder-app="g2048">
              <div class="rp-folder-item-ico rp-folder-game-2048">
                <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="8" y="8" width="24" height="24" rx="5" stroke-width="2"></rect>
                  <line x1="20" y1="12" x2="20" y2="28" stroke-width="1.7"></line>
                  <line x1="12" y1="20" x2="28" y2="20" stroke-width="1.7"></line>
                </svg>
              </div>
              <div class="rp-folder-item-lbl">2048</div>
            </div>
            <div class="rp-folder-item" data-folder-app="ggold">
              <div class="rp-folder-item-ico rp-folder-game-gold">
                <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="20" y1="4" x2="20" y2="13" stroke-width="2"/>
                  <path d="M8 13 Q20 22 32 13" stroke-width="2" fill="none"/>
                  <line x1="20" y1="13" x2="20" y2="28" stroke-width="1.8" stroke-dasharray="2 1"/>
                  <circle cx="20" cy="31" r="4" fill="currentColor" stroke="none" opacity=".85"/>
                  <circle cx="13" cy="26" r="2.5" fill="currentColor" stroke="none" opacity=".55"/>
                  <circle cx="28" cy="24" r="3" fill="currentColor" stroke="none" opacity=".65"/>
                </svg>
              </div>
              <div class="rp-folder-item-lbl">黄金矿工</div>
            </div>
          </div>
        </div>
        <!-- 添加好友弹窗(位于 #rp-screen 内部) -->
        <div id="rp-add-modal" style="display:none">
          <div id="rp-add-form">
            <h3>添加联系人</h3>
            <input type="text" id="rp-add-name" placeholder="姓名" maxlength="30"/>
            <input type="text" id="rp-add-initials" placeholder="缩写 (如: ZS)" maxlength="3"/>
            <div id="rp-add-btns">
              <button id="rp-add-cancel" type="button">取消</button>
              <button id="rp-add-confirm" type="button">添加</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
`;
