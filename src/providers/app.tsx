import { PrimeReactProvider } from 'primereact/api';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

type AppProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<div className="flex items-center justify-center w-screen h-screen">Loading...</div>}>
        <PrimeReactProvider>
          <Router>{children}</Router>
        </PrimeReactProvider>
      </React.Suspense>
    </QueryClientProvider>
  );
};
