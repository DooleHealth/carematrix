import { Injectable } from '@angular/core';
import { ChangeEndpointsService } from '../change-endpoints.service';
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
      name: 'Inca Health Desarrollo',
      app_id: "1753151",
      key: "4d712ee2fba4e1be4d4c",
      secret: "7593af5392913fbc8c54",
      cluster: "eu"
      
    },
    {
      name: 'Inca Health Producción',
      app_id: "1753153",
      key: "ab568085e820d78c40dd",
      secret: "5d91abad2e285e24b38b",
      cluster: "eu"
    }
    
  ]
  pusher
  constructor(
    private endpoints: ChangeEndpointsService,
    private pusherNotification: PusherNotificationService,
    private pusherAlarm: PusherAlarmService,
    private pusherChallenge: PusherChallengeNotificationsService,
  ) { }

  /* public setEndPoint(){
    let index = this.constants?.INDEX
    let params = this.LIST_APP_KEY[index]
    console.log('[PusherConnectionService] setEndPoint() ' ,  params);
    return params
  } */

  public subscribePusher(token, idUser:string){
    this.setPusher(token)
    //Subscribo todos los pusher excepto los de mensajería
    //porque se requiere el id del canal de mensajería y no el id del usuario
    this.pusherNotification.subscribeChannel(this.pusher, idUser)
    this.pusherAlarm.subscribeChannel(this.pusher,idUser)
    this.pusherChallenge.subscribeChannel(this.pusher, idUser)
  }

  public setPusher(token){
    let params = this.endpoints._ENVIROMENT.pusher_key;
    this.pusher = new Pusher(params.key, {
      cluster: params.cluster,
      authEndpoint: this.endpoints.API_ENDPOINT+ '/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      encrypted: true,
    });
    console.log('[PusherConnectionService] setPusher()', this.pusher);
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