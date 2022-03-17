import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
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

  lastMessageId = -1;
  lastPage = 0
  nextPage = 0
  currentPage = 0
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
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
    const channel = this.pusherMessage.init(this.id); //'353'
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

            this.scrollToBottom()
          }
        })


  }

  getMessagesList(pagination?) {
    this.loading = true
    const page = pagination? pagination:0;
    if(this.nextPage <= this.lastPage || this.lastPage == 0)
        this.dooleService.getAPImessage(this.id, page).subscribe(
          async (res: any) =>{
            console.log('[ChatPusherPage] getAPImessage()', await res);
            if (res.success) {
              this.currentPage = res.currentPage
              this.nextPage =  (this.currentPage) + 1
              this.lastPage =  res.lastPage
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
                //console.log('[ChatPusherPage] getAPImessage() messages' ,message);
              })
              this.infiniteScroll.complete()
              if(page == 0){
                this.messagesList = list.reverse()
                this.scrollToBottom()
              }else{
                list = list.reverse()
                this.messagesList = list.concat(this.messagesList);
              }
              //this.toggleInfiniteScroll()
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
      else 
          this.toggleInfiniteScroll()
  }

  getLastMessage() {

    this.dooleService.getAPImessage(this.id).subscribe(
      async (res: any) =>{
        console.log('[ChatPusherPage] getAPImessage()', await res);
        if (res.success) {
          let msg = res.messages[0];
          if(this.lastMessageId != msg.id){
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
            
            console.log('[ChatPusherPage] getAPImessage() messages' ,message);

            this.lastMessageId = msg?.id? msg?.id: this.lastMessageId
            this.messagesList.push(message);
            if(this.messagesList.length > 10)
              this.messagesList.splice(0,this.messagesList.length-10 )
            
            this.scrollToBottom()
          }

        }

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
          //this.getMessagesList(0)
          this.getLastMessage()
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

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
