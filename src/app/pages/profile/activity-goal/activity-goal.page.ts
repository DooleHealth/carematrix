import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as HighCharts from 'highcharts';
import { DooleService } from 'src/app/services/doole.service';
//import { ElementsService } from 'src/app/services/elements.service';
import { LanguageService } from 'src/app/services/language.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ReminderAddPage } from '../../agenda/reminder-add/reminder-add.page';
import { ElementsAddPage } from '../../tracking/elements-add/elements-add.page';
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(HighCharts);
import moment from 'moment';
import { HighchartsService } from 'src/app/services/highcharts.service';


export interface graphElement {
  date: string;
  element: [];
  total: number
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
  last_value: any
  isDiastoleAndSystole: boolean

  es = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado']
  ca = ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte']

  private id;
  viewTitle = ''
  normalValue
  outRangeValue
  dangerValue
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
  units: string;
  graphData = [];
  interval: Interval;
  minDate: Date = new Date();
  maxDate: Date = new Date();
  currDate: Date = new Date();
  segmentFilter = "1d";
  times = []
  typeChart
  pointWidth = 20
  minY = 0
  maxY = 0
  minValue = 0
  maxValue = 0
  graphA = []
  valuesA = [];
  datesA = [];
  _firstDay = new Date();
  _lastDay = new Date();
  isCategoriesX = false;
  graphBaseOn: string;
  constructor(
    private dooleService: DooleService,
    private languageService: LanguageService,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private notification: NotificationService,
    private titlecasePipe: TitleCasePipe,
    private highchartsService: HighchartsService,
    //private elementsService: ElementsService,
  ) { }

  ngOnInit() {
    this.id = history.state.id;
    this.header = history.state.header;
    //this.viewTitle = this.formatSelectedDate(this.minDate, 'EEEE d MMMM')
    this.viewTitle = this.titlecasePipe.transform(this.formatSelectedDate(this.minDate, 'EEEE d'))
      + ' de ' + this.titlecasePipe.transform(this.formatSelectedDate(this.minDate, 'MMMM'))
  }

  ionViewDidEnter() {
    if (this.id) {
      this.interval = {
        from_date: this.formatSelectedDate(this.minDate, 'yyyy/MM/dd'),
        to_date: this.formatSelectedDate(this.minDate, 'yyyy/MM/dd'),
        interval: this.segmentFilter
      }
      this.loadData(this.interval);
    }
  }

  setLocale() {
    return this.languageService.getCurrent();
  }

  getIntervalType(interval, opt){
    const key = interval
    if(opt == 1){
      switch (key) {
        case "1d":
          return this.translate.instant('agenda.day')
        case "1w":
          return this.translate.instant('agenda.week')
        case "1m":
          return this.translate.instant('agenda.months')
        case "1y":
          return this.translate.instant('agenda.year')
      }
    }
    else{
      switch (key) {
        case "1d":
          return this.translate.instant('activity_goal.daily')
        case "1w":
          return this.translate.instant('activity_goal.weekly')
        case "1m":
          return this.translate.instant('activity_goal.monthly')
        case "1y":
          return this.translate.instant('activity_goal.yearly')
      }
    }

  }

  replaceValue(value){
    if(value)   //(''+value).replaceAll(".",",")
    return (''+value).split(".").join(",")
    else return value
  }

  async loadData(params) {
    // // console.log('[ActivityGoalPage] loadData()', params);
    this.isCategoriesX = false;
    this.pointWidth = 20
    this.isLoading = true

    this.normalValue = [];
    this.outRangeValue = [];
    this.dangerValue = [];
    this.ranges = [];
    this.series = [];
    params['version'] = 'v2'

    this.dooleService.getAPIelementID(this.id, params).subscribe(async json => {
      console.log('[ActivityGoalPage] loadData()', await json);
      this.isDiastoleAndSystole = json?.isDiastoleAndSystole
      this.graphBaseOn = json?.graphBaseOn
      if (json?.isDiastoleAndSystole) {
        this.goals = []
        this.ranges = [];
        this.units = json?.blood_pressure_systolic?.units;
        this.last_value = {
          value: (json?.blood_pressure_systolic?.computed_value?.value) ? json?.blood_pressure_systolic?.computed_value?.value + '/' + json?.blood_pressure_diastolic?.computed_value?.value : undefined,
          base_on: json?.blood_pressure_diastolic?.computed_value?.base_on_string
        }
        this.getdataElement(json?.blood_pressure_systolic, '#d12f96')
        this.getdataElement(json?.blood_pressure_diastolic, '#009cb3')
        this.getGoals(json?.blood_pressure_systolic)
        this.getGoals(json?.blood_pressure_diastolic)

        this.minY = this.highchartsService.setMinY( this.series[0].data, this.series[1].data);
        this.maxY = this.highchartsService.setMaxY( this.series[0].data, this.series[1].data);
        this.setRangesElement(json?.blood_pressure_systolic, json?.blood_pressure_diastolic, this.minY, this.maxY)
        this.generateMuiltiChart()
      }
      else{
        this.setDataElements(json, params)
      }

      this.isLoading = false
    }, error => {
      this.isLoading = false
      alert("error");
    }, () => {
      this.isLoading = false
    });
  }

  setDataElements(json, params){
    this.title = json.name;
    this.description = json?.description;
    this.units = json.units;
    this.values = json.values;
    this.last_value = { value: json?.computed_value?.value, base_on: json?.computed_value?.base_on_string }
    this.goals = json.goals;
    this.minValue = json.min;
    this.maxValue = Number(json.max);
    this.highchartsService.extraTooltip = this.viewTitle;
    if(this.values.length > 0)
    this.setOptionsGraph(json, params)
  }

  setOptionsGraph(json, params){
    let opt = json?.graphBaseOn
    let interval = params.interval
    let name = json?.name
    let valuesA = [];
    let valuesB = [];
    let datesA = [];
    let graphData = [];
    let typeChart = ''

    //console.log("values: ", json.values);
    const data = this.highchartsService.getGroupedData(json, interval);
    //console.log("values graphData: ", data);
    graphData = data.graphData
    valuesA = data.valuesA
    valuesB = data.valuesB
    datesA = data.dates

    this.minY = this.highchartsService.setMinY(valuesA, valuesB);
    this.maxY = this.highchartsService.setMaxY(valuesA, valuesB);

    let min = this.minY < this.minValue ? this.minY : this.minValue;
    //let max = this.maxY > this.maxValue ? this.maxY : this.maxValue
    //Sólo para HPC no quieren el máximo del elemnto
    let max = (this.maxY == 0)? this.maxY+1:this.maxY
    console.log("values graphData max: ", max);
    min = min < 0? min: 0
    this.setRangesElement(json, undefined, min, max)

    this.graphValues = valuesA;
    this.graphDates = datesA;
    this.graphData = graphData;
    this.values = valuesA;

    this.pointWidth = this.highchartsService.setPointWidth(interval)

    console.log("* values: ", this.graphValues);
    console.log("* dates: ", this.graphDates);
    console.log("* graphic: ", this.graphData);

    switch (opt) {
      case 'range':
        typeChart = 'arearange'
        break;
      case 'sum':
      case 'avg':
      case 'lasValue':
      default:
        typeChart = 'category'
        break;
    }

    let title = (this.graphData.length == 0) ? this.translate.instant('activity_goal.no_data') : null;
    this.highchartsService.setTitle(title)
    this.highchartsService.setUnits(this.units)
    //this.highchartsService.setScrollMinWidth(interval)
    this.highchartsService.setXAxis(typeChart, this.graphDates)
    this.highchartsService.setYAxis(min, null, this.ranges, this.units)
    this.highchartsService.setSeries(name, this.graphData, this.pointWidth)
    let options =  this.highchartsService.getOptionsChart(this.graphBaseOn)
    //HighCharts.setOptions(options)
    HighCharts.chart('container',options)
  }

  setOptionsMultiGraph(jsonA,jsonB, params){
    let opt = jsonA?.graphBaseOn
    let interval = params.interval
    let typeChart = ''
    let valuesA = [];
    let valuesB = [];
    let serieA = [];
    let serieB = [];

    const dataA = this.highchartsService.getGroupedData(jsonA, interval);
    const dataB = this.highchartsService.getGroupedData(jsonB, interval);
  }

  getGoals(element) {
    if (this.isDiastoleAndSystole && element?.goals?.length > 0) {
      let goalsElement = {
        name: element.name,
        goals: element.goals,
      }
      this.goals.push(goalsElement)
      // // console.log('[ActivityGoalPage] getGoals()', this.goals);
    }
  }

  getdataElement(json, color?) {
    var min = 0, max = 0;
    //min =0; max = 300
    let vArray = [];
    let dArray = [];
    let values = json.values
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

      if (this.segmentFilter == '1d') {
        this.typeChart = 'category'
        let time = element.date_value?.split(' ')[1]
        let hour = time?.split(':')[0] + ':' + time?.split(':')[1]
        // // console.log('[ActivityGoalPage] loadData() 1d element', element);
        k.push(hour);
      }
      else if (this.segmentFilter == '1w') {
        this.typeChart = 'category'
        let date = this.formatSelectedDate2(element.date_value, 'd MMM')
        k.push(date);
      }
      else if (this.values.length >= 1 && this.values.length < 4 || numDay < 4) {
        this.typeChart = 'category'
        let date = this.formatSelectedDate2(element.date_value, 'd. MMM')
        k.push(date);
      }
      else {
        this.typeChart = 'datetime'
        k.push(element.timestamp * 1000);
      }

      k.push(element.valueNumeric);
      dArray.push(k);
      //dArray.push(y + "-" + m + "-" + d + " " + element.time);
      // // console.log('[ActivityGoalPage] loadData() graphData', this.graphData, k);
    });
    let serie = { name: json.name, data: dArray, lineWidth: 3 }
    if (color)
      serie['color'] = color
    this.series.push(serie)
  }

  setRangesElement(elementA, elementB, min, max){
    this.normalValue = [];
    this.outRangeValue = [];
    this.dangerValue = [];
    this.ranges = [];
    if(this.isDiastoleAndSystole && elementB){
      const rangesElementA = this.highchartsService.getRanges(elementA, min, max)
      const rangesElementB = this.highchartsService.getRanges(elementB, min, max)
      if(rangesElementA)
      this.ranges.push(rangesElementA)
      if(rangesElementB)
      this.ranges.push(rangesElementB)
    }
    else{
      const rangesElementA = this.highchartsService.getRanges(elementA, min, max)
      if(rangesElementA){
        this.ranges = rangesElementA.value
        this.normalValue = rangesElementA.normalValue
        this.outRangeValue = rangesElementA.outRangeValue
        this.dangerValue = rangesElementA.dangerValue
      }
    }
  }

  // setRanges(){
  //   this.normalValue = [];
  //   this.outRangeValue = [];
  //   this.dangerValue = [];
  //   this.ranges = [];
  //   const rangesElementA = this.highchartsService.ranges
  //     if(rangesElementA){
  //       this.ranges = rangesElementA.value
  //       this.normalValue = rangesElementA.normalValue
  //       this.outRangeValue = rangesElementA.outRangeValue
  //       this.dangerValue = rangesElementA.dangerValue
  //     }
  // }

  generateMuiltiChart() {
    HighCharts.chart('container', {
      chart: {
        type: (this.series[0]?.data?.length > 4) ? 'line' : 'column',
        zoomType: 'x',
      },
      title: {
        text: (this.series[0]?.data?.length == 0) ? this.translate.instant('activity_goal.no_data') : null
      },
      xAxis: {
        type: this.typeChart,
        maxRange: this.minDate.getTime(),
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

      tooltip: {
              valueSuffix: ' '+this.units
            },
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
        weekdays: (this.setLocale() == 'es') ? this.es : this.ca
      }
    });
  }

  segmentChanged(event) {
    switch (this.segmentFilter) {
      case '1d': {
        if (event.type === "ionChange") {
          this.maxDate = new Date()
          this.maxDate.setDate(new Date().getDate() + 1)
        }
        this.lastDay()
        break;
      }
      case '1w': {
        if (event.type === "ionChange")
          this.maxDate = new Date()
        this.lasWeek();
        break;
      }
      case '1m': {
        if (event.type === "ionChange") {
          this.maxDate = new Date()
          this.maxDate.setMonth(new Date().getMonth() + 1)
        }
        this.lastMonth();
        break;
      }
      case '1y': {
        if (event.type === "ionChange") {
          this.maxDate = new Date()
          this.maxDate.setFullYear(new Date().getFullYear() + 1)
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
      from_date: this.formatSelectedDate(this._firstDay, 'yyyy/MM/dd'),
      to_date: this.formatSelectedDate(this._lastDay, 'yyyy/MM/dd'),
      interval: this.segmentFilter
    }
    // // console.log('[ActivityGoalPage] segmentChanged() this.interval ', this.interval);
    this.loadData(this.interval);
  }

  setMaxDate() {
    let now = new Date()
    this.maxDate.setDate(new Date().getDate() + 1)
    this.maxDate.setMonth(new Date().getMonth() + 1)
    this.maxDate.setFullYear(new Date().getFullYear() + 1)
  }

  // formatDate(d) {
  //   //let date = new Date(d.split(' ')[0]);
  //   var auxdate = d.split(' ')
  //   d = d.replace(' ', 'T')
  //   let date0 = new Date(d).toUTCString();
  //   let date = new Date(date0);

  //   let time = auxdate[1];
  //   date.setHours(time.substring(0, 2));
  //   date.setMinutes(time.substring(3, 5));
  //   return date;
  // }

  lastDay() {
    let now = this.maxDate
    now.setDate(this.maxDate.getDate() - 1);
    this.minDate = now;
    this.viewTitle = this.titlecasePipe.transform(this.formatSelectedDate(this.minDate, 'EEEE d')) + ' de ' +
      this.titlecasePipe.transform(this.formatSelectedDate(this.minDate, 'MMMM'))

    this._firstDay = this.minDate
    this._lastDay = this.minDate
  }

  lasWeek() {
    let numDay = this.maxDate.getDay()
    if (numDay == 0) numDay = 7
    let now = this.maxDate.getDate() - (numDay - 1)
    let curr = new Date(this.maxDate)
    curr.setDate(now)
    this.minDate = new Date(curr)
    // // console.log('[ActivityGoalPage] lasWeek() next()', this.maxDate , this.minDate);
    if (this.minDate.getDate() == this.maxDate.getDate() && this.minDate.getMonth() == this.maxDate.getMonth()) {
      this.minDate.setHours(0)
      const nextDay = this.maxDate.getDate() + (7 - this.maxDate.getDay())
      let newDate = this.maxDate.setDate(nextDay)
      this.viewTitle = this.titlecasePipe.transform(`${this.formatSelectedDate(this.minDate, 'E d/M')} - ${this.formatSelectedDate(newDate, 'EEE d/M')}`)
    }
    else {
      this.viewTitle = this.titlecasePipe.transform(`${this.formatSelectedDate(this.minDate, 'E d/M')} - ${this.formatSelectedDate(this.maxDate, 'EEE d/M')}`)
    }
    this._firstDay = this.minDate
    this._lastDay = this.maxDate
  }

  lastMonth() {
    let now = this.maxDate //new Date();
    now.setMonth(this.maxDate.getMonth() - 1);
    this.minDate = now;
    this.viewTitle = this.titlecasePipe.transform(this.formatSelectedDate(this.minDate, 'MMMM yyyy'))

    var y = this.minDate.getFullYear(), m = this.minDate.getMonth();
    this._firstDay = new Date(y, m, 1);
    this._lastDay = new Date(y, m + 1, 0);
  }

  fullYear() {
    let now = this.maxDate //new Date();
    now.setFullYear(this.maxDate.getFullYear() - 1);
    this.minDate = now;
    this.viewTitle = this.formatSelectedDate(this.minDate, 'yyyy')

    var y = this.minDate.getFullYear()
    this._firstDay = new Date(y, 0, 1);
    this._lastDay = new Date(y, 11, 31);
  }

  formatSelectedDate(date, format) {
    let language = this.languageService.getCurrent();
    const datePipe: DatePipe = new DatePipe(language);
    return datePipe.transform(date, format);
  }

  formatSelectedDate2(d, format) {
    var auxdate = d.split(' ')
    // let date = new Date(auxdate[0]);
    d = d.replace(' ', 'T')
    let date0 = new Date(d).toUTCString();
    let date = new Date(date0);
    let time = auxdate[1];
    date.setHours(time.substring(0, 2));
    date.setMinutes(time.substring(3, 5));
    let language = this.languageService.getCurrent();
    const datePipe: DatePipe = new DatePipe('en');
    return datePipe.transform(date, format);
  }

  back() {
    if (this.segmentFilter == '1w') {
      let now = new Date(this.minDate)
      now.setDate(this.minDate.getDate() - 1)
      this.maxDate = new Date(now)
    }
    this.segmentChanged(event)
  }

  next() {
    switch (this.segmentFilter) {
      case '1d': {
        let nextDay = this.maxDate.getDate() + 2
        this.maxDate.setDate(nextDay)
        break;
      }
      case '1w': {
        let now = new Date(this.maxDate)
        now.setDate(this.maxDate.getDate() + 7)
        this.maxDate = new Date(now)
        break;
      }
      case '1m': {
        let nextMonth = this.maxDate.getMonth() + 2
        this.maxDate.setMonth(nextMonth)
        break;
      }
      case '1y': {
        let nextYear = this.maxDate.getFullYear() + 2
        this.maxDate.setFullYear(nextYear)
        break;
      }
    }
    this.segmentChanged(event)
  }

  disabledButton() {
    if (this.maxDate >= this.currDate)
      return true
    return false
  }

  async addReminder() {
    const modal = await this.modalCtrl.create({
      component: ReminderAddPage,
      componentProps: { typeId: this.id, type: 'Element', titleReminder: this.header },
      cssClass: "modal-custom-class"
    });
    modal.onDidDismiss()
      .then((result) => {

        if (result?.data['error']) {
          // let message = this.translate.instant('landing.message_wrong_credentials')
          //this.dooleService.presentAlert(message)
        }
      });

    await modal.present();

  }

  async addElement() {
    const modal = await this.modalCtrl.create({
      component: ElementsAddPage,
      componentProps: { id: this.id, nameElement: this.header, units: this.units },
      //cssClass: "modal-custom-class"
    });
    modal.onDidDismiss()
      .then((result) => {
        if (result?.data?.error) {
          // let message = this.translate.instant('landing.message_wrong_credentials')
          //this.dooleService.presentAlert(message)
        } else if (result?.data?.action == 'add') {
          this.notification.displayToastSuccessful()
          this.interval = {
            from_date: this.formatSelectedDate(this._firstDay, 'yyyy/MM/dd'),
            to_date: this.formatSelectedDate(this._lastDay, 'yyyy/MM/dd'),
            interval: this.segmentFilter
          }
          this.loadData(this.interval);
        }
      });

    await modal.present();
  }

}

