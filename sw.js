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
  "./img/iconos/facebook.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Si no hay red y la petición es para una página HTML, muestra offline.html
        if (event.request.destination === 'document') {
          return caches.match('offline.html');
        }
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});
