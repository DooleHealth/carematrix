import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DietsDetailPage } from 'src/app/pages/diary/diets-detail/diets-detail.page';
import { ElementsAddPage } from 'src/app/pages/tracking/elements-add/elements-add.page';
import { FormPage } from 'src/app/pages/tracking/form/form.page';
import { DooleService } from 'src/app/services/doole.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PusherChallengeNotificationsService } from 'src/app/services/pusher/pusher-challenge-notifications.service';
import { AdvicesDetailPage } from '../../advices-detail/advices-detail.page';
import { AdvicesPage } from '../../advices/advices.page';
import { NewDetailPage } from '../../new-detail/new-detail.page';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {
  note = ''
  fetching = true;
  id = history.state?.challenge?.id;
  title = history.state?.challenge?.name;
  challenge: any;
  current_level: any;
  progressBarValue = 0;
  goalsList = [];
  goals = [];
  isRequired = false
  constructor(public translate: TranslateService, private dooleService: DooleService, private modalController: ModalController, private alertController: AlertController, private pusher: PusherChallengeNotificationsService, private router: Router,private changeDetectorRef: ChangeDetectorRef,  private ngZone: NgZone) { }

  ionViewWillEnter() {
    this.note = this.translate.instant('health_path.goal_note')
    this.getChallenge();
  }


  getChallenge() {

    this.dooleService.getAPIChallenge(this.id).subscribe(
      async (res: any) => {

        await res;
        console.log('[DetailPage] getAPIChallenge()', res);
        this.setChallenge(res);

      }, (err) => {
        console.log('[DetailPage] getAPIChallenge() ERROR(' + err.code + '): ' + err.message);
        throw err;
      });
  }

  setChallenge(res) {
    this.goals = res?.current_level?.goals;
    this.current_level = res?.current_level;
    this.challenge = res?.challenge;
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
            message = this.translate.instant("health_path.form") + '"' + goal?.form?.title + '"';
          } else {
            id = goal?.goalable?.id;
            message = this.translate.instant("health_path.form") + '"' + goal?.goalable?.title + '"';
          }
          link = '/journal/add';
          break;

        case "App\\Drug":
          name = goal?.drug?.name;
          message = this.translate.instant("health_path.drug") + '"' + goal?.drug?.name + '"';
          link = '/form';
          break;
        case "App\\News":
          id = goal?.news?.id;
          name = goal?.news?.subject;
          message = this.translate.instant("health_path.news") + '"' + goal?.news?.subject + '"';
          link = '/form';
          break;
        case "App\\Advice":
          id = goal?.advice?.id;
          name = '';
          message = this.translate.instant("health_path.advice") + '"' + goal?.advice?.name + '"';
          link = '/form';
          break;
        case "App\\Diet":
          id = goal?.diet?.id;
          name = '';
          message = this.translate.instant("health_path.diet") + '"' + goal?.diet?.name + '"';
          link = '/form';
          break;
        case "App\\Element":
          id = goal?.element?.id;
          name = goal?.element?.name;
          message = this.translate.instant("health_path.measure") + '"' + goal?.element?.name + '"';
          link = '/form';
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
    this.progressBarValue = this.current_level?.percentage_completed > 0 ? this.current_level?.percentage_completed / 100 : 0;
    this.fetching = false;
    this.changeDetectorRef.detectChanges();

  }


  async openGoal(goal) {

    console.log('goal', goal)
    let message = ''
    let link = '';
    switch (goal?.goalable_type) {
      case "App\\Form":
        this.openModal(FormPage,{ id: goal.id, isModal: true });
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
      default:
        message = ''
        link = '';
        console.error("goal.goalable_type not found: ", goal)
        break;
    }

  }

  async openModal(component, componentProps) {
    const modal = await this.modalController.create({
      component: component,
      componentProps: componentProps,
    });

    this.pusher.isModalShowing = true;

    modal.onDidDismiss()
      .then(async (result) => {

        this.pusher.isModalShowing = false;
        if (this.pusher?.pendingNotification?.show) {
          this.pusher.presentChallengeNotification();
        }
        this.ngZone.run(() => {
        this.getChallenge();
      });


      });

    await modal.present();
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
}
