
import { API_KEY } from '@env';
import axios from 'axios';

const http = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


http.interceptors.request.use(
  (config) => {
    if (!config.params) {
      config.params = {};
    }

    config.params['api_key'] = API_KEY;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('HTTP Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default http;
