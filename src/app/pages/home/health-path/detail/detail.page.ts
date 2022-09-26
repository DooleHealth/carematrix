import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ElementsAddPage } from 'src/app/pages/tracking/elements-add/elements-add.page';
import { DooleService } from 'src/app/services/doole.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AdvicesPage } from '../../advices/advices.page';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  fetching = true;
  challenge = history.state?.challenge;
  progressBarValue = this.challenge?.current_level?.percentage_completed>0 ? this.challenge?.current_level?.percentage_completed/100:0;
  path = {
    "game": "El camino a la salud",
    "level": "nivel TRES",
    "score": "Tienes 30 healthies consigue 15 más y pasa al siguiente nivel",
    "goal": 45
  };
  goalsText = [];
  goals = [];


  constructor(public translate: TranslateService, private dooleService:DooleService,  private modalCtrl: ModalController,  private notification: NotificationService,   private router: Router,) { }

  ngOnInit() {
    this.getGoals();
  }


  getGoals() {
    this.goalsText = [];
    
    this.dooleService.getAPILevelInfo(this.challenge?.id, this.challenge?.current_level?.id).subscribe(
      async (res: any) => {
        
        console.log(await res)
        this.goals=res?.goals;
        let message = ''
        let link = '';
        this.goals.forEach(goal => {
          switch (goal.goalable_type) {
            case "App\\Form":
              message = this.translate.instant("health_path.form") + '"' +goal?.goalable?.title +'"';
              link = '/journal/add';
              break;
            case "App\\Drug":
              message = this.translate.instant("health_path.drug") + '"' + goal.drug.name +'"';
              link = '/form';
              break;
            case "App\\News":
              message = this.translate.instant("health_path.news") + '"' + goal.news.subject +'"';
              link = '/form';
              break;
            case "App\\Advice":
              message = this.translate.instant("health_path.advice");
              link = '/form';
              break;
            case "App\\Element":
              message = this.translate.instant("health_path.weight") + '"' + goal.element.name +'"';
              link = '/form';
              break;
            default:
              message = ''
              link = '';
              console.error("goal.goalable_type not found: ", goal.goalable_type)
              break;
          }
          this.goalsText.push({name:message, link:link, id:goal.id, goalable_type:goal.goalable_type})

    
        });
        this.fetching = false;

      }, (err) => {
        console.log('[HealthPathPage] getAPIChallenge() ERROR(' + err.code + '): ' + err.message);
        throw err;
      }), () => {
        
      };
   
  }


  async openGoal(goal){

    console.log('goal', goal)
    let message = ''
    let link = '';
    switch (goal?.goalable_type) {
      case "App\\Form":
        this.router.navigate(['/tracking/form', {id:goal.id}] );
        break;
      case "App\\Drug":
        message = this.translate.instant("health_path.drug") + '"' + goal.drug.name +'"';
        link = '/form';
        break;
      case "App\\News":
        message = this.translate.instant("health_path.news") + '"' + goal.news.subject +'"';
        link = '/form';
        break;
      case "App\\Advice":
        this.openModal(AdvicesPage,{});
        break;
      case "App\\Element":
       this.openModal(ElementsAddPage, {id:goal.id});
        break;
      default:
        message = ''
        link = '';
        console.error("goal.goalable_type not found: ", goal.goalable_type)
        break;
    }
    
    }

    async openModal(component, componentProps){
      const modal = await this.modalCtrl.create({
        component: component,
        componentProps: componentProps,
      });
    
      modal.onDidDismiss()
        .then((result) => {
          console.log('modal.onDidDismiss: ', result);
          if(result?.data?.error){
          }else if(result?.data?.action == 'add'){
            this.notification.displayToastSuccessful()
            
          }
        });
    
        await modal.present(); 
    }
}
