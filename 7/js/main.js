import { createPhotosArray } from './data.js';
import { initPictureThumbnails } from './picture-thumbnails.js';
import { initFullPicture } from './full-picture.js';
import { initGallery } from './gallery.js';

window.photosArray = createPhotosArray();

initPictureThumbnails();
initFullPicture();
initGallery();
