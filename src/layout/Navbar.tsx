import Switch from 'react-switch';

import NavbarItem from '../components/navbar/NavbarItem';
import COLORS from '../utils/colors';
import useDarkMode from '../hooks/useDarkMode';
import UserCard from '../components/navbar/UserCard';

interface Props {
  isAuth: boolean;
}

enum NavbarItemName {
  SEARCH = 'Search',
  FOR_YOU = 'For you',
  MORE = 'More'
}

const Navbar = ({ isAuth }: Props) => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex flex-col justify-between overflow-y-scroll animate-[slide-right_0.3s_ease-in-out] dark:bg-stone-800 bg-white lg:w-1/5 h-[100vh] px-[3%] py-10 fixed z-50">
      <div>
        <div className="text-3xl font-extrabold px-5">
          <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Fullstack Books
          </p>
        </div>

        <div className="mt-5">
          <p className="px-5 mt-10 mb-5 text-gray-400">DISCOVER</p>
          <NavbarItem to="/search" emoji="🔎" name={NavbarItemName.SEARCH} />
          <NavbarItem to="/" emoji="💖" name={NavbarItemName.FOR_YOU} />
        </div>
        <div>
          <p className="px-5 mt-10 mb-5 text-gray-400">LIBRARY</p>
          <NavbarItem
            to="/favorites"
            emoji="❤️"
            name="Favorites"
            isDisabled={!isAuth}
          />
          <NavbarItem to="/to-read" emoji="📖" name="To read" isDisabled={!isAuth} />
          <NavbarItem to="/explore/more" emoji="✨" name={NavbarItemName.MORE} />
        </div>

        <div>
          <p className="px-5 mt-10 mb-5 text-gray-400">ACCOUNT</p>
          <UserCard isAuth={isAuth} />
        </div>
      </div>
      <div>
        <p className="px-5 mt-10 mb-5 text-gray-400">THEME</p>
        <div className="flex items-center">
          <p className="text-3xl">🌞</p>
          <Switch
            onChange={() => {
              toggleDarkMode();
            }}
            checked={darkMode}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor={COLORS.ACCENT_COLOR_DARK_MODE}
            offColor="#a8a29e"
            className="mx-5"
          />
          <p className="text-3xl">🌚</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
