import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


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



@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient){}

  public signUp(email:string, password:string){
    return this.http.post<object>(`/api/signup`, {email, password})
  }

  public signIn(email:string, password:string){
    return this.http.post<Token>('/api/signin', {email, password})
  }

  public getCurrentUser(){
    return this.http.get<User>('/api/profile')
  }

  public updateCurrentUserName(email: string, name: string){
    return this.http.put('/api/profile', {email, name})
  }

  public updateCurrentUserPassword(password: string){
    return this.http.put('/api/profile/password', {password})
  }

  public signOutCurrentUser(){
    return this.http.delete('/api/logout')
  }
}
