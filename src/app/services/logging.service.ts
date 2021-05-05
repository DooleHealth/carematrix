import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  
  constructor(private platform: Platform) { }

  logError(message) {

    // Send errors to be saved here
    if (!this.platform.is('mobileweb') && !this.platform.is('desktop')) {
      console.error("Error log: ", message);
    }else{
      console.error("Error log: ", message);
    }
    
    return;
  }

}
