// GhostR Software — Service Worker v2
// Strategy:
//   HTML pages  → Network first, fall back to cache
//   CSS/JS/img  → Cache first, fall back to network

const CACHE = 'ghostr-v2';
const SHELL = [
  'index.html',
  'contributions.html',
  'manifest.json',
  'css/style.css',
  'js/main.js',
  'images/192.png',
  'images/512.png'
];

// ── INSTALL: cache the site shell ─────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      Promise.all(
        SHELL.map(url => cache.add(url).catch(() =>
          console.warn('[SW] Could not pre-cache:', url)
        ))
      )
    ).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: delete every old cache ──────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── FETCH ──────────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET requests
  if (req.method !== 'GET') return;

  // Skip third-party requests we don't need to cache
  // (allorigins proxy, formspree, whatsapp, etc.)
  const thirdParty = [
    'allorigins.win', 'corsproxy.io', 'formspree.io',
    'wa.me', 'api.allorigins'
  ];
  if (thirdParty.some(d => url.hostname.includes(d))) return;

  // HTML → Network first, cache fallback
  if (req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
          return res;
        })
        .catch(() =>
          caches.match(req).then(cached => cached || caches.match('index.html'))
        )
    );
    return;
  }

  // Assets → Cache first, network fallback
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (res.ok) {
          caches.open(CACHE).then(c => c.put(req, res.clone()));
        }
        return res;
      }).catch(() => new Response('Unavailable offline', { status: 503 }));
    })
  );
});