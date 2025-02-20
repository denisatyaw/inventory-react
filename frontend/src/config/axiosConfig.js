import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://168.138.173.100:5000/",
  timeout: 5000, 
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Tambahkan interceptor untuk otomatis menyertakan Authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
