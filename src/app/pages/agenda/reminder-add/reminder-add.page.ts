import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-reminder-add',
  templateUrl: './reminder-add.page.html',
  styleUrls: ['./reminder-add.page.scss'],
  providers:[DatePipe, TranslateService]
})
export class ReminderAddPage implements OnInit {
  @Input()typeId: string;
  @Input()type: string;
  //@Input()isNewReminder: boolean;
  days = [{day1:true}, {day2:true}, {day3:true}, {day4:true}, {day5:true}, {day6:true}, {day7:true}]
  form: FormGroup;
  dateMax:any;
  time:Date;
  isSubmittedPlace = false;
  isSubmittedTitle = false;
  isSubmittedDuration = false;
  isSubmittedStartDate = false;
  id:any;
  @Input()event:any;
  agenda_id;
  frequency;
  isNewEvent: boolean = true;
  isLoading = false
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private dooleService: DooleService,
    private translate: TranslateService,
    public datepipe: DatePipe,
    public alertController: AlertController,
    private modalCtrl: ModalController,
    private notification: NotificationService
  ) { 
    this.translate.use('es');
  }

  ngOnInit() {
   
   
    let year = (new Date(Date.now()).getFullYear()) + 1
    this.dateMax =  year
    this.form = this.fb.group({
      type: [this.type],
      id: [this.typeId],
      title: [''],
      start_date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      description: [],
      days: [this.days],
      frequency: [],
      origin: [1]
    });
    this.getReminder()
  }

  getReminder(){
    //this.event = history.state.event;
    if(this.event){
      this.isNewEvent = false
      this.id = this.event.id;
      console.log('[ReminderAddPage] getReminder()', this.event);
      if(this.event.type) this.form.get('type').setValue(this.event.type)
      if(this.event.title) this.form.get('title').setValue(this.event.title)
      if(this.event.description) this.form.get('description').setValue(this.event.description)
      if(this.event.from_date) this.form.get('start_date').setValue(this.event.from_date)
      if(this.event.to_date) this.form.get('end_date').setValue( this.event.to_date )
      if(this.event.frequency) this.form.get('frequency').setValue( this.event.frequency )
    }
    let agenda_id = history.state.agenda_id;
    if(agenda_id) this.form.get('agenda_id').setValue(agenda_id)
    let element_id = history.state.element_id;
    if(element_id) this.form.get('element_id').setValue(element_id)
    if(this.isNewEvent){
      let message = (agenda_id)? this.translate.instant('reminder.personal_reminder'): this.translate.instant('reminder.activity_reminder')
      this.form.get('title').setValue(message)
    }
  }

  isSubmittedFields(isSubmitted){
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
    this.isLoading = true
    let date = this.form.get('start_date').value 
    this.form.get('start_date').setValue(this.transformDate(date));

    let end_date = this.form.get('end_date').value 
    this.form.get('end_date').setValue(this.transformDate(end_date));

    this.time = new Date(this.form.get('time').value);
    let t = this.time.getHours() + ':' + this.time.getMinutes();
    this.form.get('time').setValue(t);

    this.form.get('type').setValue(this.type);
    this.form.get('id').setValue(this.typeId);

    console.log(`[AgendaAddPage] addReminder()`,this.form.value );

    this.dooleService.postAPIaddReminder(this.form.value).subscribe(
      async (res: any) =>{
        console.log('[ReminderAddPage] addReminder()', await res);
        if(res.success){
          // let message = this.translate.instant('reminder.message_added_reminder')
          // this.notification.showSuccess(message);
          this.modalCtrl.dismiss({error:null, action: 'add'});
          this.notification.displayToastSuccessful()
        }else{
          let message = this.translate.instant('reminder.error_message_added_reminder')
          alert(message)
        }
        this.isLoading = false
       },(err) => { 
        this.isLoading = false
          console.log('[ReminderAddPage] addAgenda() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        this.isLoading = false
      };
  }

  async editReminder(){
    this.dooleService.updateAPIReminder(this.id, this.form.value).subscribe(
      async (res: any) =>{
        console.log('[ReminderAddPage] editReminder()', await res);
        if(res.success){
          this.modalCtrl.dismiss({error:null, action: 'update', reminder: this.form.value});
          this.notification.displayToastSuccessful()
        }else{
          let message = this.translate.instant('reminder.error_message_added_reminder')
          this.showAlert(message)
        }
       },(err) => { 
          console.log('[ReminderAddPage] editReminder() ERROR(' + err.code + '): ' + err.message); 
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
    if(this.isNewEvent)
      this.addReminder()
    else
      this.editReminder()

    //this.addReminder()
  }

  async deleteReminder(){
    this.isLoading = true
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
        this.isLoading = false
       },(err) => { 
        this.isLoading = false
          console.log('[ReminderAddPage] deleteReminder() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        this.isLoading = false
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
            console.log('[ReminderAddPage] AlertConfirm Cancel');
          }
        }, {
          text: this.translate.instant("alert.button_ok"),
          handler: () => {
            console.log('[ReminderAddPage] AlertConfirm Okay');
            this.deleteReminder()
          }
        }
      ]
    });

    await alert.present();
  }

  selectedFrequency(event){
    let fq = this.form.get('frequency').value;
    console.log('[ReminderAddPage] selectedFrequency()', fq);
    console.log('[ReminderAddPage] selectedFrequency()', event);
    
    switch (fq) {
      case 0:
        let index = new Date().getDay()
        this.settingDay([index -1])
        //this.frequency = 'day'
        //this.form.get('frequency').setValue('day');
        break;
      case 1:
        let dialy = [0,1,2,3,4,5,6]
        this.settingDay(dialy)
        //this.frequency = 'daily'
        //this.form.get('frequency').setValue('daily');
        break;
      case 2:
        let five = [0,1,2,3,4]
        this.settingDay(five)
        //this.frequency = 'mom_fri'
        //this.form.get('frequency').setValue('mom_fri');
        break;
      case 3:
        this.showDays()
        //this.form.get('frequency').setValue('custom');
        break;

      default:
        break;
    }
  }

  isChangedSelect(event){
    let fq = this.form.get('frequency').value
    console.log('[AddHealthCardPage] isChangedSelect()', fq, event);
/*     if(fq !==3 )
    this.form.get('frequency').setValue(fq); */
  }

  settingDay(index){
    this.days.forEach((day, i) =>{
      day['day'+(i +1)] = false
     // console.log('[AddHealthCardPage] selectedFrequency() day', index);
    })
    if(index.length > 0)
    index.forEach(i => {
      let day = this.days[i]
      day['day'+(i +1)] = true
    });
    console.log('[AddHealthCardPage] settingDay() day', this.days);
  
  }


  async showDays() {
    let alert = this.alertController.create({
      header: this.translate.instant("reminder.wwek_day"),
      inputs: this.addDaysToAlert(),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ok',
          handler: data => {
            console.log('Ok clicked', data);
            this.settingDay(data)
            this.frequency = 'custom'
          }
        }
      ]
    });
    (await alert).present();
  }

  addDaysToAlert(){
    let days_week = []
    this.days.forEach((day, i)=>{
      days_week.push(
        {
          type: 'checkbox',
          label: this.translate.instant('reminder.day.day'+(i+1)),
          value: i,
          checked: day['day'+(i +1)]

        }
      )
    })
    return days_week
  }


  close() {
    this.modalCtrl.dismiss({date:null});
  }

}


