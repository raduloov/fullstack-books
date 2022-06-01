import { configureStore } from '@reduxjs/toolkit';

import searchSlice from './searchSlice';
import themeSlice from './themeSlice';
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    theme: themeSlice.reducer,
    auth: authSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
