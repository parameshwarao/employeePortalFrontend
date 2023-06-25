import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../shared/service/employee.service';
import { createEmployeeReqbody, employeeObject, updateEmployeeReqBody } from '../../shared/models/employee.model';


@Component({
  selector: 'create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  public errorMessage: string = "";
  createEmployeeForm: FormGroup = new FormGroup({});
  isError: boolean = false;
  updatedInfo: string = "";

  @Input() public isEdit: boolean = false;
  @Output() public recordUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();

  //edit
  public editEmployee: updateEmployeeReqBody = new updateEmployeeReqBody();
  public editEmployeeID:string ="";

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

  /**
   * Used only for edit via viewChild
   * */
  public updateFormForEdit(employeeObject: employeeObject) {
    this.editEmployeeID = employeeObject._id;

    let {
      Hire_Date,
      Annual_Salary,
      Bonus
    } = employeeObject;

    let hiredate = Hire_Date ? new Date(`${Hire_Date}`) : "";
    let annualSalary = employeeObject.Annual_Salary ?  employeeObject.Annual_Salary.split("$") : "";
    let bonus = employeeObject.Bonus ?  employeeObject.Bonus.split("%") : "";

    let hiredateVal = Hire_Date ?  Hire_Date : "";

    var dateString = hiredateVal; // Oct 23

var dateParts = dateString.split("/");
//continue with date bug!!


    let annualSalaryVal = annualSalary[1] ? parseFloat(`${annualSalary[1].trim()}`) : "";
    let bonusVal = bonus[0] ? Number(`${bonus[0].trim()}`) : "";

    

    


    this.createEmployeeForm = this._FormBuilder.group({
      Employee_ID: [`${employeeObject.Employee_ID}`, Validators.required],
      Full_Name: [`${employeeObject.Full_Name}`, Validators.required],
      Job_Title: [`${employeeObject.Job_Title}`, Validators.required],
      Department: [`${employeeObject.Department}`, Validators.required],
      Business_Unit: [`${employeeObject.Business_Unit}`, Validators.required],
      Gender: [`${employeeObject.Gender}`, Validators.required],
      Ethnicity: [`${employeeObject.Ethnicity}`, Validators.required],
      Age: [`${employeeObject.Age}`, Validators.required],
      Hire_Date: [hiredateVal, Validators.required],
      Annual_Salary: [annualSalaryVal, Validators.required],
      Bonus: [bonusVal, Validators.required],
      Country: [`${employeeObject.Country}`, Validators.required],
      City: [`${employeeObject.City}`, Validators.required]
    });
  }

  createOrUpdateEmployee() {
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

      if (this.isEdit) {

        this.editEmployee ={
          _id:`${this.editEmployeeID}`,
          Employee_ID: `${Employee_ID}`,
          Full_Name: `${Full_Name}`,
          Job_Title: `${Job_Title}`,
          Department: `${Department}`,
          Business_Unit: `${Business_Unit}`,
          Gender: `${Gender}`,
          Ethnicity: `${Ethnicity}`,
          Age: `${Age}`,
          Hire_Date: `${Hire_Date}`,
          Annual_Salary: `$`+`${Annual_Salary}`,
          Bonus: `${Bonus}%`,
          Country: `${Country}`,
          City: `${City}`
        }

        //api call
        this._EmployeeService.updateEmployee(this.editEmployee).subscribe({
          next: (data) => {
            this.ScrollToTop();
            this.updatedInfo = "Employee Record has updated!";
            this.resetEmployee();
            setTimeout(() => {
              this.recordUpdated.emit(true);
            }, 1200);

          },
          error: (err) => {
            this.ScrollToTop();
            this.isError = true;
            let { error } = err;
            if (error && error.errors) {
              this.errorMessage = error.errors[0] ? error.errors[0].msg : "some error";
            }
            else {
              this.errorMessage = "some error";
            }
          }
        });

      }
      else {

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
          Annual_Salary: `$`+`${Annual_Salary}`,
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
            }, 1200);

          },
          error: (err) => {
            this.ScrollToTop();
            this.isError = true;
            let { error } = err;
            if (error && error.errors) {
              this.errorMessage = error.errors[0] ? error.errors[0].msg : "some error";
            }
            else {
              this.errorMessage = "some error";
            }
          }
        });

      }



    }

  }
  resetEmployee() {
    this.createEmployeeForm.reset();
    if(this.isEdit){
      this.recordUpdated.emit(true);
    }
  }

  ScrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

}
