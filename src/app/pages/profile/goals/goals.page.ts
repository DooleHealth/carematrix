import { ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentTypeIcons, ContentTypeTranslatedName } from 'src/app/models/shared-care-plan';
import { SharedCarePlanGoals } from 'src/app/models/shared-care-plan/scp-adapters';
import { DrugsDetailPage } from '../../diary/drugs-detail/drugs-detail.page';
import { ModalController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedCarePlanService } from 'src/app/services/shared-care-plan/shared-care-plan.service';
import { DooleService } from 'src/app/services/doole.service';
import { TranslateService } from '@ngx-translate/core';
import { PermissionService } from 'src/app/services/permission.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {
  listItem: any[] = []
  nameContent: string = ContentTypeTranslatedName.Goals
  iconContent = ContentTypeIcons.Goals
  private scpGoals:SharedCarePlanGoals
  isLoading = false
  challenge: any;
  current_level: any;
  progressBarValue = 0;
  goalsList = [];
  goals = [];
  segment = "goals"
  @Input()event: any;
  items = []
  isRequired = false
  isChallengeCompleted = false
  fetching = true;

  constructor(
    public router:Router,
    private scpService: SharedCarePlanService,
    private dooleService: DooleService,
    private ngZone: NgZone,
    public translate: TranslateService, 
    private changeDetectorRef: ChangeDetectorRef,
    public permissionService: PermissionService,
    public authService: AuthenticationService
    // private modalCtrl: ModalController,
    // private notification: NotificationService,
    ) { 
      this.scpGoals = new SharedCarePlanGoals()
    }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.refreshPage(null);
    
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
  async getChallenge() {
    let goalsAll =[];
    this.goalsList = [];
    this.isLoading = true;
    await this.dooleService.getAPIChallenges2().subscribe(
      async (res: any) => {
        await res;
        let goal= res.challenges
         goal.forEach(g => {
          if(g.aderence.isCompleted != true){
           // goalsAll.push(g)
            this.goalsList.push(g)
          }
         });
         this.isLoading = false;
      }, (err) => {
        console.log('[DetailPage] getAPIChallenge() ERROR(' + err.code + '): ' + err.message);
        this.isLoading = false;
        throw err;
      });
  }

  async getChallengeCompleted() {
    let goalsAll =[];
    this.goalsList = [];
    this.isLoading = false;
    await this.dooleService.getAPIChallenges2().subscribe(
      async (res: any) => {
        await res;
        let goal = res.challenges

         goal.forEach(g => {
          if(g.aderence.isCompleted){
            console.log("PUSH COMPLETED GOAL")
            this.goalsList.push(g)
          }
         });
         console.log(this.goalsList)
         this.isLoading = false;
      }, (err) => {
        console.log('[DetailPage] getAPIChallenge() ERROR(' + err.code + '): ' + err.message);
        throw err;
      });
  }
 

  setChallenge(res) {
    this.goals = res?.current_level?.goals;
    this.current_level = res?.current_level;
    this.challenge = res?.challenge;
    this.isChallengeCompleted = res.challenge_completed
    let name = '';
    let message = '';
    let link = '';
    let id = '';
    let tempGoals = [];
    let type = ''
    this.goals?.forEach(goal => {
      if(goal?.required)
      this.isRequired = true
      switch (goal?.goalable_type) {
        case "App\\Form":

          if (goal.hasOwnProperty("form")) {
            id = goal?.form?.id;
            message = this.translate.instant("health_path.form") //+ '"' + goal?.form?.title + '"';
            name =   goal?.form?.title
          } else {
            id = goal?.goalable?.id;
            message = this.translate.instant("health_path.form")// + '"' + goal?.goalable?.title + '"';
            name =   goal?.goalable?.title
          }
          link = '/journal/add';
          break;

        case "App\\Drug":
          id = goal?.drug?.id;
          name =  goal?.drug?.name;
          message = this.translate.instant("health_path.drug");
          link = '/form';
          break;
        case "App\\News":
          id = goal?.news?.id;
          name =   goal?.news?.subject;
          message = this.translate.instant("health_path.news") //+ '"' + goal?.news?.subject + '"';
          link = '/form';
          break;
        case "App\\Advice":
          id = goal?.advice?.id;
          name =  goal?.advice?.name;
          message = this.translate.instant("health_path.advice") //+ '"' + goal?.advice?.name + '"';
          link = '/form';
          break;
        case "App\\Diet":
          id = goal?.diet?.id;
          name =  goal?.diet?.name;
          message = this.translate.instant("health_path.diet") //+ '"' + goal?.diet?.name + '"';
          link = '/form';
          break;
        case "App\\Element":
          id = goal?.element?.id;
          name =  goal?.element?.name;
          message = this.translate.instant("health_path.measure") //+ '"' + goal?.element?.name + '"';
          link = '/form';
          break;
        case "App\\Game":
          if (goal?.game?.form) {
            id = goal?.game?.form_id;
            name =  goal?.game?.form?.title;
            type = 'form';
          }else{
            id = goal?.game?.id;
            name =  goal?.game?.title;
            type = 'game';
            link = goal?.game?.url_access;
          }
          message = this.translate.instant("health_path.game") //+ '"' + goal?.element?.name + '"';
          break;
        default:
          name = '';
          message = ''
          link = '';
          console.error("goal.goalable_type not found: ", goal)
          break;
      }
      tempGoals.push({ name: name, message: message, link: link, id: id, goalable_type: goal?.goalable_type, completed: goal?.completed, required: goal?.required, type: type })
    });
    
    this.goalsList = tempGoals;
    console.log("gsetChallenge() ", this.goalsList)
    //this.progressBarValue = this.current_level?.percentage_completed > 0 ? this.current_level?.percentage_completed / 100 : 0;
    this.fetching = false;
    this.changeDetectorRef.detectChanges();

  }

  async segmentChanged($event?){
      
    console.log('[DiaryPage] segmentChanged()', this.segment);
    console.log('[DiaryPage] event()', $event);
    this.items = []
    switch (this.segment) {
      case 'goals':
        //await this.getDietList()
        await this.getChallenge()
        break;
      case 'achievements':
        await this.getChallengeCompleted()
        break;
      default:
        console.log('Segment not found');
        break;
    }
  }


  refreshPage(data: any) {
    console.log("Entro desde goal page")
    if (this.permissionService.canViewGoals) this.getChallenge();
  }

}
