import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from 'src/app/core/services/api/state.service';
import {
  Car,
  ResponseSwitchDriveMode,
  StartEngineResponse,
} from 'src/app/shared/interfaces/types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private base = 'http://127.0.0.1:3000';

  private garage = `${this.base}/garage`;

  private engine = `${this.base}/engine`;

  constructor(private http: HttpClient, private state: StateService) {}

  getCars(page?: number): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.garage}?_page${page}`);
  }

  getCar(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.garage}/${id}`);
  }

  createCar(data: Omit<Car, 'id'>): Observable<Car> {
    return this.http.post<Car>(
      this.garage,
      { name: data.name, color: data.color },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  updateCar(data: Car, numberPage: number): Observable<Car> {
    const response = this.http.put<Car>(
      `${this.garage}/${data.id}`,
      { name: data.name, color: data.color, id: data.id },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return response;
  }

  deleteCar(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.garage}/${id}`);
  }

  startEngine(id: number) {
    return this.http.patch<StartEngineResponse>(
      `${this.engine}?id=${id}&status=started`,
      {}
    );
  }

  stopEngine(id: number) {
    return this.http.patch(`${this.engine}?id=${id}&status=stopped`, {});
  }

  switchDriveMode(
    id: number,
    status: string
  ): Observable<ResponseSwitchDriveMode> {
    return this.http.patch<ResponseSwitchDriveMode>(
      `${this.engine}?id=${id}&status=${status}`,
      {}
    );
  }
}
