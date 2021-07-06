import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID, ApplicationInitStatus, Input, AfterViewInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DatePipe, formatDate } from '@angular/common';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ShellModel } from 'src/app/utils/shell/data-store';


export class slot {
  agenda_id: null
  available: number
  created_at: Date
  deleted_at: Date
  from_date: Date
  id: number
  to_date:Date
  updated_at: Date
  user_availability_id: number
  user_availability_time_id: number
  user_id: number
}
export class ShowcaseShellModel extends ShellModel {
  date: string;
  slots: Array<slot>;
  success: string;
  description: string;

  constructor() {
    super();
  }
}
@Component({
  selector: 'app-medical-calendar',
  templateUrl: './medical-calendar.page.html',
  styleUrls: ['./medical-calendar.page.scss'],
  providers:[DatePipe]
})
export class MedicalCalendarPage implements OnInit, AfterViewInit {
  @Input()id: string;
  eventSource = [];
  tagDefaultColor: Array<string>;
  event: any
  viewTitle: string;
  months = this.translate.instant('agenda.month')
  days = this.translate.instant('agenda.days')
  currentSelection: number;
  timeSlots : Array<any> = [];
  page: number = 1;
  isToday:boolean;
  staffId:number = 14482;
  isOnline:boolean = true;
  agendaType: string = "7";
  place: string = "";
  indications : string = "";
  routeResolveData: ShowcaseShellModel;
  modalReady = false;
  selectedDate : Date;
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
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private translate: TranslateService, 
    public languageService: LanguageService,
    private dooleService: DooleService,
    private alertController: AlertController,
    public datepipe: DatePipe,
    private location: Location,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    //this.getSlots()
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;      
    }, 100);
  }

   async getDays() {
     this.translate.get('agenda.days').subscribe((data:any)=> {
      console.log('[MedicalCalendarPage] getDays()', data);
      this.days = data
     });
  }

  getSlots(date:string=""){
    this.routeResolveData = null;
    this.eventSource = [];
    const promiseObservable = this.dooleService.getAPIStaffSlots({id:this.staffId, date: date });
    if(promiseObservable){
      promiseObservable.subscribe(
        res =>{
          const dataObservable = res;
        
          if(dataObservable){
            console.log('[MedicalCalendarPage] getSlots()', res);
              if(dataObservable.slots.length > 0)
                this.addScheduleToCalendar(dataObservable.slots)
                
              this.routeResolveData = dataObservable;
            
          }else{
            console.log('[MedicalCalendarPage] getSlots() !', res);
          }
         
         },(err) => { 
            console.log('[MedicalCalendarPage] getSlots() ERROR(' + err.code + '): ' + err.message); 
            throw err; 
        });
    }
      
  }

  getAppointment(){
    this.dooleService.getAPIappointmentAgenda().subscribe(
      async (res: any) =>{
        console.log('[AgendaPage] getAppointment()', await res);
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
      if(e.from_date !== undefined && e.to_date !== undefined ){
        var startTime = new Date(e.from_date)
        var endTime = new Date(e.to_date)
      }else{
        isAllDay = true
      }
        events.push({
          title: 'Day - ' + startTime.toDateString(),
          startTime: startTime,
          endTime: endTime,
          allDay: isAllDay
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
  
 

  eventSelected(event) {
    console.log('[HomePage] eventSelected()',event)
  }

  onTimeSelected(ev) {
   
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
    (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.onViewTitleChanged(ev);
  
    this.timeSlots = (ev.events !== undefined && ev.events.length !== 0) ?  ev.events : [] ;
    this.tagDefaultColor = Array(ev.events.length).fill("secondary"); 
    this.currentSelection = -1; // Keep the index of selected timeslot, none for -1
  
  }

  async presentAlertConfirm(date) {
   
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      message: "Confirmar", //this.translate.instant("sms.alert_message"),
      buttons: [
        {
          text: "Cancel",//this.translate.instant("sms.ko_button"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: this.translate.instant("sms.ok_button"),
          handler: () => {
            console.log('Confirm Okay');
            this.dooleService.selectedDate = date;
            this.modalCtrl.dismiss({date:date});
           
          }
        }
      ]
    });

    await alert.present();
  }
  changeTagColor(i:number, date :Date) {

    console.log('Selected date: ' + date);
    this.selectedDate = date;
    this.tagDefaultColor[this.currentSelection] = "secondary";
    this.tagDefaultColor[i] = "primary";
    this.currentSelection = i;
   
   
  }
  
  onCurrentDateChanged(event:Date) {
    this.timeSlots = [];
   
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
    this.page = 1;
    
    let date =this.datepipe.transform(event, 'yyyy-MM-dd');
    this.isToday ? this.getSlots(): this.getSlots(date);

  }

  close() {
    this.modalCtrl.dismiss({date:null});
  }

  save(){
    console.log('Confirm Okay');
    this.modalCtrl.dismiss({date:this.selectedDate});
  }
}
