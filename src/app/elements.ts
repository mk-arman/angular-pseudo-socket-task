import { faker } from '@faker-js/faker';
import { ColorTypes } from './enums/color.enum';
import { IElement } from './interfaces/IElement.interface';

export const NUMBERS_WITH_COMMAS_PATTERN = /^[0-9,\s]*$/;

export function getElements(arraySize: number): IElement[] {
  return new Array(arraySize).fill(null).map(() => {
    return {
      id: `${faker.number.int({ min: 100, max: arraySize + 100 })}`,
      int: faker.number.int({ min: 10000, max: 1000000 }),
      float: getRandomFloatNumberWithPrecision(18),
      color: getRandomColor(),
      child: {
        id: `${faker.number.int({ min: 1, max: 1000 })}`,
        color: getRandomColor(),
      },
    };
  });
}

export function getRandomColor(): string {
  const colorTypes: ColorTypes[] = [
    ColorTypes.HEX,
    ColorTypes.RGB,
    ColorTypes.HRS,
  ];
  const random = Math.floor(Math.random() * colorTypes.length);

  switch (colorTypes[random]) {
    case ColorTypes.RGB:
      return faker.color.rgb({ format: 'css' });
    case ColorTypes.HEX:
      return faker.color.rgb();
    case ColorTypes.HRS:
      return faker.color.human();
    default:
      return faker.color.human();
  }
}

export function getRandomFloatNumberWithPrecision(precision: number, minimum = 0, maximum = 99): string {
  const random = Math.random() * (maximum - minimum) + minimum;
  return random.toFixed(precision);
}