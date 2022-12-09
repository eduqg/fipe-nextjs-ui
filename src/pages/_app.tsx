import React from 'react';
import { ThemeProvider } from 'styled-components';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import GlobalStyle from '../styles/global';
import theme from '../styles/theme';

import type { AppProps } from 'next/app';
import { queryClient } from '../services/queryClient';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
