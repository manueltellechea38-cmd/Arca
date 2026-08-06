const CACHE_NAME = "woodmanager-v1";

const APP_SHELL = [
    "./",
    "./index.html",
    "./manifest.json",
    "./css/style.css",
    "./css/base.css",
    "./css/layout.css",
    "./css/components.css",
    "./css/dashboard.css",
    "./css/gastos.css",
    "./css/proyectos.css",
    "./css/responsive.css",
    "./js/app.js",
    "./js/core/navigation.js",
    "./js/core/state.js",
    "./js/core/storage.js",
    "./js/core/ui.js",
    "./js/modules/configuracion.js",
    "./js/modules/dashboard.js",
    "./js/modules/favoritos.js",
    "./js/modules/favoritos-view.js",
    "./js/modules/gastos.js",
    "./js/modules/proyectos.js",
    "./js/services/catalogo.js",
    "./data/proyectos.json",
    "./assets/icons/icon-180.png",
    "./assets/icons/icon-192.png",
    "./assets/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
    );

    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            )
        )
    );

    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
        return;
    }

    const requestUrl = new URL(event.request.url);
    const isSameOrigin = requestUrl.origin === self.location.origin;

    if (isSameOrigin && requestUrl.pathname.endsWith("proyectos.json")) {
        event.respondWith(networkFirst(event.request));
        return;
    }

    event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (error) {
        return caches.match("./index.html");
    }
}

async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (error) {
        return caches.match(request);
    }
}
