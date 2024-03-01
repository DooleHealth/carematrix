import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Filesystem, Directory as FilesystemDirectory } from '@capacitor/filesystem';
//import { PushNotificationSchema, ActionPerformed, Token, PushNotifications } from '@capacitor/push-notifications'
import { ActionPerformed, Token, PushNotifications, PushNotificationSchema } from '../plugins/PushNotifications'
import { LocalNotificationSchema, ActionPerformed as LocalNotificationActionPerformed, LocalNotifications } from '@capacitor/local-notifications';

import { AlertController, MenuController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { Badge } from '@awesome-cordova-plugins/badge/ngx';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseAuthService } from './services/firebase/auth/firebase-auth.service';
import { LanguageService } from './services/language.service';
import { HistoryHelperService } from './utils/history-helper.service';
import { AuthenticationService } from './services/authentication.service';
import { StorageService } from './services/storage.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { throwError } from 'rxjs';
import { VideoComponent } from './components/video/video.component';
import { OpentokService } from './services/opentok.service';
import { DooleService } from './services/doole.service';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { VideocallIframePage } from './pages/agenda/videocall-iframe/videocall-iframe.page';
import { ApiEndpointsService } from './services/api-endpoints.service';
import { VideocallPage } from './pages/agenda/videocall/videocall.page';

import { ContentTypePath } from './models/shared-care-plan';

import { register } from 'swiper/element/bundle';
import { Capacitor } from '@capacitor/core';

import { CallCapacitor } from 'src/plugins/CallCapacitor';
import { TextZoom } from '@capacitor/text-zoom';

import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx'

register();

declare let VoIPPushNotification: any;
declare let cordova: any;
declare let IRoot: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  NUM_MINUTES_GO_LOGIN = 900;
  NUM_MINUTES_SHOW_BIOMETRIC = 300
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
  translationsForNotifications: any;
  environment = 0
  isModalOpen = false;
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
    private faio: FingerprintAIO,
    private _zone: NgZone,
    private endPoind: ApiEndpointsService,
    private navCtrl: NavController,
    private screenOrientation: ScreenOrientation

  ) {
    this.setLanguage();
    if (Capacitor.isNativePlatform() && this.platform.is('android')) {
      TextZoom.set({ value: 1 });
    }
  }

  async ngOnInit() {

    this.translate.onLangChange.subscribe(() => this.getTranslations());
    this.storageService.isFirstTimeLoad();
    this.endPoind.loadEndPoints()
    this.environment = Number(JSON.parse(localStorage.getItem('endpoint')));
    this.settingsBio = 'settings-bio' + this.environment


    this.platform.ready().then(() => {

      // Secutity - Rooted
      this.isDeviceRooted()

      if (Capacitor.isNativePlatform()) {
        // Push
        this.initPushNotifications();

        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).catch((err) => { console.log('Setting screen orientation failed:', err); });


        // VOIP calls for IOS
        if (this.platform.is('ios')) {
          this.initVoIpPushNotifications();
        } else {
          this.receiveVoIPEvents();
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


  async createCacheFolder() {
    await Filesystem.mkdir({
      directory: FilesystemDirectory.Cache,
      path: `CACHED-IMG`
    }).then(() => {
      console.log('** MKDIR OK **');
    });
  }

  receiveVoIPEvents() {
    //console.log('[AppComponent] receiveVoIPEvents()')
    CallCapacitor.addListener('accept-call', data => {
      this.opentokService.agendaId$ = data.callId;
      console.log('accept-call', data);
      // This should be probably called in the VideoActivity, but is beyond this task point
      CallCapacitor.updateCallState({ callId: data.callId, state: "started" });
      this._zone.run(() => {
        this.startVideocallIframe(data.callId)
      });
    });
    CallCapacitor.addListener('end-call', data => {
      console.log('end-call');
      // TODO: Send termination to API
      CallCapacitor.updateCallState({ callId: data.callId, state: "ended" });
    })
  }

  isDeviceRooted() {
    if (typeof (IRoot) !== 'undefined' && IRoot) {
      IRoot.isRooted((data) => {
        if (data && data == 1) {
          console.log("This is routed device");
          //alert(this.translate.instant('security.rooted'));
          this._zone.run(() => {
            setTimeout(() => this.appBlockedByRootedUser(), 500);
          });
        } else {
          console.log("This is not routed device");
          //alert("This is not routed device");
        }
      }, (data) => {
        console.log("routed device detection failed case", data);
        //alert(`routed device detection failed case, ${{ data }}`);
      });
    }
  }

  async appBlockedByRootedUser() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-rooted-class',
      //subHeader: this.translate.instant('security.alert_security'),
      message: this.translate.instant('security.ens_message'),
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

  getPushData(notification) {
    let push: any;
    if (notification?.extra) {
      push = notification.extra;
      console.log("notification.extra:", push);
    } else if (notification?.data?.aps) {
      push = notification.data.aps;
      console.log("notification.data.aps:", push);
      push.message = push.alert;
    } else {
      push = notification.data;
      console.log("notification.data:", push);
    }

    return push;
  }
  async showNotification(notification: any) {

    // Notifications has different Payloads: iOS = data.aps, Android = data
    var push = this.getPushData(notification);

    await LocalNotifications.schedule({
      notifications: [
        {
          title: push?.title,
          body: push?.message,
          id: parseInt(push?.id),
          extra: {
            data: push
          },
          iconColor: push?.color ? push?.color : '#109DB0',
          actionTypeId: push?.actionType,

        }
      ]
    }).then((data) => {
      console.log("showNotification:", data);
    });
  }

  public async initPushNotifications() {

    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(async () => {
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        await PushNotifications.register();
      }

      else if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }

      //await PushNotifications.register();
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        console.log('Push registration success, token: ' + token.value);

        let platform = 'ios';
        if (this.platform.is('android')) {
          platform = 'android';
        }

        this.authService.devicePlatform = platform;
        this.authService.deviceToken = token.value;
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error));

      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('push token - Push notification received: ', 'Push received: ' + JSON.stringify(notification));


        this.getNumNotification();

        this.badge.get().then(res => (
          notification.badge = res

        ));

        console.log('push token - [pushNotificationReceived] Push received:', notification);

        const voip = notification?.data?.voip;

        if (voip == "true") {
          // Notifications has different Payloads: iOS = cancelPush, Android = isCancelPush
          let cancel = notification.data?.CancelPush ? notification.data.CancelPush : notification.data?.isCancelPush;

          if (!cancel || cancel == "false") {
            const caller = JSON.parse(notification.data.Caller);
            this.opentokService.agendaId$ = caller.callId;

            if (this.platform.is('ios')) {
              cordova.plugins.CordovaCall.receiveCall(caller.Username, caller.callId);
            } else {

            }
          } else
            console.log("End call push");

        } else {
          console.log("is notification: ", notification);
          //this.showNotification(notification);

        }
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
        const data = notification?.notification?.data?.aps ? notification.notification.data.aps : notification.notification.data;

        const action = data?.action;
        const id = data?.id;
        const msg = data?.message;

        this.isNotification = true;
        // Only VIDEOCALL does not verify lock-screen
        if (action == "VIDEOCALL") {
          this._zone.run(() => {
            // this.redirecToVideocall(notification)
            this.startVideocallIframe(data?.id)
          });
          return
        }

        let secondsLastPause = (this.lastPause) ? this.lastPause.getTime() : 0
        let secondsNow = (new Date)?.getTime()
        // App will lock after 2 minutes
        let secondsPassed = (secondsNow - secondsLastPause) / 1000;
        console.log(`push token - PushNotificationActionPerformed secondsNow: ${secondsNow / 1000}, secondsLastPause: ${secondsLastPause}`,);
        if (this.router.url.includes('landing')) {
          this.dooleService.setPushNotification(data)
          this.router.navigate([`/landing`], { state: { pushNotification: data } });
        } else if (secondsPassed >= 120) {
          // Must implement lock-screen
          this.showFingerprintAuthDlg(data)
          //setTimeout(()=>this.showFingerprintAuthDlg(data), 500);
        } else
          this.redirecPushNotification(data, notification);
      }
    );

    // LOCAL NOTIFICATIONS
    await LocalNotifications.requestPermissions().then((data) => {
      console.log("LocalNotifications Registered");
    });

    this.translate.get(['notifications.chat', 'notifications.form', 'notifications.drug', 'notifications.videocall', 'notifications.open', 'notifications.close']).subscribe(async translations => {
      console.log('translations', translations['notifications.videocall']);
      await LocalNotifications.registerActionTypes({
        types: [{
          id: 'MESSAGE',
          actions: [{
            id: 'view',
            title: translations['notifications.chat']
          }, {
            id: 'remove',
            title: 'Dismiss',
            destructive: true
          }, {
            id: 'respond',
            title: 'Respond',
            input: true
          }],
        }, {
          id: 'FORM',
          actions: [{
            id: 'view',
            title: translations['notifications.form']
          }, {
            id: 'remove',
            title: translations['notifications.close'],
            destructive: true
          }],
        }, {
          id: 'DRUGINTAKE',
          actions: [{
            id: 'view',
            title: translations['notifications.drug']
          }, {
            id: 'remove',
            title: 'Dismiss',
            destructive: true
          }],
        }, {
          id: 'VIDEOCALL',
          actions: [{
            id: 'view',
            title: translations['notifications.videocall'],
            foreground: true,
          }, {
            id: 'remove',
            title: translations['notifications.close'],
            destructive: true
          }],
        }
        ]
      });
    });


    LocalNotifications.addListener('localNotificationReceived', (notification: LocalNotificationSchema) => {
      console.log('localNotificationReceived received:', notification);
    })

    LocalNotifications.addListener('localNotificationActionPerformed', (notification: LocalNotificationActionPerformed) => {

      console.log('localNotificationActionPerformed: ');
      let f = notification.notification.extra;
      console.log(f);
      const action = f.data?.action;
      const id = f.data?.id;
      const msg = f.data?.message;
      console.log('ACTION: ', action);

      if (action == "VIDEOCALL") {
        this.redirecToVideocall(notification)
        return
      }
      else if (this.router.url.includes('landing')) {
        this.dooleService.setPushNotification(f.data)
        this.router.navigate([`/landing`], { state: { pushNotification: f.data } });
      }
      else if (this.authService?.user?.idUser) {
        console.log('localNotificationActionPerformed idUser: ', this.authService?.user?.idUser)
        this.redirecPushNotification(f.data, notification)
      }
      else {
        this.redirecToVideocall(notification)
        return
      }

    })
  }

  redirecPushNotification(data, notification?) {

    console.log("DATA " + data)
    console.log("Notification " + notification)

    switch (data.action) {

      case "SHARECAREPLAN":
        this._zone.run(() => {
          this.router.navigate([`/home`], { state: { data: data, openNotificationAlertDialog: true } });
        });

        break;

      case "LEVELASSIGNED":
        this._zone.run(() => {
          this.router.navigate([`/home`], { state: { data: data, openNotificationAlertDialog: true } });
        });
        break;

      case "MESSAGE":
        let staff;
        // Different payloads for ios and android
        if (this.platform.is('ios'))
          staff = data?.origin;
        else
          staff = data?.origin ? JSON.parse(data?.origin) : null;
        console.log('staff: ', staff);
        this._zone.run(() => {
          this.router.navigate([`/contact/chat/conversation`], { state: { data: data, chat: data.id, staff: staff, customData: data?.user_id } });
        });
        break;
      case "FORM":
        this._zone.run(() => {
          this.router.navigate([ContentTypePath.Forms, { id: data.id }], { state: { data: data } });
        });
        break;
      case "DRUGINTAKE":
        this._zone.run(() => {
          this.router.navigate([ContentTypePath.Medication], { state: { data: data, segment: 'medication' } });
        });
        break;
      case "VIDEOCALL":
        this._zone.run(() => {
          this.redirecToVideocall(notification)
        });
        break;
      case "ADVICE":
        this._zone.run(() => {
          this.router.navigate([ContentTypePath.AdvicesDetail], { state: { data: data, id: data.id } });
        });
        break;
      case "NEWS":
        this._zone.run(() => {
          this.router.navigate([ContentTypePath.NewsDetail], { state: { data: data, id: data.id } });
        });
        break;
      case "DIET":
        this._zone.run(() => {
          this.router.navigate([ContentTypePath.DietsDetail], { state: { data: data, id: data.id } });
        });
        break;
      case "AGENDA":
        this._zone.run(() => {
          this.router.navigate([`/agenda/detail`], { state: { data: data, id: data.id } });
        });
        break;
      case "REMINDER":
        this._zone.run(() => {
          this.router.navigate([`/agenda/reminder`], { state: { data: data, id: data.id } });
        });
        break;
      case "GAME":
        this._zone.run(() => {
          if (data.type == 'form') {
            this.router.navigate([ContentTypePath.FormDetail, { id: data.form_id }], { state: { data: data, game_play_id: data?.game_play_id } });
          } else
            this.router.navigate([ContentTypePath.GamesDetail], { state: { data: data, id: data.id, server_url: data?.server_url } });
        });
        break;
      case "EXERCISE":
        this._zone.run(() => {
          this.router.navigate([ContentTypePath.ExercisesDetail], { state: { data: data, id: data.id, programable_id: data.programable_play_id } });
        });
        break;
      default:
        console.error('Action on localNotificationActionPerformed not found, redirecting to videocall: ')
        this.redirecToVideocall(notification)
        break;
    }
  }

  getNumNotification() {
    this.dooleService.getAPINotificationsCount().subscribe((res) => {
      if (res?.success) {
        let numNotification = res?.notifications
        // if(!numNotification || numNotification === 0 )this.badge.clear()
        // else
        this.badge
          .requestPermission()
          .then((result: any) => {
            console.log('Permission granted:', result);
            this.badge.set(numNotification);
            // Handle success
          })
          .catch((error: any) => {
            console.error('Permission denied:', error);
            // Handle error
          });
      }
    })
  }

  redirecToVideocall(notification) {

    // const data = notification.notification.data?.aps ? notification.notification.data.aps : notification.notification.data;

    // this.startVideocallIframe(data?.id)

    let caller;

    if (notification?.data?.Caller) {
      caller = JSON.parse(notification.data.Caller);
    } else if (notification?.notification?.data?.Caller)
      caller = JSON.parse(notification.notification.data.Caller);
    else {
      console.error('caller not found on notificaiton payload')
    }
    this.opentokService.agendaId$ = caller?.callId;

    console.log('caller', caller);
    this._zone.run(() => {
      this.startVideocallIframe(caller.callId)
    });
  }

  async getTokboxSessionAndroid(agenda, caller?) {

    return this.dooleService.getAPIvideocall(agenda).subscribe(
      async (data) => {
        await data;
        if (data.result) {
          let tokboxSession = data;
          this.opentokService.token$ = tokboxSession.token;
          this.opentokService.sessionId$ = tokboxSession.sessionId;
          this.opentokService.apiKey$ = tokboxSession.tokboxAPI;

          // iOS fires call automatically on devices when receives voIP push
          const modal = await this.modalCtrl.create({
            component: VideoComponent,
            componentProps: {},
            cssClass: "modal-custom-class"
          });

          await modal.present();
          cordova.plugins.CordovaCall.endCall();

        } else {
          let message = this.translate.instant('agenda.error_alert_message_get_token')
          throw message;
        }

      },
      (error) => {
        // Called when error
        alert('ERROR(' + error.code + '): ' + error.message)
        console.error("error: ", error);
        throw error;
      });

  }

  async getTokboxSessionIOS(agenda, caller?) {

    return this.dooleService.getAPIvideocall(agenda).subscribe(
      async (data) => {
        await data;
        if (data.result) {
          let tokboxSession = data;
          this.opentokService.token$ = tokboxSession.token;
          this.opentokService.sessionId$ = tokboxSession.sessionId;
          this.opentokService.apiKey$ = tokboxSession.tokboxAPI;

          // iOS fires call automatically on devices when receives voIP push
          const modal = await this.modalCtrl.create({
            component: VideoComponent,
            componentProps: {},
            cssClass: "modal-custom-class"
          });

          await modal.present();
          cordova.plugins.CordovaCall.endCall();


        } else {
          let message = this.translate.instant('agenda.error_alert_message_get_token')
          throw message;
        }

      },
      (error) => {
        // Called when error
        alert('ERROR(' + error.code + '): ' + error.message)
        console.error("error: ", error);
        throw error;
      });

  }

  async openVideocallIframeModal(agenda) {

    const modal = await this.modalCtrl.create({
      component: VideocallIframePage,
      componentProps: { "id": agenda }
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
      self.authService.voipDevicePlatform = platform

    });

    pushvoip.on('notification', async function (notification) {

      await notification;
      console.log("[Ionic] voip notification callback called");
      console.log(notification);

      const extra = JSON.parse(notification.extra);
      console.log("extra: ", extra);

      if (extra) {
        let cancel = extra.Caller.CancelPush;
        if (cancel == "false") {
          self.opentokService.agendaId$ = extra.Caller.ConnectionId;
        } else
          console.log("Hang up notification");
      } else {
        console.error("Caller not found in voip notification");
      }

    });

    pushvoip.on('error', function (e) {
      console.error("[Ionic] VoIPPushNotification error");
      alert(this.translate.instant('notifications.voip_register_error'))
    });
  }

  async getAgenda() {

    return this.dooleService.postAPIPendingConnect().subscribe(async (data) => {
      await data;
      console.log('[AppComponent] getAgendaId()', data)
      if (data.success && data.agenda) {
        this.opentokService.agendaId$ = data.agenda;
        this.startVideocall(data.agenda);
      } else {
        let message = this.translate.instant('agenda.error_alert_message_get_agenda')
        throw message;
      }
    })
  }

  async startVideocall(agenda) {
    console.log('[AppComponent] startVideocall()', agenda)
    await this.startVideocallIframe(agenda).then(() => {
      cordova.plugins.CordovaCall.endCall();
    });
  }

  // async startVideocallIos(agenda) {
  //   console.log("startVideocall")
  //   return this.dooleService.getAPIvideocall(agenda).subscribe(
  //     async (data) => {
  //       await data;
  //       if (data.result) {
  //         let tokboxSession = data;
  //         this..token$ = tokboxSession.token;
  //         this.opentokService.sessionId$ = tokboxSession.sessionId;
  //         this.opentokService.apiKey$ = tokboxSession.tokboxAPI;
  //         const modal = await this.modalCtrl.create({
  //           component: VideoComponent,
  //           componentProps: {},
  //           cssClass: "modal-custom-class"
  //         });

  //         await modal.present();
  //         cordova.plugins.CordovaCall.endCall();
  //         return data;

  //       } else {
  //         let message = this.translate.instant('agenda.error_alert_message_get_token')
  //         throw message;
  //       }

  //     },
  //     (error) => {
  //       // Called when error
  //       alert('ERROR(' + error.code + '): ' + error.message)
  //       console.log("error: ", error);
  //       throw error;
  //     });
  // }

  // async startVideocallAndroid(agenda) {

  //   console.log("startVideocallAndroid")
  //   this.dooleService.getAPIvideocall(agenda).subscribe(
  //     async (data) => {
  //       await data;
  //       if (data.result) {
  //         let tokboxSession = data;
  //         this.opentokService.token$ = tokboxSession.token;
  //         this.opentokService.sessionId$ = tokboxSession.sessionId;
  //         this.opentokService.apiKey$ = tokboxSession.tokboxAPI;
  //         const modal = await this.modalCtrl.create({
  //           component: VideoComponent,
  //           componentProps: {},
  //           cssClass: "modal-custom-class"
  //         });

  //         await modal.present();
  //         return data;

  //       } else {
  //         let message = this.translate.instant('agenda.error_alert_message_get_token')
  //         throw message;
  //       }

  //     },
  //     (error) => {
  //       // Called when error
  //       alert('ERROR(' + error.code + '): ' + error.message)
  //       console.log("error: ", error);
  //       throw error;
  //     });
  // }

  async startVideocallIframe(id, startVideo?) {
    //console.log('[AppComponent] startVideocallIframe()', id, startVideo)
    if (this.isModalOpen)
      return
    this.isModalOpen = true
    const modal = await this.modalCtrl.create({
      component: VideocallPage,
      componentProps: { id: id, startVideo: true },
      cssClass: "modal-custom-class"
    });

    modal.onDidDismiss()
      .then((result) => {
        console.log('addElement()', result);
        this.isModalOpen = false
      });

    await modal.present()
    //cordova.plugins.CordovaCall.endCall();
    return
  }


  phonecallHandlers() {

    var self = this;

    cordova.plugins.CordovaCall.setVideo(true);
    //accept de videocall
    cordova.plugins.CordovaCall.on('answer', async function (data) {
      console.log(data);
      self.lastResume = new Date;

      // Grab last agenda id from BO
      if (!self.opentokService.agendaId$)
        self.getAgenda();
      else
        self.startVideocall(self.opentokService.agendaId$)

    });

    //reject de videocall
    cordova.plugins.CordovaCall.on('reject', function (data) {
      console.log("reject");
      console.log(data);
    });

    //hangup de videocall
    cordova.plugins.CordovaCall.on('hangup', function (data) {
      console.log("hangup");
      console.log(data);
    });

    //receive
    cordova.plugins.CordovaCall.on('receiveCall', function (data) {
      console.log("receiveCall");


    });

    //send
    cordova.plugins.CordovaCall.on('sendCall', function (data) {
      console.log("send call");
      console.log(data);
    });

  }
  lockDevice() {
    // Lock phone after 2 minutes in pause
    this.getNumNotification()
    this.lastResume = new Date;
    this.setLastResume(this.lastResume)
    this.platform.pause.subscribe((e) => {
      // Saves the time of pause to be used in resume
      this.lastResume = new Date;
      this.lastPause = new Date;
      this.setLastResume(this.lastResume)
      this.getNumNotification()


    });

    this.platform.resume.subscribe(async (e) => {

      if (!this.router.url.includes('landing') && !this.router.url.includes('login')) {
        let longResume: Date = this.getLastResume()
        let secondsPassed2 = ((new Date).getTime() - longResume.getTime()) / 1000;
        let secondsPassed = ((new Date).getTime() - this.lastResume.getTime()) / 1000;
        //900 sec are 10 minutes NUM_MINUTES_GO_LOGIN
        if (secondsPassed2 >= this.NUM_MINUTES_GO_LOGIN && !this.isNotification) {
          this.router.navigateByUrl('/landing');
        }
        // App will lock after 5 minutes NUM_MINUTES_SHOW_BIOMETRIC
        else if (secondsPassed >= this.NUM_MINUTES_SHOW_BIOMETRIC && !this.isNotification) {
          // Must implement lock-screen
          this.showFingerprintAuthDlg()
        }
      }
      this.isNotification = false
    });

  }

  getLastResume(): Date {
    const date = localStorage.getItem('lastResume');
    return new Date(JSON.parse(date))
  }

  setLastResume(lastResume: Date) {
    localStorage.setItem('lastResume', JSON.stringify(lastResume.getTime()))
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
    console.log("BROWSER LANG: ", lang);
    if (lang !== 'ca' && lang !== 'es' && lang !== 'en')
      lang = 'en' //es

    lang = 'en'

    this.translate.setDefaultLang(lang);
    console.log("APP LANG: ", lang);
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

  initMap(res) {
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
    if (!JSON.parse(localStorage.getItem(this.settingsBio)) ||
      this.lastPause == undefined || !this.authService?.user) {

      if (data) {
        console.log("[AppComponent] showFingerprintAuthDlg(), data", data);
        this.dooleService.setPushNotification(data)
        this.router.navigate([`/landing`], { state: { pushNotification: data } });
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
          console.log("[AppComponent] showFingerprintAuthDlg(), data", result)
          if (result) {
            this.lastResume = new Date;
            this.authService.removeNumloginFailed()
            if (data) {
              setTimeout(() => this.redirecPushNotification(data), 500);
            }
          } else {
            //setTimeout(()=>this.showFingerprintAuthDlg(), 500);
            this.router.navigateByUrl('/landing');
          }

        })
        .catch(async (error: any) => {
          console.log(error);
          if (error.code == -102) {
            // let num = this.authService.getNumloginFailed()
            // if(num >=3){
            //   await this.authService.logout();
            //   this.router.navigateByUrl('/landing');
            // }
            // else
            // Must implement lock-screen
            setTimeout(() => this.showFingerprintAuthDlg(), 500);

          } else {
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

  backButton() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      // this does work
      if (this.router.url.endsWith('home')) {
        //Exit from app
        this.showExitConfirm()
      } else if (this.router.url.includes('landing')) {
        //Exit from app
        navigator['app'].exitApp();
      } else {
        //this.router.lastSuccessfulNavigation()
        this.navCtrl.pop()
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

  showFamilyUnitButton(): boolean {
    if (this.router.url.includes('family-unit') || this.router.url.includes('login') || this.router.url.includes('intro')
      || this.router.url.includes('landing') || this.router.url.includes('legal') || this.router.url.includes('sms') || this.router.url.includes('verification')
    ) {
      return false
    }
    else {
      return true
    }
  }

}


