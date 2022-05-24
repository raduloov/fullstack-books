import React from 'react';

interface Props {
  title: string;
  imageUrl: string;
  author: string;
  category: string;
  url: string;
}

const BookSliderCard = ({ title, imageUrl, author, category, url }: Props) => {
  return (
    <div className="relative mr-2.5 ml-2.5">
      <img
        onClick={() => window.open(url, '_blank')}
        className="rounded-md shadow-md h-44 w-28 absolute left-5 bottom-5 cursor-pointer hover:shadow-lg hover:scale-110 duration-200"
        src={imageUrl}
        alt="Book thumbnail"
      />
      <div className="bg-red-400 h-40 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-b from-red-400 to-white p-5 mt-20">
        <div className="ml-32">
          <p className="font-bold text-xl mb-3">{title}</p>
          <p className="text-gray text-gray-600 mb-3">{author}</p>
          <div className="bg-green-300 rounded-2xl px-3 py-1 inline-block">
            <p className="text-gray-600">{category}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSliderCard;
