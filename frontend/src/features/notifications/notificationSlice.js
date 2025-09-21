import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchNotifications = createAsyncThunk('notifications/fetch', async () => {
  const res = await api.get('/me/notifications');
  return res.data.notifications;
});

const slice = createSlice({
  name: 'notifications',
  initialState: { items: [], open: false, status: 'idle' },
  reducers: { toggle(state) { state.open = !state.open } },
  extraReducers: (b) => {
    b.addCase(fetchNotifications.fulfilled, (s, a) => { s.items = a.payload; s.status = 'succeeded'; });
  }
});

export const { toggle } = slice.actions;
export default slice.reducer;
