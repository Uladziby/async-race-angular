import { CarOptionsType } from 'src/app/shared/interfaces/types';

export const defineBestVelocity = (options: CarOptionsType[]) => {
  return Math.max(...options.map((obj) => obj.velocity));
};
