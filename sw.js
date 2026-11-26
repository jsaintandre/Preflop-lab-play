/* Preflop Lab offline copy. Built by scripts/build-pages.mjs. */
const CACHE = 'preflop-lab-9cff725b8f94';
const FILES = ["./","fonts/big-shoulders-display-latin-700-normal.woff2","fonts/big-shoulders-display-latin-800-normal.woff2","fonts/big-shoulders-display-latin-ext-700-normal.woff2","fonts/big-shoulders-display-latin-ext-800-normal.woff2","fonts/big-shoulders-text-latin-600-normal.woff2","fonts/big-shoulders-text-latin-700-normal.woff2","fonts/big-shoulders-text-latin-ext-600-normal.woff2","fonts/big-shoulders-text-latin-ext-700-normal.woff2","fonts/fonts.css","fonts/schibsted-grotesk-latin-400-normal.woff2","fonts/schibsted-grotesk-latin-500-normal.woff2","fonts/schibsted-grotesk-latin-600-normal.woff2","fonts/schibsted-grotesk-latin-700-normal.woff2","fonts/schibsted-grotesk-latin-ext-400-normal.woff2","fonts/schibsted-grotesk-latin-ext-500-normal.woff2","fonts/schibsted-grotesk-latin-ext-600-normal.woff2","fonts/schibsted-grotesk-latin-ext-700-normal.woff2","icons/apple-touch-icon.png","icons/icon-192.png","icons/icon-512.png","index.html","manifest.webmanifest"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('preflop-lab-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const pathname = new URL(req.url).pathname;
  const page = req.mode === 'navigate' || pathname.endsWith('/') || pathname.endsWith('/index.html');
  if (page) {
    e.respondWith(fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./', copy)); }
      return res;
    }).catch(() => caches.match('./', { ignoreSearch: true })));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req)));
});
