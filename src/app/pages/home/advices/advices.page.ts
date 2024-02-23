import { Component, OnInit } from '@angular/core';
import { LifeStyle } from 'src/app/models/shared-care-plan/scp-adapters';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';
import { NotificationsType } from 'src/app/models/notifications/notification-options';
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
  segment="Advices"
  //itemsBackup= []
  //advices = []
  isLoading = false
  private lifeStyle:LifeStyle
  constructor(
    private dooleService: DooleService,
    public role: RolesService
  ) {
    this.lifeStyle = new LifeStyle( NotificationsType.ADVICES, "advices-detail")
   }

  ngOnInit() {
    this.getAdvicesList()
  }

  adapterForView(list){
    this.items = this.lifeStyle.adapterForView(
      list, // JSON
      'image',  //img
      'name'  //title
    )  
  }

// ADVICES
  async getAdvicesList(){
    this.items = []
    this.isLoading = true
    let  params={
      tags:1,
      interactions:1,
      readingTime:1
    }
    this.dooleService.getAPIlistAdvices(params).subscribe(
      async (res: any) =>{
        console.log('[AdvicePage] getAdvicesList()', await res);
        if(res.advices)
       // this.adapterForView(res.advices)
      this.items= res.advices
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

