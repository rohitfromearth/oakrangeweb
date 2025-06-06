import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user } = useAuth();
  return (
    <header style={{ padding: '10px', background: '#eee', textAlign: 'right' }}>
      <strong>Welcome: {user?.role} - {user?.name}</strong>
    </header>
  );
};

export default Header;