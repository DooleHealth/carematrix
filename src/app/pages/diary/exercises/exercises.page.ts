import { Component, OnInit } from '@angular/core';
import { ContentTypeIcons, ContentTypeTranslatedName } from 'src/app/models/shared-care-plan';
import { LifeStyle } from 'src/app/models/shared-care-plan/scp-adapters';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';
import { NotificationsType } from 'src/app/models/notifications/notification-options';
import { Router } from '@angular/router';
import { SharedCarePlanService } from 'src/app/services/shared-care-plan/shared-care-plan.service';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {
  segment="exercises"
  exercises: Array<any>;
  items: any[] = []
  nameContent: string = ContentTypeTranslatedName.Exercises
  iconContent = ContentTypeIcons.Exercises
  isLoading = false
  public lifeStyle:LifeStyle
  constructor(
    private dooleService: DooleService,
    public role: RolesService,
    private router: Router,
    private scp: SharedCarePlanService,
    private dateService: DateService,
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
          this.exercises = []
          this.exercises = res
          this.adapterForView(this.exercises)
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


  adapterForView(list) {
    if (Array.isArray(list)) {


      console.log(list);
      list.forEach(element => {
        let image = "";
        const temporaryUrl = element.media;
        if (temporaryUrl?.hasOwnProperty("temporaryUrl")) {
          image = temporaryUrl.temporaryUrl
        }

        // let show=this.IsAllowed(element.from_date);

        //Se adapta la respuesta de la API a lo que espera el componente  
        let modelType = element.content_type.replace(/App\\/, '')

        console.log(element.last_accepted_or_declined);
        let data = {
          img: image === "" ? element.exercise.cover: image,
          title: element.exercise.name,
          from: this.transformDate(element?.from_date),
          to: this.transformDate(element?.to_date),
          form_id: element.form_id,
          accepted: this.accepterOrDecline(element.last_accepted_or_declined), 
          type: "exercises",
          description: "",
          id: element.id,
          model_id: element.id,
          model: modelType,
          showAlert: this.showAlert(element.from_date),
          routerLink: null,
          state: element?.last_accepted_or_declined?.type
        }
        this.items.push(data)
      })
    }
  }

  transformDate(date) {
    if (date != null) {
      return this.dateService.ddMMyFormat(date)
    } else {
      return ""
    }

    
  }

  showAlert(date) {
    return this.dateService.isToday(new Date(date))
  }


  accepterOrDecline(datos){
    console.log(datos)
    if(datos === null || datos === undefined){
      return false;
    }else{
      return true;
    }
  }
}