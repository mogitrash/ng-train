import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Access } from '../../core/models/user.model';
import { selectAccess } from '../../core/store/user/user.selectors';
import { getUser, signOut } from '../../core/store/user/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  protected role$!: Observable<Access>;

  protected isMenuOpen: boolean = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.role$ = this.store.select(selectAccess);
    if (localStorage.getItem('token')) {
      this.store.dispatch(getUser());
    }
  }

  protected logout(): void {
    this.store.dispatch(signOut());
  }

  protected toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
