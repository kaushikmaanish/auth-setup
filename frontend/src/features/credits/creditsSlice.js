import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchCredits = createAsyncThunk('credits/fetch', async () => {
  const res = await api.get('/me/credits');
  return res.data.credits;
});

const slice = createSlice({
  name: 'credits',
  initialState: { value: 0, status: 'idle' },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchCredits.fulfilled, (s, a) => { s.value = a.payload; s.status = 'succeeded'; });
  }
});

export default slice.reducer;
