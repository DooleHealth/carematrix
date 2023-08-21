import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/app/config/constants';
import { AuthenticationService } from '../authentication.service';
import { NotificationService } from '../notification.service';
declare const Pusher: any;
const NAME_BIND = 'App\\Events\\LevelAccomplishmentCompleted'
export interface challengeNotification {
  "user": {
    "id": string,
    "name": string
  },
  "levelDetail": {
    "id": string,
    "name": string
  },
  "coin": {
    "id": string,
    "name": string,
    "icon": string
  },
  "message": string,
  "action": string,
  "isChallengeCompleted": boolean
}

@Injectable({
  providedIn: 'root'
})
export class PusherChallengeNotificationsService {
  idUser: string;
  nameChanel: string;
  channel;
  handlerMessage = '';
  roleMessage = '';
  isModalShowing: boolean = false;
  pendingNotification: any;
  pusher
  constructor(
    private alertController: AlertController,
    private authService: AuthenticationService,
    public translate: TranslateService) {

  }

  public subscribeChannel(pusherService, idUser: string) {
    this.idUser = idUser
    this.nameChanel = 'private-LevelAccomplishmentCompleted.' + this.idUser;
    console.log('[PusherChallengeNotificationsService] this.nameChanel()', this.nameChanel);
    this.pusher = pusherService
    this.channel = this.pusher.subscribe(this.nameChanel)
    console.log('[PusherChallengeNotificationsService] subscribeChannel()', this.channel);
  }

  public unsubscribePusher() {
    this.channel = this.pusher?.unsubscribe(this.nameChanel)
  }

  public init() {
    console.log('[PusherChallengeNotificationsService] init()');
    this.channel?.bind(NAME_BIND, (data) => {
      console.log('[PusherChallengeNotificationsService] getPusher()', data);

      if (!this.isModalShowing) {
        this.presentChallengeNotification();
      } else {
        this.pendingNotification = { show: true, data: data }
      }

    });
  }

  // async presentChallengeNotification() {

  //   let message = '';

  //   message = `<div class="pyro">
  //   <div class="before"></div>
  //   <ion-row><ion-col class="text-align-center"><img src="assets/images/duly_champ.gif" class="card-alert"></img><ion-text>`+ this.translate.instant('health_path.level_accomplished') + `</ion-text></ion-col></ion-row>
  //   <div class="after"></div>
  // </div>`;

  //   const alert = await this.alertController.create({
  //     header: this.translate.instant('health_path.level_congratulations'),
  //     cssClass: 'challenge-alert',
  //     message: message,
  //     buttons: [
  //       {
  //         text: this.translate.instant('info.button'),
  //         role: 'confirm',
  //         handler: () => {
  //           this.handlerMessage = 'Alert confirmed';

  //         },
  //       },
  //     ],
  //   });
  //   this.pendingNotification = { show: false, data: null };
  //   await alert.present();

  //   const { role } = await alert.onDidDismiss();
  //   this.roleMessage = `Dismissed with role: ${role}`;

  // }

  async presentChallengeNotification() {

    let message = '';
    let header = '';
    if(this.pendingNotification?.isChallengeCompleted){
      message =  `<div class="pyro">
      <div class="before"></div>
      <ion-row><ion-col class="text-align-center"><img src="assets/images/trofeo.png" class="card-alert"></img></ion-col></ion-row>
      <div class="after"></div>
      </div>`;
      header = this.translate.instant('health_path.congratulation')
    }
    else{
      message = `<div class="pyro">
      <div class="before"></div>
      <ion-row><ion-col class="text-align-center"><img src="assets/images/trofeo.png" class="card-alert"></img></ion-col></ion-row>
      <div class="after"></div>
      </div>`;
      let name_level = this.pendingNotification?.levelDetail?.name? this.pendingNotification?.levelDetail?.name:''
      header = this.translate.instant('health_path.congratulation_level') + ' '+name_level
    }
  
    const alert = await this.alertController.create({
      header: header,
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
