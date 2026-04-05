---
description: 
alwaysApply: true
enabled: true
updatedAt: 2026-04-03T11:24:29.657Z
provider: 
---

# Mochi Phone 项目宪法

## 📱 项目概述

Mochi Phone (Ray Mobile Shell) 是一个为 SillyTavern 设计的交互式手机模拟器插件，提供丰富的移动应用体验，包括短信、朋友圈、主题、设置等功能模块。

**版本**: 5.0.0
**作者**: justinggx
**加载顺序**: 1
**入口文件**: `main.js`

---

## 🔄 模块拆分迁移说明

### 背景
项目最初是一个巨大的单文件 `index.js`（约8000+行，包含所有功能），随着功能增加，维护难度越来越大。因此开始逐步将代码拆分为模块化结构。

### 迁移原则
1. **渐进式迁移**: 不一次性重写，而是在原文件中标记已迁移部分，逐步拆分
2. **模块化优先**: 每个功能模块独立维护，职责清晰
3. **向后兼容**: `index.js` 仍可运行，但已标注为"已弃用"

### 迁移状态

| 模块 | 原文件位置 | 新文件位置 | 状态 |
|------|------------|------------|------|
| 主入口 | `index.js` | `main.js` | ✅ 已迁移 |
| 消息模块 | `index.js` (SMS/群聊/语音等) | `src/modules/messages.js` | ✅ 已迁移 |
| 主题模块 | `index.js` | `src/modules/themes.js` | ✅ 已迁移 |
| 设置模块 | `index.js` | `src/modules/settings.js` | ✅ 已迁移 |
| 朋友圈模块 | `index.js` | `src/modules/moments.js` | ✅ 已迁移 |
| CSS样式 | `index.js` 内联 (15586行) | `src/styles/` | ✅ 已迁移 |
| HTML模板 | `index.js` | `src/html.js` | ✅ 已迁移 |
| 日记模块 | `index.js` | - | ⏳ 待迁移 |
| 小红书模块 | `index.js` | - | ⏳ 待迁移 |
| 银行卡模块 | `index.js` | - | ⏳ 待迁移 |
| 游戏模块 | `index.js` | - | ⏳ 待迁移 |

### 待迁移功能（仍在 index.js 中）
- 日记 (`diary`)
- 小红书 (`xhs`)
- 银行卡 (`bank`)
- 游戏文件夹 (`folder-games`)
- 2048游戏 (`g2048`)
- 黄金矿工 (`ggold`)
- 飞行棋 (`game`)

---

## 🏗️ 架构设计

### 核心原则
- **模块化优先**: 每个功能模块独立维护，职责清晰
- **CSS模块化**: 所有CSS已拆分为12个逻辑模块，便于按需加载和维护
- **事件驱动**: 通过路由系统和事件监听实现页面切换和交互
- **状态共享**: 全局状态 `STATE` 在模块间共享，通过 `CHAT_STORE` 实现多对话隔离

### 文件结构

```
mochi-phone/
├── manifest.json          # 插件清单
├── main.js               # 主入口（从 index.js 拆分而来）
├── index.js              # 原始入口文件（已弃用，仍保留完整功能）
├── README.md             # 项目文档
├── CHANGELOG.md          # 更新日志
├── AI_PARSING_DEBUG.md   # AI 解析调试文档
├── src/
│   ├── html.js           # HTML模板（从 index.js 拆分）
│   ├── styles/
│   │   ├── index.js      # CSS主入口
│   │   ├── css.js        # 原始CSS（已弃用，保留备份）
│   │   ├── README.md     # CSS模块化文档
│   │   ├── BUILD_GUIDE.md # 构建指南
│   │   └── modules/      # CSS模块（从 css.js 拆分）
│   │       ├── base.css      # 基础样式
│   │       ├── common.css    # 公共组件
│   │       ├── frame.css     # 手机框架
│   │       ├── homescreen.css # 主屏幕
│   │       ├── lockscreen.css # 锁屏界面
│   │       ├── messages.css   # 消息模块
│   │       ├── moments.css   # 朋友圈模块
│   │       ├── themes.css    # 主题样式
│   │       ├── settings.css  # 设置模块
│   │       ├── games.css     # 游戏模块
│   │       ├── diary.css     # 日记模块
│   │       ├── xhs.css       # 小红书模块
│   │       └── bank.css      # 银行卡模块
│   └── modules/
│       ├── messages.js   # 消息模块（从 index.js 拆分）
│       ├── themes.js     # 主题模块（从 index.js 拆分）
│       ├── settings.js   # 设置模块（从 index.js 拆分）
│       ├── moments.js    # 朋友圈模块（从 index.js 拆分）
│       └── placeholder.js # 占位符模块（未迁移功能提示）
```

---

## 🚀 运行机制

### 主入口 (`main.js`)

**职责**:
1. 模块导入与初始化
2. CSS样式注入
3. HTML模板注入
4. 路由控制
5. 全局事件绑定

**核心流程**:
```
init()
  ├─ 清理旧元素 (Hot-reload安全)
  ├─ 注入CSS (injectStyles)
  ├─ 注入HTML (RP_PHONE_HTML)
  ├─ 修复移动端布局 (fixMobileLayout)
  ├─ 初始化各模块
  │   ├─ initThemes()
  │   ├─ initSMS()
  │   ├─ initMoments()
  │   └─ initSettings()
  ├─ 绑定FAB点击事件
  ├─ 绑定应用图标路由
  ├─ 绑定返回按钮
  ├─ 绑定主题选择
  └─ 绑定页面指示点
```

**路由系统** (`navigateTo(page, appInfo)`):
- 支持 `home`, `messages`, `thread`, `themes`, `theme-studio`, `api-settings`, `settings`, `moments`
- 未迁移功能显示迁移提示（游戏、日记、小红书、银行卡等）

**AI响应监听**:
- 监听SillyTavern的 `PHONE` 标签
- 自动解析短信格式（如 `[SMS:内容]`）
- 处理来电、红包、语音等特殊指令

---

## 🔑 核心逻辑说明

### 1. 消息去重机制

短信去重采用双重策略：

```javascript
// 有 messageId 时，使用 messageId + text 组合去重
let isDup = false;
if (messageId) {
  isDup = th.messages.some(msg => msg.messageId === messageId && msg.text === text);
} else {
  // 无 messageId 时，使用 text + time 去重
  isDup = th.messages.some(msg => msg.text === text && msg.time === msgTime);
}
```

### 2. 批量消息添加（保持顺序）

图片消息和文本消息需要批量添加，确保显示顺序正确：

```javascript
const msgItems = [];
// 图片消息先添加
smsImgs.forEach((src, idx) => {
  const isDup = th.messages.some(msg => msg.type === 'image' && msg.src === src);
  if (!isDup) {
    const msgObj = { id: `aimg_${Date.now()}_${idx}`, from: threadId, type: 'image', time: msgTime, src };
    if (messageId) msgObj.messageId = messageId;
    msgItems.push(msgObj);
  }
});
// 文本消息后添加
if (text) { msgItems.push(msgObj); }
// 批量添加
if (msgItems.length > 0) {
  msgItems.forEach(msgObj => th.messages.push(msgObj));
}
```

### 3. 图片提取函数

从 AI 响应中提取图片，支持多种格式：

```javascript
function extractImgsFromText(raw) {
  const imgs = [], pendingPrompts = [];
  const imgRe = /<img\b[^>]*?\ssrc\s*=\s*["']([^"']+)["'][^>]*\/?>/gi;
  // 支持 <pic>标签、<img src>、待解析的prompt 等
  return { imgs, cleanText, pendingPrompts };
}
```

### 4. 语音消息处理

- 语音消息存储在 `text` 字段（而非 `voiceText`）
- 语音默认标记为 `played = true`，确保文本立即显示
- 通过 `window.playVoice` 全局函数播放

```javascript
function playVoice(threadId, voiceId) {
  const th = STATE.threads[threadId];
  const msg = th.messages.find(m => m.id === voiceId);
  if (msg) {
    msg.played = true;
    saveState();
    renderBubbles(threadId);
  }
}
window.playVoice = playVoice;
```

### 5. 消息清理安全机制

**关键**: 防止 `messageId` 无效时误删所有消息！采用双重防护：

**调用处检查（main.js）**:
```javascript
const oldMessageId = window._lastProcessedMessageId;
const hasValidMessageId = oldMessageId !== undefined && oldMessageId !== null && oldMessageId !== '';
if (hasValidMessageId) {
  cleanupOldMessages(oldMessageId);
}
```

**函数内部检查（messages.js）**:
```javascript
function cleanupOldPhoneMessages(messageId) {
  const hasValidMessageId = messageId !== undefined && messageId !== null && messageId !== '';
  if (!hasValidMessageId) {
    console.log('[Raymond Phone] No valid messageId, skipping cleanup');
    return;
  }
  // 只有带有效 messageId 的消息才会被删除
}
```

**messageId 来源**:
```javascript
// 直接取最后一条消息的索引作为唯一标识（参考 media-auto-generation 插件）
const messageIdx = chat.length - 1;
const lastAI = chat[messageIdx];
const messageId = String(messageIdx);
```

注意：`lastAI.message_id` 和 `lastAI.id` 在新版 SillyTavern 中都是 `undefined`，因此使用消息数组索引作为唯一标识。

### 6. 事件监听机制

**监听的 SillyTavern 事件**:
- `GENERATION_ENDED` - AI 消息生成完成
- `MESSAGE_SWIPED` - 消息被滑动查看
- `MESSAGE_DELETED` - 删除单条消息
- `MESSAGE_SWIPE_DELETED` - 滑动删除消息
- `CHAT_CHANGED` - 切换聊天
- `CHAT_DELETED` - 删除整个聊天

**消息重新生成处理**:
- 通过指纹 `_lastAiFingerprint` 检测是否是同一 chatId 的新消息
- 如果是，调用 `cleanupOldMessages(oldMessageId)` 清理旧的手机消息

### 7. AI 响应解析格式

监听 `<PHONE>` 标签，支持以下指令:
- `[SMS:内容]` - 发送短信
- `[SMS:联系人:内容]` - 向指定联系人发送短信
- `[GROUP:群名:成员1,成员2]` - 创建群聊
- `[CALL:动作]` - 电话相关
- `[HONGBAO:金额]` - 红包
- `[VOICE:时长]` - 语音消息

---

## 📦 模块详解

### 1. 消息模块 (`src/modules/messages.js`)

**代码量**: 1463行  
**职责**: 短信发送、接收、联系人管理、群聊、红包、语音

**核心功能**:
- `sendSMS()` - 发送短信
- `renderThreadList()` - 渲染会话列表
- `openThread()` - 打开会话详情
- `renderBubbles()` - 渲染消息气泡
- `updatePreviews()` - 更新预览
- `incomingCall()` - 处理来电
- `openHongbao()` - 打开红包
- `playVoice()` - 播放语音
- `incomingGroupMsg()` - 处理群聊消息
- `syncToCurrentChat()` - 同步到当前对话
- `getAvatar()` / `setAvatar()` - 头像管理

**状态管理**:
- `STATE` - 全局状态
  - `threads` - 会话列表
  - `notifications` - 通知列表
  - `pendingMessages` - 待发送队列
  - `avatars` - 头像缓存
  - `settings` - 用户设置

**数据隔离**:
- 通过 `CHAT_STORE` 为每个对话维护独立状态
- `getCurrentCharacterId()` 获取当前角色ID

---

### 2. 主题模块 (`src/modules/themes.js`)

**代码量**: 427行  
**职责**: 主题管理、主题切换、图标渲染

**主题定义** (`THEMES`):
- `candy` - 糖果花园（粉色海边）
- `star` - 星夜（暗夜栀子）
- `misty` - 烟蓝·绣球（蓝色绣球）
- `custom` - 自定义主题

**核心功能**:
- `lgApplyTheme()` - 应用主题
- `lgInitTheme()` - 初始化主题
- `lgRenderHomeIcons()` - 渲染主屏图标
- `lgRenderThemePicker()` - 渲染主题选择器
- `rpStripFrameRing()` - 处理边框

**图标资源** (`RP_THEME_ICONS`):
- 所有应用图标的SVG定义
- 包括消息、朋友圈、设置、游戏、API设置等

---

### 3. 设置模块 (`src/modules/settings.js`)

**代码量**: 285行  
**职责**: 用户设置、头像上传、壁纸设置、API配置

**核心功能**:
- `initSettings()` - 初始化设置模块
- `_bindAvatarUpload()` - 绑定头像上传
- `_bindWallpaperUpload()` - 绑定壁纸上传
- `_bindThemeSettings()` - 绑定主题设置
- `_bindAPISettings()` - 绑定API设置
- `lgFillAPIView()` - 填充API视图

**设置项**:
- 用户头像
- 用户名称
- 自定义壁纸
- 主题选择
- API密钥配置

---

### 4. 朋友圈模块 (`src/modules/moments.js`)

**代码量**: 239行  
**职责**: 朋友圈发布、点赞、评论、删除

**核心功能**:
- `initMoments()` - 初始化朋友圈
- `renderMoments()` - 渲染朋友圈列表
- `toggleLike()` - 切换点赞
- `sendMomentComment()` - 发送评论
- `deleteMoment()` - 删除动态
- `mergeGlobalAvatars()` - 合并全局头像

**数据结构**:
- `STATE.moments` - 朋友圈动态列表
- 每条动态包含：`id`, `content`, `images`, `likes`, `comments`, `timestamp`

---

### 5. 占位符模块 (`src/modules/placeholder.js`)

**代码量**: 29行  
**职责**: 显示未迁移功能提示

**未迁移功能**:
- 日记 (`diary`)
- 小红书 (`xhs`)
- 银行卡 (`bank`)
- 游戏文件夹 (`folder-games`)
- 2048游戏 (`g2048`)
- 黄金矿工 (`ggold`)
- 飞行棋 (`game`)

---

## 🎨 CSS模块化

### 拆分统计
- **原始文件**: `css.js` (4502行, 264KB) → `css.js.deprecated` (已弃用)
- **拆分模块**: 14个
- **模块总大小**: 236KB

### 模块列表

| 文件 | 大小 | 描述 |
|------|------|------|
| `base.css` | 2.2KB | 基础样式（FAB、响应式） |
| `themes.css` | 6.8KB | 主题变量定义 |
| `frame.css` | 1.4KB | 手机框架（外框、屏幕、状态栏） |
| `lockscreen.css` | 3.0KB | 锁屏界面 |
| `homescreen.css` | 5.0KB | 主屏幕（时钟、图标、widget、页面） |
| `messages.css` | 21KB | 消息模块（列表、对话、气泡、输入框） |
| `common.css` | 41KB | 公共组件（导航栏、模态框、通知、图标等） |
| `themes-view.css` | 6.7KB | 主题视图 |
| `messages-dark.css` | 1.7KB | 消息暗色模式 |
| `moments.css` | 5.6KB | 朋友圈模块 |
| `settings.css` | 2.3KB | 设置模块 |
| `diary.css` | 5.3KB | 日记模块 |
| `games.css` | 89KB | 游戏模块（2048、黄金矿工、飞行棋） |
| `xhs.css` | 21KB | 小红书模块 |
| `bank.css` | 15KB | 银行卡模块 |

### 使用方式

**当前运行方式**（模块化）:
```javascript
import { RP_PHONE_CSS } from './src/styles/index.js';
```

### 文件结构

```
src/styles/
├── index.js                 # CSS 入口文件
├── css.js.deprecated        # 原始备份
└── modules/                # 14 个 JS 模块
    ├── base.js
    ├── themes.js
    └── ... 其他模块
```

每个模块将 CSS 内容作为字符串常量导出，直接在浏览器中使用，无需构建步骤。

详细文档见 `src/styles/README.md`。

---

## 🔌 SillyTavern集成

### 上下文获取

```javascript
function getContext() {
  if (window.SillyTavern && window.SillyTavern.getContext) {
    return window.SillyTavern.getContext();
  }
  return null;
}
```

### AI响应解析

监听 `<PHONE>` 标签，支持以下指令:
- `[SMS:内容]` - 发送短信
- `[CALL:动作]` - 电话相关
- `[HONGBAO:金额]` - 红包
- `[VOICE:时长]` - 语音消息

### 角色切换监听

自动监听角色/对话切换，同步消息数据。

---

## 📝 原始 `index.js` 说明

**状态**: 已弃用，仅作备份

**原因**:
- 原index.js包含所有CSS内联代码（15586行），导致文件过大（696KB）
- CSS已迁移至 `src/styles/css.js`（4502行，264KB），并通过12个模块化文件维护
- 所有功能已迁移至 `src/modules/` 各模块

**当前入口**: `main.js`

---

## 🛠️ 开发指南

### 添加新功能模块

1. 在 `src/modules/` 创建新模块文件
2. 导出初始化函数和核心API
3. 在 `main.js` 中导入并初始化
4. 在 `navigateTo()` 中添加路由
5. 在 `src/styles/modules/` 添加对应CSS

### 添加新主题

1. 在 `themes.js` 的 `THEMES` 对象中添加主题定义
2. 在 `src/styles/modules/themes.css` 中添加主题相关样式
3. 更新主题选择器渲染逻辑

### CSS模块维护

- 修改某个功能 → 直接编辑对应的CSS模块
- 添加新组件 → 在 `src/styles/modules/` 创建新CSS文件
- 全局样式 → 修改 `base.css` 或 `components.css`

---

## ⚠️ 注意事项

1. **热重载**: `main.js` 会清理旧元素，支持开发时热重载
2. **状态隔离**: 每个对话的状态独立存储，切换对话时自动同步
3. **移动端适配**: PC端和移动端有不同的布局逻辑
4. **FAB按钮**: 右下角悬浮按钮用于显示/隐藏手机
5. **CSS注入**: 通过JS注入CSS，避免SillyTavern扩展CSS加载管线冲突

---

## 📊 模块代码量统计

| 模块 | 行数 | 大小 |
|------|------|------|
| messages.js | 1463 | 54KB |
| themes.js | 427 | 19KB |
| settings.js | 285 | 9KB |
| moments.js | 239 | 9KB |
| placeholder.js | 29 | 0.8KB |

---

## 🎯 开发路线

**已完成**:
- ✅ 消息模块
- ✅ 主题模块
- ✅ 设置模块
- ✅ 朋友圈模块
- ✅ CSS模块化拆分（12个逻辑模块）

**待迁移**:
- ⏳ 日记模块
- ⏳ 小红书模块
- ⏳ 银行卡模块
- ⏳ 游戏模块（2048、黄金矿工、飞行棋）

---

## 📋 开发路线

**已完成**:
- ✅ 主入口从 index.js 拆分到 main.js
- ✅ 消息模块拆分
- ✅ 主题模块拆分
- ✅ 设置模块拆分
- ✅ 朋友圈模块拆分
- ✅ CSS模块化拆分（14个逻辑模块）
- ✅ HTML模板拆分
- ✅ 事件监听机制完善（MESSAGE_DELETED 等）

**待迁移**:
- ⏳ 日记模块
- ⏳ 小红书模块
- ⏳ 银行卡模块
- ⏳ 游戏模块（2048、黄金矿工、飞行棋）

---

*项目宪法版本: 1.2.0*  
*最后更新: 2026-04-05*