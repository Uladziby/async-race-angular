import { ButtonComponent } from './components/button/button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { FooterComponent } from 'src/app/core/components/footer/footer.component';
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
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ButtonComponent],
  imports: [
    CommonModule,
    MaterialModule,
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
    MaterialModule,
    LucideAngularModule,
  ],
})
export class CoreModule {}
