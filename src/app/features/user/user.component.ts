import { Component } from '@angular/core';

import { Store } from '@ngrx/store';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  constructor( private readonly store: Store){}

  public onSignUp(): void {

  }

  public onSignIp(): void{
    localStorage.clear();

  }

  public getUser():void {

  }

  public updateUser(): void {}


  public terminateSession(): void{
    localStorage.clear();

  }
}
