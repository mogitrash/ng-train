import { createReducer } from '@ngrx/store';
import { UserState } from '../../models/user.model';

const inititalState: UserState = {
  currentAccess: 'guest',
};

export const userReducer = createReducer(inititalState);
