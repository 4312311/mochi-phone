/* ═══════════════════════════════════════════════════════════
   Mochi Phone - Modular CSS Entry Point
   ═══════════════════════════════════════════════════════════ */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const modulesDir = join(__dirname, 'modules');

// 读取 CSS 模块文件
function readCSSModule(filename) {
  return readFileSync(join(modulesDir, filename), 'utf-8');
}

// 合并所有 CSS 模块
export const RP_PHONE_CSS = `
${readCSSModule('base.css')}
${readCSSModule('themes.css')}
${readCSSModule('frame.css')}
${readCSSModule('lockscreen.css')}
${readCSSModule('homescreen.css')}
${readCSSModule('messages.css')}
${readCSSModule('common.css')}
${readCSSModule('themes-view.css')}
${readCSSModule('messages-dark.css')}
${readCSSModule('moments.css')}
${readCSSModule('settings.css')}
${readCSSModule('diary.css')}
${readCSSModule('games.css')}
${readCSSModule('xhs.css')}
${readCSSModule('bank.css')}
`;
