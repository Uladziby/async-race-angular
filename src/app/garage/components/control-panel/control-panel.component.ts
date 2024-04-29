import { Component } from '@angular/core';
import { ButtonComponent } from 'src/app/core/components/button/button.component';
import { CoreModule } from 'src/app/core/core.module';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CoreModule],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss',
})
export class ControlPanelComponent {}
