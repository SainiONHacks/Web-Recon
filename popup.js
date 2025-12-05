async function getActiveTabInfo() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const tab = tabs[0];
  if (!tab || !tab.url) throw new Error('No active tab with a URL');
  const u = new URL(tab.url);
  const domain = u.hostname.replace(/^www\./i, '');
  const host = u.hostname;
  const path = u.pathname || '/';
  return { domain, host, path, full: u.href };
}
async function openUrl(url){ return browser.tabs.create({ url }); }
document.getElementById('btn-sub').addEventListener('click', async () => {
  try{ const info = await getActiveTabInfo(); const resp = await browser.runtime.sendMessage({ type: 'CRT_SEARCH', domain: info.domain }); if (resp.error) { console.error(resp.error); return; } const key = resp.key; await browser.tabs.create({ url: browser.runtime.getURL('results.html') + '?key=' + encodeURIComponent(key) }); } catch (e){ console.error(e); }
});
document.getElementById('btn-subs').addEventListener('click', async () => { try{ const info = await getActiveTabInfo(); const url = `https://web.archive.org/cdx/search/cdx?url=*.${encodeURIComponent(info.domain)}/*&collapse=urlkey&output=text&fl=original`; await openUrl(url);}catch(e){console.error(e);} });
document.getElementById('btn-domain').addEventListener('click', async () => { try{ const info = await getActiveTabInfo(); const url = `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent('www.'+info.domain)}/*&collapse=urlkey&output=text&fl=original`; await openUrl(url);}catch(e){console.error(e);} });
document.getElementById('btn-path').addEventListener('click', async () => { try{ const info = await getActiveTabInfo(); const path = info.path.endsWith('/') ? info.path.slice(0,-1) : info.path; const url = `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(info.domain + path)}/*&collapse=urlkey&output=text&fl=original`; await openUrl(url);}catch(e){console.error(e);} });
document.getElementById('btn-sens').addEventListener('click', async () => { try{ const info = await getActiveTabInfo(); const filter = `original:.*\.(xls|xml|xlsx|json|pdf|sql|doc|docx|pptx|txt|zip|tar\\.gz|tgz|bak|7z|rar|log|cache|secret|db|backup|yml|gz|git|config|csv|yaml|md|md5|exe|dll|bin|ini|bat|sh|tar|deb|rpm|iso|img|apk|msi|env|dmg|tmp|crt|pem|key|pub|asc)$`; const url = `https://web.archive.org/cdx/search/cdx?url=*.${encodeURIComponent(info.domain)}/*&collapse=urlkey&output=text&fl=original&filter=${encodeURIComponent(filter)}`; await openUrl(url);}catch(e){console.error(e);} });
