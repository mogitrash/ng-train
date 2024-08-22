import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordMatchDirective } from './directives/password-match.directive';
import { EmailFormatDirective } from './directives/email-format.directive';



@NgModule({
  declarations: [
    PasswordMatchDirective,
    EmailFormatDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
