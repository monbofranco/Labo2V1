this.addEventListener('install', function(event) {
  console.log('[Service Worker] Installation en cours de v1');
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        console.log('[Service Worker] Mise en cache globale: app shell et contenu et tout et tout');
        return cache.addAll([
            '/Labo2v1/index.html',
            '/Labo2v1/style.css',
            '/Labo2v1/index.js',
            '/Labo2v1/banner1.jpg',
            '/Labo2v1/banneer2.webp',
            '/Labo2v1/beginnerguide.jpeg',
            '/Labo2v1/custom1.jpeg',
            '/Labo2v1/icones/icon-512x512.png',
            '/Labo2v1/bootstrap-5.1.3-dist/css/bootstrap.min.css',
            '/Labo2v1/icons-1.7.2/font/bootstrap-icons.css',
            '/Labo2v1/bootstrap-5.1.3-dist/js/bootstrap.bundle.min.js',
            '/Labo2v1/customv1.jpeg',
            '/Labo2v1/custom1.jpeg',
            '/Labo2v1/icone.jpg',
            '/Labo2v1/background.jpeg',
            '/Labo2v1/background.webp',
            
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