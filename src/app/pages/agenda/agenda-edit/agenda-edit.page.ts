import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-agenda-edit',
  templateUrl: './agenda-edit.page.html',
  styleUrls: ['./agenda-edit.page.scss'],
})
export class AgendaEditPage implements OnInit {
  form: FormGroup;
  dateMax:any;
  isSubmittedPlace = false;
  isSubmittedTitle = false;
  isSubmittedDuration = false;
  isSubmittedStartDate = false;
  id:any
  event:any
  isNewEvent = true
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private dooleService: DooleService,
    private translate : TranslateService,
    public datepipe: DatePipe,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
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
    this.event = history.state.event;
    if(this.event){
      this.isNewEvent = false
      this.id = this.event.id;
      console.log('[ReminderAddPage] getAppointment()', this.event);
      if(this.event.site) this.form.get('place').setValue(this.event.site)
      if(this.event.title) this.form.get('title').setValue(this.event.title)
      if(this.event.description) this.form.get('indications').setValue(this.event.description)
      if(this.event.start_date_iso8601) this.form.get('date').setValue(this.transformDate(this.event.start_date_iso8601))
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
    console.log('[ReminderAddPage] selectedCategory()', this.form.value );
  }

  async submit() {
    console.log('[ReminderAddPage] submit()', this.form.value );
    this.isSubmittedFields(true);
    if(this.form.invalid)
    return 
    if(this.isNewEvent)
    this.addAgenda()
    else
    this.editAgenda()
  }

  async editAgenda(){
    this.dooleService.deleteAPIaddAgenda(this.id).subscribe(
      async (res: any) =>{
        console.log('[ReminderAddPage] deleteReminder()', await res);
        this.addAgenda()
       },(err) => { 
          console.log('[ReminderAddPage] deleteReminder() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)

      };
  }

  async addAgenda1(){
    const loading = await this.loadingController.create();
    await loading.present();

    let date = this.form.get('date').value 
    this.form.get('date').setValue(this.transformDate(date));
    console.log(`[AgendaAddPage] addAgenda()`,this.form.value );

    this.dooleService.postAPIaddAgenda(this.form.value).subscribe(
      async (res: any) =>{
        console.log('[ReminderAddPage] addAgenda()', await res);
        if(res.success){
          let message = this.translate.instant('reminder.message_added_reminder')
          this.showAlert(message)
        }else{
          let message = this.translate.instant('reminder.error_message_added_reminder')
          alert(message)
        }
        loading.dismiss();
       },(err) => { 
        loading.dismiss();
          console.log('[ReminderAddPage] addAgenda() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        loading.dismiss();
      };
  }

/**Eliminar esta función cuando ya esté la nueva api que me permita actualizar agenda */
  async addAgenda(){
    const loading = await this.loadingController.create();
    await loading.present();

    let date = this.form.get('date').value 
    this.form.get('date').setValue(this.transformDate(date));
    console.log(`[AgendaAddPage] addAgenda()`,this.form.value );

    this.dooleService.postAPIaddAgenda(this.form.value).subscribe(
      async (res: any) =>{
        console.log('[ReminderAddPage] addAgenda()', await res);
        if(res.success){
          let message = this.translate.instant('appointment.message_added_appointment')
          if(!this.isNewEvent)
          message = this.translate.instant('appointment.message_updated_reminder')
          this.showAlert(message)
        }else{
          let message = this.translate.instant('appointment.error_message_added_reminder')
          alert(message)
        }
        loading.dismiss();
       },(err) => { 
        loading.dismiss();
          console.log('[ReminderAddPage] addAgenda() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        loading.dismiss();
      };
  }

  showAlert(message){
    let header = this.translate.instant('alert.header_info')
    this.dooleService.showAlertAndReturn(header,message,false, '/agenda')
  }


}
