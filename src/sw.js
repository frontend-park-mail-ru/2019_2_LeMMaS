import { cache as urlsToCache } from "./sw-urls-to-cache";

const CACHE_NAME = "lemmas-cache-v1";

self.addEventListener("install", event => {
    // установка sw
    event.waitUntil(
        // пока все нужное не загружится в кеш
        caches.open(CACHE_NAME).then(cache => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", event => {
    // обработка запросов
    event.respondWith(async () => {
        const cache = await caches.open(CACHE_NAME); // пробуем взять данные из кеша
        const cachedResponse = await cache.match(event.request);

        if (cachedResponse) {
            // если данные нашлись в кеше
            event.waitUntil(cache.add(event.request)); // обновляем данные в фоновом режиме
            return cachedResponse; // отдаем данные из кеша
        }

        if (!navigator.onLine) {
            // если отсутствует интернет
            return Promise.resolve(
                new Response(JSON.stringify({ message: "No internet" }), {
                    status: 400,
                })
            );
        }

        return fetch(event.request); // иначе используем интернет
    });
});

self.addEventListener("activate", event => {
    // очистка кеша
    const cacheToKeep = urlsToCache;
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (cacheToKeep.indexOf(key) === -1) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});
