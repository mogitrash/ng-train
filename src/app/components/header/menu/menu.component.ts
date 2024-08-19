import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @Input() role!: string;

  @Input() onLogout!: () => void;

  @Input() isMobile!: boolean;

  navLinks = {
    guest: { home: '/', signup: '/signup', signin: '/signin' },
    user: { profile: '/profile', orders: '/my-orders' },
    admin: { profile: '/profile', orders: '/orders', panel: '/admin' },
  };
}
