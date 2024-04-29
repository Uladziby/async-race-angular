import { Route } from '@angular/router';
import { GarageComponent } from 'src/app/garage/garage.component';
import { RouteEnum } from 'src/app/shared/interfaces/enums';

export const ROUTES: Route[] = [
  {
    path: RouteEnum.garage,
    component: GarageComponent,
  },
  { path: RouteEnum.home, redirectTo: RouteEnum.garage, pathMatch: 'full' },
];

export class AppRoutingModule {}
