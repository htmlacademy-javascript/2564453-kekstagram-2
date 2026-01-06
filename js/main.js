// Константы данных
const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Закат на море',
  'Горный пейзаж',
  'Уличная фотография',
  'Портрет друга',
  'Архитектура города',
  'Природа весной',
  'Путешествие по миру',
  'Фото еды',
  'Животные в дикой природе',
  'Спортивный момент',
  'Концерт живой музыки',
  'Фестиваль красок',
  'Зимняя сказка',
  'Осенний лес',
  'Ночной город'
];

// Функции-утилиты
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const getRandomDescription = () => getRandomArrayElement(DESCRIPTIONS);

const getRandomMessage = () => {
  // 1 или 2 случайных сообщения
  const count = getRandomInteger(1, 2);
  const shuffled = [...MESSAGES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).join(' ');
};

// Создание одного комментария
const createComment = () => {
  // уникальный ID для комментария
  const commentId = getRandomInteger(1, 10000);

  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomMessage(),
    name: getRandomArrayElement(NAMES)
  };
};

// Создание массива комментариев с уникальными ID
const createComments = () => {
  const commentsCount = getRandomInteger(0, 30);
  const comments = [];
  const usedIds = new Set();

  for (let i = 0; i < commentsCount; i++) {
    let comment;
    let attempts = 0;

    // Попытка создать комментарий с уникальным ID
    do {
      comment = createComment();
      attempts++;

      // Если слишком много попыток, выходим из цикла
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

// Создание одного объекта фотографии
const createPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomDescription(),
  likes: getRandomInteger(15, 200),
  comments: createComments()
});

// Создание массива из 25 фотографий
const createPhotosArray = () =>
  Array.from({ length: 25 }, (_, index) => createPhoto(index + 1));

// Создаем массив фотографий и делаем его глобально доступным
window.photosArray = createPhotosArray();

// Для проверки
/*console.log('Массив фотографий создан:', window.photosArray);
console.log(`Создано ${window.photosArray.length} фотографий`);
window.photosArray.forEach((photo, index) => {
  console.log(`Фото ${index + 1}: ${photo.description}, лайков: ${photo.likes}, комментариев: ${photo.comments.length}`);
});*/
