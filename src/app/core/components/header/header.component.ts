import { RouteEnum } from 'src/app/shared/interfaces/enums';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAboutComponent } from 'src/app/core/components/dialog-about/dialog-about.component';
import { StateService } from 'src/app/core/services/api/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private stateService: StateService
  ) {}

  openDialog() {
    this.dialog.open(DialogAboutComponent);
  }

  onGarage() {
    this.router.navigate([RouteEnum.garage], {
      queryParams: { page: this.stateService.garagePage.page },
    });
  }
  onWinners() {
    this.router.navigate([RouteEnum.winners]);
  }
}
