import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/app/config/constants';
import { AuthenticationService } from '../authentication.service';
import { NotificationService } from '../notification.service';
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
    console.log('[PusherService] constructor()', pusher, this.nameChanel);
  }

  public init(){
   
     this.channel.bind(NAME_BIND, (data) => {
          console.log('[PusherService] getPusher()' ,  data);
          this.presentAlert();
          //this.notification.displayToastPusher(data.message)
        });
  }

  public setEndPoint(){
    let index = this.constants?.INDEX
    let opt = this.LIST_APP_KEY[index]
    //console.log('[PusherService] setEndPoint() ' ,  opt);
    this.app_id = opt.app_id
    this.key = opt.key
    this.secret = opt.secret
    this.cluster = opt.cluster
  }

  async presentAlert() {

      const alert = await this.alertController.create({
        header: this.translate.instant('health_path.blocked_level'),
        buttons: [
          {
            text: this.translate.instant('info.button'),
            role: 'confirm',
            handler: () => {
              this.handlerMessage = 'Alert confirmed';
            },
          },
        ],
      });
      await alert.present();

      const { role } = await alert.onDidDismiss();
      this.roleMessage = `Dismissed with role: ${role}`;
  }

}

