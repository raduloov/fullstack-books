import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { COLORS } from '../utils/colors';
import { ActivityIndicator } from '../components/UI/ActivityIndicator';
import { useBooks } from '../hooks/useBooks';
import { BookData } from '../@types/types';
import { FavoriteBookCard } from '../components/UI/FavoriteBookCard';
import { useAppSelector } from '../hooks/useRedux';

export const FavoritesPage = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<BookData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isAuth } = useAppSelector(state => state.auth);

  const { getFavoriteBooks, removeFromFavorites } = useBooks();

  useEffect(() => {
    const setData = async () => {
      try {
        setIsLoading(true);

        const { data } = await getFavoriteBooks();

        setFavoriteBooks(data.favoriteBooks);
      } catch (err) {
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    setData();
    // eslint-disable-next-line
  }, []);

  const removeFavorite = (bookId: string, bookTitle: string) => {
    removeFromFavorites(bookId, bookTitle);

    const updatedFavoriteBooks = favoriteBooks.filter(
      (book: BookData) => book.id !== bookId
    );
    setFavoriteBooks(updatedFavoriteBooks);
  };

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="sm:px-2">
      <h2 className="text-4xl font-bold">Favorites</h2>
      <div className="flex flex-wrap justify-evenly">
        {!isLoading &&
          favoriteBooks.length > 0 &&
          favoriteBooks.map((book: any, index: number) => (
            <FavoriteBookCard
              removeFavorite={removeFavorite}
              id={book.id}
              title={book.title}
              imageUrl={book.imageUrl}
              author={book.author}
              category={book.category}
              url={book.url}
              key={index}
            />
          ))}
        {!isLoading && !favoriteBooks.length && (
          <div className="h-[70vh] flex flex-col justify-center text-center">
            <p className="text-4xl">No favorite books found 💔</p>
            <p className="text-2xl mt-3">Go and add some!</p>
          </div>
        )}
        {isLoading && (
          <ActivityIndicator color={COLORS.ACCENT_COLOR_LIGHT_MODE} size={130} />
        )}
      </div>
    </div>
  );
};
