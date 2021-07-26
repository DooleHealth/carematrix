import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as HighCharts from 'highcharts';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';
import { ReminderAddPage } from '../../agenda/reminder-add/reminder-add.page';


@Component({
  selector: 'app-activity-goal',
  templateUrl: './activity-goal.page.html',
  styleUrls: ['./activity-goal.page.scss'],
})
export class ActivityGoalPage implements OnInit {
  es = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado']
  ca = ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte']
  private id;
  viewTitle = ''
  normalValue
  description
  graphics = []
  header = []
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
  interval = '';
  min: Date = new Date();
  max: Date = new Date();
  curr: Date = new Date();
  segmentFilter = "1d";
  constructor(
    private dooleService: DooleService,
    private loadingController: LoadingController,
    private languageService: LanguageService,
    private modalCtrl: ModalController,
    private translate : TranslateService,
  ) { }

  ngOnInit() {
    this.id = history.state.id;
    this.header = history.state.header;
    console.log('[ActivityGoalPage] ngOnInit()', this.id); 
    //this.loadData('1m');
    this.viewTitle = this.formatSelectedDate(this.min, 'EEEE, d MMMM')
  }

  ionViewDidEnter() {
    if (this.id)
      this.loadData('1d');
  }

  setLocale(){
    return this.languageService.getCurrent();
  }

  async loadData(interval) {
    console.log('[ActivityGoalPage] loadData()', interval); 
    const loading = await this.loadingController.create();
    await loading.present();
    this.isLoading = true
    let vArray = [];
    let dArray = [];

    this.dooleService.getAPIgraphicsElement(this.id, interval).subscribe(async json => {
      console.log('[ActivityGoalPage] loadData()', await json);
      this.title = json.name;
      this.description = json?.description
      this.units = json.units;
      this.values = json.values;
      this.goals = json.goals;
      this.graphData = [];
      var min = null, max = null;

      this.values = this.filterDate(this.values)

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
        k.push(element.timestamp * 1000);
        k.push(element.valueNumeric);
        this.graphData.push(k);
        dArray.push(y + "-" + m + "-" + d + " " + element.time);
      });

      json.ranges.forEach(range => {
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
          color = 'rgba(245, 157, 24, 0.1)';
        else if (range.rangeType == "danger")
          color = 'rgba(245, 46, 24, 0.1)';

        r["color"] = color;
        this.ranges.push(r);
        if (range.rangeType === "success")
          this.normalValue = range.conditionString
      });

      this.graphValues = vArray;
      this.graphDates = dArray;

      this.values = this.values.reverse();

      
      this.generateChart();
      this.isLoading = false
    }, error => {
      this.isLoading = false
      alert("error");
    },()=>{
      loading.dismiss();
      this.isLoading = false
    });
  }


  generateChart() {
    HighCharts.chart('container', {
      chart: {
        type: (this.graphData.length > 4)? 'line':'column',  //'line' 'area'
        zoomType: 'x',

      },
      title: {
        text: (this.graphData.length == 0)? this.translate.instant('activity_goal.no_data'):null
      },
      xAxis: {
        //categories: ['L', 'M', 'MX', 'J', 'V', 'S', 'D'],
        type: 'datetime',

        maxRange: this.min.getTime()
      },
      yAxis: {
        min: 0,
        title: {
          text: this.units,
          align: 'high'
        },
        opposite: true,
        plotBands: this.ranges
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
        data = data.filter( value =>(this.formatDate(value.date_value).getDate() == this.min.getDate() && 
        this.formatDate(value.date_value).getMonth() == this.min.getMonth() && 
        this.formatDate(value.date_value).getFullYear() == this.min.getFullYear() ))
        break;
      }
      case '1w': {
        data = data.filter( value =>(this.formatDate(value.date_value) >= this.min && this.formatDate(value.date_value) <= this.max ))
        break;
      }
      case '1m': {
        data = data.filter( value =>(this.formatDate(value.date_value).getMonth() == this.min.getMonth()  && 
        this.formatDate(value.date_value).getFullYear() == this.min.getFullYear()))
        break;
      }
      case '1y': {
        data = data.filter( value =>(this.formatDate(value.date_value).getFullYear() == this.min.getFullYear() ))
        break;
      }
      default: {
        //statements; 
        data = data.filter( value =>(this.formatDate(value.date_value) == this.min))
        break;
      }
    }
    console.log('[ActivityGoalPage] filter()', data);
    return data
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
    this.loadData(this.segmentFilter);
  }

  setMaxDate(){
    let now = new Date()
    this.max.setDate(new Date().getDate() + 1)
    this.max.setMonth(new Date().getMonth() + 1)
    this.max.setFullYear(new Date().getFullYear() + 1)
  }

  formatDate(d) {
    let date = new Date(d.split(' ')[0]);
    let time = d[1];
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
    if(this.min.getDate() == this.max.getDate() && this.min.getMonth() == this.max.getMonth())
    this.viewTitle = `${this.formatSelectedDate(this.min, 'E d MMM') }`
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
/*         let nextWeek = this.max.getDate() + 7
        this.max.setDate(nextWeek) */

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
      componentProps: { typeId: this.id, type: 'element', isNewReminder:true },
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

}
