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
import { Constants } from 'src/app/config/constants';
const { Storage } = Plugins;


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  settingsBio = '';
  NUM_FAIL_LOGIN = 4;
  NUM_SECONDS = 120
  pushNotification: any;
  loginForm: FormGroup;
  submitError: string;
  redirectLoader: HTMLIonLoadingElement;
  hasBiometricAuth: boolean = false;
  showBiometricDialog: boolean = false;
  biometricAuth: any;
  numFailLogin = 0;
  numFailFingerP = 0;
  public isProd: boolean = true
  biometric_list = []
  environment = 0
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
    private device: Device,
    private constants: Constants
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
    this.getListBiometric()
    this.getIndexEndPoint()
    console.log('[LandingPage] ionViewDidEnter() Device: ', this.device.platform);
    this.pushNotification = history.state.pushNotification;
    console.log("[LandingPage] ionViewDidEnter() pushNotification", this.pushNotification);
    // if(this.pushNotification){
    //   alert('pushNotification: '+ JSON.stringify(this.pushNotification) )
    // }
    this.loginForm.get('username').setValue('')
    this.loginForm.get('password').setValue('')
    this.loginForm.get('hash').setValue('')
    this.loginForm.clearValidators()
    this.getStoredValues()
    this.blockedLogin()
  }

  getIndexEndPoint(){
    this.isProd = Number(localStorage.getItem('endpoint')) === 0? true:false
    console.log("[AuthService] indexEndPoint: ", this.isProd);
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
          if(message.status === 500)
          this.dooleService.presentAlert(this.translate.instant('landing.message_error_serve'))
          else if(message.status === 403 && message?.error?.message){
            this.appBlockedByUser(message.error.message)
            //Block login Button
            this.authService.increaseNumloginFailed()
            this.numFailLogin = this.authService.getNumloginFailed();
            if(this.numFailLogin >= this.NUM_FAIL_LOGIN){
              //alert('La APP se ha bloqueado')
              this.appBlocked()
            }
          }
          else if(message?.message == 'ERR_INTERNET_DISCONNECTED')
          this.dooleService.presentAlert(this.translate.instant('landing.message_error_internet_disconnected'))
          else if(message == 'Http failure response for ' + this.constants.API_ENDPOINT + '/patient/login: 0 Unknown Error' || message?.message == 'Http failure response for ' + this.constants.API_ENDPOINT + '/patient/login: 0 Unknown Error')
          this.dooleService.presentAlert(this.translate.instant('landing.message_failure_response'))
          else
          this.dooleService.presentAlert(message?.message? message?.message: message)

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
    if(secondsPassed >= this.NUM_SECONDS){
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
        let message = ''
        if(res?.error?.message){
          message = this.translate.instant('landing.message_failure_response')
          this.dooleService.presentAlert(message)
          return
        }
        if(res?.message && res.message !== ''){

          if(res.message == 'Email sent'){
            message = this.translate.instant('landing.message_email_sent')
            this.dooleService.presentAlert(message)
          }else{
            message = res.message
            this.dooleService.presentAlert(message)
          }
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
            else{
              this.appBlocked()
            }

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

    const biometricsEnabled = localStorage.getItem(this.settingsBio);
    const biometricToken =  this.getBiometric(); //localStorage.getItem('bio-auth');
    console.log('[LandingPage] getStoredValues() 1 biometricsEnabled: ', biometricsEnabled, JSON.stringify(biometricToken));
    if (biometricToken && biometricToken !== "" && biometricsEnabled && biometricsEnabled === 'true') {
      this.hasBiometricAuth = true;
      this.biometricAuth = biometricToken; //JSON.parse(biometricToken) ;
    }else{
      this.hasBiometricAuth = false;
    }
    const showDialog = localStorage.getItem('show-bio-dialog');
    console.log('[LandingPage] getStoredValues() 2 showDialog: ', showDialog, this.hasBiometricAuth);
    if(showDialog!== 'false'){
      console.log('showDialog: ', showDialog !== 'false');
      this.showBiometricDialog = true;
    }else{
      console.log('showDialog: ', showDialog !== 'false');
      this.showBiometricDialog = false;
    }
      
  }

  getBiometric(){
    return this.biometric_list.find(bio => bio.endpoint === this.environment);
  }

  isAvailableFaID(): Promise<any>{
   return this.faio.isAvailable().then((result: any)  =>{
      console.log(result)
      const showDialog = localStorage.getItem('show-bio-dialog');
      console.log('[LandingPage] isAvailableFaID() 1 showDialog:', showDialog);
      if(showDialog === undefined || showDialog === null)
        localStorage.setItem('show-bio-dialog','true');
      else if(!this.isBiometric())
        localStorage.setItem('show-bio-dialog','true');
      else
        localStorage.setItem('show-bio-dialog','false');

        console.log('[LandingPage] isAvailableFaID() 2 showDialog:', localStorage.getItem('show-bio-dialog'));
      return true
    }).catch(async (error: any) => {
        localStorage.setItem('show-bio-dialog','false');
      return false
    });
  }

  getListBiometric(){
    let list = JSON.parse(localStorage.getItem('biometric_list'))
    this.biometric_list = list? list:[];
    this.environment = Number(JSON.parse(localStorage.getItem('endpoint')));
    this.settingsBio = 'settings-bio' + this.environment
    console.log("[BiometricAuthPage] getListBiometric() biometric_list, environment", this.biometric_list, this.environment);
  }

  isBiometric(){
    const bio = this.biometric_list.find(bio => bio.endpoint === this.environment);
    if(bio) return true;
    else return false
  }


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

  async appBlockedByUser(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      subHeader: this.translate.instant('security.alert_security'),
      message: message,
      backdropDismiss: false,
        buttons: [
          {
            text: this.translate.instant("button.cancel"),
            handler: (data) => {
              //Exit from app
              navigator['app'].exitApp();
            }
          },
         {
            text: this.translate.instant("button.accept"),
            handler: (data) => {
              //Desblobked App
              this.passwordRecovery()
            }
          }
        ]
    });

    await alert.present();
  }

}
