import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api/api.service';
import { LIMIT_ITEMS } from 'src/app/shared/constants';

import {
  Car,
  CarOptionsType,
  CarsVelocityType,
  GaragePageType,
  ResponseSwitchDriveMode,
  ResponseWinnersType,
} from 'src/app/shared/interfaces/types';

@Injectable()
export class StateService {
  private carsVelocity = new BehaviorSubject<CarsVelocityType[]>([]);

  private garage = new BehaviorSubject<Car[]>([]);

  private specificCarsPage = new BehaviorSubject<Car[]>([]);

  private carsOptions = new BehaviorSubject<CarOptionsType[]>([]);

  private switchDriveMode = new BehaviorSubject<ResponseSwitchDriveMode[]>([]);

  private winners = new BehaviorSubject<ResponseWinnersType[]>([]);

  currentCarsOptions$ = this.carsOptions.asObservable();

  currentCarsVelocity$ = this.carsVelocity.asObservable();

  currentGarage$ = this.garage.asObservable();

  specificCarsPage$ = this.specificCarsPage.asObservable();

  currentWinners$ = this.winners.asObservable();

  garagePage: GaragePageType = {
    page: 2,
    limit: LIMIT_ITEMS,
    isRace: false,
    currentRace: 1,
  };

  garagePageOptions = {
    startIndex: 0,
    endIndex: LIMIT_ITEMS,
  };

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((params) => {
      const numberPage = params.get('page');
      if (!numberPage) return;
      this.garagePage.page = parseInt(numberPage);
      this.garagePageOptions.endIndex = this.garagePage.page * LIMIT_ITEMS;
      this.garagePageOptions.startIndex =
        (this.garagePage.page - 1) * LIMIT_ITEMS;
    });
  }

  init() {
    this.apiService.getCars(this.garagePage).subscribe((data) => {
      this.setCars(data);
    });

    this.apiService
      .getCars(this.garagePage)
      .pipe(
        map((x) =>
          x.slice(
            this.garagePageOptions.startIndex,
            this.garagePageOptions.endIndex
          )
        )
      )
      .subscribe((data) => {
        this.specificCarsPage.next(data);
      });

    this.apiService.getWinners().subscribe((data) => {
      this.setWinners([]);
      this.setWinners(data);
    });
  }

  getCars() {
    return this.currentGarage$;
  }

  setSpecificCarsPage(cars: Car[]) {
    this.specificCarsPage.next(cars);
  }

  addCar(car: Car) {
    this.garage.next([...this.garage.value, car]);
  }

  setCars(cars: Car[]) {
    this.garage.next(cars);
  }

  setCarsVelocity(carsVelocity: CarsVelocityType[]) {
    if (carsVelocity.length === 0) return;
    this.carsVelocity.next(carsVelocity);
  }

  setCarsOptions(carsOptions: CarOptionsType[]) {
    this.carsOptions.next(carsOptions);
  }

  setSwitchDriveMode(data: { success: boolean; id: number }[]) {
    this.switchDriveMode.next(data);
  }

  setWinners(winners: ResponseWinnersType[]) {
    this.winners.next(winners);
  }
  updateWinners(winners: ResponseWinnersType[]) {
    this.winners.next([...this.winners.value, ...winners]);
  }
}
