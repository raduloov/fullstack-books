import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    searchTerm: '',
    showNavbar: false
  },
  reducers: {
    setSearchTerm(state, { payload }) {
      const searchTerm = payload.replaceAll(' ', '+');

      state.searchTerm = searchTerm;
    },
    toggleNavbar(state) {
      state.showNavbar = !state.showNavbar;
    }
  }
});

export const uiActions = uiSlice.actions;

export default uiSlice;
