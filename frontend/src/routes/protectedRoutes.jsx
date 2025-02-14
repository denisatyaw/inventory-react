// protectedRoutes.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

const ProtectedRoute = () => {
  // Cek apakah pengguna sudah login
  const isAuth = isAuthenticated();

  // Jika belum login, arahkan ke halaman login
  if (!isAuth) {
    return <Navigate to="/auth/login" replace />;
  }

  // Jika sudah login, render child routes
  return <Outlet />;
};

export default ProtectedRoute;