import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useRedux';
import { uiActions } from '../../store/uiSlice';

interface Props {
  to: string;
  name: string;
  emoji: string;
  isDisabled?: boolean;
}

export const NavbarItem = ({ to, name, emoji, isDisabled }: Props) => {
  const dispatch = useAppDispatch();

  const enabled = (navData: any) =>
    `${
      navData.isActive
        ? 'bg-violet-500 dark:bg-violet-300 text-white dark:text-black shadow-xl'
        : ''
    } flex dark:text-white rounded-3xl my-5 py-3 px-8 cursor-pointer hover:shadow-md ease duration-200`;
  const disabled =
    'opacity-40 pointer-events-none flex dark:text-white rounded-3xl my-5 py-3 px-8 cursor-pointer hover:shadow-md ease duration-200';

  const closeNavbar = () => {
    dispatch(uiActions.toggleNavbar());
  };

  return (
    <NavLink
      to={to}
      onClick={closeNavbar}
      className={isDisabled ? disabled : enabled}
    >
      <p className="mr-4">{emoji}</p>
      <p>{name}</p>
    </NavLink>
  );
};
