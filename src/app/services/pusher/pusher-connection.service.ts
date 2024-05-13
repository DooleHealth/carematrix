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
  pusher
  constructor(
    private endpoints: ChangeEndpointsService,
    private pusherNotification: PusherNotificationService,
    private pusherAlarm: PusherAlarmService,
    private pusherChallenge: PusherChallengeNotificationsService,
  ) { }

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
    this.pusherChallenge.unsubscribePusher()
    this.pusher?.disconnect();
  }

  public isConnectedPusher(): boolean{
    console.log('[PusherConnectionService] isConnectedPusher()', this.pusher);
    if(this.pusher?.connection?.state === "connected")
      return true;
    return false;
  }

}