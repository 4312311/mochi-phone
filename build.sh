#!/bin/bash

# ================================================================
#  BUILD SCRIPT
#  构建脚本 - 将所有模块打包成一个单独的文件
# ================================================================

echo "开始构建..."

# 创建输出目录
mkdir -p dist

# 合并所有模块
cat > dist/index.js << 'EOF'
// ================================================================
//  RAYMOND PHONE - SILLYTAVERN FRONTEND PHONE SIMULATION PLUGIN
//  模块化版本 - 由构建脚本自动生成
// ================================================================

EOF

# 添加各个模块
echo "// ===== CSS STYLES =====" >> dist/index.js
cat src/styles/css.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== HTML TEMPLATES =====" >> dist/index.js
cat src/templates/html.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== CORE STATE =====" >> dist/index.js
cat src/core/state.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== CORE INIT =====" >> dist/index.js
cat src/core/init.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== CHAT MODULE =====" >> dist/index.js
cat src/modules/chat.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== SMS MODULE =====" >> dist/index.js
cat src/modules/sms.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== MOMENTS MODULE =====" >> dist/index.js
cat src/modules/moments.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== MOMENTS CONTEXT MODULE =====" >> dist/index.js
cat src/modules/moments-context.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== THEMES MODULE =====" >> dist/index.js
cat src/modules/themes.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== API SETTINGS MODULE =====" >> dist/index.js
cat src/modules/api-settings.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== GAMES MODULE =====" >> dist/index.js
cat src/modules/games.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== GAMES COMPLETE MODULE =====" >> dist/index.js
cat src/modules/games-complete.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== 2048 LOGIC MODULE =====" >> dist/index.js
cat src/modules/2048-logic.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== GOLD MINER RENDER MODULE =====" >> dist/index.js
cat src/modules/gold-miner-render.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== GOLD MINER EVENTS MODULE =====" >> dist/index.js
cat src/modules/gold-miner-events.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== FAB DRAG MODULE =====" >> dist/index.js
cat src/modules/fab-drag.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== GAME CHAT MODULE =====" >> dist/index.js
cat src/modules/game-chat.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== GET PERSONA MODULE =====" >> dist/index.js
cat src/modules/get-persona.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== DIARY MODULE =====" >> dist/index.js
cat src/modules/diary.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== XIAOHONGSHU MODULE =====" >> dist/index.js
cat src/modules/xiaohongshu.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== XHS RENDERING MODULE =====" >> dist/index.js
cat src/modules/xhs-rendering.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== XHS TIMER MODULE =====" >> dist/index.js
cat src/modules/xhs-timer.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== XHS DETAIL MODULE =====" >> dist/index.js
cat src/modules/xhs-detail.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== XHS USER POST MODULE =====" >> dist/index.js
cat src/modules/xhs-user-post.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== BANK MODULE =====" >> dist/index.js
cat src/modules/bank.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== UTILS MODULE =====" >> dist/index.js
cat src/modules/utils.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== MESSAGE PROCESSING MODULE =====" >> dist/index.js
cat src/modules/message-processing.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== UI RENDERING MODULE =====" >> dist/index.js
cat src/modules/ui-rendering.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== INIT EVENTS MODULE =====" >> dist/index.js
cat src/modules/init-events.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== THEME STUDIO MODULE =====" >> dist/index.js
cat src/modules/theme-studio.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== LG INIT MODULE =====" >> dist/index.js
cat src/modules/lg-init.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== GAME LOGIC MODULE =====" >> dist/index.js
cat src/modules/game-logic.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== INLINE EDIT MODULE =====" >> dist/index.js
cat src/modules/inline-edit.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== AVATAR UPLOAD MODULE =====" >> dist/index.js
cat src/modules/avatar-upload.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== PENDING IMAGES MODULE =====" >> dist/index.js
cat src/modules/pending-images.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== DIARY RENDER MODULE =====" >> dist/index.js
cat src/modules/diary-render.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== API VIEW MODULE =====" >> dist/index.js
cat src/modules/api-view.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== THEME STUDIO AI MODULE =====" >> dist/index.js
cat src/modules/theme-studio-ai.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== MOMENTS CONTEXT MODULE =====" >> dist/index.js
cat src/modules/moments-context.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== LUDO API MODULE =====" >> dist/index.js
cat src/modules/ludo-api.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== LUDO SQUARE EVENT MODULE =====" >> dist/index.js
cat src/modules/ludo-square-event.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== SMS OOC MODULE =====" >> dist/index.js
cat src/modules/sms-ooc.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== PHONE BLOCK PARSER MODULE =====" >> dist/index.js
cat src/modules/phone-block-parser.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== IMAGE LOCATION MODULE =====" >> dist/index.js
cat src/modules/image-location.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== GROUP PICKER MODULE =====" >> dist/index.js
cat src/modules/group-picker.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== LIVE CHAT MODULE =====" >> dist/index.js
cat src/modules/live-chat.js >> dist/index.js
echo "" >> dist/index.js

echo "// ===== MAIN ENTRY =====" >> dist/index.js
cat src/index.js >> dist/index.js

echo "构建完成! 输出文件: dist/index.js"