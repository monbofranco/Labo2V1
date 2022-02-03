this.addEventListener('install', function(event) {
  console.log('[Service Worker] Installation en cours de v1');
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        console.log('[Service Worker] Mise en cache globale: app shell et contenu et tout et tout');
        return cache.addAll([
          './index.html',
          './style.css',
          './index.js',
          './banner1.jpg',
          './banneer2.webp',
          './beginnerguide.jpeg',
          './customv1.jpeg',
          './custom1.jpeg',
          './background.jpeg',
          './manifest.json',
          './icon-192x192.png',
          './icon-256x256.png',
          './icon-384x384.png',
          './icon-512x512.png',


        
        ]);
      })
    );
  });

  self.addEventListener('fetch', (event) => {
    event.respondWith( caches.match(event.request).then((response) => {
      if (response !== undefined) {
        return response;
      } 
      else {
        return fetch(event.request).then(function (response) {
          let responseClone = response.clone();
  
          caches.open('v1').then(function (cache) {
            cache.put(event.request, responseClone);
          });
  
          return response;
        });
      }
    }));
  });

  this.addEventListener('activate', (e) => {
  console.log('Service worker activé, all good !');
});