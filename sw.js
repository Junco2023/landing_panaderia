const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./offline.html",
  "./materialize/css/materialize.min.css",
  "./materialize/js/materialize.min.js",
  "./js/index.js",
  "./css/index.css",
  "./img/slider/huevos-harina.jpg",
  "./img/iconos/logo-500x500.png",
  "./img/iconos/logo-512x512.png",
  "./img/iconos/favicon-192x192.png",
  "./img/iconos/favicon-32x32.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    }).then(() => self.skipWaiting())  // <=== forzamos activar SW nuevo inmediatamente
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())  // <=== toma control inmediato de clientes abiertos
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('offline.html');
        }
      });
    })
  );
});

