import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { lazyImport } from '@/utils/lazyImport';

const { Dashboard } = lazyImport(() => import('@/features/dashboard'), 'Dashboard');

const App = () => {
  return (
    <div>
      <Suspense fallback={<div className="h-full w-full flex items-center justify-center">Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: '', element: <Dashboard /> },

      { path: '*', element: <Navigate to="." /> },
    ],
  },
  { path: '*', element: <Navigate to="/app" /> },
];
