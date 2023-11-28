import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent  implements OnInit {
  public items= [];
  pushNotification:any = history.state.data;
  itemsBackup= []
  news = []
  advices = []
  date = Date.now()
  isLoading = false
  constructor(
    private dooleService: DooleService,
    private datePipe: DatePipe,
    public role: RolesService
  ) { }

  ngOnInit() {
    this.getNewsList()
  }
  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
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
        this.adapterForView(res.news)
        this.isLoading = false
       },(err) => {
          console.log('[AdvicePage] getNewsList() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          this.isLoading = false
          throw err;
      });
  }


  adapterForView(list){
    list.forEach(element => {
    //Se adapta la respuesta de la API a lo que espera el componente  
      let data={
        img: element.cover,
        title: element.subject,
        description: "",
        type: "news",
        id:element.files.id,
        routerlink: "new-detail"
      }
      this.items.push(data)
    })
  }

}
