import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingServiceService } from './shared/service/loading-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy{
  sub:Subscription = new Subscription();
  router:string ="";
  showGridSpinner:boolean = false;
  constructor(private _router: Router, private _LoadingServiceService:LoadingServiceService){
    
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
  title = 'Employee Database';
  expandResponsiveMenu:boolean= false;
}
