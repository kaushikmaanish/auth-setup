import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import notificationReducer from '../features/notifications/notificationSlice';
import creditsReducer from '../features/credits/creditsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationReducer,
    credits: creditsReducer,
  }
});
