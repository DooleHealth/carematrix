import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import { AuthenticationService } from './authentication.service';
declare const Pusher: any;
@Injectable({
  providedIn: 'root'
})
export class PusherService {
  app_id = "1287332"
  key = "d560960f0cc446a18c95"
  secret = "63522acb9ee1832855a4"
  cluster = "eu"
  nameChanel = 'private-LevelAccomplishmentCompleted.15189' //+ this.authService?.user?.idUser
  channel;
  constructor(
    private constants: Constants, 
    private authService: AuthenticationService,) {
    const TOKEN = authService.getAuthToken() 
    var pusher = new Pusher(this.key, {
      cluster: this.cluster,
      authEndpoint: this.constants.API_DOOLE_ENDPOINT + '/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      },
      encrypted: true,
    });
    this.channel = pusher.subscribe(this.nameChanel);
    console.log('[PusherService] constructor()', pusher, this.nameChanel);
  }

  public init(){
    return this.channel;
  }
}
