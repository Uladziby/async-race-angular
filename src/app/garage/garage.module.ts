import { NgModule } from '@angular/core';
import { CarComponent } from 'src/app/garage/components/car/car.component';
import { GarageComponent } from 'src/app/garage/garage.component';
import { CoreModule } from 'src/app/core/core.module';
import { RaceDirective } from 'src/app/shared/directives/highlight-directive.directive';
import { ControlPanelComponent } from 'src/app/garage/components/control-panel/control-panel.component';
import { CommonModule } from '@angular/common';
import { StateService } from 'src/app/core/services/api/state.service';
import { ApiService } from 'src/app/core/services/api/api.service';
import { GarageRoutingModule } from 'src/app/garage/garage-routing.module';
import { RouterModule } from '@angular/router';
import { DialogTimerComponent } from 'src/app/core/components/dialog-timer/dialog-timer.component';

@NgModule({
  declarations: [GarageComponent, CarComponent],
  imports: [
    CommonModule,
    CoreModule,
    ControlPanelComponent,
    RaceDirective,
    GarageRoutingModule,
    DialogTimerComponent,
  ],
  providers: [StateService],
  exports: [CarComponent, ControlPanelComponent],
})
export class GarageModule {}
