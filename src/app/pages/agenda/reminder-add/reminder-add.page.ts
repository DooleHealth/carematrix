import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DateService } from 'src/app/services/date.service';
import { DooleService } from 'src/app/services/doole.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-reminder-add',
  templateUrl: './reminder-add.page.html',
  styleUrls: ['./reminder-add.page.scss'],
  providers:[DatePipe, TranslateService]
})
export class ReminderAddPage implements OnInit {
  NUM_YEAR = 10
  @Input()typeId: string;
  @Input()type: string;
  @Input()titleReminder: string;
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
  frequency = 'daily';
  frequencySeleted = 'daily';
  isInit = true;
  isNewEvent: boolean = true;
  isLoading = false
  expanded = true
  constructor(
    private fb: FormBuilder,
    public dateService: DateService,
    private dooleService: DooleService,
    private translate: TranslateService,
    public datepipe: DatePipe,
    public alertController: AlertController,
    private modalCtrl: ModalController,
    private notification: NotificationService,
    public router: Router,
  ) {
    //this.translate.use('es');
  }

  ngOnInit() {


    let year = (new Date(Date.now()).getFullYear()) + 1
    this.dateMax = (new Date(Date.now()).getFullYear()) + this.NUM_YEAR
    this.form = this.fb.group({
      type: [this.type],
      type_id: [this.typeId],
      title: [''],
      start_date: ['', [Validators.required]],
      time: [''],
      end_date: ['', [Validators.required, this.checkDate.bind(this)]],
      description: [],
     /*  days: [this.days], */
     /*   origin: [1], */
      frequency: ['daily'],
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
    if(this.isNewEvent) this.isInit = false
  }

  expandItem(): void {
    this.expanded = !this.expanded
  }

  private checkDate(group: FormControl) {
    if(this.form !== null && this.form !== undefined) {
      const start_date = this.form.get('start_date').value;
      const end_date = group.value;

      if(start_date && end_date){
        let a = new Date(start_date).getTime();
        let b = new Date(end_date).getTime();
        console.log(`[ReminderAddPage] checkDate(${a}, ${b})`);
        return a <= b ? null : {
          NotLess: true
      };
      }
    }
 }

  getErrorEndDate() {
    if (this.form.get('end_date').hasError('required')) {
      return this.translate.instant("error_required");
    }
    if (this.form.get('end_date').hasError('NotLess')) {
      return this.translate.instant("reminder.error_end_date");
    }
    return '';
  }

  getReminder(){
    if(this.event){
      console.log('[ReminderAddPage] getReminder()', this.event);
      this.isNewEvent = false
      this.id = this.event.id;
      if(this.event.type) this.form.get('type').setValue(this.event.type)
      if(this.event.title) this.form.get('title').setValue(this.event.title)
      if(this.event.description) this.form.get('description').setValue(this.event.description)
      if(this.event.from_date) this.form.get('start_date').setValue( this.formatDate(this.event.from_date))
      if(this.event.to_date) this.form.get('end_date').setValue( this.formatDate(this.event.to_date) )
      if(this.event?.frequency) {
        this.form.get('frequency').setValue( this.event.frequency )
        this.frequencySeleted = this.event.frequency
      }

      this.form.get('day1').setValue( this.event.day1 )
      this.form.get('day2').setValue( this.event.day2 )
      this.form.get('day3').setValue( this.event.day3 )
      this.form.get('day4').setValue( this.event.day4 )
      this.form.get('day5').setValue( this.event.day5 )
      this.form.get('day6').setValue( this.event.day6 )
      this.form.get('day7').setValue( this.event.day7 )
      this.gettingDay()

      if(this.event?.reminderable_type) this.form.get('type').setValue( this.event?.reminderable_type.split('\\')[1] )
      if(this.event?.reminderable_id) this.form.get('type_id').setValue( this.event.reminderable_id )

      if(this.event?.times.length > 0)
      this.event?.times.forEach(element => {
        let t = element.time.split(':')
        this.times.push(t[0]+':'+t[1])
      });

      this.isInit = false
    }

    if(this.origin_id){
      this.form.get('origin_id').setValue(this.origin_id)
      this.form.get('origin_type').setValue('Agenda')
    }
    if(this.isNewEvent){
      let message = (this.origin_id)? this.translate.instant('reminder.personal_reminder'): this.translate.instant('reminder.activity_reminder')
      if(this.type == 'Element' && this.titleReminder)
        message = this.translate.instant('reminder.header')+' '+ this.titleReminder
      this.form.get('title').setValue(message)
      console.log('[ReminderAddPage] getReminder()', this.type, message);
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
    //date = new Date(date)
    //return this.datepipe.transform(date, 'yyyy-MM-dd HH:mm');

    return this.dateService.yyyyMMddHHmm(date);
  }

  transformHour(date) {
    return this.datepipe.transform(date, this.dateService.getTimeFormat());
  }

  formatDate(d){
    if(d === undefined || d === null)
    return
    var auxdate = d.split(' ')
    //let date = new Date(auxdate[0]);
    d = d.replace(' ', 'T')
    let date0 = new Date(d).toUTCString();
    let date = new Date(date0);
    let time = auxdate[1];
    date.setHours(time.substring(0,2));
    date.setMinutes(time.substring(3,5));
    return date.toISOString();
  }

/*   trasnforHourToMinutes(time): any{
    let hour = time.split(':');
    return (Number(hour[0]))*60 + (Number(hour[1]))
  } */

  async addReminder(){
    this.isLoading = true
    let date = this.datepipe.transform(this.form.get('start_date').value, 'yyyy-MM-dd HH:mm');
    console.log("date after tranform", date)
    this.form.get('start_date').setValue(date);

    let end_date = this.datepipe.transform(this.form.get('end_date').value, 'yyyy-MM-dd HH:mm')
    console.log("date after tranform", end_date)
    this.form.get('end_date').setValue(end_date);

    let f = this.form.get('frequency').value
    if(f !== 'daily')
    this.form.get('frequency').setValue('daily');

    this.form.get('time').setValue(this.times)

    this.form.get('type').setValue(this.type);
    this.form.get('type_id').setValue(this.typeId);

    console.log(`[AgendaAddPage] addReminder()`,this.form.value );

    this.dooleService.postAPIaddReminder(this.form.value).subscribe(
      async (res: any) =>{
        console.log('[ReminderAddPage] addReminder()', await res);
        if(res.success){
          // let message = this.translate.instant('reminder.message_added_reminder')
          // this.notification.showSuccess(message);z
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
    if(f !== 'daily')
    this.form.get('frequency').setValue('daily');

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


  selectedFrequency(){
    let fq = this.form.get('frequency').value
    console.log('[DrugsDetailPage] isChangedSelect()', fq);
    switch (fq) {
      case 'daily':
        if(this.isSubmited)
        return
        let dialy = [0,1,2,3,4,5,6]
        this.settingDayForm(dialy)
        this.frequencySeleted = fq
        break;
      case '1week':
        if(this.isSubmited)
          return
          this.settingBackupDay()
          this.frequencySeleted = fq
        break;
      case 'custom':
        if(this.isSubmited)
          return
          this.settingBackupDay()
          this.frequencySeleted = fq
        break;
      default:
        this.settingBackupDay()
        this.frequencySeleted = fq
        break;
    }

  }

  settingBackupDay(){
    if(!this.isInit)
    this.days.forEach((day, i) =>{
      let value =  day['day'+(i +1)]? 1:0
      this.form.get('day'+(i+1)).setValue(value)
      console.log('[DrugsDetailPage] settingBackupDay() day', this.days);
    })
    console.log('[DrugsDetailPage] settingBackupDay() day', this.days);
  }

  settingDayForm(index){
    for(let i =1; i <=7; i++){
      this.form.get('day'+(i)).setValue(0)
    }
    if(index.length > 0)
    index.forEach(i => {
      this.form.get('day'+(i+1)).setValue(1)
    });
    console.log('[DrugsDetailPage] settingDayForm() day', this.days);
  }

  setDay(event, day, i){
    if(!this.isInit){
      let value = (event.detail.checked)? 1: 0
      if(this.form.get('frequency').value == 'custom')
      day['day'+(i +1)] = value
      console.log('[DrugsDetailPage] setDay()',day);
      this.form.get('day'+(i+1)).setValue(value)
    }
  }

  gettingDay(){
    let ceros = 1
    this.days.forEach((day, i) =>{
      let d = this.form.get('day'+(i+1)).value? 1:0
      day['day'+(i +1)] = d
      if(d==0) ceros =0
      console.log('[DrugsDetailPage] gettingDay() day', d);
    })
    console.log('[DrugsDetailPage] gettingDay() day', this.days);
    if(ceros==0) {
      this.form.get('frequency').setValue('custom')
      this.frequencySeleted ='custom'
    }
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
      let hour = this.datepipe.transform(date, 'HH:mm');
      if ( this.times.indexOf( hour) == -1 ) // if hour is not repeated
      this.times.push(hour)
    }
  }

}


