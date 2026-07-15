const CACHE_NAME = 'catalogo-cache-v0.1';
const assets = [
  './index.html',
  './manifest.json'
];

// Instalar el Service Worker y almacenar archivos estáticos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Responder con los elementos en caché o buscar en la red si no están
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});