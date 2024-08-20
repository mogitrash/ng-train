import { createReducer, on } from '@ngrx/store';
import { UserState } from '../../models/user.model';
import { getError,
  getToken,
  getUser,
  saveUser,
  signIn,
  signOut,
  signUp,
  successfulExit,
  successfulUpdate,
  updateUserName,
  updateUserPassword } from './user.actions';

const initialUserState: UserState = {
  currentAccess: 'guest',
  currentUser:{
    email: '',
    name: '',
    password: ''
  },
  token: null,
  hasError: false
};

export const userReducer = createReducer(initialUserState,
  on(signUp, (state, { email, password}): UserState => { return {...state, currentUser:{email, name: '', password}}}),
  on(signIn,  (state, { email, password}): UserState => { return {...state, currentUser:{email, name: '', password}}}),
  on(getToken, (state, { role , token }): UserState => { return {...state, currentAccess: role, token}}),
  on(getUser, (state): UserState => { return {...state}}),
  on(saveUser, (state, { name, email, role }): UserState => { return {...state, currentUser: {email, name, password: state.currentUser.password}, currentAccess: role }}),
  on(updateUserName, (state, { name, email }): UserState => { return {...state, currentUser: {email, name, password: state.currentUser.password} }}),
  on(updateUserPassword,(state): UserState => { return {...state}}),
  on(successfulUpdate, (state): UserState => { return {...state}}),
  on(signOut, (state): UserState => { return {...state, currentAccess: 'guest', currentUser: {email: '', name: '', password: ''}, token: null }}),
  on(successfulExit, (state): UserState => { return {...state}}),
  on(getError, (state):UserState => { return {...state, hasError: true}})
);
