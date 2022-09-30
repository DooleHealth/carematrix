import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ElementsAddPage } from 'src/app/pages/tracking/elements-add/elements-add.page';
import { DooleService } from 'src/app/services/doole.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AdvicesDetailPage } from '../../advices-detail/advices-detail.page';
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
  goalsText = [];
  goals = [];


  constructor(public translate: TranslateService, private dooleService:DooleService,  private modalController: ModalController, private alertController: AlertController, private notification: NotificationService,   private router: Router,) { }

  ngOnInit() {
    this.getGoals();
  }


  getGoals() {
    this.goalsText = [];
    
    this.dooleService.getAPILevelInfo(this.challenge?.id, this.challenge?.current_level?.id).subscribe(
      async (res: any) => {
        
        console.log(await res)
        this.goals=res?.goals;
        let name = '';
        let message = '';
        let link = '';
        let id = '';
        this.goals.forEach(goal => {
          switch (goal.goalable_type) {
            case "App\\Form":
             
              if (goal.hasOwnProperty("form")) {
                id = goal?.form?.id;
              message = this.translate.instant("health_path.form") + '"' +goal?.form?.title +'"';
              }else{
                id = goal?.goalable?.id;
              message = this.translate.instant("health_path.form") + '"' +goal?.goalable?.title +'"';
              }
              link = '/journal/add';
              break;
            case "App\\Drug":
              name = goal.drug.name;
              message = this.translate.instant("health_path.drug") + '"' + goal?.drug?.name +'"';
              link = '/form';
              break;
            case "App\\News":
              id = goal?.news?.id;
              name = goal.news.subject;
              message = this.translate.instant("health_path.news") + '"' + goal?.news?.subject +'"';
              link = '/form';
              break;
            case "App\\Advice":
              id = goal?.advice?.id;
              name = '';
              message = this.translate.instant("health_path.advice") + '"' + goal?.advice?.name +'"';
              link = '/form';
              break;
            case "App\\Element":
              id = goal?.element?.id;
              name =  goal.element.name;
              message = this.translate.instant("health_path.weight") + '"' + goal.element?.name +'"';
              link = '/form';
              break;
            default:
              name = '';
              message = ''
              link = '';
              console.error("goal.goalable_type not found: ", goal.goalable_type)
              break;
          }
          this.goalsText.push({name : name, message:message, link:link, id:id, goalable_type:goal.goalable_type})

    
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
        this.router.navigate(['/journal'], {state:{segment:'medication'}});
        break;
      case "App\\News":
        this.router.navigate(['/new-detail'], {state:{id:goal.id}} );
        break;
      case "App\\Advice":
        this.router.navigate(['/advices-detail'], {state:{id:goal.id}} );
        //this.openModal(AdvicesDetailPage,{});
        break;
      case "App\\Element":
        this.openModal(ElementsAddPage, {id:goal.id, nameElement:goal.name, units:''});
        //this.presentAlert(goal);
     
        break;
      default:
        message = ''
        link = '';
        console.error("goal.goalable_type not found: ", goal.goalable_type)
        break;
    }
    
    }

    redirect(){

    }

    async openModal(component, componentProps){
      const modal = await this.modalController.create({
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

    async presentAlert(goal) {
      // inputs: []
      // switch(type){
      //   case 'string':
      //     break;
      //   case 'numeric':
      //     let g = {
      //       type: 'number',
      //       placeholder: goal,
      //       min: 1,
      //       max: 100,
      //     }
         
      //     break;
      // }
      const alert = await this.alertController.create({
        header: goal?.name,
        buttons: ['OK'],
        inputs: [
          {
            type: 'number',
            placeholder: '',
            min: 1,
            max: 1000,
          }
        ],
      });
  
      await alert.present();
    }
}
