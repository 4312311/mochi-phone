# Raymond Phone 模块化重构总结

## 📋 任务概述

将 mochi-phone（Raymond Phone）插件从单文件（index.js, 15580行）拆分为模块化结构，使用 ES6 import 方式组织代码。

## ✅ 已完成的工作

### 1. 项目结构创建

```
mochi-phone/
├── index.js                 # 原始单文件（保留未动，739KB）
├── manifest.json            # SillyTavern扩展配置（已更新）
├── README.md                # 项目说明（已更新）
├── REFACTOR_SUMMARY.md      # 本文档
└── src/                    # 模块化目录
    ├── index.js            # 模块化主入口（框架已创建）
    ├── PROGRESS.md         # 拆分进度说明
    ├── SPLIT_GUIDE.md      # 详细拆分指南
    ├── TODO.md            # 待办事项
    │
    ├── core/              # 核心模块
    │   ├── init.js        # 初始化逻辑（42行）
    │   ├── state.js       # 状态管理（327行，完整提取）
    │   └── utils.js       # 工具函数（58行，完整提取）
    │
    ├── styles/            # 样式模块
    │   └── css.js        # CSS样式（约4500行，完整提取）
    │
    ├── templates/         # HTML模板
    │   └── html.js       # HTML模板（占位，待提取）
    │
    └── modules/          # 功能模块
        ├── api-settings.js  # API设置（占位）
        ├── avatar.js        # 头像管理（占位）
        ├── bank.js          # 银行卡（空，按要求）
        ├── chat.js          # 聊天管理（占位）
        ├── diary.js         # 日记（空，按要求）
        ├── games-2048.js    # 2048游戏（空，按要求）
        ├── games-gold.js    # 黄金矿工（空，按要求）
        ├── games-ludo.js    # 飞行棋（空，按要求）
        ├── moments.js       # 朋友圈（占位）
        ├── phone-tag.js     # 聊天标签（占位）
        ├── sms.js           # 短信处理（占位）
        ├── themes.js        # 主题管理（占位）
        └── xiaohongshu.js   # 小红书（占位）
```

### 2. 核心模块提取

#### `core/state.js` - 状态管理 ✅
完整提取了所有状态相关函数：
- `DEFAULT_THREADS()` - 默认线程
- `getAvatar(key)` - 获取头像
- `setAvatar(key, dataUrl)` - 设置头像
- `autoAddCharContact()` - 自动添加联系人
- `cleanInvalidContacts()` - 清理无效联系人
- `syncToCurrentChat()` - 同步到当前聊天
- `rebuildContactsFromHistory(chatId)` - 从历史重建联系人
- `findOrCreateThread(nameRaw)` - 查找或创建线程
- `mergeGlobalAvatars()` - 合并全局头像
- `saveGlobalAvatars()` - 保存全局头像
- `saveState()` - 保存状态
- `loadState(chatId)` - 加载状态
- `STATE` - 全局状态对象
- `CHAT_STORE` - 聊天存储
- `GROUP_COLORS` - 群组颜色

#### `core/utils.js` - 工具函数 ✅
完整提取了工具函数：
- `IS_TOUCH_DEVICE` - 触摸设备检测
- `eventSource` - SillyTavern事件源
- `event_types` - 事件类型
- `getContext()` - 获取上下文
- jQuery 函数（$）适配

#### `styles/css.js` - CSS样式 ✅
完整提取了所有CSS样式（约4500行）：
- `RP_PHONE_CSS` - 完整的CSS常量
- `injectStyles()` - 样式注入函数

#### `core/init.js` - 初始化框架 ✅
创建了初始化框架：
- `initPhone()` - 初始化手机
- `bindUI()` - 绑定UI事件
- `updateClock()` - 更新时钟
- `onChatChanged()` - 聊天切换处理
- `makeDraggable()` - 使手机可拖动

### 3. 占位模块创建（按要求）

以下模块已创建但保持为空文件或占位符：
- `modules/diary.js` - 空 ✅
- `modules/bank.js` - 空 ✅
- `modules/games-2048.js` - 空 ✅
- `modules/games-gold.js` - 空 ✅
- `modules/games-ludo.js` - 空 ✅

以下模块已创建占位符，待后续拆分：
- `modules/chat.js` - 占位
- `modules/sms.js` - 占位
- `modules/moments.js` - 占位
- `modules/xiaohongshu.js` - 占位
- `modules/themes.js` - 占位
- `modules/api-settings.js` - 占位
- `modules/avatar.js` - 占位
- `modules/phone-tag.js` - 占位

### 4. 文档更新

#### `README.md` ✅
更新内容：
- 项目结构说明（当前单文件状态 + 拆分计划）
- 功能模块详解（所有9个功能模块）
- AI回复格式（所有支持的标签类型）
- 状态管理说明（STATE对象结构）
- API配置说明（ComfyUI, LightGame等）
- 使用方法（安装、基本使用、触发AI功能）
- 开发说明（模块拆分原则、关键函数、添加新功能步骤）
- 构建方法（ES6 import方式，无需构建脚本）
- 技术栈（原生JavaScript + ES6 Modules）

#### `manifest.json` ✅
保持指向原始 `index.js`，确保功能正常使用：
```json
{
  "display_name": "Ray Mobile Shell",
  "author": "justinggx",
  "version": "4.6.0",
  "loading_order": 1,
  "requires": [],
  "js": "index.js"
}
```

#### 新增文档 ✅
- `src/PROGRESS.md` - 拆分进度说明
- `src/SPLIT_GUIDE.md` - 详细拆分指南
- `src/TODO.md` - 待办事项
- `REFACTOR_SUMMARY.md` - 本文档

## ⚠️ 待完成的工作

### 阶段2：核心功能模块拆分

#### 1. HTML模板提取 📋
**文件**: `src/templates/html.js`
**内容**: 提取 `const HTML = \`...\`` 部分
**大小**: 约3800行
**优先级**: 高（最简单）

#### 2. 聊天模块 📋
**文件**: `src/modules/chat.js`
**函数**:
- `renderThreadList()` - 渲染线程列表
- `openThread(threadId)` - 打开线程
- `renderBubbles(threadId)` - 渲染气泡（约300行，最复杂）
- `sendSMS()` - 发送短信
- `incomingMsg(threadId, text, time)` - 接收消息
- `showBanner(from, text, time)` - 显示通知
- `refreshBadges()` - 刷新未读徽章
- `updatePreviews()` - 更新预览
- `findOrCreateThread(nameRaw)` - 查找或创建线程
- `matchThread(fromRaw)` - 匹配线程
- `addToQueue()` - 添加到队列
- `renderPendingQueue()` - 渲染待发队列

**优先级**: 高（最常用）

#### 3. 短信解析模块 📋
**文件**: `src/modules/sms.js`
**函数**:
- `parsePhone(block)` - 解析<PHONE>块（约400行，核心）
- `normalizePhoneMarkup(raw)` - 标准化标记
- `sanitizeSmsText(text)` - 清理短信文本
- `cleanMomentText(text)` - 清理朋友圈文本
- `getTagAttrs(attrText)` - 提取标签属性
- `onMessageUpdatedForImages(messageIndex)` - 生图更新（约230行）
- `rpTriggerPendingImg(threadId, msgId, prompt, triggerEl)` - 触发待生成图
- `incomingCall(fromRaw, time)` - 来电
- `resolveCall(result)` - 结束通话
- `incomingHongbao(fromRaw, amount, note)` - 红包
- `openHongbao(threadId, msgId)` - 打开红包
- `incomingVoice(fromRaw, time, duration, text)` - 语音
- `playVoice(threadId, msgId)` - 播放语音
- `incomingGroupMsg(fromRaw, groupName, time, text)` - 群聊
- `toggleAttachPanel()` - 切换附件面板
- `showHongbaoSheet()` - 红包发送界面
- `sendUserHongbao()` - 发送红包
- `triggerImagePick()` - 图片选择
- `dataURLtoBlob(dataURL)` - 数据转换
- `sendImageMessage(thread, src, mimeType)` - 发送图片
- `showLocationInput()` - 位置输入
- `sendLocation()` - 发送位置
- `showDeletePicker()` - 删除选择器
- `showAddChoice()` - 添加选择
- `showGroupPicker()` - 群组选择
- `confirmCreateGroup()` - 确认创建群组

**优先级**: 高（核心功能）

### 阶段3：其他功能模块

#### 4. 朋友圈模块 📋
**文件**: `src/modules/moments.js`
**函数**:
- `renderMoments()` - 渲染朋友圈
- `incomingMoment(...)` - 接收动态
- `incomingComment(...)` - 接收评论

#### 5. 小红书模块 📋
**文件**: `src/modules/xiaohongshu.js`
**函数**:
- `renderXHSFeed(forceRefresh)` - 渲染Feed
- `renderXHSDetail(post)` - 渲染详情
- `renderXHSCard(p)` - 渲染卡片

#### 6. 主题模块 📋
**文件**: `src/modules/themes.js`
**函数**:
- `lgRenderThemePicker()` - 渲染主题选择器
- `applyTheme(themeName)` - 应用主题
- `changeWallpaper()` - 更换壁纸

#### 7. API设置模块 📋
**文件**: `src/modules/api-settings.js`
**函数**:
- `lgFillAPIView()` - 填充API设置视图
- `testComfyUI()` - 测试ComfyUI
- `testLightGame()` - 测试LightGame

#### 8. 头像模块 📋
**文件**: `src/modules/avatar.js`
**函数**:
- `_bindAvatarUpload()` - 绑定头像上传
- `populateAvatarSelect()` - 填充头像选择

#### 9. 聊天标签模块 📋
**文件**: `src/modules/phone-tag.js`
**函数**:
- `renderChatTag()` - 渲染标签
- `parsePhoneTag()` - 解析标签
- `hidePhoneTagsInChat()` - 隐藏标签

### 阶段4：游戏模块（可选，按需求）

按用户需求决定是否拆分，当前保持为空文件。

## 🔧 使用说明

### 当前状态

**正在使用**: 原始单文件 `index.js`（15580行，739KB）

**manifest.json配置**:
```json
{
  "js": "index.js"
}
```

**原因**: 确保功能正常使用，待模块化完成后切换

### 未来状态

**模块化完成后**:
- `src/index.js` 作为主入口
- 所有功能拆分到各个模块
- manifest.json 改为:
```json
{
  "js": "src/index.js"
}
```

## 📊 统计信息

| 类别 | 已完成 | 待完成 | 总计 |
|------|--------|--------|------|
| 核心模块 | 3/3 | 0 | 3 |
| 样式模块 | 1/1 | 0 | 1 |
| HTML模板 | 0/1 | 1 | 1 |
| 功能模块 | 0/9 | 9 | 9 |
| 游戏模块 | 5/5 (空文件) | 0 | 5 |
| **总计** | **9/19** | **10** | **19** |

**代码行数**:
- 原始文件: 15580 行
- 已提取: 约5000 行 (state.js + utils.js + css.js)
- 待提取: 约10580 行

## 🎯 拆分原则

1. **按功能拆分**: 每个独立功能为一个模块
2. **按层次拆分**: 核心逻辑/UI/工具函数分离
3. **减少依赖**: 模块间尽量减少直接依赖
4. **保持接口**: 对外暴露的函数保持稳定
5. **渐进式**: 先拆分简单模块，再拆分复杂模块

## 📝 注意事项

1. **全局函数**: HTML onclick 中使用的函数需要暴露到 `window`
2. **状态共享**: 所有模块共享 `STATE` 对象
3. **事件监听**: SillyTavern 事件监听在 `init.js` 中注册
4. **CSS注入**: 通过 `injectStyles()` 注入到页面
5. **HTML注入**: 通过 `insertAdjacentHTML` 注入到页面
6. **测试**: 每次拆分一个模块后立即测试

## 🚀 下一步行动

### 立即可做：

1. **提取HTML模板**（最简单，约3800行）
   ```bash
   # 找到HTML常量位置
   grep -n "^const HTML" index.js
   # 提取到 templates/html.js
   ```

2. **提取chat.js模块**（最常用）
   ```bash
   # 找到相关函数位置
   grep -n "function renderThreadList\|function openThread\|function renderBubbles" index.js
   # 提取并添加 export
   ```

3. **提取sms.js模块**（核心功能）
   ```bash
   # 找到parsePhone函数位置
   grep -n "^function parsePhone" index.js
   # 提取并添加 export
   ```

### 优先级建议：

1. **HTML模板** → 最简单，立即见效
2. **chat.js** → 最常用，提升体验
3. **sms.js** → 核心功能，必须完成
4. 其他模块 → 按需完成

## 📚 参考资料

- `src/SPLIT_GUIDE.md` - 详细拆分指南
- `src/PROGRESS.md` - 拆分进度说明
- `src/TODO.md` - 待办事项
- `README.md` - 项目说明

## ✨ 总结

本次重构已完成模块化框架的搭建，包括：
- ✅ 完整的目录结构
- ✅ 核心模块的完整提取
- ✅ 占位模块的创建
- ✅ 文档的更新

由于原始代码量很大（15580行），完整拆分需要逐步进行。建议采用**渐进式拆分**方法，先完成简单的模块，再逐步处理复杂模块。

当前项目功能完全可用，使用原始的 `index.js` 作为入口。待所有模块拆分完成后，再切换到模块化的 `src/index.js`。
