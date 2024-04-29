import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-garage-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss',
})
export class CarComponent {
  left = '0px';
  @Input() field: string = '0px';
  @ViewChild('containerRaceField', { static: true }) containerRaceField:
    | ElementRef<HTMLDivElement>
    | undefined;

  @ViewChild('containerCar', { static: true }) containerCar:
    | ElementRef<HTMLDivElement>
    | undefined;

  @HostListener('window:resize', ['$event'])
  onStart(event?: MouseEvent) {
    console.log(
      'contaiinerCar',
      this.containerCar!.nativeElement.clientWidth * 2
    );

    if (!this.containerRaceField) return;

    const roadDistance =
      this.containerRaceField.nativeElement.clientWidth -
      this.containerCar!.nativeElement.clientWidth * 2;

    setTimeout(() => {
      this.left = `${roadDistance}px`; // Change width to 200px after 2 seconds
    }, 1000);
  }

  onStop(event?: MouseEvent) {
    this.left = '0px';
  }
}
