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
  PATH_USERDATA= '/user/element/goals'
  listGoal: GoalUser[]
  nameGoal: string = 'Doolehealth'

  constructor(
    public router:Router,
    private translate: TranslateService,
    private dooleService: DooleService) { }

  ngOnInit() {
    this.getAll()
  }

  getAll(){
    this.dooleService.getAPIhome(this.PATH_USERDATA).subscribe(
      async (res: any) =>{
        console.log('[GoalsPage] getAll()', await res);
        this.listGoal = res.goals as GoalUser[]
        //this.showInformation()
       },(err) => { 
          console.log('getAll ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  showInformation(){
    //
   // this.nameGoal = this.listGoal.name
  }

  openActivities(){
    this.router.navigateByUrl('/activity-goal')
  }

}
