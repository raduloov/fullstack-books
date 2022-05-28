import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: ''
  },
  reducers: {
    setSearchTerm(state, { payload }) {
      const searchTerm = payload.replaceAll(' ', '+');

      state.searchTerm = searchTerm;
    }
  }
});

export const searchActions = searchSlice.actions;

export default searchSlice;
