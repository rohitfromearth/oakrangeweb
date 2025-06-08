// src/components/common/Header.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);
  const location = useLocation();

  // Define the tabs for each role
  const tabsByRole = {
    system_admin: [
      { label: 'Manage Users', path: '/admin/manage-users' },
      { label: 'Manage Devices', path: '/admin/manage-devices' },
    ],
    officer: [
      { label: 'Devices', path: '/officer/devices' },
      { label: 'Identify View', path: '/officer/identify' },
      { label: 'Expert Review', path: '/officer/review' },
      { label: 'Calibration History', path: '/officer/calibration' },
    ],
    business_user: [
      { label: 'Devices', path: '/business/devices' },
      { label: 'Identify View', path: '/business/identify' },
      { label: 'Expert Review', path: '/business/review' },
      { label: 'Calibration History', path: '/business/calibration' },
    ],
  };

  const tabs = tabsByRole[role] || [];

  return (
    <header className="bg-white shadow">
      {/* Top bar with title, user info and logout */}
      <div className="flex justify-between items-center px-4 py-2">
        <h1 className="text-2xl font-bold text-blue-600">Customer Portal</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">
            {user?.name} ({role})
          </span>
          <button
            onClick={() => dispatch(logout())}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tab navigation */}
      <nav className="flex bg-gray-100 border-t">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `px-4 py-2 ${
                isActive
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
