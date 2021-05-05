// Angular Modules
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Constants {

    public readonly API_ENDPOINT: string = 'http://192.168.0.158:8000/api/';
    public readonly API_DOOLE_ENDPOINT: string = 'http://192.168.0.158:8000/api';
    public readonly DOOLE_ENDPOINT: string = 'http://192.168.0.158:8000';

    
}