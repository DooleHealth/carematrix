// Angular Modules
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Constants {

    public  API_ENDPOINT: string = 'https://deneb.doole.io/api';
    public  API_DOOLE_ENDPOINT: string = 'https://deneb.doole.io/api';
    public  DOOLE_ENDPOINT: string = 'https://deneb.doole.io';

    // public readonly API_ENDPOINT: string = 'http://192.168.0.158:8000/api';
    // public readonly API_DOOLE_ENDPOINT: string = 'http://192.168.0.158:8000/api';
    // public readonly DOOLE_ENDPOINT: string = 'http://192.168.0.158:8000/api';

    public setEndPoint(isDev){
        if(isDev){
          this.API_ENDPOINT = 'https://deneb.doole.io/api'
          this.API_DOOLE_ENDPOINT = 'https://deneb.doole.io/api'
          this.DOOLE_ENDPOINT = 'https://deneb.doole.io/api'
        }else{
          this.API_ENDPOINT = 'https://deneb.doole.io/api'
          this.API_DOOLE_ENDPOINT = 'https://deneb.doole.io/api'
          this.DOOLE_ENDPOINT = 'https://deneb.doole.io/api'
        }
    }
}