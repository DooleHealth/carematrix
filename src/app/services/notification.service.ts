import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone,
    public alertCtrl: AlertController,
    private translate: TranslateService,
    private toastController: ToastController
  ) { }

  showSuccess(message: string): void {
    // Had an issue with the snackbar being ran outside of angular's zone.
    this.zone.run(() => {
      // The second parameter is the text in the button. 
      // In the third, we send in the css class for the snack bar.
      const config = new MatSnackBarConfig();
      config.panelClass =  ['custom-class'];
      config.verticalPosition = 'bottom';
      config.horizontalPosition = 'center';
      config.duration = 3000;
      this.snackBar.open(message,'', config);
      
    });
  }

  showError(error: string): void {
    
    let message:string;
    if(error.includes('ERR_INTERNET_DISCONNECTED') || error.toLowerCase().includes('network error') || error.toLowerCase().includes('unknown error'))
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

  //Toast
  displayToastSuccessful() { 
    try {
      this.toastController.dismiss().then(() => {
      }).catch(() => {
      }).finally(() => {
        console.log('Closed')
      });
    } catch(e) {}
    
    this.toastController.create({
      position: 'middle', //'middle', 'bottom'
      cssClass: 'toast-custom-class',
      animated: true,
      duration: 2000,
    }).then((toast) => {
      toast.present();
    });
  }

  displayToastPusher(message) { 
    try {
      this.toastController.dismiss().then(() => {
      }).catch(() => {
      }).finally(() => {
        console.log('Closed')
      });
    } catch(e) {}
    
    this.toastController.create({
      position: 'middle', //'middle', 'bottom'
      cssClass: 'toast-pusher-class',
      message: message,
      animated: true,
      duration: 30000,
      buttons: [{
          text: 'Cerrar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).then((toast) => {
      toast.present();
    });
  }

}

