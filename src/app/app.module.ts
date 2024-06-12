import { CoreModule } from './core/core.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GarageModule } from 'src/app/garage/garage.module';
import { MaterialModule } from 'src/app/material/material.module';

/* @NgModule({
  declarations: [],
  imports: [],
  providers: [provideAnimationsAsync()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [],
})
export class AppModule {} */
