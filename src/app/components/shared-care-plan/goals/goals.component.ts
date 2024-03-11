import { ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DietsDetailPage } from 'src/app/pages/diary/diets-detail/diets-detail.page';
import { AdvicesDetailPage } from 'src/app/pages/home/advices-detail/advices-detail.page';
import { NewDetailPage } from 'src/app/pages/home/new-detail/new-detail.page';
import { ElementsAddPage } from 'src/app/pages/tracking/elements-add/elements-add.page';
import { FormPage } from 'src/app/pages/tracking/form/form.page';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { PermissionService } from 'src/app/services/permission.service';
import { PusherChallengeNotificationsService } from 'src/app/services/pusher/pusher-challenge-notifications.service';
import { SharedCarePlanService } from 'src/app/services/shared-care-plan/shared-care-plan.service';

@Component({
  selector: 'app-goals-components',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
})
export class GoalsComponent  implements OnInit {
  @Input() content: any
  @Input() completedGoals: any
  @Output() reloadChallenges: EventEmitter<any> = new EventEmitter<any>();

  @Output() notifyGoalPage: EventEmitter<any> = new EventEmitter();

  canDoGoal:boolean = false;
  other = false;
  note = ''
  fetching = true;
  id = history.state?.challenge?.id;
  title = history.state?.challenge?.name;
  aderence: any;
  current_level: any;
  progressBarValue = 0;
  goalsList = [];
  goals = [];
  isRequired = false
  isChallengeCompleted = false;
  last_accepted_or_declined;
  constructor(public translate: TranslateService,   private changeDetectorRef: ChangeDetectorRef,private modalCtrl: ModalController, private alertController: AlertController, 
    private pusher: PusherChallengeNotificationsService, private router: Router, private iab: InAppBrowser,  public sharedCarePlan: SharedCarePlanService,
    private ngZone: NgZone, public authService: AuthenticationService, public permissionService: PermissionService, public dooleService: DooleService) { }

  ionViewWillEnter() {
    this.canDoGoal = (this.authService?.user?.familyUnit == undefined || this.authService?.user?.familyUnit == null) && this.permissionService.canViewGoals;
   

    this.note = this.translate.instant('health_path.goal_note') 
    //this.setChallenge(this.content);
  }

  ngOnInit(){
    this.goals = [];
    this.current_level = [];
    this.aderence = [];
    this.setChallenge(this.content);
    console.log("goals..", this.content)
    this.canDoGoal = (this.authService?.user?.familyUnit == undefined || this.authService?.user?.familyUnit == null) && this.permissionService.canViewGoals;
   
  }
  setChallenge(res) {

    this.goals = res?.goals;
    this.current_level = res;
    this.aderence = res?.aderence;
    this.isChallengeCompleted = res.challenge_completed
    this.last_accepted_or_declined = (res.last_accepted_or_declined === null) ? null : res.last_accepted_or_declined;
    let status = (res.last_accepted_or_declined === null) ? 'pending' :  res.last_accepted_or_declined.type;
    console.log(status);
    let model_id = res.model_id;
    let name = '';
    let message = '';
    let link = '';
    let id = '';
    let form_id = '';
    let tempGoals = [];
    let type = '';
    let challenge_id = ''
    
    this.goals?.forEach(goal => {

      console.log(goal)
      if(goal?.required) this.isRequired = true

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

          if (goal?.drug?.name) name = goal?.drug?.name
          if (goal?.goalable?.name) name = goal?.goalable.name;

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

          if (goal?.advice?.name) name = goal?.advice?.name
          if (goal?.goalable?.name) name = goal?.goalable.name;
          id = goal?.goalable?.id;
          message = this.translate.instant("health_path.advice") //+ '"' + goal?.advice?.name + '"';
          link = '/form';
          break;
        case "App\\Diet":
          if (goal?.diet?.name) name = goal?.diet?.name
          if (goal?.goalable?.name) name = goal?.goalable.name;

          id = goal?.goalable_id;
          message = this.translate.instant("health_path.diet") //+ '"' + goal?.diet?.name + '"';
          link = '/form';
          break;
        case "App\\Element":
          id = goal?.goalable?.id;
          form_id = goal?.goalable?.form_id;
          name =  goal?.goalable?.name;
          message = this.translate.instant("health_path.measure") //+ '"' + goal?.element?.name + '"';
          link = '/form';
          break;
        case "App\\Game":

          if (goal?.isForm) {

            id = goal?.goalable.form_id;
            challenge_id = this.content.id;
            
            name =  goal?.game?.form?.title;
            type = 'form';
          }else{
            id = goal?.goalable_id;
            name =  goal?.goalable?.title;
            type = 'game';
            link = goal?.goalable?.url; 
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
      if (status !== "declined")  {
        tempGoals.push({ name: name, message: message, link: link, id: id, goalable_type: goal?.goalable_type, completed: goal?.aderence?.isCompleted, required: goal?.required, type: type, status: status, model_id: model_id, form_id: form_id, challenge_id: challenge_id})
      }
    });
    
    this.goalsList = tempGoals;
    console.log("gsetChallenge() ", this.goalsList)
   
    this.progressBarValue = this.current_level?.percentage_completed > 0 ? this.current_level?.percentage_completed / 100 : 0;

   
    this.fetching = false;
    this.changeDetectorRef.detectChanges();

  }
 
  async openGoal(goal) {

    console.log('goal', goal)
    let message = ''
    let link = '';

    console.log(goal);

    if (this.canDoGoal) {
      switch (goal?.goalable_type) {
        case "App\\Form":
          this.openModal(FormPage,{ id: goal.id, form_id:  goal.form_id ,isModal: true });
          //this.router.navigate(['/tracking/form', { id: goal.id }]);
          break;
        case "App\\Drug":
          this.router.navigate(['/journal'], { state: { segment: 'medication' } });
          break;
        case "App\\News":
          //this.router.navigate(['/new-detail'], { state: { id: goal.id } });
          this.openModal(NewDetailPage,{ id: goal.id });
          break;
        case "App\\Advice":
          //this.router.navigate(['/advices-detail'], { state: { id: goal.id } });
          this.openModal(AdvicesDetailPage,{ id: goal.id });
          break;
        case "App\\Diet":
          //this.router.navigate(['/advices-detail'], { state: { id: goal.id } });
          this.openModal(DietsDetailPage,{ id: goal.id });
          break;
        case "App\\Element":
          this.openModal(ElementsAddPage, { id: goal.id, nameElement: goal.name, units: '' });
          //this.presentAlert(goal);
          break;
        case "App\\Game":
          console.log('openGoal goal: ', goal);
          if(goal?.type == 'form')
          this.openModal(FormPage,{ id: goal?.id, challengeId: goal.challenge_id,  isModal: true});
          else{
            //this.router.navigate(['/tracking/games-detail'], { state: { id: goal.id } });
            this.getGameDetail(goal.id);
            
          }
          break;
        default:
          message = ''
          link = '';
          console.error("goal.goalable_type not found: ", goal)
          break;
      }
    }
  }


  getGameDetail(id) {
    this.dooleService.getAPIgameId(id).subscribe(
      async (res: any) => {
        if (res.success) {
          this.openGames(res.game.url)
        }
        
      }, (err) => {
        throw err;
      })
  }

  async openModal(component, componentProps) {
    const modal = await this.modalCtrl.create({
      component: component,
      componentProps: componentProps,
      cssClass: 'my-custom-class'
    });

    this.pusher.isModalShowing = true;

    modal.onDidDismiss()
      .then(async (result) => {

        this.pusher.isModalShowing = false;
        if (this.pusher?.pendingNotification?.show) {
          this.pusher.presentChallengeNotification(this.pusher?.pendingNotification?.data);
        }
        this.ngZone.run(() => {
          this.refreshPage()
      });


      });

    await modal.present();
  }

  getChallengeNotification(){

    if (this.pusher?.pendingNotification?.show) {
      this.pusher.presentChallengeNotification(this.pusher?.pendingNotification?.data);
    }
    this.ngZone.run(() => {
    //  this.getChallenge();
    });
  }

  async presentAlert(goal) {
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

  async openGames(url_access){

    var browser : any;
      const iosoption: InAppBrowserOptions = {
        zoom: 'no',
        location:'yes',
        toolbar:'yes',
        clearcache: 'yes',
        clearsessioncache: 'yes',
        disallowoverscroll: 'yes',
        enableViewportScale: 'yes'
      }

      this.pusher.isModalShowing = true;

      if(url_access?.startsWith("http"))
        browser = this.iab.create(url_access, '_blank', "hidden=no,location=no,clearsessioncache=yes,clearcache=yes");
      else
        browser = this.iab.create(url_access, '_system', "hidden=no,location=no,clearsessioncache=yes,clearcache=yes");

      browser.on('exit')?.subscribe(event => {
        this.ngZone.run(() => {
          console.log("openGames event: ", JSON.stringify(event) );
          //alert(JSON.stringify(event))
          this.pusher.isModalShowing = false;
          this.getChallengeNotification()
        });
      });


    }


          async AcceptOrDeclined(id) {
            
            this.other = true;
            let model = "Level";
            let model_id = id;
        
            this.translate.get('info.button').subscribe(
              async button => {
                // value is our translated string
                const alert = await this.alertController.create({
                  cssClass: "alertClass",
                  header: this.translate.instant('goals.accepted_rejected'),
                  buttons: [
                    {
                      text: this.translate.instant('goals.button_rejected'),
                      cssClass: "boton-reject",
                      handler: () => {
                        // Lógica para rechazar
                        if (this.permissionService.canManageGoals) this.dismissAndRejectAlert(model, model_id);
                      }
                    },
                    {
                      text: this.translate.instant('goals.button_accepted'),
                      cssClass: "boton-accepted",
                      handler: () => {
                        if (this.permissionService.canManageGoals) {
                          let type = "accepted"
                          this.sharedCarePlan.post_API_ACP_declined_acepted(model, model_id, type).subscribe(
                            async (data: any) => {
                              if (data) {
                                this.reloadChallenges.emit();
                              }
          
                            }
          
                          )
                        }
                      }
                    }
                  ]
                });
        
                await alert.present();
              });
        
          }
        
          async showAlertForm() {
        
          }
        
          async dismissAndRejectAlert(model, model_id) {
            let type = "declined"
            const alert = await this.alertController.create({
              cssClass: 'alertClass',
              header: this.translate.instant( 'goals.accepted_rejected'),
              inputs: [
                {
                  label: this.translate.instant('goals.rejectd_option1'),
                  type: 'radio',
                  value: this.translate.instant('goals.rejectd_option1'),
                  name: 'rejectOption',
                  checked: true
                },
                {
                  label: this.translate.instant('goals.rejectd_option2'),
                  type: 'radio',
                  value: this.translate.instant('goals.rejectd_option2'),
                  name: 'rejectOption'
                }, {
                  label: this.translate.instant('goals.rejectd_option3'),
                  type: 'radio',
                  value: this.translate.instant('goals.rejectd_option3'),
                  name: 'rejectOption'
                },
                {
                  name: 'campoInput',
                  id: 'campoInput',
                  type: 'textarea',
                  disabled: true,
                  placeholder: this.translate.instant('goals.placeholder'),
                  cssClass: 'custom-textarea'
                }
              ],
              buttons: [
                {
                  text: this.translate.instant('alert.button_cancel'),
                  role: 'cancel',
        
                  cssClass: 'secondary',
                  handler: () => {
                    console.log('Botón Cancelar presionado');
                    this.other = false;
                  }
                },
                {
                  text: this.translate.instant('alert.button_send'),
                  id: "sendButtons",
        
                  // disabled: !this.isButtonEnabled,
                  handler: async (data) => {
                    console.log('[ScpMedForMonComponent] presentAlert()', data);
                    if (data === undefined)
                      return false
                    this.alertSendReject()
        
                    await this.sharedCarePlan.post_API_ACP_declined_acepted(model, model_id, type, data).subscribe(
        
                      async (data: any) => {
        
                        if (data) {
                          this.reloadChallenges.emit();
                          this.other = false;
                        }
        
                      }
                    )
        
                  }
                }
              ]
            });
        
            alert.addEventListener('ionChange', (event) => {
              const selectedValue = (event.target as HTMLInputElement).value;
              const campoInput = alert.inputs.find(input => input.name === 'campoInput');
        
              // Enable campoInput if 'other' is selected, otherwise disable it
              campoInput.disabled = selectedValue !== 'other';
            });
        
            // Cerrar el primer alert antes de mostrar el segundo
            const firstAlert = document.querySelector('ion-alert');
            if (firstAlert) {
              await firstAlert.dismiss();
            }
        
            await alert.present();
          }
        
          async alertSendReject() {
        
            this.translate.get('info.button').subscribe(
              async button => {
                // value is our translated string
                const alert = await this.alertController.create({
                  cssClass: "alertClass",
                  header: this.translate.instant('goals.rejectd_send'),
                  // subHeader: 'Subtitle',
                  //  message: this.translate.instant('medication.alert_forms'),
                  buttons: [button]
                });
        
                await alert.present();
              });
        
        
          }

          refreshPage() {
            console.log("Entro");
            this.reloadChallenges.emit();
          }
}
