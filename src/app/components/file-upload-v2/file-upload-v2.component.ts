import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraSource, CameraResultType} from '@capacitor/camera';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { ActionSheetController, AlertController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { DooleService } from 'src/app/services/doole.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-file-upload-v2',
  templateUrl: './file-upload-v2.component.html',
  styleUrls: ['./file-upload-v2.component.scss']
})
export class FileUploadV2Component {
  //@Input('media') media: any = [];
  //@Input('disableNames') disableNames: boolean;
  //@Input('text') text: string;
  @Input('enableCamara') enableCamara: boolean = true; //To enable or desenable camera option with true o false
  @Input('enablePhotos') enablePhotos: boolean = true; //To enable or desenable photos option with true o false
  @Input('enableFiles') enableFiles: boolean = true; //To enable or desenable files option with true o false
  @Input('icon') icon: string = "add-outline"; //To change icon button
  @Input('color') color: string = "primary"; //To change color icon button
  @Input('files') files:  Array<{ name: string, file: string, type: string }> = [];
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @Output() numFilesChange: EventEmitter<number> = new EventEmitter<number>();
  file64: SafeResourceUrl;
  enableButtonAddFile = false
  onlyOneAction: boolean = false; // If it has only one option not allowed open  selecter option so it should go to action.
  constructor(private dooleService: DooleService, private platform: Platform, private alertCtrl : AlertController, private translate: TranslateService,private actionSheetCtrl: ActionSheetController,private notification: NotificationService, private chooser: Chooser, private sanitizer: DomSanitizer, private datepipe: DatePipe,) { }

  ngOnInit() {
    this.onlyOneAction =  ((+!!this.enableCamara) + (+!!this.enableFiles) + (+!!this.enablePhotos)) === 1 ? true:false;

  }

  async checkPermission(){
    return Camera.checkPermissions().then(result =>{
      console.log('[FileUploadV2Component] checkPermission(): ', result.camera);
      let isPermissed = result.camera
      if(isPermissed == 'granted')
        this.getSource()
      else
        this.getPermission();
    }).catch(error =>{
      console.log(`[FileUploadV2Component] checkPermission(): ${error}`);
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
    if(this.onlyOneAction){
      this.getOnlyOneAction()
      return
    }

    const buttons = []

    if (this.enableCamara) {
      buttons.push({
        text: this.translate.instant('documents_add.camera'),
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera);
        }
      });
    }

    if (this.enablePhotos) {
      buttons.push({
        text: this.translate.instant('documents_add.pictures'),
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        }
      });
    }

    if (this.enableFiles) {
      buttons.push({
        text: this.translate.instant('documents_add.file'),
        icon: 'document',
        handler: () => {
          this.addFile();
        }
      });
    }


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

  async getOnlyOneAction() {
    if (this.enableCamara) {
      this.addImage(CameraSource.Camera);
    }

    else if (this.enablePhotos) {
      this.addImage(CameraSource.Photos);
    }

    if (this.enableFiles) {
      if (!this.platform.is('hybrid'))
        this.fileInput.nativeElement.click();
      else
        this.addFile();
    }
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
        console.log("[FileUploadV2Component] addFile()", JSON.stringify(file));
        this.files.push({ name: file.name, file: file.dataURI, type: file.mimeType })
        this.numFilesChange.emit(this.files.length)
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
      //console.log("[FileUploadV2Component] addImage()", JSON.stringify(image));
      let img = `data:image/${image.format};base64,`+image.base64String
      this.files.push({ name: filename, file: img, type: image.format })
      this.numFilesChange.emit(this.files.length)
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
      console.log("[FileUploadV2Component] uploadFileFromBrowser()", JSON.stringify(base64result));
      this.files.push({ name: file.name, file: base64result, type: file.type })
      this.numFilesChange.emit(this.files.length)
    }
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

    console.log("[FileUploadV2Component] postAPIAddMedia:", params);
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

}

