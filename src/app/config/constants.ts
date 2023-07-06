// Angular Modules
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Constants {
    public  LIST_ENPOINT: Array<any> = []
    public  INDEX:number = 0

    public  API_ENDPOINT: string = 'https://oxeen.doole.io/api';
    public  API_DOOLE_ENDPOINT: string = 'https://oxeen.doole.io/api';
    public  DOOLE_ENDPOINT: string = 'https://oxeen.doole.io';
    public readonly appleAppId = '6450423494'
    public readonly androidBundleId = 'com.oxeencompany.oxeenhome'

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
        api: 'https://oxeen.doole.io/api',
        endpoint: 'https://oxeen.doole.io'
      })

      this.LIST_ENPOINT.push({
        id:1,
        name: 'Calidad',
        api: 'https://oxeena.doole.io/api',
        endpoint: 'https://oxeen.doole.io'
      })
    }
}