import React from 'react';

import AppProvider from '../hooks';

import GlobalStyle from '../styles/global';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AppProvider>
      <Component {...pageProps} />
      <GlobalStyle />
    </AppProvider>
  );
}
