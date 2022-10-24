import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { NotificationService } from '../notification.service';

declare const Pusher: any;
const NAME_BIND = 'App\\Events\\ScreenMessage'

@Injectable({
  providedIn: 'root'
})
export class PusherAlarmService {

  nameChanel = 'private-ScreenMessage.User.' + this.authService?.user?.idUser //'private-LevelAccomplishmentCompleted.15189' //
  channel;
  pusher
 constructor(
    private notification: NotificationService,
    private authService: AuthenticationService,
  ) {}

  public subscribeChannel(pusherService){
    this.pusher = pusherService
    this.channel = this.pusher.subscribe(this.nameChanel)
    console.log('[PusherNotificationService] subscribeChannel()',  this.channel);
  }

   public init(){
    this.channel.bind(NAME_BIND, (data) => {
         console.log('[PusherAlarmService] getPusherAlarm()' ,  data);
         if(data?.message)
         this.notification.confirmAllNotification(data?.message)
       });
   }

  public unsubscribePusher(){
    this.channel = this.pusher.unsubscribe(this.nameChanel)
  }
}
