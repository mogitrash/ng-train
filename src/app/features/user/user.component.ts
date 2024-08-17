import { Component } from '@angular/core';
import { take } from 'rxjs';
import { Token, UserService } from './services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  public token: Token| undefined;

  constructor(private userService: UserService){}

  public onSignUp() {
    this.userService.signUp('adlap@nk.ru', '123456789').pipe(take(1)).subscribe(res => console.log(res))
  }

  public onSignIp(){
    localStorage.clear();
    this.userService.signIn('adlap@nk.ru', '123456789').pipe(take(1)).subscribe(res => localStorage.setItem('token', res.token))
  }

  public getUser() {
    this.userService.getCurrentUser().pipe(take(1)).subscribe(res => console.log(res)).unsubscribe()
  }

  public updateUser(){
    this.userService.updateCurrentUserName('adlap@nk.ru', 'Jain').pipe(take(1)).subscribe(res => console.log(res))
    this.userService.updateCurrentUserPassword('987654321').pipe(take(1)).subscribe(res => console.log(res))
  }

  public terminateSession(){
    localStorage.clear();
    this.userService.deleteCurrentUser().pipe(take(1)).subscribe(res => console.log(res))
  }
}
