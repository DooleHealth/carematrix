import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ReportProblemPage } from './report-problem/report-problem.page';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { VideoComponent } from 'src/app/components/video/video.component';
import { DooleService } from 'src/app/services/doole.service';
import { OpentokService } from 'src/app/services/opentok.service';
import { TranslateService } from '@ngx-translate/core';
import { VideocallIframePage } from '../agenda/videocall-iframe/videocall-iframe.page';
import { PatientsPage } from './patients/patients.page';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userDoole : any
  isLoading: boolean;
  userImage:string = history.state?.user ?  history.state?.user.temporaryUrl : 'assets/icons/user_icon.svg'
  version:string = "";
  tokboxSession: any;
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
    private role: RolesService) { }

  ngOnInit() {
    this.getUserProfile();
  }

  ionViewWillEnter(){
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


  async signOut() {
    await this.authService.logout().then(res=>{
      this.router.navigateByUrl('/landing');
    });
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


}
