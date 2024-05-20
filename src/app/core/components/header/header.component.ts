import { RouteEnum } from 'src/app/shared/interfaces/enums';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  openDialog() {}

  onGarage() {
    this.router.navigate([RouteEnum.garage], {
      queryParams: { page: 1 },
    });
  }
  onWinners() {
    this.router.navigate([RouteEnum.winners]);
  }
}
