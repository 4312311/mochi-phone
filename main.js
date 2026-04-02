// ================================================================
//  MOCHI PHONE - SillyTavern 扩展主入口
//  加载所有拆分后的功能模块
// ================================================================

// 定义全局变量
window.LG = { active: false };  // 飞行棋游戏状态
window.LG2048 = { active: false };  // 2048游戏状态

// 核心模块
import { initPhone } from './src/core/init.js';
import { injectStyles } from './src/styles/css.js';
import { RP_PHONE_HTML } from './src/templates/html.js';

// 功能模块
import './src/modules/sms.js';
import './src/modules/chat.js';
import './src/modules/moments.js';
import './src/modules/themes.js';
import './src/modules/avatar.js';
import './src/modules/phone-tag.js';
import './src/modules/helpers.js';

// API设置模块
import './src/modules/api-settings.js';

// 初始化应用
$(document.body).ready(() => {
    injectStyles();
    initPhone();
});