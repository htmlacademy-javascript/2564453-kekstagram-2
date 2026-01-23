import { NAMES, MESSAGES, DESCRIPTIONS } from './constants.js';
import { getRandomInteger, getRandomArrayElement } from './util.js';

const getRandomDescription = () => getRandomArrayElement(DESCRIPTIONS);

const getRandomMessage = () => {
  const count = getRandomInteger(1, 2);
  const shuffled = [...MESSAGES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).join(' ');
};

export const createComment = () => {
  const commentId = getRandomInteger(1, 10000);

  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomMessage(),
    name: getRandomArrayElement(NAMES)
  };
};

export const createComments = () => {
  const commentsCount = getRandomInteger(0, 30);
  const comments = [];
  const usedIds = new Set();

  for (let i = 0; i < commentsCount; i++) {
    let comment;
    let attempts = 0;

    do {
      comment = createComment();
      attempts++;

      if (attempts > 100) {
        break;
      }
    } while (usedIds.has(comment.id));

    if (comment && !usedIds.has(comment.id)) {
      usedIds.add(comment.id);
      comments.push(comment);
    }
  }

  return comments;
};

export const createPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomDescription(),
  likes: getRandomInteger(15, 200),
  comments: createComments()
});

export const createPhotosArray = () =>
  Array.from({ length: 25 }, (_, index) => createPhoto(index + 1));
