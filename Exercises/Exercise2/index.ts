interface ObjectKeys {
  [key: string]: string | number;
}

export interface IExercise2 {
  updateData: (currentObject: ObjectKeys, newDataObject: ObjectKeys) => ObjectKeys;
}

export class Exercise2 implements IExercise2 {
  updateData = (currentObject: ObjectKeys, newDataObject: ObjectKeys): ObjectKeys => {
    const updatedObject = { ...currentObject };

    if (currentObject?.name && newDataObject?.name && currentObject?.name !== newDataObject?.name) {
      return currentObject;
    }

    for (const [key, value] of Object.entries(newDataObject)) {
      if (updatedObject[key]) {
        updatedObject[key] = value;
      }
    }

    return updatedObject;
  };
}
