import { Component, OnInit } from '@angular/core';
import { ContentTypeIcons, ContentTypeTranslatedName } from 'src/app/models/shared-care-plan';
import { SharedCarePlanGoals } from 'src/app/models/shared-care-plan/scp-adapters';
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
  private scpGoals:SharedCarePlanGoals
  isLoading = false
  constructor(
    private scpService: SharedCarePlanService,
    
  ) { }

  ngOnInit() {
    this.scpGoals = new SharedCarePlanGoals()
  }


  getGoalImformation(){
    this.listItem = []
    this.isLoading = true
    this.scpService.getAPI_SCP_goals().subscribe(
      async (res: any) =>{
        console.log('[GoalsPage] getGoalImformation()', await res);
        this.listItem = this.scpGoals.adapterForView(
          res.goals, // JSON 
          'name',  //title
          'from_date',  //date
          'content_type', //type
          'is_new_content' //is_new_content
          )  
        this.isLoading = false
        //console.log('[GoalsPage] getGoalImformation() goals', await this.listItem);
       },(err) => { 
          console.log('getGoalImformation() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }

}
