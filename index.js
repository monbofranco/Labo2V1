if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(reg) {
      // registration worked
      console.log('Yes ! Enregsistrement réussi !. Scope is ' + reg.scope);
  }).catch(function(error) {
      // registration failed
      console.log('Aie Aie erreur ' + error);
    });
  };


// Initialise la variable pour l'utiliser plus tard afin d'afficher une invitation a installer la PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  showInstallPromotion();
  // Optionally, send analytics event that PWA install promo was shown.
  console.log(`'beforeinstallprompt' event was fired.`);
});

// Fonction qui affiche une fenêtre a l'ouverture de la page pour informer l'utilisateur de la possibilité d'installer cette PWA
// Possible de faire autrement, mais le toast de bootstrap est assez simple a utiliser

function installApp() {
console.log('hey ma fenetre marche!');
const fenetre = document.getElementById('message')
const toast = new bootstrap.Toast(fenetre, {delay: 6000}) //reste affichée 6 secondes seulement
toast.show();
};
