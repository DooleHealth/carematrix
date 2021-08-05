import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { IonSlides, LoadingController} from '@ionic/angular'; 
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
export interface ItemAdvice {
  expanded?: boolean;
  item?: any;
}
@Component({
  selector: 'app-advices',
  templateUrl: './advices.page.html',
  styleUrls: ['./advices.page.scss'],
})
export class AdvicesPage implements OnInit {
  public items: ItemAdvice[] = [];
  itemsBackup= []
  news = []
  advices = []
  groupedElements: any = [];
  date = Date.now()
   segment = 'advices'
  // segment = 'news'
  isLoading = false
  @ViewChild('slides') slides: IonSlides;
  constructor(
    private dooleService: DooleService,
    private loadingController: LoadingController,
    private datePipe: DatePipe,
    private iab: InAppBrowser,
    private auth: AuthenticationService,
    private translate: TranslateService

  ) { }

  ngOnInit() {
    this.segmentChanged()
  }


  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  addItems(list){
    this.items = []
    this.itemsBackup = []
    list.forEach(element => {
      this.items.push({expanded: false, item: element })
    });
    this.itemsBackup = this.items
    console.log('[AdvicePage] addItems()', this.items);
  }

  async getNewsList(){
    console.log('[AdvicePage] getNewsList()');
    this.items = []
    this.isLoading = true
    let formattedDate = this.transformDate(this.date)
    let date = {date: formattedDate}
    this.dooleService.getAPIlistNews().subscribe(
      async (res: any) =>{
        console.log('[AdvicePage] getNewsList()', await res);
        if(res.news)
        this.addItems(res.news)
        this.isLoading = false
       },(err) => { 
          console.log('[AdvicePage] getNewsList() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          this.isLoading = false
          throw err; 
      });
  }

// ADVICES
  async getAdvicesList(){
    console.log('holaaa');
    this.items = []
    this.isLoading = true
    // let formattedDate = this.transformDate(this.date)
    // let date = {date: formattedDate}
    this.dooleService.getAPIlistAdvices().subscribe(
      async (res: any) =>{
        console.log('[AdvicePage] getAdvicesList()', await res);
        if(res.advices)
        this.addItems(res.advices)
        this.isLoading = false
       },(err) => { 
          console.log('[AdvicePage] getAdvicesList() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }



  segmentChanged(){
    console.log(this.segment);
    switch (this.segment) {
      case 'news':
        this.getNewsList()
        break;
      case 'advices':
        this.getAdvicesList()
        break;
   
      default:
        //this.getDiagnosticTestsList()
        break;
    }
  }

  async filterList(evt) {
    console.log('[AdvicePage] filterList()');

    this.items = this.itemsBackup;
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }

    switch (this.segment) {
      case 'news':
        this.items = this.items.filter(element => {
          if (element.item.subject && searchTerm) {
            return (element.item.subject .toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
          }
        });
        break;

      case 'advices':
        this.items = this.items.filter(element => {
          if (element.item.name && searchTerm) {
            return (element.item.name .toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
          }
        });
        break;
    }
  }

  

}

