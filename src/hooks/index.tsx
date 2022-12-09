import React, { ReactNode } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

import { BrandsProvider } from './brands';
import { QueryClientProvider } from 'react-query';
import { ThemeProvider } from './theme';
import { ModelsProvider } from './models';
import { YearsProvider } from './years';

import { queryClient } from '../services/queryClient';

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <ThemeProvider>
        <BrandsProvider>
          <ModelsProvider>
            <YearsProvider>{children}</YearsProvider>
          </ModelsProvider>
        </BrandsProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
