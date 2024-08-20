import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Access } from '../../core/models/user.model';
import { selectAccess } from '../../core/store/user/user.selectors';
import { TrainState } from '../../core/store/store.model';
import { signOut } from '../../core/store/user/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  protected role$!: Observable<Access>;

  protected isMenuOpen: boolean = false;

  // eslint-disable-next-line @ngrx/no-typed-global-store
  constructor(private store: Store<TrainState>) {}

  ngOnInit(): void {
    this.role$ = this.store.select(selectAccess);
  }

  protected logout(): void {
    this.store.dispatch(signOut());
  }

  protected toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
