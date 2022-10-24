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
  channel
  constructor(
    private pusherConnection: PusherConnectionService
  ) {}

   public init(idChannel: String){
    this.channel = this.pusherConnection.setChannel(this.nameChanel + idChannel)
    console.log('[PusherMessageService] init()', this.channel);
    return this.channel;
 }

 public unsubscribePusher(idChannel){
  this.channel.unsubscribe(this.nameChanel + idChannel)
}

}
