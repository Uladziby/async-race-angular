import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, Subscription, map, tap } from 'rxjs';
import { CoreModule } from 'src/app/core/core.module';
import { ApiService } from 'src/app/core/services/api/api.service';
import { StateService } from 'src/app/core/services/api/state.service';
import { Car, WinnersTableType } from 'src/app/shared/interfaces/types';

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

  winners$ = new BehaviorSubject<WinnersTableType[]>([]);

  garage: Car[] = [];

  sortOrderByTime: string = 'asc';

  bestTime: string = 'bestTime';

  wins: string = 'wins';

  sortOrderByWins: string = 'asc';

  subs: Subscription = new Subscription();
  constructor(private stateService: StateService) {}

  ngOnInit() {
    this.subs.add(this.stateService.init());

    this.subs.add(
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
                  bestTime: winner.time,
                  wins: winner.wins,
                };
              })
            )
          )
          .subscribe((data: WinnersTableType[]) => {
            this.winners$.next(data);
          });
      })
    );
  }

  sortByTime() {
    this.sortOrderByTime = this.sortOrderByTime === 'ASC' ? 'DESC' : 'ASC';
  }
  sortByWins() {
    this.sortOrderByWins = this.sortOrderByWins === 'ASC' ? 'DESC' : 'ASC';
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
