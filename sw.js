const CACHE_NAME = 'os-compass-v3';
const OFFLINE_PAGE = './offline.html';

const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './offline.html',
    './frontend/css/style.css',
    './frontend/css/home.css',
    './frontend/js/components.js',
    './frontend/js/theme.js',
    './frontend/js/home.js',
    './manifest.json',
    './frontend/library/assets/logo.png',
    './frontend/library/assets/favicon.png',
    './public/icon.png'
];

/* INSTALL */
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Force the waiting service worker to become the active service worker
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            self.clients.claim(), // Become the controller for all clients
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
    self.skipWaiting();
});

/* ACTIVATE */
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
    self.clients.claim();
});

/* FETCH */
self.addEventListener('fetch', (event) => {
    const request = event.request;

    // Handle navigation (HTML pages)
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, copy);
                    });
                    return response;
                })
                .catch(() => caches.match(request).then(res => res || caches.match(OFFLINE_PAGE)))
        );
        return;
    }

    // Handle static assets (CSS, JS, images)
    event.respondWith(
        caches.match(request).then((cached) => {
            if (cached) {
                // Update cache in background
                fetch(request).then((response) => {
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, response.clone());
                    });
                });
                return cached;
            }

            return fetch(request).then((response) => {
                const copy = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(request, copy);
                });
                return response;
            });
        })
    );
});
