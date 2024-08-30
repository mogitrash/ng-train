import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent {
  public activeButtons: 'stations' | 'carriages' | 'routes' = 'stations';

  public makeActive(activeButtons: 'stations' | 'carriages' | 'routes') {
    this.activeButtons = activeButtons;
  }
}
