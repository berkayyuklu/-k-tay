const CACHE_NAME = 'music-player-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
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
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

---

## **İkonlar için:**

İki yöntem var:

### **1. Hızlı Çözüm (Placeholder):**
İki dosya oluştur: `icon-192.png` ve `icon-512.png`

Şu siteden indir:
- https://via.placeholder.com/192x192/1DB954/FFFFFF?text=🎵
- https://via.placeholder.com/512x512/1DB954/FFFFFF?text=🎵

### **2. Gerçek İkon:**
- Canva'da 512x512 yeşil arka plan + müzik ikonu yap
- https://realfavicongenerator.net/ sitesinde farklı boyutları oluştur

---

## **Dosya Yapısı:**
```
music-player/
├── index.html       ✅ (yukarıda verdim)
├── manifest.json    ✅ (bu dosya)
├── sw.js           ✅ (bu dosya)
├── icon-192.png    🎨 (kendin oluştur)
└── icon-512.png    🎨 (kendin oluştur)
