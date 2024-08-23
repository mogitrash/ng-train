import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { PasswordMatchValidator } from '../../shared/directives/password-match.directive.js';
import { EmailFormatValidator } from '../../shared/directives/email-format.directive.js';
import { selectError } from '../../core/store/user/user.selectors.js';
import * as userActions from '../../core/store/user/user.actions';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent implements OnInit {
  public registryForm: FormGroup = new FormGroup({});

  public error: Observable<string> | undefined;

  constructor(
    private readonly FB: FormBuilder,
    private store: Store,
    private readonly router: Router,
  ) {
    this.error = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.registryForm = this.FB.group(
      {
        email: new FormControl('', [Validators.required, EmailFormatValidator()]),
        password: new FormControl('', [Validators.required]),
        repeatPassword: new FormControl('', [Validators.required]),
      },
      { validators: PasswordMatchValidator.bind(this) },
    );
  }

  public get email(): AbstractControl<string> {
    return this.registryForm.get('email')!;
  }

  public get password(): AbstractControl<string> {
    return this.registryForm.get('password')!;
  }

  public get repeatPassword(): AbstractControl<string> {
    return this.registryForm.get('repeatPassword')!;
  }

  public checkPassword(password: AbstractControl) {
    return PasswordMatchValidator(password);
  }

  public onSubmit(): void {
    console.log(this.registryForm!.value.email);
    this.store.dispatch(
      userActions.signUp({
        email: this.registryForm.value.email,
        password: this.registryForm.value.password,
      }),
    );
  }

  public goSignIn(): void {
    this.router.navigate(['/signin']);
  }
}
