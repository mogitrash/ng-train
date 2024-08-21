import { Component, inject, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { PasswordMatchDirective } from '../../shared/directives/password-match.directive.js';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent implements OnInit {
  public registryForm: FormGroup = new FormGroup({});

  public passwordCheckValidator: PasswordMatchDirective = inject(
    PasswordMatchDirective
  );

  constructor(private readonly FB: FormBuilder) {}

  ngOnInit(): void {
    this.registryForm = this.FB.group(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[wd_]+@[wd_]+.w{2,7}$'),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        repeatPassword: new FormControl('', [Validators.required]),
      },
      { Validators: this.passwordCheckValidator.validate }
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

  public onSubmit() {
    console.log(this.registryForm!.value);
  }
}
