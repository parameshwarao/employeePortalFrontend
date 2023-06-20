import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';



@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailComponent,
    CreateEmployeeComponent,
    EmployeeHomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ListModule { }
