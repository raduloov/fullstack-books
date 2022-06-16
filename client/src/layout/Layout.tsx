import { useEffect } from 'react';

import { Footer } from '../components/footer/Footer';
import { SearchBar } from '../components/header/SearchBar';
import { Drawer } from '../components/navbar/Drawer';
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { favoritesActions } from '../store/favoritesSlice';
import { uiActions } from '../store/uiSlice';
import { HiOutlineMenu } from 'react-icons/hi';
import { Navbar } from './Navbar';
import { useWindowDimensions } from '../hooks/useWindowDimensions';

interface LayoutProps {
  children: React.ReactNode;
}

export enum ScreenSizes {
  MOBILE = 'mobile',
  SMALL = 'small',
  LARGE = 'large'
}

export const Layout = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch();
  const { showNavbar, screenSize } = useAppSelector(state => state.ui);
  const { isAuth } = useAppSelector(state => state.auth);

  const { getUserData } = useAuth();

  const { width } = useWindowDimensions();

  useEffect(() => {
    const getUser = async () => {
      if (isAuth) {
        const { user } = await getUserData();
        dispatch(favoritesActions.setFavoriteBooks(user.favoriteBooks));
      }
    };
    getUser();

    // Set the screen size in the global store
    if (width <= 500) {
      dispatch(uiActions.setScreenSize(ScreenSizes.MOBILE));
    } else if (width <= 1320) {
      dispatch(uiActions.setScreenSize(ScreenSizes.SMALL));
    } else {
      dispatch(uiActions.setScreenSize(ScreenSizes.LARGE));
    }
  }, [isAuth, dispatch, getUserData, width]);

  const toggleNavbar = () => {
    dispatch(uiActions.toggleNavbar());
  };

  return (
    <div className="dark:text-white">
      {screenSize === ScreenSizes.LARGE && <Navbar isAuth={isAuth} />}
      {screenSize !== ScreenSizes.LARGE && showNavbar && (
        <Drawer toggleNavbar={toggleNavbar} />
      )}
      <main className="px-16 sm:px-2 lg:ml-[20%]">
        <div className="flex items-center justify-between py-10 sm:py-5 sm:px-2">
          {screenSize !== ScreenSizes.LARGE && (
            <HiOutlineMenu
              onClick={toggleNavbar}
              size={25}
              className="cursor-pointer"
            />
          )}
          <SearchBar />
        </div>
        {children}
        <Footer />
      </main>
    </div>
  );
};
