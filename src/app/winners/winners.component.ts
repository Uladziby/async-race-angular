import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { CoreModule } from 'src/app/core/core.module';
import { ApiService } from 'src/app/core/services/api/api.service';
import { StateService } from 'src/app/core/services/api/state.service';
import { Car, WinnersUpdatedType } from 'src/app/shared/interfaces/types';

@Component({
  selector: 'app-winners',
  standalone: true,
  imports: [CommonModule, NgFor, CoreModule],
  providers: [StateService, ApiService],
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.scss',
})
export class WinnersComponent {
  carsList$ = new BehaviorSubject<Car[]>([]);

  winners$ = new BehaviorSubject<WinnersUpdatedType[]>([]);

  garage: Car[] = [];

  constructor(private stateService: StateService) {}

  ngOnInit() {
    this.stateService.init();

    this.stateService.currentGarage$.subscribe((data: Car[]) => {
      this.carsList$.next(data);
      this.stateService.currentWinners$
        .pipe(
          map((winners) =>
            winners.map((winner, index) => {
              const car = this.carsList$.value.find(
                (car) => car.id === winner.id
              );
              return {
                number: index + 1,
                name: car?.name,
                bestTime: winner.time as unknown as string,
                wins: winner.wins,
              };
            })
          )
        )
        .subscribe((data) => {
          this.winners$.next(data);
          this.stateService.currentWinners$.subscribe((data) => {});
        });
    });
  }
}
