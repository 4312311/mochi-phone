// ================================================================
//  CSS STYLES - 主入口文件
//  整合所有CSS模块
// ================================================================

// 导入基础样式
import BASE_CSS from './base.css?raw';

// 导入主题变量（必须最先加载）
import THEME_TOKENS from './modules/themes.js?raw';
import THEME_STAR from './modules/themes-star.js?raw';

// 导入手机框架样式
import FRAME from './modules/frame.js?raw';
import SCREEN from './modules/screen.js?raw';
import STATUSBAR from './modules/statusbar.js?raw';

// 导入锁屏样式
import LOCKSCREEN from './modules/lockscreen.js?raw';
import SWIPE from './modules/swipe.js?raw';
import LOCKWIDGET from './modules/lockwidget.js?raw';
import DARKMODE_LOCK from './modules/darkmode-lock.js?raw';

// 导入主屏幕样式
import HOMESCREEN from './modules/homescreen.js?raw';
import HOMEPAGES from './modules/homepages.js?raw';
import ABOUT from './modules/about.js?raw';
import DARKMODE_HOME from './modules/darkmode-home.js?raw';

// 导入信息模块样式
import MESSAGES from './modules/messages.js?raw';
import THREAD from './modules/thread.js?raw';
import DARKMODE_MESSAGES from './modules/darkmode-messages.js?raw';
import DARKMODE_THREAD from './modules/darkmode-thread.js?raw';

// 导入导航栏样式
import NAVBAR from './modules/navbar.js?raw';

// 导入模态框样式
import MODALS from './modules/modals.js?raw';
import NOTIFICATION from './modules/notification.js?raw';

// 导入图标样式
import ICONBASE from './modules/iconbase.js?raw';
import SHARED_ICONS from './modules/shared-icons.js?raw';

// 导入主题视图样式
import THEMES_VIEW from './modules/themes-view.js?raw';
import THEMES_MISTY from './modules/themes-misty.js?raw';
import THEMES_PARTICLES from './modules/themes-particles.js?raw';

// 导入主题特定样式
import MISTY_API from './modules/misty-api.js?raw';
import MISTY_LUDO from './modules/misty-ludo.js?raw';
import NUCLEAR from './modules/nuclear.js?raw';
import DEFAULT_THEME from './modules/default-theme.js?raw';
import STAR_CONTRAST from './modules/star-contrast.js?raw';
import THEME_CONTRAST from './modules/theme-contrast.js?raw';
import WALLPAPER from './modules/wallpaper.js?raw';

// 导入朋友圈样式
import MOMENTS from './modules/moments.js?raw';
import AVATAR from './modules/avatar.js?raw';
import MOMENT_IMAGE from './modules/moment-image.js?raw';
import MOMENT_GENERATE from './modules/moment-generate.js?raw';
import MOMENTS_EXTRA from './modules/moments-extra.js?raw';

// 导入设置样式
import SETTINGS from './modules/settings.js?raw';

// 导入日记样式
import DIARY from './modules/diary.js?raw';
import DIARY_CANDY from './modules/diary-candy.js?raw';

// 导入游戏样式
import GAME_2048_CANDY from './modules/game-2048-candy.js?raw';
import GAME_2048_STAR from './modules/game-2048-star.js?raw';
import GAME_2048_MISTY from './modules/game-2048-misty.js?raw';
import GAME_2048_EXTRA from './modules/game-2048-extra.js?raw';
import GAMES_FOLDER from './modules/games-folder.js?raw';
import GAMES_CANDY from './modules/games-candy.js?raw';
import GAMES_STAR from './modules/games-star.js?raw';
import GAMES_MISTY from './modules/games-misty.js?raw';

// 导入组合模态框样式
import COMPOSE_MODAL from './modules/compose-modal.js?raw';
import COMPOSE_LAYERS from './modules/compose-layers.js?raw';
import COMPOSE_STAR from './modules/compose-star.js?raw';
import COMPOSE_MISTY from './modules/compose-misty.js?raw';
import COMPOSE_DARK from './modules/compose-dark.js?raw';

// 导入小红书样式
import XHS from './modules/xhs.js?raw';
import TEXTAREA from './modules/textarea.js?raw';
import STUDIO_BUTTONS from './modules/studio-buttons.js?raw';
import STUDIO_CARDS from './modules/studio-cards.js?raw';
import STUDIO_SAVE from './modules/studio-save.js?raw';
import STUDIO_STAR from './modules/studio-star.js?raw';
import STUDIO_MISTY from './modules/studio-misty.js?raw';
import STUDIO_SAVED from './modules/studio-saved.js?raw';

// 导入通话和红包样式
import CALL_OVERLAY from './modules/call-overlay.js?raw';
import CALL_RECORD from './modules/call-record.js?raw';
import HONGBAO from './modules/hongbao.js?raw';
import VOICE from './modules/voice.js?raw';
import GROUPCHAT from './modules/groupchat.js?raw';
import ATTACH from './modules/attach.js?raw';
import CHOICE from './modules/choice.js?raw';

// 导入其他组件样式
import BUBBLE_INSET from './modules/bubble-inset.js?raw';
import DIVIDER from './modules/divider.js?raw';
import WALLPAPER_EXTRA from './modules/wallpaper-extra.js?raw';
import POPUP from './modules/popup.js?raw';
import TASKBAR from './modules/taskbar.js?raw';
import EDIT_PENCIL from './modules/edit-pencil.js?raw';
import DELETE from './modules/delete.js?raw';

// 导入设计令牌和组件样式
import DESIGN_TOKENS from './modules/design-tokens.js?raw';
import BANK_CARD from './modules/bank-card.js?raw';
import SCROLLBAR from './modules/scrollbar.js?raw';

// 导入深色模式框架
import DARKMODE_FRAME from './modules/darkmode-frame.js?raw';

// 整合所有CSS模块
export const RP_PHONE_CSS = `
${BASE_CSS}

/* ══════════════════════════════════════
   🎨 CSS THEME TOKENS
   ══════════════════════════════════════ */
${THEME_TOKENS}

/* ── Star Night Theme ── */
${THEME_STAR}

/* ══════════════════════════════════════
   📱 PHONE FRAME
   ══════════════════════════════════════ */
${FRAME}
${SCREEN}
${STATUSBAR}

/* ══════════════════════════════════════
   🔒 LOCK SCREEN
   ══════════════════════════════════════ */
${LOCKSCREEN}
${SWIPE}
${LOCKWIDGET}
${DARKMODE_LOCK}

/* ══════════════════════════════════════
   🏠 HOME SCREEN
   ══════════════════════════════════════ */
${HOMESCREEN}
${HOMEPAGES}
${ABOUT}
${DARKMODE_HOME}

/* ══════════════════════════════════════
   💬 MESSAGES
   ══════════════════════════════════════ */
${MESSAGES}
${THREAD}
${DARKMODE_MESSAGES}
${DARKMODE_THREAD}
${NAVBAR}
${MODALS}
${NOTIFICATION}

/* ══════════════════════════════════════
   🎨 ICONS
   ══════════════════════════════════════ */
${ICONBASE}
${SHARED_ICONS}

/* ══════════════════════════════════════
   🎨 THEMES VIEW
   ══════════════════════════════════════ */
${THEMES_VIEW}
${THEMES_MISTY}
${THEMES_PARTICLES}
${MISTY_API}
${MISTY_LUDO}
${NUCLEAR}
${DEFAULT_THEME}
${STAR_CONTRAST}
${THEME_CONTRAST}
${WALLPAPER}

/* ══════════════════════════════════════
   📸 MOMENTS
   ══════════════════════════════════════ */
${MOMENTS}
${AVATAR}
${MOMENT_IMAGE}
${MOMENT_GENERATE}
${MOMENTS_EXTRA}

/* ══════════════════════════════════════
   ⚙️ SETTINGS
   ══════════════════════════════════════ */
${SETTINGS}

/* ══════════════════════════════════════
   📝 DIARY
   ══════════════════════════════════════ */
${DIARY}
${DIARY_CANDY}

/* ══════════════════════════════════════
   🎮 GAMES
   ══════════════════════════════════════ */
${GAME_2048_CANDY}
${GAME_2048_STAR}
${GAME_2048_MISTY}
${GAME_2048_EXTRA}
${GAMES_FOLDER}
${GAMES_CANDY}
${GAMES_STAR}
${GAMES_MISTY}

/* ══════════════════════════════════════
   ✏️ COMPOSE MODAL
   ══════════════════════════════════════ */
${COMPOSE_MODAL}
${COMPOSE_LAYERS}
${COMPOSE_STAR}
${COMPOSE_MISTY}
${COMPOSE_DARK}

/* ══════════════════════════════════════
   📕 XHS (小红书)
   ══════════════════════════════════════ */
${XHS}
${TEXTAREA}
${STUDIO_BUTTONS}
${STUDIO_CARDS}
${STUDIO_SAVE}
${STUDIO_STAR}
${STUDIO_MISTY}
${STUDIO_SAVED}

/* ══════════════════════════════════════
   📞 CALL & CHAT
   ══════════════════════════════════════ */
${CALL_OVERLAY}
${CALL_RECORD}
${HONGBAO}
${VOICE}
${GROUPCHAT}
${ATTACH}
${CHOICE}

/* ══════════════════════════════════════
   🔧 OTHER COMPONENTS
   ══════════════════════════════════════ */
${BUBBLE_INSET}
${DIVIDER}
${WALLPAPER_EXTRA}
${POPUP}
${TASKBAR}
${EDIT_PENCIL}
${DELETE}
${DESIGN_TOKENS}
${BANK_CARD}
${SCROLLBAR}

/* ══════════════════════════════════════
   🌙 DARK MODE FRAME
   ══════════════════════════════════════ */
${DARKMODE_FRAME}
`;
