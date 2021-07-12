import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { VideoComponent } from 'src/app/components/video/video.component';
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
    private opentokService: OpentokService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log('[AgendaDetailPage] ngOnInit()', this.event);
    this.event = history.state?.event;
    this.event.online = 1;
    if(this.event?.online){
      this.dooleService.getAPIvideocall(this.event?.id).subscribe(
        async (data) => {
          
          this.tokboxSession = await data;
          console.log("* tokbox session:", data);
          this.opentokService.token$ = this.tokboxSession.token;
          this.opentokService.sessionId$ = this.tokboxSession.sessionId;
          this.opentokService.apiKey$ = this.tokboxSession.tokboxAPI;
          
        },
        (error) => {
          // Called when error
          console.log("error: ", error);
          throw error;
        });
    }
  
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
    //let message = this.translate.instant('documents_add.alert_message')
    let header = this.translate.instant('alert.header_info')
    this.dooleService.showAlertAndReturn(header,message,false, '/agenda')
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
