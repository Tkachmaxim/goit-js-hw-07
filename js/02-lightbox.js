import { galleryItems } from './gallery-items.js';

// Change code below this line

const galleryRef = document.querySelector('.gallery');

galleryRef.innerHTML = createMarkUp(galleryItems);

const imageRefs = document.querySelectorAll('.gallery__item');

const gallerySimple = new SimpleLightbox(imageRefs, {
    captionsData: 'alt',
    captionDelay: 250,
});

function createMarkUp(data) {
    return data
        .map(({ preview, original, description }) => {
            return `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" loading="lazy"/>
</a>`;
        })
        .join('');
}
