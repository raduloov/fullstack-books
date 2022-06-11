export interface LoginAuthData {
  email: string;
  password: string;
}

export interface SignUpAuthData extends LoginAuthData {
  name: string;
  confirmPassword: string;
}

export type BookData = {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  category: string;
  url: string;
};

export interface FavoriteBookCardProps extends BookData {
  removeFavorite: (bookId: string, bookTitle: string) => void;
}

export interface FavoritesState {
  favorites: BookData[];
}
