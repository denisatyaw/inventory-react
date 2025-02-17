import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../services/authService';

const ProtectedRoute = () => {
  return AuthService.isAuthenticated() ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
