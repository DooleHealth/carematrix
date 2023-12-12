import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { DatePipe, formatDate } from '@angular/common';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { AgendaEditPage } from './agenda-edit/agenda-edit.page';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DateService } from 'src/app/services/date.service';
import { SwiperOptions } from 'swiper/types/swiper-options';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private translate: TranslateService,
    public languageService: LanguageService,
    private dooleService: DooleService,
    private modalCtrl: ModalController,
    public authService: AuthenticationService,
    public dateService: DateService
  ) {
    // this.analyticsService.setScreenName('agenda','AgendaPage')
  }
  eventSource = [];
  appointment = [];
  reminders = [];
  event: any
  viewTitle: string;
  // months = this.getTranslation('agenda.month')
  // days = this.getTranslation('agenda.days')

  calendarSliderOptions: SwiperOptions = {
    spaceBetween: 10,
    threshold: 50
  };

  isLoading:boolean;
  selectedDate: Date;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
      dateFormatter: {
          formatMonthViewDay: function(date:Date) {
              return date.getDate().toString();
          },

          formatMonthViewDayHeader: function(date:Date) {

            let days = [ "D","L", "M", "X", "J", "V", "S"]
            if(this.locale === 'ca'){
              days = [ "DG","DL", "DT", "DC", "DJ", "DV", "DS"]
            }else if(this.locale === 'en')
              days = [ "Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

            let num = date.getDay()
            return days[num]
          },
          /*
           formatMonthViewTitle: function(date:Date) {
              return date.getMonth().toString();
          } */
      }

  };





  ngOnInit() {
    console.log('[AgendaPage] this.languageService.getCurrent()', this.languageService.getCurrent());

  }

 async ionViewDidEnter(){

  let date = history.state.date;
    console.log('[AgendaPage] ionViewDidEnter()', date);
    if(date)
      this.myCal.currentDate = this.formatDate(date)
    else
    this.getallAgenda()
  }

  markDisabled = (date: Date) => {
    //return date.getDay() == 0 || date.getDay() == 6;
    return 0
};

async getTranslation(literal): Promise<string> {
  return await this.translate.instant(literal)
 }

/* getallAgenda(){
    this.isLoading = true;
    return this.dooleService.getAPIagenda().subscribe(
      async (res: any) =>{
        console.log('[AgendaPage] getAgenda()', await res);
        if(res.agenda){
          this.addScheduleToCalendar(res.agenda)
        }
        this.getReminders()
       },(err) => {
          console.log('[AgendaPage] getAgenda() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err;
      });
  } */

  getallAgenda(){
    this.isLoading = true;
    return this.dooleService.getAPIallAgenda().subscribe(
      async (res: any) =>{
        console.log('[AgendaPage] getallAgenda()', await res);
        if(res.agenda){
          this.addScheduleToCalendar(res.agenda)
        }
        this.getReminders()
       },(err) => {
          console.log('[AgendaPage] getallAgenda() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err;
      });
  }

  getReminders(){
    return this.dooleService.getAPIreminders().subscribe(
      async (res: any) =>{
        console.log('[AgendaPage] getReminders()', await res);
        if(res.reminders && res.reminders?.length > 0){
          this.addReminderToCalendar(res.reminders)
          this.eventSource = [].concat(this.appointment, this.reminders)
        }else{
          this.eventSource = this.appointment
        }
       },(err) => {
          console.log('[AgendaPage] getReminders() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err;
      },()=>{
        this.isLoading = false;
      });
  }

  onCurrentDateChanged(event:Date) {
    console.log('[AgendaPage] onCurrentDateChanged()', event.getDate());
    this.getallAgenda();
  }

  transformDate(date) {
    let auxDate = `${date.year}-${date.month}-${date.day}T${date.end_time}:00`
    let d = new Date(auxDate);
    d.setHours(date.end_time.substring(0,2));
    d.setMinutes(date.end_time.substring(3,5));
    return d;
  }

  formatDate(d){
    var auxdate = d.split(' ')
    //let date = new Date(auxdate[0]);
    d = d.replace(' ', 'T')
    let date0 = new Date(d).toISOString();
    let date = new Date(date0);
    let time = auxdate[1];
    date.setHours(time.substring(0,2));
    date.setMinutes(time.substring(3,5));
    return date;
  }

  formatDate2(d){
    var auxdate = d.split('T')
    let date0 = new Date(d).toISOString();
    let date = new Date(date0);
    let time = auxdate[1];
    date.setHours(time.substring(0,2));
    date.setMinutes(time.substring(3,5));
    return date;
  }

  addScheduleToCalendar(appointments: any[]){
    var events = [];
    appointments.forEach((e) =>{
      let isAllDay = false
      if(e.start_date !== undefined && e.end_date !== undefined ){
        var startTime =   this.formatDate2(e.start_date_iso8601)
        var endTime = this.transformDate(e)
      }else{
        isAllDay = true
      }
        let type = this.translate.instant((e?.staff?.length > 0)?'agenda.appointment_by_user': 'agenda.event_by_user')
        events.push({
          id: e.id,
          title:  e.title,
          origin: e.origin,
          startTime: startTime,
          endTime: endTime,
          allDay: isAllDay,
          type: (e.agenda_type.type === "Added_By_User")? type:e.agenda_type.name,
          color: e.agenda_type?.color,
          site: e.site,
          staff: e.staff,
          agenda_type: e.agenda_type
        });
      })
      this.appointment = []
      this.appointment = events ;
  }

  setTypeEvent(type: any){

    if(type?.type === "Added_By_User")
      return this.translate.instant('agenda.appointment_by_user')
    if(type?.name)  type?.name
  }

  addReminderToCalendar(reminders: any[]){
    var events = [];
    var startTime;
    var endTime
    reminders.forEach((e) =>{

      if(e.executions && e.executions.length > 0){
        e.executions.forEach(element => {
          let isAllDay = false
          if(element.date)
          startTime =   this.formatDate(element.date)
          else isAllDay = true

          events.push({
            id: e.id,
            title: (e.title)? e.title: this.translate.instant('reminder.personal_reminder'),
            origin: e.origin,
            startTime: startTime,
            endTime: startTime,
            allDay: isAllDay,
            type: this.translate.instant('reminder.header'),
            color: '#27AE60',
            site: e.site,
            staff: e.staff,
            agenda_type: e.agenda_type,
            is_reminder: true
          });
        });
      }else{
        let isAllDay = false
        if(e.from_date  && e.to_date ){
           startTime =   this.formatDate(e.from_date)
           endTime =  this.formatDate(e.to_date)

        }else{
          isAllDay = true
        }
          events.push({
            id: e.id,
            title: (e.title)? e.title: this.translate.instant('reminder.personal_reminder'),
            origin: e.origin,
            startTime: startTime,
            endTime: startTime,
            allDay: isAllDay,
            type: this.translate.instant('reminder.header'),// e.agenda_type?.name,
            color: e.agenda_type?.color,
            site: e.site,
            staff: e.staff,
            agenda_type: e.agenda_type,
            is_reminder: true
          });
      }

      })
      this.reminders = [];
      this.reminders = events;
      //console.log('[AgendaPage] addReminderToCalendar() all:',  this.eventSource );
  }

  // Change current month/week/day
  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title : any){
    this.viewTitle = this.formatMonths()
  }

  setLocale(){
    return this.languageService.getCurrent();
  }

  formatMonths(){
    let language = this.setLocale()
    const datePipe: DatePipe = new DatePipe(language);
    let month = datePipe.transform(this.myCal.currentDate, 'MMM');
    if(language === 'ca'){
      month = datePipe.transform(this.myCal.currentDate, 'MMM').split(' ')[1]
      if(month == undefined)
      month = datePipe.transform(this.myCal.currentDate, 'MMM').split('’')[1]
    }
    return month.split('.')[0] + ' ' + this.myCal.currentDate.getFullYear()
  }

  formatSelectedDate(date){
    return this.dateService.selectedDateFormat(date);
  }

  async onEventSelected(event){
    this.event = event
  }

  async addAgenda(){
    const modal = await this.modalCtrl.create({
      component:  AgendaEditPage,
      componentProps: { },
      cssClass: "modal-custom-class"
    });

    modal.onDidDismiss()
      .then((result) => {
        console.log('addAgenda()', result);

        if(result?.data?.error){
         // let message = this.translate.instant('landing.message_wrong_credentials')
          //this.dooleService.presentAlert(message)
        }else if(result?.data?.action == 'add'){
          let agenda = result?.data['data']
          if(agenda?.start_date)
          this.myCal.currentDate = this.formatDate(agenda.start_date)
        }else if(result?.data?.action == 'update'){
          let agenda = result?.data['data']
          if(agenda?.start_date)
          this.myCal.currentDate = this.formatDate(agenda.start_date)
        }
        this.getallAgenda();
    });

    await modal.present();

  }



}
