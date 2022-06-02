export type SignUpAuthData = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export type LoginAuthData = {
  email: string;
  password: string;
};

export type BookData = {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  category: string;
  url: string;
};

export interface BookSliderCardProps extends BookData {
  backgroundColor: string;
}

export interface FavoritesState {
  favorites: BookData[];
}
