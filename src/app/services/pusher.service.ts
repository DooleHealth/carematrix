import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import { AuthenticationService } from './authentication.service';
import { NotificationService } from './notification.service';
declare const Pusher: any;
const NAME_BIND = 'App\\Events\\LevelAccomplishmentCompleted' 
@Injectable({
  providedIn: 'root'
})
export class PusherService {
  app_id = "1287334"
  key = "f89e2ed013b43522069e"
  secret = "e23e0b09095890bdac73"
  cluster = "eu"
  nameChanel = 'private-LevelAccomplishmentCompleted.15189' //+ this.authService?.user?.idUser
  channel;
  constructor(
    private constants: Constants, 
    private notification: NotificationService,
    private authService: AuthenticationService,) {
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
    this.channel = pusher.subscribe(this.nameChanel);
    console.log('[PusherService] constructor()', pusher, this.nameChanel);
  }

  public init(){
   
     this.channel.bind(NAME_BIND, (data) => {
          console.log('[AppComponent] getPusher()' ,  data);
          this.notification.displayToastSuccessful()
        });
  }
}
