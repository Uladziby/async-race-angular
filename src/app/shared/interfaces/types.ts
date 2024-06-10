import { FormControl } from '@angular/forms';

export type Car = {
  name: string | FormControl<string>;
  color: string;
  id: number;
};

export type CarOptionsType = {
  isDriveMode: boolean;
  id: number;
  velocity: number;
  distance: number;
  isEngineStarted: boolean;
};

export type GaragePageType = {
  page?: number;
  limit?: number;
  isRace?: boolean;
  currentRace?: number;
};

export type StartEngineResponse = {
  velocity: number;
  distance: number;
};

export type CarsVelocityType = {
  id: number;
  velocity: number;
  distance: number;
};

export type ResponseCarsVelocityType = {
  id: number;
  velocity: number;
  distance: number;
};

export type ResponseSwitchDriveMode = { success: boolean; id: number };

export type ResponseWinnersType = {
  id: number;
  wins: number;
  time: number;
};

export type WinnersType = {
  id: number;
  wins: number;
  time: string;
};

export type WinnersUpdatedType = {
  number: number;
  name: string | FormControl<string> | undefined;
  bestTime: string;
  wins: number;
};

export type PagerType = {
  startIndex: number;
  endIndex: number;
  totalItems: number;
  maxPages: number;
};
