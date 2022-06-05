import { useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { authActions } from '../../store/authSlice';
import { uiActions } from '../../store/uiSlice';

interface Props {
  isAuth: boolean;
}

const UserCard = ({ isAuth }: Props) => {
  const { getUserData, signOut } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      if (isAuth) {
        const { user } = await getUserData();
        dispatch(authActions.setUser(user));
      }
    };

    getData();
    // eslint-disable-next-line
  }, [isAuth]);

  const { username, email } = useAppSelector(state => state.auth);

  const signOutHandler = () => {
    signOut();

    // TODO: Find better solution
    window.location.reload();
  };

  const closeNavbar = () => {
    dispatch(uiActions.toggleNavbar());
  };

  return (
    <div className="flex items-center">
      {isAuth ? (
        <div className="flex flex-col items-center">
          <div className="mb-3">
            <div className="flex flex-col mr-3">
              <p>Logged in as</p>
              <p className="text-xl text-violet-500 dark:text-violet-300 font-semibold">
                {username}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{email}</p>
            </div>
          </div>
          <div
            onClick={signOutHandler}
            className="flex items-center cursor-pointer dark:text-violet-300 dark:hover:text-white text-violet-500 hover:text-black"
          >
            <FaSignOutAlt className="mr-2" />
            Sign out
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full mt-5">
          <Link
            to="/login"
            onClick={closeNavbar}
            className="text-center border-2 border-violet-500 dark:border-violet-300 dark:text-white rounded-3xl py-1 cursor-pointer hover:bg-violet-500 dark:hover:bg-violet-300 hover:text-white dark:hover:text-black hover:shadow-md duration-200"
          >
            Login
          </Link>
          <Link
            to="/signup"
            onClick={closeNavbar}
            className="text-center border-2 border-violet-500 dark:border-violet-300 bg-violet-500 dark:bg-violet-300 rounded-3xl py-1 mt-2 cursor-pointer hover:bg-violet-600 dark:hover:bg-violet-500 hover:border-violet-600 dark:hover:border-violet-500  text-white dark:text-black hover:text-white dark:hover:text-black hover:shadow-md duration-200"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserCard;
