
import { ViewContainerRef, Component, ElementRef, AfterViewInit, ViewChild, ComponentFactoryResolver, OnInit } from '@angular/core';
import * as OT from '@opentok/client';
import { SubscriberComponent } from '../subscriber/subscriber.component';
import { OpentokService } from '../../services/opentok.service';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController, Platform } from '@ionic/angular';
import { DooleService } from 'src/app/services/doole.service';
import { TranslateService } from '@ngx-translate/core';
import { File } from '@ionic-native/file/ngx';
import { Capacitor, Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { Chooser } from '@ionic-native/chooser/ngx';
const { Camera } = Plugins;
//declare let OT: any;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  providers:[Chooser]
})
export class VideoComponent implements  AfterViewInit, OnInit {

  @ViewChild('publisherDiv', { static: false }) publisherDiv: ElementRef;
  @ViewChild('subscriberHost', { read: ViewContainerRef, static: true }) subscriberHost: ViewContainerRef;
  //session: OT.Session;
  //publisher: OT.Publisher;
  session: any;
  publisher: any;
  publishing;
  apiKey: string;
  token: string;
  sessionId: string;
  durationStr: string;
  isWaiting:boolean = true;
  private image : string = '';
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  files: Array<{ name: string, file: string, type: string }> = [];
constructor(
  private componentFactoryResolver: ComponentFactoryResolver,
  private opentokService: OpentokService,
  private router: Router,
  public platform: Platform,
  private dooleService: DooleService,
  private modalCtrl: ModalController,
  private translate: TranslateService,
  public actionSheetCtrl: ActionSheetController,
  private chooser: Chooser,
  public file: File,
) { }

  async ngOnInit() {
    
    this.apiKey = this.opentokService.apiKey$;
    this.token = this.opentokService.token$;
    this.sessionId = this.opentokService.sessionId$;
    //await window.OT.getUserMedia();
    console.log(this.durationStr);
  }

publish() {
  this.session.publish(this.publisher, (err) => {
    if (err) {
      console.log(err)
    }
    else {
      this.publishing = true;
      
    }
  });
}

onStreamCreated(stream, session) {

  console.log('onStreamCreated');
  
  const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SubscriberComponent);
  const viewContainerRef = this.subscriberHost;
  const componentRef = viewContainerRef.createComponent(componentFactory);
  (<SubscriberComponent>componentRef.instance).stream = stream;
  (<SubscriberComponent>componentRef.instance).session = this.session;
  (<SubscriberComponent>componentRef.instance).subscribe();
  this.isWaiting = !this.isWaiting;
}

close() {
  
  if(this.session)
    this.session.disconnect();

  this.modalCtrl.dismiss({date:null});
}


ngAfterViewInit(): void {

  if (!this.platform.is('mobileweb') && !this.platform.is('desktop')) {

    this.session = OT.initSession(this.apiKey, this.sessionId);
    var publisherOptions = { 
      height: "100%",
      width: "100%"}
    this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, publisherOptions, (err) => {
      if (err) {
        if (err.name === 'OT_USER_MEDIA_ACCESS_DENIED') {
          // Access denied can also be handled by the accessDenied event
          alert('Please allow access to the Camera and Microphone and try publishing again.');
        } else {
          alert('Failed to get access to your camera or microphone. Please check that your webcam'
            + ' is connected and not being used by another application and try again.');
        }
        this.publisher.destroy();
        this.publisher = null;
      }
    });

    this.session.on({
      streamCreated: (event) => {
        var subscriberOptions = {fitMode: "contain", insertMode: 'append'};
        //this.session.subscribe(event.stream, 'subscriber', subscriberOptions);     
        this.onStreamCreated(event.stream, this.session);
        //OT.updateViews();
      },
      streamDestroyed: (event) => {
        console.log(`Stream ${event.stream.name} ended because ${event.reason}`);
        //OT.updateViews();
      },
      sessionConnected: event => {
        this.session.publish(this.publisher);
       
        //OT.updateViews();
      },
      connectionCreated: (event) => {
        // if (event.connection.connectionId != this.session.connection.connectionId) {
        //  this.showMessage("Se ha conectado un usuario");
        //  this.infoStr = "";
        // } else {
        // }
      },
    });


    this.session.on("signal:duration", (event) => {
      if(event.data>60){
        var min = event.data/60;
        min = Math.floor(min);
        this.durationStr = "Unos "+Math.round(min) + " minutos";
      }else if(event.data>0){
        this.durationStr = "Menos de 1 minuto";
      }else{
        this.durationStr = "Tiempo agotado";
      }
      console.log("duration in seconds " + event.data);
      console.log(this.durationStr);
    });

    this.session.connect(this.token, (error: any) => {
      if (error) {
        alert(`There was an error connecting to the session ${error}`);
      }
    });
    
  }else{

    console.log('*** is web');
    this.publisher = OT.initPublisher
    (
      this.publisherDiv.nativeElement, {
      height: "100%",
      width: "100%",
      insertMode: 'append'
    });
    this.session = OT.initSession(this.apiKey, this.sessionId);
    
    this.session.connect(this.token, (err) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log("connected");
        this.session.publish(this.publisher, (err) => {
          if (err) {
            console.log(err)
          }
          else {
            this.publishing = true;
          }
        });
        let that = this;
        this.session.on("streamCreated", function (event) {
          that.onStreamCreated(event.stream, this.session);
        });
      }
    })
   
  }
}

async uploadFileFromBrowser(event: EventTarget) {
  const eventObj: MSInputMethodContext = event as MSInputMethodContext;
  const target: HTMLInputElement = eventObj.target as HTMLInputElement;
  const file: any = target.files[0];
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const result = await toBase64(file).catch(e => Error(e));
  var base64result = result as string;
  //console.log(" base64result.split(',')[1] ", base64result.split(',')[1]);
  this.files.push({ name: file.name, file: base64result.split(',')[1], type: file.type })

}
async selectImageSource() {
  const buttons = [
    {
      text: this.translate.instant('videocall.pictures'),
      icon: 'image',
      handler: () => {
        this.addImage();
      }
    },
    {
      text: this.translate.instant('videocall.choose-file'),
      icon: 'document',
      handler: () => {
        this.addFile();
      }
    }
  ];

  // Only allow file selection inside a browser
  if (Capacitor.getPlatform() == 'web') {
    buttons.push({
      text: 'Choose a File',
      icon: 'attach',
      handler: () => {
        this.fileInput.nativeElement.click();
      }
    });
  }

  const actionSheet = await this.actionSheetCtrl.create({
    buttons
  });
  await actionSheet.present();
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
  let source = CameraSource.Photos;
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
 
  this.dooleService.uploadFile(fileUri).then(data =>{
    console.log("[VideoComponent] uploadMessageImage", data);
   
  }, (err) =>{
   
    throw err;
  });
  
}
  
}

