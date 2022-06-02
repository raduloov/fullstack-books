import React, { useEffect } from 'react';
import Footer from '../components/footer/Footer';

import SearchBar from '../components/header/SearchBar';
import UserCard from '../components/header/UserCard';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import userService from '../service/userService';
import { favoritesActions } from '../store/favoritesSlice';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(state => state.auth);

  // useEffect(() => {
  //   const getUserData = async () => {
  //     if (isAuth) {
  //       const { user } = await userService.getUserData();
  //       dispatch(favoritesActions.setFavoriteBooks(user.books));
  //     }
  //   };

  //   getUserData();
  // }, [isAuth, dispatch]);

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
