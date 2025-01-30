import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Mendapatkan status autentikasi dari context

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
