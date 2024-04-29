import { SharedModule } from './shared/shared.module';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { GarageModule } from 'src/app/garage/garage.module';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    MaterialModule,
    CoreModule,
    GarageModule,
    SharedModule,
  ],
})
export class AppComponent {
  title = 'async-race-angular';
}
