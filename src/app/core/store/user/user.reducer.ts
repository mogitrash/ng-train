import { createReducer, on } from '@ngrx/store';
import { UserState } from '../../models/user.model';
import { getError, getTokenAction, getUserAction, goOutAction, saveUserAction, signInAction, signUpAction, successfulExit, successfulUpdate, updateUserName, updateUserPassword } from './user.actions';

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
  on(signUpAction, (state, { email, password}): UserState => { return {...state, currentUser:{email, name: '', password}}}),
  on(signInAction,  (state, { email, password}): UserState => { return {...state, currentUser:{email, name: '', password}}}),
  on(getTokenAction, (state, { role , token }): UserState => { return {...state, currentAccess: role, token}}),
  on(getUserAction, (state): UserState => { return {...state}}),
  on(saveUserAction, (state, { name, email, role }): UserState => { return {...state, currentUser: {email, name, password: state.currentUser.password}, currentAccess: role }}),
  on(updateUserName, (state, { name, email }): UserState => { return {...state, currentUser: {email, name, password: state.currentUser.password} }}),
  on(updateUserPassword,(state): UserState => { return {...state}}),
  on(successfulUpdate, (state): UserState => { return {...state}}),
  on(goOutAction, (state): UserState => { return {...state, currentAccess: 'guest', currentUser: {email: '', name: '', password: ''}, token: null }}),
  on(successfulExit, (state): UserState => { return {...state}}),
  on(getError, (state):UserState => { return {...state, hasError: true}})
);
