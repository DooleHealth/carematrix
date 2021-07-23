import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import * as HighCharts from 'highcharts';
import { DooleService } from 'src/app/services/doole.service';


@Component({
  selector: 'app-activity-goal',
  templateUrl: './activity-goal.page.html',
  styleUrls: ['./activity-goal.page.scss'],
})
export class ActivityGoalPage implements OnInit {
  private id;
  normalValue
  description
  graphics = []
  header = []
  values = []
  goals = [];
  ranges = [];
  valuesChart: any;
  //loading: any;
  graphValues: any;
  graphDates: any;
  private title: any;
  units: any = [];
  graphData = [];
  interval = '';
  min: Date = new Date();
  max: Date = new Date();
  segmentFilter = "1d";
  constructor(
    private dooleService: DooleService,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.id = history.state.id;
    this.header = history.state.header;
    console.log('[ActivityGoalPage] ngOnInit()', this.id); 
    //this.loadData('1m');
  }

  ionViewDidEnter() {
    if (this.id)
      this.loadData('1d');
  }

  async loadData(interval) {
    console.log('[ActivityGoalPage] loadData()', interval); 
    const loading = await this.loadingController.create();
    await loading.present();

    let vArray = [];
    let dArray = [];

/*     var dict = [];
    dict.push({ key: "interval", value: interval }); */
    this.dooleService.getAPIgraphicsElement(this.id, interval).subscribe(async json => {
      console.log('[ActivityGoalPage] loadData()', await json);
      this.title = json.name;
      this.description = json?.description
      this.units = json.units;
      this.values = json.values;
      this.goals = json.goals;
      this.graphData = [];
      var min = null, max = null;
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
    
    }, error => {
     
      alert("error");
    },()=>{
      loading.dismiss();
    });
  }


  generateChart() {
    HighCharts.chart('container', {
      chart: {
        type: 'column',
        zoomType: 'x',

      },
      title: {
        text: null
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
      tooltip: {
        valueSuffix: ' millions'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
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
        data: this.graphData,
        name: this.units,
      }]
    });
  }

  filter(data) {
    console.log('[ActivityGoalPage] filter()', data);
  }

  segmentChanged(event) {
    console.log(this.segmentFilter);
    switch (this.segmentFilter) {
      case '1d': {
        this.min = new Date();
        //alert(this.min);
        break;
      }
      case '1w': {
        this.lasWeek();
        break;
      }
      case '1m': {
        this.lastMonth();
        break;
      }
      case '1y': {
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

  formatDate(d) {
    let date = new Date(d.split(' ')[0]);
    let time = d[1];
    date.setHours(time.substring(0, 2));
    date.setMinutes(time.substring(3, 5));
    return date;
  }

  lasWeek() {
    let numWeeks = 1;
    let now = new Date();
    now.setDate(this.max.getDate() - numWeeks * 7);
    this.min = now;
    //alert(this.min.toDateString() + ' - ' + this.max.toDateString());
  }

  lastMonth() {
    let now = new Date();
    now.setMonth(this.max.getMonth() - 1);
    this.min = now;
    //alert(this.min.toDateString() + ' - ' + this.max.toDateString());
  }

  fullYear() {
    
    let now = new Date();
    now.setFullYear(this.max.getFullYear() - 1);
    this.min = now;
    //alert(this.min.toDateString() + ' - ' + this.max.toDateString());
  }

}
