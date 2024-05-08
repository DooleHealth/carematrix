import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InAppBrowser, InAppBrowserObject, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { IonRouterOutlet, LoadingController, ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/app/config/constants';
import { AuthenticationService, User } from 'src/app/services/authentication.service';
import { ChangeEndpointsService } from 'src/app/services/change-endpoints.service';
import { Subscription } from 'rxjs';
import { OpentokService } from 'src/app/services/opentok.service';


@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.page.html',
  styleUrls: ['./videocall.page.scss'],
})
export class VideocallPage implements OnInit {
  private idAgenda: string = history.state.id;
  @Input()id: any;
  @Input() startVideo: boolean;
  sessionId: string;
  token: string;
  api: string;
  activateIFrame: boolean = false;
  safeUrl: SafeResourceUrl;

  private browser: InAppBrowserObject;
  private callEventSubscription: Subscription;

  public connected: boolean;
  public connecting: boolean;

  btnConectarStr: string;
  closeButton: string = ' '
  environment;
  user: User;
  // durationStr: string;
  // previousUrl: string;
  // publisher: any;
  // infoStr: string;
  // width
  // height

  static readonly VIDEOCALL_MODAL_ID = "videocall-page-modal";

  constructor(
    private authService: AuthenticationService,
    private loadingController: LoadingController,
    //private analyticsService: AnalyticsService,
    public constants: Constants,
    private sanitizer: DomSanitizer,
    private modalCtrl: ModalController,
    private iab: InAppBrowser,
    private platform: Platform,
    private translate: TranslateService,
    private endpoints: ChangeEndpointsService,
    private opentokService: OpentokService,
  ) {
    // platform.ready().then(() => {
    //   console.log('Width: ' + platform.width());
    //   console.log('Height: ' + platform.height());
    //   this.height = platform.height()
    //   this.width = platform.width()
    // });
}


ngOnInit() {
  this.environment = this.endpoints._ENVIROMENT
  this.idAgenda = this.idAgenda? this.idAgenda: this.id;
  this.getUser();
  this.translate.get('notifications.close').subscribe(translate => {
    this.closeButton = translate
  })
  if (this.startVideo)
    this.startVideocall()
    this.callEventSubscription = this.opentokService.callEvent$.subscribe(e => {
    if (e.type === "hangup") {
      this.modalCtrl.dismiss({ result: null, error: null }, undefined, VideocallPage.VIDEOCALL_MODAL_ID);
    }
  })
}

  ngOnDestroy() {
    this.browser?.close();
    this.callEventSubscription?.unsubscribe();
  }

  getUser(){
    if(this.authService?.user?.idUser)
      this.user = this.authService.user;
    else{
      this.authService.getUserLocalstorage().then(user =>{
        this.user = user
      })
    }
  }

  async startVideocall(){
    //this.analyticsService.logEvent('videollamada_doole', this.user)
      this.connecting = true;
      this.btnConectarStr =  ""; //"Conectando...";

    const loading = await this.loadingController.create({
      mode: "md",
      cssClass: "custom-loading",
      backdropDismiss: false,
    });
    await loading.present();


    this.authService.get('user/agenda/' + this.idAgenda + '/videocallSession').subscribe(
        async (data) => {
          let response = data;
          this.sessionId = response.sessionId;
          this.token = response.token;
          this.api = response.tokboxAPI;
          
          const urlWithParams = this.getUrlWithParams();
          console.log('startVideocall()', urlWithParams);
          this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(urlWithParams);
          //console.log(this.safeUrl);

          if(this.platform.is('ios')){
            this.openVideocall(urlWithParams)
          }else{
            this.activateIFrame = true;
          }

          
        },
        (error) => {
          console.log("error: ", error);
          throw new HttpErrorResponse(error);
        },
        () => {
          loading.dismiss();
        });
      
  }

  backButton() {
    console.log('[FormPage] backButton() ');
    this.modalCtrl.dismiss({ result: null, error: null }, undefined, VideocallPage.VIDEOCALL_MODAL_ID)
  }


  async openVideocall(urlWithParams){
      const iosoption: InAppBrowserOptions = {
        zoom: 'no',
        location:'no',
        toolbar:'yes',
        clearcache: 'yes',
        clearsessioncache: 'yes',
        disallowoverscroll: 'yes',
        enableViewportScale: 'yes',
        allowInlineMediaPlayback : 'yes',//iOS only
        mediaPlaybackRequiresUserAction: 'yes',
        closebuttoncolor: "#F2FFFF",​
        toolbarcolor: '#8E44AD',
        closebuttoncaption: ` ${this.closeButton}`,
      }
      //const urlWithParams = this.getUrlWithParams();
      //this.browser.addEventListener("loadstop", this.backButton());
      this.browser = this.iab.create(urlWithParams , '_blank', iosoption);
      // this.browser.on("loadstop").subscribe(event =>{
      //   this.browser.show()
      // })
    
  }

  getUrlWithParams(){
    const path = `agenda/videocall/app/${this.idAgenda}`
    const params = new HttpParams().set('tokboxAPI', this.api).set('sessionId', this.sessionId).set('token', this.token).set('user', this.user?.idUser);
    
    if(this.platform.is('ios')){
      params.append('publisher_width', '45%')
      params.append('publisher_height', '40%')
    }

    return `${this.environment.endpoint}/${path}?${params.toString()}`;
  }

}
