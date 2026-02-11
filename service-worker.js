const CACHE_NAME = 'wattwin-cache-v1';
const FILES_TO_CACHE = [
  './',
  './index.html','./home.html','./fetch.html','./bill.html','./payment.html','./rewards.html','./insights.html',
  './style.css','./app.js','./manifest.json','./assets/icon-192.png','./assets/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.map(k => { if(k!==CACHE_NAME){ return caches.delete(k); } }))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request)).catch(() => {
      if(e.request.mode === 'navigate'){ return caches.match('./index.html'); }
    })
  );
});
