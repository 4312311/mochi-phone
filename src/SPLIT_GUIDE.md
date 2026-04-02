# Raymond Phone 模块拆分指南

## 当前状态

- ✅ 项目结构已创建
- ✅ 核心模块（core/, styles/）已提取
- ✅ 占位模块（游戏、日记、银行卡）已创建
- ⚠️  主要功能模块（chat, sms, moments等）仍需拆分
- ⚠️  src/index.js 需要导入原始代码

## 拆分优先级

### 阶段1：基础框架（已完成）
- [x] 创建目录结构
- [x] 提取核心模块
- [x] 创建占位模块
- [x] 更新 manifest.json

### 阶段2：核心功能（下一步）
按以下顺序拆分：

1. **HTML模板** (`templates/html.js`)
   - 提取 `const HTML = \`...\`` 部分
   - 约3800行

2. **聊天模块** (`modules/chat.js`)
   - renderThreadList
   - openThread
   - renderBubbles (约300行，最复杂)
   - sendSMS
   - incomingMsg
   - showBanner
   - refreshBadges
   - updatePreviews
   - findOrCreateThread
   - matchThread

3. **短信解析模块** (`modules/sms.js`)
   - parsePhone (约400行，核心解析函数)
   - normalizePhoneMarkup
   - sanitizeSmsText
   - cleanMomentText
   - getTagAttrs
   - onMessageUpdatedForImages (约230行)
   - rpTriggerPendingImg
   - 所有 incoming* 函数

4. **朋友圈模块** (`modules/moments.js`)
   - renderMoments
   - incomingMoment
   - incomingComment

5. **小红书模块** (`modules/xiaohongshu.js`)
   - renderXHSFeed
   - renderXHSDetail
   - renderXHSCard

6. **主题模块** (`modules/themes.js`)
   - lgRenderThemePicker
   - applyTheme
   - changeWallpaper

7. **API设置模块** (`modules/api-settings.js`)
   - lgFillAPIView
   - testComfyUI
   - testLightGame

8. **头像模块** (`modules/avatar.js`)
   - _bindAvatarUpload
   - populateAvatarSelect

9. **聊天标签模块** (`modules/phone-tag.js`)
   - renderChatTag
   - parsePhoneTag
   - hidePhoneTagsInChat

### 阶段3：游戏模块（可选，按需拆分）
- games-2048.js
- games-gold.js
- games-ludo.js

### 阶段4：清理和优化
- 删除全局变量，改用模块导出
- 添加 JSDoc 注释
- 优化依赖关系

## 拆分步骤

### 1. 提取HTML模板
```bash
# 找到HTML常量的行号
grep -n "^const HTML" index.js
# 提取到 templates/html.js
```

### 2. 提取函数
对于每个模块：
1. 找到所有相关函数的行号
2. 读取函数代码
3. 添加 export 语句
4. 添加必要的 import
5. 在 src/index.js 中导入

### 3. 测试
每次拆分一个模块后：
1. 在 SillyTavern 中测试
2. 检查控制台错误
3. 验证功能正常

## 依赖关系

```
src/index.js (主入口)
  ├── core/
  │   ├── state.js (STATE, saveState, loadState)
  │   ├── utils.js (工具函数)
  │   └── init.js (initPhone, bindUI, etc)
  ├── styles/
  │   └── css.js (CSS样式)
  ├── templates/
  │   └── html.js (HTML模板)
  └── modules/
      ├── chat.js (聊天功能)
      ├── sms.js (短信解析)
      ├── moments.js (朋友圈)
      ├── xiaohongshu.js (小红书)
      ├── themes.js (主题)
      ├── api-settings.js (API设置)
      ├── diary.js (日记 - 空)
      ├── bank.js (银行卡 - 空)
      ├── games-2048.js (2048游戏 - 空)
      ├── games-gold.js (黄金矿工 - 空)
      ├── games-ludo.js (飞行棋 - 空)
      ├── avatar.js (头像)
      └── phone-tag.js (聊天标签)
```

## 注意事项

1. **STATE 对象**: 所有模块共享 STATE，通过 import 使用
2. **全局函数**: HTML onclick 中使用的函数需要暴露到 window
3. **事件监听**: SillyTavern 事件监听需要在 init.js 中注册
4. **CSS样式**: 通过 injectStyles() 注入到页面
5. **HTML模板**: 通过 insertAdjacentHTML 注入到页面

## 快速开始

如果要继续拆分，建议：

1. 先提取 HTML 模板（这是最简单的）
2. 然后提取 chat.js（最常用的功能）
3. 接着提取 sms.js（核心解析功能）
4. 其他模块按需提取

每次提取一个模块后，都要测试确保功能正常。
