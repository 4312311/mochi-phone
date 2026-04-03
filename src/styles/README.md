# CSS 模块化拆分文档

## 📊 拆分统计

- **原始文件**: `css.js` (4502行, 264KB)
- **拆分模块数**: 79个
- **模块总大小**: 424KB

## 📁 文件结构

```
src/styles/
├── base.css              # 基础样式 (FAB、响应式)
├── css.js               # 原始CSS文件(保留备份)
├── index.js             # 主入口文件(整合所有模块)
└── modules/             # CSS模块目录
    ├── themes.js            # 主题变量(Candy)
    ├── themes-star.js       # Star Night主题变量
    ├── frame.js             # 手机框架
    ├── screen.js            # 屏幕容器
    ├── statusbar.js         # 状态栏
    ├── lockscreen.js        # 锁屏界面
    ├── swipe.js             # 滑动删除
    ├── lockwidget.js        # 锁屏小部件
    ├── homescreen.js        # 主屏幕
    ├── homepages.js         # 主屏幕页面
    ├── about.js             # 关于页
    ├── messages.js          # 消息列表
    ├── thread.js            # 线程视图
    ├── navbar.js            # 导航栏
    ├── modals.js            # 模态框
    ├── notification.js      # 通知横幅
    ├── moments.js           # 朋友圈
    ├── settings.js          # 设置页面
    ├── diary.js             # 日记
    ├── xhs.js              # 小红书
    ├── games-folder.js      # 游戏文件夹
    ├── compose-modal.js     # 组合模态框
    ├── ...以及其他主题和组件模块
```

## 📦 模块分类

### 1. 基础框架 (9个)
- `base.css` - 基础样式和响应式
- `frame.js` - 手机外框
- `screen.js` - 屏幕容器
- `statusbar.js` - 状态栏
- `lockscreen.js` - 锁屏
- `swipe.js` - 滑动删除
- `lockwidget.js` - 锁屏小部件
- `homescreen.js` - 主屏幕
- `homepages.js` - 主屏幕页面
- `about.js` - 关于页

### 2. 消息模块 (5个)
- `messages.js` - 消息列表
- `thread.js` - 线程视图
- `navbar.js` - 导航栏
- `modals.js` - 添加联系人模态框
- `notification.js` - 通知横幅

### 3. 主题样式 (7个)
- `themes.js` - Candy主题变量
- `themes-star.js` - Star Night主题变量
- `themes-view.js` - 主题选择页
- `themes-misty.js` - Misty主题变量
- `themes-particles.js` - 星星粒子效果
- `iconbase.js` - 图标基础样式
- `shared-icons.js` - 共享图标样式

### 4. 功能模块 (11个)
- `moments.js` - 朋友圈
- `settings.js` - 设置页面
- `diary.js` - 日记
- `xhs.js` - 小红书
- `call-overlay.js` - 来电覆盖层
- `call-record.js` - 通话记录
- `hongbao.js` - 红包
- `voice.js` - 语音消息
- `groupchat.js` - 群聊
- `attach.js` - 附件面板
- `choice.js` - 添加选项

### 5. 游戏模块 (12个)
- `game-2048-candy.js` - 2048游戏(Candy主题)
- `game-2048-star.js` - 2048游戏(Star主题)
- `game-2048-misty.js` - 2048游戏(Misty主题)
- `game-2048-extra.js` - 2048游戏额外样式
- `games-folder.js` - 游戏文件夹
- `games-candy.js` - Candy主题游戏
- `games-star.js` - Star主题游戏
- `games-misty.js` - Misty主题游戏

### 6. 其他组件 (6个)
- `compose-modal.js` - 组合模态框
- `bubble-inset.js` - 聊天气泡
- `divider.js` - 分隔线
- `wallpaper-extra.js` - 壁纸额外样式
- `popup.js` - 弹窗
- `taskbar.js` - 任务栏

## 📋 大模块列表 (Top 10)

| 文件名 | 大小 | 描述 |
|--------|------|------|
| xhs.js | 20K | 小红书样式 |
| settings.js | 16K | 设置页面样式 |
| moments-extra.js | 12K | 朋友圈额外样式 |
| games-misty.js | 12K | Misty主题游戏 |
| design-tokens.js | 12K | 设计令牌 |
| bank-card.js | 12K | 银行卡片样式 |
| wallpaper-extra.js | 8K | 壁纸额外样式 |
| themes-view.js | 8K | 主题视图 |
| taskbar.js | 8K | 任务栏 |
| studio-saved.js | 8K | 已保存方案 |

## 🎨 使用方式

### 在 `main.js` 中导入

```javascript
import { RP_PHONE_CSS } from './src/styles/index.js';
```

### 模块单独导入 (未来支持)

```javascript
import { RP_PHONE_CSS } from './src/styles/index.js';

// 或单独导入某个模块
import BASE_CSS from './src/styles/base.css?raw';
```

## 🔧 维护指南

### 修改某个模块的CSS
1. 找到对应的 `modules/*.js` 文件
2. 直接编辑该文件
3. 重新构建或刷新页面

### 添加新模块
1. 在 `modules/` 目录下创建新文件
2. 在 `index.js` 中添加导入语句
3. 在 `RP_PHONE_CSS` 导出中添加模块引用

### 重新整合
如果需要重新从原始 `css.js` 提取模块:
1. 使用 `extract_all.py` 脚本
2. 运行 `python3 extract_all.py`

## ⚠️ 注意事项

1. **加载顺序**: `themes.js` 必须最先加载，因为其他模块依赖其中的CSS变量
2. **主题覆盖**: 某些模块包含主题特定的覆盖 (如 `.rp-theme-candy .xxx`)
3. **深色模式**: `darkmode-*.js` 文件是深色模式的覆盖层

## 📝 拆分优势

1. **模块化管理** - 每个功能模块对应一个CSS文件
2. **易于定位** - 修改某个功能时只需打开对应的CSS文件
3. **减少冲突** - 避免单个文件过大导致的样式冲突
4. **团队协作** - 多人开发时减少合并冲突
5. **按需加载** - 未来可以按需加载特定模块的CSS
