import { useAppSelector } from '../../hooks/useRedux';
import Navbar from '../../layout/Navbar';

interface Props {
  toggleNavbar: () => void;
}

const Drawer = ({ toggleNavbar }: Props) => {
  const { isAuth } = useAppSelector(state => state.auth);

  return (
    <>
      <div
        onClick={toggleNavbar}
        className="bg-[rgba(0,0,0,0.8)] w-screen h-screen z-20 fixed backdrop-blur-sm shadow-md animate-[blur-in_0.5s_ease]"
      ></div>
      <Navbar isAuth={isAuth} />
    </>
  );
};

export default Drawer;
