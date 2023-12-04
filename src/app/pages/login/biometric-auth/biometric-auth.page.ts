import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { Capacitor } from '@capacitor/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/app/config/constants';
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
  biometric_list = []
  environment = 0
  settingsBio = '';
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private modalCtrl: ModalController,
    public translate: TranslateService,
    public platform: Platform,
    public alertCtrl: AlertController,
    private faio: FingerprintAIO,
    private notification: NotificationService
  ) {
    localStorage.setItem('show-bio-dialog','false');
  }

  ngOnInit() {
    this.getListBiometric()
  }

  getListBiometric(){
    let list = JSON.parse(localStorage.getItem('biometric_list'))
    this.biometric_list = list? list:[];
    this.environment = Number(JSON.parse(localStorage.getItem('endpoint')));
    this.settingsBio = 'settings-bio' + this.environment
    localStorage.setItem(this.settingsBio,'false');
    console.log("[BiometricAuthPage] getListBiometric() biometric_list, environment", this.biometric_list, this.environment);
  }

  async showBioAuthDlg() {

    if (Capacitor.isNativePlatform()) {
      this.faio.isAvailable().then((result: any) => {
        console.log(result)

        this.faio.show({
          cancelButtonTitle: this.translate.instant('button.cancel'),
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
            let e = {hash: hash, id: data.id, endpoint: this.environment}
            localStorage.setItem('bio-auth', JSON.stringify(e));
            localStorage.setItem('show-bio-dialog', 'false');
            localStorage.setItem(this.settingsBio, 'true');
            this.addBiometricToList(e)
            this.notification.displayToastSuccessful()
            this.dismissLockScreen()
          }
        },
        (error) => {
          // Called when error
          alert(this.translate.instant(error?.message));
        });
  }

  addBiometricToList(value){
    this.biometric_list = this.biometric_list.filter(bio => bio.endpoint !== this.environment);
    this.biometric_list.push(value)
    localStorage.setItem('biometric_list', JSON.stringify(this.biometric_list));
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
