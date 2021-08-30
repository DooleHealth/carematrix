import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plugins, CameraResultType, CameraSource, Capacitor } from '@capacitor/core';
import { Chooser } from '@ionic-native/chooser/ngx';
import { ActionSheetController, AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { TestTypePage } from './test-type/test-type.page';
import { File } from '@ionic-native/file/ngx';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';
const { Camera, Filesystem } = Plugins;

@Component({
  selector: 'app-documents-add',
  templateUrl: './documents-add.page.html',
  styleUrls: ['./documents-add.page.scss'],
})
export class DocumentsAddPage implements OnInit {
  @Input() test: any;
  isEdit = false;
  diagnosticTest;
  //mediaFile: any = [];
  media: any = [];
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  AVAILABLE_FILE_NUMBERS = 10
  form: FormGroup;
  typeTest
  private images: any = [];
  names = [];
  mediaTemp: any = [];
  mediaFiles: any = [];
  public processing:boolean=false; 
  currentDate
  numFile
  isSubmittedType = false;
  isSubmittedTitle = false;
  isSubmittedDate = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private dooleService: DooleService,
    private modalController: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private translate : TranslateService,
    private chooser: Chooser,
    public file: File, 
    public platform: Platform,
    public datepipe: DatePipe,
    public navController: NavController,
    private notification: NotificationService,
    private modalCtrl: ModalController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    console.log("[DocumentsAddPage] ngOnInit()");
    this.currentDate = new Date().toISOString()
    this.form = this.fb.group({
      private: [+false, [Validators.required]],
      type: ['', [Validators.required]],
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      description: [''],
      images: [this.images],
      image_name: [this.names]

    });

    this.showDiagnosticTest()
  }

  showDiagnosticTest(){
    if(this.test?.success){
      this.isEdit = true
      this.diagnosticTest = this.test.diagnosticTest;
      this.form.get('private').setValue(this.diagnosticTest.private)
      this.typeTest = this.test.diagnosticTest.diagnostic_test_type;
      this.form.get('type').setValue(this.typeTest.name)
      this.form.get('title').setValue(this.diagnosticTest.title)
      this.form.get('date').setValue(this.diagnosticTest.data)
      this.form.get('description').setValue(this.diagnosticTest.description)
      this.media = this.test.diagnosticTest.media
    }
  }
  

  isSubmittedFields(isSubmitted){
    this.isSubmittedType = isSubmitted
    this.isSubmittedTitle = isSubmitted;
    this.isSubmittedDate= isSubmitted;
  }
  transformDate(date, format) {
    return this.datepipe.transform(date, format);
  }

  // Save new diagnostic test
  async submit() {
    this.isSubmittedFields(true);
    if(this.form.invalid)
    return 
    console.log("submit");
    let date = this.form.get('date').value;
    var current = new Date(date)
    let data_prestacio = this.transformDate(current, 'dd/MM/yyyy')
    this.form.get('date').setValue(data_prestacio);

    let private_test = this.form.get('private').value ? 1 : 0;
    this.form.get('private').setValue(private_test);

    let typeId = this.typeTest.id
    this.form.get('type').setValue(typeId);

    this.mediaTemp.forEach(item => {
      this.images.push(item.file);
      this.names.push(item.name);
    });
      console.log("submit", this.form.value);
    if(this.isEdit)
      this.updateDiagnosticTest()
    else
      this.createDiagnosticTest()
  }

  createDiagnosticTest(){
    this.dooleService.postAPIdiagnosticTest(this.form.value).subscribe(
      async (data) => {
        console.log("data:", data);
        if(data)
        this.modalCtrl.dismiss({error:null, action: 'add'});
        else{
          let message = this.translate.instant('documents_add.error_alert_message')
          this.modalCtrl.dismiss({error:message});
        }
      },
      (error) => {
        // Called when error
        //alert( 'ERROR(' + error.code + '): ' + error.message)
        this.modalCtrl.dismiss({error: 'ERROR(' + error.code + '): ' + error.message});
        console.log("error: ", error);
        throw new HttpErrorResponse(error);
      },
      () => {
        // Called when operation is complete (both success and error)
      });
  }

  updateDiagnosticTest(){
    this.dooleService.putAPIdiagnosticTest(this.diagnosticTest.id, this.form.value).subscribe(
      async (data) => {
        console.log("data:", data);
        if(data)
        this.modalCtrl.dismiss({error:null, action: 'update'});
        else{
          let message = this.translate.instant('documents_add.error_alert_message')
          this.modalCtrl.dismiss({error:message});
        }
      },
      (error) => {
        // Called when error
        //alert( 'ERROR(' + error.code + '): ' + error.message)
        this.modalCtrl.dismiss({error: 'ERROR(' + error.code + '): ' + error.message});
        console.log("error: ", error);
        throw new HttpErrorResponse(error);
      },
      () => {
        // Called when operation is complete (both success and error)
        this.modalCtrl.dismiss({error:null});
      });
  }

  deleteDiagnosticTest(){
    this.dooleService.deleteAPIdiagnosticTest(this.diagnosticTest.id).subscribe(
      async (data) => {
        console.log("data:", data);
        if(data)
        this.modalCtrl.dismiss({error:null, action: 'delete'});
        else{
          let message = this.translate.instant('documents_add.error_alert_message')
          this.modalCtrl.dismiss({error:message});
        }
        this.router.navigateByUrl('/tracking')
      },
      (error) => {
        // Called when error
        //alert( 'ERROR(' + error.code + '): ' + error.message)
        this.modalCtrl.dismiss({error: 'ERROR(' + error.code + '): ' + error.message});
        console.log("error: ", error);
        throw new HttpErrorResponse(error);
      },
      () => {
        // Called when operation is complete (both success and error)
        this.modalCtrl.dismiss({error:null});
      });
  }

  close() {
    this.modalCtrl.dismiss({error:null});
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: TestTypePage,
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null && dataReturned.data !== undefined) {
        this.typeTest = dataReturned.data;
        this.form.get('type').setValue(this.typeTest.name)
      }
    });

    return await modal.present();
  }

  async selectImageSource() {

    const buttons = {
      header: this.translate.instant('documents_add.select'),
      buttons: [
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
          icon: 'attach',
          handler: () => {
            this.addFile();
          }
        },{
          text: this.translate.instant('button.cancel'),
          role: 'cancel',
          handler: () => {
          }
        }
      ]     
      
    }
        // Only allow file selection inside a browser

        if (!this.platform.is('hybrid')) {
          buttons.buttons.push({
            text: 'Choose a File',
            icon: 'attach',
            handler: () => {
              this.fileInput.nativeElement.click();
            }
          });
        }
    const actionSheet = await this.actionSheetCtrl.create(
      buttons
    );
    await actionSheet.present();    
    
  }

  enableButtonAddFile(){
    if(this.processing)
      return true
    if(this.mediaFiles.length >= this.AVAILABLE_FILE_NUMBERS || this.form.invalid){
        return true;
    }
    return false
  }


  async addFile(){   
    this.chooser.getFile().then(async image => {
      //this.processing = true;
      console.log(image ? image.name : 'canceled');
      var fileUri = Capacitor.convertFileSrc(image.dataURI);
      console.log("addfile fileUri: ", fileUri);
      var filename = image.name
      // this.mediaFiles.push({ name: filename , file: image, type: image.mediaType, isNew: true})
      // this.numFile = this.mediaFiles.length
      //this.savePicture(fileUri, filename)
      this.presentPrompt(fileUri, filename)
    }).catch((error: any) => {
      console.log(error)});
  }

  async addImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source
    }).catch((error:any)=>{
      console.log(error);
    });

    if (image) {
      //this.processing = true;
      console.log("image: ", JSON.stringify(image));
      var fileUri = Capacitor.convertFileSrc(image.dataUrl);
      var filename= 'img_'+this.transformDate(Date.now(), 'd-M-y_hmmss')+ '.' + image.format;
      // this.mediaFiles.push({ name: filename , file: image, type: image.format, isNew: true })
      // this.numFile = this.mediaFiles.length
      //this.savePicture(fileUri, filename)
      this.presentPrompt(fileUri, filename)
    }else{
      console.log("no image");
    }
  }

  async savePicture(fileUri, filename){
    this.processing = true
    return this.saveBase64(fileUri,filename.toString()).then(res => {
      console.log("saveBase64 res: ",res);
      this.dooleService.uploadFile(res).then((data: any) => {
        data['name'] = filename
        this.mediaFiles.push(data);
        this.mediaTemp.push(data);
        this.processing = false
       // console.log(" this.mediafiles: ", this.mediaFiles);
      }).catch(err => {
        console.log("Error uploadFile: ", err);
        this.processing = false
      }).finally(() => {
        this.processing = false;
      })
     
    });

  }

  public saveBase64(base64:string, name:string):Promise<string>{
    return new Promise((resolve, reject)=>{
      var realData = base64.split(",")[1]
      let blob=this.b64toBlob(realData, 'image/jpeg');

      this.file.writeFile(this.file.cacheDirectory, name, blob)
      .then(()=>{
        resolve(this.file.cacheDirectory+name);
      })
      .catch((err)=>{
        console.log(err);
        console.log('error writing blob');
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
    console.log("this is bob: ", JSON.stringify(blob) );
    return blob;
  }

  public compareFn(e1: number, e2: number): boolean {
    console.log('Test for', e1 == e2 );
    return e1 && e2 ? e1 == e2 : false;
  }

  async uploadFileFromBrowser(event: EventTarget) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file = target.files[0];
    
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    const result = await toBase64(file).catch(e => Error(e));
    
    var base64result = result as string;
    //console.log(" base64result.split(',')[1] ", base64result.split(',')[1]);
    // this.mediaFiles.push({ name: file.name, file: base64result, type: file.type })
    //     this.numFile = this.mediaFiles.length;
    await this.saveFileWeb(base64result)
  }

  openFile(media){
    console.log("media", media);
    window.open(media.temporaryUrl, "");
  }


  async saveFileWeb(data){
    this.dooleService.uploadFile(data).then( res =>{
      this.mediaFiles.push(res);
      this.mediaTemp.push(res);
      console.log("[DocumentsAddPage] saveFileWeb()",  this.mediaFiles);
    }).catch(err => {
      console.log("Error uploadFile: ", err);
    }).finally(() => {

    })
  }

  changePlaceholder(){
    let placeholder = this.translate.instant('placeholder_select')
    if(this.isSubmittedType && this.form.get('type').invalid)
    placeholder = ''
    return placeholder
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


  async presentAlertConfirm(mediaFile, isDeleteMediaFile, index, isNewFile) {
    let message = this.translate.instant(isDeleteMediaFile? "documents_add.delete_media_file": "documents_add.delete_document")
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      //header: this.translate.instant("alert.header_confirmation"),
      message: message,
      buttons: [
        {
          text: this.translate.instant("alert.button_cancel"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('[DocumentsAddPage] AlertConfirm Cancel');
          }
        }, {
          text: this.translate.instant("alert.button_ok"),
          handler: () => {
            console.log('[DocumentsAddPage] AlertConfirm Okay');
            if(isDeleteMediaFile){
              if(isNewFile){
                this.mediaFiles.splice(index,1)
                this.mediaTemp.splice(index,1)
                return
              }
              this.deleteMediaFile(mediaFile);
              this.media.splice(index,1)
            }
            else
            this.deleteDiagnosticTest()
          }
        }
      ]
    });

    await alert.present();
  }

   getName(m){
    console.log('[DocumentsAddPage] AlertConfirm Okay', JSON.stringify(m));
    if(m?.name && m?.name !== "")
      return m.name
    else if(m?.file_name)
      return m?.file_name.split('/').pop();
    else if(m?.file)
      return m?.file.split('/').pop();
    else
      return 'new image...'
   }


   getThumbnail(m){
    console.log('[DocumentsAddPage] AlertConfirm Okay', JSON.stringify(m));
    if(m.file)
     return m.file.split('.').pop() == 'pdf'? 'assets/icons/pdf-thumbnail.svg' : m.temporaryUrl;
     else if(m.file_name)
     return m.file_name.split('.').pop() == 'pdf'? 'assets/icons/pdf-thumbnail.svg' : m.temporaryUrl;
     else  
     return m.temporaryUrl;
   }

  async presentPrompt(fileUri, filename) {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      subHeader: this.translate.instant('documents_add.input_file_name'),
      inputs: [
        {
          name: 'filename',
          type: 'text',
          placeholder: this.translate.instant('documents_add.name'),
        }
      ],
        buttons: [
          {
            text: this.translate.instant("button.cancel"),
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('[LandingPage] AlertConfirm Cancel');
              this.savePicture(fileUri,filename)
            }
          }, {
            text: this.translate.instant("button.accept"),
            handler: (data) => {
              console.log('[LandingPage] AlertConfirm Okay', data.filename );
              if (data.filename && data.filename !== '') {
                 let name = data.filename +'.'+filename.split('.').pop()
                 this.savePicture(fileUri,  name)
              } else {
                return false;
              }
            }
          }
        ]
    });

    await alert.present();
  }
}
