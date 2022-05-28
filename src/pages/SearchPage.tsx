import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../apis/googleBooks';
import ActivityIndicator from '../components/UI/ActivityIndicator';
import BookSliderCard from '../components/UI/BookSliderCard';
import { useAppSelector } from '../hooks/useRedux';

const MAX_ALLOWED_BOOKS = 40;

const SearchPage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { searchTerm } = useAppSelector(state => state.search);

  useEffect(() => {
    const setData = async () => {
      if (!searchTerm) {
        return;
      }

      try {
        setIsLoading(true);

        const { data } = await axios.get(
          `${BASE_URL}?q=${searchTerm}&maxResults=${MAX_ALLOWED_BOOKS}`
        );

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
    <div className="flex flex-wrap justify-center h-[80vh]">
      {!isLoading &&
        books.length > 0 &&
        books.map((book: any, index: number) => (
          <BookSliderCard
            title={book.volumeInfo.title}
            imageUrl={book.volumeInfo.imageLinks?.thumbnail}
            author={book.volumeInfo.authors && book.volumeInfo.authors[0]}
            category={book.volumeInfo.categories}
            url={book.volumeInfo.infoLink}
            key={index}
          />
        ))}
      {!isLoading && !books.length && (
        <p>Search for a book in the input field above</p>
      )}
      {isLoading && <ActivityIndicator color="#8b5cf6" size={130} />}
    </div>
  );
};

export default SearchPage;
