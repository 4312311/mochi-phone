# AI 消息解析调试指南

## 问题描述
AI 回复的 `<PHONE>` 标签没有被解析到模拟手机的对话框中。

## 已实现的修复

### 1. 使用 eventSource API
优先使用 SillyTavern 的 `eventSource` 监听消息事件，而不是 DOM MutationObserver。

```javascript
window.eventSource.on(eventTypes.MESSAGE_RECEIVED, () => {
  // 处理消息
});
```

### 2. 指纹去重机制
为每条消息生成指纹，防止同一消息被重复处理：

```javascript
const fp = `${ctx.chatId}|${raw.length}|${raw.slice(0, 24)}|${raw.slice(-24)}`;
if (fp === window._lastAiFingerprint) return;
window._lastAiFingerprint = fp;
```

### 3. 流式生成保护
检查消息是否完整（所有标签已闭合），避免处理流式生成中的中间态：

```javascript
const hasPhoneOpen = /<PHONE\b/i.test(raw);
const hasPhoneClose = /<\/PHONE>/i.test(raw);

if (hasPhoneOpen && !hasPhoneClose) {
  // 流式生成中，不处理
  return;
}
```

### 4. 兼容多种标签格式
支持有 `<PHONE>` 包裹和无包裹的两种格式：

```javascript
// 格式1: 有包裹
<PHONE><SMS FROM="角色" TIME="21:30">内容</SMS></PHONE>

// 格式2: 无包裹（兼容）
<SMS FROM="角色" TIME="21:30">内容</SMS>
```

## 调试日志

### 初始化日志
```
[Raymond Phone] Starting initialization...
[Raymond Phone] Initializing...
[Raymond Phone] Fingerprint reset for hot-reload
[Raymond Phone] All initializations complete
```

### 事件监听日志
```
[Raymond Phone] Setting up AI response listener...
[Raymond Phone] eventSource available, event_types: [...]
[Raymond Phone] Setting up listener for MESSAGE_RECEIVED (1)
[Raymond Phone] Setting up listener for GENERATION_ENDED (2)
[Raymond Phone] Setting up listener for MESSAGE_SWIPED (3)
[Raymond Phone] AI response listener setup complete
```

### 消息处理日志
```
[Raymond Phone] Event triggered: MESSAGE_RECEIVED
[Raymond Phone] Context: { chatId: "xxx", chatLength: 10 }
[Raymond Phone] Last AI message: { is_user: false, mesLength: 150, mesPreview: "..." }
[Raymond Phone] Message structure check: { hasPhoneOpen: true, hasPhoneClose: true, ... }
[Raymond Phone] Parsing result: { hasPhoneBlock: true, ... }
[Raymond Phone] Full PHONE block content: <SMS FROM="雫" TIME="21:30">没事</SMS>
[Raymond Phone] parsePhone returned: 1 items
[Raymond Phone] Successfully parsed 1 phone message(s)
```

## 常见问题排查

### 问题：消息没有被处理
**可能原因：**
1. eventSource 不可用
2. 事件类型不匹配
3. 消息指纹重复被跳过

**排查方法：**
- 查看浏览器控制台是否有 "[Raymond Phone]" 开头的日志
- 检查 event_types 的值
- 查看 `window._lastAiFingerprint` 的值

### 问题：PHONE 块存在但解析为 0
**可能原因：**
1. FROM 属性与用户名匹配（被过滤）
2. 线程找不到
3. 正则表达式不匹配

**排查方法：**
- 查看 `parsePhone` 函数中的 `[Phone:diag]` 日志
- 检查 FROM 属性的值
- 查看 STATE 中的 threads 状态

### 问题：消息重复处理
**可能原因：**
1. 多个事件都被触发
2. 指纹生成逻辑有误

**排查方法：**
- 查看事件触发的次数
- 对比指纹的值
- 检查是否清理了 `window._lastAiFingerprint`

## 手动测试

### 在浏览器控制台执行
```javascript
// 测试事件监听
console.log('eventSource:', window.eventSource);
console.log('event_types:', window.event_types);

// 模拟消息
window._lastAiFingerprint = null;  // 清空指纹
```

### 查看当前状态
```javascript
// 查看 STATE（需要从 messages.js 导出）
console.log('Last fingerprint:', window._lastAiFingerprint);
console.log('Pending reply:', window._pendingPhoneReply);
```

## 下一步

如果问题仍未解决：
1. 打开浏览器开发者工具
2. 查看 Console 标签页
3. 过滤 `[Raymond Phone]` 日志
4. 查看 Network 标签页，确认事件是否被触发
5. 提供完整的日志输出以便进一步诊断
