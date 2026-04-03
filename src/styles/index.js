// ================================================================
//  CSS STYLES - 主入口文件
//  整合所有CSS模块
//
//  说明：由于浏览器原生不支持直接导入CSS内容作为字符串，
//  当前使用 fallback 方式，导出原始 css.js 的内容。
//  如果使用构建工具（如 Vite），可以使用 ?raw 导入方式。
// ================================================================

// Fallback: 导入原始CSS（css.js 包含完整的CSS）
import { RP_PHONE_CSS as ORIGINAL_CSS } from './css.js';

// 直接导出原始CSS
export { RP_PHONE_CSS } from './css.js';

// ================================================================
//  模块化CSS文件说明
//  ═════════════════════════════════════════════════════════════
//
//  src/styles/modules/ 目录下包含12个模块化CSS文件：
//  - base.css      # 基础样式
//  - common.css    # 公共组件 (57KB)
//  - frame.css     # 手机框架 (2.2KB)
//  - homescreen.css # 主屏幕 (5.4KB)
//  - lockscreen.css # 锁屏界面 (5.4KB)
//  - messages.css   # 消息模块 (8.4KB)
//  - moments.css   # 朋友圈模块 (23KB)
//  - themes.css    # 主题样式 (47KB)
//  - settings.css  # 设置模块 (15KB)
//  - games.css     # 游戏模块 (19KB)
//  - diary.css     # 日记模块 (15KB)
//  - xhs.css       # 小红书模块 (17KB)
//  - bank.css      # 银行卡模块 (9.3KB)
//
//  模块化CSS可用于开发和维护参考。
//  如需构建时整合模块化CSS，建议使用 Vite 或 Rollup。
// ================================================================
