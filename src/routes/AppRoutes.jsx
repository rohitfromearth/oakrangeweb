import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/auth/Login';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageDevices from '../pages/admin/ManageDevices';
import OfficerDevices from '../pages/officer/Devices';
import IdentifyView from '../pages/officer/IdentifyView';
import ExpertReview from '../pages/officer/ExpertReview';
import CalibrationHistory from '../pages/officer/CalibrationHistory';
import BusinessDevices from '../pages/businessUser/Devices';
import BusinessIdentify from '../pages/businessUser/IdentifyView';
import BusinessReview from '../pages/businessUser/ExpertReview';
import BusinessCalibration from '../pages/businessUser/CalibrationHistory';
import AdminLayout from '../components/layout/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log('[ROUTE] Current path:', location.pathname);
  }, [location]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <ManageUsers />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/devices"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <ManageDevices />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Officer Routes */}
      <Route
        path="/officer/devices"
        element={
          <ProtectedRoute role="officer">
            <OfficerDevices />
          </ProtectedRoute>
        }
      />
      <Route
        path="/officer/identify"
        element={
          <ProtectedRoute role="officer">
            <IdentifyView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/officer/review"
        element={
          <ProtectedRoute role="officer">
            <ExpertReview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/officer/calibration"
        element={
          <ProtectedRoute role="officer">
            <CalibrationHistory />
          </ProtectedRoute>
        }
      />

      {/* Business User Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute role="businessUser">
            <BusinessDevices />
          </ProtectedRoute>
        }
      />
      <Route
        path="/identify"
        element={
          <ProtectedRoute role="businessUser">
            <BusinessIdentify />
          </ProtectedRoute>
        }
      />
      <Route
        path="/review"
        element={
          <ProtectedRoute role="businessUser">
            <BusinessReview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calibration"
        element={
          <ProtectedRoute role="businessUser">
            <BusinessCalibration />
          </ProtectedRoute>
        }
      />

      {/* Catch-All */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;