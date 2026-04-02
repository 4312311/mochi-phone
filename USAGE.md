# 🍡 mochi-phone - SillyTavern 手机模拟插件

## 📁 目录结构说明

```
mochi-phone/
├── index.js              # SillyTavern 加载的主文件（由 build.sh 自动生成）
├── manifest.json         # SillyTavern 插件配置文件
├── build.sh              # 构建脚本
├── src/                  # 源代码目录（开发时修改这里）
│   ├── core/            # 核心模块
│   ├── modules/         # 功能模块
│   ├── styles/          # 样式模块
│   └── templates/       # HTML模板
└── dist/               # 备份输出目录（可选）
```

## 🚀 如何使用

### 作为 SillyTavern 插件使用

**直接使用（推荐）**：
1. 将整个 `mochi-phone` 文件夹复制到 SillyTavern 的 `extensions` 目录
2. 重启 SillyTavern
3. 插件会自动加载 `index.js`（已包含所有功能）

**文件位置**：
- Windows: `SillyTavern/extensions/mochi-phone/`
- Linux/Mac: `SillyTavern/extensions/mochi-phone/`

## 🔧 开发模式

### 修改代码

1. **修改源代码**：编辑 `src/` 目录下的模块文件
2. **重新构建**：运行 `./build.sh`
3. **测试**：重启 SillyTavern 或刷新页面

### 构建命令

```bash
# 在 mochi-phone 目录下运行
./build.sh
```

构建脚本会：
- 合并所有模块到根目录的 `index.js`
- 修复语法错误
- 生成可直接在 SillyTavern 中使用的文件

## 📊 文件说明

| 文件 | 说明 | 是否必需 |
|------|------|----------|
| `index.js` | 主文件（由 build.sh 生成） | ✅ 必需 |
| `manifest.json` | SillyTavern 插件配置 | ✅ 必需 |
| `build.sh` | 构建脚本 | ✅ 开发必需 |
| `src/` | 源代码目录 | ✅ 开发必需 |
| `dist/` | 备份输出目录 | ❌ 可选 |

## ⚠️ 重要说明

1. **不要直接修改根目录的 `index.js`**：每次运行 `build.sh` 都会覆盖它
2. **修改代码请在 `src/` 目录中进行**：这样你的修改会被保留
3. **构建前备份**：如果需要保留原始版本，请先备份
4. **SillyTavern 只需要 `index.js` 和 `manifest.json`**：其他文件用于开发

## 🎯 工作流程

```
开发流程：
修改 src/ 中的模块 → 运行 ./build.sh → 测试功能 → 重复

部署流程：
运行 ./build.sh → 复制整个文件夹到 SillyTavern/extensions/ → 完成
```

## 📝 模块说明

### 核心模块 (core/)
- `init.js` - 初始化逻辑
- `state.js` - 状态管理

### 功能模块 (modules/)
- `chat.js` - 聊天功能
- `sms.js` - 短信功能
- `moments.js` - 朋友圈
- `themes.js` - 主题管理
- `games-*.js` - 游戏相关
- `diary.js` - 日记功能
- `xiaohongshu.js` - 小红书
- `bank.js` - 银行卡
- 等等...

### 样式模块 (styles/)
- `css.js` - CSS样式定义

### 模板模块 (templates/)
- `html.js` - HTML模板

## 🐛 故障排除

### 插件无法加载
1. 检查 `index.js` 是否存在
2. 运行 `./build.sh` 重新构建
3. 检查 SillyTavern 控制台是否有错误

### 修改后没有效果
1. 确保运行了 `./build.sh`
2. 清除浏览器缓存
3. 重启 SillyTavern

## 📄 许可证

本插件由 棠栀 Talia 免费发布于 DC社区·旅程 / 类脑 / 多林国