# 模块拆分进度

## 已完成

### 核心模块 (core/)
- ✅ `utils.js` - 工具函数、SillyTavern 集成
- ✅ `state.js` - 状态管理 (STATE, saveState, loadState 等)
- ✅ `init.js` - 初始化逻辑 (框架已创建，待填充)

### 样式模块 (styles/)
- ✅ `css.js` - 完整的 CSS 样式

### 模板模块 (templates/)
- ✅ `html.js` - 占位文件 (待提取 HTML 模板)

### 功能模块 (modules/)
- ✅ `chat.js` - 占位文件
- ✅ `sms.js` - 占位文件
- ✅ `moments.js` - 占位文件
- ✅ `xiaohongshu.js` - 占位文件
- ✅ `themes.js` - 占位文件
- ✅ `api-settings.js` - 占位文件
- ✅ `diary.js` - 占位文件 (按要求保持空文件)
- ✅ `bank.js` - 占位文件 (按要求保持空文件)
- ✅ `games-2048.js` - 占位文件 (按要求保持空文件)
- ✅ `games-gold.js` - 占位文件 (按要求保持空文件)
- ✅ `games-ludo.js` - 占位文件 (按要求保持空文件)
- ✅ `avatar.js` - 占位文件
- ✅ `phone-tag.js` - 占位文件

### 主入口
- ✅ `index.js` - ES6 模块入口

## 待拆分

需要从 `index.js` (15580行) 中提取以下内容到对应模块：

### 核心模块
- `init.js`:
  - `init()` 函数 (line 5622+)
  - `bindUI()` 函数 (line 6372+)
  - `updateClock()` 函数 (line 6357+)
  - `onChatChanged()` 函数 (line 6245+)
  - `makeDraggable()` 函数 (line 9436+)

### 功能模块
- `chat.js`:
  - `renderThreadList()` 函数 (line 7486+)
  - `renderBubbles()` 函数 (line 7611+)
  - `openThread()` 函数 (line 7584+)
  - `sendSMS()` 函数 (line 7970+)

- `sms.js`:
  - `parsePhone()` 函数 (line 8777+)
  - `normalizePhoneMarkup()` 函数 (line 8127+)
  - `incomingMsg()` 函数 (line 9234+)
  - `extractSmsSummaries()` 函数 (line 8548+)

- `moments.js`:
  - `renderMoments()` 函数 (line 11519+)
  - 朋友圈评论生成逻辑

- `xiaohongshu.js`:
  - `renderXHSCard()` 函数 (line 11592+)
  - `renderXHSFeed()` 函数 (line 11617+)
  - `renderXHSDetail()` 函数 (line 12231+)

- `themes.js`:
  - `THEMES` 常量 (line 10346+)
  - 主题切换逻辑
  - 壁纸上传逻辑

- `api-settings.js`:
  - `openSettings()` 函数 (line 9691+)
  - ComfyUI 配置逻辑
  - LightGame/AI 配置逻辑

- `avatar.js`:
  - `generateAvatarBg()` 函数 (line 7439+)
  - `_bindAvatarUpload()` 函数 (line 9645+)
  - `populateAvatarSelect()` 函数 (line 9697+)

- `phone-tag.js`:
  - `hidePhoneTagsInChat()` 函数 (line 10191+)
  - `rewritePhoneEchoInChat()` 函数 (line 8724+)
  - `rewriteAllHistoryPhoneBlocks()` 函数 (line 8739+)

### 模板模块
- `html.js`:
  - `HTML` 常量 (line 4956+)
  - 包含完整的 HTML 模板字符串

## 注意事项

1. **游戏、日记、银行卡模块** 按要求保持为空文件，暂时不拆分
2. **CSS 模块** 已完整提取
3. **状态管理** 已完整提取到 `state.js`
4. **主入口** 需要注入 HTML 并绑定事件

## 下一步

1. 从 `index.js` 中提取 HTML 模板到 `html.js`
2. 逐步拆分各个功能模块
3. 处理模块间的依赖关系
4. 测试拆分后的功能是否正常
