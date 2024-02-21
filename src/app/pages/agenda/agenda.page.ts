import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID, NgZone } from '@angular/core';
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
import { ReminderAddPage } from './reminder-add/reminder-add.page';
import { IEvent } from 'ionic2-calendar/calendar.interface';

export interface DayEvent {
  date?: string;
  events?: IEvent[];
}

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit{
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  segment:string = 'calendar';
  dayEvents: DayEvent[] =[]
  eventMonth = [];
  listAppointment: any[] = []
  inReminders = false;
  month = 0;
  year;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private translate: TranslateService,
    public languageService: LanguageService,
    private dooleService: DooleService,
    private modalCtrl: ModalController,
    public authService: AuthenticationService,
    public dateService: DateService,
    private ngZone: NgZone
  ) {
    // this.analyticsService.setScreenName('agenda','AgendaPage')
  }
  ngOnInit(): void {
    this.segment = 'calendar'
  }

  eventSource = [];
  appointment = [];
  reminders = [];
  event: any
  viewTitle: string;
  
  calendarSliderOptions: SwiperOptions = {
    spaceBetween: 10,
    threshold: 50
  };

  isLoading: boolean;
  selectedDate: Date;
  date = new Date();

  calendar = {
    mode: 'month',
    currentDate: this.date,
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        return date.getDate().toString();
      },

      formatMonthViewDayHeader: function (date: Date) {
        let days;
        switch (this.locale) {
          case 'es':
            days = ["D", "L", "M", "M", "J", "V", "S"]
            break;
          case 'pt':
            days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
            break;
          case 'ca':
            days = ["DG", "DL", "DT", "DC", "DJ", "DV", "DS"]
            break;
          default:

            days = ["D", "L", "M", "X", "J", "V", "S"]
            break;
        }

        let num = date.getDay()
        return days[num]
      },
    }
  };

  async ionViewDidEnter() {
    if (this.segment === 'calendar') this.myCal.currentDate = new Date();
    else {
      this.getallAgenda();
    }
  }

  markDisabled = (date: Date) => {
    return 0
  };

  async getTranslation(literal): Promise<string> {
    return await this.translate.instant(literal)
  }


  getallAgenda() {
    this.isLoading = true;
    return this.dooleService.getAPIallAgenda().subscribe(
      async (res: any) => {
        console.log('[AgendaPage] getallAgenda()', await res);
        if (res.agenda) {
          this.addScheduleToCalendar(res.agenda)
        }
        this.getReminders()
      }, (err) => {
        console.log('[AgendaPage] getallAgenda() ERROR(' + err.code + '): ' + err.message);
        alert('ERROR(' + err.code + '): ' + err.message)
        throw err;
      });
  }

  getReminders() {
    return this.dooleService.getAPIreminders().subscribe(
      async (res: any) => {
        console.log('[AgendaPage] getReminders()', await res);
        if (res.reminders && res.reminders?.length > 0) {
          this.addReminderToCalendar(res.reminders)
          this.eventSource = [].concat(this.appointment, this.reminders)
        } else {
          this.eventSource = this.appointment
        }

        if (this.inReminders) {
          this.listAppointment = this.eventSource
          this.filterMonth()
        }
      
        console.log(this.eventSource)
      }, (err) => {
        console.log('[AgendaPage] getReminders() ERROR(' + err.code + '): ' + err.message);
        alert('ERROR(' + err.code + '): ' + err.message)
        throw err;
      }, () => {
        this.isLoading = false;
      });
  }

  onCurrentDateChanged(event: Date) {
    this.ngZone.run(() => {
      console.log('[AgendaPage] onCurrentDateChanged()', event.getDate());
      this.getallAgenda();
    });
  }

  transformDate(date) {
    let auxDate = `${date.year}-${date.month}-${date.day}T${date.end_time}:00`
    let d = new Date(auxDate);
    d.setHours(date.end_time.substring(0, 2));
    d.setMinutes(date.end_time.substring(3, 5));
    return d;
  }

  formatDate(d) {
    var auxdate = d.split(' ')
    //let date = new Date(auxdate[0]);
    d = d.replace(' ', 'T')
    let date0 = new Date(d).toISOString();
    let date = new Date(date0);
    let time = auxdate[1];
    date.setHours(time.substring(0, 2));
    date.setMinutes(time.substring(3, 5));

    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    const formattedDate = date0.toLocaleString();
    return date;
  }

  formatDate2(d) {
    var auxdate = d.split('T')
    let date0 = new Date(d).toISOString();
    let date = new Date(date0);
    let time = auxdate[1];
    date.setHours(time.substring(0, 2));
    date.setMinutes(time.substring(3, 5));
    return date;
  }

  addScheduleToCalendar(appointments: any[]) {
    var events = [];
    appointments.forEach((e) => {
      let isAllDay = false
      if (e.start_date !== undefined && e.end_date !== undefined) {
        var startTime = this.formatDate2(e.start_date_iso8601)
        var endTime = this.transformDate(e)
      } else {
        isAllDay = true
      }
      let type = this.translate.instant((e?.staff?.length > 0) ? 'agenda.appointment_by_user' : 'agenda.event_by_user')
      events.push({
        id: e.id,
        title: e.title,
        origin: e.origin,
        startTime: startTime,
        endTime: endTime,
        allDay: isAllDay,
        type: (e.agenda_type.type === "Added_By_User") ? type : e.agenda_type.name,
        color: e.agenda_type?.color,
        site: e.site,
        staff: e.staff,
        agenda_type: e.agenda_type
      });
    })
    this.appointment = []
    this.appointment = events;
    console.log(this.appointment)
  }

  setTypeEvent(type: any) {

    if (type?.type === "Added_By_User")
      return this.translate.instant('agenda.appointment_by_user')
    if (type?.name) type?.name
  }

  addReminderToCalendar(reminders: any[]) {
    var events = [];
    var startTime;
    var endTime
    reminders.forEach((e) => {

      if (e.executions && e.executions.length > 0) {
        e.executions.forEach(element => {
          let isAllDay = false
          if (element.date)
            startTime = this.formatDate(element.date)
          else isAllDay = true

          events.push({
            id: e.id,
            title: (e.title) ? e.title : this.translate.instant('reminder.personal_reminder'),
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
      } else {
        let isAllDay = false
        if (e.from_date && e.to_date) {
          startTime = this.formatDate(e.from_date)
          endTime = this.formatDate(e.to_date)

        } else {
          isAllDay = true
        }
        events.push({
          id: e.id,
          title: (e.title) ? e.title : this.translate.instant('reminder.personal_reminder'),
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

  next() {
    if (!this.inReminders) {
      this.myCal.slideNext();
    }
    else {
      ++this.month
      this.filterMonth()
    }
    
  }

  back() {

    if (!this.inReminders) {
      this.myCal.slidePrev();
    }
    else {
      --this.month
      this.filterMonth()
    }
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title: any) {
    this.ngZone.run(() => {
      if(!this.inReminders) this.viewTitle = this.formatMonths()
    });
  }

  onViewTitleChangedReminders(date: Date) {

    this.ngZone.run(() => {
      this.viewTitle = this.formatMonthReminder(date)
    });

  }


  setLocale() {
    return this.languageService.getCurrent();
  }

  formatMonths() {
    let language = this.setLocale()
    const datePipe: DatePipe = new DatePipe(language);
    let month = datePipe.transform(this.myCal.currentDate, 'MMM');
    if (language === 'ca') {
      month = datePipe.transform(this.myCal.currentDate, 'MMM').split(' ')[1]
      if (month == undefined)
        month = datePipe.transform(this.myCal.currentDate, 'MMM').split('’')[1]
    }
    return month.split('.')[0] + ' ' + this.myCal.currentDate.getFullYear()
  }

  formatMonthReminder(date: Date){
    const datePipe: DatePipe = new DatePipe(this.languageService.getCurrent());
    let month = datePipe.transform(date, 'MMM');
    if(this.languageService.getCurrent() === 'ca'){
      month = datePipe.transform(date , 'MMM').split(' ')[1]
      if(month == undefined)
      month = datePipe.transform(date , 'MMM').split('’')[1]
    }
    return month.split('.')[0] + ' ' + date.getFullYear()
  }

  formatSelectedDate(date) {
    return this.dateService.selectedDateFormat(date);
  }

  formatSelectedDateReminder(date) {
    let language = this.languageService.getCurrent()
    const datePipe: DatePipe = new DatePipe(language);
    return datePipe.transform(date, this.dateService.getformatSelectedDate());
  }
  async onEventSelected(event) {
    this.ngZone.run(() => {
      this.event = event
    });
  }

  async addAgenda() {
    const modal = await this.modalCtrl.create({
      component: AgendaEditPage,
      componentProps: {},
      cssClass: "modal-custom-class"
    });

    modal.onDidDismiss()
      .then((result) => {
        console.log('addAgenda()', result);

        if (result?.data?.error) {
          // let message = this.translate.instant('landing.message_wrong_credentials')
          //this.dooleService.presentAlert(message)
        } else if (result?.data?.action == 'add') {
          let agenda = result?.data['data']
          if (agenda?.start_date)
            this.myCal.currentDate = this.formatDate(agenda.start_date)
        } else if (result?.data?.action == 'update') {
          let agenda = result?.data['data']
          if (agenda?.start_date)
            this.myCal.currentDate = this.formatDate(agenda.start_date)
        }
        this.getallAgenda();
      });

    await modal.present();

  }

  formatSelectedDate2(date) {
    let language = this.languageService.getCurrent();
    const datePipe: DatePipe = new DatePipe(language);
    return datePipe.transform(date, 'EEEE, d MMMM, HH:mm');
  }


  segmentChanged(event?) {
    console.log("event: ", event);



    setTimeout(() => {

      switch (this.segment) {
        case 'calendar':
          
          this.inReminders=false
          this.myCal.currentDate = new Date();
          this.month = 0;
          this.year = this.myCal.currentDate.getFullYear();
          break;
  
        case 'reminders':
          this.inReminders=true
          this.listAppointment = this.eventSource;
          this.onViewTitleChangedReminders(new Date())
          //this.getallAgenda();
          this.getListAppointment()
          break;
        default:
          break;
      }

      if (event) {
        const s = event.target.getBoundingClientRect();
        const sw = (s.right - s.left);
        for (const button of event.target.childNodes) {
          if (button.className?.indexOf('segment-button-checked') > -1) {
            const bc = button.offsetLeft + (button.offsetWidth / 2);
            const diff = bc - (sw / 2);
            event.target.scrollTo({
              left: diff,
              behavior: 'smooth'
            });
            break;
          }
        }
      }
    }, 200);
  }

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

  async addReminder(){
    const modal = await this.modalCtrl.create({
      component: ReminderAddPage,
      componentProps: { typeId: undefined, type: undefined, origin_id: this.event?.id/* isNewReminder:true */ },
      cssClass: "modal-custom-class"
    });

    modal.onDidDismiss()
      .then((result) => {
        console.log("Entro despres de posar reminder")

        this.getallAgenda();
    });
    await modal.present();
  }

  filterMonth(){
    this.dayEvents = []
    var date = new Date();
    console.log(date);
    date.setDate(1);
    date.setMonth(date.getMonth() + this.month);


    console.log("date" + date)

    this.onViewTitleChangedReminders(date)
    let year = date.getFullYear()
    this.year = year;
    let month = date.getMonth()
    console.log('[ListAppointmentPage] filteMonth()', date.toDateString() );
    console.log('[ListAppointmentPage] list', this.listAppointment );
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

    let currentDate = new Date()

    console.log(currentDate.getFullYear())
    console.log(this.month+1);
    console.log(this.year);

    if (currentDate.getMonth() === (this.month+1) && currentDate.getFullYear() === this.year){
      console.log('[ListAppointmentPage] showDayEvents()', this.dayEvents);
      this.dayEvents = this.filterByDate()

      console.log('[ListAppointmentPage] showDayEvents() Filter', this.dayEvents);

    } 
    console.log('[ListAppointmentPage] showDayEvents()', this.dayEvents);
  }


   filterByDate() {
    const today = new Date();
     
  
    console.log(today.getDate())
    return this.dayEvents.filter(eventGroup => {
      const groupDate = new Date(eventGroup.date);
      return groupDate.getDate() >= today.getDate();
    });
  }

  check() {
    console.log(this.dayEvents)
    return this.dayEvents && this.dayEvents.length >= 0;
  }
}