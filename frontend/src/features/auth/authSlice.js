import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const signin = createAsyncThunk('auth/signin', async (payload, thunkAPI) => {
  const res = await api.post('/auth/signin', payload);
  return res.data;
});

export const signup = createAsyncThunk('auth/signup', async (payload) => {
  const res = await api.post('/auth/signup', payload);
  return res.data;
});

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null; state.token = null; localStorage.removeItem('token'); localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (s) => { s.status = 'loading'; })
      .addCase(signin.fulfilled, (s, a) => {
        s.status = 'succeeded';
        s.user = a.payload.user; s.token = a.payload.token; localStorage.setItem('token', a.payload.token); localStorage.setItem('user', JSON.stringify(a.payload.user));
      })
      .addCase(signin.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message; })
      .addCase(signup.fulfilled, (s, a) => {
        s.user = a.payload.user; s.token = a.payload.token; localStorage.setItem('token', a.payload.token); localStorage.setItem('user', JSON.stringify(a.payload.user));
      })
  }
});

export const { logout } = slice.actions;
export default slice.reducer;
