import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plugins, CameraResultType, CameraSource, Capacitor } from '@capacitor/core';
import { Chooser } from '@ionic-native/chooser/ngx';
import { ActionSheetController, LoadingController, ModalController, NavController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { TestTypePage } from './test-type/test-type.page';
import { File } from '@ionic-native/file/ngx';
import { DatePipe } from '@angular/common';
const { Camera, Filesystem } = Plugins;

@Component({
  selector: 'app-documents-add',
  templateUrl: './documents-add.page.html',
  styleUrls: ['./documents-add.page.scss'],
})
export class DocumentsAddPage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  AVAILABLE_FILE_NUMBERS = 10
  form: FormGroup;
  typeTest
  private images: any = [];
  mediaTemp: any = [];
  mediaFiles: any = [];
  //public processing:boolean=false; 
  currentDate
  numFile
  isSubmittedType = false;
  isSubmittedTitle = false;
  isSubmittedDate = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private loadingController: LoadingController,
    private dooleService: DooleService,
    private modalController: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private translate : TranslateService,
    private chooser: Chooser,
    public file: File, 
    public platform: Platform,
    public datepipe: DatePipe,
    public navController: NavController,
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
/*       source:[''],
      center:[''],
      profesional:[''], */
    });
  }
  

  isSubmittedFields(isSubmitted){
    this.isSubmittedType = isSubmitted
    this.isSubmittedTitle = isSubmitted;
    this.isSubmittedDate= isSubmitted;
  }

  // Save new diagnostic test
  async submit() {
    this.isSubmittedFields(true);
    if(this.form.invalid)
    return 

    console.log("submit");
    const loading = await this.loadingController.create();
    await loading.present();

    let date = this.form.get('date').value;
    var current = new Date(date.split('T')[0]).toISOString();
    let data_prestacio = this.datepipe.transform(current, 'dd/MM/y');
    this.form.get('date').setValue(data_prestacio);

    let private_test = this.form.get('private').value ? 1 : 0;
    this.form.get('private').setValue(private_test);

    let typeId = this.typeTest.id
    this.form.get('type').setValue(typeId);
    console.log("submit mediaFiles:", this.mediaFiles);
    this.mediaTemp.forEach(item => {
      this.images.push(item.file);
    });
      console.log("submit", this.form.value);
      this.dooleService.postAPIdiagnosticTest(this.form.value).subscribe(
      async (data) => {
        console.log("data:", data);
        this.showAlert()
        loading.dismiss();
      },
      (error) => {
        // Called when error
        loading.dismiss();
        console.log("error: ", error);
        throw new HttpErrorResponse(error);
      },
      () => {
        // Called when operation is complete (both success and error)
        loading.dismiss();
      });
  }

  showAlert(){
    let messagge = this.translate.instant('add_health_card.alert_message_add_card')
    let header = this.translate.instant('alert.header_info')
    this.dooleService.showAlertAndReturn(header,messagge,false, '/app/tracking')
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
      header: this.translate.instant('Seleccionar'),
      buttons: [
        {
          text: this.translate.instant('Cámara'),
          handler: () => {
            this.addImage(CameraSource.Camera);
          }
        },
        {
          text: this.translate.instant('Archivos'),
          handler: () => {
            this.addFile();
          }
        },{
          text: this.translate.instant('Cancelar'),
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

  removeFile(name: string) {
    console.log("[ReportProblemPage] removeFile: ", name);
    this.mediaFiles.forEach((element, index) => {
      if (element.name == name)
        this.mediaFiles.splice(index, 1);
    });
    this.numFile = this.mediaFiles.length;
  }

  enableButtonAddFile(){
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
      this.mediaFiles.push({ name: filename , file: image, type: image.mediaType })
      this.numFile = this.mediaFiles.length
      this.savePicture(fileUri)
      
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
      console.log("image: ", image);
      var fileUri = Capacitor.convertFileSrc(image.dataUrl);
      var filename= Date.now()+ '.' + image.format;
      this.mediaFiles.push({ name: filename , file: image, type: image.format })
      this.numFile = this.mediaFiles.length
      this.savePicture(fileUri)
    }else{
      console.log("no image");
    }
  }

  async savePicture(fileUri){
    //const loading = await this.loadingController.create();
    //await loading.present();
    var filename=new Date().getTime();
    return this.saveBase64(fileUri,filename.toString()).then(res => {
      console.log("saveBase64 res: ",res);
      this.dooleService.uploadFile(res).then(data => {
        console.log("uploadFile res: ",res);
        //this.mediaFiles.push(data);
        this.mediaTemp.push(data);
        console.log(" this.mediafiles.: ", this.mediaFiles);
        //loading.dismiss();
      }).catch(err => {
        console.log("Error uploadFile: ", err);
        //loading.dismiss();
      }).finally(() => {
        //this.processing = false;
        //loading.dismiss();
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
    console.log("this is bob: ", blob);
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
    this.mediaFiles.push({ name: file.name, file: base64result, type: file.type })
        this.numFile = this.mediaFiles.length;
    await this.saveFileWeb(base64result)
  }

  openFile(media){
    console.log("media", media);
    window.open(media.temporaryUrl, "");
  }


  async saveFileWeb(data){

    this.dooleService.uploadFile(data).then( res =>{
      //this.mediaFiles.push(res);
      this.mediaTemp.push(res);
    }).catch(err => {
      console.log("Error uploadFile: ", err);
    }).finally(() => {

    })
  }

}
