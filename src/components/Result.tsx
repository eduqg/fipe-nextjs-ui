import React from 'react';

import { Container } from '../styles/components/Result';

import { Fipe } from '../types/Fipe';

interface ResultProps {
  fipe: Fipe;
}

export default function Result({ fipe }: ResultProps) {
  return (
    <Container>
      <h1>
        Tabela Fipe: Preço {fipe.Marca} {fipe.Modelo} {fipe.AnoModelo}{' '}
      </h1>
      <div>{fipe.Valor}</div>
      <h3>Este é o preço de compra do veículo</h3>
    </Container>
  );
}
