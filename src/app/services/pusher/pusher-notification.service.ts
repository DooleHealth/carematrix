import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/app/config/constants';
import { DietsDetailPage } from 'src/app/pages/diary/diets-detail/diets-detail.page';
import { RecipePage } from 'src/app/pages/diary/diets-detail/recipe/recipe.page';
import { AdvicesDetailPage } from 'src/app/pages/home/advices-detail/advices-detail.page';
import { NewDetailPage } from 'src/app/pages/home/new-detail/new-detail.page';
import { AuthenticationService } from '../authentication.service';
import { NotificationService } from '../notification.service';
import { PusherChallengeNotificationsService } from './pusher-challenge-notifications.service';
declare const Pusher: any;
const NAME_BIND =  'Illuminate\\Notifications\\Events\\BroadcastNotificationCreated'

@Injectable({
  providedIn: 'root'
})
export class PusherNotificationService {
  readonly NAME_BIND =  'Illuminate\\Notifications\\Events\\BroadcastNotificationCreated'
  idUser:string;
  nameChanel:string;
  channel;
  handlerMessage = '';
  roleMessage = '';
  pusher
  constructor(
    private alertController: AlertController,
    private authService: AuthenticationService,
    public translate: TranslateService,
    private router: Router,
    private modalCtrl: ModalController,
    private pusherChallenge: PusherChallengeNotificationsService,
    private _zone: NgZone) {


  }

  public subscribeChannel(pusherService, idUser:string){
    this.idUser = idUser
    this.nameChanel = 'private-App.User.' + this.idUser
    console.log('[PusherNotificationService] this.nameChanel ()', this.nameChanel);
    this.pusher = pusherService
    this.channel = this.pusher.subscribe(this.nameChanel)
    console.log('[PusherNotificationService] subscribeChannel()',  this.channel);
  }

  public unsubscribePusher(){
    this.channel = this.pusher?.unsubscribe(this.nameChanel)
  }

  public init(){
    return this.channel;
   }

  // public init2(){
  //    this.channel?.bind(NAME_BIND, (data) => {
  //         console.log('[PusherNotificationService] getPusher()',  data);
  //         this.presentPromoteNotification(data);
  //       });
  // }

async presentPromoteNotification(data) {

  let [message,component] = this.getNotificationMessage(data)

  if(message){
    message = `<ion-row><ion-col class="text-align-center"><img src="assets/images/duly_reading.gif" class="card-alert"></img><ion-text>`+ message +`</ion-text></ion-col></ion-row>`;

    const alert = await this.alertController.create({
      cssClass:'challenge-alert',
      message: message,
      buttons: [
        {
          text: this.translate.instant('alert.button_not_now'),
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: this.translate.instant('alert.button_ok'),
          role: 'confirm',
          handler: () => {
            this.openModal(data, component);
          },
        }
      ],
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
      this.roleMessage = `Dismissed with role: ${role}`;
  }else
    console.error("Notification type not found");

}

public getNotificationMessage(data){

  let message = '';
  let component= null;

  switch (data?.type){
    case "App\\Notifications\\AdviceCreated":
      message = this.translate.instant('health_path.advice') + '<b>' + data?.advice?.name + '</b>'
      component = AdvicesDetailPage;
      break;
    case "App\\Notifications\\NewsNotification":
        message = this.translate.instant('health_path.news') + '<b>' + data?.news?.name + '</b>'
        component = NewDetailPage;
        break;
    case "App\\Notifications\\DietCreated":
      message = this.translate.instant('health_path.diet') + '<b>' + data?.diet?.name+ '</b>'
      component = DietsDetailPage;
      break;
    case "App\\Notifications\\GameCreated":
      message = this.translate.instant('health_path.game') + '<b>' + data?.game?.name+ '</b>'
      break;

    default:
      break;
  }
  return [message,component];

}

async openModal(data, pageComponent) {

  console.log('model component:', pageComponent);
  const modal = await this.modalCtrl.create({
    component: pageComponent,
    componentProps: { id: data?.model_id },
  });

  await modal.present();
}
}

