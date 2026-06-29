/* Amp Academy — Campus · service worker (SAS §2.3). Offline-first runtime cache. */
const CACHE = 'aa-campus-v6';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch', e => { if(e.request.method!=='GET')return; e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(resp=>{if(resp&&(resp.ok||resp.type==='opaque')){const c=resp.clone();caches.open(CACHE).then(x=>x.put(e.request,c));}return resp;}).catch(()=>caches.match(e.request)))); });
