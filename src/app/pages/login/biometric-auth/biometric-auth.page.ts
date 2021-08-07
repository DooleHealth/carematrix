import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-biometric-auth',
  templateUrl: './biometric-auth.page.html',
  styleUrls: ['./biometric-auth.page.scss'],
})
export class BiometricAuthPage implements OnInit {
  @Input() isModal: boolean;
  showDialog: boolean = true;
  showSuccess: boolean = false;
  constructor(private authService: AuthenticationService, private router: Router, private modalCtrl: ModalController, public translate: TranslateService, public platform: Platform, public alertCtrl: AlertController, private faio: FingerprintAIO) {
    localStorage.setItem('show-bio-dialog','false');
    localStorage.setItem('settings-bio','false');
  }

  ngOnInit() {
  }

  async showBioAuthDlg() {

    if (!this.platform.is('mobileweb') && !this.platform.is('desktop')) {
      this.faio.isAvailable().then((result: any) => {
        console.log(result)

        this.faio.show({
          cancelButtonTitle: this.translate.instant('face-id.cancel'),
          title: this.translate.instant('face-id.title'),
          fallbackButtonTitle: this.translate.instant('face-id.fallback'),
          subtitle: this.translate.instant('face-id.subtitle'),
          disableBackup: true,

        })
          .then(async (result: any) => {
            await this.registerBiometrics();

          })
          .catch(async (error: any) => {
            console.log(error);
            if (error.code == -102) {
              setTimeout(() => this.showBioAuthDlg(), 500);
            }
          });

      }).catch(async (error: any) => {
        localStorage.setItem('show-bio-dialog','false');
      });
    } else {
      alert('only in device');
      this.dismissLockScreen();

    }

  }

  async registerBiometrics() {

    //let e = Md5.hashStr(Date.now().toString()).toString();

    let credentials = {
     // mutua: this.authService.mutua,
      credencial: "biometric",
      //username: e
    }

/*     this.authService.validateCredentials(credentials, 'credencial2').subscribe(
      async (data) => {

        console.log(data);
        localStorage.setItem('bio-auth', e);
        localStorage.setItem('show-bio-dialog', 'false');
        localStorage.setItem('settings-bio', 'true');

        this.showDialog = !this.showDialog;
        this.showSuccess = !this.showSuccess;

      },
      (error) => {
        // Called when error
        //this.showAlert(this.translate.instant('login.error_code.' + error?.status));
      }); */
  }

  async dismissLockScreen() {
    this.modalCtrl.dismiss();
  }

}
