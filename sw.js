const CACHE_VERSION = Date.now(); // Auto-bust cache on new SW install
const CACHE_NAME = `os-compass-v4-${CACHE_VERSION}`;
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

/* INSTALL - Skip waiting immediately to activate the new SW */
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching assets with version:', CACHE_NAME);
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

/* ACTIVATE - Delete ALL old caches and claim clients */
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('New service worker activated, claiming clients');
            return self.clients.claim();
        })
    );
});

/* FETCH - Network-first strategy: always try to get fresh content */
self.addEventListener('fetch', (event) => {
    const request = event.request;

    // Only handle GET requests
    if (request.method !== 'GET') return;

    // Skip non-http(s) requests (e.g. chrome-extension://)
    if (!request.url.startsWith('http')) return;

    // Handle navigation (HTML pages) - Network first, fallback to cache/offline
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

    // Handle all other assets (CSS, JS, images, fonts, etc.) - Network first
    event.respondWith(
        fetch(request)
            .then((response) => {
                // Only cache successful, same-origin or CORS responses
                if (response && response.status === 200) {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, copy);
                    });
                }
                return response;
            })
            .catch(() => {
                // Network failed, fallback to cache
                return caches.match(request);
            })
    );
});
