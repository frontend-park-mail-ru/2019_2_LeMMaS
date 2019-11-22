import { cache as urlsToCache } from "./UrlsToCache.json";
//const urlsToCache = ["./public"];
//const urlsToCache = ['replaceMe'];
console.log("CacheUrl ", urlsToCache);

const CACHE_NAME = "lemmas-cache-v1";

self.addEventListener("install", event => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => {
                console.log("Opened cache");
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting()) // для контроля sw сразу, а не после перезагрузки
    );
});

self.addEventListener("activate", event => {
    const cacheToKeep = urlsToCache;
    event.waitUntil(
        caches
            .keys()
            .then(keyList => {
                // очистка кеша
                return Promise.all(
                    keyList.map(key => {
                        if (cacheToKeep.indexOf(key) === -1) {
                            return caches.delete(key);
                        }
                    })
                );
            })
            .then(() => self.clients.claim()) // для контроля sw сразу, а не после перезагрузки
    );
});

self.addEventListener("fetch", event => {
    // обработка запросов
    console.log("fetch");
    event.respondWith(async () => {
        const cache = await caches.open(CACHE_NAME); // пробуем взять данные из кеша
        const cachedResponse = await cache.match(event.request);

        if (cachedResponse) {
            // если данные нашлись в кеше
            event.waitUntil(cache.add(event.request)); // обновляем данные в фоновом режиме
            return cachedResponse; // отдаем данные из кеша
        }

        // if (!navigator.onLine) {
        //     // если отсутствует интернет
        //     return Promise.resolve(
        //         new Response(JSON.stringify({ message: "No internet" }), {
        //             status: 400,
        //         })
        //     );
        // }

        return fetch(event.request); // иначе используем интернет
    });
});
