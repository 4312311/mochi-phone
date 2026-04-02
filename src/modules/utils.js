// ================================================================
//  UTILITY FUNCTIONS
//  工具函数模块
// ================================================================

function normalizePhoneMarkup(raw) {
  if (!raw) return '';
  return raw
    .replace(/<SMS\b/gi, '<SMS')
    .replace(/<MOMENTS\b/gi, '<MOMENTS')
    .replace(/<GMSG\b/gi, '<GMSG')
    .replace(/<PHONE\b/gi, '<PHONE')
    .replace(/<\/PHONE>/gi, '</PHONE>')
    .replace(/<HONGBAO\b/gi, '<HONGBAO')
    .replace(/<VOICE\b/gi, '<VOICE')
    .replace(/<LOCATION\b/gi, '<LOCATION');
}

function cleanPhoneFallbackReply(raw, fromName) {
  if (!raw) return '';
  return raw
    .replace(/\*([^*]+)拿起手机[^\*]*\*/gi, '')
    .replace(/\[手机短信提示[^\]]*\]/gi, '')
    .replace(/\[叙事指令[^\]]*\]/gi, '')
    .replace(/\[手机群聊提示[^\]]*\]/gi, '')
    .replace(/<PHONE[^>]*>[\s\S]*?<\/PHONE>/gi, '')
    .trim();
}

function sanitizeSmsText(text) {
  if (!text) return '';
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]/g, '$1')
    .trim();
}

function escapeRegExp(s) {
  return String(s || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractSmsSummaries(block) {
  const smsRegex = /<SMS\b[^>]*FROM\s*=\s*["']([^"']+)["'][^>]*>([^<]*)<\/SMS>/gi;
  const summaries = [];
  let match;
  while ((match = smsRegex.exec(block)) !== null) {
    summaries.push({
      from: match[1].trim(),
      text: match[2].trim(),
    });
  }
  return summaries;
}

function getTagAttrs(attrText) {
  if (!attrText) return {};
  const attrs = {};
  const regex = /(\w+)\s*=\s*["']([^"']*)["']/g;
  let match;
  while ((match = regex.exec(attrText)) !== null) {
    attrs[match[1].toLowerCase()] = match[2].trim();
  }
  return attrs;
}

function parsePhone(block) {
  if (!block) return null;
  const normalized = normalizePhoneMarkup(block);
  const result = {
    sms: [],
    moments: [],
    groupMsgs: [],
    hongbao: [],
    voice: [],
    location: [],
  };

  const smsRegex = /<SMS\b([^>]*)>([^<]*)<\/SMS>/gi;
  let match;
  while ((match = smsRegex.exec(normalized)) !== null) {
    const attrs = getTagAttrs(match[1]);
    result.sms.push({
      from: attrs.from || '',
      time: attrs.time || '',
      text: match[2].trim(),
    });
  }

  const momentsRegex = /<MOMENTS\b([^>]*)>([^<]*)<\/MOMENTS>/gi;
  while ((match = momentsRegex.exec(normalized)) !== null) {
    const attrs = getTagAttrs(match[1]);
    result.moments.push({
      from: attrs.from || '',
      time: attrs.time || '',
      text: match[2].trim(),
      img: attrs.img || '',
      pendingImg: attrs.pendingimg || '',
      pendingImgType: attrs.pendingimgtype || '',
    });
  }

  const gmsgRegex = /<GMSG\b([^>]*)>([^<]*)<\/GMSG>/gi;
  while ((match = gmsgRegex.exec(normalized)) !== null) {
    const attrs = getTagAttrs(match[1]);
    result.groupMsgs.push({
      from: attrs.from || '',
      group: attrs.group || '',
      time: attrs.time || '',
      text: match[2].trim(),
    });
  }

  const hongbaoRegex = /<HONGBAO\b([^>]*)>([^<]*)<\/HONGBAO>/gi;
  while ((match = hongbaoRegex.exec(normalized)) !== null) {
    const attrs = getTagAttrs(match[1]);
    result.hongbao.push({
      from: attrs.from || '',
      amount: attrs.amount || '',
      note: attrs.note || '',
    });
  }

  const voiceRegex = /<VOICE\b([^>]*)>([^<]*)<\/VOICE>/gi;
  while ((match = voiceRegex.exec(normalized)) !== null) {
    const attrs = getTagAttrs(match[1]);
    result.voice.push({
      from: attrs.from || '',
      time: attrs.time || '',
      duration: attrs.duration || '',
      text: match[2].trim(),
    });
  }

  const locationRegex = /<LOCATION\b([^>]*)>([^<]*)<\/LOCATION>/gi;
  while ((match = locationRegex.exec(normalized)) !== null) {
    const attrs = getTagAttrs(match[1]);
    result.location.push({
      from: attrs.from || '',
      time: attrs.time || '',
      text: match[2].trim(),
    });
  }

  return result;
}

function dataURLtoBlob(dataURL) {
  const parts = dataURL.split(',');
  const mime = parts[0].match(/:(.*?);/)[1];
  const bstr = atob(parts[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}