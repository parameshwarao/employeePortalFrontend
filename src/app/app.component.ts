import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingServiceService } from './shared/service/loading-service.service';
import { Subscription } from 'rxjs';
import { EmployeeService } from './shared/service/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy{
  sub:Subscription = new Subscription();
  router:string ="";
  showGridSpinner:boolean = false;
  constructor(private _router: Router, private _LoadingServiceService:LoadingServiceService, private _EmployeeService : EmployeeService){
    
  }
  ngOnDestroy(): void {
    //close subscription
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.sub = this._LoadingServiceService.loadingStatus.subscribe((loadingStat)=>{
      this.showGridSpinner = loadingStat;
    });
  }

  get currentRoute(){
    return this._router.url;
  }
  
  get isUserAuthenticated(){
return this._EmployeeService.isUserAuthenticated;
  }


  title = 'Employee Database';
  expandResponsiveMenu:boolean= false;

  public signOut(){
    sessionStorage.clear();
    this._EmployeeService.isUserAuthenticated = false;
    this._router.navigate(['/']);
  }
}
