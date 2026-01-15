import { createPhotosArray } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

// Функция отрисовки миниатюр
const initPictureThumbnails = () => {
  // Получаем массив фотографий
  const photos = createPhotosArray();

  // Создание миниатюр для каждой фотографии в массиве с описанием и тд
  photos.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const pictureImage = pictureElement.querySelector('.picture__img');
    const pictureComments = pictureElement.querySelector('.picture__comments');
    const pictureLikes = pictureElement.querySelector('.picture__likes');

    pictureImage.src = photo.url;
    pictureImage.alt = photo.description;
    pictureComments.textContent = photo.comments.length;
    pictureLikes.textContent = photo.likes;

    picturesContainer.appendChild(pictureElement);
  });
};

// Экспортируем функцию для использования в main.js
export { initPictureThumbnails };
