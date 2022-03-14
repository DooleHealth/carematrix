import { Component, OnInit } from '@angular/core';
import { v4 } from 'uuid';
interface Message {
  id: string;
  text: string;
  timeStamp: Date;
  type: string;
}

@Component({
  selector: 'app-chat-pusher',
  templateUrl: './chat-pusher.page.html',
  styleUrls: ['./chat-pusher.page.scss'],
})
export class ChatPusherPage implements OnInit {
  messages: Array<Message> = [];
  message: string = '';
  lastMessageId;
  constructor() { }

  ngOnInit() {
  }

  sendMessage() {
    if (this.message !== '') {
      // Assign an id to each outgoing message. It aids in the process of differentiating between outgoing and incoming messages
      this.lastMessageId = v4();
      const data = {
        id: this.lastMessageId,
        text: this.message,
      };
      
/*       this.http
        .post(`http://localhost:4000/messages`, data)
        .subscribe((res: Message) => {
          const message = {
            ...res,
            // The message type is added to distinguish between incoming and outgoing             messages. It also aids with styling of each message type
            type: 'outgoing',
          };
          this.messages = this.messages.concat(message);
          this.message = '';
        }); */
        
    }
  }


    // This method adds classes to the element based on the message type
    getClasses(messageType) {
      return {
        incoming: messageType === 'incoming',
        outgoing: messageType === 'outgoing',
      };
    }


}
