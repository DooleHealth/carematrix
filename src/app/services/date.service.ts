import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  locale:string;
  language:string;

  constructor(private datePipe: DatePipe, public translate: TranslateService) {
    this.locale = this.getLocale();
  }


  public getDateFormat(){
    let lang = this.translate.currentLang;
    let format = 'DD/MM/YY ';
    if(lang === 'en' )
      format = 'MM/DD/YY '
    return format
  }

  public getDateFormat2(){
    let lang = this.translate.currentLang;
    let format = 'dd/MM/YY';
    if(lang === 'en' )
      format = 'MM/dd/YY'
    return format
  }

  public getDateFormat3(){
    let lang = this.translate.currentLang;
    let format = 'DD/MM/YYYY';
    if(lang === 'en' )
      format = 'MM/DD/YYYY'
    return format
  }

  public getLongFormat(){
    let lang =  this.translate.currentLang;
    let format = 'dddd, MMM yyyy';

    if(lang === 'en' )
      format = 'MMM, ddd yyyy';

    return format
  }


  public getMonthViewDayHeader(date:Date){
    let lang = this.translate.currentLang;
    let days = ["D","L", "M", "X", "J", "V", "S"]
    if(lang === 'ca'){
      days = ["DG","DL", "DT", "DC", "DJ", "DV", "DS"]
    }else if(lang === 'en')
      days =  ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    let num = date.getDay()
    return days[num]
  }

  public formatSelectedDate(date){
    if(date){
      let day = this.transformDate(date, this.getformatSelectedDate());
      //console.log("selected Day", day);
      return day[0].toUpperCase() + day.slice(1);
    }
  }
  public getformatSelectedDate(){
    let lang =  this.translate.currentLang;
    let format = 'EEEE, d MMMM'
    if(lang === 'en' )
      format = 'MMMM d, EEEE';
    return format;
  }

  public getLocale(){
    let lang =  this.translate.currentLang;
    let locale = 'es-ES'
    if(lang === 'ca'){
      locale = 'ca-ES'
    }else if(lang === 'en')
      locale = 'en-US';

    return locale;

  }

  public getStartingDayWeek(){
    let lang =  this.translate.currentLang;
    let day = '1'
    if(lang == 'en')
      day = '0'

    return day;
  }


  public getStartingDayMonth(){
    let lang =  this.translate.currentLang;
    let day = '1'
    if(lang == 'en')
      day = '0'

    return day;
  }

  'dd/MM/y'

  public ddMMy(){
    let lang =  this.translate.currentLang;
    let format = 'dd/MM/y'

    if(lang === 'en' )
      format = 'MM/dd/y';

    return format;
  }

  public getShortDateFormat(){
    let lang =  this.translate.currentLang;
    let format = 'DD/MM/YY'

    if(lang === 'en' )
      format = 'MM/DD/YY';

    return format;
  }

  public ddMMyyyyFormat(date){
    let lang =  this.translate.currentLang;
    let format = 'dd/MM/yyyy';

    if(lang === 'en' )
      format = 'MM/dd/yyyy';

    let day = this.transformDate(date, format);
    return day[0].toUpperCase() + day.slice(1);
  }

  public ddMMyFormat(date){
    let lang =  this.translate.currentLang;
    let format = 'dd MMM y';

    if(lang === 'en' )
      format = 'MMM dd y';

      let day = this.transformDate(date, format);
      return day[0].toUpperCase() + day.slice(1);
  }

  public ddMMyEuroFormat(date){
    let format = 'dd MMM y';
    let day = this.transformDate(date, format);
    return day[0].toUpperCase() + day.slice(1);
  }

  public ddMMMyyyformat(date){
    let lang =  this.translate.currentLang;
    let format = 'dd MMM yyy';

    if(lang === 'en')
      format = 'MMM dd yyy';

      let day = this.transformDate(date, format);
      return day[0].toUpperCase() + day.slice(1)

  }

  public MMMMyyyyFormat(date){

    let format ='MMMM yyyy';

    let day = this.transformDate(date, format);
    return day[0].toUpperCase() + day.slice(1);
  }

  public getDayMonthYearFormat(date){
    let lang =  this.translate.currentLang;
    let format = 'EEEE, d MMMM YYYY';

    if(lang === 'en' )
      format = 'MMMM, d EEEE YYYY';

      let day = this.transformDate(date, format);
      return day[0].toUpperCase() + day.slice(1);
  }

  public selectedDateFormat(date:string){

    let lang =  this.translate.currentLang;
    let format = 'EEEE, d MMMM'

    if(lang === 'en' )
      format = 'MMMM d, YYYY';

    let day = this.transformDate(date, format);
    return day[0].toUpperCase() + day.slice(1);
  }

  public selectedDateFormat2(date:string){

  let lang =  this.translate.currentLang;
  let format = 'EEEE, d MMM yyyy';

  if(lang === 'en' )
    format = 'MMM, ddd yyyy';

    let day = this.transformDate(date, format);
    return day[0].toUpperCase() + day.slice(1);
  }




  ddMMyyyyHHmm(date){
    let lang =  this.translate.currentLang;
    let format = 'dd/MM/yyyy HH:mm'
    if(lang === 'en')
      format =  'MM/dd/yyyy hh:mm a';

      let day = this.transformDate(date, format);
      return day[0].toUpperCase() + day.slice(1)
  }


  public formatDateLongFormat(date?){

    if(date){
      let day = this.transformDate(date, this.getLongDateFormat());
      return day[0].toUpperCase() + day.slice(1);
    }

  }

  public yyyyMMddHHmm(date?){

    if(date){
      let day = this.transformDate(date, this.yyyyMMddHHmmFormat());
      console.log("selected Day", day);
      return day[0].toUpperCase() + day.slice(1);
    }

  }

  yyyyMMddHHmmFormat(){
    let lang =  this.translate.currentLang;
    let format = 'yyyy-dd-MM HH:mm';

    if(lang === 'en' )
      format = 'yyyy-MM-dd HH:mm a';

    return format;

  }


  public getLongDateFormat(){
    let lang =  this.translate.currentLang;
    let format =  'EEEE, d MMMM yyyy, HH:mm';

    if(lang === 'en' )
      format = 'MMMM, d yyyy, hh:mm a';

    return format;

  }
  public getDatetimeControlFormat(){
    let lang =  this.translate.currentLang;
    let format = 'D MMM YYYY HH:mm'

    if(lang === 'en' )
      format = 'MMM D YY hh:mm a';

      return format;

  }

  public getDayMonthFormat(){
    let lang =  this.translate.currentLang;
    let format = 'd MMM';

    if(lang === 'en' )
      format = 'MMM d';

      return format;

  }

  public getDayDotMonthFormat(){
    let lang =  this.translate.currentLang;
    let format = 'd. MMM';

    if(lang === 'en' )
      format = 'MMM. d';

      return format;

  }

  public getSelectedWeek(date:string){

    let lang =  this.translate.currentLang;
    let format = 'E d MMM'

    if(lang === 'en' )
      format = 'MMM d, E';

    let day = this.transformDate(date, format);
    return day[0].toUpperCase() + day.slice(1);
  }

  public getSelectedWeekFullDay(date:string){

    let lang =  this.translate.currentLang;
    let format = 'EEE d MMM'

    if(lang === 'en' )
      format = 'MMM d, EEE';

    let day = this.transformDate(date, format);
    return day[0].toUpperCase() + day.slice(1);
  }

  public formatDate(date?){
    if(date){
      date = new Date(date)

      if(this.isToday(date))
        return this.datePipe.transform(date,  this.getTimeFormat())
      else{
        let format = this.getDateFormat2()
        return this.transformDate(date, format)
      }

    }
  }

  public getFormatTime(date){
    if(date){
      date = new Date(date)
      return this.datePipe.transform(date,  this.getTimeFormat2())
    }
  }


  ddMMyyyy(date){
    let lang =  this.translate.currentLang;
    let format = 'dd-MM-yyyy'
    if(lang === 'en')
      format = 'MM-dd-yyyy';

      let day = this.transformDate(date, format);
      return day[0].toUpperCase() + day.slice(1)
  }

  highchartsDatesFornmat(){

  let lang =  this.translate.currentLang;
    let format = {};
  if(lang == 'en'){
      // %b: Short month, like 'Jan',%e Day of the month, 1 through 31
      format = {
        millisecond: '%H:%M:%S.%L',
        second: '%l:%M:%S %P',
        minute: '%l:%M %p',
        hour: '%l:%M %p',
        day: '%b. %e',
        week: '%b. %e',
        month: '%b \'%y',
        year: '%Y'
      }
    }else{
      format = {
        millisecond: '%H:%M:%S.%L',
        second: '%H:%M:%S',
        minute: '%H:%M',
        hour: '%H:%M',
        day: '%e. %b',
        week: '%e. %b',
        month: '%b \'%y',
        year: '%Y'
    }
    }
   return format;
  }

  yyyyMMddFormat(date){
    console.log("DATE date: ", date);
    let lang =  this.translate.currentLang;
    console.log("DATE lang: ", lang);
    let format = 'yyyy-MM-dd';

    if(lang == 'en')
      format = 'yyyy-dd-MM';

    console.log("DATE format: ", format);

    let day = this.transformDate(date, format);

    console.log("DATE day: ", day);

    return day[0].toUpperCase() + day.slice(1)
  }

  convert12to24format(time){

    console.log("TIME 12to24: ",time);
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if(AMPM == "PM" && hours<12) hours = hours+12;
    if(AMPM == "AM" && hours==12) hours = hours-12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if(hours<10) sHours = "0" + sHours;
    if(minutes<10) sMinutes = "0" + sMinutes;

    let h = sHours + ":" + sMinutes;

    console.log("HOURS: ",h);
    return h;
  }

  format24h(time) {

    console.log("ENTRO  " +  time)
    let lang =  this.translate.currentLang;
    if(lang === 'en'){
      // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
    }

    console.log(time);
    
    return time;

  }

  isAmericanFormat(){
    return this.translate.currentLang === 'en';
  }

  getTimeFormat(){
    let lang =  this.translate.currentLang;
    let format =  'HH:mm'

    if(lang === 'en' )
      format =  'hh:mm a';

    return format;
  }

  getTimeFormat2(){
    let format =  'HH:mm'
    return format;
  }

  isToday(mDate: Date){
    let date = new Date()
    if(date.getDate() === mDate.getDate() && date.getMonth() === mDate.getMonth() && date.getFullYear() === mDate.getFullYear())
      return true
    return false
  }

  transformDate(date, format) {
    const datePipe: DatePipe = new DatePipe(this.getLocale());
    return datePipe.transform(date, format);
  }

  getCalendarDay(epoch: number): string {
    if (!epoch) {
      return null;
    }
    let timeString = 'h:mm A';
    const today = this.translate.instant('agenda.today');
    const yesterday = this.translate.instant('agenda.yesterday');
    return moment(epoch).calendar(null, {
      sameDay: `[${today}] ` + timeString,
      lastDay: `[${yesterday}] ` + timeString,
      lastWeek : 'DD/MM/YY ' + timeString,
      sameElse: 'DD/MM/YY ' + timeString,
      nextDay : 'DD/MM/YY ' + timeString,
    });
  }

  getCalendarDay2(epoch: number): string {
    if (!epoch) {
      return null;
    }
    let timeString = this.getTimeFormat();
    let dateString = this.getShortDateFormat();
    const today = this.translate.instant('agenda.today');
    const yesterday = this.translate.instant('agenda.yesterday');
    return moment(epoch).calendar(null, {
      sameDay: `[${today}]  `  + timeString,
      lastDay: `[${yesterday}]  ` + timeString,
      sameElse: dateString + ' ' + timeString,
      lastWeek : dateString + ' ' + timeString,
      nextDay : dateString + ' ' + timeString
    });
  }


  getCalendarDayTime(epoch: number): string {
    if (!epoch) {
      return null;
    }
    let timeString = this.getTimeFormat();
    let dateString = this.getLongFormat();
    let lang =  this.translate.currentLang;
    const today = this.translate.instant('agenda.today');
    const yesterday = this.translate.instant('agenda.yesterday');
    const to = this.translate.instant('agenda.to');

    const  m = moment
    m.locale(lang)
    return m(epoch).calendar(null, {
      sameDay: `[${today}]  `  + `[${to}]  ` + timeString,
      lastDay: `[${yesterday}]  ` + `[${to}]  ` + timeString,
      sameElse: dateString + ' ' + `[${to}]  ` + timeString,
      lastWeek: dateString + ' ' + `[${to}]  ` + timeString,
      nextDay : dateString + ' ' + `[${to}]  ` + timeString
    })
  }

  // return epoch string as specified format
  formatEpoch(epoch): string {
    return this.getCalendarDay(epoch);
  }

  getToday(){
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    let date = localISOTime// this.dateService.selectedDateFormat(localISOTime);
    return date
  }

  getCurrentTime(){
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    let date = localISOTime// this.dateService.selectedDateFormat(localISOTime);
    return new Date(Date.now() - tzoffset).getTime().toLocaleString();
  }


}
