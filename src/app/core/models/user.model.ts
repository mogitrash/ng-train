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
