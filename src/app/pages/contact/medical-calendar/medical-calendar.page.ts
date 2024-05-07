import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID, Input, AfterViewInit, NgZone } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { ShellModel } from 'src/app/utils/shell/data-store';
import { DateService } from 'src/app/services/date.service';
import { SwiperOptions } from 'swiper/types/swiper-options';


export class slot {
  agenda_id: null
  available: number
  created_at: Date
  deleted_at: Date
  from_date: Date
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
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  @Input()id: number;
  currentDate: Date;
  buttonAvailable = true
  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private translate: TranslateService,
    public languageService: LanguageService,
    private dooleService: DooleService,
    private alertController: AlertController,
    public datepipe: DatePipe,
    private modalCtrl: ModalController,
    public dateService: DateService,
    private ngZone: NgZone,

  ) {
    this.currentDate = new Date()
  }

  calendarSliderOptions: SwiperOptions = {
    spaceBetween: 10,
    threshold: 50
  };

  eventSource = [];
  tagDefaultColor: Array<string> = [];
  event: any
  viewTitle: string;
  // months = this.getTranslation('agenda.month')
  days; //= this.getTranslation('agenda.days')
  currentSelection: number;
  timeSlots : Array<any> = [];
  page: number = 1;
  isToday:boolean;
  staffId:number = history.state.id;
  isOnline:boolean = true;
  agendaType: string = "7";
  place: string = "";
  indications : string = "";
  routeResolveData: boolean = false;
  modalReady = false;
  selectedDate : Date;
  duration:string = "40"
  slot_id
  calendar = {
    mode: 'month',
    currentDate: new Date(),
      dateFormatter: {
          formatMonthViewDay: function(date:Date) {
              return date.getDate().toString();
          },

          formatMonthViewDayHeader: function(date:Date) {
            console.log("Entra Format: ",this.locale)
            let days = [ "D","L", "M", "X", "J", "V", "S"]
            if(this.locale === 'ca'){
              days = [ "DG","DL", "DT", "DC", "DJ", "DV", "DS"]
            }else if(this.locale === 'en'){
              days = [ "Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            }
            else if (this.locale === 'sv') {
                days = ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"];
            } else if (this.locale === 'no') {
                days = ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"];
            }
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
    this.getSlots()

    console.log('[MedicalCalendarPage] locale_ID', this.locale);
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

  async getTranslation(literal): Promise<string> {
    return await this.translate.instant(literal)
   }

  getSlots(date:string=""){
    if(this.id){
      this.routeResolveData = null;
      this.eventSource = [];
      this.dooleService.getAPIStaffSlots({id:this.id, date: date }).subscribe({
        next: (v) => this.setSlots(v),
        error: (e) => {console.error(e)},
        complete: () => {
          this.routeResolveData = true
        }
    });
    }else
      this.routeResolveData = true

  }

  setSlots(res){
    const dataObservable = res;

      if(dataObservable){
        console.log('[MedicalCalendarPage] getSlots()', res);
          if(dataObservable.slots.length > 0) {
            console.log("Entro per cada slot")

            this.addScheduleToCalendar(dataObservable.slots)
          }
            
          this.routeResolveData = dataObservable;

      }else{
        console.log('[MedicalCalendarPage] getSlots() !', res);
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
    this.eventSource = [];
    const currentDate = new Date();
    appointments.forEach((e) =>{

    var from_date = this.formatDate(e.from_date);
    var to_date = this.formatDate(e.to_date);
    let isAllDay = false
    events.push({
      id: e.id,
      title: 'Day - ' + from_date.toDateString(),
      startTime:  from_date,
      endTime: to_date,
      allDay: isAllDay,
      duration: e.duration,
      isDisabled: (new Date(from_date).getTime() < currentDate.getTime()) || e.available === 0
    });
  })
      console.log('[HomePage] addScheduleToCalendar()',events )
      this.eventSource = events;
  }

  formatDate(d){
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

  setLocale(){
    return this.languageService.getCurrent();
  }

  markDisabled = (date: Date) => {
    var current = new Date();
    return (date.getDate() < current.getDate() && date.getMonth() == current.getMonth() || date.getMonth() < current.getMonth() && date.getFullYear() < current.getFullYear());
};

  // Change current month/week/day
  //  next() {
  //   this.myCal.slideNext();
  // }

  // back() {
  //   this.myCal.slidePrev();
  // }

    // Change current month/week/day
    next() {

      this.ngZone.run(() => {
        this.buttonAvailable = false
        this.myCal.slideNext();
      });

      
    }
  
    back() {
      this.ngZone.run(() => {
        this.myCal.slidePrev();
      });
    }

  // Selected date reange and hence title changed
  onViewTitleChanged(title : any){
    this.ngZone.run(() => {
      if(this.myCal?.currentDate)
      this.viewTitle = this.formatMonths();
    });
  }

  formatMonths(){
    let language = this.setLocale()
    const datePipe: DatePipe = new DatePipe(language);

    let month = datePipe.transform(this.myCal.currentDate, 'MMMM');
    if(language === 'ca'){
      month = datePipe.transform(this.myCal.currentDate, 'MMMM').split(' ')[1]
      if(month == undefined)
      month = datePipe.transform(this.myCal.currentDate, 'MMMM').split('’')[1]
    }
    return month.split('.')[0] + ' ' + this.myCal.currentDate.getFullYear()
  }

  formatSelectedDate(date){

    return  this.dateService.formatSelectedDate(date);

  }

  async onEventSelected(event){
    this.ngZone.run(() => {
      this.event = event
    });
  }


  eventSelected(event) {
    console.log('[HomePage] eventSelected()',event)
  }

  onTimeSelected(ev) {

    this.ngZone.run(() => {
      console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
      this.onViewTitleChanged(ev);
  
      this.timeSlots = (ev.events !== undefined && ev.events.length !== 0) ?  ev.events : [] ;
      this.tagDefaultColor = Array(ev.events.length).fill("secondary");
      this.currentSelection = -1; // Keep the index of selected timeslot, none for -1
    });
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
            console.log('Confirm Cancel:');
          }
        }, {
          text: this.translate.instant("sms.ok_button"),
          handler: () => {
            console.log('Confirm Okay');
            this.dooleService.selectedDate = date;
            this.modalCtrl.dismiss({date:date, duration: this.duration});

          }
        }
      ]
    });

    await alert.present();
  }
  changeTagColor(id: any, i:number, date :Date, duration?: any) {

    console.log("ID: " + id);
    console.log('Selected date: ' + date + ' duration: ' +duration);
    this.selectedDate = date;
    this.tagDefaultColor[this.currentSelection] = "secondary";
    this.tagDefaultColor[i] = "warning";
    this.currentSelection = i;
    this.duration = duration
    this.slot_id = id
  }

  onCurrentDateChanged(event:Date) {
    this.ngZone.run(() => {
      console.log('[MedicalCalendarPage] onCurrentDateChanged()',event);
      this.timeSlots = [];
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      this.isToday = today.getTime() === event.getTime();
      this.page = 1;
  
      let date =this.datepipe.transform(event, 'yyyy-MM-dd');
      this.isToday ? this.getSlots(): this.getSlots(date);
  
      const currentMonth = new Date().getMonth()
        const currentYear = new Date().getFullYear()
  
        const calTimeMonth = this.myCal?.currentDate.getMonth()
        const calTimeYear = this.myCal?.currentDate.getFullYear()
        
        console.log(currentMonth)
        console.log(currentYear)
  
        console.log(calTimeMonth)
        console.log(calTimeYear)
       
        if (currentYear === calTimeYear){
          if (currentMonth === calTimeMonth) {
            this.buttonAvailable = true
          }
          else {
            this.buttonAvailable = false
          }
        }
        
        else {
          this.buttonAvailable = false
        }  
    });

   

  }

  passedDate(selectedDate){
    const date = new Date();


}

  close() {
    this.modalCtrl.dismiss({date:null});
  }

  save(){
    console.log('Confirm Okay', this.slot_id);
    this.modalCtrl.dismiss({date:this.selectedDate, duration: this.duration, slot_id: this.slot_id});
  }
}
