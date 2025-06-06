// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role: requiredRole }) => {
  const { token, role: userRole } = useAuth();

  // 1) If there's no token (not logged in), redirect to /login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // 2) If a specific role is required and it doesn't match, redirect:
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/login" />;
  }

  // 3) Otherwise, show the protected children
  return children;
};

export default ProtectedRoute;
