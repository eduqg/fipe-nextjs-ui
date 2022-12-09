import Home from '../pages/index';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/theme';
import { ReactNode } from 'react';

jest.mock('react-query', () => ({
  useQuery: jest.fn().mockReturnValue({
    data: [
      {
        nome: 'Acura',
        codigo: '1',
      },
      {
        nome: 'Agrale',
        codigo: '2',
      },
    ],
    isLoading: false,
    error: {},
  }),
}));

const ThemeWrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
);

describe('Home', () => {
  it('renders Home', () => {
    const { getByRole } = render(<Home />, { wrapper: ThemeWrapper });
    expect(
      getByRole('heading', {
        name: /consulte o valor de um veículo de forma gratuita/i,
      }),
    ).toBeInTheDocument();
  });
});
