import React, { ReactNode } from 'react';
import Head from 'next/head';

import { Container } from '../styles/pages/Home';
import { Select } from '../components/Select/Select';
import { OutlinedInput, SelectChangeEvent } from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import { Button } from '../components/Button/Button';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default function Home(): JSX.Element {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Container>
      <Head>
        <title>Tabela Fipe</title>
      </Head>

      <h1>Tabela Fipe</h1>

      <h2>Consulte o valor de um veículo de forma gratuita</h2>

      <Select
        options={names}
        placeholder="Selecione uma Marca"
        selectProps={{
          multiple: true,
          displayEmpty: true,
          value: personName,
          onChange: handleChange as SelectInputProps<unknown>['onChange'],
          input: <OutlinedInput />,
          MenuProps,
          inputProps: { 'aria-label': 'Without label' },
        }}
      />

      <Button variant="contained">Consultar preço</Button>
    </Container>
  );
}
