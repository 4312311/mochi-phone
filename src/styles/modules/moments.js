export const css = `#rp-view-moments{background:transparent !important;display:flex;flex-direction:column}

#rp-moments-list{flex:1;overflow-y:auto;scrollbar-width:none;padding-bottom:8px}
#rp-moments-list::-webkit-scrollbar{display:none}
.rp-moment{background:var(--rp-moment-card);margin-bottom:8px;padding:14px 16px}
.rp-dark .rp-moment{background:#0e0e20}
.rp-moment-hd{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.rp-moment-av{width:42px;height:42px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0}
.rp-moment-meta{flex:1;min-width:0}
.rp-moment-name{font-size:14px;font-weight:700;color:var(--rp-moment-name)}
.rp-dark .rp-moment-name{color:#8aaef0}
.rp-moment-time{font-size:10.5px;color:rgba(0,0,0,.38);margin-top:2px;font-weight:600}
.rp-dark .rp-moment-time{color:rgba(160,175,255,.38)}
.rp-moment-text{font-size:14px;color:var(--rp-moment-text);line-height:1.65;margin-bottom:10px;word-break:break-word}
.rp-dark .rp-moment-text{color:#d5d8f0}
.rp-moment-bar{display:flex;align-items:center;justify-content:flex-end;gap:2px;padding:6px 0 2px;border-top:1px solid var(--rp-moment-bd)}
.rp-dark .rp-moment-bar{border-top-color:rgba(255,255,255,.06)}
.rp-moment-act{display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:8px;font-size:12px;font-weight:600;color:rgba(0,0,0,.42);cursor:pointer;transition:background .12s,color .12s;border:none;background:none;font-family:inherit}
.rp-dark .rp-moment-act{color:rgba(160,175,255,.42)}
.rp-moment-act:hover{background:rgba(0,0,0,.04)}
.rp-dark .rp-moment-act:hover{background:rgba(255,255,255,.04)}
.rp-moment-act.rp-liked{color:#e53e3e !important}
.rp-moment-comments-wrap{background:rgba(0,0,0,.03);border-radius:10px;padding:8px 12px;margin-top:8px;display:flex;flex-direction:column;gap:5px}
.rp-dark .rp-moment-comments-wrap{background:rgba(255,255,255,.04)}
.rp-moment-comment{font-size:13px;color:#222;line-height:1.55}
.rp-dark .rp-moment-comment{color:#c0c8e8}
.rp-moment-cname{color:#2563eb;font-weight:700}
.rp-dark .rp-moment-cname{color:#8aaef0}
.rp-moment-reply-btn{color:rgba(0,0,0,.35);font-size:11px;cursor:pointer;margin-left:6px}
.rp-dark .rp-moment-reply-btn{color:rgba(160,175,255,.35)}
.rp-moment-input-row{display:flex;gap:6px;margin-top:8px;padding-top:6px;border-top:1px solid rgba(0,0,0,.06)}
.rp-dark .rp-moment-input-row{border-top-color:rgba(255,255,255,.06)}
.rp-moment-cinput{flex:1;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.1);border-radius:8px;padding:6px 10px;font-size:12.5px;color:#1a1a1a;font-family:inherit;outline:none}
.rp-dark .rp-moment-cinput{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#d5d8f0}
.rp-moment-csend{background:#2563eb;color:#fff;border:none;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap;flex-shrink:0}
.rp-moment-csend:hover{opacity:.85}
.rp-moments-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:200px;color:rgba(0,0,0,.3);font-size:13px;gap:8px}
.rp-dark .rp-moments-empty{color:rgba(160,175,255,.3)}

/* ── AVATAR IMAGES ── */
.rp-av-img,.rp-moment-av.rp-av-img{overflow:hidden;padding:0}
.rp-av-photo{width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit}
/* ── SETTINGS VIEW ── */
#rp-view-settings{background:transparent;display:flex;flex-direction:column;overflow-y:auto}
#rp-view-api-settings{background:transparent;display:flex;flex-direction:column}
.rp-dark #rp-view-settings{background:transparent}
.rp-set-section{background:#fff;border-radius:12px;margin:10px 12px 0;padding:0 14px;overflow:hidden}
.rp-dark .rp-set-section{background:rgba(255,255,255,.04)}
.rp-set-section-title{font-size:12px;font-weight:600;color:#8a8a9a;text-transform:uppercase;letter-spacing:.05em;margin:16px 12px 5px;padding:0}
.rp-dark .rp-set-section-title{color:#6a6a7a}
.rp-set-row{display:flex;align-items:center;padding:11px 0;border-bottom:1px solid rgba(0,0,0,.06);gap:10px;min-height:44px}
.rp-dark .rp-set-row{border-bottom-color:rgba(255,255,255,.05)}
.rp-set-row:last-child{border-bottom:none}
.rp-set-key{font-size:15px;color:#1a1a2e;flex:1}
.rp-dark .rp-set-key{color:#c8cce8}
.rp-set-hint{font-size:12px;color:#8a8a9a;flex:1}
.rp-dark .rp-set-hint{color:rgba(200,190,255,.45)}
.rp-set-select{font-size:14px;color:#3a3a5e;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.1);border-radius:8px;padding:4px 8px;font-family:inherit;max-width:150px;outline:none}
.rp-dark .rp-set-select{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.1);color:#c0c4e0}
.rp-avatar-upload-btn{font-size:13.5px;color:#2563eb;background:rgba(37,99,235,.08);border:1px solid rgba(37,99,235,.18);border-radius:8px;padding:6px 12px;cursor:pointer;flex-shrink:0;display:inline-flex;align-items:center;gap:4px}
.rp-dark .rp-avatar-upload-btn{color:#7090f0;background:rgba(112,144,240,.12);border-color:rgba(112,144,240,.2)}
.rp-set-upload-btn{font-size:13.5px;font-family:inherit;padding:8px 12px;border-radius:10px;border:none;cursor:pointer;background:rgba(0,0,0,.06);color:#333;white-space:nowrap;display:flex;align-items:center;justify-content:center;gap:4px}
.rp-dark .rp-set-upload-btn{background:rgba(255,255,255,.08);color:#c8cce8}
.rp-wall-reset-btn{background:rgba(0,0,0,.05)!important;color:#666!important}
.rp-dark .rp-wall-reset-btn{background:rgba(255,255,255,.06)!important;color:rgba(200,190,255,.6)!important}
.rp-set-avatar-preview{width:38px;height:38px;border-radius:19px;overflow:hidden;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff}

/* ===== DIARY VIEW ===== */
`;
