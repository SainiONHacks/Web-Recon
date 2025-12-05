/* background placeholder - same as before */
const DEFAULT_TIMEOUT = 15000;
async function fetchText(url, timeout = DEFAULT_TIMEOUT) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const r = await fetch(url, { method: 'GET', signal: controller.signal, cache: 'no-store', mode: 'cors' });
    clearTimeout(id);
    if (!r.ok) return { error: 'status ' + r.status, status: r.status, text: await r.text() };
    const txt = await r.text();
    return { ok: true, status: r.status, text: txt };
  } catch (err) {
    return { error: err.message || String(err) };
  } finally {
    clearTimeout(id);
  }
}
async function fetchCrtShCommon(domain) {
  const url = `https://crt.sh/json?q=${encodeURIComponent(domain)}`;
  try {
    const resp = await fetchText(url, DEFAULT_TIMEOUT * 2);
    if (resp && resp.error) return { error: resp.error, raw: resp.text || '' };
    const parsed = JSON.parse(resp.text);
    const subs = new Set();
    for (const it of parsed) {
      if (it.common_name) {
        let cn = String(it.common_name).trim().replace(/^\*\./, '').toLowerCase();
        if (cn && cn.includes(domain.toLowerCase())) subs.add(cn);
      }
    }
    return { subdomains: Array.from(subs).sort(), source: 'direct-common_name' };
  } catch (e) {
    console.warn('fetchCrtShCommon error:', e.message);
    return { error: e.message || String(e) };
  }
}
async function storeAndReturnKey(obj) {
  const key = `results_${Date.now()}_${Math.floor(Math.random()*10000)}`;
  const toStore = {}; toStore[key] = obj;
  await browser.storage.local.set(toStore);
  return key;
}
browser.runtime.onMessage.addListener(async (msg) => {
  if (!msg || !msg.type) return;
  try {
    if (msg.type === 'CRT_SEARCH') {
      const resp = await fetchCrtShCommon(msg.domain);
      const key = await storeAndReturnKey({ type: 'crt_common', domain: msg.domain, data: resp });
      return { key };
    }
  } catch (err) { return { error: err.message || String(err) }; }
});
