import axios from 'axios';
import React, { createContext, ReactNode, SetStateAction, useContext, useState } from 'react';

import { Model } from '../types/Model';
import { Year } from '../types/Year';

interface ModelsContextData {
  models: Model[] | undefined;
  setModels: React.Dispatch<SetStateAction<Model[] | undefined>>;
  loadModels: (brandId: string) => Promise<void>;
}

const initialModelsContext = {};

const ModelsContext = createContext<ModelsContextData>(initialModelsContext as ModelsContextData);

interface ResponseModels {
  anos: Year[];
  modelos: Model[];
}

interface ModelsProviderProps {
  children: ReactNode;
}

function ModelsProvider({ children }: ModelsProviderProps): JSX.Element {
  const [models, setModels] = useState<Model[] | undefined>(undefined);

  const loadModels = async (brandId: string): Promise<void> => {
    try {
      const response = await axios.get<ResponseModels>(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos`,
      );

      if (response) {
        setModels(response.data.modelos.map(item => ({ codigo: String(item.codigo), nome: item.nome })));
      }
    } catch (error) {
      console.log('Erro ao carregar modelos');
    }
  };

  return <ModelsContext.Provider value={{ models, setModels, loadModels }}>{children}</ModelsContext.Provider>;
}

function useModels(): ModelsContextData {
  const context = useContext(ModelsContext);

  if (!context) {
    throw new Error('useModels must be used within ModelsProvider');
  }

  return context;
}

export { ModelsProvider, useModels };
