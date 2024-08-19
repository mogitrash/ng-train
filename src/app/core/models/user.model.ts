export interface UserState {
  currentAccess: Access;
  currentUser: CurrentUser,
  token: string | null,
  hasError: boolean
}

export type Access = 'guest' | 'user' | 'manager';
export interface CurrentUser {
 email: string,
 name: string,
 password: string
}

export interface UserError{
  message: string,
  reason: string
  }

export interface AuthBody{
 email: string,
 password: string
}

export interface User{
  name: string,
  email: string,
  role: 'manager'|'user'
}

export interface Token{
  token: string
}
