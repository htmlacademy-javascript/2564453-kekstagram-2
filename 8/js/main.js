// main.js
import { closeUploadForm } from './upload-form.js';
import { initPictureThumbnails } from './picture-thumbnails.js';
import { initGallery } from './gallery.js';
import { createPhotosArray } from './data.js';
import { resetEditor } from './image-editor.js';

// Инициализация данных
window.photosArray = createPhotosArray();

// Инициализация галереи
initGallery();
initPictureThumbnails();

//для использования в других модулях
export { closeUploadForm, resetEditor };
