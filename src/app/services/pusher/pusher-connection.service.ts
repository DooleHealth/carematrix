import { Injectable } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { PusherAlarmService } from './pusher-alarm.service';
import { PusherChallengeNotificationsService } from './pusher-challenge-notifications.service';
import { PusherNotificationService } from './pusher-notification.service';
declare const Pusher: any;
@Injectable({
  providedIn: 'root'
})
export class PusherConnectionService {
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
  pusher
  constructor(
    private constants: Constants, 
    private pusherNotification: PusherNotificationService,
    private pusherAlarm: PusherAlarmService,
    private pusherChallenge: PusherChallengeNotificationsService,
  ) { }

  public setEndPoint(){
    let index = this.constants?.INDEX
    let params = this.LIST_APP_KEY[index]
    console.log('[PusherChallengeNotificationsService] setEndPoint() ' ,  params);
    return params
  }

  public subscribePusher(token){
    this.setPusher(token)
    //Subscribo todos los pusher excepto los de mensajería 
    //porque se requiere el id del canal de mensajería y no el id del usuario
    this.pusherNotification.subscribeChannel(this.pusher) 
    this.pusherAlarm.subscribeChannel(this.pusher)
    this.pusherChallenge.subscribeChannel(this.pusher) 
  }

  public setPusher(token){
    let params = this.setEndPoint()
    this.pusher = new Pusher(params.key, {
      cluster: params.cluster,
      authEndpoint: this.constants.API_DOOLE_ENDPOINT + '/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      encrypted: true,
    });
  }

  /**
   * setChannel
   */
  public setChannel(nameChanel) {
    return this.pusher.subscribe(nameChanel)
  }

  public unsubscribePusher(){
    this.pusherAlarm.unsubscribePusher()
    this.pusherNotification.unsubscribePusher()
    this.pusherChallenge.unsubscribePusher()
  }

}
