import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-agenda-edit',
  templateUrl: './agenda-edit.page.html',
  styleUrls: ['./agenda-edit.page.scss'],
})
export class AgendaEditPage implements OnInit {
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
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private dooleService: DooleService,
    private translate : TranslateService,
    public datepipe: DatePipe,
    public alertController: AlertController,
    private modalCtrl: ModalController,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    console.log('event', this.event);
    let year = (new Date(Date.now()).getFullYear()) + 1
    this.dateMax =  year
    this.form = this.fb.group({
      place: [],
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      indications: [],
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
      if(this.event.description) this.form.get('indications').setValue(this.event.description)
      if(this.event.start_date_iso8601) this.form.get('date').setValue(this.event.start_date_iso8601)
      let duration = this.trasnforHourToMinutes(this.event.end_time) - this.trasnforHourToMinutes(this.event.start_time)
      if(this.event.end_time) this.form.get('duration').setValue( duration )
      if(this.event.online !== undefined && this.event.online !== null) this.form.get('online').setValue(this.event.online )
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
    this.dooleService.deleteAPIaddAgenda(this.id).subscribe(
      async (res: any) =>{
        console.log('[AgendaEditPage] deleteReminder()', await res);
        await this.addAgenda();
        // this.modalCtrl.dismiss({error:null});
        this.isSaving = !this.isSaving
       },(err) => { 
          console.log('[AgendaEditPage] deleteReminder() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
       
      };
  }

  async addAgenda1(){
 
    let date = this.form.get('date').value 
    this.form.get('date').setValue(this.transformDate(date));
    console.log(`[AgendaAddPage] addAgenda()`,this.form.value );

    this.dooleService.postAPIaddAgenda(this.form.value).subscribe(
      async (res: any) =>{
        console.log('[AgendaEditPage] addAgenda()', await res);
        if(res.success){
          let message = this.translate.instant('reminder.message_added_reminder')
          this.showAlert(message)
        }else{
          let message = this.translate.instant('reminder.error_message_added_reminder')
          alert(message)
        }
       
       },(err) => { 
        
          console.log('[AgendaEditPage] addAgenda() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        
      };
  }

/**Eliminar esta función cuando ya esté la nueva api que me permita actualizar agenda */
  async addAgenda(){
   
    this.isSaving = !this.isSaving;
    let date = this.form.get('date').value 
    this.form.get('date').setValue(this.transformDate(date));
    console.log(`[AgendaAddPage] addAgenda()`,this.form.value );
    
    this.dooleService.postAPIaddAgenda(this.form.value).subscribe(
      async (res: any) =>{
        console.log('[AgendaEditPage] addAgenda()', await res);
        if(res.success){
          let message = this.isNewEvent ? this.translate.instant('appointment.message_added_appointment') : this.translate.instant('appointment.message_updated_appointment')
          this.notification.showSuccess(message);

          this.modalCtrl.dismiss({error:null, action:'add'});
          this.isSaving = !this.isSaving
        }else{
          let message = this.translate.instant('appointment.error_message_added_reminder')
          alert(message)
        }
       },(err) => { 
          console.log('[AgendaEditPage] addAgenda() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err; 
      }) ,() => {
       
        // Called when operation is complete (both success and error)
        
      };
  }

  showAlert(message){
    let header = this.translate.instant('alert.header_info')
    this.dooleService.showAlertAndReturn(header,message,false, '/agenda')
  }

  close() {
    this.modalCtrl.dismiss({error:null});
  }
  
}
