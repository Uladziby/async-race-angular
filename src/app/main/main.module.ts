import { CoreModule } from './../core/core.module';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { GarageCarComponent } from './garage-car/garage-car.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [MainComponent, GarageCarComponent],
  imports: [CommonModule, CoreModule],
  exports: [MainComponent, GarageCarComponent],
})
export class MainModule {}
