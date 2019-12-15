import Api from './classes/api.js';

const serverUrl =
  NODE_ENV === 'development' ? 'http://praktikum.tk/cohort5' : 'https://praktikum.tk/cohort5';

const api = new Api({
  baseUrl: serverUrl,
  headers: {
    authorization: 'e134e466-0907-4295-97e0-192a3646d282',
    'Content-Type': 'application/json',
  },
});

export default api;
