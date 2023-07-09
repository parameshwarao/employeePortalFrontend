import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeChatComponent } from './employee-chat/employee-chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckAuthGuardService } from '../shared/service/check-auth.service';
import { EmployeeService } from '../shared/service/employee.service';

export const EMPLOYEECHANNEL_IMPORT = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule.forChild([
    { path: 'employeeChat', component: EmployeeChatComponent,canActivate:[CheckAuthGuardService] }   
  ])
];


export const EMPLOYEECHANNEL_DIRECTIVES = [
  EmployeeChatComponent
];


@NgModule({
  declarations: EMPLOYEECHANNEL_DIRECTIVES,
  imports: EMPLOYEECHANNEL_IMPORT,
  exports: EMPLOYEECHANNEL_DIRECTIVES,
  providers:[CheckAuthGuardService]
})
export class EmployeeChannelModule { }
