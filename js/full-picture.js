const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentCount = document.querySelector('.social__comment-count');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;

const COMMENTS_PER_PORTION = 5;
let currentComments = [];
let shownCommentsCount = 0;

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

const updateCommentsCounter = () => {
  commentShownCount.textContent = shownCommentsCount;
  commentTotalCount.textContent = currentComments.length;
};

const showNextComments = () => {
  const nextCommentsCount = Math.min(
    COMMENTS_PER_PORTION,
    currentComments.length - shownCommentsCount
  );

  const commentsToShow = currentComments.slice(
    shownCommentsCount,
    shownCommentsCount + nextCommentsCount
  );

  commentsToShow.forEach((comment) => {
    socialComments.appendChild(createComment(comment));
  });

  shownCommentsCount += commentsToShow.length;
  updateCommentsCounter();

  if (shownCommentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const renderComments = (comments) => {
  socialComments.innerHTML = '';
  currentComments = comments;
  shownCommentsCount = 0;
  commentCount.classList.remove('hidden');
  showNextComments();
};

const escKeydownHandler = (evt) => {
  if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
    evt.preventDefault();
    closeFullPicture();
  }
};

const overlayClickHandler = (evt) => {
  if (evt.target === bigPicture) {
    closeFullPicture();
  }
};

function closeFullPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', escKeydownHandler);
  bigPicture.removeEventListener('click', overlayClickHandler);
  cancelButton.removeEventListener('click', closeFullPicture);
  commentsLoader.removeEventListener('click', showNextComments);
  currentComments = [];
  shownCommentsCount = 0;
}

const openFullPicture = (photo) => {
  bigPictureImage.src = photo.url;
  bigPictureImage.alt = photo.description;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;
  renderComments(photo.comments);
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', escKeydownHandler);
  bigPicture.addEventListener('click', overlayClickHandler);
  cancelButton.addEventListener('click', closeFullPicture);
  commentsLoader.addEventListener('click', showNextComments);
};

export { openFullPicture, closeFullPicture };
