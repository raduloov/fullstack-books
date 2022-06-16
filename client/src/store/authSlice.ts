import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    username: '',
    email: ''
  },
  reducers: {
    setIsAuth(state, { payload }) {
      state.isAuth = payload;
    },
    setUser(state, { payload }) {
      const { name, email } = payload;

      [state.username, state.email] = [name, email];
    }
  }
});

export const authActions = authSlice.actions;
