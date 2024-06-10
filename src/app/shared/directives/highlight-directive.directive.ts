import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { DISTANCE, getSpeed } from 'src/app/shared/constants';

@Directive({
  selector: '[appRaceDirective]',
  standalone: true,
})
export class RaceDirective implements AfterViewInit, OnChanges {
  @Input() public velocity: number | undefined;
  @Input() raceField: HTMLDivElement | undefined;
  second: number = 1000; // 1000ms (1s)
  @Input() leftPosition: string = '10px';
  @Input() roadDistance: number = 0;

  constructor(private elementRef: ElementRef<HTMLDivElement>) {}

  ngAfterViewInit() {
    if (this.raceField) {
      this.elementRef.nativeElement.style.transform = `translateX(${this.roadDistance})`;

      this.elementRef.nativeElement.style.transitionDuration = `${(
        DISTANCE /
        (this.velocity! * this.second)
      ).toFixed(2)}s`;

      this.elementRef.nativeElement.style.left = this.leftPosition;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.elementRef.nativeElement.style.left = this.leftPosition;
    this.elementRef.nativeElement.style.transitionDuration = `${(
      DISTANCE /
      (this.velocity! * this.second)
    ).toFixed(2)}s`;
  }
}
