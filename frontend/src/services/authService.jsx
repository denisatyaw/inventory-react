// authService.jsx

// Simpan token ke localStorage
export const login = (token) => {
  localStorage.setItem('token', token);
};

// Hapus token dari localStorage (logout)
export const logout = () => {
  localStorage.removeItem('token');
};

// Ambil token dari localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Cek apakah pengguna sudah login (ada token)
export const isAuthenticated = () => {
  const token = getToken();
  return !!token; // Mengembalikan true jika token ada, false jika tidak
};

// Fungsi untuk menambahkan token ke header axios
export const setAuthHeader = (axiosInstance) => {
  const token = getToken();
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};