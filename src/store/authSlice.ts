import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false
  },
  reducers: {
    setIsAuth(state, { payload }) {
      state.isAuth = payload;
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice;
