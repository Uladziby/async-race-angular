import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnum } from 'src/app/shared/interfaces/enums';

const routes: Routes = [
  {
    path: RouteEnum.garage,
    component: MainComponent,
  },
  { path: RouteEnum.home, redirectTo: RouteEnum.garage, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
