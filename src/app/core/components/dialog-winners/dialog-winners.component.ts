import { parseTimeToString } from 'src/app/shared/constants';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs';
import { CoreModule } from 'src/app/core/core.module';
import { StateService } from 'src/app/core/services/api/state.service';
import {
  Car,
  ResponseWinnersType,
  WinnersType,
} from 'src/app/shared/interfaces/types';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

type WinnersDialogType = { name: string | FormControl<string>; time: string };

@Component({
  selector: 'app-dialog-winners',
  standalone: true,
  imports: [CommonModule, CoreModule],
  templateUrl: './dialog-winners.component.html',
  styleUrl: './dialog-winners.component.scss',
})
export class DialogWinnersComponent {
  winners$ = new BehaviorSubject<WinnersDialogType[]>([]);
  cars$ = new BehaviorSubject<Car[]>([]);
  winners: WinnersDialogType[] = [];
  constructor(
    private stateService: StateService,
    @Inject(MAT_DIALOG_DATA) public data: { winners: ResponseWinnersType[] }
  ) {}

  ngOnInit() {
    this.stateService.currentGarage$.subscribe((garage) => {
      this.cars$.next(garage);
      this.winners = this.data.winners.map(({ id, time }) => {
        const winnerCar = this.cars$.value.find((car) => car.id === id);
        return {
          name: winnerCar!.name,
          time: `${time}s`,
        };
      });
    });
  }
}
