import { createPictureElement } from './picture-thumbnails.js';

const RANDOM_PHOTOS_COUNT = 10;
const RERENDER_DELAY = 500;
const filtersContainer = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');
const picturesContainer = document.querySelector('.pictures');

let currentFilter = 'filter-default';
let timeoutId = null;

const getFilteredPhotos = (photos, filterType) => {
  const photosCopy = [...photos];

  switch (filterType) {
    case 'filter-random': {
      const shuffled = [...photos].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, Math.min(RANDOM_PHOTOS_COUNT, photos.length));
    }

    case 'filter-discussed': {
      const sortedPhotos = [...photosCopy];
      return sortedPhotos.sort((a, b) => b.comments.length - a.comments.length);
    }

    case 'filter-default':
    default: {
      return photosCopy;
    }
  }
};

const renderFilteredPhotos = (photos) => {
  const filteredPhotos = getFilteredPhotos(photos, currentFilter);

  const oldPictures = document.querySelectorAll('.picture');
  oldPictures.forEach((picture) => picture.remove());

  const fragment = document.createDocumentFragment();

  filteredPhotos.forEach((photo) => {
    const pictureElement = createPictureElement(photo);
    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

const updatePhotosDebounced = (photos) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    renderFilteredPhotos(photos);
    timeoutId = null;
  }, RERENDER_DELAY);
};

const setActiveFilter = (filterId) => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  const activeButton = document.querySelector(`#${filterId}`);
  if (activeButton) {
    activeButton.classList.add('img-filters__button--active');
  }
};

const onFilterClick = (photos, evt) => {
  const clickedButton = evt.target;

  if (!clickedButton.classList.contains('img-filters__button')) {
    return;
  }

  const clickedFilter = clickedButton.id;

  if (clickedFilter === 'filter-random') {
    currentFilter = clickedFilter;
    setActiveFilter(currentFilter);
    updatePhotosDebounced(photos);
    return;
  }

  if (clickedFilter !== currentFilter) {
    currentFilter = clickedFilter;
    setActiveFilter(currentFilter);
    updatePhotosDebounced(photos);
  }
};

const initFilters = (photos) => {
  if (!filtersContainer || !picturesContainer) {
    return;
  }

  filtersContainer.classList.remove('img-filters--inactive');

  filterButtons.forEach((button) => {
    const handleClick = (evt) => onFilterClick(photos, evt);
    button.addEventListener('click', handleClick);
  });

  setActiveFilter('filter-default');

  renderFilteredPhotos(photos);
};

export { initFilters };
