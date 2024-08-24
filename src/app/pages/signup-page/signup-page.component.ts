import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { PasswordMatchValidator } from '../../shared/validators/password-match.js';
import { EmailFormatValidator } from '../../shared/validators/email-format.js';
import { selectReasonError } from '../../core/store/user/user.selectors.js';
import { clearError, signUp } from '../../core/store/user/user.actions';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent implements OnInit {
  public registryForm: FormGroup = new FormGroup({});

  public reason$: Observable<string>;

  public firstContact: boolean = false;

  constructor(
    private readonly FB: FormBuilder,
    private store: Store,
    private readonly router: Router,
  ) {
    this.reason$ = this.store.select(selectReasonError);
  }

  ngOnInit(): void {
    this.registryForm = this.FB.group(
      {
        email: new FormControl('', [Validators.required, EmailFormatValidator()]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
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
    this.store.dispatch(
      signUp({
        email: this.registryForm.value.email,
        password: this.registryForm.value.password,
      }),
    );
    this.firstContact = true;
  }

  public onClearError() {
    this.store.dispatch(clearError());
  }

  public goSignIn(): void {
    this.router.navigate(['/signin']);
  }
}
