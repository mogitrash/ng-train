import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserState } from '../../core/models/user.model';
import { selectUserState } from '../../core/store/user/user.selectors';
import { updateUserName, updateUserPassword } from '../../core/store/user/user.actions';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  public nameMode: 'reading' | 'writing' = 'reading';

  public emailMode: 'reading' | 'writing' = 'reading';

  public userState$: Observable<UserState>;

  public email: string = '';

  public name: string = '';

  constructor(private readonly store: Store) {
    this.userState$ = this.store.select(selectUserState);
  }

  ngOnInit(): void {
    this.userState$.subscribe(({ currentUser: CurrentUser }) => {
      this.email = CurrentUser.email;
      this.name = CurrentUser.name;
    });
  }

  public changeNameMode(): void {
    this.nameMode = 'writing';
  }

  public changeEmailMode(): void {
    this.emailMode = 'writing';
  }

  public updateUserData(newName: string, newEmail: string): void {
    this.store.dispatch(
      updateUserName({
        name: newName.length ? newName : this.name,
        email: newEmail.length ? newEmail : this.email,
      }),
    );
  }

  public updatePassword(newPassword: string): void {
    this.store.dispatch(updateUserPassword({ newPassword }));
  }
}
