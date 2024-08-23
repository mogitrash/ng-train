import { AbstractControl, ValidationErrors } from '@angular/forms';

export const PasswordMatchValidator = (control: AbstractControl): ValidationErrors | null => {
  console.log(
    control.get('password')?.value.trim() === control.get('repeatPassword')?.value.trim(),
  );
  return control.get('password')?.value.trim() === control.get('repeatPassword')?.value.trim()
    ? null
    : { MatchError: 'Passwords do not match' };
};
