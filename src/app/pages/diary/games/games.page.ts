import { Component, OnInit } from '@angular/core';
import { LifeStyle } from 'src/app/models/shared-care-plan/scp-adapters';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';
import { NotificationsType } from 'src/app/shared/classes/notification-options';

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
    public role: RolesService
  ) { 
    this.lifeStyle = new LifeStyle(NotificationsType.GAMES, "games-detail")
  }

  ngOnInit() {
    this.getGamesList()
  }
 

  async getGamesList(){
    console.log('[AdvicePage] getGamesList()');
    this.items = []
    this.isLoading = true,  
    this.dooleService.getAPIgames().subscribe(
      async (res: any) =>{      
        if(res.games)
          this.items = this.lifeStyle.adapterForView(
            res.games, // JSON
            'image',  //img
            'name'
          ) 
         }
       ,(err) => {         
          alert( 'ERROR(' + err.code + '): ' + err.message)
          this.isLoading = false
          throw err;
      });
  }

}
