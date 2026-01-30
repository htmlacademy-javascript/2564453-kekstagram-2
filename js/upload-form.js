import { initEditor, resetEditor } from './image-editor.js';
import { initFormValidation, resetFormValidation } from './form-validation.js';

const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const body = document.body;

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadForm.reset();
  uploadInput.value = '';

  resetEditor();
  resetFormValidation();

  document.removeEventListener('keydown', escKeydownHandler);
  uploadOverlay.removeEventListener('click', overlayClickHandler);
  uploadCancelButton.removeEventListener('click', closeUploadForm);
};

const handleFileChange = () => {
  const file = uploadInput.files[0];
  if (file) {
    if (file.type.startsWith('image/')) {
      uploadOverlay.classList.remove('hidden');
      body.classList.add('modal-open');

      initEditor();
      initFormValidation();

      document.addEventListener('keydown', escKeydownHandler);
      uploadOverlay.addEventListener('click', overlayClickHandler);
      uploadCancelButton.addEventListener('click', closeUploadForm);

      const previewImg = uploadOverlay.querySelector('.img-upload__preview img');
      const reader = new FileReader();

      reader.onload = (e) => {
        previewImg.src = e.target.result;
      };

      reader.readAsDataURL(file);
    } else {
      uploadInput.value = '';
    }
  }
};

function escKeydownHandler(evt) {
  if (evt.key === 'Escape' && !uploadOverlay.classList.contains('hidden')) {
    evt.preventDefault();
    closeUploadForm();
  }
}

function overlayClickHandler(evt) {
  if (evt.target === uploadOverlay) {
    closeUploadForm();
  }
}

uploadInput.addEventListener('change', handleFileChange);

export { closeUploadForm };
