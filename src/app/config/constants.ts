// Angular Modules
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Constants {

     public readonly API_ENDPOINT: string = 'https://deneb.doole.io/api';
     public readonly API_DOOLE_ENDPOINT: string = 'https://deneb.doole.io/api';
     public readonly DOOLE_ENDPOINT: string = 'https://deneb.doole.io';

/*     public readonly API_ENDPOINT: string = 'https://covid.doole.io/api';
    public readonly API_DOOLE_ENDPOINT: string = 'https://covid.doole.io/api';
    public readonly DOOLE_ENDPOINT: string = 'https://covid.doole.io'; */

/*     public readonly API_ENDPOINT: string = 'https://mgc.doole.io/api/mgc';
    public readonly API_DOOLE_ENDPOINT: string = 'https://mgc.doole.io/api';
    public readonly DOOLE_ENDPOINT: string = 'https://mgc.doole.io'; */
}