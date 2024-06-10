import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ApiService } from 'src/app/core/services/api/api.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  firstValueFrom,
  forkJoin,
  map,
  of,
  tap,
} from 'rxjs';
import {
  Car,
  CarOptionsType,
  CarsVelocityType,
  GaragePageType,
  ResponseSwitchDriveMode,
} from 'src/app/shared/interfaces/types';
import { StateService } from 'src/app/core/services/api/state.service';
import { getRandomColor, getRandomName } from 'src/app/core/models/cars';
import { COLORS, LIMIT_ITEMS } from 'src/app/shared/constants';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CoreModule, ReactiveFormsModule],
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

  @Input() carsList$!: BehaviorSubject<Car[]>;

  specificCarsPage$ = new BehaviorSubject<Car[]>([]);

  @Input() pageOfItems!: Car[];

  currentCarsVelocity$ = new BehaviorSubject<CarsVelocityType[]>([]);

  @Output() onStartEngines: EventEmitter<any[]> = new EventEmitter<any[]>();

  @Output() carsVelocity: EventEmitter<CarsVelocityType[]> = new EventEmitter<
    CarsVelocityType[]
  >();

  @Output() onResetCars: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const numberPage = params.get('page');
      if (numberPage)
        this.pageOptions = {
          currentPage: parseInt(numberPage),
          startIndex: LIMIT_ITEMS * (parseInt(numberPage) - 1),
          endIndex: LIMIT_ITEMS * parseInt(numberPage),
        };
    });

    this.stateService.currentGarage$
      .pipe(
        map((x) => {
          return x.slice(
            this.pageOptions.startIndex,
            this.pageOptions.endIndex
          );
        })
      )
      .subscribe((data) => {
        this.specificCarsPage$.next(data);
      });
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
    const requests = this.specificCarsPage$.value.map(({ id }) =>
      this.apiService.startEngine(id).pipe(map((data) => ({ ...data, id: id })))
    );

    forkJoin(requests)
      .pipe(
        map((data: CarsVelocityType[]) => {
          return data.map((item) => {
            return {
              id: item.id,
              velocity: item.velocity,
              distance: item.distance,
              isEngineStarted: item.velocity ? true : false,
              isDriveMode: false,
            };
          });
        })
      )
      .subscribe((data: CarOptionsType[]) => {
        this.stateService.setCarsOptions(data);
        this.onSwitchDriveMode(data);
      });
  }

  onSwitchDriveMode(carsOptions: CarOptionsType[]) {
    const requests = this.specificCarsPage$.value.map(({ id }) =>
      this.apiService
        .switchDriveMode(id)
        .pipe(map((data) => ({ ...data, id: id })))
        .pipe(
          catchError(() => {
            return of({ success: false, id: id });
          })
        )
    );

    forkJoin(requests)
      .pipe(
        map((data: ResponseSwitchDriveMode[]) => {
          return data.map((item) => {
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
        })
      )
      .subscribe((data: CarOptionsType[]) => {
        this.stateService.setCarsOptions(data);
        this.onStartEngines.emit(data);
      });
  }

  ngOnDestroy() {
    this.carsList$.unsubscribe();
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
}
