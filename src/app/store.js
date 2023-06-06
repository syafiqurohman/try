import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import themeReducer from '../features/themeSlice';
import notificationReducer from '../features/notificationSlice';
import dataReducer from '../features/dataSlice';
import pendaftarReducer from '../features/pendaftarSlice';
import siswaReducer from '../features/siswaSlice';
import totalReducer from '../features/totalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    notification: notificationReducer,
    data: dataReducer,
    pendaftar: pendaftarReducer,
    siswa: siswaReducer,
    total: totalReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});