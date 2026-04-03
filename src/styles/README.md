# Mochi Phone CSS 模块化文档

## 📊 拆分统计

| 指标 | 数值 |
|------|------|
| 原始文件 | css.js (4502行, 264KB) |
| 拆分模块数 | 12个 |
| 模块总大小 | 236KB |

## 📁 文件结构

```
src/styles/
├── base.css              # 基础样式 (FAB、响应式)
├── css.js               # 原始CSS文件(备份)
├── index.js             # 主入口文件(整合所有模块)
├── README.md            # 本文档
└── modules/             # CSS模块目录
    ├── common.css       # 公共组件 (57KB)
    ├── frame.css        # 手机框架 (2.2KB)
    ├── homescreen.css   # 主屏幕 (5.4KB)
    ├── lockscreen.css   # 锁屏界面 (5.4KB)
    ├── messages.css     # 消息模块 (8.4KB)
    ├── moments.css     # 朋友圈模块 (23KB)
    ├── themes.css      # 主题样式 (47KB)
    ├── settings.css    # 设置模块 (15KB)
    ├── games.css       # 游戏模块 (19KB)
    ├── diary.css       # 日记模块 (15KB)
    ├── xhs.css         # 小红书模块 (17KB)
    └── bank.css        # 银行卡模块 (9.3KB)
```

## 📦 模块说明

### 1. **base.css** - 基础样式
包含FAB按钮、响应式适配、通用样式等基础功能。

### 2. **common.css** - 公共组件 (57KB)
整合了所有公共组件样式：
- 导航栏 (navbar)
- 模态框 (modals)
- 通知横幅 (notification)
- 图标样式 (iconbase, shared-icons)
- 分隔线 (divider)
- 弹窗 (popup)
- 滚动条 (scrollbar)
- 编辑/删除按钮
- 头像 (avatar)
- 附件面板 (attach)
- 语音消息 (voice)
- 红包 (hongbao)
- 群聊 (groupchat)
- 选择框 (choice)
- 气泡内边距 (bubble-inset)
- 任务栏 (taskbar)
- 通话界面 (call-overlay, call-record)
- 组合模态框 (compose-*)
- 文本域 (textarea)
- 主题工作室组件 (studio-*)

### 3. **frame.css** - 手机框架 (2.2KB)
手机外框、屏幕容器、状态栏、深色模式框架。

### 4. **homescreen.css** - 主屏幕 (5.4KB)
主屏幕背景、时钟显示、应用图标网格、widget组件、页面指示器、关于页、深色模式主页。

### 5. **lockscreen.css** - 锁屏界面 (5.4KB)
锁屏背景和布局、时间显示、通知卡片、滑动删除功能、锁屏小部件、深色模式锁屏。

### 6. **messages.css** - 消息模块 (8.4KB)
消息列表视图、线程视图、气泡样式、输入框和发送按钮、深色模式消息。

### 7. **moments.css** - 朋友圈模块 (23KB)
朋友圈列表、朋友圈卡片、图片样式、发布按钮、评论功能、点赞功能。

### 8. **themes.css** - 主题样式 (47KB)
主题变量、主题选择页面、主题卡片、主题预览、自定义主题界面、各主题特定样式、壁纸相关、粒子效果。

### 9. **settings.css** - 设置模块 (15KB)
设置页面、头像上传、壁纸设置、API设置、主题设置。

### 10. **games.css** - 游戏模块 (19KB)
游戏文件夹、各主题游戏样式、2048游戏、黄金矿工、飞行棋游戏。

### 11. **diary.css** - 日记模块 (15KB)
日记列表、日记编辑器、日记卡片、主题适配。

### 12. **xhs.css** - 小红书模块 (17KB)
小红书页面样式、卡片和图片、主题适配、评论功能。

### 13. **bank.css** - 银行卡模块 (9.3KB)
银行卡页面样式、卡片展示、资产显示。

## 🎨 使用方式

### 在 main.js 中导入
```javascript
import { RP_PHONE_CSS } from './src/styles/index.js';
```

### 模块化优势
1. **清晰的模块划分** - 每个功能模块对应一个CSS文件
2. **易于定位** - 修改某个功能时只需打开对应的CSS文件
3. **减少冲突** - 避免单个文件过大导致的样式冲突
4. **团队协作** - 多人开发时减少合并冲突
5. **文件数量合理** - 12个模块，易于管理

### 修改建议
- 修改某个功能 → 编辑对应的模块CSS文件
- 添加新组件 → 在对应模块CSS中添加
- 全局样式 → 修改 `base.css`
- 通用组件 → 修改 `common.css`

## 🔄 重新合并模块

如果需要重新合并模块，运行：
```bash
cd src/styles/modules
node build-modules.js
```

## 📝 注意事项

1. **加载顺序** - index.js 中已按正确顺序加载各模块
2. **主题依赖** - themes.css 包含CSS变量，其他模块依赖这些变量
3. **深色模式** - 深色模式样式已包含在各模块中
4. **兼容性** - 使用原始css.js作为备份和兼容性保证

---

*文档版本: 2.0.0*
*最后更新: 2026-04-03*
