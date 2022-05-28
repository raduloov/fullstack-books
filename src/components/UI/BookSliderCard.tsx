import { FaHeart, FaRegHeart } from 'react-icons/fa';

import getRandomColor from '../../utils/getRandomColor';

interface Props {
  title: string;
  imageUrl: string;
  author: string;
  category: string;
  url: string;
}

const BookSliderCard = ({ title, imageUrl, author, category, url }: Props) => {
  const backgroundGradient = `linear-gradient(180deg, ${getRandomColor()} 0%, transparent 100%)`;

  return (
    <div className="relative mr-2.5 ml-2.5">
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
          <p className="font-bold text-xl mb-3">{title}</p>
          <p className="text-gray text-gray-600 mb-3">{author}</p>
          <div className="bg-green-300 rounded-2xl px-3 py-1 inline-block">
            {category && <p className="text-gray-600">{category}</p>}
          </div>
        </div>
        <div className="ml-5">
          <FaRegHeart
            size={30}
            color="#ff0000"
            className="hover:scale-105 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default BookSliderCard;
