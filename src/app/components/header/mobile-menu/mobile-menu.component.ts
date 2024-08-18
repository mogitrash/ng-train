import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  @Input() role!: string;

  @Input() onLogout!: () => void;

  isMenuOpen: boolean = false;

  navLinks = {
    guest: { home: '/', signup: '/signup', signin: '/signin' },
    user: { profile: '/profile', orders: '/my-orders' },
    admin: { profile: '/profile', orders: '/orders', panel: '/admin' },
  };

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
