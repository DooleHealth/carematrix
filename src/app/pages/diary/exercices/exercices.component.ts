import { Component, OnInit } from '@angular/core';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrls: ['./exercices.component.scss'],
})
export class ExercicesComponent  implements OnInit {

  public items= [];
  pushNotification:any = history.state.data;
  itemsBackup= []
  news = []
  advices = []
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
    this.dooleService.getAPIExercises().subscribe(
      async (res: any) =>{      
        if(res.success){
          this.items = []
          this.adapterForView(res.exercises)

         }
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
        title: element.name,
        description: "",
        type: "exercices",
        id:element.id,
        routerlink: "exercices-detail"
      }
      this.items.push(data)
    })
  }

}
