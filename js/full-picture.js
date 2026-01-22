const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentCount = bigPicture.querySelector('.social__comment-count');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;

const createComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatar = document.createElement('img');
  avatar.classList.add('social__picture');
  avatar.src = comment.avatar;
  avatar.alt = comment.name;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.message;

  commentElement.appendChild(avatar);
  commentElement.appendChild(text);

  return commentElement;
};

const renderComments = (comments) => {
  socialComments.innerHTML = '';

  comments.forEach((comment) => {
    socialComments.appendChild(createComment(comment));
  });

  commentShownCount.textContent = comments.length;
  commentTotalCount.textContent = comments.length;
};

const openFullPicture = (photo) => {
  bigPictureImage.src = photo.url;
  bigPictureImage.alt = photo.description;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;

  renderComments(photo.comments);

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.classList.remove('hidden');


  body.classList.add('modal-open');
};

const closeFullPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
    evt.preventDefault();
    closeFullPicture();
  }
};

const onOverlayClick = (evt) => {
  if (evt.target === bigPicture) {
    closeFullPicture();
  }
};

const initFullPicture = () => {
  cancelButton.addEventListener('click', () => {
    closeFullPicture();
  });

  bigPicture.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { initFullPicture, openFullPicture, closeFullPicture };
