import axios from "axios";
import { getAccessToken, refreshAccessToken, logout } from "./authService";

// Buat instance Axios
const api = axios.create({
  baseURL: "http://168.138.173.100:5000",
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
  async (config) => {
    let token = getAccessToken();

    // Jika token sudah kedaluwarsa, coba refresh token
    const expiryTime = localStorage.getItem("tokenExpiry");
    if (expiryTime && Date.now() > expiryTime) {
      await refreshAccessToken();
      token = getAccessToken(); // Ambil token baru setelah refresh
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor untuk menangani response error (misal token invalid)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

export default api;
