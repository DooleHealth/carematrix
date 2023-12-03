// Angular Modules
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Constants {
    public  LIST_ENPOINT: Array<any> = []
    public  INDEX:number = 0

    public  API_ENDPOINT: string = 'https://salud.rehabilify.com/api';
    public  API_DOOLE_ENDPOINT: string = 'https://salud.rehabilify.com/api';
    public  DOOLE_ENDPOINT: string = 'https://salud.rehabilify.com';
    public readonly appleAppId = '1672263053'
    public readonly androidBundleId = 'com.doole.rosia'

    public readonly TRAK_URL = "https://salud.rehabilify.com/app/trak/patient";
    public readonly VIDEOCALL_URL = 'https://videocalls.doole.io/';


    public setEndPoint(index){
      let opt = this.LIST_ENPOINT[index]
      this.API_ENDPOINT = opt.api
      this.API_DOOLE_ENDPOINT = opt.api
      this.DOOLE_ENDPOINT = opt.endpoint
    }

    public addEndPoint(){
      this.LIST_ENPOINT = []
      this.LIST_ENPOINT.push({ //Por defecto index 0
        id:0,
        name: 'Producción',
        // api: 'https://salud.rehabilify.com/api',
        // endpoint: 'https://salud.rehabilify.com'
        api: 'https://deneb.doole.io/api',
        endpoint: 'https://deneb.doole.io'
      })

      this.LIST_ENPOINT.push({
        id:1,
        name: 'Desarrollo',
        // api: 'https://deneb.doole.io/api',
        // endpoint: 'https://deneb.doole.io'
        api: 'https://salud-pre.rehabilify.com/api',
        endpoint: 'https://salud-pre.rehabilify.com'
      })
    }
}