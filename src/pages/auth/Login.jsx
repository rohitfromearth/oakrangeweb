
// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [customerName, setCustomerName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call real API loginUser via context
      const data = await login({ customer_name: customerName, username, password });
      // data: { message, token, user_type }

      const role = data.user_type;
      if (role === 'admin') {
        console.log('[NAVIGATION LOG] Navigating to: /admin/users');
        navigate('/admin/users');
      } else if (role === 'officer') {
        console.log('[NAVIGATION LOG] Navigating to: /officer/devices');
        navigate('/officer/devices');
      } else {
        console.log('[NAVIGATION LOG] Navigating to: /');
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer Name"
            required
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
