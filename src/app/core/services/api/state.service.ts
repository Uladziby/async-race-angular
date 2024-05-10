import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import {
  Car,
  CarsVelocityType,
  IGaragePage,
} from 'src/app/shared/interfaces/types';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private carsVelocity = new BehaviorSubject<CarsVelocityType[]>([]);
  private garage = new BehaviorSubject<Car[]>([]);

  currentCarsVelocity = this.carsVelocity.asObservable();

  currentGarage = this.garage.asObservable();

  garagePage: IGaragePage = {
    page: 1,
    limit: 7,
    isRace: false,
    currentRace: 1,
  };

  getCars() {
    return this.currentGarage;
  }

  addCar(car: Car) {
    this.garage.next([...this.garage.value, car]);
  }

  setCars(cars: Car[]) {
    this.garage.next(cars);
    console.log('setCars', this.garage.getValue());
  }

  getCarsVelocity() {
    console.log('subject', this.carsVelocity.value);
    return this.currentCarsVelocity;
  }

  setCarsVelocity(carsVelocity: CarsVelocityType[]) {
    console.log('setCarsVelocity', carsVelocity);
    if (carsVelocity.length === 0) return;
    this.carsVelocity.next(carsVelocity);
  }
}
