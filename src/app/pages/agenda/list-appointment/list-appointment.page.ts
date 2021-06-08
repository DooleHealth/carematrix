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
  listAppointment: any[]
  eventMonth = [];
  dayEvents: DayEvent[] =[]
  month = 0;
  viewTitle
  constructor(
    private dooleService: DooleService
  ) { }

  ngOnInit() {
    this.listAppointment = history.state.calendar;
    console.log('[ListAppointmentPage] ngOnInit()' ,  this.listAppointment); 
    if(this.listAppointment)
    this.filterMonth()
    else {
      this.getListAppointment(Date.now)
    }
  }

  getListAppointment(date){
    this.dooleService.postAPIappointmentAgenda(date).subscribe(
      async (res: any) =>{
        console.log('[ListAppointmentPage] getListAppointment()', await res);
        this.listAppointment = res
        this.filterMonth()
       },(err) => { 
          console.log('[ListAppointmentPage] getListAppointment() ERROR(' + err.code + '): ' + err.message); 
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

  createNewEvents(){

  }

  showDetailAppointment(event){
    console.log('[ListAppointmentPage] showDetailAppointment()', event );
  }


}
