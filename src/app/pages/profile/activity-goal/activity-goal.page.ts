import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as HighCharts from 'highcharts';
import { element } from 'protractor';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RolesService } from 'src/app/services/roles.service';
import { ReminderAddPage } from '../../agenda/reminder-add/reminder-add.page';
import { ElementsAddPage } from '../../tracking/elements-add/elements-add.page';

export interface serie {
  name: string,
  type?: string,
  colorKey?: string,
  pointWidth?: number,
  colorByPoint?: boolean,
  color?: string,
  data: Array<any>,
  lineWidth?: number,
  marker?: {
    radius: number
  }
}
export interface Interval {
  interval?: string,
  from_date?: string,
  to_date?: string,
}
@Component({
  selector: 'app-activity-goal',
  templateUrl: './activity-goal.page.html',
  styleUrls: ['./activity-goal.page.scss'],
})
export class ActivityGoalPage implements OnInit {
  series: any[] = []
  last_value:any
  isDiastoleAndSystole:boolean
  es = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado']
  ca = ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte']
  private id;
  viewTitle = ''
  normalValue = []
  outRangeValue= []
  dangerValue= []
  description
  graphics = []
  header = ''
  values = []
  goals = [];
  ranges = [];
  valuesChart: any;
  isLoading = true;
  graphValues: any;
  graphDates: any;
  private title: any;
  units: any = [];
  graphData = [];
  interval: Interval;
  min: Date = new Date();
  max: Date = new Date();
  curr: Date = new Date();
  segmentFilter = "1d";
  times = []
  typeChart
  minY = 0
  maxY = 0
  constructor(
    private dooleService: DooleService,
    private languageService: LanguageService,
    private modalCtrl: ModalController,
    private translate : TranslateService,
    private notification: NotificationService,
    public role: RolesService
  ) { }

  ngOnInit() {
    this.id = history.state.id;
    this.header = history.state.header;
    console.log('[ActivityGoalPage] ngOnInit()', this.id); 
    //this.loadData('1m');
    this.viewTitle = this.formatSelectedDate(this.min, 'EEEE, d MMMM')
  }

  ionViewDidEnter() {
    if (this.id){
      this.interval = {
        from_date: this.formatSelectedDate(this.min,'yyyy/MM/dd'), 
        to_date: this.formatSelectedDate(this.min,'yyyy/MM/dd')
      }
      this.loadData(this.interval);
    }
  }

  setLocale(){
    return this.languageService.getCurrent();
  }

  async loadData(params) {
    console.log('[ActivityGoalPage] loadData()', params); 
    const interval = params.interval
    this.isLoading = true
    let vArray = [];
    let dArray = [];
    let numDay = 0;
    this.normalValue = [];
    this.outRangeValue = [];
    this.dangerValue = [];
    this.ranges = [];
    this.series = []


    this.dooleService.getAPIelementID(this.id, params).subscribe(async json => {
      console.log('[ActivityGoalPage] loadData()', await json);
      this.isDiastoleAndSystole = json?.isDiastoleAndSystole
      if(json?.isDiastoleAndSystole){
        this.goals = []
        this.ranges = [];
        //this.header =   json?.blood_pressure_systolic.name +'/'+ json?.blood_pressure_diastolic.name
        this.units = json?.blood_pressure_systolic?.units;
        this.last_value = {value: (json?.blood_pressure_systolic.values[0]?.value)? json?.blood_pressure_systolic.values[0]?.value +'/'+ json?.blood_pressure_diastolic.values[0]?.value: undefined, 
                            date: json?.blood_pressure_diastolic.values[0]?.date_value}
        this.getdataElement(json?.blood_pressure_systolic, '#d12f96')
        this.getdataElement(json?.blood_pressure_diastolic, '#009cb3')
        this.getGoals(json?.blood_pressure_systolic)
        this.getGoals(json?.blood_pressure_diastolic)
        this.getMinMaxValues()
        this.getRanges(json?.blood_pressure_systolic, this.minY, this.maxY)
        this.getRanges(json?.blood_pressure_diastolic, this.minY, this.maxY)
        this.generateMuiltiChart()
      }
      else{
        this.title = json.name;
        this.description = json?.description;
        this.units = json.units;
        this.values = json.values;
        const index = json?.values?.length >0 ? json?.values?.length-1:0
        this.last_value = {value: json?.values[index]?.value, date: json?.values[index]?.date_value}
        this.goals = json.goals;
        this.graphData = [];
        var min = null, max = null;
        min =0; max = 300
        this.values = this.filterDate(this.values)
        numDay = this.returnNumDays(this.values)
    
        this.values.forEach(element => {
          if (min == null || min > element.value)
            min = element.value;
    
          if (max == null || max < element.value)
            max = element.value;
    
          vArray.push(element.value);
          var mydate = new Date(element.date);
          var d = mydate.getDate();
          var m = mydate.getMonth();
          m += 1;  // JavaScript months are 0-11
          var y = mydate.getFullYear();
          element.date = d + "-" + m + "-" + y;
          var k = [];
    
          if(interval == '1d'){
            this.typeChart = 'category'
            let time = element.date_value?.split(' ')[1]
            let hour = time?.split(':')[0]+':'+time?.split(':')[1]
            console.log('[ActivityGoalPage] loadData() 1d element', element);
            k.push(hour);
          }
          else if(interval == '1w'){
            this.typeChart = 'category'
            let date = this.formatSelectedDate2(element.date_value, 'd MMM')
            k.push(date);
          }
          else if(this.values.length >= 1 && this.values.length < 4 || numDay<4){
            this.typeChart = 'category'
            let date = this.formatSelectedDate2(element.date_value, 'd. MMM')
            k.push(date);
          }
          else{
            this.typeChart = 'datetime'
            k.push(element.timestamp * 1000);
          }
          k.push(element.valueNumeric);
          this.graphData.push(k);
          dArray.push(y + "-" + m + "-" + d + " " + element.time);
          console.log('[ActivityGoalPage] loadData() graphData', this.graphData, k);
        });
    
        this.minY = Math.min.apply(null,vArray)
        this.minY = (this.minY)?(this.minY - this.minY/50):0
        min = this.minY
        max = Math.max.apply(null,vArray)
        max = (max)? (max+max/2): 0
    
        this.getRanges(json, min, max)
    
        this.graphValues = vArray;
        this.graphDates = dArray;
        this.values = this.values.reverse();
    
        console.log(this.graphData)
        this.generateChart();
  
      }
      this.isLoading = false
    }, error => {
      this.isLoading = false
      alert("error");
    },()=>{
      this.isLoading = false
    });
  }

  returnNumDays(values){
    let newDate = ''
    let count = 0;
    let numDay = 0;

    for(let i = 0 ; i < values.length; i ++){
      let date = values[i].date.split(' ')[0]
      if(newDate ===  date){
        count++
      }else{
        numDay++
        console.log(`[ActivityGoalPage] returnNumDays() newDate ${newDate} count ${numDay}`)
      }
      newDate =  date
      if(numDay > 3) 
        break;
    }
    return numDay
  }

  getMinMaxValues(){
    let min = 0,  max = 0
    this.series.forEach((value, index) => {
      if(value?.data?.length > 0){
        min = Math.min.apply(null,value.data)
        min = (this.minY)?(this.minY - this.minY/50):0

        max = Math.max.apply(null,value.data)
        max = (max)? (max+max/2): 0

        if(index == 0){
          this.minY = min
          this.maxY = max
        }
        else if(min < this.minY){
          this.minY = min
        }
        else if(max > this.maxY)
          this.maxY = max
      }
    })

  }

  getGoals(element){
    if(this.isDiastoleAndSystole && element?.goals?.length > 0){
      let goalsElement = {
        name: element.name,
        goals: element.goals,
      }
      this.goals.push(goalsElement)
      console.log('[ActivityGoalPage] getGoals()', this.goals);
    }
  }

  getdataElement(json, color?){
    var min = 0, max = 0;
    //min =0; max = 300
    let vArray = [];
    let dArray = [];
    let values = this.filterDate(json.values)
    let numDay = 0;
    values.forEach(element => {
      if (min == null || min > element.value)
        min = element.value;

      if (max == null || max < element.value)
        max = element.value;

      vArray.push(element.value);
      var mydate = new Date(element.date);
      var d = mydate.getDate();
      var m = mydate.getMonth();
      m += 1;  // JavaScript months are 0-11
      var y = mydate.getFullYear();
      element.date = d + "-" + m + "-" + y;
      var k = [];

      if(this.segmentFilter == '1d'){
        this.typeChart = 'category'
        let time = element.date_value?.split(' ')[1]
        let hour = time?.split(':')[0]+':'+time?.split(':')[1]
        console.log('[ActivityGoalPage] loadData() 1d element', element);
        k.push(hour);
      }
      else if(this.segmentFilter == '1w'){
        this.typeChart = 'category'
        let date = this.formatSelectedDate2(element.date_value, 'd MMM')
        k.push(date);
      }
      else if(this.values.length >= 1 && this.values.length < 4 || numDay<4){
        this.typeChart = 'category'
        let date = this.formatSelectedDate2(element.date_value, 'd. MMM')
        k.push(date);
      }
      else{
        this.typeChart = 'datetime'
        k.push(element.timestamp * 1000);
      }

      k.push(element.valueNumeric);
      dArray.push(k);
      //dArray.push(y + "-" + m + "-" + d + " " + element.time);
      console.log('[ActivityGoalPage] loadData() graphData', this.graphData, k);
    });
    let serie:serie = {name: json.name, data: dArray,lineWidth:3}
    if(color)
    serie['color'] = color
    this.series.push(serie)
  }

  getRanges(element, min, max){
    let normalValue = []
    let outRangeValue = []
    let dangerValue = []
    let value = []
    let ranges = element.ranges;

    ranges.forEach(range => {
      var r = [];
      var color;

      if (range.rangeCondition == '>' || range.rangeCondition == '=>') {
        r["from"] = range.value1;
        r["to"] = max;
      }

      if (range.rangeCondition == '<' || range.rangeCondition == '<=') {
        r["from"] = min;
        r["to"] = range.value1;
      }

      if (range.rangeCondition == 'a<x<b') {
        r["from"] = range.value1;
        r["to"] = range.value2;
      }

      if (range.rangeType == "success")
        color = 'rgba(96, 173, 121, 0.1)';
      else if (range.rangeType == "warning")
        color = 'rgba(245, 157, 24, 0.1)'; //'rgb(243, 156, 18, 0.1)'
      else if (range.rangeType == "danger")
        color = 'rgba(245, 46, 24, 0.1)'; //'rgb(231, 76, 60, 0.1)'

      r["color"] = color;

      if(!this.isDiastoleAndSystole)
      this.ranges.push(r);
      value.push(r);
      if (range.rangeType === "success"){
        this.normalValue.push(range.conditionString)
        normalValue.push(range.conditionString)
      }
      else if (range.rangeType == "warning"){
        this.outRangeValue.push(range.conditionString)
        outRangeValue.push(range.conditionString)
      }
      else if (range.rangeType == "danger"){
        this.dangerValue.push(range.conditionString)
        dangerValue.push(range.conditionString)
      }


    });
    if(this.isDiastoleAndSystole && value?.length > 0){
      let rangesElement = {
        name: element.name,
        description: element.description,
        value: value,
        normalValue: normalValue,
        outRangeValue: outRangeValue,
        dangerValue: dangerValue
      }
      this.ranges.push(rangesElement)
      console.log('[ActivityGoalPage] getRanges()', this.ranges);
    }
  }


  generateChart() {
    console.log('[ActivityGoalPage] generateChart()', this.times);
    HighCharts.chart('container', {
      chart: {  
        type: (this.graphData.length > 4)? 'line':'column',  //'line' 'area'
        zoomType: 'x',
            
      },
      title: {
        text: (this.graphData.length == 0)? this.translate.instant('activity_goal.no_data'):null
      },
      xAxis: {
        type:  this.typeChart,
        maxRange: this.min.getTime(),
        tickWidth: 0,
        gridLineWidth: 1
     }, 
      yAxis: {
        min: this.minY,  
        title: {
          text: this.units,
          align: 'high'
        },
        opposite: true,
        plotBands: this.ranges
      },
      rangeSelector: {
        enabled: true
    },

/*       tooltip: {
        valueSuffix: ' millions'
      }, */
      plotOptions: {        
/*         bar: {
          dataLabels: {
            enabled: true
          }
        } */
        series: {
          borderWidth: 1,
          dataLabels: {
            enabled: true,
            format: '{point.y}'
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        type: undefined,
        colorKey: 'colorValue',
        pointWidth: 20,
        colorByPoint: false,
        data: this.graphData,
        name: this.units,
      }]
    });
    
    HighCharts.setOptions({
      lang: {
         /*  months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'], */
          weekdays: (this.setLocale() == 'es')? this.es: this.ca
      }
  });
  }

  filterDate(data) {
    console.log('[ActivityGoalPage] filter()', data);
    switch (this.segmentFilter) {
      case '1d': {
        data = data?.filter( value =>(this.formatDate(value.date_value).getDate() == this.min.getDate() && 
        this.formatDate(value.date_value).getMonth() == this.min.getMonth() && 
        this.formatDate(value.date_value).getFullYear() == this.min.getFullYear() ))
        break;
      }
      case '1w': {
        //console.log('[ActivityGoalPage] filter()', this.min , this.max);
        data = data?.filter( value =>(this.formatDate(value.date_value) >= this.min && this.formatDate(value.date_value) <= this.max || this.getMinWeekFilter(value.date_value)))
        break;
      }
      case '1m': {
        data = data?.filter( value =>(this.formatDate(value.date_value).getMonth() == this.min.getMonth()  && 
        this.formatDate(value.date_value).getFullYear() == this.min.getFullYear()))
        break;
      }
      case '1y': {
        data = data?.filter( value =>(this.formatDate(value.date_value).getFullYear() == this.min.getFullYear() ))
        break;
      }
      default: {
        //statements; 
        data = data?.filter( value =>(this.formatDate(value.date_value) == this.min))
        break;
      }
    }
    console.log('[ActivityGoalPage] filter()', data);
    return data
  }

  generateMuiltiChart() {
    HighCharts.chart('container', {
      chart: {  
        type: (this.series[0]?.data?.length > 4)? 'line':'column',
        zoomType: 'x',          
      },
      title: {
        text: (this.series[0]?.data?.length == 0)? this.translate.instant('activity_goal.no_data'):null
      },
      xAxis: {
         type:  this.typeChart,
         maxRange: this.min.getTime(),
         //tickInterval: 7 * 24 * 3600 * 1000, // one week
         tickWidth: 0,
         gridLineWidth: 1
      },   
      yAxis: {
        min: this.minY,  
        title: {
          text: this.units,
          align: 'high'
        },
        opposite: true,
        plotBands: this.ranges
      },
      rangeSelector: {
        enabled: true
    },

/*       tooltip: {
        valueSuffix: ' millions'
      }, */
      plotOptions: {        
/*         bar: {
          dataLabels: {
            enabled: true
          }
        } */
        series: {
          borderWidth: 1,
          dataLabels: {
            enabled: true,
            format: '{point.y}'
          }
        }
      },
      legend: {
        align: 'left',
        verticalAlign: 'bottom',
        borderWidth: 0
      },
      credits: {
        enabled: false
      },
      series: this.series
    });
    
    HighCharts.setOptions({
      lang: {
         /*  months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'], */
          weekdays: (this.setLocale() == 'es')? this.es: this.ca
      }
  });
  }

  getMinWeekFilter(value){
    if(this.formatDate(value).getDate() == this.min.getDate() && 
    this.formatDate(value).getMonth() == this.min.getMonth() && 
    this.formatDate(value).getFullYear() == this.min.getFullYear()) 
      return true
    return false
  }

  segmentChanged(event) {
    switch (this.segmentFilter) {
      case '1d': {
        if(event.type === "ionChange"){
          this.max = new Date()
          this.max.setDate(new Date().getDate() + 1)
        }
        this.lastDay()
        break;
      }
      case '1w': {
        if(event.type === "ionChange")
        this.max = new Date()
        this.lasWeek();
        break;
      }
      case '1m': {
        if(event.type === "ionChange"){
          this.max = new Date()
          this.max.setMonth(new Date().getMonth() + 1)
        }
        this.lastMonth();
        break;
      }
      case '1y': {
        if(event.type === "ionChange"){
          this.max = new Date()
          this.max.setFullYear(new Date().getFullYear() + 1)
        }
        this.fullYear();
        break;
      }
      default: {
        //statements; 
        break;
      }
    }

    this.interval = {
      from_date: this.formatSelectedDate(this.min,'yyyy/MM/dd'), 
      to_date: this.formatSelectedDate(this.max,'yyyy/MM/dd')
    }
    this.loadData(this.interval);
  }

  setMaxDate(){
    let now = new Date()
    this.max.setDate(new Date().getDate() + 1)
    this.max.setMonth(new Date().getMonth() + 1)
    this.max.setFullYear(new Date().getFullYear() + 1)
  }

  formatDate(d) {
    //let date = new Date(d.split(' ')[0]);
    var auxdate = d.split(' ')
    d = d.replace(' ', 'T')
    let date0 = new Date(d).toUTCString();
    let date = new Date(date0);

    let time = auxdate[1];
    date.setHours(time.substring(0, 2));
    date.setMinutes(time.substring(3, 5));
    return date;
  }

  lastDay(){
    let now = this.max
    now.setDate(this.max.getDate() - 1);
    this.min = now;
    this.viewTitle = this.formatSelectedDate(this.min, 'EEEE, d MMMM')
  }

  lasWeek() {
    let numDay = this.max.getDay()
    if(numDay == 0) numDay = 7
    let now = this.max.getDate() - (numDay - 1)
    let curr = new Date(this.max)
    curr.setDate(now)
    this.min = new Date(curr)
    console.log('[ActivityGoalPage] lasWeek() next()', this.max , this.min);
    if(this.min.getDate() == this.max.getDate() && this.min.getMonth() == this.max.getMonth()){
      this.min.setHours(0)
      this.viewTitle = `${this.formatSelectedDate(this.min, 'E d MMM') }`
    }
    else
    this.viewTitle = `${this.formatSelectedDate(this.min, 'E d MMM')} - ${this.formatSelectedDate(this.max, 'EEE d MMM')}`
  }

  lastMonth() {
    let now = this.max //new Date();
    now.setMonth(this.max.getMonth() - 1);
    this.min = now;
    this.viewTitle = this.formatSelectedDate(this.min, 'MMMM yyyy')
  }

  fullYear() {  
    let now = this.max //new Date();
    now.setFullYear(this.max.getFullYear() - 1);
    this.min = now;
    this.viewTitle = this.formatSelectedDate(this.min, 'yyyy')
  }

  formatSelectedDate(date, format){
    let language = this.languageService.getCurrent();
    const datePipe: DatePipe = new DatePipe(language);
    return datePipe.transform(date, format);
  }

  formatSelectedDate2(d, format){
    var auxdate = d.split(' ')
    // let date = new Date(auxdate[0]);
    d = d.replace(' ', 'T')
    let date0 = new Date(d).toUTCString();
    let date = new Date(date0);
    let time = auxdate[1];
    date.setHours(time.substring(0,2));
    date.setMinutes(time.substring(3,5));
    let language = this.languageService.getCurrent();
    const datePipe: DatePipe = new DatePipe('en');
    return datePipe.transform(date, format);
  }

  back(){
    if(this.segmentFilter == '1w'){
      let now =  new Date(this.min)
      now.setDate(this.min.getDate() -1)
      this.max = new Date(now)
    }
    this.segmentChanged(event)
  }

  next(){
    switch (this.segmentFilter) {
      case '1d': {
        let nextDay =  this.max.getDate() + 2
        this.max.setDate(nextDay)
        break;
      }
      case '1w': {

        let now =  new Date(this.max)
        now.setDate(this.max.getDate() + 7)
        this.max = new Date(now)
        console.log('[ActivityGoalPage] lasWeek() next()', this.max , now);
        break;
      }
      case '1m': {
        let nextMonth =  this.max.getMonth() + 2
        this.max.setMonth(nextMonth)
        break;
      }
      case '1y': {
        let nextYear =  this.max.getFullYear() + 2
        this.max.setFullYear(nextYear)
        break;
      }
    }
    this.segmentChanged(event)
  }

  disabledButton(){
    if(this.max >= this.curr)
      return true
    return false
  }

  async addReminder(){
    const modal = await this.modalCtrl.create({
      component: ReminderAddPage,
      componentProps: { typeId: this.id, type: 'Element', titleReminder: this.header},
      cssClass: "modal-custom-class"
    });

    modal.onDidDismiss()
      .then((result) => {

        if(result?.data['error']){
         // let message = this.translate.instant('landing.message_wrong_credentials')
          //this.dooleService.presentAlert(message)
        }
    });

    await modal.present();
   
  }

  async addElement(){
    const modal = await this.modalCtrl.create({
      component:  ElementsAddPage,
      componentProps: { id: this.id, nameElement: this.header, units: this.units },
      //cssClass: "modal-custom-class"
    });
  
    modal.onDidDismiss()
      .then((result) => {
        console.log('addElement()', result);
       
        if(result?.data?.error){
         // let message = this.translate.instant('landing.message_wrong_credentials')
          //this.dooleService.presentAlert(message)
        }else if(result?.data?.action == 'add'){
          this.notification.displayToastSuccessful()
          this.interval = {
            from_date: this.formatSelectedDate(this.min,'yyyy/MM/dd'), 
            to_date: this.formatSelectedDate(this.max,'yyyy/MM/dd')
          }
          this.loadData(this.interval);
        }
      });
  
      await modal.present(); 
    }

}
