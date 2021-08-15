import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CameraSource, Capacitor, Plugins, CameraResultType, } from '@capacitor/core';
import { ActionSheetController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { MedicalCalendarPage } from '../medical-calendar/medical-calendar.page';
import { Chooser } from '@ionic-native/chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
const { Camera } = Plugins;
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  staff = history.state.staff;
  staffId = this.staff?.id
  selectedDate: string;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  files: Array<{ name: string, file: any, type: string }> = [];
  private imagesTemp : any = [];
  private images: any = [];
  numFile
  //isNewEvent = true;
  form: FormGroup;
  dateMax:any;
  duration:string = "30";
  isSubmittedPlace = false;
  isSubmittedTitle = false;
  isSubmittedDuration = false;
  isSubmittedStartDate = false;
  isLoading = false
  constructor(public dooleService:DooleService, private nav: NavController, private actionSheetCtrl: ActionSheetController,  private translate: TranslateService,  
    public datepipe: DatePipe,  private loadingController: LoadingController,  private fb: FormBuilder, private modalCtrl: ModalController, private chooser: Chooser,
    public file: File, private router: Router, private notification: NotificationService) { }
  ngOnInit() {
   
    this.form = this.fb.group({
      place: [''],
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      duration: [this.duration],
      indications: [],
      files:[this.images],
      online:[history.state.isOnline]
    });
  }

  transformDate(date) {
    return this.datepipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
  }

  trasnforHourToMinutes(time): any{
    let hour = time.split(':');
    return (Number(hour[0]))*60 + (Number(hour[1]))  }

  async addAgenda(){
    console.log(`[AgendaAddPage] addAgenda()` );
    this.isLoading = true
/*     this.form.patchValue({
        files: this.files
    }); */
    this.imagesTemp.forEach(item => {
      this.images.push(item.file);
    });
    //this.form.get('files').setValue(this.images);

    this.dooleService.postAPIaddAgenda(this.form.value).subscribe(
      async (res: any) =>{
        console.log('[ReminderAddPage] addAgenda()', await res);        
        this.nav.navigateForward('/agenda', { state: {date: this.form.get('date').value} });
        this.notification.displayToastSuccessful()
        this.isLoading = false
       },(err) => { 
        this.isLoading = false
          console.log('[ReminderAddPage] addAgenda() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        this.isLoading = false
      };     
  }
  isSubmittedFields(isSubmitted){
    this.isSubmittedPlace = isSubmitted
    this.isSubmittedTitle = isSubmitted;
    this.isSubmittedDuration= isSubmitted;
    this.isSubmittedStartDate= isSubmitted;
  }


  async submit() {
    console.log('[BookingsAddPage] submit()', this.form.value );
    this.isSubmittedFields(true);
    if(this.form.invalid)
      return 
   
    this.addAgenda()
    
  }

  async openCalendarModal() {
    const modal = await this.modalCtrl.create({
      component: MedicalCalendarPage,
      componentProps: { id: this.staffId },
    });

    modal.onDidDismiss()
      .then((result) => {

        if(result.data['date']){
          this.selectedDate = result.data['date']; 
          this.form.patchValue({date: this.transformDate(this.selectedDate)})
          console.log("openCalendarModal() selectedDate: ", this.selectedDate);
        }
    });

    await modal.present();
  }

  async selectImageSource() {

    let buttons = [];

    if(!Capacitor.isNative){
      buttons = [
        {
          text: this.translate.instant('documents_add.camera'),
          icon: 'camera',
          handler: () => {
            this.addImage(CameraSource.Camera);
          }
        },
        {
          text: this.translate.instant('documents_add.file'),
          icon: 'attach',
          handler: () => {
            this.fileInput.nativeElement.click();
          }
        }]
    }else{
      buttons = [
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
    }
  
    const actionSheet = await this.actionSheetCtrl.create({
      buttons
    });
    
    await actionSheet.present();
  }

/*   async addFile() {
    this.chooser.getFile().then(async file => {
   
      if(file){
        var filename=new Date().getTime(); 
        this.saveBase64(file.dataURI, filename.toString(), file.mediaType).then(res => {
          this.uploadFile(res);
        });
      }
    }).catch((error: any) => {
      console.error(error)});
  } */


/*   async addImage(source) {
   
    const photo = await Camera.getPhoto({
    quality: 60,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
    source
  });

  if(photo){
    var filename = new Date().getTime();
    let file = Capacitor.convertFileSrc(photo.dataUrl);
    this.saveBase64(file ,filename.toString(), photo.format).then(res => {
      this.uploadFile(res);
    });
  }else{
    console.log("no photo");
  }
  } */

  async addFile(){   
    this.chooser.getFile().then(async image => {
      //this.processing = true;
      console.log(image ? image.name : 'canceled');
      var fileUri = Capacitor.convertFileSrc(image.dataURI);
      console.log("addfile fileUri: ", fileUri);
      var filename = image.name
      this.files.push({ name: filename , file: image, type: image.mediaType })
      this.numFile = this.files.length
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

    if(image){
      console.log("image: ", image);
      var fileUri = Capacitor.convertFileSrc(image.dataUrl);
      console.log("addImage - savePicture fileUri: ", fileUri);

      this.savePicture(fileUri)
      this.files.push({ name: Date.now() + '.' + image.format, file: fileUri, type: image.format })
      this.numFile = this.files.length;

    }else{
      console.log("no image");
    }
  } 

  openFile(file) {
    throw new Error('Method not implemented.');
  }
  removeFile(name: string) {
    console.log("removeFile: ", name);
    this.files.forEach((element, index) => {
      if (element.name == name)
        this.files.splice(index, 1);
    });
  }

  async savePicture(fileUri){
    console.log("[ReportProblemPage] savePicture() fileUri: ",fileUri);
    var filename=new Date().getTime();
    return this.saveBase64(fileUri,filename.toString()).then(res => {
      console.log("savePicture() saveBase64 res: ",res);
      this.dooleService.uploadFile(res).then(data => {
        console.log("savePicture() uploadFile res: ",res);
        this.imagesTemp.push(data)
      }).catch(err => {
        console.log("Error uploadFile: ", err);
      }).finally(() => {

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

/*   public saveBase64(base64:string, name:string, mediaType:string):Promise<string>{
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
  } */
  
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

  uploadFile(fileUri: string){
 
    this.dooleService.uploadFile(fileUri).then(data =>{
      console.log("[VideoComponent] uploadMessageImage", data);
     
    }, (err) =>{
     
      throw err;
    });
    
  }

  async payment(){
    console.log(`[AgendaAddPage] payment()` );

    this.form.patchValue({
        files: this.files
    });

    this.router.navigate(['bookings/payment'],{state:{agenda:this.form.value, staff:this.staff}});
    
  }
}
