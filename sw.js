// Bump CACHE_NAME any time you change index.html/manifest/icons — that's
// what forces old cached copies to be thrown out and replaced.
const CACHE_NAME = 'rolodex-cache-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first for the page itself, so edits you push to GitHub show up
// the next time you open the app with a connection. Falls back to the
// cached copy only when there's no network (that's the offline support).
// Cache-first for icons/manifest, since those rarely change and this
// avoids re-downloading them every time.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const isPage = event.request.mode === 'navigate' ||
    event.request.url.endsWith('/index.html') ||
    event.request.url.endsWith('/');

  if (isPage) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => cached);
    })
  );
});
