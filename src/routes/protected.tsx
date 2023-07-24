import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { MainLayout } from '@/components/Layout/MainLayout';
import { lazyImport } from '@/utils/lazyImport';

const { Dashboard } = lazyImport(() => import('@/features/dashboard'), 'Dashboard');
const { Surveys } = lazyImport(() => import('@/features/surveys'), 'Surveys');
const { SurveyDetail } = lazyImport(() => import('@/features/surveys'), 'SurveyDetail');

const App = () => {
  return (
    <>
      <Suspense fallback={<div className="h-full w-full flex items-center justify-center">Loading...</div>}>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </Suspense>
    </>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'surveys', element: <Surveys /> },
      { path: 'surveys/:id', element: <SurveyDetail /> },

      { path: '*', element: <Navigate to="." /> },
    ],
  },
  { path: '*', element: <Navigate to="/app" /> },
];

export const PRIVATE_ROUTES = {
  DASHBOARD: '/app',
  SURVEYS: '/app/surveys',
};
