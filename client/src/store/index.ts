import { configureStore } from '@reduxjs/toolkit';

import { uiSlice } from './uiSlice';
import { authSlice } from './authSlice';
import { favoritesSlice } from './favoritesSlice';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    favorites: favoritesSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
