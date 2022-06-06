import useAuth from '../hooks/useAuth';

const CheckAuth = () => {
  const { checkIsAuth } = useAuth();

  checkIsAuth();

  return <></>;
};

export default CheckAuth;
