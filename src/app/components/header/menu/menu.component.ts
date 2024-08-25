import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { signOut } from '../../../core/store/user/user.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @Input() role!: string;

  @Input() isMobile!: boolean;

  constructor(private store: Store) {}

  protected navLinks = {
    guest: { home: '/', signup: '/signup', signin: '/signin' },
    user: { profile: '/profile', orders: '/orders' },
    admin: { panel: '/admin' },
  };

  protected logout(): void {
    console.log('!!!');
    this.store.dispatch(signOut());
  }
}
