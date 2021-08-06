import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken } from '@capacitor/core';
import { AlertController, MenuController, ModalController, Platform, ToastController } from '@ionic/angular';
import { Badge } from '@ionic-native/badge/ngx';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { FirebaseAuthService } from './services/firebase/auth/firebase-auth.service';
import { LanguageService } from './services/language.service';

import { HistoryHelperService } from './utils/history-helper.service';
import { AuthenticationService } from './services/authentication.service';
import { StorageService } from './services/storage.service';
import { Network } from '@ionic-native/network/ngx';
import { throwError } from 'rxjs';
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
    //private screenOrientation: ScreenOrientation,
    private modalCtrl: ModalController,
    private faio : FingerprintAIO
  ) {

  }

  ngOnInit(): void {
    this.setLanguage();
    this.translate.onLangChange.subscribe(() => this.getTranslations());
    this.storageService.isFirstTimeLoad();
   
    this.platform.ready().then(() => {
      // Request permission to use push notifications
      // iOS will prompt user and return if they granted permission or not
      // Android will just grant without prompting
      
      if (!this.platform.is('mobileweb') && !this.platform.is('desktop')) {
        
        PushNotifications.requestPermission().then(result => {
          if (result.granted) {
            // Register with Apple / Google to receive push via APNS/FCM
            PushNotifications.register();
          } else {
            // Show some error
          }
        });

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration',
          (token: PushNotificationToken) => {
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
            alert('Error on registration: ' + JSON.stringify(error));
          }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
          (notification: PushNotification) => {
          }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
          (notification: PushNotificationActionPerformed) => {

            console.log('Received a notification', notification);
            this.badge.increase(1);
            
            const action = notification.notification.data.action;
            const id = notification.notification.data.id;
            const msg = notification.notification.data?.message;
      
            //If the app is running when the push received
            if (notification.notification.data?.foreground) {
              console.log("foreground");
              if(action=="MESSAGE"){
                this.showMessage("Has recibido un mensaje");
              }
              if(action=="FORM"){
                //this.router.navigate(['FormslistPage'],{state: {id: id, action : "open"}});
              }
      
              if(action=="DRUGINTAKE"){
                this.showMessage("Hora de tomarte la medicación");
                //this.router.navigate(['DrugsIntakeMainPage'],{state: {id: id, action : "open"}});
              }
      
              if(action=="VIDEOCALL"){
                this.showMessage("Videollamada de tu médico");
                //this.router.navigate(['AgendaDetailPage'],{state: {id: id, action : "open"}});
              }
      
            }else{
            //If the app is closed and started by clicking on the push notification
              if(action=="MESSAGE"){
                this.badge.decrease(1);
                //this.router.navigate(['MessagesDetailPage'],{state: {id: id, action : "open"}});
              }
      
              if(action=="FORM"){
                //this.router.navigate(['FormslistPage'],{state: {id: id, action : "open"}});
              }
      
              if(action=="DRUGINTAKE"){
                this.showMessage("Hora de tomarte la medicación");
                //this.router.navigate(['DrugsIntakeMainPage'],{state: {id: id, action : "open"}}); 
              }
      
              if(action=="VIDEOCALL"){
                this.showMessage("Videollamada de tu médico");
                //this.router.navigate(['VideocallPage'],{state: {id: id, action : "open"}});
              }
      
            }
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
        });

        // To avoid going back with device's back button from home or after creating an appointment, 
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
          this.previousUrl = this.currentUrl;
          this.currentUrl = event.url;
        });
        this.platform.backButton.subscribeWithPriority(9999, (processNextHandler) => {  
        
        if(this.currentUrl.includes('/login')){
          this.router.navigateByUrl('/landing');
        }
        });

        // check internet status on mobile
        this.listenConnection();
        
      }

    });
  
  }

  async showMessage(text){
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
        throwError({status:0, message:'ERR_INTERNET_DISCONNECTED'});
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
