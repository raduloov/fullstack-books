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
  const { darkMode, toggle } = useDarkMode();

  return (
    <div className="flex flex-col justify-between w-[20%] h-[100vh] px-[3%] py-10 fixed">
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
          <NavbarItem to="/favorites" emoji="❤️" name="Favorites" />
          <NavbarItem to="/to-read" emoji="📖" name="To read" />
          <NavbarItem to="/explore/more" emoji="✨" name={NavbarItemName.MORE} />
        </div>

        <div>
          <p className="px-5 mt-10 mb-5 text-gray-400">ACCOUNT</p>
          <UserCard isAuth={isAuth} darkMode={darkMode} />
        </div>
      </div>
      <div className="flex items-center mx-auto">
        <p className="text-3xl">🌞</p>
        <Switch
          onChange={() => {
            toggle();
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
  );
};

export default Navbar;
