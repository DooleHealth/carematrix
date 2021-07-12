import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { VideoComponent } from 'src/app/components/video/video.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { OpentokService } from 'src/app/services/opentok.service';

@Component({
  selector: 'app-agenda-detail',
  templateUrl: './agenda-detail.page.html',
  styleUrls: ['./agenda-detail.page.scss'],
})
export class AgendaDetailPage implements OnInit {
  event: any = {}
  tokboxSession: any;
  constructor(
    private loadingController: LoadingController,
    private dooleService: DooleService,
    private translate : TranslateService,
    public alertController: AlertController,
    public nav: NavController,
    private iab: InAppBrowser, 
    private auth: AuthenticationService,
    private opentokService: OpentokService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.event = history.state.event;
    
    if(this.event?.online)
      this.getVideocallToken();

    console.log('[AgendaDetailPage] ngOnInit()', this.event);
  }

  // TODO: remove (agenda detail in state.event)
  getDetailAgenda(){ 
    this.dooleService.getAPIagendaID(this.event?.id).subscribe(
      async (res: any) =>{
        console.log('[AgendaDetailPage] getDetailAgenda()', await res);

        if(res.agenda)
          this.event = res.agenda
       
        if(this.event?.online)
          this.getVideocallToken();

       },(err) => { 
          console.log('[AgendaDetailPage] getDetailAgenda() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  getVideocallToken(){
    this.dooleService.getAPIvideocall(this.event?.id).subscribe(
      async (data) => {
        
        this.tokboxSession = await data;
        this.opentokService.token$ = this.tokboxSession.token;
        this.opentokService.sessionId$ = this.tokboxSession.sessionId;
        this.opentokService.apiKey$ = this.tokboxSession.tokboxAPI;
        console.log("this.tokboxSession: ", this.tokboxSession);
        
      },
      (error) => {
        // Called when error
        console.log("error: ", error);
        throw error;
      });
    
  }

  async deleteReminder(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.dooleService.deleteAPIaddAgenda(this.event.id).subscribe(
      async (res: any) =>{
        console.log('[ReminderAddPage] deleteReminder()', await res);

        let message = this.translate.instant("appointment.message_deleted_appointment")
        this.showAlert(message)
        loading.dismiss();
       },(err) => { 
        loading.dismiss();
          console.log('[ReminderAddPage] deleteReminder() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        loading.dismiss();
      };
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      header: this.translate.instant("alert.header_confirmation"),
      message: this.translate.instant("appointment.confirmation_delete_appointment"),
      buttons: [
        {
          text: this.translate.instant("alert.button_cancel"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('[AddHealthCardPage] AlertConfirm Cancel');
          }
        }, {
          text: this.translate.instant("alert.button_ok"),
          handler: () => {
            console.log('[AddHealthCardPage] AlertConfirm Okay');
            this.deleteReminder()
          }
        }
      ]
    });

    await alert.present();
  }

  showAlert(message){
    let header = this.translate.instant('alert.header_info')
    this.dooleService.showAlertAndReturn(header,message,false, '/agenda')
  }


  actionIntrucction( instruction){
    //instruction.reminderable_type = null
    console.log('[AgendaPage] actionIntrucction()',  instruction);
    let id
    switch (instruction.reminderable_type) {
      case "App\\Element":
        id = instruction.reminderable_id
        console.log('[AgendaPage] actionIntrucction()',  id);
        this.nav.navigateForward("elements-add", { state: {id:id} });
        break;
      case  "App\\Advice":
        id = instruction.reminderable_id
        console.log('[AgendaPage] actionIntrucction()',  id);
        this.nav.navigateForward("advices", { state: {id:id} });
        break;
      case  "App\\Diet":
        id = instruction.reminderable_id
        console.log('[AgendaPage] actionIntrucction()',  id);
        this.nav.navigateForward("/diets-detail", { state: {id:id} });
        break;
      case  "App\\Form":
        id = instruction.reminderable_id
        this.openForm(id)
        break;
    
      default:
        id = 42
        console.log('[AgendaPage] actionIntrucction()',  id);
        this.openForm(id)
        break;
    }
  }

  async openForm(id){
    const options: InAppBrowserOptions = {
      location: 'no',
      toolbar: 'yes'
    };

    console.log('[TrackingPage] openForm()',  this.auth.user);

    if(this.auth !==undefined || this.auth.user !== undefined){
      var pageContent = '<html><head></head><body><form id="loginForm" action="https://covid.doole.io/formAnswer/fill/'+id+'" method="post" enctype="multipart/form-data">' +
        '<input type="hidden" name="idForm" value="'+id+'">' +
        '<input type="hidden" name="user_id" value="'+this.auth.user.idUser+'">' +
        '<input type="hidden" name="secret" value="'+this.auth.user.secret+'">' +
        '</form> <script type="text/javascript">document.getElementById("loginForm").submit();</script></body></html>';
      var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);
      var browserRef = this.iab.create(
        pageContentUrl,
        "_blank",
        "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
      );
    }else{
      var browserRef = this.iab.create(
        /* form.temporaryUrl */null,
        "_blank",
        "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
      );
    }

  }

  openFile(media){
    console.log("media", media);
    window.open(media.temporaryUrl, "");
  }

  async startDooleVideocall(){

    const modal = await this.modalCtrl.create({
      component: VideoComponent,
      componentProps: { },
    });

    modal.onDidDismiss().then((result) => {
    });

    await modal.present();

  }

}
