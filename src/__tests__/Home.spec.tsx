import { ReactNode } from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { ThemeProvider } from 'styled-components';

import Home from '../pages/index';

import defaultTheme from '../styles/theme';

const apiMock = new MockAdapter(axios);

const mockBrands = [
  {
    nome: 'Hyundai',
    codigo: '26',
  },
  {
    nome: 'Isuzu',
    codigo: '27',
  },
];

jest.mock('../hooks/models', () => {
  return {
    useModels: () => ({
      models: [
        {
          nome: 'Gol Special/ Special Xtreme 1.0 Mi 2p',
          codigo: 2434,
        },
        {
          nome: 'Gol TECH 1.0 Mi Total Flex 8V 2p',
          codigo: 4092,
        },
      ],
      loadModels: jest.fn(),
    }),
  };
});

jest.mock('../hooks/years', () => {
  return {
    useYears: () => ({
      years: [
        {
          nome: '2022 Diesel',
          codigo: '2022-3',
        },
      ],
      loadYears: jest.fn(),
    }),
  };
});

const ThemeWrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
);

describe('Home', () => {
  it('renders Home', () => {
    const { getByRole } = render(<Home brands={mockBrands} />, { wrapper: ThemeWrapper });
    expect(
      getByRole('heading', {
        name: /consulte o valor de um veículo de forma gratuita/i,
      }),
    ).toBeInTheDocument();
  });

  it('generates fipe', async () => {
    apiMock.onGet('https://parallelum.com.br/fipe/api/v1/carros/marcas/26/modelos/2434/anos/2022-3').reply(200, {
      Valor: 'R$ 125.948,00',
      Marca: 'VW - VolksWagen',
      Modelo: 'AMAROK High.CD 2.0 16V TDI 4x4 Dies. Aut',
      AnoModelo: 2014,
      Combustivel: 'Diesel',
      CodigoFipe: '005340-6',
      MesReferencia: 'dezembro de 2022 ',
      TipoVeiculo: 1,
      SiglaCombustivel: 'D',
    });

    const { container } = render(<Home brands={mockBrands} />, { wrapper: ThemeWrapper });

    const brandSelect = container.querySelector('#brand-field') as HTMLDivElement;
    expect(brandSelect).toBeInTheDocument();
    fireEvent.mouseDown(brandSelect);
    await act(() => {
      fireEvent.click(screen.getByText('Hyundai'));
    });

    let modelSelect;
    await waitFor(() => {
      modelSelect = container.querySelector('#model-field') as HTMLDivElement;
    });
    expect(modelSelect).toBeInTheDocument();
    if (modelSelect) fireEvent.mouseDown(modelSelect);
    await act(() => {
      fireEvent.click(screen.getByText('Gol Special/ Special Xtreme 1.0 Mi 2p'));
    });

    let yearSelect;
    await waitFor(() => {
      yearSelect = container.querySelector('#year-field') as HTMLDivElement;
    });
    expect(yearSelect).toBeInTheDocument();
    if (yearSelect) fireEvent.mouseDown(yearSelect);
    await act(() => {
      fireEvent.click(screen.getByText('2022 Diesel'));
    });

    const consultButton = screen.getByRole('button', {
      name: /consultar preço/i,
    });

    await act(() => {
      fireEvent.click(consultButton);
    });

    expect(screen.getByText(/r\$ 125\.948,00/i)).toBeInTheDocument();
  });
});
