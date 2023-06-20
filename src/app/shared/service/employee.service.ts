import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  
  baseURL:string = `${environment.backendOrigin}/`;
  authToken:string ="";
  loginURL:string ="api/auth";

  constructor(private _httpClient : HttpClient) { }

  getHttpUrl(urlSegment:string):string{
return `${this.baseURL}${urlSegment}`;
  }

  //error handler
  public errorHandler(errorResponse:HttpErrorResponse){
    return throwError(()=>errorResponse);
  }

  public userLogin(userName:string ="",userPassword:string =""):Observable<any>{
    let url:string =this.getHttpUrl(this.loginURL);
    return this._httpClient.post(url,{
      email:userName,
      password:userPassword
    }).pipe(catchError(this.errorHandler));
  }
}
