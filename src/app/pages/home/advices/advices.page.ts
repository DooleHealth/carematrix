import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { LifeStyle } from 'src/app/models/shared-care-plan/scp-adapters';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';
import { NotificationsType } from 'src/app/shared/classes/notification-options';
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
  public items= [];
  pushNotification:any = history.state.data;
  //itemsBackup= []
  //advices = []
  //date = Date.now()
  isLoading = false
  private lifeStyle:LifeStyle
  constructor(
    private dooleService: DooleService,
    private datePipe: DatePipe,
    public role: RolesService
  ) {
    this.lifeStyle = new LifeStyle( NotificationsType.ADVICES, "advices-detail")
   }

  ngOnInit() {
    this.getAdvicesList()
  }


  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  adapterForView(list){
    this.items = this.lifeStyle.adapterForView(
      list, // JSON
      'image',  //img
      'name'
    )   //title
  }

// ADVICES
  async getAdvicesList(){
    this.items = []
    this.isLoading = true
    this.dooleService.getAPIlistAdvices().subscribe(
      async (res: any) =>{
        console.log('[AdvicePage] getAdvicesList()', await res);
        if(res.advices)
        this.adapterForView(res.advices)
        this.isLoading = false
       },(err) => {
          console.log('[AdvicePage] getAdvicesList() ERROR(' + err.code + '): ' + err.message);
          this.isLoading = false
          throw err;
      });
  }

  filterListAdvices(event){
    var query = event //.target.value;
    this.isLoading = true
    this.dooleService.getAPISearchAdvices(query).subscribe(res=>{
      console.log('[AdvicePage] filterListAdvices()', res);
      this.items = []
      if(res.success)
        this.adapterForView(res.advice)
      this.isLoading = false
    },err => {
      console.log('[AdvicePage] filterListAdvices() ERROR(' + err.code + '): ' + err.message);
    });
  };


  // async filterList(evt) {
  //   console.log('[AdvicePage] filterList()');

  //   this.items = this.itemsBackup;
  //   const searchTerm = evt.srcElement.value;
  //   if (!searchTerm) {
  //     //this.items = []
  //     //this.segmentChanged();
  //     return;
  //   }
  //   this.filterListAdvices(searchTerm)
  // }



}

