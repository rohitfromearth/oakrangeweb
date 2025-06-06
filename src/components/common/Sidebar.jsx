import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  const links = {
    admin: [
      { to: '/admin/users', label: 'Manage Users' },
      { to: '/admin/devices', label: 'Manage Devices' }
    ],
    officer: [
      { to: '/officer/devices', label: 'Devices' },
      { to: '/officer/identify', label: 'Identify View' },
      { to: '/officer/review', label: 'Expert Review' },
      { to: '/officer/calibration', label: 'Calibration History' }
    ],
    businessUser: [
      { to: '/', label: 'Devices' },
      { to: '/identify', label: 'Identify View' },
      { to: '/review', label: 'Expert Review' },
      { to: '/calibration', label: 'Calibration History' }
    ]
  };

  return (
    <aside style={{ width: '200px', background: '#f4f4f4', padding: '10px' }}>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {links[user?.role]?.map(link => (
            <li key={link.to}>
              <NavLink to={link.to}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;