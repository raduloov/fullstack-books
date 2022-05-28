import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  name: string;
  emoji: string;
}

const NavbarItem = ({ to, name, emoji }: Props) => {
  return (
    <NavLink
      to={to}
      className={navData =>
        `${
          navData.isActive ? 'bg-violet-500 text-white shadow-xl' : ''
        } flex rounded-3xl my-5 py-3 px-8 cursor-pointer hover:shadow-md ease duration-200`
      }
    >
      <p className="mr-4">{emoji}</p>
      <p>{name}</p>
    </NavLink>
  );
};

export default NavbarItem;
