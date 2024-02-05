const CACHE_ELEMENTS = [
    "./",
];

const CACHE_NAME = "v1_cache_app_react";

this.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(CACHE_ELEMENTS).then(() => {
                this.skipWaiting();
            }).catch(console.log);
        })
    )
});


this.addEventListener("activate", (e) => {
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(cacheName => {
                return cacheWhiteList.indexOf(cacheName) === -1 && caches.delete(cacheName)
            }));
        }).then(() => this.clients.claim())
    )
});

this.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            if(res) {
                return res
            }
            return fetch(e.request);
        })
    )
});