// GhostR Software — Service Worker
// Caches the site shell so it loads instantly and works offline.

const CACHE_NAME   = 'ghostr-v1';
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/contributions.html',
  '/manifest.json',
  '/css/style.css',
  '/js/main.js',
  '/images/icon-192.png',
  '/images/icon-512.png',
  // Bootstrap & Font Awesome are cached on first fetch via network-first strategy
];

// ── Install: pre-cache shell assets ──
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("ghost-cache").then(cache => {
      return cache.addAll([
        "./index.html",
        "./css/style.css",
        "./js/app.js",
        "./images/icon-192.png",
        "./images/icon-512.png"
      ]);
    })
  );
});

// ── Fetch: network-first for HTML, cache-first for assets ──
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});


// ── Activate: remove old caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

  // Only handle same-origin and CDN requests
  if (!['https:', 'http:'].includes(url.protocol)) return;

  // Network-first for HTML pages (always fresh content)
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request).then(r => r || caches.match('/index.html')))
    );
    return;
  }

  // Cache-first for CSS, JS, images, fonts
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
        }
        return res;
      }).catch(() => new Response('Offline', { status: 503 }));
    })
  );
});