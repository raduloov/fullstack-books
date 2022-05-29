import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './searchSlice';
import themeSlice from './themeSlice';

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    theme: themeSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
