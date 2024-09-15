// Nom du cache
const CACHE_NAME = "nina-carducci-cache-v5";

// Liste des ressources à mettre en cache (y compris les nouvelles images)
const urlsToCache = [
  "./index.html",
  "./assets/style.min.css",
  "./assets/scripts.min.js",
  "./assets/bootstrap/bootstrap.bundle.min.js",
  // Images du slider
  "./assets/images/slider/nina-Carducci-entreprise-homme-se-rendant-au-bureau-W320.webp",
  "./assets/images/slider/nina-Carducci-entreprise-homme-se-rendant-au-bureau-W650.webp",
  "./assets/images/slider/nina-Carducci-entreprise-homme-se-rendant-au-bureau-W1000.webp",
  "./assets/images/slider/nina-Carducci-entreprise-homme-se-rendant-au-bureau-W1920.webp",
  "./assets/images/slider/nina-Carducci-mariage-couple-dansant-W320.webp",
  "./assets/images/slider/nina-Carducci-mariage-couple-dansant-W650.webp",
  "./assets/images/slider/nina-Carducci-mariage-couple-dansant-W1000.webp",
  "./assets/images/slider/nina-Carducci-mariage-couple-dansant-W1920.webp",
  "./assets/images/slider/nina-Carducci-portrait-homme-spectateur-concert-W320.webp",
  "./assets/images/slider/nina-Carducci-portrait-homme-spectateur-concert-W650.webp",
  "./assets/images/slider/nina-Carducci-portrait-homme-spectateur-concert-W1000.webp",
  "./assets/images/slider/nina-Carducci-portrait-homme-spectateur-concert-W1920.webp",
  // Images gallery
  "./assets/images/gallery/concerts/nina-carducci-photographe-evenement-spectacle-bordeaux-W650.webp",
  "./assets/images/gallery/concerts/nina-carducci-photographe-evenement-spectacle-bordeaux-W320.webp",
  "./assets/images/gallery/concerts/nina-carducci-photographe-evenement-spectacle-bordeaux-SQ650.webp",
  "./assets/images/gallery/concerts/nina-carducci-photographe-evenement-spectacle-bordeaux-SQ320.webp",
  "./assets/images/gallery/concerts/nina-carducci-photographe-evenement-concert-chanteur-W650.webp",
  "./assets/images/gallery/concerts/nina-carducci-photographe-evenement-concert-chanteur-W320.webp",
  "./assets/images/gallery/concerts/nina-carducci-photographe-evenement-concert-chanteur-SQ650.webp",
  "./assets/images/gallery/concerts/nina-carducci-photographe-evenement-concert-chanteur-SQ320.webp",
  "./assets/images/gallery/entreprise/nina-carducci-photographe-portrait-corporate-nouveau-directeur-W650.webp",
  "./assets/images/gallery/entreprise/nina-carducci-photographe-portrait-corporate-nouveau-directeur-SQ650.webp",
  "./assets/images/gallery/entreprise/nina-carducci-photographe-portrait-corporate-nouveau-directeur-W320.webp",
  "./assets/images/gallery/entreprise/nina-carducci-photographe-portrait-corporate-nouveau-directeur-SQ320.webp",
  "./assets/images/gallery/entreprise/nina-carducci-photographe-entreprise-vie-corporate-nouveaux-bureaux-portrait-presidente-W650.webp",
  "./assets/images/gallery/entreprise/nina-carducci-photographe-entreprise-vie-corporate-nouveaux-bureaux-portrait-presidente-SQ650.webp",
  "./assets/images/gallery/entreprise/nina-carducci-photographe-entreprise-vie-corporate-nouveaux-bureaux-portrait-presidente-SQ320.webp",
  "./assets/images/gallery/entreprise/nina-carducci-photographe-entreprise-vie-corporate-nouveaux-bureaux-portrait-presidente-W320.webp",
  "./assets/images/gallery/entreprise/nina-carducci-photographe-corporate-jeune-femme-au-bureaux-W650.webp",
  "./assets/images/gallery/entreprise/nina-carducci-photographe-corporate-jeune-femme-au-bureaux-W320.webp",
  "./assets/images/gallery/entreprise/nina-carducci-photographe-corporate-jeune-femme-au-bureaux-SQ650.webp",
  "./assets/images/gallery/entreprise/nina-carducci-photographe-corporate-jeune-femme-au-bureaux-SQ320.webp",
  "./assets/images/gallery/mariage/nina-carducci-photographe-shooting-jeune-couple-marié-W650.webp",
  "./assets/images/gallery/mariage/nina-carducci-photographe-shooting-jeune-couple-marié-SQ650.webp",
  "./assets/images/gallery/mariage/nina-carducci-photographe-album-cover-mariage-SQ650.webp",
  "./assets/images/gallery/mariage/nina-carducci-photographe-album-cover-mariage-W650.webp",
  "./assets/images/gallery/mariage/nina-carducci-photographe-shooting-jeune-couple-marié-SQ320.webp",
  "./assets/images/gallery/mariage/nina-carducci-photographe-album-cover-mariage-SQ320.webp",
  "./assets/images/gallery/portraits/nina-carducci-photographe-shooting-portrait-femme-SQ320.webp",
  "./assets/images/gallery/portraits/nina-carducci-photographe-shooting-portrait-femme-SQ650.webp",
  "./assets/images/gallery/portraits/nina-carducci-photographe-shooting-portrait-femme-W650.webp",
  "./assets/images/gallery/portraits/nina-carducci-photographe-shooting-portrait-homme-SQ320.webp",
  "./assets/images/gallery/portraits/nina-carducci-photographe-shooting-portrait-homme-SQ650.webp",
  "./assets/images/gallery/portraits/nina-carducci-photographe-shooting-portrait-homme-W650.webp",
  // Images main
  "./assets/images/main/appareil-photographe-SQ250.webp",
  "./assets/images/main/appareil-photographe-SQ500.webp",
  "./assets/images/main/appareil-photographe-SQ700.webp",
  "./assets/images/main/nina-carducci-photographe-SQ250.webp",
  "./assets/images/main/nina-carducci-photographe-SQ500.webp",
  "./assets/images/main/nina-carducci-photographe-SQ700.webp",
];

// Installation du Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Ouverture du cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Interception des requêtes réseau
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Activation du Service Worker et suppression des anciens caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
