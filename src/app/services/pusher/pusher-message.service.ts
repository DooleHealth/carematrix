import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Constants } from 'src/app/config/constants';
import { AuthenticationService } from '../authentication.service';

declare const Pusher: any;
const NAME_BIND = 'App\\Events\\MessageCreated' 

@Injectable({
  providedIn: 'root'
})
export class PusherMessageService {
  public  LIST_APP_KEY: Array<any> = [
    {
      name: 'Producción', 
      app_id: "1287334",
      key: "f89e2ed013b43522069e",
      secret: "e23e0b09095890bdac73",
      cluster: "eu"
    },
    {
      name: 'Calidad', 
      app_id: "1287332",
      key: "d560960f0cc446a18c95",
      secret: "63522acb9ee1832855a4",
      cluster: "eu"
    }
  ]

  app_id = "1287334"
  key = "f89e2ed013b43522069e"
  secret = "e23e0b09095890bdac73"
  cluster = "eu"
  nameChanel = 'presence-MessageCreated.' //+ this.authService?.user?.idUser
  channel;
  pusher
  constructor(
    private constants: Constants,
    private authService: AuthenticationService
  ) {
    this.setEndPoint()
    const TOKEN = this.authService.getAuthToken() 
    this.pusher = new Pusher(this.key, {
      cluster: this.cluster,
      authEndpoint: this.constants.API_DOOLE_ENDPOINT + '/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      },
      encrypted: true,
    });
    
   }

   public init(idChannel: String){
    this.channel = this.pusher.subscribe(this.nameChanel + idChannel);
    console.log('[PusherMessageService] init()', this.pusher, this.nameChanel);
    return this.channel;
 }

 public setEndPoint(){
  let index = this.constants?.INDEX
  let opt = this.LIST_APP_KEY[index]
  console.log('[AppComponent] setEndPoint() ' ,  opt);
  this.app_id = opt.app_id
  this.key = opt.key
  this.secret = opt.secret
  this.cluster = opt.cluster
}

}
