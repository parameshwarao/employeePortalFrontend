import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../shared/service/employee.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username:string ="";
  public password:string ="";
  public passwordShow:boolean = false;
  public isPasswordError:boolean = false;

  constructor(private _EmployeeService:EmployeeService) { }

  ngOnInit(): void {
  }

  public submitHandler(){
    this._EmployeeService.userLogin(this.username,this.password).subscribe({
      next: (data)=>{
        console.log("sampledata"+data);

      },
      error: (err)=>{

      }
    });
  }

  

}
