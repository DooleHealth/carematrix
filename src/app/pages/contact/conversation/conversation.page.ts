import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {ActionSheetController, Platform} from '@ionic/angular';
import {MediaCapture} from '@ionic-native/media-capture/ngx'
import {Media} from '@ionic-native/media/ngx'
import {HttpErrorResponse} from '@angular/common/http';
import firebase from 'firebase';
import { Capacitor, Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { SafeResourceUrl } from '@angular/platform-browser'; 
import { File } from '@ionic-native/file/ngx';
import { Events } from 'src/app/services/events.service';
import { DooleService } from 'src/app/services/doole.service';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage'; // This line added manually.
import { Chooser } from '@ionic-native/chooser/ngx';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IonContent } from '@ionic/angular';

const { Camera } = Plugins;
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  @ViewChild(IonContent, {read: IonContent, static: false}) contentArea: IonContent;
  public staff: any = history.state?.staff;
  private id: string = history.state?.chat;
  public name: string = this.staff?.name;

  public messagesList = [];
  private users = [];
  private to = [];
  private type: string;
  @ViewChild('txtChat') txtChat: any;
  loading: any;
  public messageUploadList=[];
  private isTyping: Boolean = false;
  file64: SafeResourceUrl;
  private commentsRef;
  private loadingShow = false;
  private btnImageEnabled = true;
  private btnEnabled = true;
  private title : string;
  private image : string = '';
  mediaFiles: any = [];
  tutor:any;
  family_name:any;
  address:any;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  private images : any = [];
  private mimes : any = [];
  private imagesTemp : any = [];

  
  constructor(private firebaseAuth: AngularFireAuth,
              private firebaseDB: AngularFireDatabase,
              private authService: AuthenticationService,
              public _zone: NgZone,
              public actionSheetCtrl: ActionSheetController,
              public events: Events,
              public doole: DooleService,
              public file: File, private translate : TranslateService,
              private chooser: Chooser,       
              public platform: Platform,
              private mediaCapture: MediaCapture,
              private media: Media,
              private storage: Storage) {

   
  }

  ngOnInit() {

    console.log("message_header_id: ", this.id);
    this.firebaseAuth.onAuthStateChanged( user => {
      if (user) {
        if (this.id != '')               // només observem missatges si tenim idHeader
        {
          console.log("user:", user);
          const dict = [];
          dict.push({key: 'id', value: this.id });
          if(this.authService.user && this.id){
            this.observeMessages();
          }
        }else{
          console.log('no id');
        }
      } 

    });
    this.scrollToBottom();
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

  scrollToBottom() {
      setTimeout(() => {  
          this.contentArea.scrollToBottom(200);
  }, 200);
  }

  async observeMessages(){

    console.log(this.id);

  
    this.loadingShow = true;

    this.commentsRef = this.firebaseDB.database.ref('room-messages').child(this.id).orderByChild('timestamp');
    this.commentsRef.on('child_added', data => {
      const user = this.findUser(data.val().userId);
      const tmp = [];
      tmp.push({
        message: data.val().message,
        idUser: data.val().userId,
        timestamp: data.val().timestamp,
        mediaType: data.val().mediaType,
        fileUrl: data.val().fileUrl,
        from: (data.val().userId === this.authService?.user.idUser) ? 'message_response' : 'message_request',
        fromName: data.val().name
      });
      this._zone.run(() => {
        console.log('entra tmp');
      });
      this.messagesList.push(tmp);
      this._zone.run(() => {
        this.scrollToBottom();
        console.log('force update the screen');
      });
      console.log('afegit');
      console.log(tmp);
      this._zone.run(() => {
        this.scrollToBottom();
        console.log('force update');
      });
      //si envia un altre, marquem com a rebut el missatge
      if( (data.val().userId != this.authService.user.idUser)){
        var msg = this;
        //this.nativeAudio.play('received', () => console.log('uniqueId1 is done playing'));
        firebase.database().ref('/room-messages/'+msg.id).child(data.key).child(msg.authService?.user.idUser).once('value').then(function(snapshot) {
            //si no hem llegit
            if(snapshot.numChildren()==0){
                //marquem com a rebut
                //this.nativeAudio.play('received', () => console.log('uniqueId1 is done playing'));

                var newPostKey = firebase.database().ref().child('room-messages').child(msg.id).child(data.key).child(msg.authService?.user.idUser).push().key;
                var updates = {};
                updates['/room-messages/'+msg.id+"/"+ data.key+"/"+msg.authService?.user.idUser] = {state:2};
                firebase.database().ref().update(updates);

                msg.authService.post("message/"+data.val().id+"/state/2",null).subscribe(data=>{
                //console.log("marcat com a llegit")
                });
            }else{
            }
        });
    }

    });
  
  }

  send(){
    const message = this.txtChat.content;
    this.btnEnabled = false;
    this.btnImageEnabled = false;

    const postData = {
      id: this.id,
      content: message,
      to: this.to,
      type: this.type
    };
    this.authService.post('message', postData).subscribe(
        async (data) => {
          if (this.id != data.idMessageHeader){
            this.id = data.idMessageHeader;
            this.observeMessages();
            this.observeTyping();
          }

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
    });

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
    
    this.doole.uploadMessageImage(this.id,this.to,"",fileUri, this.authService.user.idUser).then(data =>{
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

  public observeTyping(){
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
            self.title=this.translate.instant("Escribiendo...");
        }else{
            //$("#isTyping").hide();
            self.title=this.translate.instant("Chat");
        }
    });
  }

 




}
