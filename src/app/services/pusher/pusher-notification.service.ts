import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/app/config/constants';
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
  public  LIST_APP_KEY: Array<any> = [
    {
      name: 'Producción', 
      app_id: "1287334",
      key: "f89e2ed013b43522069e",
      secret: "e23e0b09095890bdac73",
      cluster: "eu"
    },
    {
      name: 'Calidad', 
      app_id: "1287332",
      key: "d560960f0cc446a18c95",
      secret: "63522acb9ee1832855a4",
      cluster: "eu"
    }
  ]
  app_id = "1287334"
  key = "f89e2ed013b43522069e"
  secret = "e23e0b09095890bdac73"
  cluster = "eu"
  nameChanel = 'private-App.User.' + this.authService?.user?.idUser
  channel;
  handlerMessage = '';
  roleMessage = '';
  pusher
  constructor(
    private constants: Constants, 
    private alertController: AlertController,
    private authService: AuthenticationService,
    public translate: TranslateService,private router: Router,
    private modalCtrl: ModalController,
    private pusherChallenge: PusherChallengeNotificationsService,
    private _zone: NgZone) {

  }

  public init(){ 
     this.channel.bind(NAME_BIND, (data) => {
          console.log('[PusherNotificationService] getPusher()',  data);
          this.presentPromoteNotification(data);
        });
  }

  public subscribePusher(token?){
    this.setEndPoint()
    const TOKEN = token? token:this.authService.getAuthToken() 
    this.pusher = new Pusher(this.key, {
      cluster: this.cluster,
      authEndpoint: this.constants.API_DOOLE_ENDPOINT + '/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      },
      encrypted: true,
    });
    this.channel = this.pusher.subscribe(this.nameChanel);
    console.log('[PusherNotificationService] constructor()', this.pusher, this.nameChanel);
  }

  public setEndPoint(){
    let index = this.constants?.INDEX
    let opt = this.LIST_APP_KEY[index]
    this.app_id = opt.app_id
    this.key = opt.key
    this.secret = opt.secret
    this.cluster = opt.cluster
    console.log('[PusherNotificationService] setEndPoint() ' ,  opt);
  }


async presentPromoteNotification(data) {

  let message = this.getNotificationMessage(data)

  message = `<ion-row><ion-col class="text-align-center"><img src="assets/images/duly_reading.gif" class="card-alert"></img><ion-text>`+ message +`</ion-text></ion-col></ion-row>`;
    
  const alert = await this.alertController.create({
    cssClass:'challenge-alert',
    message: message,
    buttons: [
      {
        text: this.translate.instant('alert.button_not_now'),
        role: 'confirm',
        handler: () => {
          this.handlerMessage = 'Alert canceled';
          
        },
      },
      {
        text: this.translate.instant('alert.button_ok'),
        role: 'confirm',
        handler: () => {
          this.openModal(data, true);
        },
      }
    ],
  });
  await alert.present();

  const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;

}

public getNotificationMessage(data){

  let message = '';
  switch (data?.type){
    case "App\\Notifications\\AdviceCreated":
      message = this.translate.instant('health_path.advice') + '<b>' + data?.advice?.name + '</b>'
    break;
    case " App\\Notifications\\DietCreated":
      message = this.translate.instant('health_path.diet') + '<b>' + data?.diet?.name+ '</b>'
    break;
    case "App\\Notifications\\GameCreated":
      message = this.translate.instant('health_path.game') + '<b>' + data?.game?.name+ '</b>'
    break;
    default:
      message = '';
    break;
  }
  return message;
  
}

async openModal(data, isAdvice) {
  console.log('AdviceDEtailModal()', data);
  const modal = await this.modalCtrl.create({
    component: isAdvice ? AdvicesDetailPage : NewDetailPage,
    componentProps: { id: data?.advice?.id },
  });

  // isModalShowing: FLAG to control IF and WHEN the challenge notification will be shown
  this.pusherChallenge.isModalShowing = true;
  modal.onDidDismiss()
    .then((result) => {
      console.log('showAdvices()', result);
      console.log('modal.onDidDismiss: ', this.pusherChallenge.pendingNotification);
      if (this.pusherChallenge.pendingNotification) {
        this.pusherChallenge.presentChallengeNotification();
      } 
      this.pusherChallenge.isModalShowing = false;
    });

  await modal.present();
}
}

