import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ApiService } from 'src/app/core/services/api/api.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  forkJoin,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import {
  Car,
  CarOptionsType,
  CarsVelocityType,
  ResponseSwitchDriveMode,
} from 'src/app/shared/interfaces/types';
import { StateService } from 'src/app/core/services/api/state.service';
import { getRandomColor, getRandomName } from 'src/app/core/models/cars';
import { COLORS, LIMIT_ITEMS } from 'src/app/shared/constants';
import { MatDialog } from '@angular/material/dialog';
import { DialogTimerComponent } from 'src/app/core/components/dialog-timer/dialog-timer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CoreModule, ReactiveFormsModule, CommonModule],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss',
})
export class ControlPanelComponent implements OnInit, OnDestroy {
  pageOptions: { startIndex: number; endIndex: number; currentPage: number } = {
    startIndex: 0,
    endIndex: 7,
    currentPage: 1,
  };

  color: string = COLORS.base;

  updateColor: string = COLORS.base;

  name = new FormControl('', { nonNullable: true });

  updateName = new FormControl('', { nonNullable: true });

  isReset: boolean = true;

  isDisabledGenerateCars$!: Observable<boolean>;

  @Input() carsList$!: BehaviorSubject<Car[]>;

  @Input() pageOfItems!: Car[];

  @Output() onStartEngines: EventEmitter<any[]> = new EventEmitter<any[]>();

  @Output() carsVelocity: EventEmitter<CarsVelocityType[]> = new EventEmitter<
    CarsVelocityType[]
  >();

  @Output() onResetCars: EventEmitter<void> = new EventEmitter<void>();

  specificCarsPage$ = this.stateService.specificCarsPage$;

  currentCarsVelocity$ = new BehaviorSubject<CarsVelocityType[]>([]);

  pageOptions$!: Observable<any>;

  constructor(
    private apiService: ApiService,
    public stateService: StateService,
    private route: ActivatedRoute,
    private dialogTimer: MatDialog
  ) {}

  ngOnInit() {
    this.isDisabledGenerateCars$ = this.stateService
      .getCars()
      .pipe(map((cars) => cars.length >= 100));

    this.pageOptions$ = this.route.queryParamMap.pipe(
      filter((params) => params.has('page')),
      map((params) => {
        const numberPage = params.get('page')!;
        return {
          currentPage: parseInt(numberPage),
          startIndex: LIMIT_ITEMS * (parseInt(numberPage) - 1),
          endIndex: LIMIT_ITEMS * parseInt(numberPage),
        };
      })
    );
  }

  onCreateCar() {
    this.apiService
      .createCar({ name: this.name.value, color: this.color })
      .subscribe(() => {
        this.apiService.getCars({}).subscribe((cars) => {
          this.carsList$.next(cars);
          this.name.reset();
        });
      });
  }

  onReset() {
    this.isReset = true;
    this.onResetCars.emit();
  }

  onUpdateCar() {
    this.specificCarsPage$
      .pipe(
        map((cars) => {
          return cars.find((car) => car.name === this.updateName.value.trim());
        })
      )
      .pipe(
        map((chosenCar) => {
          return {
            ...chosenCar!,
            color: this.updateColor,
          };
        })
      )
      .subscribe((updatedCar) => {
        this.apiService.updateCar(updatedCar).subscribe(() => {
          this.updateName.reset();
          this.apiService.getCars({}).subscribe((cars) => {
            this.carsList$.next(cars);
          });
        });
      });
  }

  onRace() {
    this.stateService.specificCarsPage$
      .pipe(
        take(1),
        switchMap((cars: Car[]) => {
          const requests = cars.map(({ id }) =>
            this.apiService
              .startEngine(id)
              .pipe(map((data) => ({ ...data, id: id })))
          );
          return forkJoin(requests);
        })
      )
      .subscribe({
        next: (data: CarsVelocityType[]) => {
          console.log(data);
          const options: CarOptionsType[] = data.map((item) => {
            return {
              id: item.id,
              velocity: item.velocity,
              distance: item.distance,
              isEngineStarted: item.velocity ? true : false,
              isDriveMode: false,
            };
          });

          this.stateService.setCarsOptions(options);
          this.onSwitchDriveMode(options);
        },
      });
  }

  onSwitchDriveMode(carsOptions: CarOptionsType[]) {
    this.stateService.specificCarsPage$
      .pipe(
        take(1),
        switchMap((cars: Car[]) => {
          const requests = cars.map(({ id }) =>
            this.apiService
              .switchDriveMode(id)
              .pipe(map((data) => ({ ...data, id: id })))
              .pipe(
                catchError(() => {
                  return of({ success: false, id: id });
                })
              )
          );
          this.openTimerDialog();

          return forkJoin(requests);
        })
      )
      .subscribe({
        next: (data: ResponseSwitchDriveMode[]) => {
          const transformedData: CarOptionsType[] = data.map((item) => {
            return {
              isDriveMode: item.success,
              id: item.id,
              velocity: carsOptions.find((option) => option.id === item.id)!
                .velocity,
              distance: carsOptions.find((option) => option.id === item.id)!
                .distance,
              isEngineStarted: carsOptions.find(
                (option) => option.id === item.id
              )!.isEngineStarted,
            };
          });

          this.stateService.setCarsOptions(transformedData);
          this.isReset = false;
          this.onStartEngines.emit(data);
        },
      });
  }

  openTimerDialog() {
    const dialogRef = this.dialogTimer.open(DialogTimerComponent);

    let interval: number | undefined;

    setInterval(() => {
      clearInterval(interval);
      dialogRef.close();
    }, 5000);
  }

  onGenerateCars() {
    for (let i = 0; i < 100; i++) {
      this.apiService
        .createCar({ name: getRandomName(), color: getRandomColor() })
        .subscribe(() => {
          this.apiService.getCars({}).subscribe((cars) => {
            this.carsList$.next(cars);
          });
        });
    }
  }

  ngOnDestroy() {
    this.carsList$.unsubscribe();
  }
}
