import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEnter, AiOutlineSearch } from 'react-icons/ai';
import { FiDelete } from 'react-icons/fi';

import { searchActions } from '../../store/searchSlice';
import { useAppDispatch } from '../../hooks/useRedux';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const searchHandler = async (searchTerm: string) => {
    // const data = await axios.get(
    //   `${BASE_URL}?q=${searchTerm}&maxResults=${MAX_ALLOWED_BOOKS}`
    // );

    dispatch(searchActions.setSearchTerm(searchTerm));

    return navigate('/search');
  };

  return (
    <div className="flex items-center focus-within:scale-110 duration-200">
      <div className="flex items-center bg-gray-200 rounded-l-lg h-10 px-3">
        <AiOutlineSearch size={25} color="#777" />
        <input
          className="bg-gray-200 outline-none px-3 w-[600px]"
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
        className="flex justify-center items-center border-l-[1px] border-gray-500 bg-gray-200 px-2 h-10 hover:bg-gray-300"
      >
        <FiDelete size={25} color="#777" />
      </button>
      <button
        onClick={() => searchHandler(searchTerm)}
        className="flex justify-center items-center border-l-[1px] border-gray-500 bg-gray-200 rounded-r-lg px-2 h-10 hover:bg-gray-300"
      >
        <AiOutlineEnter size={25} color="#777" />
      </button>
    </div>
  );
};

export default SearchBar;
