this.addEventListener('install', function(event) {
  console.log('[Service Worker] Installation en cours de v1');
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        console.log('[Service Worker] Mise en cache globale: app shell et contenu et tout et tout');
        return cache.addAll([
            'index.html',
            'style.css',
            'index.js',
            'banner1.jpg',
            'banneer2.webp',
            'beginnerguide.jpeg',
            'custom1.jpeg',
            'icon-512x512.png',
            'icons-1.7.2/font/bootstrap-icons.css',
            'customv1.jpeg',
            'custom1.jpeg',
            'icone.jpg',
            'background.jpeg',
            'background.webp',
            
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
  console.log('Service worker activated !');
});

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(reg) {
      // registration worked
      console.log('Enregsistrement réussi !. Scope is ' + reg.scope);
  }).catch(function(error) {
      // registration failed
      console.log('Erreur ' + error);
    });
  };


// Initialise la variable pour l'utiliser plus tard afin d'afficher une invitation a installer la PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
// Empêcher la mini-barre d'information d'apparaître sur mobile si deja installée
e.preventDefault();
// Réserve l'événement pour qu'il puisse être déclenché plus tard
deferredPrompt = e;
// Informe l'utilisateur qu'il peut installer la PWA avec une fenêtre
installApp();

console.log(`'beforeinstallprompt' a été déclenché !`);

// Fonction qui renvoie a l'installation de l'application quand le boutton "Installer" est cliqué !
  appButton.addEventListener('click', function() {
    deferredPrompt.prompt();
  })

});

// Fonction qui affiche une fenêtre a l'ouverture de la page pour informer l'utilisateur de la possibilité d'installer cette PWA
// Possible de faire autrement, mais le toast de bootstrap est assez simple a utiliser

function installApp() {
console.log('ça marche?');
const fenetre = document.getElementById('message')
const toast = new bootstrap.Toast(fenetre, {delay: 6000}) //reste affichée 6 secondes seulement
toast.show();
};