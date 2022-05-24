import { FaPlay } from 'react-icons/fa';

const ShowMoreButton = () => {
  return (
    <button className="group flex justify-center items-center bg-gray-300 p-3 rounded-full shadow-xl hover:shadow-md hover:bg-violet-500 duration-200">
      <FaPlay className="h-6 w-6 group-hover:text-white duration-200" />
    </button>
  );
};

export default ShowMoreButton;
