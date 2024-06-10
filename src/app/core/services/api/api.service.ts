import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Car,
  GaragePageType,
  ResponseSwitchDriveMode,
  ResponseWinnersType,
  StartEngineResponse,
} from 'src/app/shared/interfaces/types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private base = 'http://127.0.0.1:3000';

  private garage = `${this.base}/garage`;

  private engine = `${this.base}/engine`;

  private winners = `${this.base}/winners`;

  constructor(private http: HttpClient) {}

  getCars({ page, limit }: GaragePageType): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.garage}?_page${page}?_limit=${limit}`);
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

  updateCar(data: Car): Observable<Car> {
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

  switchDriveMode(id: number): Observable<ResponseSwitchDriveMode> {
    return this.http.patch<ResponseSwitchDriveMode>(
      `${this.engine}?id=${id}&status=drive`,
      {}
    );
  }

  createWinner(winner: ResponseWinnersType): Observable<ResponseWinnersType> {
    return this.http.post<ResponseWinnersType>(`${this.winners}`, winner);
  }

  getWinners(): Observable<ResponseWinnersType[]> {
    return this.http.get<ResponseWinnersType[]>(`${this.winners}`);
  }

  getWinner(id: number): Observable<ResponseWinnersType> {
    return this.http.get<ResponseWinnersType>(`${this.winners}/${id}`);
  }

  updateWinner(winner: ResponseWinnersType): Observable<ResponseWinnersType> {
    return this.http.put<ResponseWinnersType>(`${this.winners}/${winner.id}`, {
      wins: winner.wins,
      time: winner.time,
    });
  }
}
