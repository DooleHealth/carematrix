import { Component, OnInit } from '@angular/core';
import { LifeStyle } from 'src/app/models/shared-care-plan/scp-adapters';
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
  public lifeStyle:LifeStyle
  constructor(
    private dooleService: DooleService,
    public role: RolesService,
  ) { 
    this.lifeStyle = new LifeStyle( NotificationsType.EXERCISES, "exercices-detail")
  }

  ngOnInit() {
    this.getExercisesList()
  }

  async getExercisesList(){
    console.log('[ExercisesPage] getExercisesList()');
    this.items = []
    this.isLoading = true,  
    this.dooleService.getAPIExercises().subscribe(
      async (res: any) =>{      
        if(res.success){
          this.items = this.lifeStyle.adapterForView(
            res.exercises, // JSON
            'cover',  //img
            'name')   //title
         }
       },(err) => {
          console.log('[ExercisesPage] getExercisesList() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          this.isLoading = false
          throw err;
      });
  }

}
