import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { RolesService } from 'src/app/services/roles.service';
import { PusherConnectionService } from 'src/app/services/pusher/pusher-connection.service';
import { Capacitor } from '@capacitor/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { ChangeEndpointsService } from 'src/app/services/change-endpoints.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Input()credentials: {username, password, hash};
  @Input()pushNotification: any;
  language: any;
  constructor(
    private authService: AuthenticationService,
    private dooleService: DooleService,
    private router: Router,
    private ngZone: NgZone,
    public languageService: LanguageService,
    private translate: TranslateService,
    private modalCtrl: ModalController,
    private analyticsService: AnalyticsService,
    public platform: Platform,
    private device: Device,
    private network: Network,
    public role: RolesService,
    private navigation: NavigationService,
    private pusherConnection: PusherConnectionService,
    private endpoints: ChangeEndpointsService,
    ) { }

  ngOnInit() {
    this.loginUser();
  }

  async ionViewDidEnter(){
    // this.analyticsService.setScreenName('login','LoginPage')
    //console.log('[LoginPage] ionViewDidEnter() Device: ',  JSON.stringify(this.device));
  }



  loginUser(){
    if (Capacitor.isNativePlatform()) {
      this.credentials['platform'] = this.device?.platform
      this.credentials['device_model'] = this.device?.model
      this.credentials['os_version'] = this.device?.version
      this.credentials['device_brand'] = this.device?.manufacturer
      this.credentials['connection_type'] = this.network?.type
      console.log('[LoginPage] ionViewDidEnter() Device: ',  this.device.platform, this.device.model, this.device.version, this.device.manufacturer, this.network.type);
    }

    this.authService.login(this.credentials).subscribe(async (res) => {
      //console.log('[LoginPage] doDooleAppLogin()', res);
      await res;
      console.log('[LoginPage] loginUser()', res);
      if(res.success){
        // this.analyticsService.setUser(res.idUser)
        // this.analyticsService.logEvent('login', res)
        // this.analyticsService.logEvent('sign_in_doole', {user_doole: res.idUser})
        // this.analyticsService.logEvent('user_doole', {userId: res.idUser})

        // this.role.setProfessional(false)
        // this.role.customAllComponents(true,false,true,false,false,false,false,true,true,true,true, false, true)
        this.setLocalLanguages(res.language)
        localStorage.setItem('userId', res.idUser);
        this.pusherConnection.subscribePusher(res.token, res.idUser)
        console.log('[LoginPage] loginUser() this.pushNotification', this.pushNotification);
        if(this.pushNotification){
          this.redirecPushNotification(this.pushNotification)
          this.modalCtrl.dismiss({error:null});
          return
        }

        if(res.twoFactorUser){
          this.router.navigate(['/verification']);
          this.modalCtrl.dismiss({error:null});
        }
        else
        this.checkConditionLegal();
      }else{
        let message = this.translate.instant('landing.message_wrong_credentials')
        this.modalCtrl.dismiss({error: message});
      }

    }, async (error) => {
     console.log('doDooleAppLogin() ERROR', await error?.message);
     if(error?.message == 'ERR_INTERNET_DISCONNECTED'){
        setTimeout(()=>this.modalCtrl.dismiss({error:error}), 500);
     }
     else
     this.modalCtrl.dismiss({error:error});
     throw error;
   });
  }

  setLocalLanguages(language){
    this.language = (language === 'es-es')? 'es':language
    //console.log("language", language)
    this.languageService.setLenguageLocalstorage(this.language)
  }


  checkConditionLegal(){
    
    this.dooleService.getAPILegalInformation().subscribe(
      async (res: any) =>{
        //console.log('[LoginPage] checkConditionLegal()', await res);
        if(res.success)
          this.redirectPage(res.accepted_last)
        else
          this.modalCtrl.dismiss({error:res.message});
       },(err) => {
          console.log('[LoginPage] checkConditionLegal() ERROR(' + err.code + '): ' + err.message);
          this.modalCtrl.dismiss({error:err.message});
          throw err;
      });

  }

  redirectPage(condicion){
    if(!condicion){
      localStorage.setItem('allNotification', 'false');
      this.router.navigate(['/legal']);
      this.modalCtrl.dismiss({error:null});
    }else{
      this.redirectBiometric()
    }
  }

  showIntro(){
    this.authService.getShowIntroLocalstorage().then((showIntro) =>{
      console.log(`[LegalPage] getStorage() localStorage`,showIntro);
      if(showIntro){
        this.redirectLoggedUserToHomePage();
      }else{
        this.router.navigate(['/gif']).then(()=>{
          this.modalCtrl.dismiss({error:null});
        });

      }
    })
  }

    // Once the auth provider finished the authentication flow, and the auth redirect completes,
  // hide the loader and redirect the user to the profile page
  redirectLoggedUserToHomePage() {
    console.log('[LoginPage] redirectLoggedUserToHomePage()');
    //this.dismissLoading();
    // As we are calling the Angular router navigation inside a subscribe method, the navigation will be triggered outside Angular zone.
    // That's why we need to wrap the router navigation call inside an ngZone wrapper
    this.ngZone.run(() => {
      this.router.navigate(['home']);
      setTimeout(() => {
        // Close modal
        this.modalCtrl.dismiss({date:null});
    }, 500);

    });
  }

  redirectBiometric(){
    let condicion = JSON.parse( localStorage.getItem(this.endpoints._ENVIROMENT?.show_bio_dialog) )
    console.log('[LoginPage] redirectBiometric() condicion: ',condicion);
    if(condicion){
      this.ngZone.run(() => {
        this.router.navigate(['/login/biometric-auth'])
        setTimeout(() => {
          // Close modal
          this.modalCtrl.dismiss({error:null});
      }, 500);

      });
    } else{
      this.showIntro()
    }
  }


  redirecPushNotification(data){
    this.navigation.redirecPushNotification(data)
  }


}
