import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DatePipe, formatDate } from '@angular/common';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {
  eventSource = [];
  event: any
  viewTitle: string;
  months = this.translate.instant('agenda.month')
  days = this.translate.instant('agenda.days')
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale: this.locale,
      dateFormatter: {
          formatMonthViewDay: function(date:Date) {
              return date.getDate().toString();
          },
          /*           
          formatMonthViewDayHeader: function(date:Date) {
            let days = ["L", "M", "X", "J", "V", "S", "D"]
            return this.days[date.getDay()] 
          }, */
          /* 
           formatMonthViewTitle: function(date:Date) {
              return date.getMonth().toString();
          } */
      }
     
  };
 
  selectedDate: Date;
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private translate: TranslateService, 
    private languageService: LanguageService,
    private dooleService: DooleService
  ) {}

  ngOnInit() {
    //this.getDays()
    this.getAppointment()
  }

   async getDays() {
     this.translate.get('agenda.days').subscribe((data:any)=> {
      console.log('[AgendaPage] getDays()', data);
      this.days = data
     });
  }

  getAppointment(){
    this.dooleService.getAPIappointmentAgenda().subscribe(
      async (res: any) =>{
        console.log('[AgendaPage] getAppointment()', await res);
        //this.eventSource = res
        this.addScheduleToCalendar(res)
       },(err) => { 
          console.log('[AgendaPage] getAppointment() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  addScheduleToCalendar(appointments: any[]){
    var events = [];
    appointments.forEach((e) =>{
      let isAllDay = false
      if(e.startTime !== undefined && e.endTime !== undefined ){
        var startTime = new Date(e.startTime)
        var endTime = new Date(e.endTime)
      }else{
        isAllDay = true
      }
        events.push({
          title: e.title,
          startTime: startTime,
          endTime: endTime,
          allDay: isAllDay,
          type: e.type
        });
      })
      console.log('[HomePage] addScheduleToCalendar()',events )
      this.eventSource = events;
  }

  setLocale(){
    return this.languageService.getCurrent();
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
    console.log("title", title);
    //this.viewTitle = title;
    const datePipe: DatePipe = new DatePipe(this.languageService.getCurrent());
    this.viewTitle = datePipe.transform(this.myCal.currentDate, 'MMM yyyy');

  }

  async onEventSelected(event){
    this.event = event
  }
  
  createRandomEvents() {
    console.log('[HomePage] createRandomEvents()  ' )
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var listType = ['Recordatorio Médico', 'Cita Extracción Sangre', 'Cita Nutricionista', 'Recordatorio Personal']
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      var type = listType[Math.floor(Math.random() * 3)]
      if (eventType === 0) {
        startTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + startDay
          )
        );
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
          type: type
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + startDay,
          0,
          date.getMinutes() + startMinute
        );
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
        );
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false,
          type: type,
        });
      }
    }
    //console.log('[HomePage] createRandomEvents()',events )
    this.eventSource = this.eventSource.concat(events) ;
  } 

  eventSelected(event) {
    console.log('[HomePage] eventSelected()',event)
  }

}
