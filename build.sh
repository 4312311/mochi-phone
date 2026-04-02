#!/bin/bash

# ================================================================
#  BUILD SCRIPT
#  构建脚本 - 将所有模块打包成一个单独的文件
#  输出到根目录的index.js，直接供SillyTavern使用
# ================================================================

echo "开始构建..."

# 创建临时文件
TEMP_FILE=$(mktemp)

# 合并所有模块到临时文件
cat > "$TEMP_FILE" << 'EOF'
// ================================================================
//  RAYMOND PHONE - SILLYTAVERN FRONTEND PHONE SIMULATION PLUGIN
//  模块化版本 - 由构建脚本自动生成
// ================================================================

EOF

# 添加各个模块
echo "// ===== CSS STYLES =====" >> "$TEMP_FILE"
cat src/styles/css.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== HTML TEMPLATES =====" >> "$TEMP_FILE"
cat src/templates/html.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== CORE STATE =====" >> "$TEMP_FILE"
cat src/core/state.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== CORE INIT =====" >> "$TEMP_FILE"
cat src/core/init.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== CHAT MODULE =====" >> "$TEMP_FILE"
cat src/modules/chat.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== SMS MODULE =====" >> "$TEMP_FILE"
cat src/modules/sms.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== MOMENTS MODULE =====" >> "$TEMP_FILE"
cat src/modules/moments.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== MOMENTS CONTEXT MODULE =====" >> "$TEMP_FILE"
cat src/modules/moments-context.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== THEMES MODULE =====" >> "$TEMP_FILE"
cat src/modules/themes.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== API SETTINGS MODULE =====" >> "$TEMP_FILE"
cat src/modules/api-settings.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== GAMES MODULE =====" >> "$TEMP_FILE"
cat src/modules/games.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== GAMES COMPLETE MODULE =====" >> "$TEMP_FILE"
cat src/modules/games-complete.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== 2048 LOGIC MODULE =====" >> "$TEMP_FILE"
cat src/modules/2048-logic.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== GOLD MINER RENDER MODULE =====" >> "$TEMP_FILE"
cat src/modules/gold-miner-render.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== GOLD MINER EVENTS MODULE =====" >> "$TEMP_FILE"
cat src/modules/gold-miner-events.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== FAB DRAG MODULE =====" >> "$TEMP_FILE"
cat src/modules/fab-drag.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== GAME CHAT MODULE =====" >> "$TEMP_FILE"
cat src/modules/game-chat.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== GET PERSONA MODULE =====" >> "$TEMP_FILE"
cat src/modules/get-persona.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== DIARY MODULE =====" >> "$TEMP_FILE"
cat src/modules/diary.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== XIAOHONGSHU MODULE =====" >> "$TEMP_FILE"
cat src/modules/xiaohongshu.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== XHS RENDERING MODULE =====" >> "$TEMP_FILE"
cat src/modules/xhs-rendering.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== XHS TIMER MODULE =====" >> "$TEMP_FILE"
cat src/modules/xhs-timer.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== XHS DETAIL MODULE =====" >> "$TEMP_FILE"
cat src/modules/xhs-detail.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== XHS USER POST MODULE =====" >> "$TEMP_FILE"
cat src/modules/xhs-user-post.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== BANK MODULE =====" >> "$TEMP_FILE"
cat src/modules/bank.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== UTILS MODULE =====" >> "$TEMP_FILE"
cat src/modules/utils.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== MESSAGE PROCESSING MODULE =====" >> "$TEMP_FILE"
cat src/modules/message-processing.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== UI RENDERING MODULE =====" >> "$TEMP_FILE"
cat src/modules/ui-rendering.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== INIT EVENTS MODULE =====" >> "$TEMP_FILE"
cat src/modules/init-events.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== THEME STUDIO MODULE =====" >> "$TEMP_FILE"
cat src/modules/theme-studio.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== LG INIT MODULE =====" >> "$TEMP_FILE"
cat src/modules/lg-init.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== GAME LOGIC MODULE =====" >> "$TEMP_FILE"
cat src/modules/game-logic.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== INLINE EDIT MODULE =====" >> "$TEMP_FILE"
cat src/modules/inline-edit.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== AVATAR UPLOAD MODULE =====" >> "$TEMP_FILE"
cat src/modules/avatar-upload.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== PENDING IMAGES MODULE =====" >> "$TEMP_FILE"
cat src/modules/pending-images.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== DIARY RENDER MODULE =====" >> "$TEMP_FILE"
cat src/modules/diary-render.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== API VIEW MODULE =====" >> "$TEMP_FILE"
cat src/modules/api-view.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== THEME STUDIO AI MODULE =====" >> "$TEMP_FILE"
cat src/modules/theme-studio-ai.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== MOMENTS CONTEXT MODULE =====" >> "$TEMP_FILE"
cat src/modules/moments-context.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== LUDO API MODULE =====" >> "$TEMP_FILE"
cat src/modules/ludo-api.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== LUDO SQUARE EVENT MODULE =====" >> "$TEMP_FILE"
cat src/modules/ludo-square-event.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== SMS OOC MODULE =====" >> "$TEMP_FILE"
cat src/modules/sms-ooc.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== PHONE BLOCK PARSER MODULE =====" >> "$TEMP_FILE"
cat src/modules/phone-block-parser.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== IMAGE LOCATION MODULE =====" >> "$TEMP_FILE"
cat src/modules/image-location.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== GROUP PICKER MODULE =====" >> "$TEMP_FILE"
cat src/modules/group-picker.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== LIVE CHAT MODULE =====" >> "$TEMP_FILE"
cat src/modules/live-chat.js >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

echo "// ===== MAIN ENTRY =====" >> "$TEMP_FILE"
cat src/index.js >> "$TEMP_FILE"

# 将临时文件复制到根目录的index.js
cp "$TEMP_FILE" index.js

# 清理临时文件
rm "$TEMP_FILE"

echo "构建完成! 已更新根目录的index.js，可以直接在SillyTavern中使用"