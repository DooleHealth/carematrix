import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonSlides, LoadingController} from '@ionic/angular'; 
import { DooleService } from 'src/app/services/doole.service';
export interface ItemDiary {
  expanded?: boolean;
  item?: any;
}

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})

export class DiaryPage implements OnInit {
  public items: ItemDiary[] = [];
  diets = []
  date = Date.now()
  segment = 'diets'
  isLoading = false
  @ViewChild('slides') slides: IonSlides;
  constructor(
    private dooleService: DooleService,
    private loadingController: LoadingController,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.segmentChanged()
  }
  next() {
    let nextDay =  new Date(this.date).getDate() + 1
    this.date = new Date(this.date ).setDate(nextDay)
    this.segmentChanged()
  }

  prev() {
    let lastDay =  new Date(this.date).getDate() - 1
    this.date = new Date(this.date ).setDate(lastDay)
    this.segmentChanged()
  }
  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  addItems(list){
    this.items = []
    list.forEach(element => {
      this.items.push({expanded: false, item: element })
    });
    console.log('[DiaryPage] addItems()', this.items);
  }

  async getDietList(){
    console.log('[DiaryPage] getDietList()');
    this.items = []
    this.isLoading = true
    const loading = await this.loadingController.create();
    await loading.present();
    this.dooleService.getAPIlistDiets().subscribe(
      async (res: any) =>{
        console.log('[DiaryPage] getDietList()', await res);
        if(res.diets)
        this.addItems(res.diets)
        loading.dismiss();
        this.isLoading = false
       },(err) => { 
          console.log('[DiaryPage] getDietList() ERROR(' + err.code + '): ' + err.message); 
          loading.dismiss();
          this.isLoading = false
          throw err; 
      });
  }

  async getDrugIntakeList(){
    console.log('[DiaryPage] getDetailDiet()');
    this.items = []
    this.isLoading = true
    const loading = await this.loadingController.create();
    await loading.present();
    let formattedDate = this.transformDate(this.date)
    let date = {date: formattedDate}
    this.dooleService.postAPIdrugIntake(date).subscribe(
      async (res: any) =>{
        console.log('[DiaryPage] getDetailDiet()', await res);
        if(res.drugIntakes)
        this.addItems(res.drugIntakes)
        loading.dismiss();
        this.isLoading = false
       },(err) => { 
          console.log('[DiaryPage] getDetailDiet() ERROR(' + err.code + '): ' + err.message); 
          loading.dismiss();
          this.isLoading = false
          throw err; 
      });
  }

  changeTake(id,taked){
    
    taked=(taked=="0") ? "1" : "0";
    var dict = [];
    dict.push({
        key:   "date",
        value: ""
    });
    this.dooleService.postAPIchangeStatedrugIntake(id,taked).subscribe(json=>{
      console.log('[DiaryPage] changeTake()',  json);
      this.getDrugIntakeList()
    },(err) => { 
      console.log('[DiaryPage] changeTake() ERROR(' + err.code + '): ' + err.message); 
      throw err; 
  });
  }



  segmentChanged(){
    console.log(this.segment);
    switch (this.segment) {
      case 'diets':
        this.getDietList()
        break;
      case 'medication':
        this.getDrugIntakeList()
        break;
      case 'games':
        //this.getElementsList()
        break;
      case 'health':
        //this.getElementsList()
        break;
      default:
        //this.getDiagnosticTestsList()
        break;
    }
  }


  selectDayPeriod(time){
    let hour = new Date(time).getHours()
    if(hour <= 6  || hour < 12){
      return 'mañana'
    }
    if(hour == 12){
      return 'medio día'
    }
    if(hour >= 13 || hour < 20){
      return 'tarde'
    }
    if(hour >= 20 || hour < 24){
      return 'noche'
    }
    if(hour == 24){
      return 'media noche'
    }
    if(hour > 0 || hour < 6){
      return 'madrugada'
    }
    return 'todo el día'
  }
}

