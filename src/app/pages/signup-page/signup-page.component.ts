import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent {
  registryForm: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    repeatPassword: FormControl<string | null>;
  }>;

  constructor(private readonly FB: FormBuilder) {
    this.registryForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      repeatPassword: new FormControl(''),
    });
  }

  public onSubmit() {
    console.log(this.registryForm.value);
  }
}
