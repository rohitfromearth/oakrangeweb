
import React, { createContext, useContext, useState } from 'react';
import { loginUser, logoutUser } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    role: null,
  });

  const login = async (credentials) => {
    // credentials = { email, password }
    const data = await loginUser(credentials);
    const userObj = { name: data.username, role: data.user_type };

    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userRole', data.user_type);

    setAuth({
      user: userObj,
      token: data.token,
      role: data.user_type,
    });
  };

  const logout = () => {
    logoutUser();
    setAuth({ user: null, token: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

