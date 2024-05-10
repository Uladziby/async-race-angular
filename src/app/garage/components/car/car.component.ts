import { Car, CarsVelocityType } from './../../../shared/interfaces/types';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Subscription, filter } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { StateService } from 'src/app/core/services/api/state.service';
import { StartEngineResponse } from 'src/app/shared/interfaces/types';

@Component({
  selector: 'app-garage-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss',
})
export class CarComponent implements OnInit {
  left = '10px';

  velocity: number = 0;

  roadDistance: number = 0;

  @Input() carVelocity: number = 0;

  @Input() car!: Car;

  @Input() field: string = '0px';

  @ViewChild('containerRaceField', { static: true }) containerRaceField:
    | ElementRef<HTMLDivElement>
    | undefined;

  @ViewChild('containerCar', { static: true }) containerCar:
    | ElementRef<HTMLDivElement>
    | undefined;

  @Output() removedCarId = new EventEmitter<number>();

  constructor(
    private apiService: ApiService,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.stateService.currentCarsVelocity.subscribe((data) => {
      console.log('data', data.length);
      if (data.length === 0) return;

      const carsVelocity = data.find((item) => item.id === this.car.id);

      this.velocity = carsVelocity!.velocity;

      this.onDriveMode();
    });

    this.roadDistance =
      this.containerRaceField!.nativeElement.clientWidth -
      this.containerCar!.nativeElement.clientWidth * 2;
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    this.roadDistance =
      this.containerRaceField!.nativeElement.clientWidth -
      this.containerCar!.nativeElement.clientWidth * 2;

    this.containerCar!.nativeElement.style.transitionDuration = '0s';
    this.left = `${this.roadDistance}px`;
  }

  onStartEngine() {
    if (!this.containerRaceField) return;
    console.log('onStartEngine', this.carVelocity);
    this.onDriveMode();
    /*   */

    /* this.apiService
      .startEngine(this.car.id)
      .subscribe((data: StartEngineResponse) => {
        this.velocity = data.velocity;
      }); */
  }

  onStopEngine(event?: MouseEvent) {
    this.apiService.stopEngine(this.car.id).subscribe(() => {
      const car = this.containerCar!.nativeElement;
      car.style.left = '10px';
      car.style.transitionDuration = '0s';
    });
  }

  onRemoveCar() {
    //TODO: remove car
    console.log('remove car');
    this.removedCarId.emit(this.car.id);
  }

  /*   onCreateCar() {
    this.apiService
      .createCar({ name: this.name.value, color: this.color })
      .subscribe(() => {
        this.apiService.getCars(this.numberPage).subscribe((cars) => {
          this.carsList$.next(cars);
        });
      });
  } */

  onDriveMode() {
    const id = this.car.id;
    console.log('onDriveMode');

    this.stateService.currentCarsVelocity
      .pipe(filter((data) => data[id].id === this.car.id))
      .subscribe((data) => {
        this.carVelocity = data[0].velocity;
        console.log('this.carVelocity', this.carVelocity);
      });

    this.apiService.switchDriveMode(this.car.id, 'drive').subscribe((data) => {
      this.roadDistance =
        this.containerRaceField!.nativeElement.clientWidth -
        this.containerCar!.nativeElement.clientWidth * 2;

      if (data.success) {
        console.log('drive mode');
        setTimeout(() => {
          this.left = `${this.roadDistance}px`;
          console.log(
            'this.roadDistance',
            this.roadDistance,
            this.left,
            this.carVelocity
          );
        }, 1000);
      }
    });
  }
}
