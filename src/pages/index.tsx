import React, { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { GetStaticProps } from 'next';

import FormFipe from '../components/FormFipe';
import Result from '../components/Result';

import { Container } from '../styles/pages/Home';

import { Fipe } from '../types/Fipe';
import { Brand } from '../types/Brand';

export interface RequestFipe {
  brandId: string;
  modelId: string;
  yearId: string;
}

interface HomeProps {
  brands: Brand[];
}

export default function Home({ brands }: HomeProps): JSX.Element {
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

      {!fipe ? <FormFipe brands={brands} handleGetFipe={handleGetFipe} /> : <Result fipe={fipe} />}
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get<Brand[]>('https://parallelum.com.br/fipe/api/v1/carros/marcas');

  return {
    props: {
      brands: response?.data,
    },
    revalidate: 60 * 60 * 24 * 30,
  };
};
