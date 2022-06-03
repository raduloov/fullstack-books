import React, { useEffect } from 'react';

import Footer from '../components/footer/Footer';
import SearchBar from '../components/header/SearchBar';
import UserCard from '../components/header/UserCard';
import useAuth from '../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { favoritesActions } from '../store/favoritesSlice';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(state => state.auth);

  const { getUserData } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      if (isAuth) {
        const { user } = await getUserData();
        dispatch(favoritesActions.setFavoriteBooks(user.favoriteBooks));
      }
    };

    getUser();
  }, [isAuth, dispatch, getUserData]);

  return (
    <div className="dark:text-white">
      <Navbar />
      <main className="ml-[20%]">
        <div className="flex justify-between items-center p-10">
          <SearchBar />
          <UserCard isAuth={isAuth} />
        </div>
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
