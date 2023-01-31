import { Injectable } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { AuthenticationService } from '../authentication.service';
import { NotificationService } from '../notification.service';

declare const Pusher: any;
const NAME_BIND = 'App\\Events\\ScreenMessage'

@Injectable({
  providedIn: 'root'
})
export class PusherAlarmService {
  idUser:string;
  nameChanel:string; //'private-LevelAccomplishmentCompleted.15189' //
  channel;
  pusher
 constructor(
    private constants: Constants,
    private notification: NotificationService,
    private authService: AuthenticationService,
  ) {

  }

  public subscribeChannel(pusherService, idUser:string){
    this.idUser = idUser;
    console.log('[PusherNotificationService] idUser()',  this.idUser);
    this.nameChanel = 'private-ScreenMessage.User.' + this.idUser
    this.pusher = pusherService
    this.channel = this.pusher.subscribe(this.nameChanel)
    console.log('[PusherNotificationService] subscribeChannel()',  this.channel);
  }

   public init(){
    this.channel?.bind(NAME_BIND, (data) => {
         console.log('[PusherAlarmService] getPusherAlarm()' ,  data);
         if(data?.message)
         this.notification.confirmAllNotification(data?.message)
       });
   }

   public unsubscribeChannel(pusherService){
    console.log('[PusherNotificationService] subscribeChannel()',  this.channel);
  }

  public unsubscribePusher(){
    this.channel = this.pusher.unsubscribe(this.nameChanel)
  }
}
