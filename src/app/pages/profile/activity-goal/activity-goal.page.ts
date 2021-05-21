import { Component, OnInit } from '@angular/core';
import * as HighCharts from 'highcharts';


@Component({
  selector: 'app-activity-goal',
  templateUrl: './activity-goal.page.html',
  styleUrls: ['./activity-goal.page.scss'],
})
export class ActivityGoalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getData()
  }


  getData() {
    HighCharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Pasos semanales'
      },
      xAxis: {
        categories: ['L', 'M', 'MX', 'J', 'V', 'S', 'D'],
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
          align: 'high'
        },
        opposite: true
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
      series: [{
        type: undefined,
        name: 'Km',
        data: [15, 18, 23, 20, 9, 25, 0]
      }]
    });
  }



}
