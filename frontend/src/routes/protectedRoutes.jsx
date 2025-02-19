import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../services/authService";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await AuthService.isAuthenticated();
      setIsAuth(authStatus);
    };
    checkAuth();
  }, []);

  if (isAuth === null) return null; // Menunggu pengecekan sesi
  return isAuth ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
