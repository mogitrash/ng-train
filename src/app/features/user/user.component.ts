import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import * as userActions from '../../core/store/user/user.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  constructor(private readonly store: Store) {}

  public onSignUp(): void {
    this.store.dispatch(userActions.signUp({ email: 'myEmail@ru.bl', password: '123456789' }));
  }

  public onSignIp(): void {
    localStorage.clear();
    this.store.dispatch(userActions.signIn({ email: 'myEmail@ru.bl', password: '123456789' }));
  }

  public getUser(): void {
    this.store.dispatch(userActions.getUser());
  }

  public updateUser(): void {
    this.store.dispatch(userActions.updateUserName({ name: 'Ann', email: 'myEmail@ru.bl' }));
  }

  public terminateSession(): void {
    localStorage.clear();
    this.store.dispatch(userActions.signOut());
  }
}
