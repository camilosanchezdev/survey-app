import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { PageNotFound } from '@/components/Layout/PageNotFound';
import { PublicLayout } from '@/components/Layout/PublicLayout';
import { lazyImport } from '@/utils/lazyImport';

const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');
const { PublicSurvey } = lazyImport(() => import('@/features/surveys/routes/PublicSurvey'), 'PublicSurvey');
const { PublicSurveySuccess } = lazyImport(
  () => import('@/features/surveys/routes/PublicSurveySuccess'),
  'PublicSurveySuccess',
);

const App = () => {
  return (
    <>
      <Suspense fallback={<div className="h-full w-full flex items-center justify-center">Loading...</div>}>
        <PublicLayout>
          <Outlet />
        </PublicLayout>
      </Suspense>
    </>
  );
};

export const publicRoutes = [
  {
    path: '*',
    element: <AuthRoutes />,
  },
  {
    path: 'survey',
    element: <App />,
    children: [
      { path: ':id', element: <PublicSurvey /> },
      { path: ':id/success', element: <PublicSurveySuccess /> },
      { path: '', element: <PageNotFound /> },
    ],
  },
];
