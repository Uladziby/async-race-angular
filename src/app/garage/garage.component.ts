import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  forkJoin,
  map,
  of,
  switchMap,
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
  ResponseWinnersType,
  WinnersType,
} from 'src/app/shared/interfaces/types';
import { defineBestVelocity } from 'src/app/shared/utils/defineBestVelocity';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
})
export class GarageComponent implements OnInit {
  @ViewChild(CarComponent) child!: CarComponent;

  carsList$ = new BehaviorSubject<Car[]>([]);

  transformedWinnersData$ = new BehaviorSubject<WinnersType[]>([]);

  carOptions$ = this.stateService.currentCarsOptions$;

  bestVelocity: number = 0;

  initialValueLeft: string = '10px';

  pageOfItems: Car[] = [];

  constructor(
    public stateService: StateService,
    private apiService: ApiService,
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
  }

  onRemoveCar(id: number) {
    this.apiService
      .deleteCar(id)
      .pipe(switchMap(() => this.apiService.getCars({})))
      .subscribe({
        next: (data: Car[]) => {
          this.carsList$.next(data);
          this.cdr.detectChanges();
        },
      });
  }

  onChangePage(items: Car[]) {
    this.stateService.setSpecificCarsPage(items);
  }

  onStartEngines(data: CarOptionsType[]) {
    this.stateService.currentCarsOptions$
      .pipe(
        map((carOptions) => {
          const optionsWithIsDriveMode = carOptions.filter(
            (obj) => obj.isDriveMode
          );
          this.bestVelocity = defineBestVelocity(optionsWithIsDriveMode);

          return carOptions
            .filter((obj) => obj.velocity === this.bestVelocity)
            .map((winner) => {
              return {
                id: winner.id,
                wins: 1,
                time: calculateWinnerTime(winner.velocity),
              };
            });
        })
      )
      .subscribe((winners: WinnersType[]) => {
        this.transformedWinnersData$.next(winners);
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

            this.apiService.updateWinner(updatedWinner).subscribe((data) => {
              console.log('updatedWinner', data);
            });

            return updatedWinner as ResponseWinnersType;
          })
        )
        .pipe(
          catchError(() => {
            let newWinner = {
              id: winner.id,
              wins: 1,
              time: parsedTime,
            };

            this.apiService.createWinner(newWinner).subscribe((data) => {
              newWinner = data;
            });

            return of(newWinner) as Observable<ResponseWinnersType>;
          })
        );
    });

    forkJoin(requests).subscribe((data) => {
      this.stateService.updateWinners(data);

      this.openWinnerDialog(data);
    });
  }

  openWinnerDialog(data: ResponseWinnersType[]) {
    const delay = DISTANCE / this.bestVelocity + 1000;

    setTimeout(() => {
      this.dialog.open(DialogWinnersComponent, { data: { winners: data } });
    }, delay);
  }

  onResetCars() {
    this.carOptions$
      .pipe(
        take(1),
        switchMap((carOptions: CarOptionsType[]) => {
          const requests = carOptions.map(({ id }) =>
            this.apiService.stopEngine(id).pipe(
              map(() => {
                return {
                  isDriveMode: false,
                  isEngineStarted: false,
                  velocity: 0,
                  distance: 0,
                  id: id,
                };
              })
            )
          );

          return forkJoin(requests);
        })
      )
      .subscribe({
        next: (data) => {
          this.stateService.setCarsOptions(data);
        },
      });
  }
}
