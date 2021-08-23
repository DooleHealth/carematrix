import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken } from '@capacitor/core';
import { AlertController, MenuController, ModalController, Platform, ToastController } from '@ionic/angular';
import { Badge } from '@ionic-native/badge/ngx';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseAuthService } from './services/firebase/auth/firebase-auth.service';
import firebase from 'firebase';
import { LanguageService } from './services/language.service';
import { HistoryHelperService } from './utils/history-helper.service';
import { AuthenticationService } from './services/authentication.service';
import { StorageService } from './services/storage.service';
import { Network } from '@ionic-native/network/ngx';
import { throwError } from 'rxjs';

import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { VideoComponent } from './components/video/video.component';
import { OpentokService } from './services/opentok.service';
import { DooleService } from './services/doole.service';
import { setLines } from '@angular/material/core';


const { PushNotifications } = Plugins;
declare let VoIPPushNotification: any;
declare let cordova: any;


import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
 
const { PushNotifications } = Plugins;
const { BiometricAuth } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    { title: 'home.emergency', url: '/app/home/emergency', image: '../../assets/icons/i_em_trobo_malament.svg' },
    { title: 'home.assistencia', url: 'app/home/healthcare', image: '../../assets/icons/i_assistencia_medica.svg' },
    { title: 'home.salut', url: 'app/home/', image: '../../assets/icons/i_la_meva_salut.svg' },
    { title: 'home.tramits', url: 'app/home/', image: '../../assets/icons/i_tramits_i_gestions.svg' },
    { title: 'side-menu.contact', url: 'app/home/', image: '../../assets/icons/i_contactar.svg' },
    { title: 'side-menu.settings', url: 'app/home/', image: '../../assets/icons/i_configuracio.svg' }]
  previousUrl: string = null;
  currentUrl: string = null;
  textDir = 'ltr';
  available_languages = [];
  translations;
  lastResume;
  idAgenda = null;
  lastVideocall: any; //ultima vegada que hem acceptat videotrucada
  // Inject HistoryHelperService in the app.components.ts so its available app-wide
  constructor(
    private router: Router,
    public menu: MenuController,
    public translate: TranslateService,
    public historyHelper: HistoryHelperService,
    public firebaseService: FirebaseAuthService,
    public authService: AuthenticationService,
    public languageService: LanguageService,
    public alertController: AlertController,
    public platform: Platform,
    private storageService: StorageService,
    private badge: Badge,
    public toastCtrl: ToastController,
    private network: Network,
    private opentokService: OpentokService,
    private modalCtrl: ModalController,
    private backgroundMode: BackgroundMode,
    private dooleService: DooleService,
    private faio : FingerprintAIO

  ) {
    //firebase.initializeApp(environment.firebase);
    //firebase.database.enableLogging(true);

  }

  ngOnInit(): void {
    this.setLanguage();
    this.translate.onLangChange.subscribe(() => this.getTranslations());
    this.storageService.isFirstTimeLoad();
    
    this.platform.ready().then(() => {

      if (!this.platform.is('mobileweb') && !this.platform.is('desktop')) {

        // Push
        this.registerPush();

        // VOIP calls for IOS
        if (this.platform.is('ios')) {
          this.initVoIpPushNotifications();
        }
      
        // Actions when a VOIP call is received
        this.phonecallHandlers();
        
        // Lock device after 2 mins on pause
        this.lockDevice();

        // check internet status
        this.listenConnection();

         // Enable background mode
        //this.backgroundMode.enable();

      }

    });

  }

  private registerPush() {
    PushNotifications.requestPermission().then((permission) => {
      if (permission.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // No permission for push granted
      }
    });
 
    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        console.log('My token: ' + JSON.stringify(token));
        let platform = 'ios';
        if (this.platform.is('android')) {
          platform = 'android';
        }

        console.log("TOKEN:", token);

        this.authService.devicePlatform = platform;
        this.authService.deviceToken = token.value;

      }
    );
 
    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });
 
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotification) => {
        this.badge.increase(1);
        console.log('Push received:');
        console.log(notification);
        this.showMessage(JSON.stringify(notification));

        if (notification?.data.action == "VIDEOCALL") {
          console.log('Te esta llamando tu medico');
          cordova.plugins.CordovaCall.receiveCall('Te esta llamando tu medico',1);

        }
      }
    );
 
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        if (data.detailsId) {
          this.router.navigateByUrl(`/home/${data.detailsId}`);
        }
      }
    );
  }
  

  initPushNotification() {
    console.log("** INIT PUSH **");

    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }

    PushNotifications.requestPermission().then(result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register().catch((error) => {
          console.log("** ERROR register PUSH **", error);
        });
      } else {
        // Show some error
      }
    }).catch((error) => {
      console.log("** ERROR request permission PUSH **", error);
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        let platform = 'ios';
        if (this.platform.is('android')) {
          platform = 'android';
        }

        console.log("TOKEN:", token);

        this.authService.devicePlatform = platform;
        this.authService.deviceToken = token.value;

      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      async (notification: PushNotification) => {
        console.log('Received a notification');
        console.log(notification);
        this.showMessage('Received a notification');
        this.badge.increase(1);
        if (notification.data.action == "VIDEOCALL") {
          console.log('Te esta llamando tu medico');
          cordova.plugins.CordovaCall.receiveCall('Te esta llamando tu medico');

        }
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        console.log('pushNotificationActionPerformed', notification);

        this.showMessage("pushNotificationActionPerformed: " + JSON.stringify(notification));
        const action = notification.notification.data?.action;
        const id = notification.notification.data?.id;
        const msg = notification.notification.data?.message;

        // If the app is running when the push received
        if (notification.notification.data?.foreground) {
          console.log("foreground");
          if (action == "MESSAGE") {
            this.showMessage("Has recibido un mensaje");
          }
          if (action == "FORM") {
            this.showMessage("Has recibido un mensaje");
            //this.router.navigate(['FormslistPage'],{state: {id: id, action : "open"}});
          }

          if (action == "DRUGINTAKE") {
            this.showMessage("Hora de tomarte la medicación");
            //this.router.navigate(['DrugsIntakeMainPage'],{state: {id: id, action : "open"}});
          }

          if (action == "VIDEOCALL") {
            this.showMessage("Videollamada de tu médico");
            console.log("[Ionic] voip notification callback called");
            //console.log(notification);

            //cordova.plugins.CordovaCall.receiveCall('Te esta llamando tu medico', id);

            //this.router.navigate(['AgendaDetailPage'],{state: {id: id, action : "open"}});
          }
        } else {
          //If the app is closed and started by clicking on the push notification
          if (action == "MESSAGE") {
          
            this.badge.decrease(1);
            this.router.navigate(['MessagesDetailPage'],{state: {id: id, action : "open"}});
          }

        );


        // set to landscape
        //this.screenOrientation.lock(this.screenOrientation. ORIENTATIONS.PORTRAIT).catch((err) => { console.log('Setting screen orientation failed:', err); });
        
        // Lock phone after 2 minutes in pause
        this.lastResume = new Date;
        this.platform.pause.subscribe((e) => {
          // Saves the time of pause to be used in resume
          this.lastResume = new Date;
        });

        this.platform.resume.subscribe(async (e) => {
          if (!this.router.url.includes('landing') && !this.router.url.includes('login')) {
             // App will lock after 2 minutes
             let secondsPassed = ((new Date).getTime() - this.lastResume.getTime()) / 1000;

             if (secondsPassed >= 120) {
                 // Must implement lock-screen
                this.showFingerprintAuthDlg()
              }

          }

        }

      }
    );
  }

  async startDooleVideocall() {

    console.log("AGENDA: ", this.opentokService.agendaId);
    this.dooleService.getAPIvideocall(this.opentokService.agendaId).subscribe(
      async (data) => {
        if(data.result){
          let tokboxSession = await data;
          this.opentokService.token$ = tokboxSession.token;
          this.opentokService.sessionId$ = tokboxSession.sessionId;
          this.opentokService.apiKey$ = tokboxSession.tokboxAPI;
          console.log("this.tokboxSession: ", tokboxSession);
        }else{
          let message = this.translate.instant('agenda.error_alert_message_get_token')
          alert(message)
        }       

        this.openVideocallModal();
      
      },
      (error) => {
        // Called when error
        alert( 'ERROR(' + error.code + '): ' + error.message)
        console.log("error: ", error);
        throw error;
      });
      
  }

  async openVideocallModal(){
    const modal = await this.modalCtrl.create({
      component: VideoComponent,
      componentProps: {},
    });

    modal.onDidDismiss().then((result) => {
    });

    await modal.present();
  }

  initVoIpPushNotifications() {

    console.log("** initVoIpPushNotifications **");
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }

    var self = this;

    var pushvoip = VoIPPushNotification.init();

    console.log("** INIT VoIP PUSH **", pushvoip);

    pushvoip.on('registration', function (data) {

      let platform = 'APNS';
      if (self.platform.is('android')) {
        platform = 'FCM';
      }

      console.log("[Ionic] registration callback called");
      console.log(data);

      self.authService.voipDeviceToken = data.deviceToken;
      self.authService.voipDevicePlatform  = platform

    });

    pushvoip.on('notification', async function (notification) {

      await notification
      console.log("[Ionic] voip notification callback called");
      console.log(notification);
      self.opentokService.agendaId = notification.extra.Caller.ConnectionId;

       //TODO. Penjar trucada si no s'agafa en x segons??
      // setTimeout( () => {
      //   console.log("timeout");
      //   cordova.plugins.CordovaCall.endCall();
      // }, 5000);
      //var extra = JSON.parse(notification.extra);
      cordova.plugins.CordovaCall.receiveCall(notification.extra.Caller.Username, notification.extra.Caller.user);

      // do something based on received data
    });

    pushvoip.on('error', function (e) {
      console.log("[Ionic] VoIPPushNotification error");
      console.log(e);
    });
  }

  
  phonecallHandlers(){

    var self = this;
    //accept de videocall
    cordova.plugins.CordovaCall.setVideo(true);
    
    cordova.plugins.CordovaCall.on('answer', function(data) {
      console.log("answer");
      console.log(data);
      self.lastResume = new Date;   //evitem aixi que apareixi pantalla de desbloquejar
      self.startDooleVideocall();
      cordova.plugins.CordovaCall.endCall();
    });

   
   //reject de videocall
   cordova.plugins.CordovaCall.on('reject', function(data) {
     console.log("reject");
     console.log(data);
   });

   //hangup de videocall
   cordova.plugins.CordovaCall.on('hangup', function(data) {
     console.log("hangup");
     console.log(data);
   });

   //receive
   cordova.plugins.CordovaCall.on('receiveCall', function(data) {
     console.log("receiveCall");
     console.log(data);

   });

   //send
   cordova.plugins.CordovaCall.on('sendCall', function(data) {
     console.log("send call");
     console.log(data);
   });
    
  }
  lockDevice() {
    // Lock phone after 2 minutes in pause
    this.lastResume = new Date;
    this.platform.pause.subscribe((e) => {
      // Saves the time of pause to be used in resume
      this.lastResume = new Date;
    });

    this.platform.resume.subscribe(async (e) => {

      //en android, tenim de mirar al obrir app si tenim videotrucada pendent
      // if (this.platform.is('android')) {
      //   let th = this;
      //   this.authService.post("user/videocall/pendingConnect", null).subscribe(json => {
      //     console.log(json);
      //     console.log(json.agenda);
      //     if (json.success) {
      //       th.idAgenda = json.agenda;
      //       console.log(th.idAgenda);

      //       //si tenim videotrucada pendent
      //       if (th.idAgenda != null) {

      //         if (th.lastVideocall == null) {
      //           th.lastVideocall = new Date;
      //           this.router.navigate(['VideocallPage', { id: th.idAgenda, auto: true }]);
      //         } else {
      //           let secondsPassed = ((new Date).getTime() - th.lastVideocall.getTime()) / 1000;
      //           console.log(secondsPassed + ' seconds passed');
      //           if (secondsPassed >= 10) {
      //             console.log("redirecting");
      //             this.router.navigate(['VideocallPage', { id: th.idAgenda, auto: true }]);
      //           }
      //         }

      //       } else {
      //         console.log("not redirecting");
      //       }
      //     }
      //   }, error => {

      //   });
      // }

      if (this.router.url.includes('app')) {

        // App will lock after 2 minutes
        let secondsPassed = ((new Date).getTime() - this.lastResume.getTime()) / 1000;


        if (secondsPassed >= 120) {
          // Must implement lock-screen
        }
      }
    });

  }
  async showMessage(text) {
    let toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    await toast.present();
  }

  listenConnection(): void {
    this.network.onDisconnect()
      .subscribe(() => {
        console.log('* onDisconnect');
        throwError({ status: 0, message: 'ERR_INTERNET_DISCONNECTED' });
      });
  }

  setLanguage() {
    // this language will be used as a fallback when a translation isn't found in the current language
    //this.translate.setDefaultLang('ca');
    this.translate.setDefaultLang('es');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    let userLanguage = localStorage.getItem('language') ? localStorage.getItem('language') : this.languageService.getCurrent();
    this.languageService.changeLanguage(userLanguage);

    // this is to determine the text direction depending on the selected language
    // for the purpose of this example we determine that only arabic and hebrew are RTL.
    // this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    //   this.textDir = (event.lang === 'ar' || event.lang === 'iw') ? 'rtl' : 'ltr';
    // });
  }

  getTranslations() {
    // get translations for this page to use in the Language Chooser Alert
    this.translate.getTranslation(this.languageService.getCurrent())
      .subscribe((translations) => {
        this.translations = translations;
      });


  }

  async openLanguageChooser() {
    this.available_languages = this.languageService.getLanguages()
      .map(item =>
      ({
        name: item.name,
        type: 'radio',
        label: item.name,
        value: item.code,
        checked: item.code === this.languageService.getCurrent()
      })
      );

    const alert = await this.alertController.create({
      header: this.translations.language.select_language,
      inputs: this.available_languages,
      cssClass: 'language-alert',
      buttons: [
        {
          text: this.translations.language.cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: this.translations.language.ok,
          handler: (lang) => {
            if (lang) {
              console.log("selected language: ", lang);
              this.languageService.changeLanguage(lang);

            }
          }
        }
      ]
    });
    await alert.present();

  }


  public showFingerprintAuthDlg() {

    this.faio.isAvailable().then((result: any) => {

      this.faio.show({
        cancelButtonTitle: this.translate.instant('button.cancel'),
        description: this.translate.instant('face-id.description'),
        title: this.translate.instant('face-id.title'),
        fallbackButtonTitle: this.translate.instant('face-id.fallback'),
        subtitle: this.translate.instant('face-id.subtitle'),
        disableBackup: true,
        
      })
        .then((result: any) => {
          console.log(result)
        })
        .catch(async (error: any) => {
          console.log(error);
          if(error.code == -102){
            setTimeout(()=>this.showFingerprintAuthDlg(), 500);
          }else{
            // if error.code == -108 user cancel prompt
            // if error.code == -111 too many attempts
            await this.authService.logout();
            this.router.navigateByUrl('/landing'); 
          }
        });

    })
      .catch(async (error: any) => {
        await this.authService.logout();
        this.router.navigateByUrl('/landing'); 
        console.log(error)
      });
  }


}


