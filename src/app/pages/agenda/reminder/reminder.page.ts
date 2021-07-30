import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';
import { ReminderAddPage } from '../reminder-add/reminder-add.page';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss'],
})
export class ReminderPage implements OnInit {
  days = [{day1:false}, {day2:false}, {day3:false}, {day4:false}, {day5:false}, {day6:false}, {day7:false}]
  id:any
  event = []
  reminder = {}
  frequency = ''
  isLoading = false
  constructor(
    private loadingController: LoadingController,
    private dooleService: DooleService,
    private languageService: LanguageService,
    private translate : TranslateService,
    public alertController: AlertController,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.id = history.state.id;
    if(this.id){
      this.event = history.state.event;
      console.log('[ReminderPage] ngOnInit()', this.event);
      this.getReminderData()
    }
  }


  async getReminderData(){
    this.isLoading = true
    this.dooleService.getAPIreminderID(this.id).subscribe(
      async (res: any) =>{
        console.log('[ReminderPage] getReminderData()', await res);
        if (res.reminder) {
          this.reminder = res.reminder
          this.selectedFrequency(res.reminder?.frequency)
          this.days[0].day1 = res.reminder.day1
          this.days[1].day2 = res.reminder.day2
          this.days[2].day3 = res.reminder.day3
          this.days[3].day4 = res.reminder.day4
          this.days[4].day5 = res.reminder.day5
          this.days[5].day6 = res.reminder.day6
          this.days[5].day7 = res.reminder.day7
        }
        this.isLoading = false
       },(err) => { 
        this.isLoading = false
          console.log('[ReminderPage] getReminderData() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        this.isLoading = false
      };
  }

  formatSelectedDate(date){
    //date = this.formatDate(date)
    let language = this.languageService.getCurrent()
    const datePipe: DatePipe = new DatePipe(language);
    return datePipe.transform(date, 'EEEE, d MMMM yyyy, HH:mm');
  }

  selectedFrequency(frequency){
    switch (frequency) {
      case 'day':
        this.frequency = this.translate.instant('reminder.frequency.day');
        break;
      case 'daily':
        this.frequency = this.translate.instant('reminder.frequency.daily');
        break;
      case 'mom_fri':
        this.frequency = this.translate.instant('reminder.frequency.week');
        break;
      case 'custom':
        this.frequency = this.translate.instant('reminder.frequency.custom');
        break;
      default:
        this.frequency = this.translate.instant('reminder.frequency.daily');
        break;
    }
  }

  async showDays() {
    let alert = this.alertController.create({
      header: this.translate.instant("reminder.wwek_day"),
      inputs: this.addDaysToAlert(),
      buttons: [
/*         {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }, */
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

/*   trasnforHourToMinutes(time): any{
        let hour = time.split(':');
        return (Number(hour[0]))*60 + (Number(hour[1]))
  } */

  formatDate(d){
    if(d === undefined || d === null)
    return
    var auxdate = d.split(' ')
    let date = new Date(auxdate[0]);
    let time = auxdate[1];
    date.setHours(time.substring(0,2));
    date.setMinutes(time.substring(3,5));
    return date;
  }

  async editReminder(){
    const modal = await this.modalCtrl.create({
      component:  ReminderAddPage,
      componentProps: { },
      cssClass: "modal-custom-class"
    });

    modal.onDidDismiss()
      .then((result) => {
        console.log('editReminder()', result);
       
        if(result?.data?.error){
         // let message = this.translate.instant('landing.message_wrong_credentials')
          //this.dooleService.presentAlert(message)
        }else if(result?.data?.action == 'update'){
          //let reminder  = result?.data?.reminder
          this.getReminderData()
        }
    });

    await modal.present();
   
  }

}
