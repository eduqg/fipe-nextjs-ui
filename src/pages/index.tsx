import React, { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

import FormFipe from '../components/FormFipe';
import Result from '../components/Result';

import { Container } from '../styles/pages/Home';

import { Fipe } from '../types/Fipe';

export interface RequestFipe {
  brandId: string;
  modelId: string;
  yearId: string;
}

export default function Home(): JSX.Element {
  const [fipe, setFipe] = useState<Fipe | undefined>(undefined);

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

      {!fipe ? <FormFipe handleGetFipe={handleGetFipe} /> : <Result fipe={fipe} />}
    </Container>
  );
}
