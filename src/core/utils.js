// ================================================================
//  DEVICE TYPE DETECTION - 彻底分离 PC 和手机端逻辑
//  CSS Media Query (hover:none) and (pointer:coarse):
//    - 手机/平板 → hover:none + pointer:coarse  → IS_TOUCH_DEVICE = true ✓
//    - 鼠标PC → hover:hover + pointer:fine      → IS_TOUCH_DEVICE = false ✓
//    - 触屏笔记本(Surface/2-in-1) → hover:hover + pointer:fine (鼠标模式) → false ✓
//  比 maxTouchPoints > 0 更可靠(触屏笔记本 maxTouchPoints 也 > 0,会误判)
// ================================================================
export const IS_TOUCH_DEVICE = window.matchMedia('(hover: none) and (pointer: coarse)').matches
                     || /Android|iPhone|iPod/i.test(navigator.userAgent);

// ST extensions use global variables, not ES6 modules
export const eventSource = window.eventSource || SillyTavern?.eventSource;
export const event_types = window.event_types || SillyTavern?.eventTypes;
export const setExtensionPrompt = window.setExtensionPrompt || SillyTavern?.setExtensionPrompt;
export const extension_prompt_types = window.extension_prompt_types || SillyTavern?.extensionPromptTypes;
export const getContext = window.getContext || SillyTavern?.getContext || (() => ({}));

// 通过 ST 模块系统加载 extension_settings(官方标准方式)
// extension_settings 是 ES module export,不在 window 上
let _rp_ext_settings = null;
let _rp_save_fn = null;
(async function _rpLoadModules() {
  try {
    const ext = await import('../../../extensions.js');
    if (ext && ext.extension_settings) {
      _rp_ext_settings = ext.extension_settings;
      console.log('[Phone] extension_settings 加载成功 ✅');
    }
  } catch(e) { console.warn('[Phone] 无法加载 extensions.js:', e.message); }
  try {
    const scr = await import('../../../../script.js');
    if (scr && typeof scr.saveSettingsDebounced === 'function') {
      _rp_save_fn = scr.saveSettingsDebounced;
      console.log('[Phone] saveSettingsDebounced 加载成功 ✅');
    }
  } catch(e) { console.warn('[Phone] 无法加载 script.js:', e.message); }
})();

export const _extSettings = () =>
  _rp_ext_settings ||
  (typeof extension_settings !== 'undefined' ? extension_settings : null) ||
  window.extension_settings ||
  (window.SillyTavern && window.SillyTavern.extensionSettings) ||
  null;

export const _saveSettings = () => {
  try {
    const fn = _rp_save_fn ||
      (typeof saveSettingsDebounced === 'function' ? saveSettingsDebounced : null) ||
      window.saveSettingsDebounced ||
      (window.SillyTavern && window.SillyTavern.saveSettingsDebounced);
    if (typeof fn === 'function') fn();
  } catch(e) {}
};

export const EXT_KEY = 'ray_phone_v1'; // extension_settings 的命名空间键
