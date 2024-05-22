import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

import {
  Car,
  CarsVelocityType,
  IGaragePage,
} from 'src/app/shared/interfaces/types';

@Injectable({
  providedIn: 'root',
})
//добавить обьект после запуска драйв мода
export class StateService {
  private carsVelocity = new ReplaySubject<CarsVelocityType[]>();
  private garage = new BehaviorSubject<Car[]>([]);

  currentCarsVelocity$ = this.carsVelocity.asObservable();

  currentGarage$ = this.garage.asObservable();

  garagePage: IGaragePage = {
    page: 1,
    limit: 7,
    isRace: false,
    currentRace: 1,
  };

  getCars() {
    return this.currentGarage$;
  }

  addCar(car: Car) {
    this.garage.next([...this.garage.value, car]);
  }

  setCars(cars: Car[]) {
    this.garage.next(cars);
  }

  getCarsVelocity() {
    return this.currentCarsVelocity$;
  }

  setCarsVelocity(carsVelocity: CarsVelocityType[]) {
    console.log('setCarsVelocity', carsVelocity);
    if (carsVelocity.length === 0) return;
    this.carsVelocity.next(carsVelocity);
  }
}
