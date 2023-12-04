import { Component, OnInit } from '@angular/core';
import { ContentTypeIcons, ContentTypeTranslatedName } from 'src/app/models/shared-care-plan';
import { MedicalPlanGoalsAdapter, SharedCarePlanGoals } from 'src/app/models/shared-care-plan/scp-adapters';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
  private scpProcedures:MedicalPlanGoalsAdapter
  isLoading = false
  constructor(
    private scpService: SharedCarePlanService,
    private authService: AuthenticationService,
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.scpProcedures = new MedicalPlanGoalsAdapter()
  }

  ionViewWillEnter() {
    this.getProceduresImformation()
  }


  getProceduresImformation(){
    this.listItem = []
    this.isLoading = true
    this.scpService.getAPI_SCP_procedures(this.authService.user.idUser).subscribe(
      async (res: any) =>{
        console.log('[ProceduresPage] getProceduresImformation()', await res);
        this.listItem = this.scpProcedures.adapterForView(
          res, // JSON 
          'title',  //title
          'data',  //date
          'type', //type
          'staff', //staff
          'department',
          null // se espera una imagen
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
    if(date)
      return this.dateService.selectedDateFormat2(date) 
    return ''
  }

}
