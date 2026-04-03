# Mochi Phone CSS 模块化说明

## 概述

CSS 已从单个 `css.js` 文件（4502行，264KB）拆分为 14 个独立的模块文件。

## 文件结构

```
src/styles/
├── index.js                 # CSS 入口文件，导出合并后的 RP_PHONE_CSS
├── css.js.deprecated        # 原始 CSS 文件（已弃用）
└── modules/                # CSS 模块目录
    ├── base.css/.js         # 基础样式（FAB、响应式）
    ├── themes.css/.js       # 主题样式变量定义
    ├── frame.css/.js        # 手机框架（外框、屏幕、状态栏）
    ├── lockscreen.css/.js   # 锁屏界面
    ├── homescreen.css/.js   # 主屏幕（时钟、图标、widget、页面）
    ├── messages.css/.js     # 消息模块（列表、对话、气泡、输入框）
    ├── common.css/.js       # 公共组件（导航栏、模态框、通知、图标等）
    ├── themes-view.css/.js  # 主题视图样式
    ├── messages-dark.css/.js # 消息模块暗色模式
    ├── moments.css/.js      # 朋友圈模块
    ├── settings.css/.js     # 设置模块
    ├── diary.css/.js        # 日记模块
    ├── games.css/.js        # 游戏模块（2048、黄金矿工、飞行棋）
    ├── xhs.css/.js         # 小红书模块
    └── bank.css/.js        # 银行卡模块
```

## 使用方式

### 在 main.js 中导入

```javascript
// 导入模块化 CSS
import { RP_PHONE_CSS } from './src/styles/index.js';
```

### 模块说明

#### 1. base.css (68行)
- FAB 悬浮按钮样式
- 手机容器定位
- 移动端响应式适配

#### 2. themes.css (180行)
- CSS 主题 token 定义
- Candy 主题变量
- Star 主题变量
- Misty 主题变量

#### 3. frame.css (41行)
- 外框样式 (#rp-frame)
- 屏幕区域 (#rp-screen)
- 灵动岛 (#rp-island)
- 状态栏 (#rp-sbar)

#### 4. lockscreen.css (85行)
- 锁屏背景与主体
- 滑动删除通知容器
- 通知卡片样式
- 滑动提示

#### 5. homescreen.css (144行)
- 主屏幕布局
- 时钟样式
- 应用图标网格
- Widget 小组件
- 底部指示器
- 双屏横滑页面

#### 6. messages.css (506行)
- 消息列表视图
- 会话详情视图
- 消息气泡样式
- 待发队列预览
- 添加联系人表单

#### 7. common.css (899行)
- 待发队列可读性
- Settings 视图透明样式
- API 设置区域
- Misty 主题 API 可读性
- Star 主题设置样式
- 各种主题适配的通用组件样式

#### 8. themes-view.css (109行)
- Misty 主题定义
- 主题选择器样式
- 主题变量覆盖

#### 9. messages-dark.css (32行)
- 暗色消息视图
- 暗色线程样式

#### 10. moments.css (68行)
- 朋友圈视图容器
- 朋友圈卡片样式
- 评论与发布框

#### 11. settings.css (25行)
- 设置视图基础样式
- 设置输入框与按钮

#### 12. diary.css (60行)
- 日记视图容器
- 日记条目样式
- 三主题适配

#### 13. games.css (1391行)
- 2048 游戏
- 游戏聊天框
- 方块事件弹窗
- 任务栏
- 黄金矿工、飞行棋相关样式

#### 14. xhs.css (235行)
- XHS 主题变量
- XHS 视图容器
- XHS 卡片样式
- 三主题适配

#### 15. bank.css (490行)
- 银行视图容器
- 资产概览卡片
- 分区标题
- 资产列表
- Loading 与 Empty 状态

## 维护指南

### 修改某个功能模块

1. 直接编辑对应的 CSS 模块文件（如 `messages.css`）
2. 如果同时有 `.js` 文件，建议编辑 `.css` 文件然后重新转换

### 添加新 CSS 模块

1. 在 `modules/` 目录创建新的 `.css` 文件
2. 运行转换脚本生成对应的 `.js` 文件
3. 在 `index.js` 中导入并导出

### 转换 CSS 为 JS

如果需要将 CSS 文件转换为 JS 模块：

```bash
# 手动转换单个文件
node -e "
const fs = require('fs');
const css = fs.readFileSync('modules/xxx.css', 'utf8');
const js = \`export const xxxCSS = \\\`\${css.replace(/\`/g, '\\\\\\`')}\\\`;\`;
fs.writeFileSync('modules/xxx.js', js);
"
```

## 注意事项

1. **同时保留 `.css` 和 `.js` 文件**：
   - `.css` 文件用于开发和维护参考
   - `.js` 文件用于实际运行时导入

2. **模块依赖关系**：
   ```
   base.css (基础)
       ↓
   frame.css (框架)
       ↓
   lockscreen.css (锁屏)
   homescreen.css (主屏)
   common.css (公共组件)
       ↓
       ├── themes.css (主题)
       ├── messages.css (消息)
       ├── moments.css (朋友圈)
       ├── settings.css (设置)
       ├── games.css (游戏)
       ├── diary.css (日记)
       ├── xhs.css (小红书)
       └── bank.css (银行卡)
   ```

3. **主题适配**：
   - 每个模块都包含大量主题适配代码（Candy/Star/Misty）
   - 这些应该跟随对应模块

4. **原文件已弃用**：
   - `css.js` 已重命名为 `css.js.deprecated`
   - 仅作为备份保留

## 迁移记录

- **原始文件**: `css.js` (4502行, 264KB)
- **拆分模块**: 14 个
- **模块总大小**: 约 236KB
- **迁移日期**: 2026-04-03
