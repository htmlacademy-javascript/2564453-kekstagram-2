const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const normalizeHashtags = (hashtagsString) => hashtagsString
  .toLowerCase()
  .split(' ')
  .filter((tag) => tag.trim() !== '');

const validateSingleHashtag = (hashtag) => {
  if (hashtag === '') {
    return true;
  }

  if (hashtag[0] !== '#') {
    return false;
  }

  if (hashtag.length === 1) {
    return false;
  }

  if (hashtag.length > MAX_HASHTAG_LENGTH) {
    return false;
  }

  if (!HASHTAG_REGEX.test(hashtag)) {
    return false;
  }

  return true;
};

const validateHashtags = (value) => {
  const hashtags = normalizeHashtags(value);

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  for (const hashtag of hashtags) {
    if (!validateSingleHashtag(hashtag)) {
      return false;
    }
  }

  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  return true;
};

// Сообщения об ошибках
const getHashtagErrorMessage = (value) => {
  const hashtags = normalizeHashtags(value);

  if (hashtags.length > MAX_HASHTAGS) {
    return `Максимум ${MAX_HASHTAGS} хэштегов`;
  }

  for (const hashtag of hashtags) {
    if (hashtag === '') {
      continue;
    }

    if (hashtag[0] !== '#') {
      return 'Хэштег должен начинаться с #';
    }

    if (hashtag.length === 1) {
      return 'Хэштег не может быть только #';
    }

    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      return `Максимальная длина хэштега ${MAX_HASHTAG_LENGTH} символов`;
    }

    if (!HASHTAG_REGEX.test(hashtag)) {
      return 'После # только буквы и цифры';
    }
  }

  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return 'Хэштеги не должны повторяться';
  }

  return 'Некорректный формат хэштега';
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

const getCommentErrorMessage = () => `Комментарий не может быть длиннее ${MAX_COMMENT_LENGTH} символов`;

const pristine = new window.Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error-text'
});

pristine.addValidator(hashtagsInput, validateHashtags, getHashtagErrorMessage);
pristine.addValidator(descriptionInput, validateComment, getCommentErrorMessage);

// Esc не закрывает форму при фокусе в полях
const onHashtagsKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const onCommentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

// Обработчик отправки формы
const onFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

const initFormValidation = () => {
  pristine.reset();
  uploadForm.addEventListener('submit', onFormSubmit);
  hashtagsInput.addEventListener('keydown', onHashtagsKeydown);
  descriptionInput.addEventListener('keydown', onCommentKeydown);
};

const resetFormValidation = () => {
  pristine.reset();
  uploadForm.removeEventListener('submit', onFormSubmit);
  hashtagsInput.removeEventListener('keydown', onHashtagsKeydown);
  descriptionInput.removeEventListener('keydown', onCommentKeydown);
};

export { initFormValidation, resetFormValidation };
