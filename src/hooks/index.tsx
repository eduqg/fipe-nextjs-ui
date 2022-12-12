import React, { ReactNode } from 'react';

import { ThemeProvider } from './theme';
import { ModelsProvider } from './models';
import { YearsProvider } from './years';

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <ThemeProvider>
      <ModelsProvider>
        <YearsProvider>{children}</YearsProvider>
      </ModelsProvider>
    </ThemeProvider>
  );
}
