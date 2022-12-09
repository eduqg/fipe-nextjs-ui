import { Exercise3, IExercise3 } from '.';

let exercise3: IExercise3;

describe('Exercise 3', () => {
  beforeAll(() => {
    exercise3 = new Exercise3();
  });

  it('Get rick and morty characters', async () => {
    const { getRickAndMortyCharacters } = exercise3;

    expect(await getRickAndMortyCharacters()).toStrictEqual([
      {
        nome: 'Rick Sanchez',
        genero: 'Homem',
        avatar: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        especie: 'Humano',
      },
      {
        nome: 'Morty Smith',
        genero: 'Homem',
        avatar: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
        especie: 'Humano',
      },
      {
        nome: 'Summer Smith',
        genero: 'Mulher',
        avatar: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
        especie: 'Humano',
      },
      {
        nome: 'Beth Smith',
        genero: 'Mulher',
        avatar: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
        especie: 'Humano',
      },
      {
        nome: 'Jerry Smith',
        genero: 'Homem',
        avatar: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
        especie: 'Humano',
      },
    ]);
  });
});
