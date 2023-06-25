import { AfterViewInit, Component, OnInit } from '@angular/core';
import { employeeObject, employeeResponse, empoloyeeListReq } from '../../shared/models/employee.model';
import { EmployeeService } from '../../shared/service/employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  public employeeListRequestBody: empoloyeeListReq = new empoloyeeListReq();
  public employeeResponse: employeeResponse = new employeeResponse();
  public totalCount: number = 0;

  public totalPages: number[] = [];
  public currentPage: number = 1;
  public pageSize: number = 15;
  public pageIndex: number = 0;

  public PageSizeValues: number[] = [10, 15, 30, 50, 100];
  public errorMessage:string [] = ["No Records Found!","Error Connecting Server!"];
  public errorText:string ="";
  public isError:boolean = false;




  constructor(private _EmployeeService: EmployeeService, private _router: Router) { }
  ngAfterViewInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList(resetPagination: boolean = true) {
    this.isError = false;

    this.employeeListRequestBody.recordPerPage = this.pageSize;

    if (resetPagination) {
      this.pageIndex = 0;
      this.currentPage = 1;
      this.employeeListRequestBody.pageIndex = 0;
    }
    else {
      this.pageIndex = this.currentPage - 1;
      this.employeeListRequestBody.pageIndex = this.pageIndex < 0 ? 0 : this.pageIndex;
    }






    this._EmployeeService.getEmployeeList(this.employeeListRequestBody).subscribe({
      next: (data) => {
        this.employeeResponse = data;
        if(this.employeeResponse.empdata.length == 0){
          this.isError = true;
          this.errorText = this.errorMessage[0];
        }
        this.totalCount = this.employeeResponse.totalCount[0].count;
        
        this.updatePagination(this.totalCount);
      },
      error: (err) => {
        this.isError = true;
        this.errorText = this.errorMessage[1];
      }
    });
  }

  ngOnInit(): void {

  }

  //To split the records according to the pageSize and the totalCount of list records
  updatePagination(totalRecords: number = 0) {
    let totalPagesCount: number = 0;
    if (totalRecords == 0) {
      this.totalPages = [];
      this.currentPage = 1;
    }
    else {
      totalPagesCount = Math.ceil(
        totalRecords / this.pageSize
      );

      let pages: number[] = [];
      for (let i = 1; i <= totalPagesCount; i++) {
        pages.push(i);
      }
      this.totalPages = pages.map(page => page);

    }

  }

  pageForwardButton() {
    this.currentPage = this.currentPage + 1;
    this.getEmployeeList(false);

  }
  pageBackwardButton() {
    this.currentPage = this.currentPage - 1;
    this.getEmployeeList(false);

  }
  updatePage($event: number) {
    this.currentPage = $event;
    this.getEmployeeList(false);
  }

  updatePageSize($event: number) {
    this.pageSize = $event;
    this.getEmployeeList(false);
  }

  disableForwardButton() {

    if (this.currentPage == this.totalPages.length) {
      return true;
    }
    return false;
  }

  redirectToDetailPage(employee: employeeObject) {
    this._router.navigate(['/Listdetail'], { queryParams: { id: employee._id } });
  }

}
