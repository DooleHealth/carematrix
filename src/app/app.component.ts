import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Filesystem, FilesystemDirectory, LocalNotification, LocalNotificationActionPerformed, Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken } from '@capacitor/core';

import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory as FilesystemDirectory} from '@capacitor/filesystem';
import { LocalNotifications, LocalNotificationSchema as LocalNotification, ActionPerformed as LocalNotificationActionPerformed} from '@capacitor/local-notifications';
import { PushNotifications, PushNotificationSchema as PushNotification, ActionPerformed as PushNotificationActionPerformed, Token as PushNotificationToken} from '@capacitor/push-notifications'
import { AlertController, MenuController, ModalController, Platform, ToastController } from '@ionic/angular';
import { Badge } from '@ionic-native/badge/ngx';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseAuthService } from './services/firebase/auth/firebase-auth.service';
import { LanguageService } from './services/language.service';
import { HistoryHelperService } from './utils/history-helper.service';
import { AuthenticationService } from './services/authentication.service';
import { StorageService } from './services/storage.service';
import { Network } from '@ionic-native/network/ngx';
import { throwError } from 'rxjs';
import 'firebase'
import { VideoComponent } from './components/video/video.component';
import { OpentokService } from './services/opentok.service';
import { DooleService } from './services/doole.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';
import { environment } from 'src/environments/environment';
import { VideocallIframePage } from './pages/agenda/videocall-iframe/videocall-iframe.page';
import { ApiEndpointsService } from './services/api-endpoints.service';
import { Storage } from '@capacitor/storage';


declare let VoIPPushNotification: any;
declare let cordova: any;
declare let IRoot: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  settingsBio = '';
  selectedIndex = 0;
  previousUrl: string = null;
  currentUrl: string = null;
  textDir = 'ltr';
  available_languages = [];
  translations;
  lastResume;
  idAgenda = null;
  lastVideocall: any; //ultima vegada que hem acceptat videotrucada
  isNotification: any;
  lastPause: Date;
  translationsForNotifications:any;
  environment = 0
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
    private dooleService: DooleService,
    private faio : FingerprintAIO,
    private _zone: NgZone,
    private endPoind: ApiEndpointsService
  ) {

    Storage.migrate();
  }

  async ngOnInit() {
    this.setLanguage();
    this.translate.onLangChange.subscribe(() => this.getTranslations());
    this.storageService.isFirstTimeLoad();
    this.endPoind.loadEndPoints()
    this.environment = Number(JSON.parse(localStorage.getItem('endpoint')));
    this.settingsBio = 'settings-bio' + this.environment


    this.platform.ready().then(() => {
      // Secutity - Rooted
      //this.isDeviceRooted()

      if (!this.platform.is('mobileweb') && !this.platform.is('desktop')) {
        // Push
        this.initPushNotifications();

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

        this.backButton();

        //this.createCacheFolder();
      }

    });
  }

  async createCacheFolder(){
    await Filesystem.mkdir({
      directory:FilesystemDirectory.Cache,
      path: `CACHED-IMG`
    }).then(()=>{
      console.log('** MKDIR OK **');
    });
  }

  isDeviceRooted(){
    if (typeof (IRoot) !== 'undefined' && IRoot) {
      IRoot.isRooted((data) => {
          if (data && data == 1) {
              console.log("This is routed device");
              alert(this.translate.instant('security.rooted'));
              this.appBlockedByRootedUser()
          } else {
              console.log("This is not routed device");
              //alert("This is not routed device");
          }
      }, (data) => {
              console.log("routed device detection failed case", data);
              alert(`routed device detection failed case, ${{data}}`);
          });
    }
  }

  async appBlockedByRootedUser() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      subHeader: this.translate.instant('security.alert_security'),
      message: this.translate.instant('security.rooted'),
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

  getPushData(notification){
    let push:any;
    if(notification?.extra){
      push = notification.extra;
      console.log("notification.extra:", push);
     }else if(notification?.data?.aps){
      push = notification.data.aps;
      console.log("notification.data.aps:", push);
      push.message = push.alert;
     }else{
      push = notification.data;
      console.log("notification.data:", push);
     }

     return push;
  }
  async showNotification(notification: any){

   // Notifications has different Payloads: iOS = data.aps, Android = data
   var push = this.getPushData(notification);

    await LocalNotifications.schedule({
      notifications:[
        {
          title: push?.title,
          body: push?.message,
          id: parseInt(push?.id),
          extra:{
            data:push
          },
          iconColor: push?.color ? push?.color : '#109DB0',
          actionTypeId: push?.actionType,

        }
      ]
    }).then((data)=>{
      console.log("showNotification:", data);
    });
  }

  private async initPushNotifications() {
    var chat_notification = this.translate.instant('notifications.chat');

    PushNotifications.requestPermissions().then((permission) => {
      // Register with Apple / Google to receive push via APNS/FCM
      if (permission.receive === 'granted')
        PushNotifications.register();
       else
        console.error('No permission for push granted')
    });

    PushNotifications.addListener(
      'registration',
      async (token: PushNotificationToken) => {

        console.log('My token: ' + JSON.stringify(token));

        let platform = 'ios';
        if (this.platform.is('android')) {
          platform = 'android';
        }

        this.authService.devicePlatform = platform;
        this.authService.deviceToken = token.value;
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Error: ' + JSON.stringify(error));
      alert(this.translate.instant('notifications.register_error'));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotification) => {
        this.badge.increase(1);
        console.log('[pushNotificationReceived] Push received:', notification);

        const voip = notification.data?.voip;

        if (voip == "true") {
          // Notifications has different Payloads: iOS = cancelPush, Android = isCancelPush
          let cancel = notification.data?.CancelPush ? notification.data.CancelPush : notification.data.isCancelPush;

          if(cancel == "false"){
            const caller = JSON.parse(notification.data.Caller);
            this.opentokService.agendaId$ = caller.callId;
            cordova.plugins.CordovaCall.receiveCall(caller.Username, caller.callId);
          }else
            console.log("End call push");

        }else{
          console.log("is notification: ", notification);
          this.showNotification(notification);

        }
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data?.aps ? notification.notification.data.aps : notification.notification.data;
        console.log('Action performed: ');
        console.log(notification);

        const action = data?.action;
        const id = data?.id;
        const msg = data?.message;

        this.isNotification = true;
        // Only VIDEOCALL does not verify lock-screen
        if(action == "VIDEOCALL"){
          this.redirecToVideocall(notification)
          return
        }else{
          let secondsLastPause =  (this.lastPause)? this.lastPause.getTime() : 0
          let secondsNow = (new Date).getTime()
          // App will lock after 2 minutes
          let secondsPassed = (secondsNow - secondsLastPause) / 1000;
          console.log(`PushNotificationActionPerformed secondsNow: ${secondsNow/1000}, secondsLastPause: ${secondsLastPause}`, );
          if(this.router.url.includes('landing')){
            this.dooleService.setPushNotification(data)
            this.router.navigate([`/landing`],{state:{pushNotification: data}});
          }else if (secondsPassed >= 120) {
            // Must implement lock-screen
            this.showFingerprintAuthDlg(data)
            //setTimeout(()=>this.showFingerprintAuthDlg(data), 500);
          }else
            this.redirectPushNotification(data, notification);
        }
      }
    );


    // LOCAL NOTIFICATIONS
    await LocalNotifications.requestPermissions().then((data)=>{
      console.log("LocalNotifications Registered");
    });

    this.translate.get(['notifications.chat','notifications.form','notifications.drug','notifications.videocall','notifications.open','notifications.close']).subscribe(async translations=> {

      await LocalNotifications.registerActionTypes({
        types:[{
          id:'MESSAGE',
          actions:[{
            id:'view',
            title: translations['notifications.chat']
          },{
            id:'remove',
            title: 'Dismiss',
            destructive: true
          },{
            id:'respond',
            title:'Respond',
            input: true
          }],
        },{
          id:'FORM',
          actions:[{
            id:'view',
            title: translations['notifications.form']
          },{
            id:'remove',
            title: translations['notifications.close'],
            destructive: true
          }],
        },{
          id:'DRUGINTAKE',
          actions:[{
            id:'view',
            title: translations['notifications.drug']
          },{
            id:'remove',
            title: 'Dismiss',
            destructive: true
          }],
        },{
          id:'VIDEOCALL',
          actions:[{
            id:'view',
            title:translations['notifications.videocall'],
            foreground:true,
          },{
            id:'remove',
            title:translations['notifications.close'],
            destructive: true
          }],
        }
      ]});
    });


    LocalNotifications.addListener('localNotificationReceived',( notification: LocalNotification)=>{
      console.log('localNotificationReceived received:', notification);


    })

    LocalNotifications.addListener('localNotificationActionPerformed',( notification: LocalNotificationActionPerformed)=>{

      console.log('localNotificationActionPerformed: ');
      let f = notification.notification.extra;
      console.log(f);
      const action = f.data?.action;
      const id = f.data?.id;
      const msg = f.data?.message;
      console.log('ACTION: ', action);

      if( action == "VIDEOCALL"){
        this.redirecToVideocall(notification)
        return
      }
      else if(this.router.url.includes('landing')){
        this.dooleService.setPushNotification(f.data)
        this.router.navigate([`/landing`],{state:{pushNotification: f.data}});
      }
      else if(this.authService?.user?.idUser){
        console.log('localNotificationActionPerformed idUser: ', this.authService?.user?.idUser)
        this.redirectPushNotification(f.data, notification)
      }
      else{
        this.redirecToVideocall(notification)
        return
      }

    })
  }

  redirectPushNotification(data, notification?){

    switch (data.action) {
      case "MESSAGE":
        let staff;
        // Different payloads for ios and android
        if(this.platform.is('ios')){
          staff = data?.origin;
        }else{
          let origin = data?.origin;
          if(origin){
            origin = origin.replace(/\\/g, '');
            staff = JSON.parse(origin);
          }
        }
        console.log('staff: ', staff);
        this._zone.run(()=>{
          this.router.navigate([`/contact/chat/conversation`],{state:{data:data, chat:data.id, staff:staff}});
        });
        break;
      case "FORM":
        this._zone.run(()=>{
          this.router.navigate([`/tracking/form`, {id: data.id}],{state:{data:data}});
        });
        break;
      case "DRUGINTAKE":
        this._zone.run(()=>{
          this.router.navigate([`/journal`],{state:{data:data, segment: 'medication'}});
        });
        break;
      case "VIDEOCALL":
        this._zone.run(()=>{
          this.redirecToVideocall(notification)
        });
        break;
      case "ADVICE":
        this._zone.run(()=>{
          this.router.navigate([`/home`],{state:{push:data, id:data.id}});
        });
        break;
      case "DIET":
        this._zone.run(()=>{
          this.router.navigate([`/journal/diets-detail`],{state:{data:data, id:data.id}});
        });
        break;
      case "AGENDA":
        this._zone.run(()=>{
          this.router.navigate([`/agenda/detail`],{state:{data:data, id:data.id}});
        });
        break;
      case "REMINDER":
        this._zone.run(()=>{
          this.router.navigate([`/agenda/reminder`],{state:{data:data, id:data.id}});
        });
        break;
      case "GAME":
        case "REMINDER":
          this._zone.run(()=>{
            this.router.navigate([`/journal/games-detail`],{state:{data:data, id:data.id}});
          });
        break;
      default:
        this.redirecToVideocall(notification)
        break;
    }
  }

  redirecToVideocall(notification){

    let caller;

    if(notification?.data?.Caller){
      caller = JSON.parse(notification.data.Caller);
    }else if(notification?.notification?.data?.Caller)
      caller = JSON.parse(notification.notification.data.Caller);
    else {
      console.error('caller not found on notificaiton payload')
    }
    this.opentokService.agendaId$ = caller?.callId;

    console.log('caller',  caller);

    this.startVideocallAndroid(caller.callId)
  }

  async getTokboxSessionAndroid(agenda, caller?) {

    return this.dooleService.getAPIvideocall(agenda).subscribe(
      async (data) => {
        await data;
        if(data.result){
          let tokboxSession = data;
          this.opentokService.token$ = tokboxSession.token;
          this.opentokService.sessionId$ = tokboxSession.sessionId;
          this.opentokService.apiKey$ = tokboxSession.tokboxAPI;

            // iOS fires call automatically on devices when receives voIP push
            const modal = await this.modalCtrl.create({
              component: VideoComponent,
              componentProps: {},
            });

            await modal.present();
            cordova.plugins.CordovaCall.endCall();

        }else{
          let message = this.translate.instant('agenda.error_alert_message_get_token')
          throw message;
        }

      },
      (error) => {
        // Called when error
        alert( 'ERROR(' + error.code + '): ' + error.message)
        console.log("error: ", error);
        throw error;
      });

  }

  async getTokboxSessionIOS(agenda, caller?) {

    return this.dooleService.getAPIvideocall(agenda).subscribe(
      async (data) => {
        await data;
        if(data.result){
          let tokboxSession = data;
          this.opentokService.token$ = tokboxSession.token;
          this.opentokService.sessionId$ = tokboxSession.sessionId;
          this.opentokService.apiKey$ = tokboxSession.tokboxAPI;

          // iOS fires call automatically on devices when receives voIP push
          const modal = await this.modalCtrl.create({
            component: VideoComponent,
            componentProps: {},
          });

          await modal.present();
          cordova.plugins.CordovaCall.endCall();


        }else{
          let message = this.translate.instant('agenda.error_alert_message_get_token')
          throw message;
        }

      },
      (error) => {
        // Called when error
        alert( 'ERROR(' + error.code + '): ' + error.message)
        console.log("error: ", error);
        throw error;
      });

  }

  async openVideocallIframeModal(agenda){

    const modal = await this.modalCtrl.create({
      component: VideocallIframePage,
      componentProps: {"id": agenda}
    });

    await modal.present();

  }

  async initVoIpPushNotifications() {

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

      await notification;
      console.log("[Ionic] voip notification callback called");
      console.log(notification);

      const extra = JSON.parse(notification.extra);
      console.log("extra: ", extra);

      if(extra){
        let cancel = extra.Caller.CancelPush;
        if(cancel == "false"){
          self.opentokService.agendaId$ = extra.Caller.ConnectionId;
        }else
          console.log("Hang up notification");
      }else{
        console.error("Caller not found in voip notification");
      }

    });

    pushvoip.on('error', function (e) {
      console.error("[Ionic] VoIPPushNotification error");
      alert(this.translate.instant('notifications.voip_register_error'))
    });
  }

  async getAgenda(){

    return this.dooleService.postAPIPendingConnect().subscribe(async (data)=>{
      await data;
      console.log('[AppComponent] getAgendaId()', data)
      if(data.success && data.agenda){
        this.opentokService.agendaId$ = data.agenda;
        this.startVideocall(data.agenda);
      }else{
        let message = this.translate.instant('agenda.error_alert_message_get_agenda')
        throw message;
      }
    })
  }

  async startVideocall(agenda){
    if(this.platform.is('ios'))
      await this.startVideocallIos(agenda);
        else
          await this.startVideocallAndroid(agenda).then(()=>{
            cordova.plugins.CordovaCall.endCall();
          });
  }
  async startVideocallIos(agenda) {
    console.log("startVideocall")
    return this.dooleService.getAPIvideocall(agenda).subscribe(
      async (data) => {
        await data;
        if(data.result){
          let tokboxSession = data;
          this.opentokService.token$ = tokboxSession.token;
          this.opentokService.sessionId$ = tokboxSession.sessionId;
          this.opentokService.apiKey$ = tokboxSession.tokboxAPI;
          const modal = await this.modalCtrl.create({
            component: VideoComponent,
            componentProps: {},
          });

          await modal.present();
          cordova.plugins.CordovaCall.endCall();
          return data;

        }else{
          let message = this.translate.instant('agenda.error_alert_message_get_token')
          throw message;
        }

      },
      (error) => {
        // Called when error
        alert( 'ERROR(' + error.code + '): ' + error.message)
        console.log("error: ", error);
        throw error;
      });
  }

  async startVideocallAndroid(agenda) {

    console.log("startVideocallAndroid")
    this.dooleService.getAPIvideocall(agenda).subscribe(
      async (data) => {
        await data;
        if(data.result){
          let tokboxSession = data;
          this.opentokService.token$ = tokboxSession.token;
          this.opentokService.sessionId$ = tokboxSession.sessionId;
          this.opentokService.apiKey$ = tokboxSession.tokboxAPI;
          const modal = await this.modalCtrl.create({
            component: VideoComponent,
            componentProps: {},
          });

          await modal.present();
          return data;

        }else{
          let message = this.translate.instant('agenda.error_alert_message_get_token')
          throw message;
        }

      },
      (error) => {
        // Called when error
        alert( 'ERROR(' + error.code + '): ' + error.message)
        console.log("error: ", error);
        throw error;
      });
  }


  phonecallHandlers(){

    var self = this;

    cordova.plugins.CordovaCall.setVideo(true);
    //accept de videocall
    cordova.plugins.CordovaCall.on('answer',async function(data) {
      console.log(data);
      self.lastResume = new Date;

      // Grab last agenda id from BO
      if(!self.opentokService.agendaId$)
        self.getAgenda();
      else
        self.startVideocall(self.opentokService.agendaId$)

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
      this.lastPause = new Date;
    });

    this.platform.resume.subscribe(async (e) => {

      if (!this.router.url.includes('landing') && !this.router.url.includes('login')) {
        // App will lock after 2 minutes
        let secondsPassed = ((new Date).getTime() - this.lastResume.getTime()) / 1000;
        if (secondsPassed >= 120 && !this.isNotification) {
          // Must implement lock-screen
         this.showFingerprintAuthDlg()
        }
      }
      this.isNotification = false
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
    let lang = this.translate.getBrowserLang();
    console.log("BROWSER LANG: ", lang );
    if(lang !== 'ca' && lang !== 'es' && lang !== 'en')
      lang = 'es'

    this.translate.setDefaultLang(lang);
    console.log("APP LANG: ", lang );
    //this.translate.getBrowserLang()
    // the lang to use, if the lang isn't available, it will use the current loader to get them

    //let userLanguage = localStorage.getItem('language') ? localStorage.getItem('language') : this.languageService.getCurrent();
    this.languageService.changeLanguage(lang);


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

  initMap(res){
    console.log(res);
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


  public async showFingerprintAuthDlg(data?) {
    console.log("[AppComponent] showFingerprintAuthDlg(), data", data);
    if(!JSON.parse(localStorage.getItem(this.settingsBio)) ||
        this.lastPause == undefined || !this.authService?.user ){

      if(data){
        console.log("[AppComponent] showFingerprintAuthDlg(), data", data);
        this.dooleService.setPushNotification(data)
        this.router.navigate([`/landing`],{state:{pushNotification: data}});
      }
      else
        this.router.navigateByUrl('/landing');
      return
    }

    this.faio.isAvailable().then((result: any) => {

      this.faio.show({
        cancelButtonTitle: this.translate.instant('button.cancel'),
        description: this.translate.instant('face-id.description'),
        title: this.translate.instant('face-id.title'),
        fallbackButtonTitle: this.translate.instant('face-id.fallback'),
        subtitle: this.translate.instant('face-id.subtitle'),
        disableBackup: true,

      })
        .then(async (result: any) => {
          console.log("[AppComponent] showFingerprintAuthDlg(), data",result)
          if(result){
            this.lastResume = new Date;
            this.authService.removeNumloginFailed()
            if(data){
              setTimeout(()=>this.redirectPushNotification(data), 500);
            }
          }else{
            //setTimeout(()=>this.showFingerprintAuthDlg(), 500);
            this.router.navigateByUrl('/landing');
          }

        })
        .catch(async (error: any) => {
          console.log(error);
          if(error.code == -102){
          // let num = this.authService.getNumloginFailed()
          // if(num >=3){
          //   await this.authService.logout();
          //   this.router.navigateByUrl('/landing');
          // }
          // else
          // Must implement lock-screen
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

  backButton(){
    this.platform.backButton.subscribeWithPriority(10,() => {
      // this does work
      if (this.router.url.includes('home')){
        //Exit from app
        this.showExitConfirm()
      }else if (this.router.url.includes('landing')){
        //Exit from app
        navigator['app'].exitApp();
      }
    });
  }

  showExitConfirm() {
    this.alertController.create({
      header: 'Doole App',
      message: this.translate.instant('home.close_app'),
      backdropDismiss: false,
      buttons: [{
        text: this.translate.instant('button.cancel'),
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: this.translate.instant('button.accept'),
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }

}
function callback(Username: any, arg1: number, callback: any) {
  console.log('on receive callback');
  return;
}

function errorCallback(Username: any, arg1: number, callback: (Username: any, arg1: number, callback: any) => void, errorCallback: any) {
  console.error('on error receive callback');
}

