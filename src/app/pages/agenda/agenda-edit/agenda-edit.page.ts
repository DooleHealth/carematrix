import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { DateService } from 'src/app/services/date.service';
@Component({
  selector: 'app-agenda-edit',
  templateUrl: './agenda-edit.page.html',
  styleUrls: ['./agenda-edit.page.scss'],
})
export class AgendaEditPage implements OnInit {
  NUM_YEAR = 10
  @Input()event: any;
  form: FormGroup;
  dateMax:any;
  isSubmittedPlace = false;
  isSubmittedTitle = false;
  isSubmittedDuration = false;
  isSubmittedStartDate = false;
  id:any
  isSaving: boolean = false;
  isNewEvent = true
  enableReminder = false;
  media = []
  @ViewChild('uploadFile') uploadFile: FileUploadComponent;
  constructor(
    private fb: FormBuilder,
    public dateService: DateService,
    private dooleService: DooleService,
    private translate : TranslateService,
    public datepipe: DatePipe,
    public alertController: AlertController,
    private modalCtrl: ModalController,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    console.log('event', this.event);
    this.dateMax = (new Date(Date.now()).getFullYear()) + this.NUM_YEAR
    this.form = this.fb.group({
      place: [],
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      user_comments: [],
      origin: [1],
      online: [0],
    });
    this.getAppointment()
  }

  getAppointment(){
    if(this.event){
      this.isNewEvent = false
      this.id = this.event.id;
      console.log('[AgendaEditPage] getAppointment()', this.event);
      if(this.event.site) this.form.get('place').setValue(this.event.site)
      if(this.event.title) this.form.get('title').setValue(this.event.title)
      if(this.event.user_comments) this.form.get('user_comments').setValue(this.event.user_comments)
      if(this.event.start_date_iso8601) this.form.get('date').setValue(this.event.start_date_iso8601)
      let duration = this.trasnforHourToMinutes(this.event.end_time) - this.trasnforHourToMinutes(this.event.start_time)
      if(this.event.end_time) this.form.get('duration').setValue( duration )
      if(this.event.online !== undefined && this.event.online !== null) this.form.get('online').setValue(this.event.online )
      if(this.event.files.length > 0) this.media = this.event.files
    }
  }

  trasnforHourToMinutes(time): any {
    let hour = time.split(':');
    return (Number(hour[0]))*60 + (Number(hour[1]))
  }

  isSubmittedFields(isSubmitted){
    this.isSubmittedPlace = isSubmitted
    this.isSubmittedTitle = isSubmitted;
    this.isSubmittedDuration= isSubmitted;
    this.isSubmittedStartDate= isSubmitted;
  }

  transformDate(date) {
    return this.datepipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
  }

  selectedCategory(){
    console.log('[AgendaEditPage] selectedCategory()', this.form.value );
  }

  async submit() {
    console.log('[AgendaEditPage] submit()', this.form.value );
    this.isSubmittedFields(true);
    if(this.form.invalid)
    return
    if(this.isNewEvent)
    this.addAgenda()
    else
    this.editAgenda()
  }

  async editAgenda(){
    this.isSaving = !this.isSaving;
    let date = this.form.get('date').value
    this.form.get('date').setValue(this.transformDate(date));
    var online = this.form.get('online').value
    this.form.get('online').setValue(online? 1:0);
    console.log(`[AgendaAddPage] editAgenda()`,this.form.value );
    this.dooleService.putAPIagenda(this.id,this.form.value).subscribe(
      async (res: any) =>{
        console.log('[AgendaEditPage] editAgenda()', await res);
        if(res.success){

          if(this.uploadFile.isEmptyFiles()){
            this.modalCtrl.dismiss({error:null, action: 'update', data: res.agenda});
            this.notification.displayToastSuccessful()
          }else{
            this.uploadFile.uploadFiles(res.agenda.id, 'Agenda').subscribe(res =>{
              if(res.success){
                this.modalCtrl.dismiss({error:null, action: 'update', data: res.agenda});
                this.notification.displayToastSuccessful()
              }
              else{
                let message = this.translate.instant('bookings.error_upload_files')
                  this.modalCtrl.dismiss({error:message});
              }
            })
          }

        }else{
          let message = this.translate.instant('reminder.error_message_added_reminder')
          alert(message)
        }
        this.isSaving = !this.isSaving
       },(err) => {
          console.log('[AgendaEditPage] editAgenda() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err;
      }) ,() => {
        // Called when operation is complete (both success and error)

      };
  }

  async addAgenda(){

    this.isSaving = !this.isSaving;
    let date = this.form.get('date').value
    this.form.get('date').setValue(this.transformDate(date));
    var online = this.form.get('online').value
    this.form.get('online').setValue(online? 1:0);
    console.log(`[AgendaAddPage] addAgenda()`,this.form.value );

    this.dooleService.postAPIaddAgenda(this.form.value).subscribe(
      async (res: any) =>{
        console.log('[AgendaEditPage] addAgenda()', await res);
        if(res.success){

          if(this.uploadFile.isEmptyFiles()){
            this.modalCtrl.dismiss({error:null, action: 'add', data: res.agenda});
            this.notification.displayToastSuccessful()
          }else{
            this.uploadFile.uploadFiles(res.agenda.id, 'Agenda').subscribe(res =>{
              if(res.success){
                this.modalCtrl.dismiss({error:null, action: 'add', data: res.agenda});
                this.notification.displayToastSuccessful()
              }
              else{
                let message = this.translate.instant('bookings.error_upload_files')
                  this.modalCtrl.dismiss({error:message});
              }
            })
          }

        }else{
          let message = this.translate.instant('appointment.error_message_added_reminder')
          alert(message)
        }
        this.isSaving = !this.isSaving
       },(err) => {
          console.log('[AgendaEditPage] addAgenda() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err;
      }) ,() => {

        // Called when operation is complete (both success and error)

      };
  }

  close() {
    this.modalCtrl.dismiss({error:null});
  }

}
