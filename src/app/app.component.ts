import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingServiceService } from './shared/service/loading-service.service';
import { Subscription } from 'rxjs';
import { EmployeeService } from './shared/service/employee.service';
import { employeeChannelChatService } from './shared/service/employeeChannelChat.service';
import { authenicationStatus } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  sub: Subscription = new Subscription();
  router: string = "";
  showGridSpinner: boolean = false;
  constructor(private _router: Router,
    private _LoadingServiceService: LoadingServiceService,
    private _EmployeeService: EmployeeService,
    private _employeeChat: employeeChannelChatService,
    private cdRef: ChangeDetectorRef
  ) {

  }
  ngAfterViewInit(): void {
    this.sub = this._LoadingServiceService.loadingStatus.subscribe((loadingStat) => {
      this.showGridSpinner = loadingStat;
      this.cdRef.detectChanges();
    });

    this._EmployeeService.userAuthenicationStats.subscribe((authenticationStats:authenicationStatus) => {
      if (authenticationStats.isAuthenticated && !authenticationStats.hasAuthenticationCheck) {
        //once authenticated initialize only once to avoid socket issue
        this._EmployeeService.userAuthenicationStats.next({
          hasAuthenticationCheck:true,
          isAuthenticated:true
        });
        this._employeeChat.createSocketSession();
      }


    });
  }
  ngOnDestroy(): void {
    //close subscription
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  ngOnInit(): void {

  }

  get currentRoute() {
    return this._router.url;
  }

  get isUserAuthenticated() {
    return this._EmployeeService.isUserAuthenticated;
  }


  title = 'Employee Database';
  expandResponsiveMenu: boolean = false;

  public signOut() {
    sessionStorage.clear();
    this._EmployeeService.isUserAuthenticated = false;
    this._router.navigate(['/']);
    window.location.reload();
  }
}
