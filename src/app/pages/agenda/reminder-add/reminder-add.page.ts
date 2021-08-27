import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  //@Input()origin_type: string;
  @Input()origin_id: string;
  days = [{day1:1}, {day2:1}, {day3:1}, {day4:1}, {day5:1}, {day6:1}, {day7:1}]
  form: FormGroup;
  dateMax:any;
  time:Date;
  isSubmited = false
  isSubmittedTimes = false;
  isSubmittedTitle = false;
  isSubmittedDuration = false;
  isSubmittedStartDate = false;
  id:any;
  @Input()event:any;
  times = []
  frequency = '1week';
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
    private notification: NotificationService,
    public router: Router,
  ) { 
    this.translate.use('es');
  }

  ngOnInit() {
   
   
    let year = (new Date(Date.now()).getFullYear()) + 1
    this.dateMax =  year
    this.form = this.fb.group({
      type: [this.type],
      type_id: [this.typeId],
      title: [''],
      start_date: ['', [Validators.required]],
      time: [''],
      end_date: ['', [Validators.required]],
      description: [],
     /*  days: [this.days], */
     /*   origin: [1], */
      frequency: [],
      origin_id: [],
      origin_type: [],
      day1: [1],
      day2: [1],
      day3: [1],
      day4: [1],
      day5: [1],
      day6: [1],
      day7: [1],
    });
    this.getReminder()
  }

  getReminder(){
    if(this.event){
      console.log('[ReminderAddPage] getReminder()', this.event);
      this.isNewEvent = false
      this.id = this.event.id;
      if(this.event.type) this.form.get('type').setValue(this.event.type)
      if(this.event.title) this.form.get('title').setValue(this.event.title)
      if(this.event.description) this.form.get('description').setValue(this.event.description)
      if(this.event.from_date) this.form.get('start_date').setValue(this.event.from_date)
      if(this.event.to_date) this.form.get('end_date').setValue( this.event.to_date )
      if(this.event.frequency) this.form.get('frequency').setValue( this.event.frequency )

      if(this.event.day1) this.form.get('day1').setValue( this.event.day1 )
      if(this.event.day2) this.form.get('day2').setValue( this.event.day2 )
      if(this.event.day3) this.form.get('day3').setValue( this.event.day3 )
      if(this.event.day4) this.form.get('day4').setValue( this.event.day4 )
      if(this.event.day5) this.form.get('day5').setValue( this.event.day5 )
      if(this.event.day6) this.form.get('day6').setValue( this.event.day6 )
      if(this.event.day7) this.form.get('day7').setValue( this.event.day7 )

      if(this.event?.reminderable_type) this.form.get('type').setValue( this.event?.reminderable_type.split('\\')[1] )
      if(this.event?.reminderable_id) this.form.get('type_id').setValue( this.event.reminderable_id )

      if(this.event?.times.length > 0)
      this.event?.times.forEach(element => {
        let t = element.time.split(':')
        this.times.push(t[0]+':'+t[1])
      });
    }
    
    if(this.origin_id){
      this.form.get('origin_id').setValue(this.origin_id)
      this.form.get('origin_type').setValue('Agenda')
    } 
    if(this.isNewEvent){
      let message = (this.origin_id)? this.translate.instant('reminder.personal_reminder'): this.translate.instant('reminder.activity_reminder')
      this.form.get('title').setValue(message)
    }
  }

  removeTime(time){
    console.log("[DrugsDetailPage] removeTime() ", time);
    this.times.forEach((element, index) => {
      if (element == time)
        this.times.splice(index, 1);
    });

  }

  isSubmittedFields(isSubmitted){
    this.isSubmittedTimes = isSubmitted;
    this.isSubmittedTitle = isSubmitted;
    this.isSubmittedDuration= isSubmitted;
    this.isSubmittedStartDate= isSubmitted;
  }

  transformDate(date) {
    return this.datepipe.transform(date, 'yyyy-MM-dd HH:mm');
  }

  transformHour(date) {
    return this.datepipe.transform(date, 'HH:mm');
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

    let f = this.form.get('frequency').value
    if(f== 'custom')
    this.form.get('frequency').setValue('1week');

    this.form.get('time').setValue(this.times)

    this.form.get('type').setValue(this.type);
    this.form.get('type_id').setValue(this.typeId);

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
    let date = this.form.get('start_date').value 
    this.form.get('start_date').setValue(this.transformDate(date));

    let end_date = this.form.get('end_date').value 
    this.form.get('end_date').setValue(this.transformDate(end_date));

    let f = this.form.get('frequency').value
    if(f== 'custom')
    this.form.get('frequency').setValue('1week');

    this.form.get('time').setValue(this.times)

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
    this.isSubmited = true
    this.isSubmittedFields(true);
    if(this.form.invalid || this.times.length <= 0){
      this.isSubmited = false
      return false;
    }

    if(this.isNewEvent)
      this.addReminder()
    else
      this.editReminder()
  }

  async deleteReminder(){
    this.isLoading = true
    this.dooleService.deleteAPIReminder(this.id).subscribe(
      async (res: any) =>{
        console.log('[ReminderAddPage] deleteReminder()', await res);
        if(res.success){
          this.router.navigateByUrl('/agenda')
          this.modalCtrl.dismiss({error:null, action: 'delete'});
          this.notification.displayToastSuccessful()
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
    switch (fq) {
      case 'daily':
        let dialy = [0,1,2,3,4,5,6]
        this.settingDay(dialy)
        break;
      case '1week':
        this.showDays()
        break;
      default:
        this.showDays()
        break;
    }

  }

  settingDay(index){
    this.days.forEach((day, i) =>{
      day['day'+(i +1)] = 0
      this.form.get('day'+(i+1)).setValue(0)
    })
    if(index.length > 0)
    index.forEach(i => {
      let day = this.days[i]
      day['day'+(i +1)] = 1
      this.form.get('day'+(i+1)).setValue(1)
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
            this.frequency = (this.form.get('frequency').value == '1week')? 'custom': '1week'
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

  inputDate(){
    if(this.isSubmited) 
    return
    let time = this.form.get('time').value
    this.form.get('time').setValue('')
    if(time !== '' ){
      let date = new Date(time)
      let hour = this.transformHour(date)
      if ( this.times.indexOf( hour) == -1 ) // if hour is not repeated
      this.times.push(hour)
    }
  }

}


