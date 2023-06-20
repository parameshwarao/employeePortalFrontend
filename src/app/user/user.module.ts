import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';

export const USER_IMPORT =[CommonModule,FormsModule];
export const USER_DIRECTIVES =[
  LoginComponent,
  SignupComponent
];


@NgModule({
  declarations: USER_DIRECTIVES,
  imports: USER_IMPORT,
  exports:USER_DIRECTIVES
})
export class UserModule { }
