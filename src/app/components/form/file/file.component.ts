import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { CameraSource,CameraResultType, Camera } from '@capacitor/camera';

import { ActionSheetController, AlertController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  @Input() data: any;
  @Input() desactive: boolean;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  label = ''
  value: any;
  error = false
  error_msg = ''
  placeholder = ''
  @Input('disableNames') disableNames: boolean;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  files

  constructor(
    private translate: TranslateService,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl : AlertController,
    private chooser: Chooser,
    private datepipe: DatePipe
    ) { }

    ngOnInit() {
      //this.data.required = true
      let translate = this.data?.translate[`label_${this.data.type}`]
      this.label = translate[this.data?.userLang]?.replace('<p', '<div')?.replace('</p', '</div')
      this.placeholder = this.translate.instant('form.file.button_add_file')
      if(this.data.placeholder && this.data.placeholder !== '')
      this.placeholder = this.data.placeholder
    }

  checkValue(){
    console.log("[FileComponent] checkValue()");
    if(!this.value?.file  && this.data.required){
      this.error_msg = this.translate.instant('form.error_required')
      this.error = true
    }
    else{
      this.error_msg = ''
      this.error = false
    }
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
      this.files = { name: file.name, file: base64result, type: file.type }
      this.value = { type: this.data.type, file: this.files.file}
      this.change.emit({[this.data.name]: this.value});
    }
    this.checkValue()
  }

  async selectSource() {
    const buttons = [
/*       {
        text: this.translate.instant('form.file.camera'),
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera);
        }
      }, */
      {
        text: this.translate.instant('form.file.pictures'),
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        }
      },
      {
        text: this.translate.instant('form.file.file'),
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
      if (file) {
        //console.log("[FileUploadComponent] addFile()", JSON.stringify(file));
        if(this.disableNames){
         // this.files.push({ name: file.name, file: file.dataURI, type: file.mediaType })
          this.files = { name: file.name, file: file.path, type: file.mimeType }
          this.value = { type: this.data.type, file: this.files.file}
          this.change.emit({[this.data.name]: this.value});

        }
        else{
          this.presentPrompt(file.path, file.name, file.mimeType)
        }
      }
      this.checkValue()
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
        this.files = { name: filename, file: img, type: image.format }
        //this.outputFiles.files = this.files
        this.value = { type: this.data.type, file: this.files.file}
        this.change.emit({[this.data.name]: this.value});
      }
      else
      this.presentPrompt(img, filename, image.format)
    }
    this.checkValue()
  }

  transformDate(date, format) {
    return this.datepipe.transform(date, format);
  }

  async presentPrompt(file, filename, type) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-alert-class',
      backdropDismiss: false,
      subHeader: this.translate.instant('form.file.input_file_name'),
      inputs: [
        {
          name: 'filename',
          type: 'text',
          placeholder: this.translate.instant('form.file.name'),
        }
      ],
        buttons: [
          {
            text: this.translate.instant("form.button.cancel"),
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('[FileUploadComponent] AlertConfirm Cancel');
              this.files = { name: filename, file: file, type: type }
              //this.outputFiles.files = this.files
              this.value = { type: this.data.type, file: this.files.file}
              this.change.emit({[this.data.name]: this.value});

              this.checkValue()
            }
          }, {
            text: this.translate.instant("form.button.accept"),
            handler: (data) => {
              console.log('[FileUploadComponent] AlertConfirm Okay', data.filename );
              if (data.filename && data.filename !== '') {
                 let name = data.filename +'.'+filename.split('.').pop()
                 this.files = { name: name, file: file, type: type }
                  //this.outputFiles.files = this.files
                  this.value = { type: this.data.type, file: this.files.file}
                  this.change.emit({[this.data.name]: this.value});
                  this.checkValue()
              }else {
                this.checkValue()
                return false;
              }
            }
          }
        ]
    });

    await alert.present();
  }

  async presentAlertConfirm(mediaFile) {
    let message = this.translate.instant("form.file.delete_media_file")
    const alert = await this.alertCtrl.create({
      cssClass: 'my-alert-class',
      //header: this.translate.instant("alert.header_confirmation"),
      message: message,
      buttons: [
        {
          text: this.translate.instant("form.button.cancel"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            ///console.log('[FileUploadComponent] AlertConfirm Cancel');
          }
        }, {
          text: this.translate.instant("form.button.accept"),
          handler: () => {
            //console.log('[FileUploadComponent] AlertConfirm Okay');
            this.files = null
            this.value = null
            this.checkValue()
            return
          }
        }
      ]
    });

    await alert.present();
  }

}