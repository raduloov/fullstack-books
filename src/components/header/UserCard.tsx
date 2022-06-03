import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import useDarkMode from '../../hooks/useDarkMode';
import UserDropdown from '../UI/UserDropdown';

interface Props {
  isAuth: boolean;
}

type UserData = { name: string; email: string; favoriteBooks: any[] };

const UserCard = ({ isAuth }: Props) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { darkMode } = useDarkMode();
  const { getUserData } = useAuth();

  useEffect(() => {
    const getData = async () => {
      if (isAuth) {
        const { user } = await getUserData();
        setUserData(user);
      }
    };

    getData();
    // eslint-disable-next-line
  }, [isAuth]);

  return (
    <div className="flex items-center">
      {isAuth ? (
        <div className="flex items-center">
          <div className="flex flex-col mr-3">
            <p
              className={`${
                darkMode ? 'text-violet-300' : 'text-violet-500'
              } text-xl font-semibold`}
            >
              {userData?.name}
            </p>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {userData?.email}
            </p>
          </div>
          <UserDropdown />
        </div>
      ) : (
        <div className="flex">
          <Link
            to="/login"
            className="flex border-2 border-violet-500 dark:border-violet-300 dark:text-white rounded-3xl py-3 px-8 cursor-pointer hover:bg-violet-500 dark:hover:bg-violet-300 hover:text-white dark:hover:text-black hover:shadow-md duration-200"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="flex border-2 border-violet-500 dark:border-violet-300 bg-violet-500 dark:bg-violet-300 rounded-3xl py-3 px-8 ml-3 cursor-pointer hover:bg-violet-600 dark:hover:bg-violet-500 hover:border-violet-600 dark:hover:border-violet-500  text-white dark:text-black hover:text-white dark:hover:text-black hover:shadow-md duration-200"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserCard;
