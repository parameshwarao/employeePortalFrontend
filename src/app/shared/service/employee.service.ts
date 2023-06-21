import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { userRequestBody } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //flag to check if user authenticated
  public isUserAuthenticated:boolean = false;
  baseURL:string = `${environment.backendOrigin}/`;
  authToken:string ="";
  loginURL:string ="api/auth";
  signUpURL:string ="api/users";
  userExistURL:string ="api/auth/userExist";
  updatePasswordURL:string ="api/auth/updatePassword";

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

  public signUpUsers(userDetails:userRequestBody):Observable<any>{
    let url:string =this.getHttpUrl(this.signUpURL);
    return this._httpClient.post(url,userDetails).pipe(catchError(this.errorHandler));
  }

  public validateUser(useEmail:string ="", appSecertKey:string =""):Observable<any>{
    let url:string =this.getHttpUrl(this.userExistURL);
    return this._httpClient.post(url,{
      email:useEmail,
      secertKey:appSecertKey
    }).pipe(catchError(this.errorHandler));
  }

  public changeUserPassword(userReferenceID:string ="", updatedPassword:string =""):Observable<any>{
    let url:string =this.getHttpUrl(this.updatePasswordURL);
    return this._httpClient.post(url,{
      _id: userReferenceID,    
      updatedPassword: updatedPassword
    }).pipe(catchError(this.errorHandler));
  }
}
