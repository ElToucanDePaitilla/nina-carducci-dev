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


$(document).ready(function() {
    $('.nav-pills .nav-link').on('click', function() {
        // Enlever la classe 'active' de tous les liens
        $('.nav-pills .nav-link').removeClass('active');
        
        // Ajouter la classe 'active' au lien cliqué
        $(this).addClass('active');
    });
});


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

