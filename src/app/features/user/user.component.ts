import { Component } from '@angular/core';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserService } from './services/user.service';
import { signIn } from '../../core/store/user/user.actions';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  constructor(private userService: UserService, private readonly store: Store){}

  public onSignUp(): void {
    this.userService.signUp('man@nk.ru', '123456789').pipe(take(1)).subscribe(res => console.log(res))
  }

  public onSignIp(): void{
    localStorage.clear();
    this.userService.signIn('man@nk.ru', '123456789').pipe(take(1)).subscribe(res => localStorage.setItem('token', res.token))
    this.store.dispatch(signIn({ role: 'user'}))
  }

  public getUser():void {
    this.userService.getCurrentUser().pipe(take(1)).subscribe(res => console.log(res)).unsubscribe()
  }

  public updateUser(): void {
    this.userService.updateCurrentUserName('man@nk.ru', 'Ruby').pipe(take(1)).subscribe(res => console.log(res))
    this.userService.updateCurrentUserPassword('987654321').pipe(take(1)).subscribe(res => console.log(res))
  }

  public terminateSession(): void{
    localStorage.clear();
    this.userService.deleteCurrentUser().pipe(take(1)).subscribe(res => console.log(res))
    this.store.dispatch(signIn({ role: 'guest'}))
  }
}
