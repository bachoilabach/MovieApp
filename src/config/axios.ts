
import { API_KEY } from '@env';
import axios from 'axios';
import Toast from 'react-native-toast-message';

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

    config.params['api_key'] = 'beddc8c18b3b4508f644f72b198601e5';

    return config;
  },
  (error) => {
    Toast.show({
      type: 'error',
      text1: error
    })
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
