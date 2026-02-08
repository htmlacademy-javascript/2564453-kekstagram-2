const ALERT_SHOW_TIME = 5000;

const ALERT_TEMPLATES = {
  'error': 'error',
  'success': 'success',
  'data-error': 'data-error'
};

const showAlert = (message, alertType = 'data-error') => {
  const existingAlert = document.querySelector(`.${alertType}`);
  if (existingAlert) {
    existingAlert.remove();
  }

  const templateId = ALERT_TEMPLATES[alertType] || 'data-error';

  const template = document.querySelector(`#${templateId}`);

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

  const closeButton = addedAlert.querySelector(`.${alertType}__button`);
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      addedAlert.remove();
    });

    closeButton.focus();
  }

  const alertTimeout = setTimeout(() => {
    if (document.body.contains(addedAlert)) {
      addedAlert.remove();
    }
  }, ALERT_SHOW_TIME);

  addedAlert.dataset.timeoutId = alertTimeout;
};

export { showAlert, ALERT_SHOW_TIME };
