import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalNotification, LocalNotificationActionPerformed, Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken } from '@capacitor/core';
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
import { VideocallTestPage } from './pages/profile/videocall-test/videocall-test.page';
import { VideocallIframePage } from './pages/agenda/videocall-iframe/videocall-iframe.page';


const { PushNotifications, LocalNotifications } = Plugins;
declare let VoIPPushNotification: any;
declare let cordova: any;

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
  isNotification: any;
  lastPause: Date;
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
    //private backgroundMode: BackgroundMode,
    private dooleService: DooleService,
    private faio : FingerprintAIO

  ) {


  }

  async ngOnInit() {
    this.setLanguage();
    this.translate.onLangChange.subscribe(() => this.getTranslations());
    this.storageService.isFirstTimeLoad();
    FirebaseAnalytics.initializeFirebase(environment.firebase);
    this.platform.ready().then(() => {

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
      }

    });
  }

  async showNotification(notification: any){

   var title, body,id,color,actionType;
   var push;
   // Notifications has different Payloads: iOS = data.aps, Android = data
   if(notification?.extra){
    push = notification.extra;
    console.log("notification.extra:", push);
   }else if(notification.data?.aps){
    push = notification.data.aps;
    console.log("notification.data.aps:", push);
   }else{
    push = notification.data;
    console.log("notification.data:", push);
   }

   title = push?.title;
   body = push?.message;
   id = push?.id;
   color = push?.color ? push?.color : '#109DB0';
   actionType = push?.action;


    console.log("ActionType:", actionType);
    await LocalNotifications.schedule({
      notifications:[
        {
          title: title,
          body: body,
          id: parseInt(id),
          extra:{
            data:push
          },
          iconColor: color,
          actionTypeId: actionType,
        }
      ]
    }).then((data)=>{
      console.log("showNotification:", data);
    });
  }

  private async initPushNotifications() {

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
        console.log('[pushNotificationReceived] Push received:');
        console.log(notification);

        const voip = notification.data?.voip;

        if (voip == "true") {
          // Notifications has different Payloads: iOS = cancelPush, Android = isCancelPush
          let cancel = notification.data?.CancelPush ? notification.data.CancelPush : notification.data.isCancelPush;
          console.log("cancel push:", cancel);
          if(cancel == "true"){
            return;
          }else{
           this.redirecToVideocall(notification)
          }

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
        }
      
        let secondsLastPause =  (this.lastPause)? this.lastPause.getTime() : 0
        let secondsNow = (new Date).getTime()
        // App will lock after 2 minutes
        let secondsPassed = (secondsNow - secondsLastPause) / 1000;
        console.log(`PushNotificationActionPerformed secondsNow: ${secondsNow/1000}, secondsLastPause: ${secondsLastPause}`, );
        if (secondsPassed >= 120) {
          // Must implement lock-screen
          this.showFingerprintAuthDlg(data)
          //setTimeout(()=>this.showFingerprintAuthDlg(data), 500);
        }else
        this.redirecPushNotification(data, notification)
      }
    );


    // LOCAL NOTIFICATIONS
    await LocalNotifications.requestPermission().then((data)=>{
      console.log("LocalNotifications Registered", data);
    });
    await LocalNotifications.registerActionTypes({
      types:[{
        id:'MESSAGE',
        actions:[{
          id:'view',
          title: this.translate.instant('notifications.chat'),
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
          title: this.translate.instant('notifications.form')
        },{
          id:'remove',
          title: this.translate.instant('notifications.close'),
          destructive: true
        }],
      },{
        id:'DRUGINTAKE',
        actions:[{
          id:'view',
          title:this.translate.instant('notifications.drug'),
        },{
          id:'remove',
          title: 'Dismiss',
          destructive: true
        }],
      },
      ,{
        id:'VIDEOCALL',
        actions:[{
          id:'view',
          title: this.translate.instant('notifications.videocall'),
        },{
          id:'remove',
          title: this.translate.instant('notifications.close'),
          destructive: true
        }],
      }
    ]});

    LocalNotifications.addListener('localNotificationReceived',( notification: LocalNotification)=>{
      console.log('localNotificationReceived received:', notification);


    })
    LocalNotifications.addListener('localNotificationActionPerformed',( notification: LocalNotificationActionPerformed)=>{

      let f = notification.notification.extra;
      console.log('localNotificationActionPerformed: ');
      console.log(f);
      const action = f.data?.action;
      const id = f.data?.id;
      const msg = f.data?.message;
      console.log('ACTION: ', action);
      console.log("localNotificationActionPerformed", JSON.stringify(f.data));

      if(this.router.url.includes('landing')){
        this.dooleService.setPushNotification(f.data)
        this.router.navigate([`/landing`],{state:{pushNotification: f.data}});
      }
      else if(this.authService?.user?.idUser || action == "VIDEOCALL"){
        console.log('localNotificationActionPerformed idUser: ', this.authService?.user?.idUser)
        this.redirecPushNotification(f.data, notification)
      }
      else{
        this.dooleService.setPushNotification(f.data)
        this.router.navigate([`/landing`],{state:{pushNotification: f.data}});
      }

    })


  }

  redirecPushNotification(data, notification?){
    switch (data.action) {
      case "MESSAGE":
        let origin = (data?.origin).replace(/\\/g, '');
        let staff = JSON.parse(origin);
        console.log('redirecPushNotification() ', data);
        this.router.navigate([`/contact/chat/conversation`],{state:{data:data, chat:data.id, staff:staff}});
        break;
      case "FORM":
        this.router.navigate([`/tracking/form`, {id: data.id}],{state:{data:data}});
        break;
      case "DRUGINTAKE":
        this.router.navigate([`/journal`],{state:{data:data, segment: 'medication'}});
        break;
      case "VIDEOCALL":
        this.redirecToVideocall(notification)
        break;
      case "ADVICE":
        this.router.navigate([`/advices-detail`],{state:{data:data, id:data.id}});
        break;
      case "DIET":
        this.router.navigate([`/journal/diets-detail`],{state:{data:data, id:data.id}});
        break;
      case "AGENDA":
        this.router.navigate([`/agenda/detail`],{state:{data:data, id:data.id}});
        break;
      case "REMINDER":
        this.router.navigate([`/agenda/reminder`],{state:{data:data, id:data.id}});
        break;
      case "GAME":
        this.router.navigate([`/journal/games-detail`],{state:{data:data, id:data.id}});
        break;
      default:
        console.error('Action on localNotificationActionPerformed not found')
        break;
    }
  }

  redirecToVideocall(notification){

    const caller = JSON.parse(notification?.data.Caller);
  
    console.error('redirecToVideocall() notification?.extra.Caller', caller)
    this.opentokService.agendaId$ = caller.ConnectionId
  
    this.getTokboxSession(caller).then(()=>{
    cordova.plugins.CordovaCall.receiveCall(caller.Username, caller.ConnectionId);
   });

  }

  async getTokboxSession(caller) {

    console.log("getTokboxSession AGENDA: ", this.opentokService.agendaId$);
    return this.dooleService.getAPIvideocall(this.opentokService.agendaId$).subscribe(
      async (data) => {
        await data;
        if(data.result){
          let tokboxSession = data;
          this.opentokService.token$ = tokboxSession.token;
          this.opentokService.sessionId$ = tokboxSession.sessionId;
          this.opentokService.apiKey$ = tokboxSession.tokboxAPI;
          console.log("this.tokboxSession: ", tokboxSession);
          return tokboxSession;
        }else{
          let message = this.translate.instant('agenda.error_alert_message_get_token')
          alert(message)
        }

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
    cordova.plugins.CordovaCall.endCall();
    await modal.present();

  }

  async openVideocallIframeModal(){

    const modal = await this.modalCtrl.create({
      component: VideocallIframePage,
      componentProps: {"id": this.opentokService.agendaId$}
    });
    
    return await modal.present();

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
        console.log("is CancelPush:", cancel);
        console.log(cancel);
        if(cancel == "true"){
          console.log("HANG UP");
          return;
        }else{
          console.log("caller: ", extra.Caller);
          console.log("caller.ConnectionId", extra.Caller.ConnectionId);
          
          self.opentokService.agendaId$ = extra.Caller.ConnectionId;
          
          self.getTokboxSession(extra.Caller.ConnectionId).then(()=>{
            cordova.plugins.CordovaCall.receiveCall(extra.Caller.Username, extra.Caller.ConnectionId);
           });
        }
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
        this.getTokboxSession(this.opentokService.agendaId$).then(()=>{
        this.startVideoCall();
      })
      }else{
        let message = this.translate.instant('agenda.error_alert_message_get_agenda')
        throw message;
      }
    })
  }
  
  startVideoCall(){
    // VOIP calls for IOS
    if (this.platform.is('ios'))
      this.openVideocallIframeModal().then(()=>{
        cordova.plugins.CordovaCall.endCall();
      });
  else
    this.openVideocallModal().then(()=>{
      cordova.plugins.CordovaCall.endCall();
    });
  }


  phonecallHandlers(){

    var self = this;

    cordova.plugins.CordovaCall.setVideo(true);
    //accept de videocall
    cordova.plugins.CordovaCall.on('answer', async function(data) {
      console.log(data);
      self.lastResume = new Date;
     
      if(!self.opentokService.agendaId$)
        self.getAgenda();
      else
        self.startVideoCall();

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
    if(lang !== 'ca' && lang !== 'es')
      lang = 'es'


    this.translate.setDefaultLang(lang);
    console.log("BROWSER LANG: ", lang );
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
    if(!JSON.parse(localStorage.getItem('settings-bio')) || 
        JSON.parse(localStorage.getItem('settings-bio')) == null || 
        JSON.parse(localStorage.getItem('settings-bio')) == undefined || 
        this.lastPause == undefined || !this.authService.user ){

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
        .then((result: any) => {
          console.log(result)
          this.lastResume = new Date;

          if(data){
            setTimeout(()=>this.redirecPushNotification(data), 500);
          }

        })
        .catch(async (error: any) => {
          console.log(error);
          if(error.code == -102){
            //setTimeout(()=>this.showFingerprintAuthDlg(), 500);
            let secondsPassed = ((new Date).getTime() - this.lastResume?.getTime()) / 1000;
            if (secondsPassed >= 120) {
              // Must implement lock-screen
              setTimeout(()=>this.showFingerprintAuthDlg(), 500);
            }
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
