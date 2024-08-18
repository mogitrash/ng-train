import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Access } from '../../core/models/user.model';
import { selectCurrentAccess } from '../../core/store/user/user.selectors';
import { TrainState } from '../../core/store/store.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  role$!: Observable<Access>;

  isMenuOpen: boolean = false;

  // eslint-disable-next-line @ngrx/no-typed-global-store
  constructor(private store: Store<TrainState>) {}

  ngOnInit(): void {
    this.role$ = this.store.select(selectCurrentAccess);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
