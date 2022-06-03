import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { BookData, BookSliderCardProps } from '../../@types/types';
import useBooks from '../../hooks/useBooks';
import { useAppSelector } from '../../hooks/useRedux';

const BookSliderCard = ({
  backgroundColor,
  id,
  title,
  imageUrl,
  author,
  category,
  url
}: BookSliderCardProps) => {
  const { favorites } = useAppSelector(state => state.favorites);
  const [isFavorite, setIsFavorite] = useState<boolean>(
    !!favorites.find((book: BookData) => book.id === id)
  );
  const { isAuth } = useAppSelector(state => state.auth);

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

  const backgroundGradient = `linear-gradient(180deg, ${backgroundColor} 0%, transparent 100%)`;

  return (
    <div className="relative mx-2.5">
      <img
        onClick={() => window.open(url, '_blank')}
        className="rounded-md shadow-md h-44 w-28 absolute left-5 bottom-5 cursor-pointer hover:shadow-lg hover:scale-110 duration-200"
        src={imageUrl}
        alt="Book thumbnail"
      />
      <div
        className="flex h-40 rounded-tl-3xl rounded-tr-3xl p-5 mt-20"
        style={{
          background: backgroundGradient
        }}
      >
        <div className="ml-32">
          <p className="font-bold text-xl mb-3 dark:text-white">{title}</p>
          <p className="text-gray text-gray-600 mb-3 dark:text-gray-300">{author}</p>
          <div className="bg-green-300 rounded-2xl px-3 py-1 inline-block">
            {category && <p className="text-gray-600">{category}</p>}
          </div>
        </div>
        <div className="ml-5" onClick={favoriteHandler}>
          {!isFavorite ? (
            <FaRegHeart
              size={30}
              color="#ff0000"
              className="hover:scale-105 cursor-pointer"
            />
          ) : (
            <FaHeart
              size={30}
              color="#ff0000"
              className="hover:scale-105 cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSliderCard;
