import { FaPlay } from 'react-icons/fa';

interface Props {
  direction: string;
  disabled: boolean;
  onClick: (direction: string) => void;
}

const ShowMoreButton = ({ direction, disabled, onClick }: Props) => {
  return (
    <button
      onClick={() => onClick(direction)}
      className={`group flex justify-center items-center ${
        disabled
          ? 'bg-gray-200'
          : 'bg-gray-300 hover:shadow-md hover:bg-violet-500 dark:hover:bg-violet-400'
      } p-3 rounded-full shadow-xl duration-200`}
    >
      <FaPlay
        className={`h-6 w-6 duration-200 ${direction === 'left' && 'rotate-180'} ${
          disabled ? 'text-gray-300' : 'group-hover:text-white dark:text-black'
        }`}
      />
    </button>
  );
};

export default ShowMoreButton;
