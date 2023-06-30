import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraSource, CameraResultType} from '@capacitor/camera';
import { Chooser } from '@ionic-native/chooser/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, AlertController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { DooleService } from 'src/app/services/doole.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @Input('media') media: any = [];
  @Input('disableNames') disableNames: boolean;
  constructor(private dooleService: DooleService, private platform: Platform, private iab: InAppBrowser, private alertCtrl : AlertController, private translate: TranslateService,private actionSheetCtrl: ActionSheetController,private notification: NotificationService, private chooser: Chooser, private sanitizer: DomSanitizer, private datepipe: DatePipe,) { }
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @Input('text') text: string;
  @Input('form') form: FormGroup;
  @Input('files') files:  Array<{ name: string, file: string, type: string }> = [];
  @Output() numFilesChange: EventEmitter<number> = new EventEmitter<number>();
  file64: SafeResourceUrl;
  enableButtonAddFile = false
  ngOnInit() {}

  async checkPermission(){
    return Camera.checkPermissions().then(result =>{
      console.log('[FileUploadComponent] checkPermission(): ', result.camera);
      let isPermissed = result.camera
      if(isPermissed == 'granted')
        this.getSource()
      else
        this.getPermission();
    }).catch(error =>{
      console.log(`[FileUploadComponent] checkPermission(): ${error}`);
    })
  }

  getPermission(){
    Camera.requestPermissions().then((response) => {
      console.log('Camera permission response: ', response.camera);
      if (response.camera == 'granted') {
        console.log('Granted permissions for camera');
        this.getSource()
        
      }
    });
  }

  // Used for browser direct file upload
  uploadFile(event: EventTarget) {
    const eventObj: any = event as any;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];
    //this.api.uploadImageFile(file).subscribe((newImage: ApiImage) => {
    //  this.images.push(newImage);
    //});
  }
  async selectSource() {
    this.checkPermission()
  }
  
  async getSource() {
    const buttons = [
      {
        text: this.translate.instant('documents_add.camera'),
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera);
        }
      },
      {
        text: this.translate.instant('documents_add.pictures'),
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        }
      },
      {
        text: this.translate.instant('documents_add.file'),
        icon: 'document',
        handler: () => {
          this.addFile();
        }
      }
    ];

    // Only allow file selection inside a browser

    if (!this.platform.is('hybrid')) {
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

  getName(m){
    if(m?.name && m?.name !== "")
      return m.name
    else if(m?.file_name)
      return m?.file_name.split('/').pop();
    else if(m?.file)
      return m?.file.split('/').pop();
    else
      return 'new image...'
   }

  async addFile() {
    this.chooser.getFile().then(async file => {
      if (file) {
        //console.log("[FileUploadComponent] addFile()", JSON.stringify(file));
        if(this.disableNames){
          this.files.push({ name: file.name, file: file.dataURI, type: file.mediaType })
          this.numFilesChange.emit(this.files.length)
        }
        else{
          this.presentPrompt(file.dataURI, file.name, file.mediaType)
        }
      }
    }).catch((error: any) => {
      console.error(error)
    });
  }

  async addImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source
    }).catch((e) => {
      console.log('cancelled');
    });

    if (image) {
      var filename= 'img_'+this.transformDate(Date.now(), 'd-M-y_hmmss')+ '.' + image.format;
      //console.log("[FileUploadComponent] addImage()", JSON.stringify(image));
      let img = `data:image/${image.format};base64,`+image.base64String
      if(this.disableNames){
        this.files.push({ name: filename, file: img, type: image.format })
        this.numFilesChange.emit(this.files.length)
      }
      else
      this.presentPrompt(img, filename, image.format)
    }
  }

  transformDate(date, format) {
    return this.datepipe.transform(date, format);
  } 

  async uploadFileFromBrowser(event: EventTarget) {
    const eventObj: any = event as any;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    if(file){
      const result = await toBase64(file).catch(e => Error(e));
      var base64result = result as string;
      console.log("[FileUploadComponent] uploadFileFromBrowser()", JSON.stringify(base64result));
      this.files.push({ name: file.name, file: base64result, type: file.type })
      this.numFilesChange.emit(this.files.length)
    }
  }

  fileError(error) {
    console.log(error);
  }

  removeFile(name: string) {
    console.log("removeFile: ", name);
    this.files.forEach((element, index) => {
      if (element.name == name){
        this.files.splice(index, 1);
        this.numFilesChange.emit(this.files.length)
      }
    });
  }

  openFileMedia(media){
    console.log("media", media);
    window.open(media.temporaryUrl, "");
  }

  openFile(file){
    //console.log("openFile", file);
    let type : string = file.type;
    if(type.includes('image') || type.includes('jpeg') || type.includes('jpg') || type.includes('png')){
      var image = new Image();
      image.src = "data:"+ file.type + ";base64," + file.file;
      if (!this.platform.is('mobileweb') && !this.platform.is('desktop')) {  
        var pageContent = '<html><head></head><body>'+ image.outerHTML +'</body></html>';
        var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);
        this.openWithInAppBrowser(pageContentUrl);
      }else{
        var w = window.open("");
        w.document.write(image.outerHTML);
      }
      
    }else if(type.includes('pdf')){
      if (!this.platform.is('mobileweb') && !this.platform.is('desktop')) {
        var pageContent = "<html><head></head><body><iframe width='100%' height='100%' src='data:application/pdf;base64, " + file.file + "'></iframe></body></html>";
        var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);
        this.openWithInAppBrowser(pageContentUrl);
        
      }else{
        let pdfWindow = window.open("")
        pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(file.file) + "'></iframe>")
      }
    }else
      this.presentAlert();
   
  }

  public openWithInAppBrowser(url : string){
    let options : InAppBrowserOptions = {
      location : 'yes',//Or 'no' 
      hideurlbar:'yes',
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      enableViewPortScale: 'yes',
      zoom : 'yes',//Android only ,shows browser zoom controls 
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'no', //Android only 
      closebuttoncaption : 'Close', //iOS only
      disallowoverscroll : 'no', //iOS only 
      toolbar : 'yes', //iOS only 
      enableViewportScale : 'no', //iOS only 
      allowInlineMediaPlayback : 'no',//iOS only 
      presentationstyle : 'pagesheet',//iOS only 
      fullscreen : 'yes',//Windows only    
    };
      let target = "_blank";
  
      this.iab.create(url,target, options);
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: this.translate.instant("videocall.file_type_not supported"),
      buttons: [{
        text: 'Ok',
      }]
    });

    await alert.present();
  }

  async presentPrompt(file, filename, type) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-alert-class',
      subHeader: this.translate.instant('documents_add.input_file_name'),
      inputs: [
        {
          name: 'filename',
          type: 'text',
          placeholder: this.translate.instant('documents_add.name'),
          attributes: {
            maxlength: 30
          }
        }
      ],
        buttons: [
          {
            text: this.translate.instant("button.cancel"),
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('[FileUploadComponent] AlertConfirm Cancel');
              this.files.push({ name: filename, file: file, type: type })
              this.numFilesChange.emit(this.files.length)
            }
          }, {
            text: this.translate.instant("button.accept"),
            handler: (data) => {
              console.log('[FileUploadComponent] AlertConfirm Okay', data.filename );
              if (data.filename && data.filename !== '') {
                 let name = data.filename +'.'+filename.split('.').pop()
                 this.files.push({ name: name, file: file, type: type })
                 this.numFilesChange.emit(this.files.length)
              } else {
                return false;
              }
            }
          }
        ]
    });

    await alert.present();
  }

  isEmptyFiles():boolean{
    if(this.files.length == 0){ 
      return true
    }
    else false
  }


   uploadFiles(id, model: string):Observable<any>{
    let n: any = [];
    let f: any = [];
    this.files.forEach(element => {
      f.push(element.file)
      n.push(element.name);
    });

    let params = {
      'model': model,
      'id':  id,
      'file': f,
      'name': n
    }

    console.log("[FileUploadComponent] postAPIAddMedia:", params);
    return this.dooleService.postAPIAddMedia(params)

  }

  getParamsToSend(id, model: string){
    let n: any = [];
    let f: any = [];
    this.files.forEach(element => {
      f.push(element.file)
      n.push(element.name);
    });

    return {
      'model': model,
      'id':  id,
      'file': f,
      'name': n
    }
 
  }


  deleteMediaFile(m){
    this.dooleService.deleteFile(m.id).subscribe(
      async (data) => {
        console.log("data:", data);
        if(data)
          this.notification.displayToastSuccessful()
        else{
          let message = this.translate.instant('documents_add.error_alert_message')
          alert(message)
        }
      },
      (error) => {
        alert( 'ERROR(' + error.code + '): ' + error.message)
        console.log("error: ", error);
        throw new HttpErrorResponse(error);
      },
      () => {
        // Called when operation is complete (both success and error)
      });
  }

  async presentAlertConfirm(mediaFile, index?, isNewFile?) {
    let message = this.translate.instant("documents_add.delete_media_file")
    const alert = await this.alertCtrl.create({
      cssClass: 'my-alert-class',
      //header: this.translate.instant("alert.header_confirmation"),
      message: message,
      buttons: [
        {
          text: this.translate.instant("alert.button_cancel"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('[FileUploadComponent] AlertConfirm Cancel');
          }
        }, {
          text: this.translate.instant("alert.button_ok"),
          handler: () => {
            console.log('[FileUploadComponent] AlertConfirm Okay');
              if(isNewFile){
                this.files.splice(index,1)
                this.numFilesChange.emit(this.files.length)
                return
              }
              this.deleteMediaFile(mediaFile);
              this.media.splice(index,1)
          }
        }
      ]
    });

    await alert.present();
  }
}
