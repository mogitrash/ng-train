import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  Actions, createEffect, ofType
} from '@ngrx/effects';
import { catchError, exhaustMap,  map,  Observable, of, switchMap, tap } from "rxjs";
import { UserService } from "../../../features/user/services/user.service";
import * as userActions from './user.actions';
import { CurrentUser } from "../../models/user.model";
import { selectUser } from "./user.selectors";

@Injectable()
export class UserEffects{
  private user$: Observable<CurrentUser> ;

  constructor(
    private readonly store: Store,
    private actions$: Actions,
    private User: UserService){
      this.user$ = this.store.select(selectUser);
    }

    createUser$ = createEffect(() => { return this.actions$.pipe(
      ofType(userActions.signUpAction.type),
      exhaustMap(() => {
        return this.user$.pipe(
        switchMap(({email, password}) => {
          return this.User.signUp(email, password).pipe(
         switchMap(() => {
            return this.user$.pipe(
            map((user) => {
             return userActions.signInAction({ email: user.email, password: user.password})
              }), catchError(() => {return of(userActions.getError())})
            )}),
        )}))}))});

    signInUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(userActions.signInAction.type),
        exhaustMap(() => {
          return this.user$.pipe(
            switchMap((user) => {
                return this.User.signIn(user.email,user.password).pipe(
                  tap(({ token }) => {localStorage.setItem('token', token)}),
                  map(({token}) => {
                  return userActions.getTokenAction({ token, role: 'user'})
                }), catchError(() => {return of(userActions.getError())})
          )
        })
      )
    }))});

  updateName$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.updateUserName.type),
      exhaustMap(() => {
        return this.user$.pipe(
        switchMap(({email, name}) => { return this.User.updateCurrentUserName(email, name).pipe(
          switchMap(() => {
            return of(userActions.successfulUpdate())
          }), catchError(() => {return of(userActions.getError())})
        )})
      )})
    )
  });

  updatePassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.updateUserPassword.type),
      exhaustMap(() => {
        return this.user$.pipe(
        switchMap(({password}) => { return this.User.updateCurrentUserPassword(password).pipe(
          map(() => {
            return userActions.successfulUpdate()
          }), catchError(() => {return of(userActions.getError())})
        )})
      )})
    )
  });

  getUserData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.getUserAction.type),
      exhaustMap(() => {
        return this.User.getCurrentUser().pipe(
          map((user) => { return userActions.saveUserAction({name: user.name, email: user.email, role: user.role})
        }), catchError(() => {return of(userActions.getError())})
        )
      })
    )
  });

  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.goOutAction.type),
      exhaustMap(() => {
        return this.User.signOutCurrentUser().pipe(
          map(()=> {
            return userActions.successfulExit()
          }),
          catchError(() => {return of(userActions.getError())}))})
        )
      })

}
