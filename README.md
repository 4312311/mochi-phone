# Raymond Phone - SillyTavern 前端手机模拟插件

## 项目简介

这是一个为 SillyTavern 设计的前端手机模拟插件，支持短信、朋友圈、主题、游戏、日记、小红书、银行卡、API设置等功能。

## 项目结构

```
mochi-phone/
├── src/
│   ├── core/
│   │   ├── init.js          # 核心初始化逻辑
│   │   └── state.js         # 状态管理
│   ├── modules/
│   │   ├── chat.js          # 聊天和联系人管理
│   │   ├── sms.js           # 短信和消息处理
│   │   ├── moments.js       # 朋友圈功能
│   │   ├── themes.js        # 主题管理
│   │   ├── api-settings.js  # API设置
│   │   ├── games.js         # 游戏模块(2048)
│   │   ├── diary.js         # 日记功能
│   │   ├── xiaohongshu.js   # 小红书功能
│   │   └── bank.js          # 银行卡功能
│   ├── styles/
│   │   └── css.js           # CSS样式
│   ├── templates/
│   │   └── html.js          # HTML模板
│   └── index.js             # 主入口文件
├── dist/
│   └── index.js             # 构建后的单文件
├── build.sh                 # 构建脚本
└── README.md                # 项目说明
```

## 功能模块

### 1. 短信功能
- 支持多联系人聊天
- 自动识别AI回复中的短信格式
- 支持群聊功能
- 消息队列管理

### 2. 朋友圈
- 发布动态(支持图片)
- 点赞和评论
- AI自动生成评论
- 朋友圈互动模拟

### 3. 主题系统
- 多种预设主题
- 自定义主题支持
- 深色模式
- 壁纸设置

### 4. 游戏
- 2048游戏
- 键盘控制
- 分数记录

### 5. 日记
- 写日记
- 查看历史日记
- 删除日记

### 6. 小红书
- 浏览帖子
- 点赞和评论
- 标签筛选

### 7. 银行卡
- 查看余额
- 交易记录
- 模拟消费和收入

### 8. API设置
- ComfyUI集成(图片生成)
- LightGame集成(AI对话)
- AI API集成
- 连接测试

## 构建方法

### 开发模式

直接修改 `src/` 目录下的模块文件，然后运行构建脚本：

```bash
./build.sh
```

### 生产模式

构建后的单文件位于 `dist/index.js`，可以直接在 SillyTavern 中使用。

## 使用方法

1. 将 `dist/index.js` 复制到 SillyTavern 的扩展目录
2. 在 SillyTavern 中启用该扩展
3. 点击右下角的手机图标打开手机界面

## AI回复格式

### 短信格式

```
<SMS FROM="角色名" TIME="时间">消息内容</SMS>
```

### 朋友圈格式

```
<MOMENTS FROM="角色名" TIME="时间">动态内容</MOMENTS>
```

### 群聊格式

```
<GMSG FROM="角色名" GROUP="群名" TIME="时间">消息内容</GMSG>
```

## API配置

### ComfyUI

用于生成朋友圈图片。

- 端点: `http://localhost:8188`
- Workflow: ComfyUI的JSON工作流
- Prompt占位符: 用于替换的prompt字段名

### LightGame/AI

用于生成AI回复和评论。

- 端点: API服务地址
- 模型: 使用的模型名称
- API Key: 认证密钥

## 注意事项

1. 所有模块之间通过共享的 `STATE` 对象进行通信
2. 状态会自动保存到 localStorage
3. 不同聊天会话的状态是隔离的
4. 图片生成需要配置ComfyUI API

## 开发说明

### 添加新模块

1. 在 `src/modules/` 目录下创建新模块文件
2. 导出需要的函数和变量
3. 在 `src/index.js` 中导入和使用
4. 运行构建脚本

### 修改样式

修改 `src/styles/css.js` 中的 `RP_PHONE_CSS` 常量。

### 修改HTML模板

修改 `src/templates/html.js` 中的 `HTML_TEMPLATES` 对象。

## 许可证

MIT License