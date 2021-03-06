import { useAppSelector } from '../../hooks/useRedux';
import { Navbar } from '../../layout/Navbar';

interface Props {
  toggleNavbar: () => void;
}

export const Drawer = ({ toggleNavbar }: Props) => {
  const { isAuth } = useAppSelector(state => state.auth);

  return (
    <>
      <div
        onClick={toggleNavbar}
        className="bg-[rgba(0,0,0,0.8)] w-screen h-screen animate-[blur-in_0.3s_ease-in-out] z-20 fixed backdrop-blur-sm shadow-md"
      ></div>
      <Navbar isAuth={isAuth} />
    </>
  );
};
