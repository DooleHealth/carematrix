// Angular Modules
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Constants {
    public  LIST_ENPOINT: Array<any> = []
    public  INDEX:number = 0

    public  API_PROD_ENDPOINT: string = 'https://bo.incahealthcare.com/api';
    public  PROD_ENDPOINT: string = 'https://bo.incahealthcare.com/';

    public  API_ENDPOINT_DEV: string = 'https://bo-dev.incahealthcare.com/api';
    public  ENDPOINT_DEV: string = 'https://bo-dev.incahealthcare.com';

  
    public readonly appleAppId = '1672263053'
    public readonly androidBundleId = 'com.doole.inca'
    public readonly TRAK_URL = "https://salud.rehabilify.com/app/trak/patient";
    public readonly VIDEOCALL_URL = 'https://videocalls.doole.io/';
    public readonly googleFitPackageID = 'com.google.android.apps.fitness'
    public readonly PRIMARY_COLOR = '#009cb3'

   /*  public device_ios:any;
    public setEndPoint(index){
      let opt = this.LIST_ENPOINT[index]
      this.API_ENDPOINT = opt.api
      this.API_DOOLE_ENDPOINT = opt.api
      this.DOOLE_ENDPOINT = opt.endpoint
      this.device_ios = opt?.device_ios
    }

    public addEndPoint(){
      this.LIST_ENPOINT = []
      this.LIST_ENPOINT.push({
        id:0,
        name: 'Desarrollo',
        api: 'https://bo-dev.incahealthcare.com/api',
        endpoint: 'https://bo-dev.incahealthcare.com',
        device_ios: {ios_push: 'ios_dev', ios_voip: 'iosvoipdev'},
      })
      this.LIST_ENPOINT.push({
        id:1,
        name: 'Producción',
        api: 'https://bo.incahealthcare.com/api',
        endpoint: 'https://bo.incahealthcare.com',
        device_ios: {ios_push: 'ios', ios_voip: 'iosvoip'},
      })

      
    } */
}