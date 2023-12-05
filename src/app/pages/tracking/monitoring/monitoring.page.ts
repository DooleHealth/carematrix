import { Component, OnInit } from '@angular/core';
import { ContentTypeIcons, ContentTypeTranslatedName } from 'src/app/models/shared-care-plan';
import { SharedCarePlanService } from 'src/app/services/shared-care-plan/shared-care-plan';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.page.html',
  styleUrls: ['./monitoring.page.scss'],
})
export class MonitoringPage implements OnInit {
  listItem: any[] = []
  items = [];
  isLoading = false;
  nameContent: string = ContentTypeTranslatedName.Monitoring
  iconContent = ContentTypeIcons.Monitoring
  constructor(
    public sharedCarePlan:SharedCarePlanService, 
  ) { }

  ngOnInit() {
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
     // accepted: this.accepterOrDecline(element.last_accepted_or_declined), 
      type: "App\\Monitoring",
      description: goals, //element.frequencyName,
      id:element.id,
      routerLink: ""//['form', { id: element?.id }]
    }


    console.log("cdata", data)
    this.items.push(data)
  })
}

}
