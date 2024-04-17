import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { IonRouterOutlet, LoadingController, ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/app/config/constants';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.page.html',
  styleUrls: ['./videocall.page.scss'],
})
export class VideocallPage implements OnInit {
  private idAgenda: string  = history.state.id;
  @Input()id: any;
  @Input() startVideo: boolean;
  sessionId: string;
  token: string;
  api: string;
  activateIFrame:boolean = false;
  safeUrl: SafeResourceUrl
  url;

  public connected: boolean;
  public connecting: boolean;

  btnConectarStr: string;
  closeButton:string = ' '
  // durationStr: string;
  // previousUrl: string;
  // publisher: any;
  // infoStr: string;
  // width
  // height
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
    // private routerOutlet: IonRouterOutlet,
  ) {
    // platform.ready().then(() => {
    //   console.log('Width: ' + platform.width());
    //   console.log('Height: ' + platform.height());
    //   this.height = platform.height()
    //   this.width = platform.width()
    // });
}


  ngOnInit() {
    this.idAgenda = this.idAgenda? this.idAgenda: this.id
    this.translate.get('notifications.close').subscribe(translate => {
    this.closeButton = translate
    })
    if(this.startVideo)
    this.startVideocall()
  }

  // goBack() { 
  //   this.routerOutlet.pop(); 
  // }

  async startVideocall(){
    //this.analyticsService.logEvent('videollamada_doole', this.user)
      this.connecting = true;
      this.btnConectarStr = "Conectando...";

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
          
          const params = new HttpParams().set('API_KEY', this.api).set('SESSION_ID', this.sessionId).set('VIDEO_TOKEN', this.token);
          const urlWithParams = `${this.constants.VIDEOCALL_URL}?${params.toString()}`;
          this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(urlWithParams);
          console.log(this.safeUrl);

          if(this.platform.is('ios')){
            this.openVideocall(this.sessionId, this.token, this.api)
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

  backButton(){
    console.log('[FormPage] backButton() ');
    this.modalCtrl.dismiss({result: null,error:null})
    //setTimeout(()=>this.modalCtrl.dismiss({result: null,error:null}), 500);
  }


  async openVideocall(sessionId, token, api){
    var browser : any;
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
      const params = new HttpParams().set('API_KEY', this.api).set('SESSION_ID', this.sessionId).set('VIDEO_TOKEN', this.token);
      params.append('publisher_width', '45%')
      params.append('publisher_height', '40%')
      const urlWithParams = `${this.constants.VIDEOCALL_URL}?${params.toString()}`;
      console.log('openVideocall()', urlWithParams);
      //browser = this.iab.create(urlWithParams , '_blank', `hidden=no,location=no,clearsessioncache=yes,clearcache=yes,allowInlineMediaPlayback=yes,mediaPlaybackRequiresUserAction=yes,closebuttoncaption=${this.closeButton}`);
      browser = this.iab.create(urlWithParams , '_blank', iosoption);
      browser.addEventListener("loadstop", this.backButton());
    
  }

}
