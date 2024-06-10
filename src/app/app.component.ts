import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import appConfig from 'src/app/app.config';
import { CoreModule } from 'src/app/core/core.module';
import { GarageModule } from 'src/app/garage/garage.module';
import { MaterialModule } from 'src/app/material/material.module';
import { StateService } from 'src/app/core/services/api/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  providers: [{ provide: 'AppConfig', useValue: appConfig }],
  imports: [
    RouterOutlet,
    MaterialModule,
    CoreModule,
    GarageModule,
    SharedModule,
    HttpClientModule,
  ],
})
export class AppComponent {
  title = 'A-Race';
  constructor(
    @Inject('AppConfig') private appConfig: any,
    public stateService: StateService
  ) {}
}
