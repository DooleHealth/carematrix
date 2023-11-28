import { Component, OnInit } from '@angular/core';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

 
  public items= [];
  pushNotification:any = history.state.data;
  isLoading = false
  constructor(
    private dooleService: DooleService,
    public role: RolesService
  ) { }

  ngOnInit() {
    this.getNewsList()
  }
 

  async getNewsList(){
    console.log('[AdvicePage] getNewsList()');
    this.items = []
    this.isLoading = true,  
    this.dooleService.getAPIgames().subscribe(
      async (res: any) =>{      
        if(res.games)
          this.items = []
          this.adapterForView(res.games)

         }
       ,(err) => {         
          alert( 'ERROR(' + err.code + '): ' + err.message)
          this.isLoading = false
          throw err;
      });
  }


  adapterForView(list){
    list.forEach(element => {
    //Se adapta la respuesta de la API a lo que espera el componente  
      let data={
        img: element.image.temporaryUrl,
        title: element.name,
        description: "",
        type: "exercices",
        id:element.id,
        routerlink: "games-detail"
      }
      this.items.push(data)
    })
  }

}
