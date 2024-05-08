import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { Constants } from '../config/constants';
import { PusherKey, Pushers } from '../config/pushers';
import { BehaviorSubject } from 'rxjs';

export var _INDEX_ENPOINT: number = 0 //Por defecto index 0 
const ENDPOINT = 'endpoint';

export interface enviroment {
  id:number,
  name: string, 
  api: string, 
  endpoint: string,
  device_ios: {ios_push: string, ios_voip: string},
  color?: string,
  pusher_key: PusherKey,
  settings_bio?: string,
  biometric?: string,
  show_bio_dialog?: string,
  registered_user?: string,
}
@Injectable({
  providedIn: 'root'
})
export class ChangeEndpointsService {
  private _endpointIndex = new BehaviorSubject<number>(this.getIndexEndPointLocalstorage());
  public API_ENDPOINT: string;
  public DOOLE_ENDPOINT: string;

  public _LIST_ENPOINT: Array<enviroment> = [] 
  public _ENVIROMENT: enviroment;
  public static urlBackEnd: string;
  constructor(
    private constants: Constants,
    private pusher: Pushers,) {
        this.addEndPoint()
        this.setDefaultEndPoint()
     }

  public async addEndPoint(){   
    this._LIST_ENPOINT = [] 

    this._LIST_ENPOINT.push({
      id:0,
      name: 'enviroment.development', 
      api: this.constants.API_ENDPOINT_DEV, 
      endpoint: this.constants.ENDPOINT_DEV,
      device_ios: {ios_push: 'ios_dev', ios_voip: 'iosvoipdev'},
      pusher_key: this.pusher.PUSHER_KEY_DEV,
      color: 'warning',
      settings_bio: 'settings-bio1',
      biometric: 'biometric1',
      show_bio_dialog: 'show-bio-dialog1',
      registered_user: 'registered-user1',
     
    })
    this._LIST_ENPOINT.push({ 
      id:1,
      name: 'enviroment.production', 
      api: this.constants.API_PROD_ENDPOINT, 
      endpoint: this.constants.PROD_ENDPOINT,
      device_ios: {ios_push: 'ios_dev', ios_voip: 'iosvoipdev'},
      pusher_key: this.pusher.PUSHER_KEY_PRO,
      color: 'primary',
      settings_bio: 'settings-bio0',
      biometric: 'biometric0',
      show_bio_dialog: 'show-bio-dialog0',
      registered_user: 'registered-user0',
    }) 
  //      device_ios: {ios_push: 'ios', ios_voip: 'iosvoip'},
  }

  public setEndPoint(index){
    this._ENVIROMENT = this._LIST_ENPOINT[index]
    _INDEX_ENPOINT = index

    this.API_ENDPOINT = this._ENVIROMENT.api
    this.DOOLE_ENDPOINT = this._ENVIROMENT.endpoint
    this.setIndexEndPointLocalstorage(index)
    this._endpointIndex.next(index); 
  }

  setIndexEndPointLocalstorage(endpoint) {
    localStorage.setItem(ENDPOINT, JSON.stringify(endpoint));
  }

  getIndexEndPointLocalstorage() {
    let endpoint = localStorage.getItem(ENDPOINT);
    //console.log(`[ChangeEndpointsService] setEndPointLocalstorage()`, endpoint);
    if(endpoint) return Number(JSON.parse(endpoint))
    return undefined
  }
  getEndpointIndexObservable() {
    return this._endpointIndex.asObservable();
  }
  setDefaultEndPoint(){
    if(this.API_ENDPOINT == undefined || this.DOOLE_ENDPOINT == undefined){
      let index = this.getIndexEndPointLocalstorage()
      index = (index == undefined)? _INDEX_ENPOINT: index
      this.setEndPoint(index)
    }
  }
}
