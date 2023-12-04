import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  
  constructor(private platform: Platform) { }

  logError(message) {

    // Send errors to be saved here
    if (Capacitor.isNativePlatform()) {
      console.error("Error log: ", message);
    }else{
      console.error("Error log: ", message);
    }
    
    return;
  }

}
