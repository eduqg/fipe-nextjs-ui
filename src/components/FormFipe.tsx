import React, { useState } from 'react';
import { SelectInputProps, SelectChangeEvent } from '@mui/material/Select/SelectInput';

import { useModels } from '../hooks/models';
import { useYears } from '../hooks/years';

import { Select, SelectOption } from '../components/Select';
import { Button } from '../components/Button';

import { Container, Content } from '../styles/components/FormFipe';

import { RequestFipe } from '../pages';
import { Brand } from '../types/Brand';
import { Model } from '../types/Model';
import { Year } from '../types/Year';

interface FormFipeProps {
  brands: Brand[];
  handleGetFipe: (data: RequestFipe) => void;
}

export default function FormFipe({ brands, handleGetFipe }: FormFipeProps) {
  const { models, loadModels } = useModels();
  const { years, loadYears } = useYears();

  const [brand, setBrand] = useState<Brand | ''>('');
  const [model, setModel] = useState<Model | ''>('');
  const [year, setYear] = useState<Year | ''>('');

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

  return (
    <Container>
      <h1>Tabela Fipe</h1>

      <h2>Consulte o valor de um veículo de forma gratuita</h2>

      <Content>
        {brands && (
          <Select
            name="brand"
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
            name="model"
            options={models as SelectOption[]}
            placeholder="Selecione um Modelo"
            selectProps={{
              value: (model as Model)?.nome || '',
              onChange: handleChangeModel as SelectInputProps<unknown>['onChange'],
            }}
          />
        )}

        {years && (
          <Select
            name="year"
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
          disabled={brand === '' || model === '' || year === ''}
          onClick={() => {
            handleGetFipe({
              brandId: (brand as Brand).codigo,
              modelId: (model as Model).codigo,
              yearId: (year as Year).codigo,
            });
          }}
        >
          Consultar preço
        </Button>
      </Content>
    </Container>
  );
}
