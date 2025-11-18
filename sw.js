const CACHE_NAME = "kamus-cache-v4";
const FILES = [
  "/Kamus/",
  "/Kamus/index.html",
  "/Kamus/style.css",
  "/Kamus/app.js",
  "/Kamus/manifest.json",
  "/Kamus/iconKamusTempat-192.png",
  "/Kamus/iconKamusTempat-512.png"
];

self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=> (k!==CACHE_NAME? caches.delete(k):null)))));
  self.clients.claim();
});

self.addEventListener("fetch", e=>{
  e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)));
});

