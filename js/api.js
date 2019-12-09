import Api from './classes/api.js';

const api = new Api({
  baseUrl: 'http://95.216.175.5/cohort5',
  headers: {
    authorization: 'e134e466-0907-4295-97e0-192a3646d282',
    'Content-Type': 'application/json',
  },
});

export default api;
