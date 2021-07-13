import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CameraSource, Capacitor } from '@capacitor/core';
import { ActionSheetController, LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { MedicalCalendarPage } from '../medical-calendar/medical-calendar.page';

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
  files: Array<{ name: string, file: string, type: string }> = [];
  isNewEvent = true;
  form: FormGroup;
  dateMax:any;
  duration:string = "30";
  isSubmittedPlace = false;
  isSubmittedTitle = false;
  isSubmittedDuration = false;
  isSubmittedStartDate = false;
  constructor(public dooleService:DooleService, private actionSheetCtrl: ActionSheetController,  private translate: TranslateService,  public datepipe: DatePipe,  private loadingController: LoadingController,  private fb: FormBuilder, private modalCtrl: ModalController) { }
  ngOnInit() {
   
    this.form = this.fb.group({
      place: [''],
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      duration: [this.duration],
      indications: [],
      files:[],
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
    const loading = await this.loadingController.create();
    await loading.present();

    console.log(`[AgendaAddPage] addAgenda()` );

    this.form.patchValue({
        files: this.files
    });
    this.dooleService.postAPIaddAgenda(this.form.value).subscribe(
      async (res: any) =>{
        console.log('[ReminderAddPage] addAgenda()', await res);
        let message = this.translate.instant('reminder.message_added_reminder')
        if(!this.isNewEvent)
        message = this.translate.instant('reminder.message_updated_reminder')
        this.showAlert(message)
        loading.dismiss();
       },(err) => { 
        loading.dismiss();
          console.log('[ReminderAddPage] addAgenda() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        loading.dismiss();
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

  showAlert(message){
    //let message = this.translate.instant('documents_add.alert_message')
    let header = this.translate.instant('alert.header_info')
    this.dooleService.showAlertAndReturn(header,message,false, '/contact')
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
          this.form.get('date').setValue(this.transformDate(this.selectedDate))
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
    

    // Only allow file selection inside a browser
    
    // if (Capacitor.getPlatform() == 'web') {
    
    //}
    const actionSheet = await this.actionSheetCtrl.create({
      buttons
    });
    
    await actionSheet.present();
  }
  addFile() {
    throw new Error('Method not implemented.');
  }
  addImage(Camera: CameraSource) {
    throw new Error('Method not implemented.');
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

  }
}
