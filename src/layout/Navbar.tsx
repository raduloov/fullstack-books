import React, { useState } from 'react';
import NavbarItem from '../components/UI/NavbarItem';
import Switch from 'react-switch';

enum NavbarItemName {
  SEARCH = 'Search',
  FOR_YOU = 'For you',
  FICTION = 'Fiction',
  POETRY = 'Poetry',
  FANTASY = 'Fantasy',
  ROMANCE = 'Romance',
  MORE = 'More'
}

const Navbar = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

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
          <NavbarItem to="/for-you" emoji="💖" name={NavbarItemName.FOR_YOU} />
        </div>
        <div>
          <p className="px-5 mt-10 mb-5 text-gray-400">LIBRARY</p>
          <NavbarItem
            to="/category/fiction"
            emoji="👽"
            name={NavbarItemName.FICTION}
          />
          <NavbarItem
            to="/category/poetry"
            emoji="🌈"
            name={NavbarItemName.POETRY}
          />
          <NavbarItem
            to="/category/fantasy"
            emoji="🌺"
            name={NavbarItemName.FANTASY}
          />
          <NavbarItem
            to="/category/romance"
            emoji="💕"
            name={NavbarItemName.ROMANCE}
          />
          <NavbarItem to="/category/more" emoji="✨" name={NavbarItemName.MORE} />
        </div>
      </div>
      <div className="flex items-center mx-auto">
        <p className="text-3xl">🌞</p>
        <Switch
          onChange={() => {
            setDarkMode(prevState => !prevState);
          }}
          checked={darkMode}
          checkedIcon={false}
          uncheckedIcon={false}
          onColor="#8b5cf6"
          offColor="#a8a29e"
          className="mx-5"
        />
        <p className="text-3xl">🌚</p>
      </div>
    </div>
  );
};

export default Navbar;
