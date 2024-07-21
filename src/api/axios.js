import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Базовый URL сервера
  timeout: 1000, // Время ожидания ответа
});

export default api;