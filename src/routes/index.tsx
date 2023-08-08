import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { isAuthenticated, loginAction } from '@/features/auth';
import { useAppDispatch } from '@/hooks/typedReduxHooks';
import storage from '@/utils/storage';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = storage.getToken();
    if (token) {
      dispatch(loginAction(token));
    }
  }, [dispatch]);
  const isAuth = isAuthenticated();
  const routes = isAuth ? protectedRoutes : [];
  const element = useRoutes([...publicRoutes, ...routes]);
  return <>{element}</>;
};
