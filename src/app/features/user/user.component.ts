import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  constructor(private user: UserService) {}

  public signUp() {
    this.user.signUp('user');
  }
}
