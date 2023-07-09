import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError, forkJoin, BehaviorSubject, ReplaySubject } from 'rxjs';

import { Manager, Socket, io } from 'socket.io-client';

@Injectable({
    providedIn: 'root'
  })
export class employeeChannelChatService{

    public socket: Socket = {} as any;
    public messages: ReplaySubject<any> = new ReplaySubject();
    public username: string = "";
    baseURL: string = `${environment.backendOrigin}/`;
    userNameURL: string = "api/auth/getUserName";

    constructor(private _httpClient: HttpClient) {       
    
       
    
      }

      getHttpUrl(urlSegment: string): string {
        return `${this.baseURL}${urlSegment}`;
      }

      public createSocketSession(){
       
      
     this.socket= {} as any;
      
      let userToken = sessionStorage.getItem('authToken');
        this.socket =  io(`${environment.backendOrigin}`, {
          extraHeaders: {
            'x-auth-token': `${userToken}`
          }
    
        });
      this.getUserNameAndBeginSession();
    }

    private getUserNameAndBeginSession(){
        this.getUserName().subscribe({
          next: (data) => {
            let { name } = data;
            this.username = `${name}`;
            //begin chat session
            this.chatBegin(this.username);
            this.getNewMessage();
    
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    
      public chatBegin(username: string = "") {
        console.log(`Employee Channel establised`);
        this.socket.emit('groupChatJoin', { username: this.username });
      }
    
      public sendMessage(userMessage: string = "") {
        this.socket.emit('messages', { from: this.username, message: userMessage });
      }
    
      public userIdle() {
        this.socket.emit('userIdle', { username : this.username });
      }
    
      
      //do not call this anywhere as it creates duplicates
      
      public getNewMessage = ():void => {
        this.socket.on('message', (message) => {     
          this.messages.next(message);
        });
      };
    
     
      public getUserName = (): Observable<any> => {
        let url: string = this.getHttpUrl(this.userNameURL);
        url = `${url}`;
        return this._httpClient.get(url).pipe(catchError(this.errorHandler));
      }

      //error handler
  public errorHandler(errorResponse: HttpErrorResponse) {
    return throwError(() => errorResponse);
  }
}