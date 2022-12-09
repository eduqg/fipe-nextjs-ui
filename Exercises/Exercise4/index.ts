export interface IExercise4 {
  checkIfTheFirstLetterIsUppercase: (value: string) => boolean;
}

export class Exercise4 implements IExercise4 {
  checkIfTheFirstLetterIsUppercase = (value: string): boolean => {
    const character = value[0];
    let isFirstLetterUppercase = false;

    if (character === character.toUpperCase()) {
      isFirstLetterUppercase = true;
    }
    if (character === character.toLowerCase()) {
      isFirstLetterUppercase = false;
    }

    return isFirstLetterUppercase;
  };
}
