import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { CurrentUser } from '../../core/models/user.model';
import { selectAccess, selectUser } from '../../core/store/user/user.selectors';
import {
  getUser,
  signOut,
  updateUserName,
  updateUserPassword,
} from '../../core/store/user/user.actions';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  public nameMode: 'reading' | 'writing' = 'reading';

  public emailMode: 'reading' | 'writing' = 'reading';

  public user$: Observable<CurrentUser>;

  public currentEmail: string = '';

  public currentName: string = '';

  public newEmail: FormControl<string | null>;

  public newName: FormControl<string | null>;

  public newPassword: FormControl<string | null>;

  protected role$: Observable<string>;

  protected visibleModal: boolean = false;

  constructor(private readonly store: Store) {
    this.user$ = this.store.select(selectUser);
    this.role$ = this.store.select(selectAccess);
    this.newEmail = new FormControl('');
    this.newName = new FormControl('');
    this.newPassword = new FormControl('');
  }

  ngOnInit(): void {
    this.store.dispatch(getUser());
    this.user$.subscribe((currentUser: CurrentUser) => {
      this.currentEmail = currentUser.email;
      this.currentName = currentUser.name;
    });
  }

  public changeNameMode(): void {
    this.nameMode = 'writing';
  }

  public changeEmailMode(): void {
    this.emailMode = 'writing';
  }

  public makeVisibleModal() {
    this.visibleModal = true;
  }

  public updateUserData(newName: string, newEmail: string): void {
    this.store.dispatch(
      updateUserName({
        name: newName.length ? newName : this.currentName,
        email: newEmail.length ? newEmail : this.currentEmail,
      }),
    );
    this.emailMode = 'reading';
    this.nameMode = 'reading';
    this.newEmail.setValue('');
    this.newName.setValue('');
  }

  public updatePassword(newPassword: string): void {
    this.store.dispatch(updateUserPassword({ newPassword }));
    this.visibleModal = false;
    this.newPassword.setValue('');
  }

  public LogOut() {
    this.store.dispatch(signOut());
  }
}
