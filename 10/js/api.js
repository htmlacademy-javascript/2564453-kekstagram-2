const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные. Попробуйте еще раз',
  [Method.POST]: 'Ошибка отправки'
};

const load = async (route, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, {
      method,
      body
    });

    if (!response.ok) {
      let errorMessage = ErrorText[method];
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = ErrorText[method];
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    const errorMessage = error.message || ErrorText[method];
    throw new Error(errorMessage);
  }
};

const getData = async () => await load(Route.GET_DATA, Method.GET);

const sendData = async (body) => await load(Route.SEND_DATA, Method.POST, body);

export { getData, sendData };
