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

// ✅ Dekode token untuk mendapatkan info user
const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1]; // Ambil payload dari token
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64)); // Dekode base64 ke objek JSON
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

// ✅ Ambil user saat ini dari token
const getCurrentUser = () => {
  const token = getToken();
  return token ? decodeToken(token) : null;
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

// ✅ Cek apakah pengguna sudah login dengan validasi session di backend
const isAuthenticated = async () => {
  const token = getToken();
  console.log(token);
  if (!token) return false;

  try {
    const response = await axiosInstance.get(API_URL + "check-session", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    return response.data?.status === "success";
  } catch (error) {
    console.error("Session check failed:", error.response?.data || error.message);
    removeToken(); // Hapus token jika sesi tidak valid
    return false;
  }
};


// ✅ Export authService
const AuthService = {
  login,
  logout,
  isAuthenticated,
  getToken,
  getCurrentUser,
  saveToken,
};

export default AuthService;
