import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeService } from '../../shared/service/employee.service';
import { detailResponse } from '../../shared/models/employee.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit, AfterViewInit {
public isError:boolean = false;
  employeeDetail: detailResponse = new detailResponse();
  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _EmployeeService: EmployeeService) {

  }
  ngAfterViewInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      if (params && params['id']) {
        this.getEmployeeDetails(params['id']);
      }
    });
  }
  getEmployeeDetails(id: string = "") {
    this._EmployeeService.getEmployeeDetail(id).subscribe({
      next: (data) => {
        this.isError = false;
        this.employeeDetail = data;
      },
      error: (err) => {
        this.isError = true;

      }
    });
  }

  ngOnInit(): void {
  }

  goBack() {
    this._location.back();
  }

  deleteEmployee(){

  }

  updateEmployee(){
    
  }

}
