import { useEffect } from 'react';

import Footer from '../components/footer/Footer';
import SearchBar from '../components/header/SearchBar';
import Drawer from '../components/navbar/Drawer';
import useAuth from '../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { favoritesActions } from '../store/favoritesSlice';
import { uiActions } from '../store/uiSlice';
import { HiOutlineMenu } from 'react-icons/hi';
import Navbar from './Navbar';
import useWindowDimensions from '../hooks/useWindowDimensions';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch();
  const { showNavbar } = useAppSelector(state => state.ui);
  const { isAuth } = useAppSelector(state => state.auth);

  const { getUserData } = useAuth();

  const { width } = useWindowDimensions();
  const smallScreen = width < 1320;

  useEffect(() => {
    const getUser = async () => {
      if (isAuth) {
        const { user } = await getUserData();
        dispatch(favoritesActions.setFavoriteBooks(user.favoriteBooks));
      }
    };

    getUser();
  }, [isAuth, dispatch, getUserData]);

  const toggleNavbar = () => {
    dispatch(uiActions.toggleNavbar());
  };

  return (
    <div className="dark:text-white">
      {!smallScreen && <Navbar isAuth={isAuth} />}
      {smallScreen && showNavbar && <Drawer toggleNavbar={toggleNavbar} />}
      <main className="px-16 sm:px-2 lg:ml-[20%]">
        <div className="flex items-center justify-between py-10 sm:py-5 sm:px-2">
          {smallScreen && <HiOutlineMenu onClick={toggleNavbar} size={25} />}
          <SearchBar />
        </div>
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
