import { Component, OnInit } from '@angular/core';
import { ContentTypeIcons, ContentTypeTranslatedName } from 'src/app/models/shared-care-plan';
import { MedicalPlanProceduresAdapter, SharedCarePlanGoals } from 'src/app/models/shared-care-plan/scp-adapters';
import { DateService } from 'src/app/services/date.service';
import { SharedCarePlanService } from 'src/app/services/shared-care-plan/shared-care-plan.service';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.page.html',
  styleUrls: ['./procedures.page.scss'],
})
export class ProceduresPage implements OnInit {
  listItem: any[] = []
  nameContent: string = ContentTypeTranslatedName.MedicalProcedure
  iconContent = ContentTypeIcons.MedicalProcedure
  private scpProcedures:MedicalPlanProceduresAdapter
  isLoading = false
  currentDate;
  isDateInPast = false;
  constructor(
    private scpService: SharedCarePlanService,
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.scpProcedures = new MedicalPlanProceduresAdapter()
    this.getCurrentDate();
  }

  ionViewWillEnter() {
    this.getProceduresImformation()
  }

  getIsDateInPast(date){
    
    this.isDateInPast = new Date(date) < this.currentDate;
    console.log("isDateInPast", this.isDateInPast)
    return this.isDateInPast

  }


  getProceduresImformation(){
    this.listItem = []
    this.isLoading = true
    this.scpService.getAPI_SCP_procedures().subscribe(
      async (res: any) =>{
        console.log('[ProceduresPage] getProceduresImformation()', await res);
        this.listItem = this.scpProcedures.adapterForView(
          res, // JSON 
          'title',  //title
          'data',  //date
          'type', //type
          'staff', //staff
          'department',
          'media' // se espera una imagen
          )  
        this.isLoading = false
        console.log('[ProceduresPage] getProceduresImformation() procedures', await this.listItem);
       },(err) => { 
          console.log('getProceduresImformation() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }

  setDate(date){
    if(date){     
      return this.dateService.selectedDateFormat2(date) 
    }
    return ''
  }

  getCurrentDate() {    
    // Obtener la fecha actual en el mismo formato que content.date
    this.currentDate = new Date();
    // ... Realizar cualquier formato necesario para que coincida con content.date
    return this.currentDate;
}

transformDate(date) {
  
  if (date != null) {
    return this.dateService.formatDateLongFormat(date)
  } else {
    return ""
  }

}
}
