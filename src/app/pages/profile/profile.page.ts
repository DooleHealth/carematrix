import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, Platform, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ReportProblemPage } from './report-problem/report-problem.page';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { VideoComponent } from 'src/app/components/video/video.component';
import { DooleService } from 'src/app/services/doole.service';
import { OpentokService } from 'src/app/services/opentok.service';
import { TranslateService } from '@ngx-translate/core';
import { VideocallIframePage } from '../agenda/videocall-iframe/videocall-iframe.page';
import { PatientsPage } from './patients/patients.page';
import { RolesService } from 'src/app/services/roles.service';
import { PusherConnectionService } from 'src/app/services/pusher/pusher-connection.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private readonly  NUM_CLICK_AVATAR = 10;
  userDoole : any
  isLoading: boolean;
  userImage:string = history.state?.user ?  history.state?.user.temporaryUrl : 'assets/icons/user_icon.svg'
  version:string = "";
  tokboxSession: any;
  modeNumDev: number = 0
  constructor(
    public authService: AuthenticationService,
    public appVersion: AppVersion,
    private notification: NotificationService,
    private modalCtrl: ModalController,
    private router: Router,
    public platform: Platform,
    private iab: InAppBrowser,
    private dooleService: DooleService,
    private opentokService: OpentokService,
    private translate : TranslateService,
    private toastController: ToastController,
    private alertController: AlertController,
    private pusherConnection: PusherConnectionService,
    public role: RolesService) { }

  ngOnInit() {
    this.getUserProfile();
  }

  ionViewWillEnter(){
    this.modeNumDev = 0
    this.getPersonalInformation()

    if (!this.platform.is('mobileweb') && !this.platform.is('desktop')) {
    this.appVersion.getVersionNumber().then((version)=>{
      this.version = version;
    });
    }

  }

  getUserProfile(){
    if(history.state?.user){
      this.userDoole = history.state.user;
      console.log('[ProfilePage] getUserProfile()' ,  this.userDoole);
    }
  }

  getPersonalInformation(){
    this.isLoading = true
    this.dooleService.getAPIuserProfile().subscribe(
      async (res: any) =>{
        console.log('[ProfilePage] getPersonalInformation()', res);
        this.userDoole = res.user;
        this.isLoading = false
       },(err) => {
          console.log('[ProfilePage] getPersonalInformation() ERROR(' + err.code + '): ' + err.message);
          this.isLoading = false
          throw err;
      });
    }


    async signOut(confirm) {
      if (!this.platform.is('mobileweb') && !this.platform.is('desktop')) {

        this.authService.logout(confirm).subscribe(
          async (res: any)=>{
          await res
          console.log('[ProfilePage] signOut()', JSON.stringify(res))

          this.pusherConnection.unsubscribePusher()

          if(res.success)
            this.router.navigateByUrl('/landing');
          else{
            let message = this.translate.instant('setting.error_message_sign_off')
              this.dooleService.showAlertAndReturn('Error',message, false,'/landing')
          }
        });
      }else{
        await this.authService.logout1().then(res=>{
          this.pusherConnection.unsubscribePusher()
          this.router.navigateByUrl('/landing');
        });
      }
    }

  async sendReportProblem(){
    const modal = await this.modalCtrl.create({
      component:  ReportProblemPage,
      componentProps: { },
      cssClass: "modal-custom-class"
    });

    modal.onDidDismiss()
      .then((result) => {
        console.log('sendReportProblem()', result);
        if(result?.data?.error){

        }else if(result?.data?.action == 'add'){
          this.notification.displayToastSuccessful()
        }
      });

      await modal.present();

    }

    public openWithInAppBrowser(){
      let url: string;
      if (this.platform.is('ios'))
         url = 'https://freeconferencing.vonage.com';
      else
         url = 'https://opentokdemo.tokbox.com';

      let options : InAppBrowserOptions = {
        location : 'yes',//Or 'no'
        hideurlbar:'yes',
        hidden : 'no', //Or  'yes'
        clearcache : 'yes',
        clearsessioncache : 'yes',
        enableViewPortScale: 'yes',
        zoom : 'yes',//Android only ,shows browser zoom controls
        hardwareback : 'yes',
        mediaPlaybackRequiresUserAction : 'yes',
        shouldPauseOnSuspend : 'no', //Android only
        closebuttoncaption : 'Close', //iOS only
        disallowoverscroll : 'no', //iOS only
        toolbar : 'yes', //iOS only
        enableViewportScale : 'no', //iOS only
        allowInlineMediaPlayback : 'yes',//iOS only
        presentationstyle : 'pagesheet',//iOS only
        fullscreen : 'yes',//Windows only
    };
      let target = "_blank";

      this.iab.create(url,target, options);
  }

  startVideoCall(){
    // VOIP calls for IOS
    let agenda = "1281";
    this.getTokboxSession(agenda);

  }

  async getTokboxSession(agenda) {

    return this.dooleService.getAPIvideocall(agenda).subscribe(
      async (data) => {
        await data;
        if(data.result){
          let tokboxSession = data;
          this.opentokService.token$ = tokboxSession.token;
          this.opentokService.sessionId$ = tokboxSession.sessionId;
          this.opentokService.apiKey$ = tokboxSession.tokboxAPI;
          console.log("this.tokboxSession: ", this.opentokService.sessionId$);

          this.openVideocallModal();

          return tokboxSession;
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
      componentProps: {"id":agenda}
    });

    await modal.present();

  }

  async openVideocallModal(){
    const modal = await this.modalCtrl.create({
      component: VideoComponent,
      componentProps: {},
    });
    await modal.present();

  }

  async openPatientsModal(){
    console.log('openPatientsModal()', );
    const modal = await this.modalCtrl.create({
      component: PatientsPage,
      componentProps: {},
    });
    await modal.present();

  }

  modeDevelopment(){
    this.modeNumDev = ++this.modeNumDev;
    console.log('modeDevelopment()', this.modeNumDev);
    if(this.modeNumDev >= this.NUM_CLICK_AVATAR){
        let modeActivate = JSON.parse(localStorage.getItem('modeActivate'));
        if(!modeActivate){
          localStorage.setItem('modeActivate', 'true');
        }else localStorage.setItem('modeActivate', 'false');
        modeActivate = !modeActivate
        console.log('modeDevelopment()', modeActivate);
        let message =  this.translate.instant(modeActivate? 'mode_development.mode_activate':'mode_development.mode_desactivate')
        this.displayToastPusher(message)
        this.modeNumDev = 0;
    }

  }

  displayToastPusher(message) {
    try {
      this.toastController.dismiss().then(() => {
      }).catch(() => {
      }).finally(() => {
        console.log('Closed')
      });
    } catch(e) {}

    this.toastController.create({
      position: 'bottom', //'middle', 'bottom'
      /* cssClass: 'toast-pusher-class', */
      message: message,
      animated: true,
      duration: 4000,
      buttons: [{
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).then((toast) => {
      toast.present();
    });
  }

  async confirmCloseAllDevices() {
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
              this.signOut(false)
            }
          }, {
            text: this.translate.instant("button.yes"),
            handler: (data) => {
              this.signOut(true)
            }
          }
        ]
    });

    await alert.present();
  }

}
