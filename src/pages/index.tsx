import React, { useState } from 'react';
import Head from 'next/head';
import { useQuery } from 'react-query';
import { SelectInputProps, SelectChangeEvent } from '@mui/material/Select/SelectInput';
import axios from 'axios';

import { Select, SelectOption } from '../components/Select';

import { Button } from '../components/Button';
import Result from '../components/Result';

import { Container } from '../styles/pages/Home';

import { Brand } from '../types/Brand';
import { Model } from '../types/Model';
import { Year } from '../types/Year';

interface ResponseModels {
  anos: Year[];
  modelos: Model[];
}

interface RequestFipe {
  brandId: string;
  modelId: string;
  yearId: string;
}
export interface Fipe {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  TipoVeiculo: number;
  SiglaCombustivel: string;
}

const fetchBrands = async (): Promise<Brand[]> =>
  await axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas').then(response => response.data);

export default function Home(): JSX.Element {
  const [brand, setBrand] = useState<Brand | ''>('');
  const [model, setModel] = useState<Model | ''>('');
  const [year, setYear] = useState<Year | ''>('');

  const { data: brands } = useQuery({ queryKey: ['brands'], queryFn: fetchBrands });
  const [models, setModels] = useState<Array<{ codigo: string; nome: string }> | undefined>(undefined);
  const [years, setYears] = useState<Year[] | undefined>(undefined);

  const [fipe, setFipe] = useState<Fipe | undefined>(undefined);

  const loadModels = async (brandId: string): Promise<void> => {
    try {
      const response = await axios.get<ResponseModels>(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos`,
      );

      if (response) {
        setModels(response.data.modelos.map(item => ({ codigo: String(item.codigo), nome: item.nome })));
        setYears(response.data.anos);
      }
    } catch (error) {
      console.log('Erro ao carregar modelos');
    }
  };

  const loadYears = async (brandId: string, yearId: string): Promise<void> => {
    try {
      const response = await axios.get<Year[]>(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos/${yearId}/anos`,
      );

      if (response) setYears(response.data);
    } catch (error) {
      console.log('Erro ao carregar anos');
    }
  };

  const handleChangeBrand = async (event: SelectChangeEvent<Brand>) => {
    const {
      target: { value },
    } = event;

    if (brands && Array.isArray(brands)) {
      const newBrand: Brand | undefined = brands.find((item: Brand) => item.nome === value);
      if (newBrand) {
        const selectedBrand: Brand = newBrand;
        setBrand(selectedBrand);

        await loadModels(selectedBrand.codigo);
      }
    }
  };

  const handleChangeModel = async (event: SelectChangeEvent<Model>) => {
    const {
      target: { value },
    } = event;

    if (models && Array.isArray(models)) {
      const newModel: Model | undefined = models.find((item: Model) => item.nome === value);
      if (newModel && brand) {
        setModel(newModel);

        await loadYears(brand.codigo, newModel.codigo);
      }
    }
  };

  const handleChangeYear = (event: SelectChangeEvent<Year>) => {
    const {
      target: { value },
    } = event;

    if (years && Array.isArray(years)) {
      const newYear: Year | undefined = years.find((item: Year) => item.nome === value);
      if (newYear) setYear(newYear);
    }
  };

  const handleGetFipe = async ({ brandId, modelId, yearId }: RequestFipe): Promise<void> => {
    try {
      const response = await axios.get<Fipe>(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`,
      );

      if (response) setFipe(response.data);
    } catch (error) {
      console.log('Erro ao carregar fipe');
    }
  };

  return (
    <Container>
      <Head>
        <title>Tabela Fipe</title>
      </Head>

      {!fipe ? (
        <>
          <h1>Tabela Fipe</h1>

          <h2>Consulte o valor de um veículo de forma gratuita</h2>

          {brands && (
            <Select
              options={brands as SelectOption[]}
              placeholder="Selecione uma Marca"
              selectProps={{
                value: (brand as Brand)?.nome || '',
                onChange: handleChangeBrand as SelectInputProps<unknown>['onChange'],
              }}
            />
          )}

          {models && (
            <Select
              options={models as SelectOption[]}
              placeholder="Selecione uma Modelo"
              selectProps={{
                value: (model as Model)?.nome || '',
                onChange: handleChangeModel as SelectInputProps<unknown>['onChange'],
              }}
            />
          )}

          {years && (
            <Select
              options={years as SelectOption[]}
              placeholder="Selecione uma Ano"
              selectProps={{
                value: (year as Year)?.nome || '',
                onChange: handleChangeYear as SelectInputProps<unknown>['onChange'],
              }}
            />
          )}

          <Button
            variant="contained"
            type="button"
            onClick={async () =>
              await handleGetFipe({
                brandId: (brand as Brand).codigo,
                modelId: (model as Model).codigo,
                yearId: (year as Year).codigo,
              })
            }
          >
            Consultar preço
          </Button>
        </>
      ) : (
        <Result fipe={fipe} />
      )}
    </Container>
  );
}
