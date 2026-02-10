const ALERT_SHOW_TIME = 5000;
const ALERT_TEMPLATES = {
  'error': 'error',
  'success': 'success',
  'data-error': 'data-error'
};
const TEMPLATES_CACHE = {};

const initTemplatesCache = () => {
  Object.entries(ALERT_TEMPLATES).forEach(([type, templateId]) => {
    const template = document.querySelector(`#${templateId}`);
    if (template) {
      TEMPLATES_CACHE[type] = template;
    }
  });
};

initTemplatesCache();

const showAlert = (message, alertType = 'data-error') => {
  const existingAlert = document.querySelector(`.${alertType}`);
  if (existingAlert) {
    existingAlert.remove();
  }

  const template = TEMPLATES_CACHE[alertType];
  if (!template) {
    return;
  }

  const alertElement = template.content.cloneNode(true);

  const titleElement = alertElement.querySelector(`.${alertType}__title`);
  if (titleElement) {
    titleElement.textContent = message;
  }

  document.body.appendChild(alertElement);

  const addedAlert = document.querySelector(`.${alertType}`);
  if (!addedAlert) {
    return;
  }

  const closeAlert = () => {
    if (addedAlert.dataset.timeoutId) {
      clearTimeout(parseInt(addedAlert.dataset.timeoutId, 10));
    }
    addedAlert.remove();
  };

  const closeButton = addedAlert.querySelector(`.${alertType}__button`);
  if (closeButton) {
    closeButton.addEventListener('click', closeAlert);
    closeButton.focus();
  }

  const escKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      closeAlert();
      document.removeEventListener('keydown', escKeydownHandler);
    }
  };

  const overlayClickHandler = (evt) => {
    if (evt.target === addedAlert) {
      closeAlert();
      addedAlert.removeEventListener('click', overlayClickHandler);
    }
  };

  document.addEventListener('keydown', escKeydownHandler);
  addedAlert.addEventListener('click', overlayClickHandler);

  const alertTimeout = setTimeout(() => {
    if (document.body.contains(addedAlert)) {
      closeAlert();
      document.removeEventListener('keydown', escKeydownHandler);
      addedAlert.removeEventListener('click', overlayClickHandler);
    }
  }, ALERT_SHOW_TIME);

  addedAlert.dataset.timeoutId = alertTimeout;
};

export { showAlert, ALERT_SHOW_TIME };
