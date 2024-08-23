import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, Observable, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../../features/user/services/user.service';
import * as userActions from './user.actions';
import { CurrentUser, UserError } from '../../models/user.model';
import { selectUser } from './user.selectors';

@Injectable()
export class UserEffects {
  private user$: Observable<CurrentUser>;

  constructor(
    private readonly store: Store,
    private actions$: Actions,
    private userService: UserService,
    private readonly router: Router,
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
              map(() => {
                this.router.navigate(['/signin']);
                return userActions.successfulUpdate();
              }),
              catchError((error: UserError) => {
                return of(userActions.getError({ error: error.message }));
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
                localStorage.clear();
                localStorage.setItem('token', token);
                console.log('token');
              }),
              map(({ token }) => {
                console.log('token');
                this.router.navigate(['/']);
                return userActions.getToken({ token, role: 'user' });
              }),
              catchError((error: UserError) => {
                return of(userActions.getError({ error: error.message }));
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
              catchError((error: UserError) => {
                return of(userActions.getError({ error: error.message }));
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
              catchError((error: UserError) => {
                return of(userActions.getError({ error: error.message }));
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
            return userActions.saveUser({
              name: user.name,
              email: user.email,
              role: user.role,
            });
          }),
          catchError((error: UserError) => {
            return of(userActions.getError({ error: error.message }));
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
          catchError((error: UserError) => {
            return of(userActions.getError({ error: error.message }));
          }),
        );
      }),
    );
  });
}
