# 更新日志

## 2026-04-06

### 消息顺序排序修复
- ✅ 修复 SMS 和 VOICE 消息顺序错乱问题
- ✅ 添加队列模式，按源码位置排序后再添加到线程
- ✅ 使用 `sourceIndex` 记录每条消息在原始文本中的位置

### 删除事件监听修复
- ✅ 修复 `setupMessageDeleteListeners()` 无法获取 eventSource 的问题
- ✅ 改用 `await getEventSource()` 异步获取（与 setupAIResponseListener 一致）
- ✅ 支持批量删除消息（MESSAGE_DELETED 事件）

### 文档更新
- ✅ 更新 README.md 添加"消息顺序排序"核心逻辑说明
- ✅ 更新章节编号（5→消息顺序排序, 6→消息清理, 7→事件监听, 8→AI解析格式）

---

## 2026-04-03

### CSS 模块化重构
- ✅ 将 `css.js` (4502行, 264KB) 拆分为 14 个独立模块
- ✅ 每个模块使用 `.js` 文件，导出 CSS 字符串常量
- ✅ 删除重复的 `.css` 文件，节省约 236KB 空间
- ✅ 无需构建步骤，修改后直接生效
- ✅ 更新 `main.js` 导入路径为 `./src/styles/index.js`

### AI 消息解析修复
- ✅ 修复 `<PHONE>` 标签无法被解析的问题
- ✅ 使用 SillyTavern 的 `eventSource` API 监听消息事件
- ✅ 支持多种事件类型：`MESSAGE_RECEIVED`、`GENERATION_ENDED`、`MESSAGE_SWIPED`
- ✅ 添加指纹去重机制，防止同一消息被重复处理
- ✅ 添加流式生成中间态保护，避免不完整消息被处理
- ✅ 添加详细的调试日志输出
- ✅ 初始化时清空指纹，支持热重载

### 文档更新
- ✅ 更新 `README.md` 反映新的 CSS 模块化结构
- ✅ 更新 `src/styles/README.md` 说明直接编辑 `.js` 文件
- ✅ 移除构建脚本的说明（不再需要）
- ✅ 添加 `CHANGELOG.md` 记录更新历史
