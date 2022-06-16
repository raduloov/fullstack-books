import { createSlice } from '@reduxjs/toolkit';

import { BookData, FavoritesState } from './../@types/types';

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: []
  } as FavoritesState,
  reducers: {
    setFavoriteBooks(state, { payload }) {
      state.favorites = payload;
    },
    addToFavorites(state, { payload }) {
      const newBook = payload;

      const existingBook = state.favorites.find(
        (book: BookData) => book.id === newBook.id
      );
      if (!existingBook) {
        state.favorites.push(newBook);
      }
    },
    removeFromFavorites(state, { payload }) {
      const id = payload;
      state.favorites = state.favorites.filter((book: BookData) => book.id !== id);
    }
  }
});

export const favoritesActions = favoritesSlice.actions;
