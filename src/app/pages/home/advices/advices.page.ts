import { Component, OnInit } from '@angular/core';
import { LifeStyle } from 'src/app/models/shared-care-plan/scp-adapters';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';
import { NotificationsType } from 'src/app/models/notifications/notification-options';
import { PermissionService } from 'src/app/services/permission.service';
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
  segment="Advice"
  //itemsBackup= []
  //advices = []
  saves_items;
  isLoading = false
  private lifeStyle:LifeStyle
  constructor(
    private dooleService: DooleService,
    public role: RolesService,
    public permissionService: PermissionService
  ) {
    this.lifeStyle = new LifeStyle( NotificationsType.ADVICES, "advices-detail")
   }

  ngOnInit() {
    if (this.permissionService.canViewAdvices) this.getAdvicesList()
  }

  ionViewWillEnter() {
    this.refreshPage(null);
  }

  adapterForView(list){
    this.items = this.lifeStyle.adapterForView(
      list, // JSON
      'image',  //img
      'name'  //title
    )  
  }

  refreshPage(data: any) {
    if (this.permissionService.canViewAdvices) this.getAdvicesList()
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
      this.saves_items = this.items;
        this.isLoading = false
       },(err) => {
          console.log('[AdvicePage] getAdvicesList() ERROR(' + err.code + '): ' + err.message);
          this.isLoading = false
          throw err;
      });
  }

 
  filterListAdvices(event) {
    let search;
    const searchTerm = event.srcElement.value.toLowerCase(); 
    if(this.items.length > 0){
      search = this.items 
    }else{
      search= this.saves_items;
    }
    const filteredItems = search.filter(item => {
      const subject = item.name.toLowerCase();
      return subject.includes(searchTerm) || subject === searchTerm;
    });
      this.items = (filteredItems)
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

