# Raymond Phone - SillyTavern 前端手机模拟插件

## 项目简介

这是一个为 SillyTavern 设计的前端手机模拟插件，支持短信、朋友圈、主题、游戏、日记、小红书、银行卡、API设置等功能。

### 功能特点

- **AI驱动**: 通过AI回复中的特定格式触发短信和朋友圈功能
- **API集成**: 支持ComfyUI、LightGame等API生成内容
- **多游戏**: 集成2048、黄金矿工、飞行棋等多款小游戏
- **主题系统**: 支持多种主题切换(Candy/Star/Misty等)
- **状态管理**: 不同聊天会话状态隔离,数据持久化

## 当前项目结构

```
mochi-phone/
├── index.js          # 单文件版本(当前状态,约15580行)
├── manifest.json     # SillyTavern扩展配置
└── README.md         # 项目说明
```

### 拆分计划

项目当前为单文件结构,计划拆分为以下模块化结构:

```
mochi-phone/
├── src/
│   ├── core/
│   │   ├── init.js          # 核心初始化逻辑、事件绑定
│   │   ├── state.js         # 状态管理(STATE对象、saveState/loadState)
│   │   └── utils.js         # 工具函数
│   ├── styles/
│   │   └── css.js           # RP_PHONE_CSS样式常量
│   ├── templates/
│   │   └── html.js          # HTML模板常量
│   ├── modules/
│   │   ├── chat.js          # 聊天和联系人管理
│   │   ├── sms.js           # 短信消息处理、标签解析
│   │   ├── moments.js       # 朋友圈功能
│   │   ├── xiaohongshu.js   # 小红书功能
│   │   ├── themes.js        # 主题管理
│   │   ├── api-settings.js  # API设置面板
│   │   ├── diary.js         # 日记功能
│   │   ├── bank.js          # 银行卡功能
│   │   ├── games-2048.js    # 2048游戏
│   │   ├── games-gold.js    # 黄金矿工游戏
│   │   ├── games-ludo.js    # 飞行棋游戏
│   │   ├── avatar.js        # 头像管理
│   │   └── phone-tag.js     # 聊天中手机标签渲染
│   └── index.js             # 主入口文件
└── README.md
```

**注意**: 使用 ES6 import 方式,`src/index.js` 作为主入口,通过 `import` 导入其他模块文件。

## 功能模块详解

### 1. 短信功能
**触发方式**: AI回复中包含 `<SMS>` 标签

- 多联系人独立聊天
- 群聊支持(GMSG标签)
- 图片消息、语音消息、红包、位置、通话记录
- 消息队列管理(待生成图片队列)
- 聊天历史记录查看

**支持的消息类型**:
- 普通文本: `<SMS FROM="角色名" TIME="时间">消息内容</SMS>`
- 图片: 通过ComfyUI/API生成
- 语音: `<VOICE FROM="角色名" DURATION="秒数">转写文本</VOICE>`
- 红包: `<HONGBAO FROM="角色名" AMOUNT="金额">备注</HONGBAO>`
- 位置: `<LOCATION FROM="角色名">地点描述</LOCATION>`
- 通话: `<CALL FROM="角色名" TIME="时间">类型(来电/去电)</CALL>`
- 群聊: `<GMSG FROM="角色名" GROUP="群名" TIME="时间">消息内容</GMSG>`

### 2. 朋友圈
**触发方式**: AI回复中包含 `<MOMENTS>` 标签

- 发布动态(支持AI生成图片)
- 点赞和评论
- AI自动生成评论(通过API)
- 朋友圈互动模拟

**格式**:
```
<MOMENTS FROM="角色名" TIME="时间">动态内容</MOMENTS>
```

### 3. 主题系统
- 预设主题: Candy(粉色)、Star(深色星空)、Misty(雾蓝)
- 深色/浅色模式切换
- 自定义壁纸上传
- CSS变量驱动的主题系统

### 4. 游戏模块
**2048游戏**:
- 键盘方向键控制
- 分数记录
- 最高分保存

**黄金矿工**:
- 钩爪摇摆控制
- 多种金矿物品
- 分数和目标关卡

**飞行棋**:
- 双人对战(用户 vs AI角色)
- 掷骰子移动
- 格子事件触发(支持自定义API生成)
- AI自动回复机制

### 5. 日记
- 写日记
- 查看历史日记
- 删除日记
- AI回复支持(通过API)

### 6. 小红书
- 浏览帖子列表
- 点赞和评论
- 详情页查看
- 标签筛选
- AI生成帖子内容(通过API)

### 7. 银行卡
- 查看余额
- 交易记录
- 模拟消费和收入
- 余额自动同步到状态

### 8. API设置
**ComfyUI集成**(图片生成):
- 端点配置: `http://localhost:8188`
- Workflow: ComfyUI的JSON工作流
- Prompt占位符配置

**LightGame/AI集成**(AI对话):
- 端点配置(支持OpenAI兼容格式)
- 模型选择(DeepSeek/通义/GLM等)
- API Key配置
- 连接测试

**额外API**:
- 飞行棋事件API
- 朋友圈评论API
- 游戏聊天API

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

### 其他消息类型
```
<VOICE FROM="角色名" DURATION="秒数">转写文本</VOICE>
<HONGBAO FROM="角色名" AMOUNT="金额">备注</HONGBAO>
<LOCATION FROM="角色名">地点描述</LOCATION>
<CALL FROM="角色名" TIME="时间">类型</CALL>
```

## 状态管理

### STATE对象结构
```javascript
{
  chatId: '当前聊天ID',
  currentView: 'home',          // 当前视图
  currentThread: null,           // 当前对话线程ID
  threads: [],                   // 所有对话线程
  contacts: [],                  // 联系人列表
  avatars: {},                   // 头像映射
  moments: [],                   // 朋友圈动态
  diary: [],                     // 日记列表
  xhsPosts: [],                  // 小红书帖子
  bankData: null,                // 银行数据
  game2048: { score, board },    // 2048游戏数据
  gameGold: { score, stage },    // 黄金矿工数据
  gameLudo: { userPos, charPos }, // 飞行棋数据
}
```

### 状态持久化
- 保存到 `localStorage` (key: `rp-phone-v1-{chatId}`)
- 不同聊天会话状态隔离
- 支持extension_settings同步

## API配置说明

### ComfyUI (图片生成)
用于生成朋友圈图片、头像等。

**配置项**:
- `url`: ComfyUI服务地址,默认 `http://localhost:8188`
- `workflow`: ComfyUI的JSON工作流配置
- `promptField`: 用于替换prompt的字段名

### LightGame/AI (AI对话)
用于生成游戏事件、朋友圈评论等AI内容。

**配置项**:
- `mode`: `custom` (自定义API) 或 `st` (SillyTavern内置)
- `url`: API服务地址(OpenAI兼容格式)
- `model`: 模型名称,如 `deepseek-chat`
- `key`: API认证密钥

**使用场景**:
- 飞行棋格子事件生成
- 朋友圈评论生成
- 游戏内聊天回复
- 日记回复

## 使用方法

### 安装
1. 将 `index.js` 复制到 SillyTavern 的扩展目录
2. 在 SillyTavern 中启用该扩展
3. 刷新页面

### 基本使用
1. 点击右下角的手机图标打开手机界面
2. 点击手机屏幕解锁
3. 使用各个App:
   - 短信: 查看和管理对话
   - 朋友圈: 浏览动态,点赞评论
   - 游戏: 玩小游戏
   - 日记/小红书/银行卡: 查看和管理

### 触发AI功能
在SillyTavern聊天中,让AI回复包含特定标签:

**让AI发短信**:
> 用户: 给我发一条短信
> AI: <SMS FROM="艾米" TIME="20:30">今天晚上有空吗?想约你吃饭~</SMS>

**让AI发朋友圈**:
> 用户: 你发一条朋友圈
> AI: <MOMENTS FROM="艾米" TIME="18:00">今天天气真好!去公园散步了一会,心情超棒~</MOMENTS>

## 注意事项

1. **模块间通信**: 所有模块通过共享的 `STATE` 对象进行通信
2. **状态隔离**: 不同聊天会话的状态是隔离的
3. **图片生成**: 朋友圈图片生成需要配置ComfyUI或支持智绘姬等生图插件
4. **API依赖**: 飞行棋等高级功能需要配置自定义API
5. **移动端适配**: 支持触摸操作,在移动设备上有不同的布局

## 开发说明

### 拆分模块原则
1. **按功能拆分**: 每个独立功能为一个模块
2. **按层次拆分**: 核心逻辑/UI/工具函数分离
3. **减少依赖**: 模块间尽量减少直接依赖
4. **保持接口**: 对外暴露的函数保持稳定

### 关键函数说明

**核心函数**:
- `init()`: 初始化整个插件
- `saveState()`: 保存状态到localStorage
- `loadState(chatId)`: 加载指定聊天的状态
- `onChatChanged()`: 切换聊天时的处理

**UI渲染函数**:
- `renderThreadList()`: 渲染对话列表
- `renderBubbles(threadId)`: 渲染消息气泡
- `renderMoments()`: 渲染朋友圈
- `renderDiary()`: 渲染日记

**消息处理函数**:
- `parsePhone(block)`: 解析手机标签
- `incomingMsg()`: 接收消息
- `sendSMS()`: 发送短信

### 添加新功能步骤

1. 在 `src/modules/` 创建新模块文件
2. 使用 `export` 导出函数和状态
3. 在主入口 `src/index.js` 中使用 `import` 导入
4. 在HTML模板中添加UI
5. 在CSS中添加样式
6. 绑定事件处理器

**示例**:
```javascript
// src/modules/myfeature.js
export function myFeature() {
  console.log('My feature loaded');
}

// src/index.js
import { myFeature } from './modules/myfeature.js';

myFeature();
```

### 修改样式

修改 `src/styles/css.js` 中的 `RP_PHONE_CSS` 常量。

样式使用CSS变量,支持主题切换:
```css
#rp-phone {
  --rp-frame-bg: ...;
  --rp-screen-bg: ...;
  --rp-sent-bg: ...;
  /* ... */
}
```

## 构建方法

本项目使用 **ES6 import** 模块化方式，无需构建脚本。

### 开发模式

直接修改 `src/` 目录下的模块文件即可。

### 模块加载

`src/index.js` 作为主入口，通过 ES6 `import` 语句导入其他模块：

```javascript
// src/index.js 示例
import { RP_PHONE_CSS } from './styles/css.js';
import { HTML } from './templates/html.js';
import { STATE, saveState, loadState } from './core/state.js';
import { init } from './core/init.js';
import { sendSMS, renderBubbles } from './modules/chat.js';
import { renderMoments } from './modules/moments.js';
// ... 其他导入
```

### 使用方式

1. 在 SillyTavern 的 `manifest.json` 中将入口指向 `src/index.js`
2. 或直接将整个 `src/` 目录复制到扩展目录

### 注意事项

- 确保所有模块都使用 ES6 `export` 导出
- 模块间通过 `import` 导入依赖
- SillyTavern 需要支持 ES6 模块（现代浏览器已支持）

## 技术栈

- **框架**: 原生JavaScript (ES6+)
- **模块系统**: ES6 Modules (import/export)
- **样式**: CSS3 + CSS变量
- **存储**: localStorage + SillyTavern extension_settings
- **构建**: 无需构建，直接使用 ES6 模块

## 已知问题

1. 图片生成依赖外部API,配置较复杂
2. 部分功能需要特定API支持才能完全使用
3. 移动端某些手势可能有兼容性问题

## 未来规划

- [ ] 完善模块化拆分
- [ ] 添加更多游戏
- [ ] 支持更多主题
- [ ] 优化移动端体验
- [ ] 添加更多AI集成选项
- [ ] 支持导出/导入数据

## 许可证

MIT License