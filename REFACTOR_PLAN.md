# 手机模拟插件拆分计划

## 拆分说明

本次拆分将原来的 `index.js` 按模块拆分为多个独立文件，便于维护和扩展。

## 目录结构

```
/Users/zy/project/phone/mochi-phone/
├── index.new.js          # 主入口文件（新版本）
├── index.js              # 原始文件（保留）
├── manifest.json         # 插件清单（已更新指向新版本）
├── src/
│   ├── styles/
│   │   └── css.js       # CSS样式模块
│   ├── modules/
│   │   ├── sms.js       # 短信模块 ✅ 已迁移
│   │   ├── themes.js    # 主题模块 ✅ 已迁移（仅4个内置主题）
│   │   └── placeholder.js # 占位符模块（未迁移功能提示）
│   └── core/
│       ├── state.js     # 状态管理（待创建）
│       ├── utils.js     # 工具函数（待创建）
│       └── init.js      # 初始化逻辑（待创建）
```

## 已完成的工作

### 1. CSS样式模块 (`src/styles/css.js`)
- ✅ 已从原始 `index.js` 中提取所有CSS样式
- ✅ 导出 `RP_PHONE_CSS` 常量

### 2. 短信模块 (`src/modules/sms.js`)
- ✅ 已迁移短信功能
- ✅ 包含以下功能：
  - `sendSMS()` - 发送短信
  - `sanitizeSmsText()` - 清理短信文本
  - `extractSmsSummaries()` - 提取短信摘要
  - `beautifySMSInChat()` - 美化聊天中的短信显示
  - `initSMS()` - 初始化短信模块
  - `renderThreadList()` - 渲染线程列表
  - `openThread()` - 打开线程
  - `renderBubbles()` - 渲染消息气泡
  - `updatePreviews()` - 更新预览
  - `renderPendingQueue()` - 渲染待发送队列

### 3. 主题模块 (`src/modules/themes.js`)
- ✅ 已迁移主题功能（简化版）
- ✅ 仅支持4个内置主题：
  - 糖果花园 (candy)
  - 星夜 (star)
  - 烟蓝·绣球 (misty)
  - 简约白 (default)
- ✅ 包含以下功能：
  - `lgApplyTheme()` - 应用主题
  - `lgInitTheme()` - 初始化主题
  - `lgRenderHomeIcons()` - 渲染首页图标
  - `rpStripFrameRing()` - 去除手机边框外圈
  - `lgRenderThemePicker()` - 渲染主题选择器
  - `initThemes()` - 初始化主题模块
- ⚠️ 不包含AI自定义主题生成功能

### 4. 占位符模块 (`src/modules/placeholder.js`)
- ✅ 已创建，用于显示未迁移功能的提示

### 5. 主入口文件 (`index.new.js`)
- ✅ 职责明确：
  - 引入各个模块
  - 注入CSS样式
  - 注入HTML主框架
  - 管理核心状态 (STATE)
  - 路由控制（页面切换）
  - 调用各模块初始化函数
- ✅ 不包含各模块的具体实现

### 6. 插件清单 (`manifest.json`)
- ✅ 已更新 `js` 字段指向 `index.new.js`
- ✅ 版本号更新为 `4.7.0`

## 待迁移的模块

以下模块在点击后会显示"功能迁移中"提示：

- 🔄 群聊 (moments) - 实际是朋友圈
- 🔄 设置 (settings)
- 🔄 游戏集合 (games - 2048/黄金矿工/飞行棋)
- 🔄 日记 (diary)
- 🔄 小红书 (xiaohongshu)
- 🔄 银行 (bank)
- 🔄 API设置 (api-settings)
- 🔄 头像 (avatar)
- 🔄 电话标签 (phone-tag)

## 设计原则

### 1. 职责分离
- **主入口文件** (`index.new.js`): 只负责模块导入、CSS注入、主框架渲染、路由控制
- **各模块文件**: 负责各自功能的实现和渲染

### 2. 模块间通信
- 通过 `window` 对象暴露需要全局访问的函数（供HTML中的onclick使用）
- 通过 `window.STATE` 共享核心状态
- 通过函数参数传递数据

### 3. ES6模块化
- 使用 `import/export` 语法进行模块导入/导出
- SillyTavern支持ES6模块导入

## 测试建议

1. 在SillyTavern中加载新版本插件
2. 点击FAB按钮打开手机
3. 测试短信功能：
   - 点击"信息"图标
   - 查看线程列表
   - 点击线程打开聊天界面
   - 发送消息
4. 测试主题功能：
   - 点击"主题"图标
   - 切换不同主题
5. 测试未迁移功能：
   - 点击其他图标
   - 确认显示"功能迁移中"提示

## 注意事项

1. **STATE 对象**: 在模块中通过 `getSTATE()` 函数获取，避免直接访问
2. **window 对象**: 模块需要访问的全局函数通过 `window` 暴露
3. **路由**: 主入口提供 `navigateTo(page)` 函数进行页面切换
4. **初始化**: 各模块提供 `initXXX()` 函数供主入口调用

## 后续工作

1. ✅ 测试短信模块和主题模块功能
2. 🔄 根据测试结果修复bug
3. 🔄 逐个迁移其他模块
4. 🔄 完善错误处理和日志
5. 🔄 添加单元测试
