import {
  Car,
  CarOptionsType,
  CarsVelocityType,
} from './../../../shared/interfaces/types';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subscription, map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { StateService } from 'src/app/core/services/api/state.service';

@Component({
  selector: 'app-garage-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CarComponent implements OnInit {
  left: string = '10px';

  initialValueLeft: string = '10px';

  initialTransitionDuration: string = '0s';

  carsOptions!: CarOptionsType[];

  isDriveMode: boolean = false;

  isEngineStarted: string = 'secondary';

  velocity: number = 0;

  roadDistance: number = 0;

  subscription: Subscription;

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

  carsVelocity: CarsVelocityType[] = [];

  constructor(
    private apiService: ApiService,
    private stateService: StateService
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.updateRoadDistance();

    this.subscription = this.stateService.currentCarsVelocity$
      .pipe(
        map((options) => options.find((option) => option.id === this.car.id))
      )
      .subscribe((data) => {
        if (!data) return;

        this.containerCar!.nativeElement.style.transitionDuration = `${
          data?.distance / (data.velocity * 1000)
        }s`;
      });

    this.stateService.currentCarsOptions$
      .pipe(
        map((options) => options.find((option) => option.id === this.car.id))
      )
      .subscribe((data) => {
        if (!data) return;

        const { velocity, isDriveMode, isEngineStarted, distance } = data;
        this.isDriveMode = isDriveMode;

        this.left = this.isDriveMode
          ? `${this.roadDistance}px`
          : this.initialValueLeft;

        this.velocity = velocity;

        this.isEngineStarted =
          isEngineStarted && isDriveMode ? 'primary' : 'secondary';
        this.containerCar!.nativeElement.style.transitionDuration = `${(
          distance /
          (this.velocity! * 1000)
        ).toFixed(2)}s`;
      });
  }

  updateRoadDistance() {
    this.roadDistance =
      this.containerRaceField!.nativeElement.clientWidth -
      this.containerCar!.nativeElement.clientWidth * 2 -
      200;
  }

  onStartEngine() {
    if (!this.containerRaceField) return;

    this.apiService.startEngine(this.car.id).subscribe((data) => {
      console.log(data);
      this.isEngineStarted = 'primary';
      this.velocity = data.velocity;

      this.containerCar!.nativeElement.style.transitionDuration = `${(
        data.distance /
        (this.velocity! * 1000)
      ).toFixed(2)}s`;

      this.left = `${this.roadDistance}px`;
    });
  }

  onStopEngine() {
    const car = this.containerCar!.nativeElement;

    car.style.transitionDuration = this.initialTransitionDuration;
    car.style.left = this.initialValueLeft;

    this.apiService.stopEngine(this.car.id).subscribe(() => {
      car.style.transitionDuration = '0s';
      this.left = this.initialValueLeft;
      this.isEngineStarted = 'secondary';
    });
  }

  onRemoveCar() {
    this.removedCarId.emit(this.car.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    if (this.left === this.initialValueLeft) return;

    this.roadDistance = width - width * 0.2;

    this.left = `${this.roadDistance}px`;
  }
}
