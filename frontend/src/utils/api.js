import axios from 'axios';


console.log(import.meta.env.VITE_BACKEND_URL); // Output: http://localhost:5000

// Buat instance axios dengan konfigurasi dasar
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // URL backend dari environment
  headers: {
    'Content-Type': 'application/json',
  },
});

// Middleware untuk menangani permintaan
api.interceptors.request.use(
  (config) => {
    // Tambahkan token otentikasi jika diperlukan
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Middleware untuk menangani respon
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tangani kesalahan, seperti status 401 atau 500
    if (error.response && error.response.status === 401) {
      // Redirect ke halaman login jika tidak terautentikasi
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
