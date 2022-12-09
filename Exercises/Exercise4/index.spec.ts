import { Exercise4, IExercise4 } from '.';

let exercise4: IExercise4;

describe('Exercise 4', () => {
  beforeAll(() => {
    exercise4 = new Exercise4();
  });

  it('Check if first letter is uppercase', () => {
    const { checkIfTheFirstLetterIsUppercase } = exercise4;

    expect(checkIfTheFirstLetterIsUppercase('Brasil')).toBe(true);
    expect(checkIfTheFirstLetterIsUppercase('mobiauto')).toBe(false);
    expect(checkIfTheFirstLetterIsUppercase('xXx xXx')).toBe(false);
    expect(checkIfTheFirstLetterIsUppercase('xDD')).toBe(false);
    expect(checkIfTheFirstLetterIsUppercase('Deu Certo!')).toBe(true);
  });
});
