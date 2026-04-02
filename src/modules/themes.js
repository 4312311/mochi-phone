/**
 * 主题模块
 * 处理主题切换和样式管理
 */

import { STATE } from '../core/state.js';

// TODO: 从 index.js 中拆分主题相关逻辑
// - 主题切换功能
// - 主题配置管理
// 等

// 临时占位实现
export function applyTheme(themeName) {
  // 应用主题的逻辑
  console.log(`[Raymond Phone] 应用主题: ${themeName}`);
  
  // 移除现有的主题类
  $('#rp-phone').removeClass('rp-theme-candy rp-theme-star rp-theme-misty');
  
  // 添加新的主题类
  if (themeName) {
    $('#rp-phone').addClass(`rp-theme-${themeName.toLowerCase()}`);
  }
  
  // 保存到状态
  STATE.currentTheme = themeName;
}

// 将函数暴露到全局，供HTML中的onclick使用
window.applyTheme = applyTheme;