import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { StateService } from 'src/app/core/services/api/state.service';
import { Car, CarsVelocityType } from 'src/app/shared/interfaces/types';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
})
export class GarageComponent implements OnInit, OnDestroy {
  private subsApiService!: Subscription;
  carsList$ = new BehaviorSubject<Car[]>([]);

  constructor(
    private apiService: ApiService,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.subsApiService = this.apiService.getCars().subscribe((data: Car[]) => {
      this.carsList$.next(data);
    });
  }

  onRemoveCar(id: number) {
    this.apiService.deleteCar(id).subscribe(() => {
      this.apiService.getCars().subscribe((data: Car[]) => {
        this.carsList$.next(data);
      });
    });
  }

  ngOnDestroy() {
    this.subsApiService.unsubscribe();
  }

  onChangePage(page: number) {
    console.log(page);
  }
}
