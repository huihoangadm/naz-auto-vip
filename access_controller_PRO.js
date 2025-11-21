(async function(){
  try{
    const PAYLOAD_URL = "https://raw.githubusercontent.com/huihoangadm/naz-auto-vip/main/payload_PRO.js";
    const resp = await fetch(PAYLOAD_URL, {cache: "no-store"});
    if(!resp.ok) throw new Error("Failed to load payload: "+resp.status);
    const text = await resp.text();
    eval(text);
    if(typeof window.__NAZ_PAYLOAD !== "string" || typeof window.__NAZ_PAYLOAD_CHECK !== "string") throw new Error("Payload missing or invalid.");
    function b64ToBytes(b64){ const raw=atob(b64); const a=new Uint8Array(raw.length); for(let i=0;i<raw.length;i++) a[i]=raw.charCodeAt(i); return a; }
    const encBytes = b64ToBytes(window.__NAZ_PAYLOAD);
    const digestBuf = await crypto.subtle.digest('SHA-256', encBytes);
    const hex = Array.from(new Uint8Array(digestBuf)).map(b=>b.toString(16).padStart(2,'0')).join('');
    if(hex !== window.__NAZ_PAYLOAD_CHECK){ alert("Payload integrity check failed. Mã hóa không hợp lệ hoặc mật khẩu sai."); return; }
    const pass = prompt("Nhập mật khẩu để chạy NAZ VIP PRO:");
    if(pass === null) return;
    const keyBuf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pass));
    const key = new Uint8Array(keyBuf);
    const out = new Uint8Array(encBytes.length);
    for(let i=0;i<encBytes.length;i++) out[i] = encBytes[i] ^ key[i % key.length];
    const code = new TextDecoder().decode(out);
    const s=document.createElement('script'); s.type='text/javascript'; s.text = code; document.body.appendChild(s);
    try{ delete window.__NAZ_PAYLOAD; delete window.__NAZ_PAYLOAD_CHECK; }catch(e){}
  }catch(e){ console.error(e); alert("Loader error: "+(e && e.message ? e.message : e)); }
})();
