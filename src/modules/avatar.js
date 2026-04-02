/**
 * 头像模块
 * 处理头像管理和显示
 */

import { STATE, setAvatar } from '../core/state.js';
import { saveState } from '../core/state.js';

// TODO: 从 index.js 中拆分头像相关逻辑
// - 头像上传和设置
// - 头像显示逻辑
// 等

// 临时占位实现
export function uploadAvatar() {
  // 头像上传逻辑
  console.log('[Raymond Phone] 上传头像...');
  
  // 创建文件输入元素
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
      const imageData = event.target.result;
      const selectedUser = $('#rp-avatar-select').val();
      
      if (selectedUser) {
        setAvatar(selectedUser, imageData);
        saveState();
        
        // 更新预览
        const swatch = $('#rp-avatar-preview-swatch');
        swatch.html(`<img class="rp-av-photo" src="${imageData}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:19px"/>`);
        swatch.css('background', 'transparent');
        
        console.log('[Raymond Phone] 头像已更新');
      }
    };
    reader.readAsDataURL(file);
  };
  
  input.click();
}

// 将函数暴露到全局，供HTML中的onclick使用
window.uploadAvatar = uploadAvatar;