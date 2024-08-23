import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as userActions from '../../core/store/user/user.actions';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrl: './../signup-page/signup-page.component.scss',
})
export class SigninPageComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({});

  constructor(
    private readonly FB: FormBuilder,
    private store: Store,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.FB.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public get email(): AbstractControl<string> {
    return this.loginForm.get('email')!;
  }

  public get password(): AbstractControl<string> {
    return this.loginForm.get('password')!;
  }

  public onSubmit(): void {
    console.log(this.loginForm!.value);
    this.store.dispatch(
      userActions.signIn({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }),
    );
  }

  public goSignUp(): void {
    this.router.navigate(['/signup']);
  }
}
