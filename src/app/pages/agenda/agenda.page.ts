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
  isLoading:boolean;
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
    public languageService: LanguageService,
    private dooleService: DooleService
  ) {}

  ngOnInit() {
    this.getAgenda()
  }

  ionViewDidEnter(){
    console.log('[AgendaPage] ionViewDidEnter()');
    this.getAgenda()
  }

  getAgenda(){
    this.isLoading = true;
    this.dooleService.getAPIagenda().subscribe(
      async (res: any) =>{
        console.log('[AgendaPage] getAgenda()', await res);
        this.isLoading = false;
        if(res.agenda)
          this.addScheduleToCalendar(res.agenda)
       },(err) => { 
          console.log('[AgendaPage] getAgenda() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err; 
      });
  }

  onCurrentDateChanged(event:Date) {
   this.getAgenda();
  }

  transformDate(date) {
    let auxDate = `${date.year}-${date.month}-${date.day}`
    let d = new Date(auxDate);
    d.setHours(date.end_time.substring(0,2));
    d.setMinutes(date.end_time.substring(3,5));
    return d
  }

  formatDate(d){
    let date = new Date(d[0]);
    let time = d[1];
    date.setHours(time.substring(0,2));
    date.setMinutes(time.substring(3,5));
    console.log("date: ", date);
    console.log("time", time);
    return date;
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
          origin: e.origin,
          startTime: startTime,
          endTime: endTime,
          allDay: isAllDay,
          type: e.agenda_type.name,
          color: e.agenda_type.color,
          site: e.site,
          staff: e.staff,
          agenda_type: e.agenda_type
        });
      })
      console.log('[AgendaPage] addScheduleToCalendar()',events )
      this.eventSource = events;
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
    const datePipe: DatePipe = new DatePipe(this.languageService.getCurrent());
    this.viewTitle = datePipe.transform(this.myCal.currentDate, 'MMM yyyy');
  }

  async onEventSelected(event){
    this.event = event
  }
}
