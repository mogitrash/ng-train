import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as actions from '../../core/store/user/user.actions';
import { selectUser } from '../../core/store/user/user.selectors';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(
      actions.signUp({ email: 'test@mail.com', password: '12345aA!!' }),
    );

    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(
      actions.signIn({ email: 'test@mail.com', password: '12345aA!!' }),
    );

    console.log(`User ${this.store.select(selectUser)}`);
  }
}
