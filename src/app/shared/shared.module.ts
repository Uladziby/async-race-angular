import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceDirective } from 'src/app/shared/directives/highlight-directive.directive';

@NgModule({
  declarations: [],
  imports: [CommonModule, RaceDirective],
  exports: [RaceDirective],
})
export class SharedModule {}
