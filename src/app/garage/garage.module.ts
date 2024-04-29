import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarComponent } from 'src/app/garage/components/car/car.component';
import { GarageComponent } from 'src/app/garage/garage.component';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ControlPanelComponent } from 'src/app/garage/components/control-panel/control-panel.component';
import { RaceDirective } from 'src/app/shared/directives/highlight-directive.directive';

@NgModule({
  declarations: [GarageComponent, CarComponent],
  imports: [CommonModule, CoreModule, ControlPanelComponent, RaceDirective],
  exports: [GarageComponent, CarComponent, ControlPanelComponent],
})
export class GarageModule {}
