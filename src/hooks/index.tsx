import React, { ReactNode } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

import { BrandsProvider } from './brands';
import { QueryClientProvider } from 'react-query';

import { queryClient } from '../services/queryClient';
import { ThemeProvider } from './theme';

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <ThemeProvider>
        <BrandsProvider>{children}</BrandsProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
