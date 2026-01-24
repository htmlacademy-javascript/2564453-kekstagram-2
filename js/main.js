import { createPhotosArray } from './data.js';
import { initPictureThumbnails } from './picture-thumbnails.js';
import { initGallery } from './gallery.js';

window.photosArray = createPhotosArray();

initPictureThumbnails();
initGallery();
