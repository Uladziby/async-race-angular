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
  Crown,
  PencilLine,
  CarFront,
  Zap,
} from 'lucide-angular';
import { MaterialModule } from 'src/app/material/material.module';
import { ButtonComponent } from 'src/app/core/components/button/button.component';
import { PaginationComponent } from 'src/app/core/components/pagination/pagination.component';
import { DialogAboutComponent } from 'src/app/core/components/dialog-about/dialog-about.component';
import { SortPipe } from 'src/app/core/pipes/sort-pipe.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MaterialButtonComponent,
    ButtonComponent,
    SortPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PaginationComponent,
    DialogAboutComponent,
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
      Crown,
      PencilLine,
      CarFront,
      Zap,
    }),
  ],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    MaterialButtonComponent,
    MaterialModule,
    LucideAngularModule,
    PaginationComponent,
    DialogAboutComponent,
    SortPipe,
  ],
})
export class CoreModule {}
