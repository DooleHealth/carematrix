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
const { Storage } = Plugins;


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  pushNotification: any;
  loginForm: FormGroup;
  submitError: string;
  redirectLoader: HTMLIonLoadingElement;
  hasBiometricAuth: boolean = false;
  showBiometricDialog: boolean = false;
  biometricAuth: any;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private translate: TranslateService,
    public loadingController: LoadingController,
    public location: Location,
    public alertController: AlertController,

    public languageService: LanguageService,
    private dooleService: DooleService,
    private modalCtrl: ModalController,
    private faio: FingerprintAIO,
    private analyticsService: AnalyticsService
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
          else
          this.dooleService.presentAlert(message)
        }else{
          this.loginForm.get('username').setValue('')
          this.loginForm.get('password').setValue('')
          this.loginForm.get('hash').setValue('')
        }
    });

    await modal.present();
  }



  async openLoginModal() {

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
            setTimeout(() => this.doBiometricLogin(), 500);
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

}
