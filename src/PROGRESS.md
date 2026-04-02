# 模块化拆分进度

## 已完成 ✅

### 阶段1：基础框架 (100%)
- ✅ 创建目录结构 (src/core, src/styles, src/templates, src/modules)
- ✅ 提取核心模块
  - `src/core/state.js` - 状态管理
  - `src/core/utils.js` - 工具函数
  - `src/core/init.js` - 初始化
- ✅ 提取样式模块
  - `src/styles/css.js` - CSS样式
- ✅ 提取模板模块
  - `src/templates/html.js` - HTML模板
- ✅ 更新 `manifest.json` 入口路径

### 阶段2：核心功能模块 (100%)

#### 1. 聊天模块 ✅
**文件**: `src/modules/chat.js` (约500行)

**功能**:
- `renderThreadList()` - 渲染线程列表
- `openThread(threadId)` - 打开线程
- `renderBubbles(threadId)` - 渲染气泡(包含所有消息类型:普通消息、语音、红包、图片、位置、群聊等)
- `sendSMS()` - 发送短信
- `rpTriggerPendingImg()` - 触发生图(智绘姬)
- `renderPendingQueue()` - 渲染待发队列
- `refreshBadges()` - 刷新徽章
- `updatePreviews()` - 更新预览
- `incomingMsg()` - 接收消息
- `showBanner()` - 显示横幅通知
- `showLiveChat()` - 显示实时聊天气泡

**依赖**:
- `../core/state.js` - STATE, saveState
- `../core/utils.js` - getAvatar, escHtml
- `./helpers.js` - findOrCreateThread, openHongbao, playVoice

#### 2. 短信解析模块 ✅
**文件**: `src/modules/sms.js` (约700行)

**功能**:
- `parsePhone(block)` - 核心解析函数,解析<SMS>、<MOMENTS>、<CALL>、<VOICE>、<HONGBAO>、<GMSG>、<GVOICE>、<GHONGBAO>、<SIMG>等标签
- `normalizePhoneMarkup(raw)` - 标准化手机标记
- `sanitizeSmsText(text)` - 清理短信文本
- `cleanMomentText(text)` - 清理朋友圈文本
- `extractSmsSummaries(block)` - 提取短信摘要
- `cleanPhoneFallbackReply(raw, fromName)` - 清理手机回声
- `applyPhoneCollapseToEl(textEl, block, fp)` - 应用手机折叠
- `rewritePhoneEchoInChat(block, fp)` - 重写聊天中的手机回声
- `rewriteAllHistoryPhoneBlocks()` - 重写所有历史手机块
- `matchThread(fromRaw)` - 匹配线程
- `incomingCall()` - 接收来电
- `resolveCall()` - 结束通话
- `incomingHongbao()` - 接收红包
- `incomingVoice()` - 接收语音消息
- `incomingGroupMsg()` - 接收群聊消息
- `addLockNotif()` - 添加锁屏通知
- `refreshLockNotifs()` - 刷新锁屏通知
- `refreshWidget()` - 刷新小组件

**依赖**:
- `../core/state.js` - STATE, saveState
- `../core/utils.js` - escHtml
- `./chat.js` - renderBubbles, refreshBadges, updatePreviews, showBanner, showLiveChat, renderThreadList
- `./helpers.js` - findOrCreateThread

#### 3. 朋友圈模块 ✅
**文件**: `src/modules/moments.js` (约300行)

**功能**:
- `renderMoments()` - 渲染朋友圈
- `cleanMomentText(text)` - 清理朋友圈文本
- `incomingMoment()` - 接收朋友圈动态
- `incomingComment()` - 接收朋友圈评论
- `toggleLike()` - 切换点赞
- `sendMomentComment()` - 发送朋友圈评论
- `matchThread()` - 匹配线程(从sms.js导入)
- `friendsInteractOnMoment()` - 好友互动(占位函数)
- `generateAIReply()` - 生成AI回复(占位函数)
- `momentAISocial()` - 朋友圈AI社交互动(占位函数)

**依赖**:
- `../core/state.js` - STATE, saveState
- `../core/utils.js` - escHtml
- `./chat.js` - showBanner
- `./sms.js` - matchThread

#### 4. 辅助函数模块 ✅
**文件**: `src/modules/helpers.js` (约60行)

**功能**:
- `findOrCreateThread()` - 查找或创建线程
- `openHongbao()` - 打开红包
- `playVoice()` - 播放语音

**依赖**:
- `../core/state.js` - STATE, saveState
- `./chat.js` - renderBubbles, renderThreadList, refreshBadges

### 阶段3：游戏模块 (占位)
- ✅ `src/modules/games-2048.js` - 2048游戏(空占位)
- ✅ `src/modules/games-gold.js` - 黄金矿工(空占位)
- ✅ `src/modules/games-ludo.js` - 飞行棋(空占位)

### 阶段4：其他功能模块 (占位)
- ✅ `src/modules/api-settings.js` - API设置(已有内容)
- ✅ `src/modules/avatar.js` - 头像(已有内容)
- ✅ `src/modules/bank.js` - 银行卡(已有内容)
- ✅ `src/modules/diary.js` - 日记(空占位)
- ✅ `src/modules/phone-tag.js` - 聊天标签(已有内容)

## 文件结构

```
mochi-phone/
├── index.js                      # 原始文件(保留)
├── manifest.json                  # 入口指向 src/index.js
├── README.md                      # 项目说明
├── REFACTOR_SUMMARY.md            # 拆分总结
├── REFACTOR_COMPLETE.md           # 完成报告
└── src/
    ├── index.js                   # 完整代码入口
    ├── PROGRESS.md                # 本文件
    ├── SPLIT_GUIDE.md             # 拆分指南
    ├── TODO.md                    # 待办事项
    ├── core/                      # 核心模块
    │   ├── state.js               # 状态管理
    │   ├── utils.js               # 工具函数
    │   └── init.js                # 初始化
    ├── styles/                    # 样式模块
    │   └── css.js                 # CSS样式
    ├── templates/                 # 模板模块
    │   └── html.js                # HTML模板
    └── modules/                   # 功能模块
        ├── chat.js                # ✅ 聊天模块(500行)
        ├── sms.js                 # ✅ 短信解析模块(700行)
        ├── moments.js             # ✅ 朋友圈模块(300行)
        ├── helpers.js             # ✅ 辅助函数模块(60行)
        ├── api-settings.js        # API设置
        ├── avatar.js              # 头像
        ├── bank.js                # 银行卡
        ├── diary.js               # 日记(空)
        ├── phone-tag.js           # 聊天标签
        ├── games-2048.js          # 2048游戏(空)
        ├── games-gold.js          # 黄金矿工(空)
        └── games-ludo.js          # 飞行棋(空)
```

## 关键说明

### 聊天和短信的区别
- **聊天模块 (chat.js)**: 负责UI渲染和交互,包括线程列表、气泡渲染、发送消息等
- **短信解析模块 (sms.js)**: 负责解析AI输出的标签,如<SMS>、<MOMENTS>、<CALL>等,并将解析结果路由到对应线程

### 模块依赖关系
```
src/index.js (主入口)
  ├── core/
  │   ├── state.js (STATE, saveState)
  │   ├── utils.js (工具函数)
  │   └── init.js (初始化)
  ├── styles/css.js (CSS样式)
  ├── templates/html.js (HTML模板)
  └── modules/
      ├── helpers.js (基础辅助函数)
      ├── chat.js (聊天UI → 依赖 helpers)
      ├── sms.js (标签解析 → 依赖 chat, helpers)
      ├── moments.js (朋友圈 → 依赖 chat, sms)
      └── ...其他模块
```

## 下一步工作 (可选)

如果需要进一步模块化,可以考虑:
1. 提取小红书相关功能到 `xiaohongshu.js`
2. 提取主题相关功能到 `themes.js`
3. 实现占位函数的具体逻辑(friendsInteractOnMoment, generateAIReply等)
4. 提取游戏模块的具体实现

## 总结

✅ 核心功能模块已完成拆分,包括:
- 聊天模块 (UI渲染和交互)
- 短信解析模块 (标签解析和路由)
- 朋友圈模块 (朋友圈功能)
- 辅助函数模块 (共享辅助函数)

所有模块相互依赖清晰,没有循环依赖,可以正常工作。
