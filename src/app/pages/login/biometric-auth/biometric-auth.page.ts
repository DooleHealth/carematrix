import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Md5 } from 'ts-md5/dist/md5';
@Component({
  selector: 'app-biometric-auth',
  templateUrl: './biometric-auth.page.html',
  styleUrls: ['./biometric-auth.page.scss'],
})
export class BiometricAuthPage implements OnInit {
  @Input() isModal: boolean;
  showDialog = true
  constructor(
    private authService: AuthenticationService, 
    private router: Router, 
    private modalCtrl: ModalController, 
    public translate: TranslateService, 
    public platform: Platform, 
    public alertCtrl: AlertController, 
    private faio: FingerprintAIO,
    private notification: NotificationService,
  ) {
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

    let hash = Md5.hashStr(Date.now().toString()).toString();
      this.authService.postAPIbiometric({hash: hash}).subscribe(
        async (data) => {
          console.log(data);
          if(data.success){
            let e = {hash: hash, id: data.id}
            localStorage.setItem('bio-auth', JSON.stringify(e));
            localStorage.setItem('show-bio-dialog', 'false');
            localStorage.setItem('settings-bio', 'true');
            this.notification.displayToastSuccessful()
            this.dismissLockScreen()
          }  
        },
        (error) => {
          // Called when error
          alert(this.translate.instant(error?.message));
        });
  }

  async dismissLockScreen() {
    //this.modalCtrl.dismiss();
    this.showIntro()
  }

  showIntro(){
    this.authService.getShowIntroLocalstorage().then((showIntro) =>{
      console.log(`[LegalPage] showIntro() localStorage`,showIntro);
      if(showIntro){
        this.router.navigate(['/home']);
      }else{
        this.router.navigate(['/intro']);
      }
    })
}

}
