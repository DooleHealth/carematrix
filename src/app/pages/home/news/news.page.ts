import { Component, OnInit } from '@angular/core';
import { LifeStyle } from 'src/app/models/shared-care-plan/scp-adapters';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';
import { NotificationsType } from 'src/app/models/notifications/notification-options';
import { FakeBackendInterceptor } from 'src/app/interceptors/fake-backend.interceptor';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  segment="News"
  public items= [];
  // itemsBackup= []
  // news = []
  contents = [];
  isLoading = false;
  saves_items;
  private lifeStyle:LifeStyle
  constructor(
    private dooleService: DooleService,
    public role: RolesService,
    public fakeBackend: FakeBackendInterceptor
  ) { 
    this.lifeStyle = new LifeStyle( NotificationsType.ADVICES, "new-detail")
  }

  ngOnInit() {
    this.getNewsList()
  }

  adapterForView(list){
    this.items = this.lifeStyle.adapterForView(
      list, // JSON
      'cover',  //img
      'subject'  //title
    )  
  }

  async getNewsList(){
    console.log('[NewsPage] getNewsList()');
    this.items = []
    this.isLoading = true;
   let  params={
      tags:1,
      interactions:1,
      readingTime:1
    }
   
   this.dooleService.getAPIlistNews(params).subscribe(
      async (res: any) =>{
        console.log('[NewsPage] getNewsList()', await res);
        if(res.news)
       // this.adapterForView(res.news)
        this.items = res.news;
        this.saves_items = this.items;
        console.log('[NewsPage] getNewsList(content)', this.items);
        this.isLoading = false
       },(err) => {
          console.log('[NewsPage] getNewsList() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          this.isLoading = false
          throw err;
      });
  }

  filterListNews(event) {
    let search;
    const searchTerm = event.srcElement.value.toLowerCase(); 
    if(this.items.length > 0){
      search = this.items 
    }else{
      search= this.saves_items;
    }
    const filteredItems = search.filter(item => {
      const subject = item.subject.toLowerCase();
      return subject.includes(searchTerm) || subject === searchTerm;
    })
      this.items = (filteredItems)
  };

 
}
