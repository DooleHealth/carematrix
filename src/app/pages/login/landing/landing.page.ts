import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { LanguageService } from 'src/app/services/language.service';
import { DooleService } from 'src/app/services/doole.service';
import { LoginPage } from '../login.page';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { Device } from '@ionic-native/device/ngx';
const { Storage } = Plugins;


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  NUM_FAIL_LOGIN = 4;
  pushNotification: any;
  loginForm: FormGroup;
  submitError: string;
  redirectLoader: HTMLIonLoadingElement;
  hasBiometricAuth: boolean = false;
  showBiometricDialog: boolean = false;
  biometricAuth: any;
  numFailLogin = 0;
  numFailFingerP = 0;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private translate: TranslateService,
    public loadingController: LoadingController,
    public location: Location,
    public alertController: AlertController,
    private authService: AuthenticationService, 
    public languageService: LanguageService,
    private dooleService: DooleService,
    private modalCtrl: ModalController,
    private faio: FingerprintAIO,
    private analyticsService: AnalyticsService,
    private device: Device
  ) {
    // this.analyticsService.setScreenName('[LandingPage]')
   }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('',
      Validators.compose([
        Validators.required
      ])),
      password: new FormControl('',
        Validators.compose([
        Validators.required])
      ),
      hash: new FormControl(''),
    });

  }

  ionViewDidEnter(){
    console.log('[LandingPage] ionViewDidEnter() Device: ', this.device.platform);
    this.pushNotification = history.state.pushNotification;
    console.log("[LandingPage] ionViewDidEnter() pushNotification", this.pushNotification);
    // if(this.pushNotification){
    //   alert('pushNotification: '+ JSON.stringify(this.pushNotification) )
    // }
    this.loginForm.clearValidators()
    this.loginForm.get('username').setValue('')
    this.loginForm.get('password').setValue('')
    this.loginForm.get('hash').setValue('')
    this.getStoredValues()
    this.blockedLogin()
  }
  
  async dismissLoading() {
    if (this.redirectLoader) {
      console.log("dismissLoading");
      this.redirectLoader.dismiss();
    }
  }

  resetSubmitError() {
    this.submitError = null;
  }

/*   submit(){
    this.loginForm.get('hash').setValue('')
    this.doDooleAppLogin()
  } */

  async doDooleAppLogin() : Promise<void> {
    let notification = this.dooleService.getPushNotification()
    console.log("[LandingPage] doDooleAppLogin() pushNotification", notification);
    if(notification){
      this.pushNotification = notification
      this.dooleService.setPushNotification(undefined)
    }


    const modal = await this.modalCtrl.create({
      component: LoginPage,
      componentProps: { credentials: this.loginForm.value, pushNotification: this.pushNotification },
    });

    modal.onDidDismiss()
      .then((result) => {
        let error = result?.data['error']
        if(error){
          let message = error
          this.dooleService.presentAlert(message)
          this.authService.increaseNumloginFailed()
          this.numFailLogin = this.authService.getNumloginFailed();
          if(this.numFailLogin >= this.NUM_FAIL_LOGIN){
            //alert('La APP se ha bloqueado')
            this.appBlocked()
          }

        }else{
          this.loginForm.get('username').setValue('')
          this.loginForm.get('password').setValue('')
          this.loginForm.get('hash').setValue('')
          this.authService.removeNumloginFailed()
          this.authService.removeNumFirgerPFailed()
        }
    });

    await modal.present();
  }



  async blockedLogin(){
    let numDate = this.authService.getDateloginFailed();
    let secondsPassed = ((new Date).getTime() - numDate) / 1000;
    if(secondsPassed >= 120){
      //alert('La APP no se ha bloqueado')
      this.authService.removeNumloginFailed()
      this.authService.removeNumFirgerPFailed()
      this.numFailLogin = 0;
      this.numFailFingerP = 0;
    }else{
      //alert('La APP se ha bloqueado debido a que se ha excesido el número de intentos, intenta despues de 2 minutos')
      this.numFailLogin = this.authService.getNumloginFailed();
      this.numFailFingerP = this.authService.getNumFingerPrinterFailed();
      this.appBlocked()
    }
  }

  private async saveInLocalStorage(data: any){
    /**
     * On iOS this plugin  Storage will use UserDefaults and on Android SharedPreferences.
     * Stored data is cleared if the app is uninstalled.
     */
    await Storage.set({
      key: 'user',
      value: JSON.stringify(data)
    });
  }


  sendUsername(username){
    console.log('[LandingPage] passwordRecovery()');
    let user = {username: username}
    this.dooleService.postAPIpasswordRecovery(user) .subscribe(
      async (res: any) =>{
        console.log('[InitialPage] passwordRecovery()', await res);
        if(res.message){
          let message = this.translate.instant('landing.message_email_sent')
          this.dooleService.presentAlert(message)
        }
       },(err) => {
          console.log('[LandingPage] passwordRecovery() ERROR(' + err.code + '): ' + err.message);
          throw err;
      });
  }

  async passwordRecovery() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      subHeader: this.translate.instant('landing.header_message_password_recovery'),
      message: this.translate.instant('landing.message_password_recovery'),
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: this.translate.instant('landing.user'),
        }],
        buttons: [
          {
            text: this.translate.instant("alert.button_cancel"),
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('[LandingPage] AlertConfirm Cancel');
            }
          }, {
            text: this.translate.instant("alert.button_send"),
            handler: (data) => {
              console.log('[LandingPage] AlertConfirm Okay', data.username );
              this.sendUsername(data.username)
            }
          }
        ]
    });

    await alert.present();
  }


  public doBiometricLogin() {

    this.faio.isAvailable().then((result: any) => {
    
      this.faio.show({
        cancelButtonTitle: this.translate.instant('button.cancel'),
        title: this.translate.instant('face-id.title'),
      })
        .then(async (result: any) => { 
          console.log("[LandingPage] doBiometricLogin()", result);
          this.loginForm.get('hash').setValue(this.biometricAuth.hash)
          this.doDooleAppLogin()
        })
        .catch((error: any) => {
          console.log("show errror ", error);
          if (error.code == -102) {
            this.authService.increaseNumFPAIOFailed()
            this.numFailFingerP = this.authService.getNumFingerPrinterFailed();
            if(this.numFailFingerP < this.NUM_FAIL_LOGIN)
            setTimeout(() => this.doBiometricLogin(), 500);
            else
            this.appBlocked()
          }
        });
    })
      .catch((error: any) => {
        alert(this.translate.instant('biometrics.disabled'));
      });
  }

  async getStoredValues() {
    if(!this.isAvailableFaID())
    return 

    const biometricsEnabled = localStorage.getItem('settings-bio');
    const biometricToken =  localStorage.getItem('bio-auth');
    
    if (biometricToken && biometricToken !== "" && biometricsEnabled && biometricsEnabled === 'true') {
      this.hasBiometricAuth = true;
      this.biometricAuth = JSON.parse(biometricToken) ;
      //this.loginForm.get('hash').setValue(this.biometricAuth.hash)
    }else{
      this.hasBiometricAuth = false;
    }
    const showDialog = localStorage.getItem('show-bio-dialog');

    if(showDialog!== 'false'){
      console.log('showDialog: ', showDialog !== 'false');
      this.showBiometricDialog = true;
    }else{
      console.log('showDialog: ', showDialog !== 'false');
      this.showBiometricDialog = false;
    }
      
  }

  isAvailableFaID(): Promise<any>{
    const showDialog = localStorage.getItem('show-bio-dialog');
    console.log('[LandingPage] isAvailableFaID() showDialog:', showDialog);
   return this.faio.isAvailable().then((result: any)  =>{
      console.log(result)
      const showDialog = localStorage.getItem('show-bio-dialog');
      console.log('[LandingPage] isAvailableFaID() showDialog:', showDialog);
      if(showDialog === undefined || showDialog === null)
        localStorage.setItem('show-bio-dialog','true');
      return true
    }).catch(async (error: any) => {
        localStorage.setItem('show-bio-dialog','false');
      return false
    });
  }

/*   getNumloginFailed(){
    let num = localStorage.getItem('num-fail-login');
    if(num){
      this.numFailLogin = Number(JSON.parse(num))
    }else{
      localStorage.setItem('num-fail-login','0');
      this.numFailLogin = 0
    }
  } */

/*   increaseNumFPAIOFailed(){
    let num = localStorage.getItem('num-fail-finger-print');
    if(num){
      this.numFailFingerP = Number(JSON.parse(num)) + 1
      localStorage.setItem('num-fail-finger-print',''+this.numFailFingerP);
    }else{
      localStorage.setItem('num-fail-finger-print','1');
      this.numFailFingerP = 1
    }
    console.log('[LandingPage] increaseNumFPAIOFailed()', this.numFailFingerP);
  } */

  async appBlocked() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      subHeader: this.translate.instant('security.alert_security'),
      message: this.translate.instant('landing.blocked_login'),
      backdropDismiss: false,
        buttons: [
         {
            text: this.translate.instant("button.accept"),
            handler: (data) => {
              //Exit from app
              navigator['app'].exitApp();
            }
          }
        ]
    });

    await alert.present();
  }

}
