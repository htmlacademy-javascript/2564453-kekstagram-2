import { initEditor, resetEditor } from './image-editor.js';
import { initFormValidation, resetFormValidation } from './form-validation.js';
import { sendData } from './api.js';
import { showAlert } from './alert.js';

const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const body = document.body;
const submitButton = uploadForm.querySelector('.img-upload__submit');
const previewImg = uploadOverlay.querySelector('.img-upload__preview img');
const scaleInput = document.querySelector('.scale__control--value');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

let isSending = false;

const blockForm = () => {
  isSending = true;
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
  submitButton.classList.add('img-upload__submit--disabled');
  uploadInput.disabled = true;
  uploadCancelButton.disabled = true;

  const formControls = uploadForm.querySelectorAll('input, textarea, button:not(.img-upload__submit)');
  formControls.forEach((control) => {
    control.disabled = true;
  });
};

const unblockForm = () => {
  isSending = false;
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
  submitButton.classList.remove('img-upload__submit--disabled');
  uploadInput.disabled = false;
  uploadCancelButton.disabled = false;

  const formControls = uploadForm.querySelectorAll('input, textarea, button:not(.img-upload__submit)');
  formControls.forEach((control) => {
    control.disabled = false;
  });
};

const resetEffectPreviews = () => {
  const effectPreviews = document.querySelectorAll('.effects__preview');
  const defaultImage = 'img/upload-default-image.jpg';

  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${defaultImage})`;
  });
};

const resetForm = () => {
  uploadForm.reset();
  uploadInput.value = '';

  if (previewImg) {
    if (previewImg.src.startsWith('blob:')) {
      URL.revokeObjectURL(previewImg.src);
    }
    previewImg.src = 'img/upload-default-image.jpg';
  }

  resetEffectPreviews();
  resetEditor();
  resetFormValidation();
  unblockForm();
};

const onSuccess = () => {
  showAlert('Фото загружено!', 'success');
  closeUploadForm();
};

const onError = (message) => {
  showAlert(message, 'error');
  unblockForm();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !uploadOverlay.classList.contains('hidden')) {
    const errorMessage = document.querySelector('.error');

    if (errorMessage) {
      return;
    }

    evt.preventDefault();
    closeUploadForm();
  }
};

const onOverlayClick = (evt) => {
  if (evt.target === uploadOverlay) {
    const errorMessage = document.querySelector('.error');
    if (errorMessage) {
      return;
    }

    closeUploadForm();
  }
};

async function onFormSubmit(evt) {
  evt.preventDefault();

  if (isSending) {
    return;
  }

  if (window.pristine && !window.pristine.validate()) {
    return;
  }

  blockForm();

  const formData = new FormData();

  const file = uploadInput.files[0];
  if (file) {
    formData.append('filename', file);
  } else {
    onError('Выберите изображение для загрузки');
    unblockForm();
    return;
  }

  formData.append('scale', scaleInput ? scaleInput.value : '100%');

  const effectInput = document.querySelector('.effects__radio:checked');
  formData.append('effect', effectInput ? effectInput.value : 'none');

  const hashtags = hashtagsInput ? hashtagsInput.value : '';
  const description = descriptionInput ? descriptionInput.value : '';

  if (hashtags) {
    formData.append('hashtags', hashtags);
  }

  if (description) {
    formData.append('description', description);
  }

  try {
    await sendData(formData);
    onSuccess();
  } catch (error) {
    onError(error.message);
  }
}

function closeUploadForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  resetForm();
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadOverlay.removeEventListener('click', onOverlayClick);
  uploadCancelButton.removeEventListener('click', closeUploadForm);
  uploadForm.removeEventListener('submit', onFormSubmit);
}

const updateEffectPreviews = (imageUrl) => {
  const effectPreviews = document.querySelectorAll('.effects__preview');

  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${imageUrl})`;
  });
};

const onFileInputChange = () => {
  const file = uploadInput.files[0];
  if (file) {
    if (file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);

      if (previewImg) {
        previewImg.src = imageUrl;
      }

      updateEffectPreviews(imageUrl);

      uploadOverlay.classList.remove('hidden');
      body.classList.add('modal-open');
      initEditor();
      initFormValidation();
      document.addEventListener('keydown', onDocumentKeydown);
      uploadOverlay.addEventListener('click', onOverlayClick);
      uploadCancelButton.addEventListener('click', closeUploadForm);
      uploadForm.addEventListener('submit', onFormSubmit);

    } else {
      showAlert('Только изображения!', 'error');
      uploadInput.value = '';
    }
  }
};

uploadCancelButton.addEventListener('click', closeUploadForm);
uploadInput.addEventListener('change', onFileInputChange);

export { closeUploadForm, resetForm, onFormSubmit };
