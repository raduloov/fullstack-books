import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    searchTerm: '',
    showNavbar: false,
    screenSize: ''
  },
  reducers: {
    setSearchTerm(state, { payload }) {
      const searchTerm = payload.replaceAll(' ', '+');

      state.searchTerm = searchTerm;
    },
    toggleNavbar(state) {
      state.showNavbar = !state.showNavbar;
    },
    setScreenSize(state, { payload }) {
      state.screenSize = payload;
    }
  }
});

export const uiActions = uiSlice.actions;
