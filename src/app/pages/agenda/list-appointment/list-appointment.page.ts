import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { IEvent } from 'ionic2-calendar/calendar';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AgendaEditPage } from '../agenda-edit/agenda-edit.page';

export interface DayEvent {
  date?: string;
  events?: IEvent[];
}

@Component({
  selector: 'app-list-appointment',
  templateUrl: './list-appointment.page.html',
  styleUrls: ['./list-appointment.page.scss'],
})
export class ListAppointmentPage implements OnInit {
  listAppointment: any[] = []
  eventMonth = [];
  dayEvents: DayEvent[] =[]
  month = 0;
  viewTitle = ''
  constructor(
    private dooleService: DooleService,
    private languageService: LanguageService,
    private modalCtrl: ModalController,
    private nav: NavController,
    private notification: NotificationService,
  ) { }

  ngOnInit() {
    this.listAppointment = history.state.calendar;
    console.log('[ListAppointmentPage] ngOnInit()' ,  this.listAppointment); 
    if(this.listAppointment !== undefined && this.listAppointment.length > 0)
    this.filterMonth()
    else {
      this.getListAppointment()
    }
  }

  ionViewDidEnter(){
    console.log('[ListAppointmentPage] ionViewDidEnter()');
    this.onViewTitleChanged(new Date())
  }

  transformDate(date) {
    let auxDate = `${date.year}-${date.month}-${date.day} ${date.end_time}`
    return new Date(auxDate)
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(date: Date){
    this.viewTitle = this.formatMonths(date)
  }

  formatMonths(date: Date){
    const datePipe: DatePipe = new DatePipe(this.languageService.getCurrent());
    let month = datePipe.transform(date, 'MMM');
    if(this.languageService.getCurrent() === 'ca'){
      month = datePipe.transform(date , 'MMM').split(' ')[1]
      if(month == undefined)
      month = datePipe.transform(date , 'MMM').split('’')[1]
    }
    return month.split('.')[0] + ' ' + date.getFullYear()
  }

  addScheduleToCalendar(appointments: any[]){
    var events = [];
    appointments.forEach((e) =>{
      let isAllDay = false
      if(e.start_date_iso8601 !== undefined && e.end_date !== undefined ){
        var startTime = new Date(e.start_date_iso8601)
        var endTime = this.transformDate(e)
      }else{
        isAllDay = true
      }
        events.push({
          id: e.id, 
          title: e.title,
          startTime: startTime,
          endTime: endTime,
          allDay: isAllDay,
          type: e.agenda_type.name,
          color: e.agenda_type.color,
        });
      })
      console.log('[AgendaPage] addScheduleToCalendar()',events )
      this.listAppointment = events;
  }


/*   getListAppointment(date){
    this.dooleService.postAPIappointmentAgenda(date).subscribe(
      async (res: any) =>{
        console.log('[ListAppointmentPage] getListAppointment()', await res);
        this.listAppointment = res
        this.filterMonth()
       },(err) => { 
          console.log('[ListAppointmentPage] getListAppointment() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  } */

  getListAppointment(){
    this.dooleService.getAPIagenda().subscribe(
      async (res: any) =>{
        console.log('[AgendaPage] getAgenda()', await res);
        if(res.agenda){
          this.addScheduleToCalendar(res.agenda) 
          this.filterMonth()
        }
       },(err) => { 
          console.log('[AgendaPage] getAgenda() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  filterMonth(){
    this.dayEvents = []
    var date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() + this.month);
    this.onViewTitleChanged(date)
    let year = date.getFullYear()
    let month = date.getMonth()
    console.log('[ListAppointmentPage] filteMonth()', date.toDateString() );
    this.eventMonth = this.listAppointment?.filter( event => 
      (new Date(event.startTime).getMonth() === month 
      && new Date(event.startTime).getFullYear() === year)
      )
    //console.log('[ListAppointmentPage] filteMonth()', this.eventMonth );
     this.sortAppointment()
     this.showDayEvents()
  }

  sortAppointment(){
    this.eventMonth.sort( function (a, b) {
      if (a.startTime > b.startTime) 
        return 1;
      if (a.startTime < b.startTime)
        return -1;
      return 0;
    })
  }

  showDayEvents(){
    this.eventMonth.forEach( (e, index) =>{
      let day = new Date(e.startTime).getDate()
      if(index == 0 || day !== new Date(this.eventMonth[index-1].startTime).getDate()){
        let events = this.eventMonth.filter( event => 
          (new Date(event.startTime).getDate() == day)
        )
        this.dayEvents.push({date: e.startTime, events: events}) 
      } 
    })
    console.log('[ListAppointmentPage] showDayEvents()', this.dayEvents);
  }

  formatSelectedDate(date){
    let language = this.languageService.getCurrent()
    const datePipe: DatePipe = new DatePipe(language);
    return datePipe.transform(date, 'EEEE, d MMMM');
  }

  back(){
    --this.month
    this.filterMonth()
  }

  next(){
    ++this.month
    this.filterMonth()
  }

  async addAgenda(){
    const modal = await this.modalCtrl.create({
      component:  AgendaEditPage,
      componentProps: { },
      cssClass: "modal-custom-class"
    });

    modal.onDidDismiss()
      .then((result) => {

        if(result?.data['error']){
         // let message = this.translate.instant('landing.message_wrong_credentials')
          //this.dooleService.presentAlert(message)
        }else if(result?.data['action'] == 'add'){
          let agenda = result?.data['data']
          this.nav.navigateForward('/agenda', { state: {date: agenda.start_date} });
          this.notification.displayToastSuccessful()
        }
    });
    await modal.present();
  }

}
