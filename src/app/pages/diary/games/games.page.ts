import { Component, OnInit } from '@angular/core';
import { LifeStyle } from 'src/app/models/shared-care-plan/scp-adapters';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';
import { NotificationsType } from 'src/app/models/notifications/notification-options';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

 
  public items= [];
  pushNotification:any = history.state.data;
  public lifeStyle:LifeStyle
  isLoading = false
  constructor(
    private dooleService: DooleService,
    public role: RolesService,
    public permissionService: PermissionService
  ) { 
    this.lifeStyle = new LifeStyle(NotificationsType.GAMES, "games-detail")
  }

  ngOnInit() {
    if(this.permissionService.canViewGames) this.getGamesList()
  }
 

  async getGamesList(){
    console.log('[AdvicePage] getGamesList()');
    this.items = []
    let game = [];
    this.isLoading = true,  
    this.dooleService.getAPIgames().subscribe(
      async (res: any) =>{      
        if(res.games)
      {

        


        res.games.forEach(element => {
          game.push(element);
        });
        if(game.length > 0){
         this.getGameData(game)
        }
      }
         }
       ,(err) => {         
          alert( 'ERROR(' + err.code + '): ' + err.message)
          this.isLoading = false
          throw err;
      });
  }

  async getGameData(game){
    let games=[];
    this.isLoading = true
    game.forEach(element => {
      this.dooleService.getAPIgameId(element.id).subscribe(
        async (res: any) =>{        
          if (res.success) {
           games.push(res.game)
          this.adapterForView(games)
          }
          console.log('[GamesDetailPage] getGameData()',  this.items);
          this.isLoading = false
         },(err) => {
          this.isLoading = false
            console.log('[GamesDetailPage] getGameData() ERROR(' + err.code + '): ' + err.message);
            throw err;
        }) ,() => {
          // Called when operation is complete (both success and error)
          this.isLoading = false
        };
    });
   
  }


  adapterForView(list) {
    if (Array.isArray(list)) {
      

      console.log(list);
      list.forEach(element => {
        
        let image = "";
        let isAnswers= false;
        const temporaryUrl = element.media;
        if (temporaryUrl?.hasOwnProperty("temporaryUrl")) {
          image = temporaryUrl.temporaryUrl
        }

        let data = {
          img: image,
          title: element.title,
          type:  "games",
          id: element.id,
          routerlink: "games-detail",  
          score:element.score,
          model: "",
          model_id:  element.id              
      } 
        this.items.push(data)
      })
    }
    console.log(this.items);
  }
}
