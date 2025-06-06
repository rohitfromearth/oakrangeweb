// src/components/layout/AdminLayout.jsx
import React from 'react';

const AdminLayout = ({ children }) => {
  return (
    <div>
      <header style={{ padding: '1rem', background: '#333', color: '#fff' }}>
        <h2>Admin Dashboard</h2>
      </header>
      <main style={{ padding: '1rem' }}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
