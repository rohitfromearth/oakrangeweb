import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser as apiLogin } from '../services/api';

// Load initial state from localStorage
const token = localStorage.getItem('authToken');
const role = localStorage.getItem('userRole');
const username = localStorage.getItem('username');

export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const data = await apiLogin(credentials);
    return data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: username ? { name: username, role } : null,
    token: token || null,
    role: role || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.status = 'loading'; })
      .addCase(login.fulfilled, (state, action) => {
        const data = action.payload;
        state.status = 'succeeded';
        state.token = data.token;
        state.role = data.user_type;
        state.user = { name: data.username, role: data.user_type };
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userRole', data.user_type);
        localStorage.setItem('username', data.username);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
