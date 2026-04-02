// ================================================================
//  PLACEHOLDER MODULE
//  显示未迁移功能的占位符
// ================================================================

// 显示迁移中的提示
export function showMigratingMessage(appInfo) {
  const appNames = {
    'moments': '朋友圈',
    'settings': '设置',
    'folder-games': '游戏',
    'diary': '日记',
    'xhs': '小红书',
    'bank': '银行卡',
    'g2048': '2048游戏',
    'ggold': '黄金矿工',
    'game': '飞行棋'
  };

  const name = appNames[appInfo] || appInfo;
  const message = `【${name}】\n\n该功能正在迁移中，暂时无法使用。\n\n请等待后续更新。`;

  console.log('[Placeholder]', message);
  return message;
}

export default {
  showMigratingMessage
};
