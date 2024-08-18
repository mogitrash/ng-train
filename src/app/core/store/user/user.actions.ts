import { createAction, props } from "@ngrx/store";

export const signUpAction = createAction('[User] User signUp', props<{email: string, password: string}>());

export const signInAction = createAction('[User] User signIn', props<{role: 'guest'| 'user', token: string}>());

export const getUserAction = createAction('[User] get User');

export const saveUserAction = createAction('[User] save User', props<{name: string, email: string, role: 'guest'| 'user'| 'manager'}>());

export const updateUserName = createAction('[User] update Users name', props<{name: string, email: string}>());

export const successfulUpdate = createAction('[User] successful update');

export const updateUserPassword = createAction('[User] update Users password');

export const deleteUser = createAction('[User] delete User');

export const getError = createAction('[User] have Error')
