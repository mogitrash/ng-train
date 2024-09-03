import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent implements OnInit, OnDestroy {
  public activeButtons: 'stations' | 'carriages' | 'routes' | '' = '';

  private path!: string[];

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.path = this.route.url.split('/');
    this.activeButtons = this.path[2] ? (this.path[2] as 'stations' | 'carriages' | 'routes') : '';
    console.log(this.activeButtons);
  }

  public makeActive(activeButtons: 'stations' | 'carriages' | 'routes') {
    this.activeButtons = activeButtons;
    console.log(this.path);
  }

  ngOnDestroy() {
    this.activeButtons = '';
  }
}
