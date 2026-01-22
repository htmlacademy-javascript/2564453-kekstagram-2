import { createPhotosArray } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const initPictureThumbnails = () => {
  const photos = createPhotosArray();
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const pictureImage = pictureElement.querySelector('.picture__img');
    const pictureComments = pictureElement.querySelector('.picture__comments');
    const pictureLikes = pictureElement.querySelector('.picture__likes');

    pictureElement.dataset.photoId = photo.id;

    pictureImage.src = photo.url;
    pictureImage.alt = photo.description;
    pictureComments.textContent = photo.comments.length;
    pictureLikes.textContent = photo.likes;

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

export { initPictureThumbnails };
