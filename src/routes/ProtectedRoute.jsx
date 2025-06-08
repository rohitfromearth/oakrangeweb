// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, role: userRole } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" />;
  }
  if (requiredRole && requiredRole !== userRole) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
