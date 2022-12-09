export interface IExercise1 {
  maskify: (value: string) => string;
}

export class Exercise1 implements IExercise1 {
  maskify = (value: string): string => {
    if (value.length <= 4) return value;

    const initialMask = new Array(value.length - 3).join('#');
    const final4 = value.slice(-4);
    const masked = initialMask + final4;

    return masked;
  };
}
