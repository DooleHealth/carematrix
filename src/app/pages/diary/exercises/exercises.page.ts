import { Component, OnInit } from '@angular/core';
import { LifeStyle } from 'src/app/models/shared-care-plan';
//import { AdapterView } from 'src/app/models/shared-care-plan';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';
import { NotificationsType } from 'src/app/shared/classes/notification-options';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {

  public items= [];
  pushNotification:any = history.state.data;
  itemsBackup= []
  news = []
  advices = []
  isLoading = false
  public exerLifeStyle:LifeStyle
  constructor(
    private dooleService: DooleService,
    public role: RolesService,
  ) { 
    this.exerLifeStyle = new LifeStyle( NotificationsType.EXERCISES, "exercices-detail")
  }

  ngOnInit() {
    this.getNewsList()
  }
 

 

 

  async getNewsList(){
    console.log('[AdvicePage] getNewsList()');
    this.items = []
    this.isLoading = true,  
    this.dooleService.getAPIExercises().subscribe(
      async (res: any) =>{      
        if(res.success){
          this.items = []
          this.items = this.exerLifeStyle.adapterForView(
            res.exercises, // JSON
            'cover',  //img
            'name',   //title
            'id')     //id
         }
       },(err) => {
          console.log('[AdvicePage] getNewsList() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          this.isLoading = false
          throw err;
      });
  }


  // adapterForView(list){
  //   list.forEach(element => {
  //   //Se adapta la respuesta de la API a lo que espera el componente  
  //     let data: AdapterView={
  //       img: element.cover,
  //       title: element.name,
  //       description: "",
  //       type: "exercices",
  //       id:element.id,
  //       routerlink: "exercices-detail"
  //     }
  //     this.items.push(data)
  //   })
  // }

}
