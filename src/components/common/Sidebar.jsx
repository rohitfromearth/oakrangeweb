import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { role } = useSelector(state => state.auth);

  const tabs = {
    admin: [
      { name: 'Manage Users', path: '/admin/manage-users' },
      { name: 'Manage Devices', path: '/admin/manage-devices' },
    ],
    officer: [
      { name: 'Devices', path: '/officer/devices' },
      { name: 'Identify View', path: '/officer/identify' },
      { name: 'Expert Review', path: '/officer/expert-review' },
      { name: 'Calibration History', path: '/officer/calibration' },
    ],
    businessUser: [
      { name: 'Devices', path: '/business/devices' },
      { name: 'Identify View', path: '/business/identify' },
      { name: 'Expert Review', path: '/business/expert-review' },
      { name: 'Calibration History', path: '/business/calibration' },
    ],
  };

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <nav className="flex flex-col space-y-2">
        {tabs[role]?.map(tab => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
