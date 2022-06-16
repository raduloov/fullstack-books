import { useEffect, useState } from 'react';

import { BASE_URL } from '../apis/googleBooks';
import { COLORS } from '../utils/colors';
import { ActivityIndicator } from '../components/UI/ActivityIndicator';
import { BookSliderCard } from '../components/UI/BookSliderCard';
import { useAppSelector } from '../hooks/useRedux';

const MAX_ALLOWED_BOOKS = 40;

export const SearchPage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { searchTerm } = useAppSelector(state => state.ui);

  useEffect(() => {
    const setData = async () => {
      if (!searchTerm) {
        return;
      }

      try {
        setIsLoading(true);

        const response = await fetch(
          `${BASE_URL}?q=${searchTerm}&maxResults=${MAX_ALLOWED_BOOKS}`
        );
        const { data } = await response.json();

        setBooks(data.items);
      } catch (err) {
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    setData();
  }, [searchTerm]);

  return (
    <div className="flex flex-wrap justify-evenly">
      {!isLoading &&
        books.length > 0 &&
        books.map((book: any, index: number) => (
          <BookSliderCard
            id={book.id}
            title={book.volumeInfo.title}
            imageUrl={book.volumeInfo.imageLinks?.thumbnail}
            author={book.volumeInfo.authors && book.volumeInfo.authors[0]}
            category={book.volumeInfo.categories && book.volumeInfo.categories[0]}
            url={book.volumeInfo.infoLink}
            key={index}
          />
        ))}
      {!isLoading && !books.length && (
        <div className="h-[70vh] flex flex-col justify-center text-center">
          <p className="text-4xl">No books found 💔</p>
          <p className="text-2xl mt-3">
            Search for a book with the search bar above
          </p>
        </div>
      )}
      {isLoading && (
        <ActivityIndicator color={COLORS.ACCENT_COLOR_LIGHT_MODE} size={130} />
      )}
    </div>
  );
};
