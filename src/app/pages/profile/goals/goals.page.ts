import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ContentTypeIcons, ContentTypeTranslatedName } from 'src/app/models/shared-care-plan';
import { SharedCarePlanGoals } from 'src/app/models/shared-care-plan/scp-adapters';
import { DooleService } from 'src/app/services/doole.service';
import { NotificationsType } from 'src/app/shared/classes/notification-options';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {
  listGoal: any[] = []
  nameGoal: string = ContentTypeTranslatedName.Goals
  iconGoals = ContentTypeIcons.Goals
  public scpGoals:SharedCarePlanGoals
  isLoading = false
  constructor(
    public router:Router,
    private dooleService: DooleService) { 
      this.scpGoals = new SharedCarePlanGoals()
    }

  ngOnInit() {
    this.getGoalImformation()
  }

  getGoalImformation(){
    this.listGoal = []
    this.isLoading = true
    //this.dooleService.getAPIgoals().subscribe(
    this.dooleService.getAPI_SCP_goals().subscribe(
      async (res: any) =>{
        console.log('[GoalsPage] getGoalImformation()', await res);
        this.listGoal = this.scpGoals.adapterForView(
          res.goals, // JSON 
          'name',  //title
          'from_date',  //date
          'content_type', //type
          'is_new_content' //is_new_content
          )  
        this.isLoading = false
        console.log('[GoalsPage] getGoalImformation() goals', await this.listGoal);
       },(err) => { 
          console.log('getGoalImformation() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }

  formatDate(d){
    var auxdate = d.split(' ')
    //let date = new Date(auxdate[0]);
    d = d.replace(' ', 'T')
    let date0 = new Date(d).toUTCString();
    let date = new Date(date0);
    let time = auxdate[1];
    date.setHours(time.substring(0,2));
    date.setMinutes(time.substring(3,5));
    return date;
  }

}
