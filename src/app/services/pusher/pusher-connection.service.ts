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
      name: 'Inca Health Producción',
      app_id: "1632528",
      key: "3591d99947685b0e45e4",
      secret: "2972f138fed48a358a61",
      cluster: "eu"
    },
    {
      name: 'Inca Health Producción',
      app_id: "1632528",
      key: "3591d99947685b0e45e4",
      secret: "2972f138fed48a358a61",
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
    console.log('[PusherConnectionService] setEndPoint() ' ,  params);
    return params
  }

  public subscribePusher(token, idUser:string){
    this.setPusher(token)
    //Subscribo todos los pusher excepto los de mensajería
    //porque se requiere el id del canal de mensajería y no el id del usuario
    this.pusherNotification.subscribeChannel(this.pusher, idUser)
    this.pusherAlarm.subscribeChannel(this.pusher,idUser)
    this.pusherChallenge.subscribeChannel(this.pusher, idUser)
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
    this.pusherAlarm.unsubscribePusher()
    this.pusher?.disconnect();
  }

  public isConnectedPusher(): boolean{
    console.log('[PusherConnectionService] isConnectedPusher()', this.pusher);
    if(this.pusher?.connection?.state === "connected")
      return true;
    return false;
  }

}