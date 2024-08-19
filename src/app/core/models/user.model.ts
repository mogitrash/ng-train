export interface UserState {
  currentAccess: Access;
}

export type Access = 'guest' | 'user' | 'manager';
