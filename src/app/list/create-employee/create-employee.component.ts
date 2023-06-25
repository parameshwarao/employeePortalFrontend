import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../shared/service/employee.service';
import { createEmployeeReqbody } from '../../shared/models/employee.model';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  public errorMessage: string = "";
  createEmployeeForm: FormGroup = new FormGroup({});
  isError: boolean = false;
  updatedInfo:string = "";

  public createEmployeeReq: createEmployeeReqbody = new createEmployeeReqbody();

  constructor(private _FormBuilder: FormBuilder,
    private _router: Router,
    private _EmployeeService: EmployeeService) { }

  ngOnInit(): void {
    this.createEmployeeForm = this._FormBuilder.group({
      Employee_ID: ['', Validators.required],
      Full_Name: ['', Validators.required],
      Job_Title: ['', Validators.required],
      Department: ['', Validators.required],
      Business_Unit: ['', Validators.required],
      Gender: ['', Validators.required],
      Ethnicity: ['', Validators.required],
      Age: ['', Validators.required],
      Hire_Date: ['', Validators.required],
      Annual_Salary: ['', Validators.required],
      Bonus: ['', Validators.required],
      Country: ['', Validators.required],
      City: ['', Validators.required],

    });
  }

  public inputboxValidation(formControlName: string): boolean {
    if (
      (this.createEmployeeForm.get(formControlName)?.dirty || this.createEmployeeForm.get(formControlName)?.touched) &&
      this.createEmployeeForm.get(formControlName)?.errors
    ) {
      return true;

    } else {
      return false;
    }
  }

  createEmployee() {
    this.createEmployeeForm.markAllAsTouched();
    if (this.createEmployeeForm.valid) {
      //api call
      console.log(this.createEmployeeForm.value);

      let { Employee_ID,
        Full_Name,
        Job_Title,
        Department,
        Business_Unit,
        Gender,
        Ethnicity,
        Age,
        Hire_Date,
        Annual_Salary,
        Bonus,
        Country,
        City } = this.createEmployeeForm.value;

      this.createEmployeeReq = new createEmployeeReqbody();

      this.createEmployeeReq = {
        Employee_ID: `${Employee_ID}`,
        Full_Name: `${Full_Name}`,
        Job_Title: `${Job_Title}`,
        Department: `${Department}`,
        Business_Unit: `${Business_Unit}`,
        Gender: `${Gender}`,
        Ethnicity: `${Ethnicity}`,
        Age: `${Age}`,
        Hire_Date: `${Hire_Date}`,
        Annual_Salary: `${Annual_Salary}$`,
        Bonus: `${Bonus}%`,
        Country: `${Country}`,
        City: `${City}`
      };

      //api call
      this._EmployeeService.createEmployee(this.createEmployeeReq).subscribe({
        next: (data) => {            
          this.ScrollToTop();
          this.updatedInfo = "Employee Record has been created!";
          this.resetEmployee();
          setTimeout(() => {
            this._router.navigate(['/List']);
          },1200);

        },
        error: (err) => {
          this.ScrollToTop();
          this.isError = true;
          let { error } = err;
          if (error && error.errors) {
            this.errorMessage = error.errors[0] ? error.errors[0].msg : "some error";
          }
          else{
            this.errorMessage = "some error";
          }
        }
      });



    }

  }
  resetEmployee() {
    this.createEmployeeForm.reset();
  }

  ScrollToTop() {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}

}
