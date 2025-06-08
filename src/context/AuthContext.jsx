import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser } from '../services/api';

// Create the context
const AuthContext = createContext();

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    role: null,
  });

  // ✅ Login function
  const login = async (credentials) => {
    const data = await loginUser(credentials); // calls API
    const userObj = { name: data.username, role: data.user_type };

    // Store in localStorage
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userRole', data.user_type);
    localStorage.setItem('username', data.username);

    // Update state
    setAuth({
      user: userObj,
      token: data.token,
      role: data.user_type,
    });

    return data; // return for further use
  };

  // ✅ Logout function
  const logout = () => {
    logoutUser(); // optional backend cleanup
    setAuth({ user: null, token: null, role: null });
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
  };

  // ✅ Optional: Load from localStorage on page reload
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('username');

    if (token && role) {
      setAuth({
        user: { name, role },
        token,
        role,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
