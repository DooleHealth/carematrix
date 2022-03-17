import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActionSheetController, IonInfiniteScroll, Platform} from '@ionic/angular';
import {MediaCapture} from '@ionic-native/media-capture/ngx'
import {HttpErrorResponse} from '@angular/common/http';
import { Capacitor, Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { SafeResourceUrl } from '@angular/platform-browser'; 
import { File } from '@ionic-native/file/ngx';
import { Events } from 'src/app/services/events.service';
import { DooleService } from 'src/app/services/doole.service';
import { TranslateService } from '@ngx-translate/core';
import { Chooser } from '@ionic-native/chooser/ngx';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { PusherMessageService } from 'src/app/services/pusher/pusher-message.service';
import { DatePipe } from '@angular/common';
import moment from 'moment';
const { Camera } = Plugins;

interface Message {
  id: string;
  message: string;
  timestamp: number;
  date?: string;
  fileUrl?: string;
  idUser?: any;
  mediaType?:string;
  from: string;
  fromName?: string;
}
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  @ViewChild(IonContent, {read: IonContent, static: false}) contentArea: IonContent;
  public staff: any = history.state?.staff;
  private id: string = history.state?.chat;
  private data: any = history.state?.data;
  public name: string = this.staff?.name;

  lastMessageId = -1;
  lastPage = 0
  nextPage = 0
  currentPage = 0
  lastDate: string = ''
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public messageUploadList=[];
  public messagesList = [];
  private users = [];
  private to = [];
  private type: string;
  @ViewChild('txtChat') txtChat: any;
  loading: any;
  file64: SafeResourceUrl;

  public  btnEnabled = true;
  private image : string = '';
  mediaFiles: any = [];
  tutor:any;
  family_name:any;
  address:any;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  private images : any = [];
  private mimes : any = [];
  private imagesTemp : any = [];
  private commentsRef;
  private loadingShow = false;
  private btnImageEnabled = true;
  private title : string;
  private isTyping: Boolean = false;

  
  constructor(
              private authService: AuthenticationService,
              public _zone: NgZone,
              public actionSheetCtrl: ActionSheetController,
              public events: Events,
              public dooleService: DooleService,
              public file: File, 
              private translate : TranslateService,
              private chooser: Chooser,       
              public platform: Platform,
              private mediaCapture: MediaCapture,
              private router: Router,
              private pusherMessage: PusherMessageService,
              ) {

   
  }

  ngOnInit() {
    if(this.id)
    this.getMessagesList()  
  }

  ionViewWillEnter(){
    console.log("[ConversationPage] ionViewWillEnter() message_header_id: ", this.id);
    console.log("[ConversationPage] ngOnInit()", this.staff);
    if(this.staff)
      this.to.push(this.staff?.id);
    else 
      console.log("staff is undefined, post message without staff id");

    if(this.id)
      this.getPusher()
    else
      console.log('no id');
  }

  private findUser(id){
    const result = null;
    for (let i = 0; i < this.users.length; i++){
      if (this.users[i].id == id) {
        return this.users[i];
      }
    }
    const u = {name: '', image: ''};
    return u;
  }

  getPusher() {
    const NAME_BIND = 'App\\Events\\MessageCreated' 
    const channel = this.pusherMessage.init(this.id);
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
              mediaType: data?.output?.mime,
              date:this.formatDate(data?.output?.created_at, ' '),
            };
            this.messagesList = this.messagesList.concat(message);
            console.log('[ChatPusherPage] getPusher() messagesList' ,   this.messagesList);
            this.scrollToBottom()
          }
        })


  }

  scrollToBottom() {
      setTimeout(() => {  
          this.contentArea.scrollToBottom(200);
    }, 200);
  }

  getMessagesList(pagination?) {
    this.loading = true
    const page = pagination? pagination:0;
    if(this.nextPage <= this.lastPage)
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
                  fileUrl: msg?.file, //image/jpeg
                  from:  (msg?.user_id === this.authService?.user.idUser) ? 'message_response' : 'message_request',
                  fromName: msg.user?.name,
                  date: this.formatDate(msg?.created_at, 'T'),
                };
                list.push(message);
                //console.log('[ChatPusherPage] getAPImessage() Elemento Repetido: messages' ,message);
              })
              this.infiniteScroll.complete()
              if(page == 0){
                this.messagesList = list.reverse()
                this.scrollToBottom()
              }else{
                this.addMessageToList(list)
/*                 list = list.reverse()
                this.messagesList = list.concat(this.messagesList); */

              }
              //this.toggleInfiniteScroll()
              console.log('[ChatPusherPage] getAPImessage() size messages' , this.messagesList.length);
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

  addMessageToList(list){
    list.forEach(msg =>{
      this.messagesList.unshift(msg)
    })
  }

  formatDate(d, param){
    var auxdate = d.split(param)
    d = auxdate[0];
    let date0 = new Date(d).toISOString();
     let date = new Date(date0);
    const datePipe: DatePipe = new DatePipe('es')
    return datePipe.transform(date,  'dd/MM/yyyy');
 /*    let date0 = new Date(d).getTime();
    return this.getCalendarDay(date0) */
  }

  printDate(message){
    if(message?.date != this.lastDate)
      return this.lastDate = message.date
    else return false
  }

  returnDay(d){
    let date = new Date(d);

    let today = new Date()
    if(date.getDay() == today.getDay())
      return 'Hoy'
    else if(date.getDay() == today.getDay()-1)
      return 'Ayer'
    else{
      const datePipe: DatePipe = new DatePipe('es')
      return datePipe.transform(date,  'dd/MM/yyyy');
    }
  }

  getCalendarDay(epoch: number): string {
    if (!epoch) {
      return null;
    }

    return moment(epoch).calendar(null, {
      sameDay: '[Hoy]',
      lastDay: '[Ayer]',
      sameElse: 'DD/MM/YY'
    });
  }


  send(){
    const message = this.txtChat.content;
    this.btnEnabled = false;
    this.btnImageEnabled = false;

    const postData = {
      content: message,
      to: this.to,
      type: this.type? this.type:this.staff.type
    };
    if(this.id)
    postData['id'] = this.id

    console.log('send()', postData);

    this.dooleService.post('message', postData).subscribe(
        async (data) => {
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

  async selectImageSource() {

    const buttons = [
      {
        text: this.translate.instant('documents_add.file'),
        icon: 'document',
        handler: () => {
          this.addFile();
        }
      },{
        text: this.translate.instant('Cancelar'),
        role: 'cancel',
        handler: () => {
        }}
    ];
 
    // Only allow file selection inside a browser   
    if (!this.platform.is('hybrid')) {
      buttons.push({
        text:  'Choose a File',
        icon: 'attach',
        handler: () => {
          this.fileInput.nativeElement.click();
        }
      });
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: this.translate.instant('documents_add.select'),
      buttons
    });
    await actionSheet.present();    
    
  }

  // Used for browser direct file upload
  async uploadFileFromBrowser(event: EventTarget) {
   
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    
    const file: any = target.files[0];
    console.log("uploadFileFromBrowser file", file);
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    const result = await toBase64(file).catch(e => Error(e));

    this.uploadFile(result as string);

  }

  async saveFile(fileUri){
   //const loading = await this.loadingController.create();
    //await loading.present();
    
  }

  async addFile(){
    
    this.chooser.getFile().then(async file => {
     
      if(file){
        var filename=new Date().getTime(); 
        this.saveBase64(file.dataURI, filename.toString(), file.mediaType).then(res => {
          this.uploadFile(res);
        });
      }
    }).catch((error: any) => {
      console.error(error)});
  }

  async addImage() {
     let source = CameraSource.Camera
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source
    })
    .catch((err)=>{
      console.log('error addImage', err);
    })

    if(image){
      var filename = new Date().getTime();
      this.image = Capacitor.convertFileSrc(image.dataUrl);
      this.saveBase64(this.image ,filename.toString(), image.format).then(res => {
        this.uploadFile(res);
      });
    }else{
      console.log("no image");
    }
  }

  addAudio(){
    this.mediaCapture.captureAudio().then(res=>{
       console.log("AUDIO: ",  res);
    })
    .catch((err)=>{
      console.log('error AUDIO', err);
    })
  }

  public saveBase64(base64:string, name:string, mediaType:string):Promise<string>{
    console.log("file base64: ", base64);
    return new Promise((resolve, reject)=>{
      var realData = base64.split(",")[1]
      let blob=this.b64toBlob(realData, mediaType) //TODO:  'image/jpeg'

      this.file.writeFile(this.file.cacheDirectory, name, blob)
      .then(()=>{
        console.log("** writeFile", this.file.cacheDirectory+name);
        resolve(this.file.cacheDirectory+name);
      })
      .catch((err)=>{
        console.log('error writing blob', err);
        reject(err);
      })
    })
  }

  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

  var blob = new Blob(byteArrays, {type: contentType});

  return blob;
}
  uploadFile(fileUri: string){
    this.btnEnabled = true;
    this.btnImageEnabled=true;

    var msg : any = {};
    msg["message"]="uploading";
    msg["from"]="message_response";
    msg["mediaType"]="UPLOADING";
    msg["fileUri"]= fileUri;
    msg["percentage"]=0;

    this.messageUploadList.push(msg);
  
    
    this.events.subscribe('uploadMessageImage', (data:any) => {
      console.log("this.events.subscribe", data);
      for (var i = 0; i < this.messageUploadList.length; i++) {
        if(this.messageUploadList[i]["fileUri"]==data.fileUrl){
          this.messageUploadList[i]["percentage"]=data.perc;
        }
      }
    });
    
    this.dooleService.uploadMessageImage(this.id,this.to,"",fileUri, this.authService?.user.idUser).then(data =>{
      console.log(" this.doole.uploadMessageImage", data);
      this.btnEnabled = true;
        this.btnImageEnabled=true;
        for (var i = 0; i < this.messageUploadList.length; i++) {
          if(this.messageUploadList[i]["fileUri"]==fileUri){
            this.messageUploadList.splice(i,1);
          }
        }
    }, (err) =>{
      
      this.throwError(err);
      for (var i = 0; i < this.messageUploadList.length; i++) {
        if(this.messageUploadList[i]["fileUri"]==fileUri){
          this.messageUploadList.splice(i,1);
        }
      }
    });
    
  }

  public throwError(error: any) {
    console.log("AuthenticationService throwError", error);
    
    if(error instanceof HttpErrorResponse)
      throw new HttpErrorResponse(error);
    else 
     throw error;
  }

/*   public observeTyping(){
    console.log("observeTyping()");
    if(this.id.length==0) return;

    var typingIndicatorRef = firebase.database().ref('room-typing').child(this.id);
    //var userIsTypingRef = typingIndicatorRef.child(this.auth.currentUser.idUser);
    var usersTypingQuery = typingIndicatorRef.orderByValue().equalTo(true);

    var typing = this.isTyping;
    var self=this;
    usersTypingQuery.on('value', function(snapshot) {
        if(snapshot.numChildren()==1 && typing){
            //estem escribint nosaltres
        }else if(snapshot.numChildren()>0){

            //$("#isTyping").show();
            self.title=self.translate.instant("chat.writting");
        }else{
            //$("#isTyping").hide();
            self.title=self.translate.instant("chat.header");
        }
    });
  } */

  backButton(){
    if(this.data)
    this.router.navigate([`/home`]);
  }

}
