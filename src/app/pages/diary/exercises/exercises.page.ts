import { Component, OnInit } from '@angular/core';
import { ContentTypeIcons, ContentTypeTranslatedName } from 'src/app/models/shared-care-plan';
import { LifeStyle } from 'src/app/models/shared-care-plan/scp-adapters';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';
import { NotificationsType } from 'src/app/models/notifications/notification-options';
import { Router } from '@angular/router';
import { SharedCarePlanService } from 'src/app/services/shared-care-plan/shared-care-plan.service';

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
    private router: Router,
    private scp: SharedCarePlanService
  ) { 
    this.lifeStyle = new LifeStyle( NotificationsType.EXERCISES, "exercices-detail")
  }

  ngOnInit() {
    this.getExercisesList()
  }

  loaderAgain(event: { type: string }) {  
    this.getExercisesList()
  }

  async getExercisesList(){
    console.log('[ExercisesPage] getExercisesList()');
    this.items = []
    this.isLoading = true,  
  //  this.dooleService.getAPIExercises().subscribe(
    this.scp.getAPIExercises().subscribe(
      async (res: any) =>{      
        if(res){
          console.log("aaa", res)
          this.items = this.lifeStyle.adapterForView(
            res, // JSON
            'cover',  //img
            'name',   //title
            'exercise')   //id
         }
         this.isLoading = false 
       },(err) => {
          console.log('[ExercisesPage] getExercisesList() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          this.isLoading = false
          throw err;
      });
  }

  handleRedirect(event: { type: string, routerlink: string,  }) {   
    console.log("entro a la redireccion")  
   // this.router.navigate([`/activity-goal`]);
    this.router.navigate([event.routerlink]);
   
  }

}
