import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-timer',
  standalone: true,
  imports: [],
  templateUrl: './dialog-timer.component.html',
  styleUrl: './dialog-timer.component.scss',
})
export class DialogTimerComponent {
  counter = 5;
  interval: any;

  ngOnInit() {
    this.interval = setInterval(() => {
      if (this.counter === 1) {
        clearInterval(this.interval);
      }
      this.counter--;
    }, 1000);
  }

  ngOnDestroy() {}
}
