import { Injectable } from '@angular/core';
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
  public LIST_APP_KEY: Array<any> = [
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
    public translate: TranslateService,) {
    this.setEndPoint()
    const TOKEN = authService.getAuthToken()
    var pusher = new Pusher(this.key, {
      cluster: this.cluster,
      authEndpoint: this.constants.API_DOOLE_ENDPOINT + '/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      },
      encrypted: true,
    });
    //this.nameChanel = this.nameChanel + this.authService?.user?.idUser 
    this.channel = pusher.subscribe(this.nameChanel);
    console.log('[PusherChallengeNotificationsService] constructor()', pusher, this.nameChanel);
  }

  public init() {
    console.log('[PusherChallengeNotificationsService] init()');
    this.channel.bind(NAME_BIND, (data) => {
      console.log('[PusherChallengeNotificationsService] getPusher()', data);
      this.pendingNotification = data;
      if(!this.isModalShowing)
        this.presentChallengeNotification();
      else
        this.pendingNotification = data;

    });
  }

  public setEndPoint() {
    let index = this.constants?.INDEX
    let opt = this.LIST_APP_KEY[index]
    console.log('[PusherChallengeNotificationsService] setEndPoint() ', opt);
    this.app_id = opt.app_id
    this.key = opt.key
    this.secret = opt.secret
    this.cluster = opt.cluster
  }

async presentChallengeNotification() {

  let message = '';
  if(this.pendingNotification?.isChallengeCompleted)
    message =  `<div class="pyro">
    <div class="before"></div>
    <ion-row><ion-col class="text-align-center"><img src="assets/images/duly_campeon.gif" class="card-alert"></img><ion-text>`+this.translate.instant('health_path.level_accomplished')+`</ion-text></ion-col></ion-row>
    <div class="after"></div>
  </div>`; 
  else
    message = `<div class="pyro">
    <div class="before"></div>
    <ion-row><ion-col class="text-align-center"><img src="assets/images/duly_campeon.gif" class="card-alert"></img><ion-text>`+this.translate.instant('health_path.level_accomplished')+`</ion-text></ion-col></ion-row>
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
