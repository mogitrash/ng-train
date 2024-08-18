import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-desk-menu',
  templateUrl: './desk-menu.component.html',
  styleUrl: './desk-menu.component.scss',
})
export class DeskMenuComponent {
  @Input() role!: string;

  @Input() onLogout!: () => void;

  navLinks = {
    guest: { home: '/', signup: '/signup', signin: '/signin' },
    user: { profile: '/profile', orders: '/my-orders' },
    admin: { profile: '/profile', orders: '/orders', panel: '/admin' },
  };
}
