import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { database } from 'firebase';
import { Constants } from 'src/app/config/constants';
import { AuthenticationService } from '../authentication.service';
import { NotificationService } from '../notification.service';
declare const Pusher: any;
const NAME_BIND = 'App\\Events\\LevelAccomplishmentCompleted'

@Injectable({
  providedIn: 'root'
})
export class PusherChallengeNotificationsService {
  nameChanel = 'private-LevelAccomplishmentCompleted.' + this.authService?.user?.idUser;
  channel;
  handlerMessage = '';
  roleMessage = '';
  isModalShowing: boolean;
  pendingNotification:any;
  constructor(
    private constants: Constants,
    private alertController: AlertController,
    private authService: AuthenticationService,
    public translate: TranslateService,
    private router: Router,
    private _zone: NgZone) {}

  public subscribeChannel(channel){
    this.channel = channel
    console.log('[PusherChallengeNotificationsService] subscribeChannel()',  this.channel);
  }

  public init() {
    console.log('[PusherChallengeNotificationsService] init()');
    this.channel.bind(NAME_BIND, (data) => {
      console.log('[PusherChallengeNotificationsService] getPusher()', data);

      if(!this.isModalShowing){
        this.presentChallengeNotification();
      }else
        this.pendingNotification = data;
    });
  }

async presentChallengeNotification() {

  let message = '';
  if(this.pendingNotification?.isChallengeCompleted)
    message =  `<div class="pyro">
    <div class="before"></div>
    <ion-row><ion-col class="text-align-center"><img src="assets/images/duly_champ.gif" class="card-alert"></img><ion-text>`+this.translate.instant('health_path.level_accomplished')+`</ion-text></ion-col></ion-row>
    <div class="after"></div>
  </div>`; 
  else
    message = `<div class="pyro">
    <div class="before"></div>
    <ion-row><ion-col class="text-align-center"><img src="assets/images/duly_champ.gif" class="card-alert"></img><ion-text>`+this.translate.instant('health_path.level_accomplished')+`</ion-text></ion-col></ion-row>
    <div class="after"></div>
  </div>`;
    
  const alert = await this.alertController.create({
    header: this.translate.instant('health_path.level_congratulations'),
    cssClass:'challenge-alert',
    message: message,
    buttons: [
      {
        text: this.translate.instant('info.button'),
        role: 'confirm',
        handler: () => {
          this.handlerMessage = 'Alert confirmed';
          this.pendingNotification = null;
        },
      },
    ],
  });
  await alert.present();

  const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;

}

}
