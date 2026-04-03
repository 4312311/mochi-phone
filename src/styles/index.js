/* ═══════════════════════════════════════════════════════════
   Mochi Phone - Modular CSS Entry Point
   ═══════════════════════════════════════════════════════════ */

import { css as baseCSS } from './modules/base.js';
import { css as themesCSS } from './modules/themes.js';
import { css as frameCSS } from './modules/frame.js';
import { css as lockscreenCSS } from './modules/lockscreen.js';
import { css as homescreenCSS } from './modules/homescreen.js';
import { css as messagesCSS } from './modules/messages.js';
import { css as commonCSS } from './modules/common.js';
import { css as themesViewCSS } from './modules/themes-view.js';
import { css as messagesDarkCSS } from './modules/messages-dark.js';
import { css as momentsCSS } from './modules/moments.js';
import { css as settingsCSS } from './modules/settings.js';
import { css as diaryCSS } from './modules/diary.js';
import { css as gamesCSS } from './modules/games.js';
import { css as xhsCSS } from './modules/xhs.js';
import { css as bankCSS } from './modules/bank.js';

// 合并所有 CSS 模块
export const RP_PHONE_CSS = `
${baseCSS}
${themesCSS}
${frameCSS}
${lockscreenCSS}
${homescreenCSS}
${messagesCSS}
${commonCSS}
${themesViewCSS}
${messagesDarkCSS}
${momentsCSS}
${settingsCSS}
${diaryCSS}
${gamesCSS}
${xhsCSS}
${bankCSS}
`;
