import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import Highcharts from 'highcharts';
import { LanguageService } from 'src/app/services/language.service';
@Component({
  selector: 'app-high-charts',
  templateUrl: './high-charts.component.html',
  styleUrls: ['./high-charts.component.scss'],
})
export class HighChartsComponent implements OnInit {
  es = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado']
  ca = ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte']
  @Input() data: any[] = [];
  @Input() typeChart;
  @Input() id: string
  @Input() units = '';
  @Input() title = ''
  @Input() minY;
  @Input() maxY;
  graphData = [];
  @Input() widthScreen
  min: Date = new Date();

  constructor(
    private languageService: LanguageService,
    ) { 
  }

  ngOnInit() {
    if(!this.id)
    this.id = this.data[0].formFieldName
    this.typeChart = this.typeChart? this.typeChart: 'datetime'; //'category'
  }

  ngAfterViewInit(){
    this.loadData()
  }

  loadData(){
    let vArray = [];
    var min = null, max = null;
    let numDay = this.returnNumDays(this.data)

    this.data.forEach(element => {
      let value = Number(element.value)
      if (min == null || min > value)
        min = value;

      if (max == null || max < value)
        max = value;

      vArray.push(value);
      element['date'] = this.convertDate(element?.start_date)

      var k = [];

      if(this.data.length >= 1 && this.data.length < 4 || numDay<4){
        this.typeChart = 'category'
        let date = this.formatDate(element.date, 'd. MMM yy')
        k.push(date);
      }else{
        let date = new Date(element.date).getTime()
        k.push(date);
      }
      k.push(value);
      this.graphData.push(k);

    })

    let minMath = Math.min.apply(null,vArray)
    min = minMath? minMath: min
    this.minY = (this.minY)? this.minY:(this.minY - this.minY/2)

    let maxMath = Math.max.apply(null,vArray)
    max = maxMath? maxMath:max
    this.maxY = (this.maxY)? this.maxY:(max+max/2)

    this.generateChart()

  }

  generateChart() {
    // console.log('[HighChartsComponent] generateChart() this.graphData: ', this.graphData );
    // console.log('generateChart() Graph Width: ' + this.widthScreen);
    Highcharts.chart(this.id, {
      chart: {  
        type:  (this.graphData.length > 5)? 'line':'column',  //'line' 'area'
        zoomType: 'xy',
        width: this.widthScreen,
        height: 350, 
        spacingBottom: 25,
        spacingTop: 50,
        spacingLeft: 15,
        spacingRight: 65,
        marginTop: 50,
      },
      title: {
        text: this.title !== ''? this.title:null,
        // floating: true,
        // align: 'left',
        y: -15
      },
      xAxis: {
         type:  this.typeChart,
         maxRange: this.min.getTime(),
  
      },   
      yAxis: {
          //min: this.minY,  
        /*max: this.maxY, */
        title: {
          text: this.units,
          align: 'high',
          y: -30,
          x: 20
        },
        opposite: true,
        // plotBands: this.ranges
      },
      rangeSelector: {
        enabled: true
    },

      plotOptions: {        
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
      }],
      tooltip: {
        valueSuffix: this.units,
        // formatter: function() {
        //     return 'The value for <b>' + this + '</b> is <b>' + this.y + '</b>, in series '+ this.series.name;
        // }
    }
    });
    
    Highcharts.setOptions({
      lang: {
          //months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
          weekdays: (this.languageService.getCurrent() == 'es')? this.es: this.ca
      }
    });
    Highcharts.chart
  }

  formatDate(d, format){
    let language = this.languageService.getCurrent();
    const datePipe: DatePipe = new DatePipe(language);
    return datePipe.transform(d, format);
  }

  convertDate(d){
    var auxdate = d.split(' ')
    d = d.replace(' ', 'T')
    let date0 = new Date(d).toUTCString();
    let date = new Date(date0);
    let time = auxdate[1];
    date.setHours(time.substring(0,2));
    date.setMinutes(time.substring(3,5));
    return date
  }

  returnNumDays(values){
    let newDate = ''
    let count = 0;
    let numDay = 0;

    for(let i = 0 ; i < values.length; i ++){
      let date = values[i].start_date.split(' ')[0]
      if(newDate ===  date){
        count++
      }else{
        numDay++
        //console.log(`[ActivityGoalPage] returnNumDays() newDate ${newDate} count ${numDay}`)
      }
      newDate =  date
      if(numDay > 3) 
        break;
    }
    return numDay
  }

}
