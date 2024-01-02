import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import * as HighCharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(HighCharts);
import moment from 'moment';
import { DatePipe } from '@angular/common';
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

@Injectable({
  providedIn: 'root'
})
export class HighchartsService {
  weekdaysES = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado']
  weekdaysCA = ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte']
  title: string;
  graphData = [];
  ranges: any;
  units: string;
  series: any[] = []
  xAxis: any
  yAxis: any
  minY: any
  maxY: any
  graphBaseOn: string
  pointWidth: number;
  withTooltip = false
  extraTooltip: any;
  scrollMinWidth = 550
  constructor(
    private languageService: LanguageService,
  ) { }

  setTitle(title){
    this.title = title
  }

  setUnits(units){
    this.units = units
  }

  setLocale() {
    return this.languageService.getCurrent();
  }

  setPointWidth(interval): number{
    switch (interval) {
      case '1d':        
        return 12;
      case '1w':        
        return 12;  
      case '1m':        
        return 8;   
      case '1y':        
        return 12;  
      default:
        return 20;
    }
  }

  setScrollMinWidth(interval){
    switch (interval) {
      case '1d':        
        this.scrollMinWidth = 600;
      case '1w':        
        this.scrollMinWidth = 500;  
      case '1m':        
        this.scrollMinWidth = 600;   
      case '1y':        
        this.scrollMinWidth = 500;  
      default:
        this.scrollMinWidth = 500;
    }
  }

  addTooltip(interval){
    switch (interval) {
      case '1d':        
        this.withTooltip = false;
      case '1w':        
      this.withTooltip = false; 
      case '1m':        
      this.withTooltip = true; 
      case '1y':        
      this.withTooltip = false;
      default:
      this.withTooltip = false;
    }
  }

  getWeekday(){
   return (this.setLocale() == 'es') ? this.weekdaysES : this.weekdaysCA
  }

  setSeries(name, data, pointWidth?, lineWidth?, color?, colorKey?, colorByPoint?){
    const serie_name = name? name: this.units;
    const serie_data = (data && data.length > 0)? data: this.graphData
    const serie_pointWidth = pointWidth? pointWidth:this.pointWidth
    const serie_colorByPoint = colorByPoint? true:false;
    let serie: serie = { name: serie_name, data: serie_data, pointWidth:serie_pointWidth, colorByPoint:  serie_colorByPoint}
    //if (pointWidth != undefined) serie['pointWidth'] = pointWidth
    if (lineWidth) serie['lineWidth'] = lineWidth
    if (color) serie['color'] = color
    if (colorKey) serie['colorKey'] = colorKey
    this.series = []
    this.series.push(serie)
  }

  // type: this.typeChart,
  // maxRange: this.min.getTime(),
  // categories: this.withTooltip? this.graphDates: null
  setXAxis(type, categories, maxRange?){
    this.xAxis = {type: type, maxRange: maxRange, categories: categories,  crosshair: true}
  }

  setYAxis(minY,maxY, ranges, text){
    console.log('[ActivityGoalPage] generateChart() maxY: ', maxY);
    //Solo para HPC requieren que el valor mínimo de gráfica sea 0, aquí valido que si no hay valores negativos se el minY = 0;
    const y_min =  minY;// (minY > 0) ? 0 : minY;
    const y_max = (maxY)? maxY: this.maxY
    const y_title = {text: text, align: 'high'}
    this.yAxis = {min: y_min, max: y_max, alignTicks: false, tickInterval: null, startOnTick: false, title:y_title, opposite: true, plotBands: ranges}
  }

  setMinY(valuesA, valuesB){
    if(valuesA && valuesB && valuesB.length > 0){
      const A = Math.min.apply(null, valuesA)
      const B = Math.min.apply(null, valuesB)
      this.minY = A>B? B:A
      return this.minY
    }else{
      this.minY = Math.min.apply(null, valuesA)
      return this.minY
    }
  }

  setMaxY(valuesA, valuesB){
    if(valuesA && valuesB && valuesB.length > 0){
      const A = Math.max.apply(null, valuesA)
      const B = Math.max.apply(null, valuesB)
      this.maxY = A>B? A:B
      return this.maxY
    }else{
      this.maxY =  Math.max.apply(null, valuesA)
      return this.maxY
    }
  }


  getOptionsChart(graphBaseOn) {
    //console.log('[ActivityGoalPage] generateChart() graphBaseOn: ', graphBaseOn);
    let  charts //= HighCharts
    switch (graphBaseOn) {
      case 'avg':  
        //charts.chart('container', {
        charts = {
          chart: {
            renderTo: 'container',
            type: 'column',
            zoomType: 'x',
            scrollablePlotArea: {
              minWidth: this.scrollMinWidth,
              scrollPositionX: 1
            }   
          },
          title: {
            text: this.title 
          },
          xAxis:  this.xAxis,
          yAxis: this.yAxis,
          rangeSelector: {
            enabled: true
          },
          plotOptions: {
            series: {
              allowPointSelect: true,
              borderWidth: 1,
              dataLabels: {
                enabled: true,
                format: '{point.y}'
              },
            }
          },
          legend: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          series: this.series,
          tooltip: {
            valueSuffix: ` ${this.units}`
          },
          lang: {
            weekdays: this.getWeekday()
          }
        }
        //);
        break;
      case 'range':   
       //charts.chart('container', {
        charts = {
          chart: {
            renderTo: 'container',
            type: 'arearange',
            zoomType: 'x',
            scrollablePlotArea: {
                minWidth: this.scrollMinWidth,
                scrollPositionX: 1
            }    
          },
          title: {
            text: this.title 
          },
          xAxis: this.xAxis,
          yAxis: this.yAxis,
          legend: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          series: this.series,
          tooltip: {
            valueSuffix: ` ${this.units}`
          },
          lang: {
            weekdays: this.getWeekday()
          }
        }
        //);
        
        break;
      case 'lasValue': //barra o punto valor de 0 al inicio
      default:
        //charts.chart('container', {
        charts = {
          chart: {
            renderTo: 'container',
            type: 'column',
            zoomType: 'x',
            scrollablePlotArea: {
              minWidth: this.scrollMinWidth,
              scrollPositionX: 1
            }   
          },
          title: {
            text: this.title 
          },
          xAxis:  this.xAxis,
          yAxis: this.yAxis,
          rangeSelector: {
            enabled: true
          },
          plotOptions: {
            series: {
              allowPointSelect: true,
              borderWidth: 1,
              dataLabels: {
                enabled: true,
                format: '{point.y}'
              },
            }
          },
          legend: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          series: this.series,
          tooltip: {
            valueSuffix: ` ${this.units}`
          },
          lang: {
            weekdays: this.getWeekday()
          }
        }
        //);
        break;
    }


    if(this.withTooltip){
      let tool = `<table><tr><th colspan="1">{point.key} ${this.extraTooltip}</th></tr>` //
      HighCharts.setOptions({
        tooltip: {
          headerFormat: tool,
        },
      });
    }

    return charts
  }

  groupByCategory(interval, element){
   let language= this.languageService.getCurrent();
    //console.log('[HighchartsService] groupByCategory ', element.date_value);
    let elementDate = new Date(element.date_value);
    let groupByDate = "";
    let tooltip = "";
    //console.log('[HighchartsService] groupByCategory ', element.date_value);
    switch (interval) {
      case '1d':// group by day
        let hour = element.date?.split(' ')[1]
        groupByDate = hour
        // let isAllValue = (this.graphBaseOn == 'lasValue' || this.graphBaseOn == 'range')? true:false
        // groupByDate = isAllValue? hour : hour.split(':')[0] + ':' + hour.split(':')[1];
        tooltip = moment(elementDate, "YYYY-MM-DD").locale('es').date() + '/' + elementDate.toLocaleString('es-ES', { month: 'short' }) + '/' + elementDate.getFullYear()+' '+groupByDate;
        break;
      case '1w':
        let date = this.formatSelectedDate(element.date_value)
        let day = date.toLocaleString(language, { weekday: 'short' })
        groupByDate = this.titleCase(day) +' '+ this.formatSelectedDate2(element.date_value, 'd')
        tooltip = moment(elementDate, "YYYY-MM-DD").locale('es').date() + '/' + elementDate.toLocaleString('es-ES', { month: 'short' }) + '/' + elementDate.getFullYear();
        break;
      case '1m':
        //let month = elementDate.toLocaleString('es-ES', { month: 'short' });
        groupByDate = this.formatSelectedDate2(element.date_value, 'd') //+ ' ' + month
        tooltip = moment(elementDate, "YYYY-MM-DD").locale('es').date() + '/' + elementDate.toLocaleString('es-ES', { month: 'short' }) + '/' + elementDate.getFullYear();
        break;
      case '1y':
        let month = new Date(); month.setMonth(Number(element.date_value)-1); 
        groupByDate = month.toLocaleString(language, { month: 'short' })
        groupByDate = this.titleCase(groupByDate) ;
        tooltip =  month.toLocaleString(language, { month: 'short' }) + '/' + month.getFullYear();
        break;
      default:
        break
    }
    return {groupByDate: groupByDate, tooltip: tooltip}
  }

  formatSelectedDate2(d, format) {
    var auxdate = d.split(' ')
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

  formatSelectedDate(d) {
    var auxdate = d.split(' ')
    d = d.replace(' ', 'T')
    let date0 = new Date(d).toUTCString();
    let date = new Date(date0);
    let time = auxdate[1];
    date.setHours(time.substring(0, 2));
    date.setMinutes(time.substring(3, 5));
    return date
  }

  titleCase(word){
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  getGroupedData(json, interval, withoToltip?:boolean){
    let withTooltip: boolean = false
    let tooltip = []
    let groupData: any;
    let groups = []
    let valuesA = [];
    let valuesB = [];
    let datesA = [];
    let graphData = [];
    let graphBaseOn = json.graphBaseOn
    this.graphBaseOn = json.graphBaseOn;
    switch (graphBaseOn) {
      case 'average': 
      case 'avg': 
        groups = json.values.reduce((groups, element) => {
          const value = Number(element.avg);
          const group = this.groupByCategory(interval, element)
          // If date doesn't exist in array, then create it
          if (!groups[group.groupByDate]) {
            groups[group.groupByDate] = [];
            groups[group.groupByDate].value = 0;
          }
          groups[group.groupByDate].value += value;
          groups[group.groupByDate].tooltip = group.tooltip       
          return groups;
        }, {}); 
        //console.log('[HighchartsService] rangeGraph', groups); 
        Object.keys(groups).map((date) => {
          datesA.push(date);
          valuesA.push(groups[date].value);
          // if(withTooltip)
          //   graphData.push({y: groups[date].total, tooltip: groups[date].tooltip});
          // else
            if(withTooltip)
            tooltip.push(groups[date].tooltip)
            graphData.push([date, groups[date].value]);
    
        });  
        //console.log('[HighchartsService] graphData', graphData);
        groupData = {dates: datesA, valuesA: valuesA, graphData: graphData}
        break;

      case 'range': 
        groups = json.values.reduce((groups, element) => {
            const valueMax = Number(element.max);
            const valueMin = Number(element.min);
            const group = this.groupByCategory(interval, element)
            // If date doesn't exist in array, then create it
            if (!groups[group.groupByDate]) {
              groups[group.groupByDate] = [];
              groups[group.groupByDate].valueMax = 0;
              groups[group.groupByDate].valueMin = 0;
            }
            groups[group.groupByDate].valueMax += valueMax;
            groups[group.groupByDate].valueMin += valueMin;
            groups[group.groupByDate].tooltip = group.tooltip
            
            return groups;
          }, {});
        //console.log('[HighchartsService] rangeGraph', groups); 
          Object.keys(groups).map((date) => {
            datesA.push(date);
            valuesA.push(groups[date].valueMax);
            valuesB.push(groups[date].valueMin);
            // if(withTooltip)
            //   graphData.push({y: groups[date].total, tooltip: groups[date].tooltip});
            // else
              if(withTooltip)
              tooltip.push(groups[date].tooltip)
              graphData.push([date, groups[date].valueMin, groups[date].valueMax]);
      
          });  
        //console.log('[HighchartsService] graphData', graphData);
        groupData = {dates: datesA, valuesA: valuesA, valuesB: valuesB, graphData: graphData}
        break;

      case 'sum':  
        groups = json.values.reduce((groups, element) => {
            const value = Number(element.value);
            const group = this.groupByCategory(interval, element)
            // If date doesn't exist in array, then create it
            if (!groups[group.groupByDate]) {
              groups[group.groupByDate] = [];
              groups[group.groupByDate].value = 0;
            }
            groups[group.groupByDate].value += value;
            groups[group.groupByDate].tooltip = group.tooltip       
            return groups;
        }, {}); 
        //console.log('[HighchartsService] rangeGraph', groups); 
        Object.keys(groups).map((date) => {
          datesA.push(date);
          valuesA.push(groups[date].value);
          // if(withTooltip)
          //   graphData.push({y: groups[date].total, tooltip: groups[date].tooltip});
          // else
            if(withTooltip)
            tooltip.push(groups[date].tooltip)
            graphData.push([date, groups[date].value]);
        });  
        //console.log('[HighchartsService] graphData', graphData);
        groupData = {dates: datesA, valuesA: valuesA, graphData: graphData}
        break;

      case 'lasValue':  
      default:
        json.values.forEach(element => {
          const value = Number(element.value);
          const group = this.groupByCategory(interval, element)
          // If date doesn't exist in array, then create it
          if (!groups[group.groupByDate]) {
            groups[group.groupByDate] = [];
            groups[group.groupByDate].value = 0;
          }
          groups[group.groupByDate].value += value;
          groups[group.groupByDate].tooltip = group.tooltip     
        })
        //console.log('[HighchartsService] rangeGraph', groups); 
        Object.keys(groups).map((date) => {
          datesA.push(date);
          valuesA.push(groups[date].value);
          // if(withTooltip)
          //   graphData.push({y: groups[date].total, tooltip: groups[date].tooltip});
          // else
            if(withTooltip)
            tooltip.push(groups[date].tooltip)
            graphData.push([date, groups[date].value]);   
        });  
        //console.log('[HighchartsService] graphData', graphData);
        groupData = {dates: datesA, valuesA: valuesA, graphData: graphData}
        break
    }
    return groupData;
  }

  getRanges(element, min, max) {
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
        const maxValue = this.getMaxRange(range.value1, max) ;
        console.log('[ActivityGoalPage] maxValue ', maxValue);
        r["to"] = this.getMaxRange(range.value1, max) ;
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
      value.push(r);

      if (range.rangeType === "success") {
        normalValue.push(range.conditionString)
      }
      else if (range.rangeType == "warning") {
        outRangeValue.push(range.conditionString)
      }
      else if (range.rangeType == "danger") {
        dangerValue.push(range.conditionString)
      }

    });
    if (value?.length > 0) {
      let rangesElement = {
        name: element.name,
        description: element.description,
        value: value,
        normalValue: normalValue,
        outRangeValue: outRangeValue,
        dangerValue: dangerValue
      }
      console.log('[ActivityGoalPage] getRanges() ranges: ', rangesElement);
      return rangesElement
    }
    else return undefined
  }
  //Aqui se setea el valor max en Y sumando el rango máximo y valor máximo ingresado divdido entre 2
  getMaxRange(rangeMax, max){
    let value1 = Number(rangeMax)
    let value2 = Number(max)
    if(value2 <= value1)
      this.maxY = value1 + value2/2;   
    else 
      this.maxY = value2
      return this.maxY 
  }

  setHighchartsOptions(json, params){
    let opt = json?.graphBaseOn
    let interval = params.interval
    let name = json?.name
    let typeChart = ''
    let valuesA = [];
    let valuesB = [];
    let datesA = [];
    let graphData = [];
    let ranges;
    let minY;
    let maxY;
    let pointWidth = 20
    let units = json?.units

    this.units = json.units

    const data = this.getGroupedData(json, interval);
    graphData = data?.graphData
    valuesA = data?.valuesA
    valuesB = data?.valuesB
    datesA = data?.dates

    minY = this.setMinY( valuesA, valuesB);
    maxY = this.setMaxY( valuesA, valuesB);
    ranges = this.getRanges(json, minY, maxY)
    this.ranges = ranges
    pointWidth = this.setPointWidth(interval)

    console.log("* valuesA: ", valuesA);
    console.log("* valuesB: ", valuesB);
    console.log("* dates: ", datesA);
    console.log("* graphic: ", graphData);

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

    this.setXAxis(typeChart, datesA)
    this.setYAxis(minY,maxY, ranges, units)
    this.setSeries(name, graphData, pointWidth)
  }

}
