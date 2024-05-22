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
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import {
  Car,
  CarsVelocityType,
  StartEngineResponse,
} from 'src/app/shared/interfaces/types';
import { StateService } from 'src/app/core/services/api/state.service';
import { CarComponent } from 'src/app/garage/components/car/car.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CoreModule, ReactiveFormsModule],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss',
})
export class ControlPanelComponent implements OnInit, OnDestroy {
  numberPage: number = 1;

  color: string = '#783dd0';

  name = new FormControl('', { nonNullable: true });

  updateColor: string = '#783dd0';

  updateName = new FormControl('', { nonNullable: true });

  @Input() carsList$!: BehaviorSubject<Car[]>;

  @Output() onStartEngines: EventEmitter<{ success: boolean; id: number }> =
    new EventEmitter<{ success: boolean; id: number }>();

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  onReset(event?: MouseEvent) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const numberPage = params.get('page');
      if (numberPage) this.numberPage = parseInt(numberPage);
      this.router.navigate(['/garage'], { queryParams: { page: '1' } });
    });
  }

  onCreateCar() {
    this.apiService
      .createCar({ name: this.name.value, color: this.color })
      .subscribe(() => {
        this.apiService.getCars(this.numberPage).subscribe((cars) => {
          this.carsList$.next(cars);
        });
        this.name.reset();
      });
  }

  onUpdateCar() {
    let carId;
    this.carsList$
      .pipe(
        map((cars) => cars.find((car) => car.name === this.updateName.value))
      )
      .subscribe((car) => {
        carId = car!.id;
      });

    this.apiService
      .updateCar(
        { name: this.updateName.value, color: this.updateColor, id: carId! },
        this.numberPage
      )
      .subscribe(() => {
        this.apiService.getCars(this.numberPage).subscribe((cars) => {
          console.log('onUpdateCar cars', cars);
          this.carsList$.next(cars);
          this.updateName.reset();
        });
      });
  }

  onRace() {
    console.log('onRace');

    const carsVelocity: CarsVelocityType[] = [];

    this.carsList$.subscribe((cars) => {
      Promise.all(
        cars.map((car) =>
          this.apiService.startEngine(car.id).subscribe((data) => {
            console.log('startEngine', car.id);
            carsVelocity.push({
              id: car.id,
              velocity: data.velocity,
            });
            this.apiService.switchDriveMode(car.id).subscribe((data) => {
              console.log('switchDriveMode', data);
              this.onStartEngines.emit({ ...data, id: car.id });
            });
          })
        )
      ).then(() => {
        this.stateService.setCarsVelocity(carsVelocity);
        console.log('this.stateService.carsVelocity', carsVelocity);
      });
    });
  }

  ngOnDestroy() {
    this.carsList$.unsubscribe();
  }
}
