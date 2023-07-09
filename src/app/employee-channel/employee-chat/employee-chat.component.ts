import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

import { io } from 'socket.io-client';
import { employeeChannelChatService } from '../../shared/service/employeeChannelChat.service';
import { chatMessage } from '../../shared/models/employeeChannel.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-employee-chat',
  templateUrl: './employee-chat.component.html',
  styleUrls: ['./employee-chat.component.scss']
})
export class EmployeeChatComponent implements OnInit, AfterViewInit,OnDestroy {

  public socket = io(`${environment.backendOrigin}`);
  public messages: Array<chatMessage> = [];
  public username: string = "";
  public userMessage: string = "";
  public sub:Subscription = new Subscription();

  @ViewChild('chatScroll') private chatScrollContainer: ElementRef = {} as ElementRef;

  constructor(private _employeeChat: employeeChannelChatService) {

  }
  ngOnDestroy(): void {
    this._employeeChat.userIdle();
    if(this.sub){
      this.sub.unsubscribe();
    }
  
  }
  ngAfterViewInit(): void {
  if(this._employeeChat.socket && !this._employeeChat.socket.active){
    this._employeeChat.createSocketSession();
  }
    

   this.sub =  this._employeeChat.messages.subscribe({
      next: (data) => {
        let message = <chatMessage>data;
        this.messages.push(message);
        setTimeout(() => {
          this.scrollToBottom();
        });
        
      }
    });
  }

  ngOnInit(): void {
    

  }

  getUsername(): void {
   /* this._EmployeeService.getUserName().subscribe({
      next: (data) => {
        let { name } = data;
        this.username = `${name}`;
        //begin chat session      

      },
      error: (err) => {
        console.log(err);
      }
    }) */
  }

  sendMessage(): void {
    if(this.userMessage){
      this._employeeChat.sendMessage(this.userMessage);
    //empty input box
    this.userMessage = "";
    }
    
  }

 

  scrollToBottom(): void {
    try {
        this.chatScrollContainer.nativeElement.scrollTop = this.chatScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

}
