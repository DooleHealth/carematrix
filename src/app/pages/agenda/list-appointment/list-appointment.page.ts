import { Component, OnInit } from '@angular/core';
import { IEvent } from 'ionic2-calendar/calendar';
import { DooleService } from 'src/app/services/doole.service';

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
  viewTitle = Date.now()
  constructor(
    private dooleService: DooleService
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

  transformDate(date) {
    let auxDate = `${date.year}-${date.month}-${date.day} ${date.end_time}`
    return new Date(auxDate)
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
    let month = date.getMonth() + this.month
    this.viewTitle = date.setMonth(month);
    console.log('[ListAppointmentPage] filteMonth()', this.viewTitle);
    this.eventMonth = this.listAppointment.filter( event => 
      new Date(event.startTime).getMonth() === month
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

  back(){
    --this.month
    this.filterMonth()
  }

  next(){
    ++this.month
    this.filterMonth()
  }

}
