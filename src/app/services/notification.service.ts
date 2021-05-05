import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone,
    public alertCtrl: AlertController,
    private translate: TranslateService
  ) { }

  showSuccess(message: string): void {
    // Had an issue with the snackbar being ran outside of angular's zone.
    this.zone.run(() => {
      // The second parameter is the text in the button. 
      // In the third, we send in the css class for the snack bar.
      const config = new MatSnackBarConfig();
      config.panelClass = ['example-pizza-party'];
      config.verticalPosition = 'bottom';
      config.horizontalPosition = 'center';
      config.duration = 3000;
      this.snackBar.open(message,'', config);
      
    });
  }

  showError(error: string): void {
    
    let message:string;
      if(error.includes('ERR_INTERNET_DISCONNECTED') || error.toLowerCase().includes('network error'))
        message = this.translate.instant('commons.error-network');
      else if(error.includes('Timeout has occurred'))
        message = this.translate.instant('commons.error-timeout');
      else
        message = error;
      

    this.zone.run(() => {

      const config = new MatSnackBarConfig();
      config.panelClass = ['example-pizza-party'];
      config.verticalPosition = 'bottom';
      config.horizontalPosition = 'center';
      config.duration = 3000;
      this.snackBar.open(message,'X', config);
     
      console.log("NotificationService", message);
      
    });
  }

}

