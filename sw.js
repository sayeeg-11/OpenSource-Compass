const CACHE_NAME = 'os-compass-v2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
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

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
