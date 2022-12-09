import { Exercise1, IExercise1 } from '.';

let exercise1: IExercise1;

describe('Exercise 1', () => {
  beforeAll(() => {
    exercise1 = new Exercise1();
  });

  it('Create mask', () => {
    const { maskify } = exercise1;

    expect(maskify('4556364607935616')).toBe('############5616');
    expect(maskify('64607935616')).toBe('#######5616');
    expect(maskify('1')).toBe('1');
    expect(maskify('')).toBe('');
    expect(maskify('Skippy')).toBe('##ippy');
    expect(maskify('Nanananananananananana Batman!')).toBe('##########################man!');
  });
});
