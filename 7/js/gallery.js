import { openFullPicture } from './full-picture.js';

const initGallery = () => {
  const picturesContainer = document.querySelector('.pictures');

  //делегирование событий
  picturesContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('.picture');

    if (thumbnail) {
      evt.preventDefault();

      const photoId = parseInt(thumbnail.dataset.photoId, 10);

      const photo = window.photosArray.find((item) => item.id === photoId);

      if (photo) {
        openFullPicture(photo);
      }
    }
  });
};

export { initGallery };
