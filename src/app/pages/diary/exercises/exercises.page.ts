import { Component, OnInit } from '@angular/core';
import { ContentTypeIcons, ContentTypeTranslatedName } from 'src/app/models/shared-care-plan';
import { LifeStyle } from 'src/app/models/shared-care-plan/scp-adapters';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';
import { NotificationsType } from 'src/app/models/notifications/notification-options';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {
  items: any[] = []
  nameContent: string = ContentTypeTranslatedName.Exercises
  iconContent = ContentTypeIcons.Exercises
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
         this.isLoading = false 
       },(err) => {
          console.log('[ExercisesPage] getExercisesList() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          this.isLoading = false
          throw err;
      });
  }

}
