import { createAction, props } from "@ngrx/store";

export const signIn = createAction('[User] User signIn', props<{role: 'guest'| 'user'}>())
