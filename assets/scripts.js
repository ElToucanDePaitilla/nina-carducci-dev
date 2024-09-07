

$(document).ready(function() {
    $('.gallery').mauGallery({
        columns: {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3
        },
        lightBox: true,
        lightboxId: 'myAwesomeLightbox',
        showTags: true,
        tagsPosition: 'top'
    });
});

/*Gestion des états des boutons*/

$(document).ready(function() {
    $('.nav-pills .nav-link').on('click', function() {
        // Enlever la classe 'active' de tous les liens
        $('.nav-pills .nav-link').removeClass('active');
        
        // Ajouter la classe 'active' au lien cliqué
        $(this).addClass('active');
    });
});


/*Gestion des boutons du diaporama*/
$(document).ready(function() {
    let currentImageIndex = 0;

    // Fonction pour mettre à jour la liste des images visibles après filtrage
    function getVisibleImages() {
        return $('.gallery-item:visible'); // Ne sélectionne que les images visibles
    }

    // Fonction pour afficher une image dans la modale
    function showImage(index) {
        const visibleImages = getVisibleImages(); // Récupère les images visibles après filtrage
        const newImageSrc = $(visibleImages[index]).attr('src');
        $('.lightboxImage').attr('src', newImageSrc);
    }

    // Gestionnaire de clic pour une image dans la galerie
    $('.gallery-item').on('click', function() {
        const visibleImages = getVisibleImages(); // Récupère la liste des images visibles
        currentImageIndex = visibleImages.index(this); // Récupère l'index de l'image cliquée
        showImage(currentImageIndex); // Affiche l'image correspondante dans la modale
    });

    // Clic sur la flèche gauche (précédent)
    $('.mg-prev').on('click', function() {
        const visibleImages = getVisibleImages(); // Met à jour la liste des images visibles
        currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : visibleImages.length - 1;
        showImage(currentImageIndex);
    });

    // Clic sur la flèche droite (suivant)
    $('.mg-next').on('click', function() {
        const visibleImages = getVisibleImages(); // Met à jour la liste des images visibles
        currentImageIndex = (currentImageIndex < visibleImages.length - 1) ? currentImageIndex + 1 : 0;
        showImage(currentImageIndex);
    });
});


/*Mise en cache dynamique des images du site, durée 30 jours*/
$(document).ready(function () {
    // Fonction pour charger une image avec une version basée sur la date
    function loadImageWithCache(imageSelector) {
        // Obtenir la date actuelle
        const now = new Date();

        // Clé pour stocker la dernière date de mise à jour dans localStorage
        const lastUpdateKey = 'lastImageUpdate';

        // Clé pour stocker la version de l'image dans localStorage
        const versionKey = 'imageVersion';

        // Récupérer la date de la dernière mise à jour stockée dans localStorage
        const lastUpdate = localStorage.getItem(lastUpdateKey);

        // Récupérer la version actuelle de l'image, ou définir 1 si elle n'existe pas
        let imageVersion = localStorage.getItem(versionKey) || 1;

        // Vérifier si 30 jours se sont écoulés depuis la dernière mise à jour
        if (!lastUpdate || (now - new Date(lastUpdate)) > 30 * 24 * 60 * 60 * 1000) {
            // Si oui, mettre à jour la date de la dernière mise à jour dans localStorage
            localStorage.setItem(lastUpdateKey, now.toISOString());

            // Incrémenter la version de l'image
            imageVersion = parseInt(imageVersion) + 1;

            // Mettre à jour la version de l'image dans localStorage
            localStorage.setItem(versionKey, imageVersion);
        }

        // Récupérer l'URL actuelle de l'image depuis l'attribut src du DOM
        const imageUrl = $(imageSelector).attr('src');

        // Ajouter le paramètre de version à l'URL pour forcer le rechargement
        $(imageSelector).attr('src', imageUrl + "?v=" + imageVersion);
    }

    // Utilisation dynamique de la fonction pour toutes les images
    // Parcourir toutes les balises <img> et appliquer la gestion du cache
    $('img').each(function() {
        loadImageWithCache(this); // Charger chaque image avec le cache géré
    });
});
