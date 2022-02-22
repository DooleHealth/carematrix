import { Component, OnInit } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';
import { LanguageService } from 'src/app/services/language.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PasswordPage } from './password/password.page';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
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
  constructor(
    private dooleService: DooleService,
    public languageService: LanguageService, 
    private modalCtrl: ModalController,
    private notification: NotificationService,
    private authService: AuthenticationService,
    private translate: TranslateService, 
    private platform: Platform,
    private faio: FingerprintAIO,
    private role: RolesService
    ) {}
  ngOnInit() {
    this.isAvailableFaID()
    this.isAvailableTwoFactor()
    this.getCenterLanguages()
  }

  ionViewDidEnter(){
    this.getNotificationConfiguration()
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
    this.faceId = JSON.parse(localStorage.getItem('settings-bio'))
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
    if(this.faceId == JSON.parse(localStorage.getItem('settings-bio')))
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
       console.log('[SettingsPage] sendConfigution()', await res);
       if(res.success){
        if(id == res.user.language_id){
          this.languageService.setLenguageLocalstorage(this.language.code)
          //this.notification.displayToastSuccessful()
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
    console.log('[SettingsPage] changeLanguages()', this.language);
    if(this.language.code.split('-')[0] == 'es') this.language.code = 'es';
    this.updateLanguage(this.language.id)
  }

  getLocalLanguages(){
    let language = this.languageService.getCurrent()
    this.language = this.listLanguage.find(lang => lang.code.split('-')[0] == language )
    if(this.language.code.split('-')[0] == 'es') this.language.code = 'es';
    console.log('[SettingsPage] getLocalLanguages()', this.language);
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
              localStorage.setItem('settings-bio', 'false');
              return
            }

             let biometric: any = this.getStorageBiometric()
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
              let e = {hash: hash, id: data.id}
              localStorage.setItem('bio-auth', JSON.stringify(e));
              localStorage.setItem('show-bio-dialog', 'false');
              localStorage.setItem('settings-bio', 'true');
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
              let e = {hash: hash, id: data.id}
              localStorage.setItem('bio-auth', JSON.stringify(e));
              localStorage.setItem('show-bio-dialog', 'false');
              localStorage.setItem('settings-bio', 'true');
              this.notification.displayToastSuccessful()
            }  
          },
          (error) => {
            // Called when error
            alert(this.translate.instant(error?.message));
          });
    }

    getStorageBiometric(): Promise<any> {
      const bio = localStorage.getItem('bio-auth')
      console.log(`[SettingsPage] getStorageBiometric()`, JSON.parse(bio));
      return JSON.parse(bio);
    }

    isAvailableFaID(){
      this.faio.isAvailable().then((result: any)  =>{
        console.log(`[SettingsPage] isAvailableFaID()`,result)
        if(JSON.parse(localStorage.getItem('settings-bio')) === undefined)
        localStorage.setItem('settings-bio','false');
      }).catch(async (error: any) => {
        localStorage.setItem('show-bio-dialog','false');
        localStorage.setItem('settings-bio','false');
        this.isFaID = false
        this.faceId = false
      });
    }

    isAvailableTwoFactor(){
      this.isTwoFactor = !JSON.parse(localStorage.getItem('two-factor-center')) 
    }

}
