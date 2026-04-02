// ================================================================
//  API VIEW
//  API视图模块
// ================================================================

function lgFillAPIView() {
  const container = $('#rp-api-view');
  if (!container.length) return;
  
  const comfy = API_SETTINGS.comfy;
  const lg = API_SETTINGS.lg;
  const ai = API_SETTINGS.ai;
  
  container.html(`
    <div class="rp-api-section">
      <h3>ComfyUI</h3>
      <div class="rp-api-row">
        <label>启用</label>
        <input type="checkbox" id="rp-api-comfy-enabled" ${comfy.enabled ? 'checked' : ''}/>
      </div>
      <div class="rp-api-row">
        <label>端点</label>
        <input type="text" id="rp-api-comfy-endpoint" value="${comfy.endpoint}" placeholder="http://localhost:8188"/>
      </div>
      <div class="rp-api-row">
        <label>Workflow</label>
        <textarea id="rp-api-comfy-workflow" rows="3" placeholder="{}">${comfy.workflow}</textarea>
      </div>
      <div class="rp-api-row">
        <label>Prompt占位符</label>
        <input type="text" id="rp-api-comfy-prompt-placeholder" value="${comfy.promptPlaceholder}" placeholder="text"/>
      </div>
      <button id="rp-api-comfy-test">测试连接</button>
    </div>
    <div class="rp-api-section">
      <h3>LightGame</h3>
      <div class="rp-api-row">
        <label>启用</label>
        <input type="checkbox" id="rp-api-lg-enabled" ${lg.enabled ? 'checked' : ''}/>
      </div>
      <div class="rp-api-row">
        <label>端点</label>
        <input type="text" id="rp-api-lg-endpoint" value="${lg.endpoint}" placeholder="http://localhost:5000"/>
      </div>
      <div class="rp-api-row">
        <label>模型</label>
        <input type="text" id="rp-api-lg-model" value="${lg.model}" placeholder="gpt-3.5-turbo"/>
      </div>
      <div class="rp-api-row">
        <label>API Key</label>
        <input type="text" id="rp-api-lg-api-key" value="${lg.apiKey}" placeholder="sk-..."/>
      </div>
      <button id="rp-api-lg-test">测试连接</button>
    </div>
    <div class="rp-api-section">
      <h3>AI</h3>
      <div class="rp-api-row">
        <label>启用</label>
        <input type="checkbox" id="rp-api-ai-enabled" ${ai.enabled ? 'checked' : ''}/>
      </div>
      <div class="rp-api-row">
        <label>端点</label>
        <input type="text" id="rp-api-ai-endpoint" value="${ai.endpoint}" placeholder="http://localhost:5000"/>
      </div>
      <div class="rp-api-row">
        <label>模型</label>
        <input type="text" id="rp-api-model" value="${ai.model}" placeholder="gpt-3.5-turbo"/>
      </div>
      <div class="rp-api-row">
        <label>API Key</label>
        <input type="text" id="rp-api-ai-api-key" value="${ai.apiKey}" placeholder="sk-..."/>
      </div>
      <button id="rp-api-ai-test">测试连接</button>
    </div>
    <button id="rp-api-save">保存</button>
  `);
}