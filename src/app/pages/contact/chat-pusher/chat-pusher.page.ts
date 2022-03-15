import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { PusherMessageService } from 'src/app/services/pusher/pusher-message.service';
import { v4 } from 'uuid';
interface Message {
  id: string;
  message: string;
  timestamp: number;
  fileUrl?: string;
  idUser?: any;
  mediaType?:string;
  from: string;
  fromName?: string;
}

@Component({
  selector: 'app-chat-pusher',
  templateUrl: './chat-pusher.page.html',
  styleUrls: ['./chat-pusher.page.scss'],
})
export class ChatPusherPage implements OnInit {
  @ViewChild(IonContent, {read: IonContent, static: false}) contentArea: IonContent;
  public staff: any = history.state?.staff;
  private id: string = history.state?.chat? history.state?.chat:'295';
  private data: any = history.state?.data;
  public name: string = this.staff?.name;

/*   messages: Array<Message> = [];
  message: string = ''; */
  lastMessageId = -1;
  
  @ViewChild('txtChat') txtChat: any;
  loading: any;
  public messageUploadList=[];
  public messagesList = [];
  private to = [];
  private type: 'User'
  private isTyping: Boolean = false;
  private btnImageEnabled = true;
  public  btnEnabled = true;

  constructor(
    private dooleService: DooleService,
    private pusherMessage: PusherMessageService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.getMessagesList()  
  }
  ionViewWillEnter(){
    console.log("[ConversationPage] ionViewWillEnter() message_header_id: ", this.id);
    console.log("[ConversationPage] ngOnInit()", this.staff);
    if(this.staff)
      this.to.push(this.staff?.id);
    else 
      console.log("staff is undefined, post message without staff id");

    this.getPusher()
  }


  getPusher() {
    const NAME_BIND = 'App\\Events\\MessageCreated' 
    const channel = this.pusherMessage.init('353');
        channel.bind(NAME_BIND, (data) => {
          console.log('[ChatPusherPage] getPusher() data' , data);
          if (data.id !== this.lastMessageId) {
            const message: Message = {
              id: data?.output?.id,
              message: data?.output?.content,
              timestamp: data?.output?.created_at,
              idUser: data?.output?.user.id,
              fileUrl: data?.output?.file,
              from:  (data?.output?.user.id === this.authService?.user.idUser) ? 'message_response' : 'message_request',
              fromName: data?.output?.user.name,
              mediaType: data?.output?.mime
            };
            this.messagesList = this.messagesList.concat(message);
            console.log('[ChatPusherPage] getPusher() messagesList' ,   this.messagesList);
          }
        })


  }

  getMessagesList(pagination?) {
    this.loading = true
    const page = pagination? pagination:0
    this.dooleService.getAPImessage(this.id, page).subscribe(
      async (res: any) =>{
        console.log('[ChatPusherPage] getAPImessage()', await res);
        if (res.success) {
          let list = []
          this.lastMessageId = res.messages[0]?.id? res.messages[0]?.id: this.lastMessageId
          res.messages.forEach(msg =>{
            const message: Message = {
              id: msg?.id,
              message: msg?.content,
              idUser: msg?.user_id,
              timestamp: new Date(msg?.created_at).getTime() ,
              mediaType: msg?.mime.toUpperCase(),
              fileUrl: msg?.file,
              from:  (msg?.user_id === this.authService?.user.idUser) ? 'message_response' : 'message_request',
              fromName: msg.user?.name,
            };
            list.push(message);
            console.log('[ChatPusherPage] getAPImessage() messages' ,message);
          })
          if(page == 0){
            this.messagesList = list.reverse()
            this.scrollToBottom()
          }else
          this.messagesList = this.messagesList.concat(list.reverse());
        }

        this.loading = false
       },(err) => { 
        this.loading = false
          console.log('[ChatPusherPage] getAPImessage() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        this.loading = false
      };
  }

  scrollToBottom() {
    setTimeout(() => {  
        this.contentArea.scrollToBottom(200);
}, 200);
}

  formatDate(d){
    var auxdate = d.split('T')
    d = auxdate[0];
    let date0 = new Date(d).toISOString();
    let date = new Date(date0);
    let time = auxdate[1];
    date.setHours(time.substring(0,2));
    date.setMinutes(time.substring(3,5));
    return date;
  }

  send(){
    const message = this.txtChat.content;
    this.btnEnabled = false;
    this.btnImageEnabled = false;

    const postData = {
      content: message,
      to: this.to,
      type: this.staff?.type? this.staff?.type: this.type
    };
    if(this.id)
    postData['id'] = this.id

    console.log('send()', postData);

    this.dooleService.post('message', postData).subscribe(
        async (data) => {
          if (this.id != data.idMessageHeader){
            this.id = data.idMessageHeader;
            // this.observeMessages();
            // this.observeTyping();
            //this.getMessagesList(0)
          }
          this.getMessagesList(0)
          this.txtChat.clearInput();
          this.btnEnabled = true;
          this.btnImageEnabled = true;
   
        },
        (error) => {
          // Called when error
          console.log('error: ', error);
          throw new HttpErrorResponse(error);
        },
        () => {
          // Called when operation is complete (both success and error)
          // loading.dismiss();
        });


  }

  sendMessage() {
/*     if (this.message !== '') {
      // Assign an id to each outgoing message. It aids in the process of differentiating between outgoing and incoming messages
      this.lastMessageId = v4();
      const data = {
        id: this.lastMessageId,
        text: this.message,
      }; */
      
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
        
  //  }
  }


    // This method adds classes to the element based on the message type
/*     getClasses(messageType) {
      return {
        incoming: messageType === 'incoming',
        outgoing: messageType === 'outgoing',
      };
    } */


}
