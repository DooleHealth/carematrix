import { Component, OnInit } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
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
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  settingsBio = '';
  authentication = false
  faceId = false
  communications = false
  appointment = false
  diets = false
  medication = false
  goals = false
  advices = false
  offers = false
  form = false
  messages = false
  language
  listLanguage = []
  isFaID = true
  isTwoFactor = true
  biometric: any
  reminder = false
  news = false
  release = false
  listEndPoint = []
  biometric_list = []
  modeDevelop = false;
  environment = 0
  isSelectEndPoint = false;
  api: any;
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
    private endPoint: ApiEndpointsService,
    private alertController: AlertController,
    ) {}
  ngOnInit() {
    this.getListBiometric()
    this.isAvailableFaID()
    this.isAvailableTwoFactor()
    this.getCenterLanguages()
    this.getModeDevelopmne()
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
       //console.log('[SettingsPage] getNotificationConfiguration()', await res);
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
    //console.log('[SettingsPage] getConfigurationParams()', this.faceId, localStorage.getItem('settings-bio'));
    this.communications = (params?.communicationsNotificaton== "1")? true:false
    this.appointment = (params?.appointmentNotificaton== "1")? true:false
    this.diets = (params?.dietsNotificaton== "1")? true:false
    this.medication = (params?.drugIntakeNotificationMail == "1")? true:false
    this.goals = (params?.goalsNotificaton== "1")? true:false
    this.advices = (params?.advicesNotificaton== "1")? true:false
    this.offers = (params?.offersNotificaton== "1")? true:false
    this.form = (params?.formNotificaton== "1")? true:false
    this.messages = (params?.messagesNotificaton== "1")? true:false
    this.reminder = (params?.reminderNotificationApp== "1")? true:false
    this.release = (params?.promoteContentNotification== "1")? true:false
    this.news = (params?.newsNotificationApp== "1")? true:false

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

  changeFaceId(){
    if(this.faceId == JSON.parse(localStorage.getItem(this.settingsBio)))
      return
    this.showBioAuthDlg(this.faceId)
  }

  changeCommunications(){
    let params = {
      name: 'communicationsNotificaton',
      value: this.communications
    }
    this.sendConfigution(params)
  }

  changeAppointment(){
    let params = {
      name: 'appointmentNotificaton',
      value: this.appointment
    }
    this.sendConfigution(params)
  }

  changeDiets(){
    let params = {
      name: 'dietsNotificaton',
      value: this.diets
    }
    this.sendConfigution(params)
  }

  changeMedication(){
    let params = {
      name: 'drugIntakeNotificationApp',
      value: this.medication
    }
    this.sendConfigution(params)
    let params2 = {
      name: 'drugIntakeNotificationMail',
      value: this.medication
    }
    this.sendConfigution(params2)
  }

  changeAdvices(){
    let params = {
      name: 'advicesNotificaton',
      value: this.advices
    }
    this.sendConfigution(params)
  }

  changeOffers(){
    let params = {
      name: 'offersNotificaton',
      value: this.offers
    }
    this.sendConfigution(params)
  }

  changeGoals(){
    let params = {
      name: 'goalsNotificaton',
      value: this.goals
    }
    this.sendConfigution(params)
  }

  changeForm(){
    let params = {
      name: 'formNotificaton',
      value: this.form
    }
    this.sendConfigution(params)
  }

  changeMessages(){
    let params = {
      name: 'messagesNotificaton',
      value: this.messages
    }
    this.sendConfigution(params)
  }

  changeReminders(){
    let params = {
      name: 'reminderNotificationApp',
      value: this.reminder
    }
    this.sendConfigution(params)
    let params2 = {
      name: 'reminderNotificationMail',
      value: this.reminder
    }
    this.sendConfigution(params2)
  }

  changeNews(){
    let params = {
      name: 'newsNotificationApp',
      value: this.news
    }
    this.sendConfigution(params)
    let params2 = {
      name: 'newsNotificationMail',
      value: this.news
    }
    this.sendConfigution(params2)
  }

  changeRelease(){
    let params = {
      name: 'promoteContentNotification',
      value: this.release
    }
    this.sendConfigution(params)
  }



  sendConfigution(params){
    this.dooleService.postAPIConfiguration(params).subscribe(
      async (res: any) =>{
       //console.log('[SettingsPage] sendConfigution()', await res);
       if(res.success){
       // console.log(`[SettingsPage] sendConfigution(success: ${res.success})`);
       }
        else{
          console.log(`[SettingsPage] sendConfigution(success: ${res.success})`);
          //alert(res.success)
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
       //console.log('[SettingsPage] getCenterLanguages()', await res);
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

      if (!this.platform.is('mobileweb') && !this.platform.is('desktop')) {
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
              localStorage.setItem(this.settingsBio, 'false');
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
              localStorage.setItem('bio-auth', JSON.stringify(e));
              localStorage.setItem('show-bio-dialog', 'false');
              localStorage.setItem(this.settingsBio, 'true');
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
              localStorage.setItem('bio-auth', JSON.stringify(e));
              localStorage.setItem('show-bio-dialog', 'false');
              localStorage.setItem(this.settingsBio, 'true');
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
      if(this.isSelectEndPoint)
      //this.signOut(true, index)
      this.confirmCloseAllDevices(index)
      this.isSelectEndPoint = true
    }

    getEndPoint(){
      //this.contant.addEndPoint()
      this.listEndPoint =  this.contant.LIST_ENPOINT
      this.listEndPoint.forEach( (e,index)=>{
        e['id']=index
        e.name = this.translate.instant(`mode_development.mode_${index}`)
        if(index == this.contant.INDEX)
        this.api = e
      })
      console.log('[SettingsPage] getEndPoint()', this.listEndPoint, this.api)
    }


    async signOut(confirm, index) {
      if (!this.platform.is('mobileweb') && !this.platform.is('desktop')) {
        await this.authService.logout(confirm).subscribe(res=>{
          console.log('[SettingsPage] signOut()', JSON.stringify(res))
          if(res.success)
          this.router.navigateByUrl('/landing');
          else{
            let message = this.translate.instant('setting.error_message_sign_off')
            this.dooleService.showAlertAndReturn('Error',message, false,'/landing')
          }
          this.endPoint.setIndexEndPointLocalstorage(index)
        });
      }else{
        await this.authService.logout1().then(res=>{
          this.router.navigateByUrl('/landing');
        });
      }
    }


    async confirmCloseAllDevices(index) {
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
                console.log('[LandingPage] AlertConfirm Cancel');
                this.signOut(false, index)
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

}
