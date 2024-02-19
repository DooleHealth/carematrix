import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { MedicalCalendarPage } from '../contact/medical-calendar/medical-calendar.page';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { MedicalDirectoryPage } from '../contact/medical-directory/medical-directory.page';

@Component({
  selector: 'app-request-visit',
  templateUrl: './request-visit.page.html',
  styleUrls: ['./request-visit.page.scss'],
})
export class RequestVisitPage implements OnInit {

  staff:any = undefined;

  selectedDate: string;
  files: Array<{ name: string, file: any, type: string }> = [];
  @ViewChild('uploadFile') uploadFile: FileUploadComponent;
  form: FormGroup;
  dateMax:any;
  slot_id: any;
  duration:string = "5";

  isSubmittedTitle = false;
  isSubmittedDuration = false;
  isSubmittedStartDate = false;
  isSubmittedOnline = false;
  isSubmittedProfessional = false;

  isLoading = false


  selectedType:string= 'bookings.types.online';

  types = [
    {index: 0 , label: 'bookings.types.online', value: true},
    {index: 1, label: 'bookings.types.presential', value: false}
  ] 

  reasons = [
    { label: 'bookings.reasons.1'},
    { label: 'bookings.reasons.2'},
    { label: 'bookings.reasons.3'},
    { label: 'bookings.reasons.4'}
  ];

  zone = {
    kind: 'bookings.types.online'
  }

  constructor(public dooleService:DooleService, private nav: NavController, private actionSheetCtrl: ActionSheetController,  private translate: TranslateService,  
    public datepipe: DatePipe,  private loadingController: LoadingController,  private fb: FormBuilder, private modalCtrl: ModalController,
    public file: File, private router: Router, private notification: NotificationService,  private analyticsService: AnalyticsService) { 
    }


  ngOnInit() {
    let defaultReason = this.translate.instant(this.reasons[0].label);
    this.form = this.fb.group({
      place: [''],
      title: [''],
      user_comments: [defaultReason],
      date: ['', [Validators.required]],
      duration: [this.duration],
      indications: [],
      staff_id:['', [Validators.required]],
      online:['', [Validators.required]],
      user_availability_slot_id: []
    });    
  }


  onTypeSelect(event: any) {
    console.log(event.detail)
    this.selectedType = event.detail.value;
    this.form.get('online').setValue(event.detail.value === 'Online' ? true: false);
    this.isSubmittedOnline = true;
  }

  onReasonSelect(event: any) {
    console.log(event)
    this.form.get('user_comments').setValue(event.detail.value);
    console.log(this.form.value)
  }

  
  setTitle(){
    let messagge = this.form.get("online") ? this.translate.instant('appointment.video') : this.translate.instant('appointment.presential')
    this.form.get('title').setValue(messagge)
  }

  transformDate(date, format) {
    return this.datepipe.transform(date, format);
  }

  trasnforHourToMinutes(time): any{
    let hour = time.split(':');
    return (Number(hour[0]))*60 + (Number(hour[1]))  }

  async addAgenda(){
    console.log(`[BookingsPage] addAgenda()`, this.form.value );
    this.isLoading = true

    let params = this.form.value
    params.date = this.transformDate(this.selectedDate,  'yyyy-MM-dd HH:mm:ss')

    this.dooleService.postAPIaddAgenda(params).subscribe(
      async (res: any) =>{
        console.log('[BookingsPage] addAgenda()', await res);  
        if(res.success){
          if(!this.uploadFile.isEmptyFiles()){
            this.uploadFile.uploadFiles(res.agenda.id, 'Agenda').subscribe(res =>{
              if(res.success){
                this.nav.navigateForward('/agenda', { state: {date: params.date} });
                this.notification.displayToastSuccessful()
              }
              else{
                  let message = this.translate.instant('bookings.error_upload_files')
                  alert(message)
              }
            })
          } else{
            this.nav.navigateForward('/agenda', { state: {date: params.date} });
            this.notification.displayToastSuccessful()
          }
        }
        this.isLoading = false
       },(err) => { 
        this.isLoading = false
          console.log('[BookingsPage] addAgenda() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      }) ,() => {
        this.isLoading = false
      };     
  }
  isSubmittedFields(isSubmitted){
    this.isSubmittedTitle = isSubmitted;
    this.isSubmittedDuration= isSubmitted;
    this.isSubmittedStartDate= isSubmitted;
    this.isSubmittedProfessional = isSubmitted;
    this.isSubmittedOnline = isSubmitted;
  }


  async submit() {
    this.isSubmittedFields(true);

    if(this.form.invalid) {
      return 
    }

    this.setTitle()
    this.addAgenda()
  }

  async openCalendarModal() {

    console.log(this.staff?.id);
    const modal = await this.modalCtrl.create({
      component: MedicalCalendarPage,
      componentProps: { id: this.staff?.id },
    });

    modal.onDidDismiss()
      .then((result) => {
        if(result.data['duration']){
          this.duration = result.data['duration']
          this.form.get('duration').setValue(this.duration)
          console.log("openCalendarModal() selectedDate: ", result.data);
        }
        if(result.data['date']){
          this.selectedDate = result.data['date']; 
          this.form.patchValue({date: this.transformDate(this.selectedDate, 'dd/MM/yyyy HH:mm')})
          console.log("openCalendarModal() selectedDate: ", this.selectedDate);
        }
        if(result.data['slot_id']){
          this.slot_id = result.data['slot_id']
          this.form.get('user_availability_slot_id').setValue(this.slot_id)
          console.log("openCalendarModal() selectedDate: ", result.data);
        }
    });

    await modal.present();
  }
  

  async payment(){
    console.log(`[AgendaAddPage] payment()` );
    this.isSubmittedFields(true);
    if(this.form.invalid)
      return 
  
    this.files = this.uploadFile.files
    this.router.navigate(['bookings/payment'],{state:{agenda:this.form.value, staff:this.staff, files: this.files}});
  }

  async openProfesionalModal() {
    const modal = await this.modalCtrl.create({
      component: MedicalDirectoryPage,
      componentProps: {},
      cssClass: "modal-custom-class"
    });

    modal.onDidDismiss()
      .then((result) => {
        this.staff = result.data?.staff;

        if (this.staff !== undefined) {
          this.form.get('staff_id').setValue(this.staff?.id)
          this.isSubmittedProfessional = true;
        }
        else {
          this.form.get('date').setValue('');
          this.isSubmittedProfessional = false;
        }
    });

    await modal.present();
  }
}
