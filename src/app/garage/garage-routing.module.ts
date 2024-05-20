import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GarageComponent } from 'src/app/garage/garage.component';

const routes: Routes = [
  {
    path: '',
    component: GarageComponent,
  },
  /*  {
    path:'?page=1',
    component: GarageComponent,
  }, */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GarageRoutingModule {}
