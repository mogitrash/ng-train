import { createAction, props } from '@ngrx/store';

export const signUp = createAction(
  '[User] User signUp',
  props<{ email: string; password: string }>(),
);

export const signIn = createAction(
  '[User] User signIn',
  props<{ email: string; password: string }>(),
);

export const getToken = createAction(
  '[User] User gets Token ',
  props<{ role: 'guest' | 'user' | 'manager'; token: string }>(),
);

export const getUser = createAction('[User] get User');

export const saveUser = createAction(
  '[User] save User',
  props<{ name: string; email: string; role: 'guest' | 'user' | 'manager' }>(),
);

export const updateUserName = createAction(
  '[User] update Users name',
  props<{ name: string; email: string }>(),
);

export const successfulUpdate = createAction('[User] successful update');

export const updateUserPassword = createAction('[User] update Users password');

export const signOut = createAction('[User] sign Out User');

export const successfulExit = createAction('[User] successful terminates Session');

export const getError = createAction('[User] have Error');
