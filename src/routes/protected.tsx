import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { MainLayout } from '@/components/Layout/MainLayout';
import { lazyImport } from '@/utils/lazyImport';

// const { Dashboard } = lazyImport(() => import('@/features/dashboard'), 'Dashboard');
const { Surveys } = lazyImport(() => import('@/features/surveys'), 'Surveys');
const { NewSurvey } = lazyImport(() => import('@/features/surveys'), 'NewSurvey');
const { SurveyDetail } = lazyImport(() => import('@/features/surveys'), 'SurveyDetail');
const { SurveyReport } = lazyImport(() => import('@/features/surveys'), 'SurveyReport');

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
      // { path: '', element: <Dashboard /> },
      { path: 'surveys', element: <Surveys /> },
      { path: 'surveys/new', element: <NewSurvey /> },
      { path: 'surveys/:id', element: <SurveyDetail /> },
      { path: 'surveys/:id/report', element: <SurveyReport /> },
      { path: '', element: <Navigate to="/app/surveys" /> },
    ],
  },
  { path: '*', element: <Navigate to="/app" /> },
];

export const PRIVATE_ROUTES = {
  DASHBOARD: '/app',
  SURVEYS: '/app/surveys',
  NEW_SURVEY: '/app/surveys/new',
};
