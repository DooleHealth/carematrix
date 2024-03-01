import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentTypeIcons, ContentTypeTranslatedName } from 'src/app/models/shared-care-plan';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DateService } from 'src/app/services/date.service';
import { PermissionService } from 'src/app/services/permission.service';
import { SharedCarePlanService } from 'src/app/services/shared-care-plan/shared-care-plan';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.page.html',
  styleUrls: ['./monitoring.page.scss'],
})
export class MonitoringPage implements OnInit {
  canDoHealhCharts:boolean = false;
  listItem: any[] = []
  items = [];
  isLoading = false;
  nameContent: string = ContentTypeTranslatedName.Monitoring
  iconContent = ContentTypeIcons.Monitoring
  constructor(
    public sharedCarePlan:SharedCarePlanService, private router: Router,public dateService: DateService,public authService: AuthenticationService, public permissionService: PermissionService
  ) { }

  ngOnInit() {
    this.canDoHealhCharts = this.authService?.user?.familyUnit == null && this.permissionService.canViewGoals;
    this.getFormList();
  }


  async getFormList(){
    this.sharedCarePlan.get_APi_ACP_monitoring().subscribe(
      async (res: any) =>{
        console.log("monitoring", res)  
        this.adapterForView(res)  
       },async (err) => {
          alert(`Error: ${err.code }, Message: ${err.message}`)
          console.log('[TrackingPage] getDiagnosticTests() ERROR(' + err.code + '): ' + err.message);
          throw err;
      });
}


adapterForView(list){
  list.forEach(element => {  
    let image = "" ;
    const temporaryUrl = element.media;
    if(temporaryUrl?.hasOwnProperty("temporaryUrl")){
          image = temporaryUrl.temporaryUrl
    }   
    let goals = "" ;
    const typeString = element.goals;
    if(typeString?.hasOwnProperty("typeString")){
      goals = typeString.typeString
    }  
  //Se adapta la respuesta de la API a lo que espera el componente  
    let data={
      img: image  ,//element.temporaryUrl,
      title: element.name,
      from: "",//element.from_date,
      to:  "",//element.to_date,
      lastdata: element.value,
      date: element.date_value,
     // accepted: this.accepterOrDecline(element.last_accepted_or_declined), 
      type: "App\\Monitoring",
      description: goals, //element.frequencyName,
      form_id:element.id,
      routerLink: ""//['form', { id: element?.id }]
    }


    console.log("cdata", data)
    this.items.push(data)
  })
}
handleRedirect(event: { type: string, form_id: string, showAlerts:boolean }) {   
  console.log("entro a la redireccion")     

  this.router.navigate([`/activity-goal`], { state: { id: event.form_id } });
 
}
transformDate(date) {
  
  if (date != null) {
    return this.dateService.formatDateLongFormat(date)
  } else {
    return ""
  }

}
}
