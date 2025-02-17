// authService.js
import axiosInstance from "../config/axiosConfig";

const API_URL = "/auth/";

// ✅ Simpan token di sessionStorage
const saveToken = (token) => {
  sessionStorage.setItem("token", token);
};

// ✅ Ambil token dari sessionStorage
const getToken = () => {
  return sessionStorage.getItem("token");
};

// ✅ Hapus token saat logout
const removeToken = () => {
  sessionStorage.removeItem("token");
};

// ✅ Login
const login = async (username, password, role) => {
  try {
    const response = await axiosInstance.post(API_URL + "login", {
      username,
      password,
      role,
    });

    if (response.data?.data?.token) {
      saveToken(response.data.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// ✅ Logout
const logout = async () => {
  try {
    await axiosInstance.post(API_URL + "logout"); // Logout API
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    removeToken();
  }
};

// ✅ Cek apakah pengguna sudah login
const isAuthenticated = () => {
  return !!getToken();
};

// ✅ Ambil user saat ini dari token (jika backend mengembalikan data user)
const getCurrentUser = () => {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])) : null;
};

// ✅ Export authService
const AuthService = {
  login,
  logout,
  isAuthenticated,
  getToken,
  getCurrentUser,
};

export default AuthService;
