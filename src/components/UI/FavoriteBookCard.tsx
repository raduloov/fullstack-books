import { useMemo } from 'react';
import { FaTimes } from 'react-icons/fa';

import { FavoriteBookCardProps } from '../../@types/types';
import getRandomColor from '../../utils/getRandomColor';

const FavoriteBookCard = ({
  id,
  title,
  imageUrl,
  author,
  category,
  url,
  removeFavorite
}: FavoriteBookCardProps) => {
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
        <div className="ml-5" onClick={() => removeFavorite(id, title)}>
          <FaTimes
            size={30}
            color="#ff0000"
            className="hover:scale-105 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default FavoriteBookCard;
