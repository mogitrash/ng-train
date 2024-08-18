import { createReducer } from '@ngrx/store';
import { UserState } from '../../models/user.model';

const initialState: UserState = {
  currentAccess: 'guest',
};

export const userReducer = createReducer(initialState);
