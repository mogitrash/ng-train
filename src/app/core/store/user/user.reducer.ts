import { createReducer, on } from '@ngrx/store';
import { UserState } from '../../models/user.model';
import { signIn } from './user.actions';

const initialState: UserState = {
  currentAccess: 'guest',
};

export const userReducer = createReducer(
  initialState,
  on(
    signIn,
    (state, { role }): UserState => ({ ...state, currentAccess: role })
  )
);
