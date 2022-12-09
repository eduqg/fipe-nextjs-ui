import { Exercise2, IExercise2 } from '.';

let exercise2: IExercise2;

describe('Exercise 2', () => {
  beforeAll(() => {
    exercise2 = new Exercise2();
  });

  it('Update object data', () => {
    const { updateData } = exercise2;

    expect(updateData({ name: 'Marcos', country: 'Brasil', age: 22 }, { country: 'Japão', age: 33 })).toStrictEqual({
      name: 'Marcos',
      country: 'Japão',
      age: 33,
    });
    expect(
      updateData(
        { name: 'Marcos', country: 'Brasil', age: 22 },
        { price: 89.9, amount: 15, description: 'camiseta 100% algodão' },
      ),
    ).toStrictEqual({ name: 'Marcos', country: 'Brasil', age: 22 });
    expect(
      updateData({ name: 'Rafael', country: 'Chile', age: 42 }, { name: 'Camiseta Polo', price: 59.9, amount: 30 }),
    ).toStrictEqual({ name: 'Rafael', country: 'Chile', age: 42 });
  });
});
