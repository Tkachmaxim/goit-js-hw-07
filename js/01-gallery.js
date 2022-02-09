import { galleryItems } from './gallery-items.js';

// Change code below this line

const galleryRef = document.querySelector('.gallery');

var activeRef = '';

galleryRef.innerHTML = createMarkUp(galleryItems);
galleryRef.addEventListener('click', onGalleryRefClick);

const modalWindow = {
    link: null,
    instance: '',
    createInstance() {
        this.instance = basicLightbox.create(
            `<img src="${this.link}" width="800" height="600">`,
            {
                onShow: instance => {
                    window.addEventListener('keydown', closeEscape);
                },
                onClose: instance => {
                    window.removeEventListener('keydown', closeEscape);
                    console.log('removed');
                },
            },
        );
    },
};

function closeEscape(evt) {
    if (evt.code === 'Escape') {
        modalWindow.instance.close();
    }
}

function checkLazyLoad() {
    if ('loading' in HTMLImageElement.prototype) {
        return true;
    } else {
        const script = document.createElement('script');
        script.src =
            'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        script.integrity =
            'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
        script.crossOrigin = 'anonymous';
        script.referrerpolicy = 'no-referrer';
        document.body.appendChild(script);
        return false;
    }
}

function createMarkUp(data) {
    if (checkLazyLoad()) {
        return data
            .map(({ preview, original, description }) => {
                return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      height='340'
      loading='lazy'
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
            })
            .join('');
    } else {
        return data
            .map(({ preview, original, description }) => {
                return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      height='340'
      loading='lazy'
      class='lazyload'
      data-src='${preview}'
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
            })
            .join('');
    }
}

function onGalleryRefClick(evt) {
    evt.preventDefault();
    const elementOnClick = evt.target;
    if (elementOnClick.classList.value !== 'gallery__image') {
        return;
    }
    const imageRefOriginal = elementOnClick.dataset.source;
    modalWindow.link = imageRefOriginal;
    modalWindow.createInstance();
    modalWindow.instance.show();
}
