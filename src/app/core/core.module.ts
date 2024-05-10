import { MaterialButtonComponent } from './components/material-button/button.component';
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
  Play,
  RotateCcw,
  SquarePlay,
  SquarePower,
  SquareX,
  Pause,
} from 'lucide-angular';
import { MaterialModule } from 'src/app/material/material.module';
import { ButtonComponent } from 'src/app/core/components/button/button.component';
import { ApiService } from 'src/app/core/services/api/api.service';
import { StateService } from 'src/app/core/services/api/state.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MaterialButtonComponent,
    ButtonComponent,
  ],
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
      Play,
      RotateCcw,
      SquarePlay,
      SquarePower,
      SquareX,
      Pause,
    }),
  ],
  providers: [ApiService, StateService],
  exports: [
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    MaterialButtonComponent,
    MaterialModule,
    LucideAngularModule,
  ],
})
export class CoreModule {}
