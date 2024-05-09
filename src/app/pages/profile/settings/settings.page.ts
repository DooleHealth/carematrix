import { Component, NgZone, OnInit } from '@angular/core';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';
import { LanguageService } from 'src/app/services/language.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PasswordPage } from './password/password.page';
import { Md5 } from 'ts-md5/dist/md5';
import { Constants } from 'src/app/config/constants';
import { Router } from '@angular/router';
import { ApiEndpointsService } from 'src/app/services/api-endpoints.service';
import { PusherConnectionService } from 'src/app/services/pusher/pusher-connection.service';
import { Capacitor } from '@capacitor/core';
import { NotificationOptions, notificationOpt } from 'src/app/components/notification/notification-options';
import { Health } from '@awesome-cordova-plugins/health/ngx';
import { NativeSettings, AndroidSettings } from 'capacitor-native-settings';
import { ChangeEndpointsService, _INDEX_ENPOINT } from 'src/app/services/change-endpoints.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  private settingsBio = '';
  authentication = false
  faceId = false
  language
  listLanguage = []
  isFaID = true
  isTwoFactor = true
  biometric: any
  listEndPoint = []
  biometric_list = []
  modeDevelop = false;
  environment;
  isSelectEndPoint = false;
  api: any;
  enableGoogleFitSettings = false;
  connected: boolean;
  checkedGoogleFit = false;
  /**
   * optionList: To load all notifications
   */
  /**/
  optionList:notificationOpt[] = []
  private notification_options: NotificationOptions
  /**
   * optAppAndEmail: This variable is to have the app and email options separate
   */
  /**/
  optAppAndEmail = true;  
  constructor(
    private dooleService: DooleService,
    public languageService: LanguageService,
    private modalCtrl: ModalController,
    private notification: NotificationService,
    private authService: AuthenticationService,
    private translate: TranslateService,
    private platform: Platform,
    private faio: FingerprintAIO,
    public role: RolesService,
    public contant: Constants,
    private router: Router,
    private alertController: AlertController,
    private pusherConnection: PusherConnectionService,
    private health: Health,
    private endpoints: ChangeEndpointsService,
    private ngZone: NgZone
    ) {
      this.notification_options = new NotificationOptions()
    }
  ngOnInit() {
    this.optionList = this.notification_options.getListOptions()
    this.getListBiometric()
    this.isAvailableFaID()
    this.isAvailableTwoFactor()
    this.getCenterLanguages()
    this.getModeDevelopmne()
    this.checkGoogleFitConnection()

  }

  ionViewDidEnter(){
    this.getListBiometric()
    this.getEndPoint()
    this.getNotificationConfiguration()
  }

  getModeDevelopmne(){
    this.modeDevelop = JSON.parse(localStorage.getItem('modeActivate'));
  }

  getNotificationConfiguration(){
    this.dooleService.getAPInotificationConfigurations().subscribe(
      async (res: any) =>{
       console.log('[SettingsPage] getNotificationConfiguration()', await res);
       if(res){
        this.getConfigurationParams(res)
       }
       },(err) => {
          console.log('[SettingsPage] getNotificationConfiguration() ERROR(' + err.code + '): ' + err.message);
          throw err;
      });
  }

  getConfigurationParams(params: any){
    this.authentication = (params?.two_factor_authentication== "1")? true:false
    this.faceId = JSON.parse(localStorage.getItem(this.settingsBio))
    this.optionList = this.notification_options.setAppMailField(this.optionList, params)
    //console.log('[SettingsPage] getConfigurationParams() 2', this.optionList);
  }

  changeAuthentication(){
    let factor = Number(this.authentication)
    console.log(`[SettingsPage] changeAuthentication(${factor})`);
    let params = {
      name: 'two_factor_authentication',
      value: factor
    }
    this.sendConfigution(params)
  }

  
  changeFaceId() {
    if (this.faceId == JSON.parse(localStorage.getItem(this.environment.settings_bio)))
      return
    this.showBioAuthDlg(this.faceId)
  }

  changeStateOptionsNoti(notification){
    if(notification.item_expanded)
    notification.item_expanded = false
    else{
      this.optionList.map(item => {
        if(notification == item){
          item.item_expanded = !item.item_expanded
        }else{
          item.item_expanded = false
        }
        return item;
      })
    }
  }

  sendConfigution(params){
    this.dooleService.postAPIConfiguration(params).subscribe(
      async (res: any) =>{
       //console.log('[SettingsPage] sendConfigution()', await res);
       if(res.success){
       // console.log(`[SettingsPage] sendConfigution(success: ${res.success})`);
       }else{
          console.log(`[SettingsPage] sendConfigution(success: ${res.success})`);
        }
       },(err) => {
          console.log('[SettingsPage] sendConfigution() ERROR(' + err.code + '): ' + err.message);
          throw err;
      });
  }

  updateLanguage(id){
    let params = {language_id: id}
    this.dooleService.updateAPIuser(params).subscribe(
      async (res: any) =>{
       //console.log('[SettingsPage] updateLanguage()', await res);
       if(res.success){
        if(id == res.user.language_id){
          this.languageService.setLenguageLocalstorage(this.language.code)
          //this.notification.displayToastSuccessful()
          this.getEndPoint()
        }
       }else{
         alert(this.translate.instant('setting.error_changed_language'))
       }
       },(err) => {
          console.log('[SettingsPage] updateLanguajes() ERROR(' + err.code + '): ' + err.message);
          throw err;
      });
  }

  changeLanguages(){
    //console.log('[SettingsPage] changeLanguages()', this.language);
    if(this.language.code.split('-')[0] == 'es') this.language.code = 'es';
    this.updateLanguage(this.language.id)
  }

  getLocalLanguages(){
    let language = this.languageService.getCurrent()
    this.language = this.listLanguage.find(lang => lang.code.split('-')[0] == language )
    if(this.language.code.split('-')[0] == 'es') this.language.code = 'es';
    //console.log('[SettingsPage] getLocalLanguages()', this.language);
  }

  getCenterLanguages(){
    this.dooleService.getAPIlanguagesCenter().subscribe(
      async (res: any) =>{
       console.log('[SettingsPage] getCenterLanguages()', await res);
       if(res){
        this.listLanguage = []
        this.listLanguage = res
        this.getLocalLanguages()
       }else{
         //alert(this.translate.instant('setting.error_changed_language'))
       }
       },(err) => {
          console.log('[SettingsPage] getCenterLanguages() ERROR(' + err.code + '): ' + err.message);
          throw err;
      });
  }

  async changePassword(){
    const modal = await this.modalCtrl.create({
      component:  PasswordPage,
      componentProps: { },
      cssClass: "modal-custom-class"
    });

    modal.onDidDismiss()
      .then((result) => {
        console.log('changePassword()', result);
        if(result?.data?.error){
         // let message = this.translate.instant('landing.message_wrong_credentials')
          //this.dooleService.presentAlert(message)
        }else if(result?.data?.action == 'change'){
          this.notification.displayToastSuccessful()
        }
      });

      await modal.present();

    }

    async showBioAuthDlg(faceId: boolean) {

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
              console.log('[SettingsPage] registerBiometrics() result', result);
            if(result == false){
              this.faceId = !this.faceId
              return
            }

            if(!faceId){
              localStorage.setItem(this.environment?.settings_bio, 'false');
              return
            }

             let biometric: any =  this.getBiometric()//this.getStorageBiometric()
             if(biometric?.id)
             await this.updateBiometrics(faceId)
             else
             await this.registerBiometrics(faceId);
            })
            .catch(async (error: any) => {
              console.log(error);
              if (error.code == -102) {
                setTimeout(() => this.showBioAuthDlg(false), 500);
              }
              this.faceId = !this.faceId

            });

        }).catch(async (error: any) => {
          localStorage.setItem('show-bio-dialog','false');
        });
      } else {
        alert('only in device');
        //this.dismissLockScreen();

      }

    }

    async registerBiometrics(faceId) {
      console.log('[SettingsPage] registerBiometrics()');
      let hash = Md5.hashStr(Date.now().toString()).toString();
        this.authService.postAPIbiometric({hash: hash}).subscribe(
          async (data) => {
            console.log(data);
            if(data.success){
              let e = {hash: hash, id: data.id, endpoint: this.environment}
              localStorage.setItem(this.environment?.biometric, JSON.stringify(e));
              localStorage.setItem(this.environment?.settings_bio, 'true');
              localStorage.setItem(this.environment?.show_bio_dialog, 'false');
              this.addBiometricToList(e)
              this.notification.displayToastSuccessful()
            }
          },
          (error) => {
            // Called when error
            alert(this.translate.instant(error?.message));
          });
    }

    async updateBiometrics(faceId) {
      console.log('[SettingsPage] updateBiometrics()');
      let hash = Md5.hashStr(Date.now().toString()).toString();
        this.authService.putAPIbiometric(this.biometric.id, {hash: hash}).subscribe(
          async (data) => {
            console.log(data);
            if(data.success){
              let e = {hash: hash, id: data.id, endpoint: this.environment}
              localStorage.setItem(this.environment?.biometric, JSON.stringify(e));
              localStorage.setItem(this.environment?.settings_bio, 'true');
              localStorage.setItem(this.environment?.show_bio_dialog, 'false');
              this.addBiometricToList(e)
              this.notification.displayToastSuccessful()
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

    getStorageBiometric(): Promise<any> {
      const bio = localStorage.getItem('bio-auth')
      console.log(`[SettingsPage] getStorageBiometric()`, JSON.parse(bio));
      return JSON.parse(bio);
    }

    getListBiometric(){
      let list = JSON.parse(localStorage.getItem('biometric_list'))
      this.biometric_list = list? list:[];
      this.environment = Number(JSON.parse(localStorage.getItem('endpoint')));
      this.settingsBio = 'settings-bio' + this.environment
      console.log("[BiometricAuthPage] getListBiometric() biometric_list, environment", JSON.stringify(this.biometric_list) , this.environment);
    }

    getBiometric(){
      return this.biometric_list.find(bio => bio.endpoint === this.environment);
    }

    isAvailableFaID(){
      this.faio.isAvailable().then((result: any)  =>{
        console.log(`[SettingsPage] isAvailableFaID()`,result)
        if(JSON.parse(localStorage.getItem(this.settingsBio)) === undefined)
        localStorage.setItem(this.settingsBio,'false');
      }).catch(async (error: any) => {
        localStorage.setItem('show-bio-dialog','false');
        localStorage.setItem(this.settingsBio,'false');
        this.isFaID = false
        this.faceId = false
      });
    }

    isAvailableTwoFactor(){
      this.isTwoFactor = !JSON.parse(localStorage.getItem('two-factor-center'))
    }

    changeEndPoint(event){
      console.log('[SettingsPage] changeEndPoint()', event.detail.value.id)
      let index = event.detail.value.id
      //if(this.isSelectEndPoint)
      //this.signOut(true, index)
      this.confirmCloseAllDevices(index)
      this.isSelectEndPoint = true
    }

    getEndPoint() {
      this.endpoints.addEndPoint()
      this.environment = this.endpoints._ENVIROMENT
      this.listEndPoint = this.endpoints._LIST_ENPOINT
      this.listEndPoint.forEach((e, index) => {
        e.name = this.translate.instant(e.name)
        if (index == _INDEX_ENPOINT)
          this.environment = e
      })
      this.biometric = JSON.parse(localStorage.getItem(this.environment.biometric))
      console.log('[SettingsPage] getEndPoint()', this.listEndPoint, this.environment)
    }


    async signOut(confirm, index) {
      if (Capacitor.isNativePlatform()) {
        await this.authService.logout(confirm).subscribe(res=>{
          console.log('[SettingsPage] signOut()', JSON.stringify(res))
          if(res.success){
            this.endpoints.setIndexEndPointLocalstorage(index)
            this.pusherConnection.unsubscribePusher()
            this.router.navigateByUrl('/landing');
          }
          else{
            let message = this.translate.instant('setting.error_message_sign_off')
            this.dooleService.showAlertAndReturn('Error',message, false,'/landing')
          }
        });
      }else{
        await this.authService.logout1().then(res=>{
          this.endpoints.setIndexEndPointLocalstorage(index)
          this.pusherConnection.unsubscribePusher()
          this.router.navigate(['/landing'], { replaceUrl: true });
        });
      }
    }


    async confirmCloseAllDevices(index) {

      console.log('[SettingsPage] confirmCloseAllDevices()', index)
      const alert = await this.alertController.create({
        cssClass: 'my-alert-class',
        subHeader: this.translate.instant('setting.sign_off'),
        message: this.translate.instant('setting.message_sign_off'),
          buttons: [
            {
              text: this.translate.instant("button.no"),
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('[SettingsPage] AlertConfirm Cancel');

              }
            }, {
              text: this.translate.instant("button.yes"),
              handler: (data) => {
                this.signOut(true, index)
              }
            }
          ]
      });

      await alert.present();
    }

    checkGoogleFitConnection() {
      if (this.platform.is('android')) {
  
        this.health
          .isAvailable()
          .then((available: boolean) => {
            this.ngZone.run(() => {
              this.enableGoogleFitSettings = available;
            });
  
            
            console.log(this.enableGoogleFitSettings)
            this.health.isAuthorized([
              {
                read : ['distance', 'steps', 'heart_rate', 'activity', 'weight', 'blood_glucose'] // Read permission 
              }
            ]).then((authorized: boolean) => {
  
              this.ngZone.run(() => {
                console.log("Authorized " + authorized);
                this.connected = authorized;
              });
              
            })
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  
    doGoogleFitAction() {
      this.router.navigate(['google-fit'], { state: { settings: true } });
    }
  
    openAppConfig() {
      NativeSettings.openAndroid({
        option: AndroidSettings.ApplicationDetails,
      });
    }

}
