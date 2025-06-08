import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers as apiFetchUsers } from '../services/api';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params) => {
    const data = await apiFetchUsers(params);
    return data;
  }
);

export const userSlice = createSlice({
  name: 'users',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
