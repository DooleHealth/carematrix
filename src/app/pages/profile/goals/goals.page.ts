import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GoalUser } from 'src/app/models/goal-user';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {
  listGoal: GoalUser[] = []
  nameGoal: string = 'Doolehealth'
  isLoading = false
  constructor(
    public router:Router,
    private dooleService: DooleService) { }

  ngOnInit() {
    this.getGoalImformation()
  }

  getGoalImformation(){
    this.isLoading = true
    this.dooleService.getAPIgoals().subscribe(
      async (res: any) =>{
        console.log('[GoalsPage] getGoalImformation()', await res);
        this.listGoal = res.goals as GoalUser[]
        this.isLoading = false
       },(err) => { 
          console.log('getGoalImformation() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }


  openActivities(){
    this.router.navigateByUrl('/activity-goal')
  }

}
