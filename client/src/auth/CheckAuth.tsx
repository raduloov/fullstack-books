import { useAuth } from '../hooks/useAuth';

export const CheckAuth = () => {
  const { checkIsAuth } = useAuth();

  checkIsAuth();

  return <></>;
};
