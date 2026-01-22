import { createPhotosArray } from './data.js';
import { initPictureThumbnails } from './picture-thumbnails.js';
import { initFullPicture } from './full-picture.js';
import { initGallery } from './gallery.js';

// Создаем массив фотографий
window.photosArray = createPhotosArray();

// Отрисовка миниатюр
initPictureThumbnails();

// Инициализация полноразмерного просмотра
initFullPicture();

// Инициализация галереи
initGallery();
