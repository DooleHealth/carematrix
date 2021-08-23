import { Component, OnInit } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
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
  isFaID = true
  isTwoFactor = true
  biometric: any
  constructor(
    private dooleService: DooleService,
    public languageService: LanguageService, 
    private modalCtrl: ModalController,
    private notification: NotificationService,
    private authService: AuthenticationService,
    private translate: TranslateService, 
    private platform: Platform,
    private faio: FingerprintAIO,
    ) {}
  ngOnInit() {
    this.getNotificationConfiguration()
    this.getLocalLanguages()
    this.isAvailableFaID()
    this.isAvailableTwoFactor()
  }

  getNotificationConfiguration(){
    this.dooleService.getAPInotificationConfigurations().subscribe(
      async (res: any) =>{
       console.log('[SettingsPage] sendConfigution()', await res);
       if(res){
        this.getConfigurationParams(res)
       }
       },(err) => { 
          console.log('[SettingsPage] sendConfigution() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  getConfigurationParams(params: any){
    this.authentication = (params?.two_factor_authentication== "1")? true:false
    //this.faceId = (params?.faceIdNotificaton== "1")? true:false
    this.faceId = JSON.parse(localStorage.getItem('settings-bio'))
    console.log('[SettingsPage] getConfigurationParams()', this.faceId, localStorage.getItem('settings-bio'));
    this.communications = (params?.communicationsNotificaton== "1")? true:false
    this.appointment = (params?.appointmentNotificaton== "1")? true:false
    this.diets = (params?.dietsNotificaton== "1")? true:false
    this.medication = (params?.drugIntakeNotificationMail == "1")? true:false
    this.goals = (params?.goalsNotificaton== "1")? true:false
    this.advices = (params?.advicesNotificaton== "1")? true:false
    this.offers = (params?.offersNotificaton== "1")? true:false
    this.form = (params?.formNotificaton== "1")? true:false
    this.messages = (params?.messagesNotificaton== "1")? true:false

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
    console.log(`[SettingsPage] changeFaceId(${this.faceId})`);
    if(this.faceId){
      if(!JSON.parse(localStorage.getItem('settings-bio')))
      this.showBioAuthDlg()
    }
    else
      localStorage.setItem('settings-bio', 'false');
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
      name: 'drugIntakeNotificationMail',
      value: this.medication
    }
    //let params2 = {drugIntakeNotificationMail: 1}
    this.sendConfigution(params)
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


  sendConfigution(params){
    this.dooleService.postAPIConfiguration(params).subscribe(
      async (res: any) =>{
       console.log('[SettingsPage] sendConfigution()', await res);
       if(res.success){
        console.log(`[SettingsPage] sendConfigution(success: ${res.success})`);
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

  changeLanguages(){
    console.log('[SettingsPage] changeLanguages()', this.language);
    this.languageService.setLenguageLocalstorage(this.language)
  }

  getLocalLanguages(){
    this.language = this.languageService.getCurrent()
    console.log('[SettingsPage] getLocalLanguages()', this.language);
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
             let biometric = this.getStorageBiometric()
             if(biometric)
             await this.updateBiometrics()
             else
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
        //this.dismissLockScreen();
  
      }
  
    }

    async registerBiometrics() {
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

    async updateBiometrics() {
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
      console.log(`[AuthenticationService] getStorageBiometric()`, JSON.parse(bio));
      return JSON.parse(bio);
    }

    isAvailableFaID(){
      this.faio.isAvailable().then((result: any)  =>{
        console.log(result)
      }).catch(async (error: any) => {
        localStorage.setItem('show-bio-dialog','false');
        this.isFaID = false
      });
    }

    isAvailableTwoFactor(){
      this.isTwoFactor = !JSON.parse(localStorage.getItem('two-factor-center')) 
    }

}
