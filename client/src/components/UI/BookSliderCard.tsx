import { useMemo, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { BookData } from '../../@types/types';
import { useBooks } from '../../hooks/useBooks';
import { useAppSelector } from '../../hooks/useRedux';
import { ScreenSizes } from '../../layout/Layout';
import { getRandomColor } from '../../utils/getRandomColor';

export const BookSliderCard = ({
  id,
  title,
  imageUrl,
  author,
  category,
  url
}: BookData) => {
  const { favorites } = useAppSelector(state => state.favorites);
  const [isFavorite, setIsFavorite] = useState<boolean>(
    !!favorites.find((book: BookData) => book.id === id)
  );
  const { isAuth } = useAppSelector(state => state.auth);
  const { screenSize } = useAppSelector(state => state.ui);

  const { addToFavorites, removeFromFavorites } = useBooks();

  const favoriteHandler = async () => {
    if (isAuth) {
      if (!isFavorite) {
        addToFavorites({
          id,
          title,
          imageUrl,
          author,
          category,
          url
        });
        setIsFavorite(true);
      } else {
        removeFromFavorites(id, title);
        setIsFavorite(false);
      }
    } else {
      toast.error('Please log in to add a book to your favorites.');
    }
  };

  /**
   * Memoize the background color so it
   * does not change on every rerender
   */
  const backgroundColor = useMemo(() => getRandomColor(), []);
  const backgroundGradient = `linear-gradient(180deg, ${backgroundColor} 0%, transparent 100%)`;

  return (
    <div className="relative mx-2.5">
      <img
        onClick={() => window.open(url, '_blank')}
        className="rounded-md shadow-md h-44 w-28 sm:h-32 sm:w-20 absolute left-5 top-10 sm:top-6 cursor-pointer hover:shadow-lg hover:scale-110 duration-200"
        src={imageUrl}
        alt="Book thumbnail"
      />
      <div
        className="flex min-h-40 sm:min-h-32 rounded-tl-3xl rounded-tr-3xl p-5 mt-20 sm:mt-10"
        style={{
          background: backgroundGradient
        }}
      >
        <div className="ml-32 sm:ml-24">
          <p className="font-bold text-xl sm:text-base mb-3 sm:mb-2 dark:text-white">
            {title}
          </p>
          <p className="text-gray-600 sm:text-xs mb-3 sm:mb-2 dark:text-gray-300">
            {author}
          </p>
          <div className="bg-green-300 rounded-2xl px-3 py-1 inline-block">
            {category && <p className="text-gray-600 sm:text-xs">{category}</p>}
          </div>
        </div>
        <div className="ml-5" onClick={favoriteHandler}>
          {!isFavorite ? (
            <FaRegHeart
              size={screenSize === ScreenSizes.LARGE ? 30 : 22}
              color="#ff0000"
              className="hover:scale-105 cursor-pointer"
            />
          ) : (
            <FaHeart
              size={screenSize === ScreenSizes.LARGE ? 30 : 22}
              color="#ff0000"
              className="hover:scale-105 cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
};
