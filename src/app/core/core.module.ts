import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { FooterComponent } from 'src/app/core/components/footer/footer.component';
import {
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSlideToggleModule,
  MatIconModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
} from '@angular/material';

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
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, ...materialModules],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
