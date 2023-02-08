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
import { LanguageService } from 'src/app/services/language.service';
import { DateService } from 'src/app/services/date.service';
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
  created_at?: string;
}
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  @ViewChild(IonContent, {read: IonContent, static: false}) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public staff: any = history.state?.staff;
  private id: string = history.state?.chat;
  private data: any = history.state?.data;

  lastMessageId = -1;
  lastPage = 0
  nextPage = 0
  currentPage = 0
  lastDate: string = ''

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
  bander = 0;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  footerHidden: boolean;
  private btnImageEnabled = true;

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
              private dateService: DateService,
              ) {


  }

  ngOnInit() {


    if(this.id)
    this.getMessagesList(false)
  }

  ionViewWillEnter(){

    if(this.id){
      this.getPusher()
    }
    else
      console.log('no id');
  }

  ionViewWillLeave(){
    if(this.id)
    this.pusherMessage.unsubscribePusher(this.id);
  }

  getPusher() {
    const NAME_BIND = 'App\\Events\\MessageCreated'
    const channel = this.pusherMessage.init(this.id);
    console.log('[ChatPusherPage] getPusher() channel' , channel);
        channel.bind(NAME_BIND, (data) => {
          console.log('[ChatPusherPage] getPusher() data' , data);
          if (data.id !== this.lastMessageId) {
            let date = this.getCalendarDay(new Date().getTime())
            const message: Message = {
              id: data?.output?.id,
              message: data?.output?.content,
              timestamp: data?.output?.created_at,
              idUser: data?.output?.user.id,
              fileUrl: data?.output?.file,
              from:  (data?.output?.user.id === this.authService?.user.idUser) ? 'message_response' : 'message_request',
              fromName: data?.output?.user.name,
              mediaType: data?.output?.mime,
              date: date,
              created_at:data?.output?.created_at,
            };
            this.messagesList = this.messagesList.concat(message);
            this.setShowDay(this.messagesList)
            console.log('[ChatPusherPage] getPusher() messagesList' ,   this.messagesList);
            this.scrollToBottom();
          }
        })


  }

  async onScroll(event: any) {
    const scrollElement = await this.content.getScrollElement(); // get scroll element
    // calculate if max bottom was reached
    let height = scrollElement.scrollHeight - scrollElement.clientHeight
    let total = Math.abs(scrollElement.scrollTop - height)
    //Android is not accurate
    this.footerHidden = ( total <= 5 )? false:true;
  }




  scrollToBottom() {
    console.log('[ChatPusherPage] getPusher() contentArea' ,   this.content);
      setTimeout(() => {
          this.content.scrollToBottom(300);
    }, 1000);
  }

  getRecipients(recipients){
      recipients.forEach(r => {
       if(r.messageable_id != this.authService?.user.idUser){

          if(r.messageable_type == 'App\\Department'){
              this.staff = {
                name: r.messageable.name,
                image: r.messageable.temporaryUrl,
                type: 'department'
              }
          }
          else{
            this.staff = {
              name: r.messageable.name,
              image: r.messageable.temporaryUrl,
              type: 'user'
            }
          }
          this.to.push(this.staff?.id);
       }
      })
  }

  getMessagesList(isFirstLoad, event?) {
    this.loading = true
    console.log('[ChatPusherPage] getMessagesList() bander:' ,   ++this.bander);
    const page = this.nextPage;
    if(this.nextPage <= this.lastPage)
        this.dooleService.getAPImessage(this.id, page).subscribe(
          async (res: any) =>{
            console.log('[ChatPusherPage] getAPImessage()', await res);
            if (res.success) {

              if(!isFirstLoad)
              this.getRecipients(res.recipients)

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
                  fileUrl: msg?.temporaryUrl, //image/jpeg
                  from:  (msg?.user_id === this.authService?.user.idUser) ? 'message_response' : 'message_request',
                  fromName: msg.user?.name,
                  date: this.getCalendarDay(new Date(msg?.created_at).getTime()),// this.formatDate(msg?.created_at, 'T'),
                  created_at: msg?.created_at ,
                };
                list.push(message);
                //console.log('[ChatPusherPage] getAPImessage() Elemento Repetido: messages' ,message);
              })

              if(page == 0){
                this.messagesList = list.reverse()
                this._zone.run(() => {
                  this.scrollToBottom();

                });
              }else{
                this.addMessageToList(list)
/*                 list = list.reverse()
                this.messagesList = list.concat(this.messagesList); */
              }
              this.setShowDay(this.messagesList)
              if(isFirstLoad)
              this.infiniteScroll.complete()
              console.log('[ChatPusherPage] getAPImessage() size messages' , this.messagesList);
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

  setShowDay(messagesList){
    messagesList.forEach(message => {
      if(message?.date != this.lastDate){
        message['showDay'] = true
        this.lastDate = message.date
      }
      else message['showDay'] = false
    });
  }

  getCalendarDay(epoch: number): string {
    if (!epoch) {
      return null;
    }
    const today = this.translate.instant('agenda.today');
    const yesterday = this.translate.instant('agenda.yesterday');
    return moment(epoch).calendar(null, {
      sameDay: `[${today}]`,
      lastDay: `[${yesterday}]`,
      sameElse: 'DD/MM/YYYY',
      lastWeek : 'DD/MM/YYYY',
      nextDay : 'DD/MM/YYYY'
    });
  }


  send(){
    const message = this.txtChat.content;
    this.btnEnabled = false;
    this.btnImageEnabled = false;
    let type = this.type? this.type:this.staff.type
    const postData = {
      content: message,
      to: this.to,
      type: type.toLowerCase()
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

    const eventObj: any = event as any;
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

  formatDate(date)
  {
    return this.dateService.formatDate(date);
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