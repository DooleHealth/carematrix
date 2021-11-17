import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ElementsAddPage } from '../../tracking/elements-add/elements-add.page';
import { ReminderAddPage } from '../reminder-add/reminder-add.page';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss'],
})
export class ReminderPage implements OnInit {
  private data: any = history.state?.data;
  days = [{day1:1}, {day2:1}, {day3:1}, {day4:1}, {day5:1}, {day6:1}, {day7:1}]
  id:any
  event = []
  reminder: any = {}
  frequency = ''
  isLoading = false
  times = []
  frequencySeleted = 'daily';
  expanded = true
  type = ''
  isElement = false
  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private dooleService: DooleService,
    private languageService: LanguageService,
    private translate : TranslateService,
    public alertController: AlertController,
    private modalCtrl: ModalController,
    public nav: NavController,
    public notification: NotificationService,
  ) { }

  ngOnInit() {
    this.id = history.state.id;
    if(this.id){
      this.event = history.state.event;
      console.log('[ReminderPage] ngOnInit()', this.event, this.id);
      this.getReminderData()
    }
  }
  expandItem(): void {
    this.expanded = !this.expanded
  }

  async getReminderData(){
    this.isLoading = true
    this.dooleService.getAPIreminderID(this.id).subscribe(
      async (res: any) =>{
        console.log('[ReminderPage] getReminderData()', await res);
        if (res.reminder) {
          this.reminder = res.reminder
          this.days[0].day1 = res.reminder.day1
          this.days[1].day2 = res.reminder.day2
          this.days[2].day3 = res.reminder.day3
          this.days[3].day4 = res.reminder.day4
          this.days[4].day5 = res.reminder.day5
          this.days[5].day6 = res.reminder.day6
          this.days[6].day7 = res.reminder.day7
          this.times = []
          if(this.reminder?.times.length > 0)
          this.reminder.times.forEach(element => {
            let t = element.time.split(':')
            this.times.push(t[0]+':'+t[1])
          });
          this.selectType(  this.reminder )
          this.selectedFrequency(res.reminder?.frequency)
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
    date = this.formatDate(date)
    let language = this.languageService.getCurrent()
    const datePipe: DatePipe = new DatePipe(language);
    return datePipe.transform(date, 'EEEE, d MMMM yyyy, HH:mm');
  }

  selectedFrequency(frequency){
    switch (frequency) {
      // case 'day':
      //   this.frequency = this.translate.instant('reminder.frequency.day');
      //   this.frequencySeleted = frequency
      //   break;
      case 'daily':
        this.frequency = this.translate.instant('reminder.frequency.daily');
        this.frequencySeleted = frequency
        this.gettingFrequency()
        break;
      // case 'mom_fri':
      //   this.frequency = this.translate.instant('reminder.frequency.week');
      //   this.frequencySeleted = frequency
      //   break;
      // case 'custom':
      //   this.frequency = this.translate.instant('reminder.frequency.custom');
      //   this.frequencySeleted = frequency
      //   break;
      default:
        this.frequency = this.translate.instant('reminder.frequency.custom');
        this.frequencySeleted = frequency
        this.gettingFrequency()
        break;
    }
  }

  settingDay(index){
    this.days.forEach((day, i) =>{
      day['day'+(i +1)] = false
    })
    if(index.length > 0)
    index.forEach(i => {
      let day = this.days[i]
      day['day'+(i +1)] = true
    });
  
  }

  setDay( day, i){
     return day['day'+(i +1)]
  }

  gettingFrequency(){
    let ceros = 1
    this.days.forEach((day, i) =>{
      let d = day['day'+(i +1)]
      if(d==0 || d == false) ceros =0
    })
    //console.log('[DrugsDetailPage] gettingFrequency() day', this.days);
    if(ceros==0){
      this.frequency = this.translate.instant('reminder.frequency.custom');
      this.frequencySeleted =  'custom'
    }
  }

/*   trasnforHourToMinutes(time): any{
        let hour = time.split(':');
        return (Number(hour[0]))*60 + (Number(hour[1]))
  } */

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
    return date;
  }

  async editReminder(){
    const modal = await this.modalCtrl.create({
      component:  ReminderAddPage,
      componentProps: {typeId: this.id, type: 'Agenda', event: this.reminder},
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

  getReminderType(){
    let type = (this.reminder?.reminderable?.name)? this.reminder?.reminderable.name : this.reminder?.reminderable_type?.split("App\\")[0]
    if(type == undefined)
    type =  this.reminder?.reminder_origin_type?.split("App\\")[1]
     return type
  }

  getReminderTitle(){
    if(this.reminder?.reminder_origin?.title){
        if(this.reminder?.reminder_origin?.title.length > 25)
        return this.reminder?.reminder_origin?.title.substr(0,24)+'...'
        else
        return this.reminder?.reminder_origin?.title
    }
    let type = (this.reminder?.reminderable?.title)? this.reminder?.reminderable.title : this.reminder?.reminderable?.name
    if(type == undefined)
    type =  this.reminder?.reminder_origin_type?.split("App\\")[1]
     return type
  }

  selectType( instruction){
    console.log('[AgendaPage] selectType()',  instruction);
    //let type = ''
    switch (instruction?.reminderable_type) {
      case "App\\Element": 
        this.type = this.translate.instant('reminder.activity')
        this.isElement = true
        break;
      case  "App\\Advice":
        break;
      case  "App\\Diet":
        this.type = this.translate.instant('reminder.diet')
        break;
      case  "App\\Form":
        this.type = this.translate.instant('reminder.form')
        break;
      case  "App\\Agenda":
        if(instruction?.reminderable?.model_type == "App\\Visit")
        this.type = this.translate.instant('reminder.medical')
        else
        this.type = this.translate.instant('reminder.personal')
        break;
    
      default:
        this.type = this.translate.instant('reminder.personal')
        break;
    }
    //return type
  }

  actionIntrucction(){
    let instruction = this.reminder
    console.log('[AgendaPage] actionIntrucction()',  instruction);
    let id
    switch (instruction.reminderable_type) {
      case "App\\Element":
        id = instruction.reminderable_id
        console.log('[AgendaPage] actionIntrucction()',  id);
        this.addElement(id)
        break;
      case  "App\\Agenda":
        let agenda = instruction?.reminder_origin
        this.nav.navigateForward("agenda/detail", { state: {event: agenda} });
        break;
    
      default:
        id = instruction.reminderable_id
        if(instruction.reminderable_id == null && instruction.reminder_origin_type == "App\\Agenda"){
            id = instruction?.reminder_origin_id
            if(id){
              console.log('[AgendaPage] actionIntrucction()',  id);
              let agenda = instruction?.reminder_origin
              this.nav.navigateForward("agenda/detail", { state: {event: agenda} });
            }
        }
        break;
    }
  }

  async addElement(id){
    const modal = await this.modalCtrl.create({
      component: ElementsAddPage,
      componentProps: {id: id },
      cssClass: "modal-custom-class"
    });

    modal.onDidDismiss()
      .then((result) => {
        if(result?.data['action'] === 'add'){
          this.notification.displayToastSuccessful()
         }
        if(result?.data['error']){
        //TODO: handle error message
        }
    });
    await modal.present();
  }

  backButton(){
    if(this.data)
    this.router.navigate([`/home`]);
  }

}
