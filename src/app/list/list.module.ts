import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { RouterModule } from '@angular/router';
import { CheckAuthGuardService } from '../shared/service/check-auth.service';




@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailComponent,
    CreateEmployeeComponent    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'List', component: EmployeeListComponent,canActivate:[CheckAuthGuardService] },
      { path: 'Listdetail/:id', component: EmployeeDetailComponent,canActivate:[CheckAuthGuardService] },
      
    ])
  ],
  providers:[CheckAuthGuardService]
})
export class ListModule { }
