import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { aboutMe } from 'src/app/shared/constants';

@Component({
  selector: 'app-dialog-about',
  standalone: true,
  imports: [MatCardTitle, MatIcon, NgFor, CommonModule],
  templateUrl: './dialog-about.component.html',
  styleUrl: './dialog-about.component.scss',
})
export class DialogAboutComponent {
  public infoAboutme = aboutMe;
}
