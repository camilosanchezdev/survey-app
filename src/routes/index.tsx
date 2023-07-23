import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const isAauth = !!localStorage.getItem('islogged');
  // const commonRoutes = [{ path: "/", element: <Landing /> }];

  const routes = isAauth ? protectedRoutes : publicRoutes;
  const element = useRoutes([...routes]);
  return <>{element}</>;
};
