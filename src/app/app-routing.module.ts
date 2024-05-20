import { Route } from '@angular/router';
import { GarageComponent } from 'src/app/garage/garage.component';
import { RouteEnum } from 'src/app/shared/interfaces/enums';

export const ROUTES: Route[] = [
  {
    path: RouteEnum.winners,
    loadComponent: () =>
      import('./winners/winners.component').then((mod) => mod.WinnersComponent),
  },
  { path: RouteEnum.home, redirectTo: RouteEnum.garage, pathMatch: 'full' },
  {
    path: RouteEnum.garage,
    loadChildren: () =>
      import('./garage/garage.module').then((mod) => mod.GarageModule),
  },
];

export class AppRoutingModule {}
