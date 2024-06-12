import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Colors } from 'src/app/shared/interfaces/enums';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @Input() public color: string = Colors.PRIMARY;
  @Input() label: string = '';
  @Output() onClick = new EventEmitter<any>();

  @Input() public set disabled(state: boolean | null) {
    if (state === null) {
      return;
    }
    this._disabled = state;
  }

  public get disabled(): boolean {
    return this._disabled;
  }

  private _disabled = false;

  onClickButton(event: Event) {
    this.onClick.emit(event);
  }

  public get buttonTypeClasses() {
    return {
      'mat-primary': this.color === Colors.PRIMARY,
      'mat-accent': this.color === Colors.SECONDARY,
    };
  }
}
