// Nom du cache
const CACHE_NAME = "nina-carducci-cache-v14";

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
  "./assets/images/slider/nina-Carducci-entreprise-homme-se-rendant-au-bureau-light.jpg",
  "./assets/images/slider/nina-Carducci-mariage-couple-dansant-W320.webp",
  "./assets/images/slider/nina-Carducci-mariage-couple-dansant-W650.webp",
  "./assets/images/slider/nina-Carducci-mariage-couple-dansant-W1000.webp",
  "./assets/images/slider/nina-Carducci-mariage-couple-dansant-W1920.webp",
  "./assets/images/slider/nina-Carducci-mariage-couple-dansant-light.jpg",
  "./assets/images/slider/nina-Carducci-portrait-homme-spectateur-concert-W320.webp",
  "./assets/images/slider/nina-Carducci-portrait-homme-spectateur-concert-W650.webp",
  "./assets/images/slider/nina-Carducci-portrait-homme-spectateur-concert-W1000.webp",
  "./assets/images/slider/nina-Carducci-portrait-homme-spectateur-concert-W1920.webp",
  "./assets/images/slider/nina-Carducci-portrait-homme-spectateur-concert-light.jpg",
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
