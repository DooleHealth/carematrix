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
      console.log("selected Day", day);
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
      locale = 'es-CA'
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
      console.log("selected Day", day);
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
      format = 'MMM D YYYY hh:mm a';

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


  ddMMyyyy(date){
    let lang =  this.translate.currentLang;
    let format = 'dd-MM-yyyy'
    if(lang === 'en')
      format = 'MM-dd-yyyy';

      let day = this.transformDate(date, format);
      return day[0].toUpperCase() + day.slice(1)
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

  format24h(time) {

    let lang =  this.translate.currentLang;
    if(lang === 'en'){
      // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' am' : ' pm'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
    }
    return time;

  }



  getTimeFormat(){
    let lang =  this.translate.currentLang;
    let format =  'HH:mm'

    if(lang === 'en' )
      format =  'hh:mm a';

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

  // return epoch string as specified format
  formatEpoch(epoch): string {
    return this.getCalendarDay(epoch);
  }


}
