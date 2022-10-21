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

  nameChanel = 'private-ScreenMessage.User.' + this.authService?.user?.idUser //'private-LevelAccomplishmentCompleted.15189' //
  channel;

 constructor(
    private constants: Constants, 
    private notification: NotificationService,
    private authService: AuthenticationService,
  ) {}

  public subscribeChannel(channel){
    this.channel = channel
    console.log('[PusherAlarmService] subscribeChannel()',  this.channel);
  }

   public init(){
    this.channel.bind(NAME_BIND, (data) => {
         console.log('[PusherAlarmService] getPusherAlarm()' ,  data);
         if(data?.message)
         this.notification.confirmAllNotification(data?.message)
       });
   }
}
