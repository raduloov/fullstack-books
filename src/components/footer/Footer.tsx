import { FaGithub } from 'react-icons/fa';

import useDarkMode from '../../hooks/useDarkMode';

const Footer = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className="flex justify-center items-center py-10">
      <p className="mr-5">@2022 Yavor Radulov</p>
      <div
        onClick={() =>
          window.open('https://github.com/raduloov/fullstack-books', '_blank')
        }
        className="cursor-pointer"
      >
        <FaGithub size={30} color={darkMode ? '#fff' : '#000'} />
      </div>
    </div>
  );
};

export default Footer;
