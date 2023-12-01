import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ContentTypeIcons, ContentTypeTranslatedName } from 'src/app/models/shared-care-plan';
import { LifeStyle } from 'src/app/models/shared-care-plan/scp-adapters';
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
  public lifeStyle:LifeStyle
  isLoading = false
  constructor(
    public router:Router,
    private dooleService: DooleService) { 
      this.lifeStyle = new LifeStyle( NotificationsType.GOALS, "/activity-goal")
    }

  ngOnInit() {
    this.getGoalImformation()
  }

  getGoalImformation(){
    this.isLoading = true
    this.dooleService.getAPIgoals().subscribe(
    //this.dooleService.getAPI_SCP_goals().subscribe(
      async (res: any) =>{
        console.log('[GoalsPage] getGoalImformation()', await res);
        this.listGoal = this.lifeStyle.adapterForView(
          res.goals, // JSON
          'cover',  //img
          'name')   //title
        this.isLoading = false
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
