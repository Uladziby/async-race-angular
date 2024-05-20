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
import { BehaviorSubject, Subscription, filter, map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { StateService } from 'src/app/core/services/api/state.service';

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

  carsVelocity: CarsVelocityType[] = [];

  subscription: Subscription;

  constructor(
    private apiService: ApiService,
    private stateService: StateService
  ) {
    //console.log(this.car.id, 'thiscarid');
    this.subscription = this.stateService.currentCarsVelocity$.subscribe(
      (data) => {
        this.carsVelocity = data;
        console.log('velocity', this.carsVelocity, !data);
        /*  data.find((item) => item.id === this.car.id)?.velocity ?? 1;
        this.onDriveMode(); */
      }
    );
    /*   .pipe(
        map((carsVelocity) =>
          carsVelocity.find((item) => item.id === this.car.id)
        )
      ) */
  }

  ngOnInit() {
    // this.onDriveMode();
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
    console.log(this.carsVelocity, 'cars velocity');
    if (!this.containerRaceField) return;
    this.onDriveMode();
  }

  onStopEngine(event?: MouseEvent) {
    this.apiService.stopEngine(this.car.id).subscribe(() => {
      const car = this.containerCar!.nativeElement;
      car.style.left = '10px';
      car.style.transitionDuration = '0s';
    });
  }

  onRemoveCar() {
    this.removedCarId.emit(this.car.id);
  }

  onDriveMode() {
    console.log('onDriveMode');

    const id = this.car.id;

    console.log(id, 'id');
    this.stateService.currentCarsVelocity$.subscribe((data) => {
      console.log(data, 'sdas');
    });

    this.stateService.currentCarsVelocity$
      .pipe(
        map((carsVelocity) => {
          console.log(carsVelocity, 'carsVelocity'),
            carsVelocity.filter((item) => item.id === id);
        })
      )
      .subscribe((data) => {
        console.log(data, 'data state service');
        /*     if (data) {
          this.carVelocity = data.velocity;
        } */
      });

    this.apiService.switchDriveMode(this.car.id, 'drive').subscribe((data) => {
      this.roadDistance =
        this.containerRaceField!.nativeElement.clientWidth -
        this.containerCar!.nativeElement.clientWidth * 2;

      console.log('onDriveMode', data);
      if (data.success) {
        console.log('drive mode');
        setTimeout(() => {
          this.left = `${this.roadDistance}px`;
        }, 1000);
      }
    });
  }

  ngOnDestroy() {
    /*  this.subscription.unsubscribe(); */
  }
}
