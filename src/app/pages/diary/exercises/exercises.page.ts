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
  segment="Exercises"
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
    this.isLoading = true 
    let  params={
      tags:1,
      interactions:1,
      readingTime:1
    }
  //  this.dooleService.getAPIExercises().subscribe(
    this.scp.getAPIExercises(params).subscribe(
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
          image: image === "" ? element.exercise.cover: image,
          name: element.exercise.name,
          scheduled_date: this.transformDate(element?.from_date),
          form_id: element.form_id,
          type: "Exercises",
          description: "",
          id: element.id,
          programable_id: element.programable_id,
          model_id: element.id,
          model: modelType,
          showAlert: this.showAlert(element.from_date),
          routerLink: null,
          state: element?.last_accepted_or_declined?.type,
          frequency: element.frequency,
          from_date: element.from_date,
          to_date: element.to_date,
          statusable: element.statusable,
          interactions: element.exercise.interactions,
          tags_name: element.exercise.tags_name
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

  filterListExercises(event) {
    
    const searchTerm = event.srcElement.value.toLowerCase(); 
    let search = this.items
    const filteredItems = search.filter(item => {
      const subject = item.subject.toLowerCase();
      return subject.includes(searchTerm) || subject === searchTerm;
    });
      this.items = (filteredItems)
  };
}