import { FormControl } from '@angular/forms';

export type Car = {
  name: string | FormControl<string>;
  color: string;
  id: number;
  velocity?: number;
};

export interface IGaragePage {
  page: number;
  limit: number;
  isRace: boolean;
  currentRace: number;
}

export type StartEngineResponse = {
  velocity: number;
  distance: number;
};

export type CarsVelocityType = {
  id: number;
  velocity: number;
};

export type ResponseSwitchDriveMode = { success: boolean };
