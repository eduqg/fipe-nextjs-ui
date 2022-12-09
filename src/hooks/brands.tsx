import axios from 'axios';
import React, { createContext, ReactNode, useContext } from 'react';
import { useQuery } from 'react-query';

import { Brand } from '../types/Brand';

interface BrandsContextData {
  brands: Brand[] | undefined;
}

const fetchBrands = async (): Promise<Brand[]> =>
  await axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas').then(response => response.data);

const initialBrandsContext = {};

const BrandsContext = createContext<BrandsContextData>(initialBrandsContext as BrandsContextData);

interface BrandsProviderProps {
  children: ReactNode;
}

function BrandsProvider({ children }: BrandsProviderProps): JSX.Element {
  const { data: brands } = useQuery({ queryKey: ['brands'], queryFn: fetchBrands });

  return <BrandsContext.Provider value={{ brands }}>{children}</BrandsContext.Provider>;
}

function useBrands(): BrandsContextData {
  const context = useContext(BrandsContext);

  if (!context) {
    throw new Error('useBrands must be used within BrandsProvider');
  }

  return context;
}

export { BrandsProvider, useBrands };
