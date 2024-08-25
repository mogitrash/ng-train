import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, Observable, of, switchMap, tap } from 'rxjs';
import { UserService } from '../../../features/user/services/user.service';
import * as userActions from './user.actions';
import { CurrentUser } from '../../models/user.model';
import { selectUser } from './user.selectors';

@Injectable()
export class UserEffects {
  private user$: Observable<CurrentUser>;

  constructor(
    private readonly store: Store,
    private actions$: Actions,
    private userService: UserService,
  ) {
    this.user$ = this.store.select(selectUser);
  }

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.signUp.type),
      exhaustMap(() => {
        return this.user$.pipe(
          switchMap(({ email, password }) => {
            return this.userService.signUp(email, password).pipe(
              switchMap(() => {
                return this.user$.pipe(
                  map((user) => {
                    return userActions.signIn({ email: user.email, password: user.password });
                  }),
                  catchError(() => {
                    return of(userActions.getError());
                  }),
                );
              }),
            );
          }),
        );
      }),
    );
  });

  signInUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.signIn.type),
      exhaustMap(() => {
        return this.user$.pipe(
          switchMap((user) => {
            return this.userService.signIn(user.email, user.password).pipe(
              tap(({ token }) => {
                localStorage.setItem('token', token);
              }),
              map(({ token }) => {
                return userActions.getToken({ token, role: 'user' });
              }),
              catchError(() => {
                return of(userActions.getError());
              }),
            );
          }),
        );
      }),
    );
  });

  updateName$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.updateUserName.type),
      exhaustMap(() => {
        return this.user$.pipe(
          switchMap(({ email, name }) => {
            return this.userService.updateCurrentUserName(email, name).pipe(
              switchMap(() => {
                return of(userActions.successfulUpdate());
              }),
              catchError(() => {
                return of(userActions.getError());
              }),
            );
          }),
        );
      }),
    );
  });

  updatePassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.updateUserPassword.type),
      exhaustMap(() => {
        return this.user$.pipe(
          switchMap(({ password }) => {
            return this.userService.updateCurrentUserPassword(password).pipe(
              map(() => {
                return userActions.successfulUpdate();
              }),
              catchError(() => {
                return of(userActions.getError());
              }),
            );
          }),
        );
      }),
    );
  });

  getUserData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.getUser.type),
      exhaustMap(() => {
        return this.userService.getCurrentUser().pipe(
          map((user) => {
            return userActions.saveUser({ name: user.name, email: user.email, role: user.role });
          }),
          catchError(() => {
            return of(userActions.getError());
          }),
        );
      }),
    );
  });

  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.signOut.type),
      exhaustMap(() => {
        return this.userService.signOutCurrentUser().pipe(
          map(() => {
            return userActions.successfulExit();
          }),
          catchError(() => {
            return of(userActions.getError());
          }),
        );
      }),
    );
  });
}
