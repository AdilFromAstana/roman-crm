// lib/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || 'https://afadd2b4e5b2.ngrok-free.app',
  timeout: 10000
});

// Интерцепторы (опционально)
api.interceptors.request.use((config) => {
  // обязательный хедер для обхода ngrok warning
  config.headers['ngrok-skip-browser-warning'] = 'true';

  // Добавь токен, если нужно
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Обработка 401 ошибки
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
