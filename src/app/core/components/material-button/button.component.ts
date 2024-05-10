import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ButtonTypes, Colors, Sizes } from 'src/app/shared/interfaces/enums';

@Component({
  selector: 'app-material-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MaterialButtonComponent {
  @Input() public color: string = Colors.PRIMARY;
  @Input() public type: string = ButtonTypes.FLAT;
  @Input() public size: string = Sizes.LARGE;
  @Input() public set disabled(state: string) {
    if (state !== undefined) {
      this._disabled = true;
    }
  }

  public get disabled(): string {
    return this._disabled ? 'true' : '';
  }

  private _disabled = false;

  public get buttonTypeClasses() {
    return {
      'mat-flat-button': this.type === ButtonTypes.FLAT,
      'mat-stroked-button': this.type === ButtonTypes.OUTLINED,
      'mat-primary': this.color === Colors.PRIMARY,
      'mat-accent': this.color === Colors.SECONDARY,
      'mat-icon-button':
        this.type === ButtonTypes.ICON ||
        this.type === ButtonTypes.ICON_INVERSE,
      'mat-icon-text-button': this.type === ButtonTypes.ICON_TEXT,
      inverse:
        this.type === ButtonTypes.TEXT_INVERSE ||
        this.type === ButtonTypes.ICON_INVERSE,
      large: this.size === Sizes.LARGE,
      medium: this.size === Sizes.MEDIUM,
    };
  }
}
