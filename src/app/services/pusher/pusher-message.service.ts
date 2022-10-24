import { Injectable } from '@angular/core';
import { PusherConnectionService } from './pusher-connection.service';

declare const Pusher: any;
const NAME_BIND = 'App\\Events\\MessageCreated' 

@Injectable({
  providedIn: 'root'
})
export class PusherMessageService {

  nameChanel = 'presence-MessageCreated.'
  pusher
  constructor(
    private pusherConnection: PusherConnectionService
  ) {}

  // public subscribeChannel(channel){
  //   this.channel = channel
  //   console.log('[PusherMessageService] subscribeChannel()',  this.channel);
  // }

   public init(idChannel: String){
    var channel = this.pusherConnection.setChannel(this.nameChanel + idChannel)
    console.log('[PusherMessageService] init()', channel);
    return channel;
 }

}
