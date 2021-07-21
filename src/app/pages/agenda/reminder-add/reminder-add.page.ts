import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-reminder-add',
  templateUrl: './reminder-add.page.html',
  styleUrls: ['./reminder-add.page.scss'],
})
export class ReminderAddPage implements OnInit {
  days = [{day1:true}, {day2:true}, {day3:true}, {day4:true}, {day5:true}, {day6:true}, {day7:true}]
  form: FormGroup;
  dateMax:any;
  isSubmittedPlace = false;
  isSubmittedTitle = false;
  isSubmittedDuration = false;
  isSubmittedStartDate = false;
  id:any
  event:any
  agenda_id
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
      type: [],
      agenda_id: [],
      title: [''],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      description: [],
      days: [this.days],
    });
    this.getReminder()
  }

  getReminder(){
    this.event = history.state.event;
    if(this.event){
      this.isNewEvent = false
      this.id = this.event.id;
      console.log('[ReminderAddPage] getReminder()', this.event);
      if(this.event.type) this.form.get('type').setValue(this.event.type)
      if(this.event.title) this.form.get('title').setValue(this.event.title)
      if(this.event.description) this.form.get('description').setValue(this.event.description)
      if(this.event.start_date) this.form.get('start_date').setValue(this.event.start_date)
      if(this.event.end_date) this.form.get('end_date').setValue( this.event.end_date )
    }
    this.agenda_id = history.state.agenda_id;
    if(this.agenda_id) this.form.get('agenda_id').setValue(this.agenda_id)
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

/*   trasnforHourToMinutes(time): any{
    let hour = time.split(':');
    return (Number(hour[0]))*60 + (Number(hour[1]))  
  } */

  async addReminder(){
    const loading = await this.loadingController.create();
    await loading.present();

    let date = this.form.get('start_date').value 
    this.form.get('start_date').setValue(this.transformDate(date));

    let end_date = this.form.get('end_date').value 
    this.form.get('end_date').setValue(this.transformDate(end_date));
    console.log(`[AgendaAddPage] addReminder()`,this.form.value );

    this.dooleService.postAPIaddReminder(this.form.value).subscribe(
      async (res: any) =>{
        console.log('[ReminderAddPage] addReminder()', await res);
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

  async editReminder(){
    this.dooleService.deleteAPIaddAgenda(this.id).subscribe(
      async (res: any) =>{
        console.log('[ReminderAddPage] deleteReminder()', await res);
        if(res.success){
          let message = this.translate.instant('reminder.message_updated_reminder')
          this.showAlert(message)
        }
       },(err) => { 
          console.log('[ReminderAddPage] deleteReminder() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)

      };
  }

  showAlert(message){
    //let message = this.translate.instant('documents_add.alert_message')
    let header = this.translate.instant('alert.header_info')
    this.dooleService.showAlertAndReturn(header,message,false, '/agenda')
  }

  async submit() {
    console.log('[ReminderAddPage] submit()', this.form.value );
    this.isSubmittedFields(true);
    if(this.form.invalid)
    return 
/*     if(this.isNewEvent)
    this.addReminder()
    else
    this.editReminder()*/

    this.addReminder()
  }

  async deleteReminder(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.dooleService.deleteAPIReminder(this.id).subscribe(
      async (res: any) =>{
        console.log('[ReminderAddPage] deleteReminder()', await res);
        if(res.success){
          let message = this.translate.instant('reminder.message_deleted_reminder')
          this.showAlert(message)
        }else{
          let message = this.translate.instant("reminder.error_message_delete_reminder")
          alert(message)
        }
        loading.dismiss();
       },(err) => { 
        loading.dismiss();
          console.log('[ReminderAddPage] deleteReminder() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        loading.dismiss();
      };
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      header: this.translate.instant("alert.header_confirmation"),
      message: this.translate.instant("reminder.confirmation_delete_reminder"),
      buttons: [
        {
          text: this.translate.instant("alert.button_cancel"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('[AddHealthCardPage] AlertConfirm Cancel');
          }
        }, {
          text: this.translate.instant("alert.button_ok"),
          handler: () => {
            console.log('[AddHealthCardPage] AlertConfirm Okay');
            this.deleteReminder()
          }
        }
      ]
    });

    await alert.present();
  }
}
