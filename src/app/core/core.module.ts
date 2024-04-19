import { ButtonComponent } from './components/button/button.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { FooterComponent } from 'src/app/core/components/footer/footer.component';
import {
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatSlideToggleModule,
  MatIconModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
} from '@angular/material';
import {
  LucideAngularModule,
  File,
  Home,
  Menu,
  UserCheck,
  Trophy,
  User,
  Car,
} from 'lucide-angular';

const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSlideToggleModule,
  MatIconModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ButtonComponent],
  imports: [
    CommonModule,
    ...materialModules,
    LucideAngularModule.pick({
      File,
      Home,
      Menu,
      UserCheck,
      Trophy,
      User,
      Car,
    }),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    ...materialModules,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule {}
