import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private readonly url: string;

  constructor(private http: HttpClient) {}

  public signUp(email: string) {
    return this.http.get('/api/profile', {
      params: { name: email, email, role: 'user' },
    });
  }
}
