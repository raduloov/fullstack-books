import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: false
  },
  reducers: {
    setDarkMode(state, { payload }) {
      state.darkMode = payload;
    }
  }
});

export const themeActions = themeSlice.actions;

export default themeSlice;
