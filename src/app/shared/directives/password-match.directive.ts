import { Directive, Injectable } from '@angular/core';
import { FormGroup, ValidationErrors, Validator } from '@angular/forms';

function validate(form: FormGroup): ValidationErrors | null {
  if (form.get('password')?.value && form.get('repeatPassword')?.value) {
    return form.get('password')?.value.trim() ===
      form.get('repeatPassword')?.value.trim()
      ? null
      : { error: 'Passwords do not match' };
  }
  return null;
}

@Injectable({ providedIn: 'root' })
@Directive({
  selector: '[appPasswordMatch]',
  standalone: true,
})
export class PasswordMatchDirective implements Validator {
  public validate;

  constructor() {
    this.validate = validate.bind(this);
  }
}
