import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEnter, AiOutlineSearch } from 'react-icons/ai';
import { FiDelete } from 'react-icons/fi';

import { uiActions } from '../../store/uiSlice';
import { useAppDispatch } from '../../hooks/useRedux';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const searchHandler = async (searchTerm: string) => {
    dispatch(uiActions.setSearchTerm(searchTerm));

    return navigate('/search');
  };

  return (
    <div className="flex items-center focus-within:outline-none focus-within:ring-violet-500 focus-within:border-violet-500 dark:focus-within:ring-violet-300 dark:focus-within:border-violet-300 duration-200">
      <div className="flex items-center w-[60vw] dark:bg-stone-800 border-2 border-gray-300 dark:border-stone-500 text-gray-900 dark:text-gray-300 rounded-l-xl h-10 px-3">
        <AiOutlineSearch size={25} color="#777" />
        <input
          className="w-full dark:bg-stone-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-300 focus:outline-none"
          type="text"
          placeholder="Search for a book..."
          onChange={e => setSearchTerm(e.target.value)}
          onKeyPress={ev => {
            if (ev.key === 'Enter') {
              ev.preventDefault();
              searchHandler(searchTerm);
            }
          }}
          value={searchTerm}
        />
      </div>
      <button
        onClick={() => setSearchTerm('')}
        className="flex justify-center items-center dark:bg-stone-800 border-y-2 border-gray-300 dark:border-stone-500 dark:text-gray-300 px-2 h-10 hover:bg-gray-300 dark:hover:bg-stone-700"
      >
        <FiDelete size={25} color="#777" />
      </button>
      <button
        onClick={() => searchHandler(searchTerm)}
        className="flex justify-center items-center dark:bg-stone-800 border-2 border-gray-300 dark:border-stone-500 dark:text-gray-300 rounded-r-lg px-2 h-10 hover:bg-gray-300 dark:hover:bg-stone-700"
      >
        <AiOutlineEnter size={25} color="#777" />
      </button>
    </div>
  );
};

export default SearchBar;
