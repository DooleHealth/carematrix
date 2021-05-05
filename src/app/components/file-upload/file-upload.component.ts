import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CameraSource,CameraResultType, Plugins } from '@capacitor/core';
import { Chooser } from '@ionic-native/chooser/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, AlertController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
const { Camera } = Plugins;
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {

  constructor(private platform: Platform, private iab: InAppBrowser, private alertCtrl : AlertController, private translate: TranslateService,private actionSheetCtrl: ActionSheetController, private chooser: Chooser, private sanitizer: DomSanitizer, ) { }
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @Input('text') text: string;
  @Input('form') form: FormGroup;
  @Input('files') files:  Array<{ name: string, file: string, type: string }> = [];
  file64: SafeResourceUrl;
 
  ngOnInit() {}

  // Used for browser direct file upload
  uploadFile(event: EventTarget) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];
    //this.api.uploadImageFile(file).subscribe((newImage: ApiImage) => {
    //  this.images.push(newImage);
    //});
  }
  async selectSource() {
    const buttons = [
      {
        text: this.translate.instant('Cámara'),
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera);
        }
      },
      {
        text: this.translate.instant('videocall.pictures'),
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
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

  async addFile() {

    this.chooser.getFile().then(async file => {
      //console.log(file ? file : 'canceled');
      if (file) {

        //console.log("file", file);
        //console.log(" base64result.split(',')[1] ", file.dataURI.split(',')[1]);

        this.files.push({ name: file.name, file: file.dataURI.split(',')[1], type: file.mediaType })
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
      this.file64 = this.sanitizer.bypassSecurityTrustResourceUrl('data:' + `image/${image.format}` + ';base64,' + image.base64String)
      this.files.push({ name: Date.now() + '.' + image.format, file: image.base64String, type: image.format })
      // this.form.patchValue({
      //   auto: 'data:' + `image/${image.format}` + ';base64,' + image.base64String
      // });
    }
  }

  async uploadFileFromBrowser(event: EventTarget) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];
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

    // this.form.patchValue({
    //   auto: result
    // });

  }

  fileError(error) {
    console.log(error);
  }

  removeFile(name: string) {
    console.log("removeFile: ", name);
    this.files.forEach((element, index) => {
      if (element.name == name)
        this.files.splice(index, 1);
    });
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
}
