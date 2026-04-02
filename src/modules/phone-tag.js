/**
 * 手机标签模块
 * 处理聊天中的手机标签渲染
 */

import { STATE } from '../core/state.js';

// TODO: 从 index.js 中拆分手机标签相关逻辑
// - 手机标签渲染
// - 标签解析和显示
// 等

// 临时占位实现
export function renderPhoneTags() {
  // 渲染手机标签的逻辑
  console.log('[Raymond Phone] 渲染手机标签...');
}

// 将函数暴露到全局，供HTML中的onclick使用
window.renderPhoneTags = renderPhoneTags;