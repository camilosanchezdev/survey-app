import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from '@/components/Layout/PageNotFound';
import { Home } from './Home';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
