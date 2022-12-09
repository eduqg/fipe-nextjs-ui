import React, { ReactNode } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';

import theme from '../styles/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

const muiTheme = createTheme(theme);

function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <StyledProvider theme={theme}>{children}</StyledProvider>
    </MuiThemeProvider>
  );
}

export { ThemeProvider };
