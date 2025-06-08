// src/pages/auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [customerName, setCustomerName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, role } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ customer_name: customerName, username, password }));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      switch (role) {
        case 'system_admin':
          return navigate('/admin/manage-users');
        case 'officer':
          return navigate('/officer/devices');
        case 'business_user':
          return navigate('/business/devices');
        default:
          return navigate('/login');
      }
    }
  }, [status, role, navigate]);

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Login</h2>
      {status === 'loading' && <p>Logging in…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer Name</label>
          <input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button disabled={status === 'loading'}>Login</button>
      </form>
    </div>
  );
};

export default Login;
