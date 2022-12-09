import axios from 'axios';

enum Gender {
  Male = 'Homem',
  Female = 'Mulher',
  Other = 'Outro',
}

enum Species {
  Human = 'Humano',
}

interface ResponseCharacter {
  id: number;
  name: string;
  status: string;
  species: keyof typeof Species;
  type: string;
  gender: keyof typeof Gender;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface Character {
  nome: string;
  genero: string;
  avatar: string;
  especie: string;
}

export interface IExercise3 {
  getRickAndMortyCharacters: () => Promise<Character[]>;
}

export class Exercise3 implements IExercise3 {
  getRickAndMortyCharacters = async (): Promise<Character[]> => {
    const response = await axios.get<ResponseCharacter[]>('https://rickandmortyapi.com/api/character/1,2,3,4,5');

    const parsedResponse: Character[] = response.data.map((character: ResponseCharacter) => {
      return {
        avatar: character.image,
        especie: Species[character.species],
        genero: Gender[character.gender],
        nome: character.name,
      };
    });

    return parsedResponse;
  };
}
