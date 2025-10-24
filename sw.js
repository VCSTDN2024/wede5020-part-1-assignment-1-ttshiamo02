const CACHE_NAME = 'bat-bakery-v1.3';
const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/products.html',
    '/services.html',
    '/contact.html',
    '/enquiry.html',
    '/style.css',
    '/scripts.js',
    '/form-validation.js'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});