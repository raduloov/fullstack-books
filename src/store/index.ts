import { configureStore } from '@reduxjs/toolkit';

import searchSlice from './searchSlice';
import authSlice from './authSlice';
import favoritesSlice from './favoritesSlice';

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    auth: authSlice.reducer,
    favorites: favoritesSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
