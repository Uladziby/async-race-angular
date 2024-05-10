import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GarageComponent } from 'src/app/garage/garage.component';

const routes: Routes = [
  {
    path: ':pageNumber',
    component: GarageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class GarageRoutingModule {}
