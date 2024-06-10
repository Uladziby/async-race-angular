import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  catchError,
  combineLatest,
  forkJoin,
  map,
  merge,
  of,
  skip,
  take,
} from 'rxjs';
import { DialogWinnersComponent } from 'src/app/core/components/dialog-winners/dialog-winners.component';
import { ApiService } from 'src/app/core/services/api/api.service';
import { StateService } from 'src/app/core/services/api/state.service';
import { CarComponent } from 'src/app/garage/components/car/car.component';
import {
  calculateWinnerTime,
  DISTANCE,
  parseWinnerTimeToNumber,
} from 'src/app/shared/constants';
import {
  Car,
  CarOptionsType,
  CarsVelocityType,
  ResponseWinnersType,
  WinnersType,
} from 'src/app/shared/interfaces/types';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
})
export class GarageComponent implements OnInit, OnDestroy {
  @ViewChild(CarComponent) child!: CarComponent;

  private subscribe!: Subscription;

  carsList$ = new BehaviorSubject<Car[]>([]);

  specificCarsPage$ = new BehaviorSubject<Car[]>([]);

  bestVelocity: number = 0;

  initialValueLeft: string = '10px';

  currentCarsVelocity: CarsVelocityType[] = [];

  pageOfItems: Car[] = [];

  transformedWinnersData$ = new BehaviorSubject<WinnersType[]>([]);

  carOptions$ = new BehaviorSubject<CarOptionsType[]>([]);

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap.subscribe((params) => {
      const numberPage = params.get('page');
      if (numberPage) this.stateService.garagePage.page = parseInt(numberPage);
    });
  }

  ngOnInit() {
    this.stateService.init();

    this.subscribe = combineLatest([
      this.stateService.specificCarsPage$,
      this.stateService.currentCarsOptions$,
      this.stateService.currentCarsVelocity$,
    ]).subscribe(
      ([specificCarsPage, currentCarsOptions, currentCarsVelocity]) => {
        this.specificCarsPage$.next(specificCarsPage);

        this.carOptions$.next(currentCarsOptions);

        this.currentCarsVelocity = currentCarsVelocity;
      }
    );
  }

  onRemoveCar(id: number) {
    this.apiService.deleteCar(id).subscribe(() => {
      this.apiService.getCars({}).subscribe((data: Car[]) => {
        this.carsList$.next(data);
        this.cdr.detectChanges();
      });
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  onChangePage(items: Car[]) {
    this.specificCarsPage$.next(items);
  }

  onStartEngines(data: CarOptionsType[]) {
    this.stateService.currentCarsOptions$
      .pipe(
        map((carOptions) => {
          const optionsWithIsDriveMode = carOptions.filter(
            (obj) => obj.isDriveMode
          );
          return Math.max(...optionsWithIsDriveMode.map((obj) => obj.velocity));
        })
      )
      .pipe(
        map((bestVelocity) => {
          this.bestVelocity = bestVelocity;

          return this.carOptions$.value.filter(
            (obj) => obj.velocity === bestVelocity
          );
        })
      )
      .pipe(
        map((data) => {
          return data.map((winner) => {
            return {
              id: winner.id,
              wins: 1,
              time: calculateWinnerTime(winner.velocity),
            };
          });
        })
      )
      .subscribe((data) => {
        this.transformedWinnersData$.next(data);
      });

    const requests = this.transformedWinnersData$.value.map((winner) => {
      const parsedTime = parseWinnerTimeToNumber(winner.time);

      return this.apiService
        .getWinner(winner.id)
        .pipe(
          map(({ id, wins, time }) => {
            const updatedWinner = {
              id,
              wins: wins + 1,
              time: time < parsedTime ? time : parsedTime,
            };
            this.apiService.updateWinner(updatedWinner);
            return updatedWinner as ResponseWinnersType;
          })
        )
        .pipe(
          catchError(() => {
            const newWinner = {
              id: winner.id,
              wins: 1,
              time: parsedTime,
            };

            this.apiService.createWinner(newWinner).subscribe((data) => {});

            return of(newWinner) as Observable<ResponseWinnersType>;
          })
        );
    });

    forkJoin(requests).subscribe((data) => {
      this.stateService.updateWinners(data);

      const delay = DISTANCE / this.bestVelocity;

      setTimeout(() => {
        this.dialog.open(DialogWinnersComponent, { data: { winners: data } });
      }, delay);
    });
  }

  onResetCars() {
    const initialCarsOptions: CarOptionsType[] = this.pageOfItems.map((car) => {
      return {
        isDriveMode: false,
        isEngineStarted: false,
        velocity: 0,
        distance: 0,
        id: car.id,
      };
    });

    const requests = this.pageOfItems.map(({ id }) =>
      this.apiService.stopEngine(id)
    );

    forkJoin(requests).subscribe(() => {
      this.stateService.setCarsOptions(initialCarsOptions);
    });
  }
}
