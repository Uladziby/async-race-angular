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

  onClickButton(event: Event) {
    console.log('click', event);
    this.onClick.emit(event);
  }

  public get buttonTypeClasses() {
    return {
      'mat-primary': this.color === Colors.PRIMARY,
      'mat-accent': this.color === Colors.SECONDARY,
    };
  }
}
