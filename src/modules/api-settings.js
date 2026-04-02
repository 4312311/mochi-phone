// ================================================================
//  API SETTINGS
//  API设置模块
// ================================================================

const API_SETTINGS_KEY = 'rp_api_settings';
const API_SETTINGS_DEFAULT = {
  comfy: { enabled: false, endpoint: '', workflow: '', promptPlaceholder: '', timeout: 60, maxRetries: 1, batchSize: 1 },
  lg:    { enabled: false, endpoint: '', model: '', apiKey: '', timeout: 60, maxRetries: 2, batchSize: 1 },
  ai:    { enabled: false, endpoint: '', model: '', apiKey: '', timeout: 60, maxRetries: 2, batchSize: 1 },
};

let API_SETTINGS = (() => {
  try {
    const s = localStorage.getItem(API_SETTINGS_KEY);
    return s ? JSON.parse(s) : JSON.parse(JSON.stringify(API_SETTINGS_DEFAULT));
  } catch(e) {
    console.warn('[Phone] load API_SETTINGS failed, using defaults:', e);
    return JSON.parse(JSON.stringify(API_SETTINGS_DEFAULT));
  }
})();

function saveApiSettings() {
  try {
    localStorage.setItem(API_SETTINGS_KEY, JSON.stringify(API_SETTINGS));
  } catch(e) {
    console.warn('[Phone] saveApiSettings error:', e);
  }
}

function apiSettingsRender() {
  const comfy = API_SETTINGS.comfy;
  const lg    = API_SETTINGS.lg;
  const ai    = API_SETTINGS.ai;
  $('#rp-api-comfy-enabled').prop('checked', comfy.enabled);
  $('#rp-api-comfy-endpoint').val(comfy.endpoint);
  $('#rp-api-comfy-workflow').val(comfy.workflow);
  $('#rp-api-comfy-prompt-placeholder').val(comfy.promptPlaceholder);
  $('#rp-api-comfy-timeout').val(comfy.timeout);
  $('#rp-api-comfy-max-retries').val(comfy.maxRetries);
  $('#rp-api-comfy-batch-size').val(comfy.batchSize);

  $('#rp-api-lg-enabled').prop('checked', lg.enabled);
  $('#rp-api-lg-endpoint').val(lg.endpoint);
  $('#rp-api-lg-model').val(lg.model);
  $('#rp-api-lg-api-key').val(lg.apiKey);
  $('#rp-api-lg-timeout').val(lg.timeout);
  $('#rp-api-lg-max-retries').val(lg.maxRetries);
  $('#rp-api-lg-batch-size').val(lg.batchSize);

  $('#rp-api-ai-enabled').prop('checked', ai.enabled);
  $('#rp-api-ai-endpoint').val(ai.endpoint);
  $('#rp-api-ai-model').val(ai.model);
  $('#rp-api-ai-api-key').val(ai.apiKey);
  $('#rp-api-ai-timeout').val(ai.timeout);
  $('#rp-api-ai-max-retries').val(ai.maxRetries);
  $('#rp-api-ai-batch-size').val(ai.batchSize);
}

function apiSettingsSave() {
  API_SETTINGS.comfy = {
    enabled: $('#rp-api-comfy-enabled').prop('checked'),
    endpoint: $('#rp-api-comfy-endpoint').val().trim(),
    workflow: $('#rp-api-comfy-workflow').val().trim(),
    promptPlaceholder: $('#rp-api-comfy-prompt-placeholder').val().trim(),
    timeout: parseInt($('#rp-api-comfy-timeout').val(), 10) || 60,
    maxRetries: parseInt($('#rp-api-comfy-max-retries').val(), 10) || 1,
    batchSize: parseInt($('#rp-api-comfy-batch-size').val(), 10) || 1,
  };
  API_SETTINGS.lg = {
    enabled: $('#rp-api-lg-enabled').prop('checked'),
    endpoint: $('#rp-api-lg-endpoint').val().trim(),
    model: $('#rp-api-model').val().trim(),
    apiKey: $('#rp-api-lg-api-key').val().trim(),
    timeout: parseInt($('#rp-api-lg-timeout').val(), 10) || 60,
    maxRetries: parseInt($('#rp-api-lg-max-retries').val(), 10) || 2,
    batchSize: parseInt($('#rp-api-lg-batch-size').val(), 10) || 1,
  };
  API_SETTINGS.ai = {
    enabled: $('#rp-api-ai-enabled').prop('checked'),
    endpoint: $('#rp-api-ai-endpoint').val().trim(),
    model: $('#rp-api-model').val().trim(),
    apiKey: $('#rp-api-ai-api-key').val().trim(),
    timeout: parseInt($('#rp-api-ai-timeout').val(), 10) || 60,
    maxRetries: parseInt($('#rp-api-ai-max-retries').val(), 10) || 2,
    batchSize: parseInt($('#rp-api-ai-batch-size').val(), 10) || 1,
  };
  saveApiSettings();
  alert('API设置已保存');
}

function apiSettingsTest(type) {
  const s = API_SETTINGS[type];
  if (!s || !s.enabled || !s.endpoint) {
    alert('请先启用并填写' + (type === 'comfy' ? 'ComfyUI' : (type === 'lg' ? 'LightGame' : 'AI')) + '的配置');
    return;
  }
  const btn = $('#rp-api-' + type + '-test');
  const originalText = btn.text();
  btn.text('测试中...').prop('disabled', true);
  const timeoutMs = (s.timeout || 60) * 1000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const url = s.endpoint.replace(/\/$/, '');
  fetch(url, { method: 'GET', signal: controller.signal })
    .then(r => {
      clearTimeout(timer);
      if (r.ok) {
        alert('连接成功!');
      } else {
        alert('连接失败,状态码:' + r.status);
      }
    })
    .catch(e => {
      clearTimeout(timer);
      alert('连接失败:' + (e.message || e));
    })
    .finally(() => {
      btn.text(originalText).prop('disabled', false);
    });
}

async function comfyGenerate(prompt) {
  const s = API_SETTINGS.comfy;
  if (!s || !s.enabled || !s.endpoint || !s.workflow) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), (s.timeout || 60) * 1000);
  const url = s.endpoint.replace(/\/$/, '') + '/prompt';
  const wf = JSON.parse(s.workflow);
  const promptNode = Object.values(wf).find(n => n.class_type === 'CLIPTextEncode' || n.class_type === 'KSampler' || n.inputs && n.inputs.text);
  if (promptNode && promptNode.inputs && promptNode.inputs.text !== undefined) {
    promptNode.inputs.text = prompt;
  } else {
    const ksNode = Object.values(wf).find(n => n.class_type === 'KSampler');
    if (ksNode && ksNode.inputs) {
      const seedNode = Object.values(wf).find(n => n.class_type === 'Seed');
      if (seedNode && seedNode.outputs && seedNode.outputs[0]) {
        ksNode.inputs.seed = Math.floor(Math.random() * 0xFFFFFFFF);
      }
    }
  }
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: wf }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!r.ok) throw new Error('ComfyUI HTTP ' + r.status);
    const data = await r.json();
    const promptId = data.prompt_id;
    if (!promptId) throw new Error('No prompt_id in response');
    const historyUrl = s.endpoint.replace(/\/$/, '') + '/history/' + promptId;
    const startTime = Date.now();
    while (Date.now() - startTime < (s.timeout || 60) * 1000) {
      await new Promise(r => setTimeout(r, 1500));
      const hr = await fetch(historyUrl);
      if (!hr.ok) continue;
      const hData = await hr.json();
      const outputs = hData[promptId]?.outputs;
      if (outputs) {
        for (const nodeId in outputs) {
          const images = outputs[nodeId].images;
          if (images && images.length > 0) {
            const img = images[0];
            const imgUrl = s.endpoint.replace(/\/$/, '') + '/view?filename=' + encodeURIComponent(img.filename) + '&subfolder=' + encodeURIComponent(img.subfolder || '') + '&type=' + encodeURIComponent(img.type);
            return imgUrl;
          }
        }
      }
    }
    throw new Error('ComfyUI timeout waiting for result');
  } catch(e) {
    clearTimeout(timer);
    console.warn('[ComfyUI] comfyGenerate error:', e);
    return null;
  }
}

async function lgCallAPI(prompt, maxTokens, systemMsg) {
  const s = API_SETTINGS.lg;
  if (!s || !s.enabled || !s.endpoint || !s.model) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), (s.timeout || 60) * 1000);
  const url = s.endpoint.replace(/\/$/, '') + '/v1/chat/completions';
  const messages = [];
  if (systemMsg) messages.push({ role: 'system', content: systemMsg });
  messages.push({ role: 'user', content: prompt });
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + (s.apiKey || '') },
      body: JSON.stringify({
        model: s.model,
        messages: messages,
        max_tokens: maxTokens || 300,
        temperature: 0.7,
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!r.ok) throw new Error('LightGame HTTP ' + r.status);
    const data = await r.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error('No content in response');
    return content;
  } catch(e) {
    clearTimeout(timer);
    console.warn('[LightGame] lgCallAPI error:', e);
    return null;
  }
}

async function aiCallAPI(prompt, maxTokens, systemMsg) {
  const s = API_SETTINGS.ai;
  if (!s || !s.enabled || !s.endpoint || !s.model) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), (s.timeout || 60) * 1000);
  const url = s.endpoint.replace(/\/$/, '') + '/v1/chat/completions';
  const messages = [];
  if (systemMsg) messages.push({ role: 'system', content: systemMsg });
  messages.push({ role: 'user', content: prompt });
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + (s.apiKey || '') },
      body: JSON.stringify({
        model: s.model,
        messages: messages,
        max_tokens: maxTokens || 300,
        temperature: 0.7,
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!r.ok) throw new Error('AI HTTP ' + r.status);
    const data = await r.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error('No content in response');
    return content;
  } catch(e) {
    clearTimeout(timer);
    console.warn('[AI] aiCallAPI error:', e);
    return null;
  }
}