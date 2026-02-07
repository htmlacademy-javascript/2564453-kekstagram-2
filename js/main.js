import { closeUploadForm } from './upload-form.js';
import { initPictureThumbnails } from './picture-thumbnails.js';
import { initGallery } from './gallery.js';
import { resetEditor } from './image-editor.js';
import { getData } from './api.js';
import { showAlert } from './alert.js';

const initApp = async () => {
  try {
    window.photosArray = await getData();
    initPictureThumbnails();
    initGallery();
  } catch (error) {
    showAlert(error.message, 'data-error');
    window.photosArray = [];
  }
};

initApp();

export { closeUploadForm, resetEditor };
