import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appRaceDirective]',
  standalone: true,
})
export class RaceDirective implements AfterViewInit {
  @Input() raceField: HTMLDivElement | undefined;
  @Input() speed: number = 1000; // 1000ms (1s)

  constructor(private elementRef: ElementRef<HTMLDivElement>) {}

  ngAfterViewInit() {
    if (this.raceField) {
      const roadDistance =
        this.raceField?.clientWidth -
        this.elementRef.nativeElement.offsetWidth * 2;

      this.elementRef.nativeElement.style.transform = `translateX(${roadDistance})`;

      this.elementRef.nativeElement.style.transitionDuration = `${
        this.speed / 1000
      }s`;
    }
  }
}
