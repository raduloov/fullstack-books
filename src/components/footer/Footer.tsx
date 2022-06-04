import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="flex justify-center items-center mt-20 mb-10">
      <p className="mr-5">@2022 Yavor Radulov</p>
      <div
        onClick={() =>
          window.open('https://github.com/raduloov/fullstack-books', '_blank')
        }
        className="cursor-pointer"
      >
        <FaGithub size={30} />
      </div>
    </div>
  );
};

export default Footer;
