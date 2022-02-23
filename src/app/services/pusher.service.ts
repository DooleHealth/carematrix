import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
declare const Pusher: any;
@Injectable({
  providedIn: 'root'
})
export class PusherService {

  channel;
  constructor(public http: HttpClient) {
    var pusher = new Pusher('f89e2ed013b43522069e', {
      cluster: 'eu',
      encrypted: true,
      // secret: "e23e0b09095890bdac73",
      // app_id: "1287334"
    });
    this.channel = pusher.subscribe('push-channel');
  }

  public init(){
    return this.channel;
  }
}
