import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';


import { ToolsComponent } from './tools/tools.component';




import{ToolsModuleModule} from './tools-module/tools-module.module';
import { LoginComponent } from './user/login/login.component';

import { UserModule } from './user/user.module';
import { EmployeeService } from './shared/service/employee.service';
import { LoadingInterceptor } from './shared/service/loading-interceptor.service';
import { TokenInterceptor } from './shared/service/token-interceptor.service';
import { ListModule } from './list/list.module';

@NgModule({
  declarations: [
    AppComponent,  
    ToolsComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  
    UserModule,
    ListModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent},         
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '*', component: LoginComponent },
      { path: '**', component: LoginComponent }   
    ]),
    ToolsModuleModule    
  ],
  providers: [EmployeeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
   },
   {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
 }],
  bootstrap: [AppComponent]
})
export class AppModule { }
