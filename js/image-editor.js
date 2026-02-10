import '../vendor/nouislider/nouislider.js';

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;
const EFFECTS = {
  none: {
    name: 'none',
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  chrome: {
    name: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    name: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    name: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    name: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    name: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');

let currentScale = SCALE_DEFAULT;
let currentEffect = EFFECTS.none;
let slider = null;

//Масштабирование изображения
const updateScale = () => {
  scaleValueInput.value = `${currentScale}%`;
  imagePreview.style.transform = `scale(${currentScale / 100})`;
};

const decreaseScale = () => {
  if (currentScale > SCALE_MIN) {
    currentScale -= SCALE_STEP;
    updateScale();
  }
};

const increaseScale = () => {
  if (currentScale < SCALE_MAX) {
    currentScale += SCALE_STEP;
    updateScale();
  }
};

const resetScale = () => {
  currentScale = SCALE_DEFAULT;
  updateScale();
};

//Наложение эффектов на изображение
const updateEffect = (value) => {
  if (currentEffect.name === 'none') {
    imagePreview.style.filter = 'none';
    return;
  }

  imagePreview.style.filter = `${currentEffect.filter}(${value}${currentEffect.unit})`;
};

const createSlider = () => {
  if (slider) {
    slider.destroy();
    slider = null;
  }

  // Если выбран эффект "Оригинал", скрываем слайдер
  if (currentEffect.name === 'none') {
    effectLevelSliderContainer.classList.add('hidden');
    effectLevelValue.value = '';
    imagePreview.style.filter = 'none';
    return;
  }

  effectLevelSliderContainer.classList.remove('hidden');

  slider = window.noUiSlider.create(effectLevelSlider, {
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
  });

  slider.on('update', () => {
    const sliderValue = slider.get();
    effectLevelValue.value = sliderValue;
    updateEffect(sliderValue);
  });
};

const onEffectChange = (evt) => {
  if (evt.target.type === 'radio') {
    currentEffect = EFFECTS[evt.target.value];

    if (currentEffect.name !== 'none') {
      effectLevelValue.value = currentEffect.max;
    }

    createSlider();

    updateEffect(currentEffect.name === 'none' ? 0 : currentEffect.max);
  }
};

// Функция инициализации редактора (при открытии формы)
const initEditor = () => {
  resetScale();

  //эффект "Оригинал" по умолчанию
  const noneEffect = document.querySelector('#effect-none');
  if (noneEffect) {
    noneEffect.checked = true;
  }
  currentEffect = EFFECTS.none;

  createSlider();

  updateEffect(0);

  scaleSmallerButton.addEventListener('click', decreaseScale);
  scaleBiggerButton.addEventListener('click', increaseScale);
  effectsList.addEventListener('change', onEffectChange);
};

const resetEditor = () => {
  resetScale();

  const noneEffect = document.querySelector('#effect-none');
  if (noneEffect) {
    noneEffect.checked = true;
  }
  currentEffect = EFFECTS.none;

  if (slider) {
    slider.destroy();
    slider = null;
  }

  scaleSmallerButton.removeEventListener('click', decreaseScale);
  scaleBiggerButton.removeEventListener('click', increaseScale);
  effectsList.removeEventListener('change', onEffectChange);

  effectLevelSliderContainer.classList.add('hidden');
  imagePreview.style.filter = 'none';
  effectLevelValue.value = '';
};

export { initEditor, resetEditor };
